/*
  Warnings:

  - A unique constraint covering the columns `[opinionId,userId]` on the table `OpinionResponse` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "OpinionResponse_opinionId_userId_key" ON "OpinionResponse"("opinionId", "userId");
