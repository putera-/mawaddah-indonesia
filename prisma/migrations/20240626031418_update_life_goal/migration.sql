-- AlterTable
ALTER TABLE `life_goal` ADD COLUMN `biodataId` VARCHAR(191) NULL;

-- AddForeignKey
ALTER TABLE `life_goal` ADD CONSTRAINT `life_goal_biodataId_fkey` FOREIGN KEY (`biodataId`) REFERENCES `biodata`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
