-- CreateTable
CREATE TABLE `client` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(100) NOT NULL,
    `about` TEXT NULL,
    `phone` VARCHAR(20) NOT NULL,
    `address` TEXT NOT NULL,
    `taaruf_muqoddimah` TEXT NULL,
    `login_muqoddimah` TEXT NULL,
    `signup_muqoddimah` TEXT NULL,
    `youtube` VARCHAR(100) NULL,
    `facebook` VARCHAR(100) NULL,
    `twitter` VARCHAR(100) NULL,
    `instagram` VARCHAR(100) NULL,
    `linkedin` VARCHAR(100) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
