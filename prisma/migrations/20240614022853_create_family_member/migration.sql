-- CreateTable
CREATE TABLE `family_member` (
    `id` VARCHAR(191) NOT NULL,
    `biodataId` VARCHAR(191) NULL,
    `relation` ENUM('ayah', 'ibu', 'kakak_pria', 'kakak_wanita', 'adik_pria', 'adik_wanita', 'ipar_pria', 'ipar_wanita') NULL,
    `religion` ENUM('islam', 'non_islam') NULL,
    `dob` DATE NOT NULL,
    `education` TEXT NOT NULL,
    `job` TEXT NOT NULL,
    `is_alive` BOOLEAN NOT NULL DEFAULT true,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `family_member` ADD CONSTRAINT `family_member_biodataId_fkey` FOREIGN KEY (`biodataId`) REFERENCES `biodata`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
