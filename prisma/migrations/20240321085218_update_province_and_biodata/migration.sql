/*
  Warnings:

  - You are about to alter the column `expiredAt` on the `activation` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `expiredAt` on the `auth` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to drop the column `domicileId` on the `province` table. All the data in the column will be lost.
  - You are about to drop the column `hometownId` on the `province` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[name]` on the table `Province` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `domicile_province` to the `Biodata` table without a default value. This is not possible if the table is not empty.
  - Added the required column `hometown_province` to the `Biodata` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `province` DROP FOREIGN KEY `Province_domicileId_fkey`;

-- DropForeignKey
ALTER TABLE `province` DROP FOREIGN KEY `Province_hometownId_fkey`;

-- AlterTable
ALTER TABLE `activation` MODIFY `expiredAt` DATETIME NOT NULL;

-- AlterTable
ALTER TABLE `auth` MODIFY `expiredAt` DATETIME NOT NULL;

-- AlterTable
ALTER TABLE `biodata` ADD COLUMN `domicile_province` VARCHAR(100) NOT NULL,
    ADD COLUMN `hometown_province` VARCHAR(100) NOT NULL;

-- AlterTable
ALTER TABLE `province` DROP COLUMN `domicileId`,
    DROP COLUMN `hometownId`,
    MODIFY `deleted` BOOLEAN NOT NULL DEFAULT false;

-- CreateIndex
CREATE UNIQUE INDEX `Province_name_key` ON `Province`(`name`);
