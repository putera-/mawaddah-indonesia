/*
  Warnings:

  - You are about to drop the column `description` on the `physical_character` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `physical_character` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `physical_character` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `physical_character` DROP FOREIGN KEY `physical_character_userId_fkey`;

-- AlterTable
ALTER TABLE `physical_character` DROP COLUMN `description`,
    DROP COLUMN `title`,
    DROP COLUMN `userId`,
    ADD COLUMN `biodataId` VARCHAR(191) NULL,
    ADD COLUMN `body_shape` ENUM('sangat_kurus', 'kurus', 'atletis', 'normal', 'gempal', 'gemuk', 'sangat_gemuk') NOT NULL DEFAULT 'normal',
    ADD COLUMN `characteristic` VARCHAR(255) NULL,
    ADD COLUMN `characteristic_detail` VARCHAR(255) NULL,
    ADD COLUMN `eye_color` ENUM('hitam', 'coklat', 'biru', 'hijau') NOT NULL DEFAULT 'coklat',
    ADD COLUMN `hair_color` ENUM('hitam', 'pirang', 'merah', 'putih') NOT NULL DEFAULT 'hitam',
    ADD COLUMN `hair_type` ENUM('lurus', 'ikal', 'keriting', 'kribo', 'botak') NOT NULL DEFAULT 'lurus',
    ADD COLUMN `height` INTEGER NOT NULL DEFAULT 170,
    ADD COLUMN `medical_history` VARCHAR(255) NULL,
    ADD COLUMN `medical_history_detail` VARCHAR(255) NULL,
    ADD COLUMN `skin_color` ENUM('sawo_matang', 'putih', 'putih_kemerahan', 'gelap', 'hitam') NOT NULL DEFAULT 'putih',
    ADD COLUMN `weight` INTEGER NOT NULL DEFAULT 60;

-- AddForeignKey
ALTER TABLE `physical_character` ADD CONSTRAINT `physical_character_biodataId_fkey` FOREIGN KEY (`biodataId`) REFERENCES `biodata`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
