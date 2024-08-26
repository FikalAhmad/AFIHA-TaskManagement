/*
  Warnings:

  - You are about to drop the `_ListToTask` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_ListToTask" DROP CONSTRAINT "_ListToTask_A_fkey";

-- DropForeignKey
ALTER TABLE "_ListToTask" DROP CONSTRAINT "_ListToTask_B_fkey";

-- DropTable
DROP TABLE "_ListToTask";

-- CreateTable
CREATE TABLE "tasklist" (
    "taskId" TEXT NOT NULL,
    "listId" TEXT NOT NULL,

    CONSTRAINT "tasklist_pkey" PRIMARY KEY ("taskId","listId")
);

-- AddForeignKey
ALTER TABLE "tasklist" ADD CONSTRAINT "tasklist_listId_fkey" FOREIGN KEY ("listId") REFERENCES "lists"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tasklist" ADD CONSTRAINT "tasklist_taskId_fkey" FOREIGN KEY ("taskId") REFERENCES "tasks"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
