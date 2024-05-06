/*
  Warnings:

  - You are about to alter the column `expiredAt` on the `activation` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `expiredAt` on the `auth` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `expiredAt` on the `reset_password` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - A unique constraint covering the columns `[paymentId]` on the table `Midtrans_callback` will be added. If there are existing duplicate values, this will fail.
  - Made the column `paymentId` on table `midtrans_callback` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE `midtrans_callback` DROP FOREIGN KEY `MIdtrans_callback_paymentId_fkey`;

-- AlterTable
ALTER TABLE `activation` MODIFY `expiredAt` DATETIME NOT NULL;

-- AlterTable
ALTER TABLE `auth` MODIFY `expiredAt` DATETIME NOT NULL;

-- AlterTable
ALTER TABLE `midtrans_callback` MODIFY `paymentId` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `reset_password` MODIFY `expiredAt` DATETIME NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Midtrans_callback_paymentId_key` ON `Midtrans_callback`(`paymentId`);

-- AddForeignKey
ALTER TABLE `Midtrans_callback` ADD CONSTRAINT `Midtrans_callback_paymentId_fkey` FOREIGN KEY (`paymentId`) REFERENCES `Payment`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
