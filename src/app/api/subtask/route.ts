import db from "@/lib/db";
import { NextRequest } from "next/server";

export const GET = async (request: NextRequest) => {
  const id = request.nextUrl.searchParams.get("id");
  const userId = request.nextUrl.searchParams.get("userId");

  if (!id) {
    if (userId) {
      const task = await db.task.findMany({
        where: { userId },
        include: {
          subtask: true,
          list: true,
        },
      });
      return Response.json(
        {
          result: {
            data: task,
            error: "",
          },
        },
        {
          status: 200,
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET",
            "Access-Control-Allow-Headers": "Content-Type, application/json",
          },
        }
      );
    }
    return Response.json(
      {
        result: {
          data: null,
          error: "ID Subtask tidak ditemukan!",
        },
      },
      {
        status: 404,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET",
          "Access-Control-Allow-Headers": "Content-Type, application/json",
        },
      }
    );
  }

  try {
    const task = await db.task.findUnique({
      where: { id: id },
      include: {
        subtask: true,
        list: true,
      },
    });

    if (!task) {
      return Response.json(
        {
          result: {
            data: null,
            error: "Subtask tidak ditemukan",
          },
        },
        {
          status: 404,
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET",
            "Access-Control-Allow-Headers": "Content-Type, application/json",
          },
        }
      );
    }

    return Response.json(
      {
        result: {
          data: task,
          error: "",
        },
      },
      {
        status: 200,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET",
          "Access-Control-Allow-Headers": "Content-Type, application/json",
        },
      }
    );
  } catch (err) {
    return Response.json(
      {
        result: {
          data: null,
          error: (err as Error).message,
        },
      },
      {
        status: 500,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET",
          "Access-Control-Allow-Headers": "Content-Type, application/json",
        },
      }
    );
  }
};

export const POST = async (request: NextRequest) => {
  const body = await request.json();
  const requiredFields = ["title", "description", "userId"];
  const missingFields = requiredFields.filter((field) => !body[field]);
  if (missingFields.length > 0) {
    return Response.json(
      {
        result: {
          data: null,
          error: "Input tidak boleh ada yang kosong!",
        },
      },
      {
        status: 400,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "POST",
          "Access-Control-Allow-Headers": "Content-Type, application/json",
        },
      }
    );
  }

  try {
    const addTask = await db.task.create({
      data: {
        title: body.title,
        description: body.description,
        userId: body.userId,
      },
    });

    if (!addTask) {
      return Response.json(
        {
          result: {
            data: null,
            error: "Gagal menambahkan subtask!",
          },
        },
        {
          status: 404,
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "POST",
            "Access-Control-Allow-Headers": "Content-Type, application/json",
          },
        }
      );
    }
    return Response.json(
      {
        result: {
          data: "Subtask berhasil ditambah!",
          error: "",
        },
      },
      {
        status: 200,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "POST",
          "Access-Control-Allow-Headers": "Content-Type, application/json",
        },
      }
    );
  } catch (err) {
    return Response.json(
      {
        result: {
          data: null,
          error: (err as Error).message,
        },
      },
      {
        status: 500,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "POST",
          "Access-Control-Allow-Headers": "Content-Type, application/json",
        },
      }
    );
  }
};

// export async function PUT(request: NextRequest) {}

export async function DELETE(request: NextRequest) {
  const id = request.nextUrl.searchParams.get("id");
  if (!id) {
    return Response.json(
      {
        result: {
          data: null,
          error: "ID Subtask tidak ditemukan!",
        },
      },
      {
        status: 404,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "DELETE",
          "Access-Control-Allow-Headers": "Content-Type, application/json",
        },
      }
    );
  }

  try {
    const deleteTask = await db.task.delete({
      where: { id },
    });

    if (!deleteTask) {
      return Response.json(
        {
          result: {
            data: null,
            error: "Subtask gagal dihapus!",
          },
        },
        {
          status: 404,
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "DELETE",
            "Access-Control-Allow-Headers": "Content-Type, application/json",
          },
        }
      );
    }
    return Response.json(
      {
        result: {
          data: "Subtask berhasil dihapus!",
          error: "",
        },
      },
      {
        status: 200,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "DELETE",
          "Access-Control-Allow-Headers": "Content-Type, application/json",
        },
      }
    );
  } catch (err) {
    return Response.json(
      {
        result: {
          data: null,
          error: (err as Error).message,
        },
      },
      {
        status: 500,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "DELETE",
          "Access-Control-Allow-Headers": "Content-Type, application/json",
        },
      }
    );
  }
}

export async function PATCH(request: NextRequest) {
  const id = request.nextUrl.searchParams.get("id");
  const body = await request.json();

  if (!id) {
    return Response.json(
      {
        result: {
          data: null,
          error: "ID Subtask tidak ditemukan!",
        },
      },
      {
        status: 404,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET",
          "Access-Control-Allow-Headers": "Content-Type, application/json",
        },
      }
    );
  }

  if (body) {
    try {
      const updateTask = await db.task.update({
        where: { id },
        data: body,
      });

      if (!updateTask) {
        return Response.json(
          {
            result: {
              data: null,
              error: "Subtask gagal diubah!",
            },
          },
          {
            status: 404,
            headers: {
              "Access-Control-Allow-Origin": "*",
              "Access-Control-Allow-Methods": "PATCH",
              "Access-Control-Allow-Headers": "Content-Type, application/json",
            },
          }
        );
      }
      return Response.json(
        {
          result: {
            data: "Subtask berhasil diubah!",
            error: "",
          },
        },
        {
          status: 200,
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "PATCH",
            "Access-Control-Allow-Headers": "Content-Type, application/json",
          },
        }
      );
    } catch (err) {
      return Response.json(
        {
          result: {
            data: null,
            error: (err as Error).message,
          },
        },
        {
          status: 500,
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "PATCH",
            "Access-Control-Allow-Headers": "Content-Type, application/json",
          },
        }
      );
    }
  }
}
