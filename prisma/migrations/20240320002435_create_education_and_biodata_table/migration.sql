/*
  Warnings:

  - You are about to alter the column `expiredAt` on the `activation` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `expiredAt` on the `auth` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.

*/
-- AlterTable
ALTER TABLE `activation` MODIFY `expiredAt` DATETIME NOT NULL;

-- AlterTable
ALTER TABLE `auth` MODIFY `expiredAt` DATETIME NOT NULL;

-- CreateTable
CREATE TABLE `Biodata` (
    `id` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `bio` TEXT NOT NULL,
    `phone` VARCHAR(20) NOT NULL,
    `manhaj` ENUM('SALAF', 'BARU_BELAJAR', 'NON_SALAF') NOT NULL,
    `gender` ENUM('PRIA', 'WANITA') NOT NULL,
    `marriage_status` ENUM('LAJANG', 'MENIKAH', 'DUDA', 'JANDA') NOT NULL,
    `marriage_permission` ENUM('POLIGAMI', 'NON_POLIGAMI') NOT NULL,
    `dob` DATE NOT NULL,
    `birth_place` VARCHAR(100) NOT NULL,
    `birth_order` TINYINT NOT NULL,
    `domicile_town` VARCHAR(100) NOT NULL,
    `domicile_province` VARCHAR(100) NOT NULL,
    `hometown_province` VARCHAR(100) NOT NULL,
    `ethnic` VARCHAR(100) NOT NULL,
    `createdAt` DATE NOT NULL,
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `Biodata_userId_key`(`userId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Education` (
    `id` VARCHAR(191) NOT NULL,
    `biodataId` VARCHAR(191) NULL,
    `institutionName` VARCHAR(100) NOT NULL,
    `major` VARCHAR(50) NULL,
    `degree` VARCHAR(50) NULL,
    `city` VARCHAR(50) NULL,
    `startYear` INTEGER NOT NULL,
    `endYear` INTEGER NOT NULL,
    `deleted` BOOLEAN NOT NULL DEFAULT false,
    `createdAt` DATE NOT NULL,
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Biodata` ADD CONSTRAINT `Biodata_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Education` ADD CONSTRAINT `Education_biodataId_fkey` FOREIGN KEY (`biodataId`) REFERENCES `Biodata`(`userId`) ON DELETE SET NULL ON UPDATE CASCADE;
