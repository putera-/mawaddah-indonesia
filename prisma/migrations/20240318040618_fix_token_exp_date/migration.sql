/*
  Warnings:

  - Changed the type of `expiredAt` on the `auth` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE `auth` DROP COLUMN `expiredAt`,
    ADD COLUMN `expiredAt` DATETIME NOT NULL,
    ALTER COLUMN `path` DROP DEFAULT,
    ALTER COLUMN `method` DROP DEFAULT;

-- CreateTable
CREATE TABLE `Activation` (
    `id` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NULL,
    `activation_key` VARCHAR(200) NOT NULL,
    `used` BOOLEAN NOT NULL DEFAULT false,
    `expiredAt` DATETIME NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Activation` ADD CONSTRAINT `Activation_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
