/*
  Warnings:

  - You are about to drop the column `userId` on the `ListItem` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[animeId,listId]` on the table `ListItem` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[userId,animeId]` on the table `Opinion` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `animeBannerImage` to the `ListItem` table without a default value. This is not possible if the table is not empty.
  - Added the required column `animeColor` to the `ListItem` table without a default value. This is not possible if the table is not empty.
  - Added the required column `animeFormat` to the `ListItem` table without a default value. This is not possible if the table is not empty.
  - Added the required column `animeStatus` to the `ListItem` table without a default value. This is not possible if the table is not empty.
  - Added the required column `episodeProgress` to the `ListItem` table without a default value. This is not possible if the table is not empty.
  - Added the required column `rating` to the `ListItem` table without a default value. This is not possible if the table is not empty.
  - Added the required column `totalEpisodes` to the `ListItem` table without a default value. This is not possible if the table is not empty.
  - Added the required column `animeId` to the `Opinion` table without a default value. This is not possible if the table is not empty.
  - Added the required column `edited` to the `Opinion` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ListItem" DROP COLUMN "userId",
ADD COLUMN     "addedToListAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "animeBannerImage" TEXT NOT NULL,
ADD COLUMN     "animeColor" TEXT NOT NULL,
ADD COLUMN     "animeFormat" TEXT NOT NULL,
ADD COLUMN     "animeImage" TEXT,
ADD COLUMN     "animeStatus" TEXT NOT NULL,
ADD COLUMN     "animeTitle" TEXT,
ADD COLUMN     "episodeProgress" INTEGER NOT NULL,
ADD COLUMN     "rating" INTEGER NOT NULL,
ADD COLUMN     "totalEpisodes" INTEGER NOT NULL,
ADD COLUMN     "viewStatus" TEXT;

-- AlterTable
ALTER TABLE "Opinion" ADD COLUMN     "animeId" INTEGER NOT NULL,
ADD COLUMN     "edited" BOOLEAN NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "ListItem_animeId_listId_key" ON "ListItem"("animeId", "listId");

-- CreateIndex
CREATE UNIQUE INDEX "Opinion_userId_animeId_key" ON "Opinion"("userId", "animeId");
