/*
  Warnings:

  - You are about to alter the column `expiredAt` on the `activation` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `expiredAt` on the `auth` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `expiredAt` on the `reset_password` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - Added the required column `gross_amount` to the `Payment` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `activation` MODIFY `expiredAt` DATETIME NOT NULL;

-- AlterTable
ALTER TABLE `auth` MODIFY `expiredAt` DATETIME NOT NULL;

-- AlterTable
ALTER TABLE `payment` ADD COLUMN `gross_amount` INTEGER NOT NULL,
    ADD COLUMN `paidAt` DATETIME(3) NULL,
    ADD COLUMN `status` ENUM('SUCCESS', 'PENDING', 'FAILED') NULL DEFAULT 'PENDING';

-- AlterTable
ALTER TABLE `reset_password` MODIFY `expiredAt` DATETIME NOT NULL;

-- AlterTable
ALTER TABLE `taaruf_gold` MODIFY `startedAt` DATETIME(3) NULL,
    MODIFY `endingAt` DATETIME(3) NULL;
