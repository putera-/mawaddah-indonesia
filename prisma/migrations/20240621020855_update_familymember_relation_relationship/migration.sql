/*
  Warnings:

  - You are about to drop the column `relation` on the `family_member` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `family_member` DROP COLUMN `relation`,
    ADD COLUMN `relationship` ENUM('ayah', 'ibu', 'kakak_pria', 'kakak_wanita', 'adik_pria', 'adik_wanita', 'ipar_pria', 'ipar_wanita') NULL;
