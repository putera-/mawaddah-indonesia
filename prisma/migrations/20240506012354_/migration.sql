/*
  Warnings:

  - You are about to alter the column `expiredAt` on the `activation` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `expiredAt` on the `auth` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `expiredAt` on the `reset_password` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - Made the column `userId` on table `payment` required. This step will fail if there are existing NULL values in that column.
  - Made the column `userId` on table `taaruf_gold` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE `payment` DROP FOREIGN KEY `Payment_userId_fkey`;

-- DropForeignKey
ALTER TABLE `taaruf_gold` DROP FOREIGN KEY `Taaruf_gold_userId_fkey`;

-- AlterTable
ALTER TABLE `activation` MODIFY `expiredAt` DATETIME NOT NULL;

-- AlterTable
ALTER TABLE `auth` MODIFY `expiredAt` DATETIME NOT NULL;

-- AlterTable
ALTER TABLE `payment` MODIFY `userId` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `reset_password` MODIFY `expiredAt` DATETIME NOT NULL;

-- AlterTable
ALTER TABLE `taaruf_gold` MODIFY `userId` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `Taaruf_gold` ADD CONSTRAINT `Taaruf_gold_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Payment` ADD CONSTRAINT `Payment_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
