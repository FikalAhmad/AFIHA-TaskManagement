import db from "@/lib/db";
import { NextRequest } from "next/server";

export const GET = async (request: NextRequest) => {
  const id = request.nextUrl.searchParams.get("id");
  const userId = request.nextUrl.searchParams.get("userId");

  if (!id) {
    if (userId) {
      const stickynote = await db.stickyNote.findMany({
        where: { userId },
      });
      return Response.json(
        {
          result: {
            data: stickynote,
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
          error: "ID sticky note tidak ditemukan!",
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
    const stickynote = await db.stickyNote.findUnique({
      where: { id: id },
    });

    if (!stickynote) {
      return Response.json(
        {
          result: {
            data: null,
            error: "Sticky note tidak ditemukan",
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
          data: stickynote,
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
  const requiredFields = ["title", "content", "color", "userId"];
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
    const addStickyNote = await db.stickyNote.create({
      data: {
        title: body.title,
        content: body.content,
        color: body.color,
        userId: body.userId,
      },
    });

    if (!addStickyNote) {
      return Response.json(
        {
          result: {
            data: null,
            error: "Gagal menambahkan Sticky note!",
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
          data: "Sticky note berhasil ditambah!",
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
    const deleteStickyNote = await db.stickyNote.deleteMany({
      where: {
        id: {
          in: body, // Menggunakan kondisi `in` untuk mencocokkan semua userId dalam array
        },
      },
    });

    if (!deleteStickyNote) {
      return Response.json(
        {
          result: {
            data: null,
            error: "Sticky note gagal dihapus!",
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
          data: "Sticky note berhasil dihapus!",
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
      const updateStickyNote = await db.stickyNote.update({
        where: { id },
        data: body,
      });

      if (!updateStickyNote) {
        return Response.json(
          {
            result: {
              data: null,
              error: "Sticky note gagal diubah!",
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
            data: "Sticky note berhasil diubah!",
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
