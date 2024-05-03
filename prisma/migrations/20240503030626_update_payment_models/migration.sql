/*
  Warnings:

  - You are about to alter the column `expiredAt` on the `activation` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `expiredAt` on the `auth` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `expiredAt` on the `reset_password` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to drop the column `paymentId` on the `taaruf_gold` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[taaruf_goldId]` on the table `Payment` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `taaruf_goldId` to the `Payment` table without a default value. This is not possible if the table is not empty.
  - Made the column `status` on table `payment` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE `taaruf_gold` DROP FOREIGN KEY `Taaruf_gold_paymentId_fkey`;

-- AlterTable
ALTER TABLE `activation` MODIFY `expiredAt` DATETIME NOT NULL;

-- AlterTable
ALTER TABLE `auth` MODIFY `expiredAt` DATETIME NOT NULL;

-- AlterTable
ALTER TABLE `payment` ADD COLUMN `midtransToken` VARCHAR(255) NULL,
    ADD COLUMN `taaruf_goldId` VARCHAR(191) NOT NULL,
    MODIFY `status` VARCHAR(191) NOT NULL DEFAULT 'pending';

-- AlterTable
ALTER TABLE `reset_password` MODIFY `expiredAt` DATETIME NOT NULL;

-- AlterTable
ALTER TABLE `taaruf_gold` DROP COLUMN `paymentId`;

-- CreateIndex
CREATE UNIQUE INDEX `Payment_taaruf_goldId_key` ON `Payment`(`taaruf_goldId`);

-- AddForeignKey
ALTER TABLE `Payment` ADD CONSTRAINT `Payment_taaruf_goldId_fkey` FOREIGN KEY (`taaruf_goldId`) REFERENCES `Taaruf_gold`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
