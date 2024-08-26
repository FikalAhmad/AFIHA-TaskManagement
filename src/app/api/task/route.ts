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
          error: "ID task tidak ditemukan!",
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
        list: {
          include: {
            list: {
              select: {
                name: true,
                color: true,
              },
            },
          },
        },
      },
    });

    if (!task) {
      return Response.json(
        {
          result: {
            data: null,
            error: "Task tidak ditemukan",
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
            error: "Gagal menambahkan task!",
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
          data: "Task berhasil ditambah!",
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

export const DELETE = async (request: NextRequest) => {
  const body = await request.json();

  try {
    const deleteTask = await db.task.deleteMany({
      where: {
        id: {
          in: body, // Menggunakan kondisi `in` untuk mencocokkan semua userId dalam array
        },
      },
    });

    if (!deleteTask) {
      return Response.json(
        {
          result: {
            data: null,
            error: "Task gagal dihapus!",
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
          data: "Task berhasil dihapus!",
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
};

export const PATCH = async (request: NextRequest) => {
  const id = request.nextUrl.searchParams.get("id");
  const { title, description, list } = await request.json();

  if (!id) {
    return Response.json(
      {
        result: {
          data: null,
          error: "ID Task tidak ditemukan!",
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
    const updateData = {
      ...(title && { title }), // Add title if provided
      ...(description && { description }), // Add description if provided
      ...(list && {
        list: {
          create: {
            list: {
              connect: {
                id: list,
              },
            },
          },
        },
      }),
    };
    const updateTask = await db.task.update({
      where: { id },
      data: updateData,
    });

    if (!updateTask) {
      return Response.json(
        {
          result: {
            data: null,
            error: "Task gagal diubah!",
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
          data: "Task berhasil diubah!",
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
};
