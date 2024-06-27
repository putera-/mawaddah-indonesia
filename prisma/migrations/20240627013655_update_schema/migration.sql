-- AlterTable
ALTER TABLE `life_goal` ADD COLUMN `long_term_achievement` TEXT NULL,
    ADD COLUMN `short_term_achievement` TEXT NULL,
    ADD COLUMN `wife_work_permit` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `wife_work_permit_desc` TEXT NULL;
