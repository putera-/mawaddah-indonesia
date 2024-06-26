/*
  Warnings:

  - You are about to drop the column `userId` on the `life_goal` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[biodataId]` on the table `life_goal` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE `life_goal` DROP FOREIGN KEY `life_goal_userId_fkey`;

-- AlterTable
ALTER TABLE `life_goal` DROP COLUMN `userId`;

-- CreateIndex
CREATE UNIQUE INDEX `life_goal_biodataId_key` ON `life_goal`(`biodataId`);
