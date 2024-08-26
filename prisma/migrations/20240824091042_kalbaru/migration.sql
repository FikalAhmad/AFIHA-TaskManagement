/*
  Warnings:

  - You are about to drop the `tasklist` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "tasklist" DROP CONSTRAINT "tasklist_listId_fkey";

-- DropForeignKey
ALTER TABLE "tasklist" DROP CONSTRAINT "tasklist_taskId_fkey";

-- DropTable
DROP TABLE "tasklist";

-- CreateTable
CREATE TABLE "_ListToTask" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_ListToTask_AB_unique" ON "_ListToTask"("A", "B");

-- CreateIndex
CREATE INDEX "_ListToTask_B_index" ON "_ListToTask"("B");

-- AddForeignKey
ALTER TABLE "_ListToTask" ADD CONSTRAINT "_ListToTask_A_fkey" FOREIGN KEY ("A") REFERENCES "lists"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ListToTask" ADD CONSTRAINT "_ListToTask_B_fkey" FOREIGN KEY ("B") REFERENCES "tasks"("id") ON DELETE CASCADE ON UPDATE CASCADE;
