-- CreateTable
CREATE TABLE "stickynotes" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "color" TEXT NOT NULL,

    CONSTRAINT "stickynotes_pkey" PRIMARY KEY ("id")
);
