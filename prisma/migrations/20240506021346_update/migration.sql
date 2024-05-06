/*
  Warnings:

  - You are about to alter the column `expiredAt` on the `activation` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `expiredAt` on the `auth` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `expiredAt` on the `reset_password` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.

*/
-- DropForeignKey
ALTER TABLE `payment` DROP FOREIGN KEY `Payment_taaruf_goldId_fkey`;

-- AlterTable
ALTER TABLE `activation` MODIFY `expiredAt` DATETIME NOT NULL;

-- AlterTable
ALTER TABLE `auth` MODIFY `expiredAt` DATETIME NOT NULL;

-- AlterTable
ALTER TABLE `payment` MODIFY `taaruf_goldId` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `reset_password` MODIFY `expiredAt` DATETIME NOT NULL;

-- AddForeignKey
ALTER TABLE `Payment` ADD CONSTRAINT `Payment_taaruf_goldId_fkey` FOREIGN KEY (`taaruf_goldId`) REFERENCES `Taaruf_gold`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
