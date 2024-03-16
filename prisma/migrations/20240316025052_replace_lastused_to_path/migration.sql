/*
  Warnings:

  - You are about to drop the column `last_used` on the `auth` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `auth` DROP COLUMN `last_used`,
    ADD COLUMN `path` VARCHAR(100) NOT NULL DEFAULT '-';
