/*
  Warnings:

  - You are about to alter the column `deleted` on the `faq` table. The data in that column could be lost. The data in that column will be cast from `Int` to `TinyInt`.

*/
-- AlterTable
ALTER TABLE `faq` MODIFY `deleted` BOOLEAN NOT NULL DEFAULT false;
