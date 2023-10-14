/*
  Warnings:

  - The primary key for the `Opinion` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Opinion` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "OpinionResponse" DROP CONSTRAINT "OpinionResponse_opinionId_fkey";

-- AlterTable
ALTER TABLE "Opinion" DROP CONSTRAINT "Opinion_pkey",
DROP COLUMN "id",
ADD COLUMN     "opinionId" SERIAL NOT NULL,
ADD CONSTRAINT "Opinion_pkey" PRIMARY KEY ("opinionId");

-- AddForeignKey
ALTER TABLE "OpinionResponse" ADD CONSTRAINT "OpinionResponse_opinionId_fkey" FOREIGN KEY ("opinionId") REFERENCES "Opinion"("opinionId") ON DELETE CASCADE ON UPDATE CASCADE;
