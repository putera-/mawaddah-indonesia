/*
  Warnings:

  - A unique constraint covering the columns `[biodataId]` on the table `physical_character` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `physical_character_biodataId_key` ON `physical_character`(`biodataId`);
