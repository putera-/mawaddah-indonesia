-- CreateTable
CREATE TABLE `ibadah` (
    `id` VARCHAR(191) NOT NULL,
    `ShalatFardu` ENUM('Rutin_di_masjid', 'Kadang_di_masjid', 'Bolong_bolong', 'Pernah_sekali', 'Belum_pernah') NULL,
    `ShalatRawatib` ENUM('Rutin', 'Kadang_kadang', 'Pernah_sekali', 'Belum_pernah') NULL,
    `ShalatDhuha` ENUM('Rutin', 'Kadang_kadang', 'Pernah_sekali', 'Belum_pernah') NULL,
    `ShalatTahajud` ENUM('Rutin', 'Kadang_kadang', 'Pernah_sekali', 'Belum_pernah') NULL,
    `PuasaRamadhan` ENUM('Rutin', 'Kadang_kadang', 'Pernah_sekali', 'Belum_pernah') NULL,
    `PuasaSeninKamis` ENUM('Rutin', 'Kadang_kadang', 'Pernah_sekali', 'Belum_pernah') NULL,
    `PuasaDaud` ENUM('Rutin', 'Kadang_kadang', 'Pernah_sekali', 'Belum_pernah') NULL,
    `PuasaAyamulBid` ENUM('Rutin', 'Kadang_kadang', 'Pernah_sekali', 'Belum_pernah') NULL,
    `Zakat` ENUM('Rutin', 'Kadang_kadang', 'Pernah_sekali', 'Belum_pernah') NULL,
    `Sedekah` ENUM('Rutin', 'Kadang_kadang', 'Pernah_sekali', 'Belum_pernah') NULL,
    `Umrah` ENUM('Rutin', 'Kadang_kadang', 'Pernah_sekali', 'Belum_pernah') NULL,
    `Haji` ENUM('Pernah', 'Belum') NULL,
    `biodataId` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `ibadah_biodataId_key`(`biodataId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `ibadah` ADD CONSTRAINT `ibadah_biodataId_fkey` FOREIGN KEY (`biodataId`) REFERENCES `biodata`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
