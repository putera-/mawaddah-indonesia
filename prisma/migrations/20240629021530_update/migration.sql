-- CreateTable
CREATE TABLE `education` (
    `id` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NULL,
    `institution_name` VARCHAR(100) NOT NULL,
    `major` VARCHAR(100) NULL,
    `degree` VARCHAR(100) NULL,
    `city` VARCHAR(100) NULL,
    `startYear` YEAR NOT NULL,
    `endYear` YEAR NULL,
    `deleted` BOOLEAN NOT NULL DEFAULT false,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `biodataId` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `education_biodataId_key`(`biodataId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `education` ADD CONSTRAINT `education_biodataId_fkey` FOREIGN KEY (`biodataId`) REFERENCES `biodata`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
