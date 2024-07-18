/*
  Warnings:

  - You are about to drop the `education` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `hobby` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `married_goal` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `skill` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `education` DROP FOREIGN KEY `education_userId_fkey`;

-- DropForeignKey
ALTER TABLE `hobby` DROP FOREIGN KEY `hobby_userId_fkey`;

-- DropForeignKey
ALTER TABLE `married_goal` DROP FOREIGN KEY `married_goal_userId_fkey`;

-- DropForeignKey
ALTER TABLE `skill` DROP FOREIGN KEY `skill_userId_fkey`;

-- DropTable
DROP TABLE `education`;

-- DropTable
DROP TABLE `hobby`;

-- DropTable
DROP TABLE `married_goal`;

-- DropTable
DROP TABLE `skill`;
