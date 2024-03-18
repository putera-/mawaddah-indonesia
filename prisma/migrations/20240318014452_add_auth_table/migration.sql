-- AlterTable
ALTER TABLE `auth` ALTER COLUMN `path` DROP DEFAULT,
    ALTER COLUMN `method` DROP DEFAULT;

-- CreateTable
CREATE TABLE `Activation` (
    `id` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NULL,
    `activation_key` VARCHAR(200) NOT NULL,
    `used` BOOLEAN NOT NULL DEFAULT false,
    `expiredAt` BIGINT NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Activation` ADD CONSTRAINT `Activation_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
