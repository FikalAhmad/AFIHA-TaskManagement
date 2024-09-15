/*
  Warnings:

  - Added the required column `userId` to the `stickynotes` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "stickynotes" ADD COLUMN     "userId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "stickynotes" ADD CONSTRAINT "stickynotes_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
