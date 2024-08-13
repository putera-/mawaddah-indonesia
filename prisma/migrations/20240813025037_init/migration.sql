-- CreateTable
CREATE TABLE `user` (
    `id` VARCHAR(191) NOT NULL,
    `old_id` INTEGER NULL,
    `email` VARCHAR(100) NOT NULL,
    `firstname` VARCHAR(100) NOT NULL,
    `lastname` VARCHAR(100) NOT NULL,
    `active` BOOLEAN NOT NULL DEFAULT false,
    `verified` BOOLEAN NOT NULL DEFAULT false,
    `avatar` VARCHAR(255) NULL,
    `avatar_md` VARCHAR(255) NULL,
    `blurred_avatar` VARCHAR(255) NULL,
    `blurred_avatar_md` VARCHAR(255) NULL,
    `role` ENUM('MEMBER', 'ADMIN', 'SUPERADMIN') NOT NULL DEFAULT 'MEMBER',
    `taaruf_status` ENUM('OPEN', 'PENDING', 'BLOCKED') NOT NULL DEFAULT 'BLOCKED',
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `user_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `backup_detail` (
    `userId` VARCHAR(191) NOT NULL,
    `old_id` INTEGER NOT NULL,

    UNIQUE INDEX `backup_detail_userId_key`(`userId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `password` (
    `id` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `password` VARCHAR(255) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `password_userId_key`(`userId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

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
    `tiktok` VARCHAR(100) NULL,
    `instagram` VARCHAR(100) NULL,
    `linkedin` VARCHAR(100) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `auth` (
    `id` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `access_token` VARCHAR(300) NOT NULL,
    `expiredAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `path` VARCHAR(100) NOT NULL,
    `method` VARCHAR(100) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `reset_password` (
    `id` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `used` BOOLEAN NOT NULL DEFAULT false,
    `expiredAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `gallery` (
    `id` VARCHAR(191) NOT NULL,
    `clientId` VARCHAR(191) NOT NULL,
    `title` VARCHAR(100) NULL,
    `photo` TEXT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `slider` (
    `id` VARCHAR(191) NOT NULL,
    `clientId` VARCHAR(191) NOT NULL,
    `title` TEXT NULL,
    `photo` TEXT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `faq` (
    `id` VARCHAR(191) NOT NULL,
    `clientId` VARCHAR(191) NOT NULL,
    `question` VARCHAR(255) NOT NULL,
    `answer` VARCHAR(255) NOT NULL,
    `deleted` BOOLEAN NOT NULL DEFAULT false,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `activation` (
    `id` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `used` BOOLEAN NOT NULL DEFAULT false,
    `expiredAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `biodata` (
    `id` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `bio` TEXT NOT NULL,
    `phone` VARCHAR(20) NOT NULL,
    `company` VARCHAR(100) NULL,
    `manhaj` ENUM('SALAF', 'BARU_BELAJAR', 'NON_SALAF') NOT NULL,
    `gender` ENUM('PRIA', 'WANITA') NOT NULL,
    `marriage_status` ENUM('LAJANG', 'MENIKAH', 'CERAI_HIDUP', 'CERAI_MATI') NOT NULL,
    `marriage_permission` ENUM('POLIGAMI', 'NON_POLIGAMI') NOT NULL,
    `dob` DATE NOT NULL,
    `birth_place` VARCHAR(100) NOT NULL,
    `birth_order` TINYINT NOT NULL,
    `address` VARCHAR(100) NOT NULL,
    `address_town` VARCHAR(100) NOT NULL,
    `address_province` VARCHAR(100) NOT NULL,
    `hometown_province` VARCHAR(100) NOT NULL,
    `address_zip_code` INTEGER NOT NULL,
    `ethnic` VARCHAR(100) NOT NULL,
    `poligami_opinion` TEXT NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `biodata_userId_key`(`userId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `province` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(100) NOT NULL,
    `deleted` BOOLEAN NOT NULL DEFAULT false,

    UNIQUE INDEX `province_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `education` (
    `id` VARCHAR(191) NOT NULL,
    `institution_name` VARCHAR(100) NOT NULL,
    `major` VARCHAR(100) NULL,
    `degree` VARCHAR(100) NULL,
    `city` VARCHAR(100) NULL,
    `startYear` YEAR NOT NULL,
    `endYear` YEAR NULL,
    `deleted` BOOLEAN NOT NULL DEFAULT false,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `biodataId` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `education_biodataId_key`(`biodataId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `life_goal` (
    `id` VARCHAR(191) NOT NULL,
    `career` TEXT NULL,
    `domicile` TEXT NULL,
    `child_count` TEXT NULL,
    `child_education` TEXT NULL,
    `financial_arrangement` TEXT NULL,
    `knowledge_upgrade` TEXT NULL,
    `short_term_achievement` TEXT NULL,
    `long_term_achievement` TEXT NULL,
    `wife_work_permit` BOOLEAN NOT NULL DEFAULT false,
    `wife_work_permit_desc` TEXT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `biodataId` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `life_goal_biodataId_key`(`biodataId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `physical_character` (
    `id` VARCHAR(191) NOT NULL,
    `height` INTEGER NOT NULL DEFAULT 0,
    `weight` INTEGER NOT NULL DEFAULT 0,
    `body_shape` ENUM('sangat_kurus', 'kurus', 'atletis', 'normal', 'gempal', 'gemuk', 'sangat_gemuk') NULL,
    `skin_color` ENUM('sawo_matang', 'putih', 'putih_kemerahan', 'gelap', 'hitam') NULL,
    `hair_color` ENUM('hitam', 'pirang', 'merah', 'putih') NULL,
    `hair_type` ENUM('lurus', 'ikal', 'keriting', 'kribo', 'botak') NULL,
    `eye_color` ENUM('hitam', 'coklat', 'biru', 'hijau') NULL,
    `characteristic` BOOLEAN NOT NULL DEFAULT false,
    `characteristic_detail` TEXT NULL,
    `medical_history` BOOLEAN NOT NULL DEFAULT false,
    `medical_history_detail` TEXT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `biodataId` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `physical_character_biodataId_key`(`biodataId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `non_physical_character` (
    `id` VARCHAR(191) NOT NULL,
    `motto` TEXT NULL,
    `life_goal` TEXT NULL,
    `hobby` TEXT NULL,
    `spare_time_activity` TEXT NULL,
    `positive_traits` TEXT NULL,
    `negative_traits` TEXT NULL,
    `liked_things` TEXT NULL,
    `unliked_things` TEXT NULL,
    `drink_alcohol` BOOLEAN NOT NULL DEFAULT false,
    `smoking` BOOLEAN NOT NULL DEFAULT false,
    `sport` TEXT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `biodataId` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `non_physical_character_biodataId_key`(`biodataId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `family_member` (
    `id` VARCHAR(191) NOT NULL,
    `biodataId` VARCHAR(191) NOT NULL,
    `relationship` ENUM('ayah', 'ibu', 'kakak_pria', 'kakak_wanita', 'adik_pria', 'adik_wanita', 'ipar_pria', 'ipar_wanita', 'anak_kandung', 'anak_angkat', 'none') NULL,
    `religion` ENUM('islam', 'non_islam') NULL,
    `dob` VARCHAR(20) NOT NULL,
    `education` TEXT NOT NULL,
    `job` TEXT NOT NULL,
    `is_alive` BOOLEAN NOT NULL DEFAULT true,
    `deleted` BOOLEAN NOT NULL DEFAULT false,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `taaruf_gold` (
    `id` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `startedAt` DATETIME(3) NULL,
    `endingAt` DATETIME(3) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `taaruf_gold_id_key`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `payment` (
    `id` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `gross_amount` INTEGER NOT NULL,
    `midtransToken` VARCHAR(255) NULL,
    `status` VARCHAR(191) NOT NULL DEFAULT 'pending',
    `paidAt` DATETIME(3) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `taaruf_goldId` VARCHAR(191) NULL,

    UNIQUE INDEX `payment_taaruf_goldId_key`(`taaruf_goldId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `midtrans_callback` (
    `id` VARCHAR(191) NOT NULL,
    `paymentId` VARCHAR(191) NOT NULL,
    `callback_data` LONGTEXT NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `midtrans_callback_paymentId_key`(`paymentId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `bookmark` (
    `id` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `candidateId` VARCHAR(191) NOT NULL,
    `bookmarked` BOOLEAN NOT NULL DEFAULT true,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `taaruf` (
    `id` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `candidateId` VARCHAR(191) NOT NULL,
    `status` BOOLEAN NOT NULL DEFAULT true,
    `message` TEXT NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `taaruf_approval` (
    `id` VARCHAR(191) NOT NULL,
    `taarufId` VARCHAR(191) NOT NULL,
    `status` ENUM('Pending', 'Yes', 'No') NOT NULL DEFAULT 'Pending',
    `message` TEXT NOT NULL,
    `reply` TEXT NOT NULL,
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `taaruf_approval_taarufId_key`(`taarufId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `nadhar` (
    `id` VARCHAR(191) NOT NULL,
    `taarufId` VARCHAR(191) NOT NULL,
    `schedule` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `status` ENUM('Pending', 'Yes', 'No') NOT NULL DEFAULT 'Pending',
    `message` TEXT NOT NULL,
    `reply` TEXT NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `khitbah` (
    `id` VARCHAR(191) NOT NULL,
    `taarufId` VARCHAR(191) NOT NULL,
    `schedule` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `status` ENUM('Pending', 'Yes', 'No') NOT NULL DEFAULT 'Pending',
    `message` TEXT NOT NULL,
    `reply` TEXT NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `akad` (
    `id` VARCHAR(191) NOT NULL,
    `taarufId` VARCHAR(191) NOT NULL,
    `schedule` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `status` ENUM('Pending', 'Yes', 'No') NOT NULL DEFAULT 'Pending',
    `message` TEXT NOT NULL,
    `reply` TEXT NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `marriage_preparation` (
    `id` VARCHAR(191) NOT NULL,
    `biodataId` VARCHAR(191) NOT NULL,
    `visi` TEXT NULL,
    `misi` TEXT NULL,
    `mental` TEXT NULL,
    `mahar` TEXT NULL,
    `cost` TEXT NULL,
    `span_time` TEXT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `marriage_preparation_biodataId_key`(`biodataId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ibadah` (
    `id` VARCHAR(191) NOT NULL,
    `shalat_fardu` ENUM('rutin_di_masjid', 'kadang_di_masjid', 'bolong_bolong', 'pernah_sekali', 'belum_pernah') NULL,
    `shalat_rawatib` ENUM('rutin', 'kadang_kadang', 'pernah_sekali', 'belum_pernah') NULL,
    `shalat_dhuha` ENUM('rutin', 'kadang_kadang', 'pernah_sekali', 'belum_pernah') NULL,
    `shalat_tahajud` ENUM('rutin', 'kadang_kadang', 'pernah_sekali', 'belum_pernah') NULL,
    `puasa_ramadhan` ENUM('rutin', 'kadang_kadang', 'pernah_sekali', 'belum_pernah') NULL,
    `puasa_senin_kamis` ENUM('rutin', 'kadang_kadang', 'pernah_sekali', 'belum_pernah') NULL,
    `puasa_daud` ENUM('rutin', 'kadang_kadang', 'pernah_sekali', 'belum_pernah') NULL,
    `puasa_ayamul_bid` ENUM('rutin', 'kadang_kadang', 'pernah_sekali', 'belum_pernah') NULL,
    `zakat` ENUM('rutin', 'kadang_kadang', 'pernah_sekali', 'belum_pernah') NULL,
    `sedekah` ENUM('rutin', 'kadang_kadang', 'pernah_sekali', 'belum_pernah') NULL,
    `umrah` ENUM('rutin', 'kadang_kadang', 'pernah_sekali', 'belum_pernah') NULL,
    `haji` BOOLEAN NOT NULL DEFAULT false,
    `biodataId` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `ibadah_biodataId_key`(`biodataId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `physical_criteria` (
    `id` VARCHAR(191) NOT NULL,
    `height` INTEGER NOT NULL DEFAULT 0,
    `weight` INTEGER NOT NULL DEFAULT 0,
    `body_shape` ENUM('sangat_kurus', 'kurus', 'atletis', 'normal', 'gempal', 'gemuk', 'sangat_gemuk') NULL,
    `skin_color` ENUM('sawo_matang', 'putih', 'putih_kemerahan', 'gelap', 'hitam') NULL,
    `hair_color` ENUM('hitam', 'pirang', 'merah', 'putih') NULL,
    `hair_type` ENUM('lurus', 'ikal', 'keriting', 'kribo', 'botak') NULL,
    `eye_color` ENUM('hitam', 'coklat', 'biru', 'hijau') NULL,
    `biodataId` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `physical_criteria_biodataId_key`(`biodataId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `non_physical_criteria` (
    `id` VARCHAR(191) NOT NULL,
    `age` INTEGER NULL,
    `domicile` VARCHAR(100) NULL,
    `education` VARCHAR(100) NULL,
    `married_status` ENUM('LAJANG', 'MENIKAH', 'CERAI_HIDUP', 'CERAI_MATI') NULL,
    `sport` TEXT NULL,
    `hobby` TEXT NULL,
    `traits` VARCHAR(100) NULL,
    `ethnic` VARCHAR(100) NULL,
    `job` VARCHAR(100) NULL,
    `other` TEXT NULL,
    `biodataId` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `non_physical_criteria_biodataId_key`(`biodataId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `question` (
    `id` VARCHAR(191) NOT NULL,
    `question` LONGTEXT NOT NULL,
    `deleted` BOOLEAN NOT NULL DEFAULT false,
    `userId` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `answer` (
    `id` VARCHAR(191) NOT NULL,
    `biodataId` VARCHAR(191) NOT NULL,
    `questionId` VARCHAR(191) NOT NULL,
    `answer` LONGTEXT NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `answer_questionId_biodataId_key`(`questionId`, `biodataId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

<<<<<<< HEAD
<<<<<<< HEAD:prisma/migrations/20240803012812_init/migration.sql
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> 0def8d3 (partial update)
-- AddForeignKey
ALTER TABLE `backup_detail` ADD CONSTRAINT `backup_detail_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

=======
>>>>>>> be6b178 (-handle partial physical character):prisma/migrations/20240805034552_init/migration.sql
=======
<<<<<<<< HEAD:prisma/migrations/20240814040347_init/migration.sql
<<<<<<< HEAD
=======
=======
<<<<<<<< HEAD:prisma/migrations/20240814040347_init/migration.sql
>>>>>>> 9d5a58e (-handle partial physical character)
<<<<<<<< HEAD:prisma/migrations/20240814040347_init/migration.sql
>>>>>>> 2523224 (partial update)
=======
>>>>>>> 0def8d3 (partial update)
-- AddForeignKey
ALTER TABLE `backup_detail` ADD CONSTRAINT `backup_detail_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

========
>>>>>>>> 9d5a58e (-handle partial physical character):prisma/migrations/20240805034552_init/migration.sql
<<<<<<< HEAD
<<<<<<< HEAD
=======
-- AddForeignKey
ALTER TABLE `backup_detail` ADD CONSTRAINT `backup_detail_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

<<<<<<< HEAD
=======
>>>>>>> be6b178 (-handle partial physical character):prisma/migrations/20240805034552_init/migration.sql
=======
========
>>>>>>>> 9d5a58e (-handle partial physical character):prisma/migrations/20240805034552_init/migration.sql
>>>>>>> 2523224 (partial update)
=======
>>>>>>> 0def8d3 (partial update)
>>>>>>> 9d5a58e (-handle partial physical character)
-- AddForeignKey
ALTER TABLE `backup_detail` ADD CONSTRAINT `backup_detail_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `password` ADD CONSTRAINT `password_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `auth` ADD CONSTRAINT `auth_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `reset_password` ADD CONSTRAINT `reset_password_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `gallery` ADD CONSTRAINT `gallery_clientId_fkey` FOREIGN KEY (`clientId`) REFERENCES `client`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `slider` ADD CONSTRAINT `slider_clientId_fkey` FOREIGN KEY (`clientId`) REFERENCES `client`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `faq` ADD CONSTRAINT `faq_clientId_fkey` FOREIGN KEY (`clientId`) REFERENCES `client`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `activation` ADD CONSTRAINT `activation_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `biodata` ADD CONSTRAINT `biodata_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `education` ADD CONSTRAINT `education_biodataId_fkey` FOREIGN KEY (`biodataId`) REFERENCES `biodata`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `life_goal` ADD CONSTRAINT `life_goal_biodataId_fkey` FOREIGN KEY (`biodataId`) REFERENCES `biodata`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `physical_character` ADD CONSTRAINT `physical_character_biodataId_fkey` FOREIGN KEY (`biodataId`) REFERENCES `biodata`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `non_physical_character` ADD CONSTRAINT `non_physical_character_biodataId_fkey` FOREIGN KEY (`biodataId`) REFERENCES `biodata`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `family_member` ADD CONSTRAINT `family_member_biodataId_fkey` FOREIGN KEY (`biodataId`) REFERENCES `biodata`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `taaruf_gold` ADD CONSTRAINT `taaruf_gold_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `payment` ADD CONSTRAINT `payment_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `payment` ADD CONSTRAINT `payment_taaruf_goldId_fkey` FOREIGN KEY (`taaruf_goldId`) REFERENCES `taaruf_gold`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `midtrans_callback` ADD CONSTRAINT `midtrans_callback_paymentId_fkey` FOREIGN KEY (`paymentId`) REFERENCES `payment`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `bookmark` ADD CONSTRAINT `bookmark_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `bookmark` ADD CONSTRAINT `bookmark_candidateId_fkey` FOREIGN KEY (`candidateId`) REFERENCES `user`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `taaruf` ADD CONSTRAINT `taaruf_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `taaruf` ADD CONSTRAINT `taaruf_candidateId_fkey` FOREIGN KEY (`candidateId`) REFERENCES `user`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `taaruf_approval` ADD CONSTRAINT `taaruf_approval_taarufId_fkey` FOREIGN KEY (`taarufId`) REFERENCES `taaruf`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `nadhar` ADD CONSTRAINT `nadhar_taarufId_fkey` FOREIGN KEY (`taarufId`) REFERENCES `taaruf`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `khitbah` ADD CONSTRAINT `khitbah_taarufId_fkey` FOREIGN KEY (`taarufId`) REFERENCES `taaruf`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `akad` ADD CONSTRAINT `akad_taarufId_fkey` FOREIGN KEY (`taarufId`) REFERENCES `taaruf`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `marriage_preparation` ADD CONSTRAINT `marriage_preparation_biodataId_fkey` FOREIGN KEY (`biodataId`) REFERENCES `biodata`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ibadah` ADD CONSTRAINT `ibadah_biodataId_fkey` FOREIGN KEY (`biodataId`) REFERENCES `biodata`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `physical_criteria` ADD CONSTRAINT `physical_criteria_biodataId_fkey` FOREIGN KEY (`biodataId`) REFERENCES `biodata`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `non_physical_criteria` ADD CONSTRAINT `non_physical_criteria_biodataId_fkey` FOREIGN KEY (`biodataId`) REFERENCES `biodata`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `question` ADD CONSTRAINT `question_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `answer` ADD CONSTRAINT `answer_biodataId_fkey` FOREIGN KEY (`biodataId`) REFERENCES `biodata`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `answer` ADD CONSTRAINT `answer_questionId_fkey` FOREIGN KEY (`questionId`) REFERENCES `question`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
