/*
  Warnings:

  - You are about to drop the column `title` on the `life_goal` table. All the data in the column will be lost.
  - Added the required column `career` to the `life_goal` table without a default value. This is not possible if the table is not empty.
  - Added the required column `child_count` to the `life_goal` table without a default value. This is not possible if the table is not empty.
  - Added the required column `child_education` to the `life_goal` table without a default value. This is not possible if the table is not empty.
  - Added the required column `domicile` to the `life_goal` table without a default value. This is not possible if the table is not empty.
  - Added the required column `financial_arrangement` to the `life_goal` table without a default value. This is not possible if the table is not empty.
  - Added the required column `knowledge_upgrade` to the `life_goal` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `life_goal` DROP COLUMN `title`,
    ADD COLUMN `career` TEXT NOT NULL,
    ADD COLUMN `child_count` TEXT NOT NULL,
    ADD COLUMN `child_education` TEXT NOT NULL,
    ADD COLUMN `domicile` TEXT NOT NULL,
    ADD COLUMN `financial_arrangement` TEXT NOT NULL,
    ADD COLUMN `knowledge_upgrade` TEXT NOT NULL;
