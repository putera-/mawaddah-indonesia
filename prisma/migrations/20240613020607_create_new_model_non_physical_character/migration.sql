-- CreateTable
CREATE TABLE `NonPhysicalCharacter` (
    `id` VARCHAR(191) NOT NULL,
    `motto` TEXT NOT NULL,
    `life_goal` TEXT NOT NULL,
    `hobby` TEXT NOT NULL,
    `spare_time_activity` TEXT NOT NULL,
    `positive_traits` TEXT NOT NULL,
    `negative_traits` TEXT NOT NULL,
    `liked_things` TEXT NOT NULL,
    `unliked_things` TEXT NOT NULL,
    `drink_alcohol` BOOLEAN NOT NULL DEFAULT false,
    `smoking` BOOLEAN NOT NULL DEFAULT false,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `biodataId` VARCHAR(191) NULL,

    UNIQUE INDEX `NonPhysicalCharacter_biodataId_key`(`biodataId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `NonPhysicalCharacter` ADD CONSTRAINT `NonPhysicalCharacter_biodataId_fkey` FOREIGN KEY (`biodataId`) REFERENCES `biodata`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
