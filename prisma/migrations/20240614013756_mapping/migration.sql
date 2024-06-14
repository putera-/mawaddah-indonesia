/*
  Warnings:

  - You are about to drop the `nonphysicalcharacter` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `nonphysicalcharacter` DROP FOREIGN KEY `NonPhysicalCharacter_biodataId_fkey`;

-- DropTable
DROP TABLE `nonphysicalcharacter`;

-- CreateTable
CREATE TABLE `non_physical_character` (
    `id` VARCHAR(191) NOT NULL,
    `motto` TEXT NULL,
    `life_goal` TEXT NULL,
    `hobby` TEXT NULL,
    `spare_time_activity` TEXT NULL,
    `positive_traits` TEXT NULL,
    `negative_traits` TEXT NULL,
    `liked_things` TEXT NULL,
    `unliked_things` TEXT NULL,
    `drink_alcohol` BOOLEAN NOT NULL DEFAULT false,
    `smoking` BOOLEAN NOT NULL DEFAULT false,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `biodataId` VARCHAR(191) NULL,

    UNIQUE INDEX `non_physical_character_biodataId_key`(`biodataId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `non_physical_character` ADD CONSTRAINT `non_physical_character_biodataId_fkey` FOREIGN KEY (`biodataId`) REFERENCES `biodata`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
