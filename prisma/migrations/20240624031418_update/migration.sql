-- CreateTable
CREATE TABLE `marriage_preparation` (
    `id` VARCHAR(191) NOT NULL,
    `biodataId` VARCHAR(191) NULL,
    `visi` TEXT NULL,
    `misi` TEXT NULL,
    `mental` TEXT NULL,
    `mahar` TEXT NULL,
    `cost` TEXT NULL,
    `span_time` TEXT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `marriage_preparation_biodataId_key`(`biodataId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `marriage_preparation` ADD CONSTRAINT `marriage_preparation_biodataId_fkey` FOREIGN KEY (`biodataId`) REFERENCES `biodata`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
