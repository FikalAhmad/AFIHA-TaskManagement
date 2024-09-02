import db from "@/lib/db";
import { NextRequest } from "next/server";

export const GET = async (request: NextRequest) => {
  const id = request.nextUrl.searchParams.get("id");
  const userId = request.nextUrl.searchParams.get("userId");
  const taskId = request.nextUrl.searchParams.get("taskId");

  if (!id) {
    if (userId) {
      const list = await db.list.findMany({
        where: { userId },
      });
      return Response.json(
        {
          result: {
            data: list,
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
    const list = await db.list.findUnique({
      where: { id: id },
      include: {
        task: {
          include: {
            task: {
              select: {
                title: true,
                description: true,
              },
            },
          },
        },
      },
    });

    if (!list) {
      return Response.json(
        {
          result: {
            data: null,
            error: "List tidak ditemukan",
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
          data: list,
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
  const requiredFields = ["name", "color", "userId"];
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
    const addList = await db.list.create({
      data: {
        name: body.name,
        color: body.color,
        userId: body.userId,
      },
    });

    if (!addList) {
      return Response.json(
        {
          result: {
            data: null,
            error: "List gagal ditambah!",
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
          data: "List berhasil ditambah!",
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
          error: "ID List tidak ditemukan!",
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
    const deleteList = await db.list.delete({
      where: { id },
    });

    if (!deleteList) {
      return Response.json(
        {
          result: {
            data: null,
            error: "List gagal dihapus!",
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
          data: "List berhasil dihapus!",
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
          error: "ID list tidak ditemukan!",
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
      const updateList = await db.list.update({
        where: { id },
        data: body,
      });

      if (!updateList) {
        return Response.json(
          {
            result: {
              data: null,
              error: "List gagal diubah!",
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
            data: "List berhasil diubah!",
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
