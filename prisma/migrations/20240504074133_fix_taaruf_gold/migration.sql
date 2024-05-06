/*
  Warnings:

  - You are about to alter the column `expiredAt` on the `activation` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `expiredAt` on the `auth` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `expiredAt` on the `reset_password` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - A unique constraint covering the columns `[id]` on the table `Taaruf_gold` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `activation` MODIFY `expiredAt` DATETIME NOT NULL;

-- AlterTable
ALTER TABLE `auth` MODIFY `expiredAt` DATETIME NOT NULL;

-- AlterTable
ALTER TABLE `reset_password` MODIFY `expiredAt` DATETIME NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Taaruf_gold_id_key` ON `Taaruf_gold`(`id`);
