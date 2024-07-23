/*
  Warnings:

  - Made the column `userId` on table `password` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE `password` DROP FOREIGN KEY `password_userId_fkey`;

-- AlterTable
ALTER TABLE `password` MODIFY `userId` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `password` ADD CONSTRAINT `password_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
