/*
  Warnings:

  - You are about to alter the column `expiredAt` on the `activation` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `expiredAt` on the `auth` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to drop the column `domicile_province` on the `biodata` table. All the data in the column will be lost.
  - You are about to drop the column `hometown_province` on the `biodata` table. All the data in the column will be lost.
  - You are about to drop the `education` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `education` DROP FOREIGN KEY `Education_biodataId_fkey`;

-- AlterTable
ALTER TABLE `activation` MODIFY `expiredAt` DATETIME NOT NULL;

-- AlterTable
ALTER TABLE `auth` MODIFY `expiredAt` DATETIME NOT NULL;

-- AlterTable
ALTER TABLE `biodata` DROP COLUMN `domicile_province`,
    DROP COLUMN `hometown_province`;

-- DropTable
DROP TABLE `education`;

-- CreateTable
CREATE TABLE `Province` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(100) NOT NULL,
    `domicileId` VARCHAR(191) NOT NULL,
    `hometownId` VARCHAR(191) NOT NULL,
    `deleted` BOOLEAN NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Province` ADD CONSTRAINT `Province_domicileId_fkey` FOREIGN KEY (`domicileId`) REFERENCES `Biodata`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Province` ADD CONSTRAINT `Province_hometownId_fkey` FOREIGN KEY (`hometownId`) REFERENCES `Biodata`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
