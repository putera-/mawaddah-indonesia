/*
  Warnings:

  - You are about to alter the column `expiredAt` on the `activation` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `expiredAt` on the `auth` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `expiredAt` on the `reset_password` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - Made the column `paymentId` on table `midtrans_callback` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE `midtrans_callback` DROP FOREIGN KEY `Midtrans_callback_paymentId_fkey`;

ALTER TABLE `midtrans_callback` MODIFY `paymentId` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `Midtrans_callback` ADD CONSTRAINT `Midtrans_callback_paymentId_fkey` FOREIGN KEY (`paymentId`) REFERENCES `Payment`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
