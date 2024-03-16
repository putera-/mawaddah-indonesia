-- DropForeignKey
ALTER TABLE `faq` DROP FOREIGN KEY `faq_clientId_fkey`;

-- DropForeignKey
ALTER TABLE `gallery` DROP FOREIGN KEY `gallery_clientId_fkey`;

-- DropForeignKey
ALTER TABLE `slider` DROP FOREIGN KEY `slider_clientId_fkey`;

-- AlterTable
ALTER TABLE `faq` MODIFY `clientId` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `gallery` MODIFY `clientId` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `slider` MODIFY `clientId` VARCHAR(191) NULL;

-- AddForeignKey
ALTER TABLE `gallery` ADD CONSTRAINT `gallery_clientId_fkey` FOREIGN KEY (`clientId`) REFERENCES `client`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `slider` ADD CONSTRAINT `slider_clientId_fkey` FOREIGN KEY (`clientId`) REFERENCES `client`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `faq` ADD CONSTRAINT `faq_clientId_fkey` FOREIGN KEY (`clientId`) REFERENCES `client`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
