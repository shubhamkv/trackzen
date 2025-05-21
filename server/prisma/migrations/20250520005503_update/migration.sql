/*
  Warnings:

  - You are about to drop the column `isIdle` on the `WebsiteActivity` table. All the data in the column will be lost.
  - You are about to drop the column `wasActiveTab` on the `WebsiteActivity` table. All the data in the column will be lost.
  - Added the required column `totalTabs` to the `Session` table without a default value. This is not possible if the table is not empty.
  - Made the column `endTime` on table `Session` required. This step will fail if there are existing NULL values in that column.
  - Made the column `sessionId` on table `WebsiteActivity` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "WebsiteActivity" DROP CONSTRAINT "WebsiteActivity_sessionId_fkey";

-- AlterTable
ALTER TABLE "Session" ADD COLUMN     "totalTabs" INTEGER NOT NULL,
ALTER COLUMN "endTime" SET NOT NULL;

-- AlterTable
ALTER TABLE "WebsiteActivity" DROP COLUMN "isIdle",
DROP COLUMN "wasActiveTab",
ALTER COLUMN "sessionId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "WebsiteActivity" ADD CONSTRAINT "WebsiteActivity_sessionId_fkey" FOREIGN KEY ("sessionId") REFERENCES "Session"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
