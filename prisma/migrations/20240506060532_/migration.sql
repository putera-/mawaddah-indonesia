/*
  Warnings:

  - You are about to alter the column `expiredAt` on the `activation` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `expiredAt` on the `auth` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `expiredAt` on the `reset_password` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.

*/
-- DropForeignKey
ALTER TABLE `midtrans_callback` DROP FOREIGN KEY `Midtrans_callback_paymentId_fkey`;

-- AlterTable
ALTER TABLE `activation` MODIFY `expiredAt` DATETIME NOT NULL;

-- AlterTable
ALTER TABLE `auth` MODIFY `expiredAt` DATETIME NOT NULL;

-- AlterTable
ALTER TABLE `midtrans_callback` MODIFY `paymentId` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `reset_password` MODIFY `expiredAt` DATETIME NOT NULL;

-- AddForeignKey
ALTER TABLE `Midtrans_callback` ADD CONSTRAINT `Midtrans_callback_paymentId_fkey` FOREIGN KEY (`paymentId`) REFERENCES `Payment`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
