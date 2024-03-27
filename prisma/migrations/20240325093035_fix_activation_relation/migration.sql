/*
  Warnings:

  - You are about to drop the column `userId` on the `activation` table. All the data in the column will be lost.
  - You are about to alter the column `expiredAt` on the `activation` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `expiredAt` on the `auth` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `expiredAt` on the `reset_password` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.

*/
-- DropForeignKey
ALTER TABLE `activation` DROP FOREIGN KEY `activation_userId_fkey`;

-- AlterTable
ALTER TABLE `activation` DROP COLUMN `userId`,
    ADD COLUMN `email` VARCHAR(191) NULL,
    MODIFY `expiredAt` DATETIME NOT NULL;

-- AlterTable
ALTER TABLE `auth` MODIFY `expiredAt` DATETIME NOT NULL;

-- AlterTable
ALTER TABLE `reset_password` MODIFY `expiredAt` DATETIME NOT NULL;

-- AddForeignKey
ALTER TABLE `activation` ADD CONSTRAINT `activation_email_fkey` FOREIGN KEY (`email`) REFERENCES `user`(`email`) ON DELETE SET NULL ON UPDATE CASCADE;
