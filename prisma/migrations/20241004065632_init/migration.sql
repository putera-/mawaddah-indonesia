-- CreateEnum
CREATE TYPE "RoleStatus" AS ENUM ('MEMBER', 'ADMIN', 'SUPERADMIN');

-- CreateEnum
CREATE TYPE "TaarufStatus" AS ENUM ('OPEN', 'PENDING', 'BLOCKED');

-- CreateEnum
CREATE TYPE "ManhajStatus" AS ENUM ('SALAF', 'BARU_BELAJAR', 'NON_SALAF');

-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('PRIA', 'WANITA');

-- CreateEnum
CREATE TYPE "MarriageStatus" AS ENUM ('LAJANG', 'MENIKAH', 'CERAI_HIDUP', 'CERAI_MATI');

-- CreateEnum
CREATE TYPE "MarriagePermission" AS ENUM ('POLIGAMI', 'NON_POLIGAMI');

-- CreateEnum
CREATE TYPE "body_shape" AS ENUM ('sangat_kurus', 'kurus', 'atletis', 'normal', 'gempal', 'gemuk', 'sangat_gemuk');

-- CreateEnum
CREATE TYPE "skin_color" AS ENUM ('sawo_matang', 'putih', 'putih_kemerahan', 'gelap', 'hitam');

-- CreateEnum
CREATE TYPE "hair_color" AS ENUM ('hitam', 'pirang', 'merah', 'putih');

-- CreateEnum
CREATE TYPE "hair_type" AS ENUM ('lurus', 'ikal', 'keriting', 'kribo', 'botak');

-- CreateEnum
CREATE TYPE "eye_Color" AS ENUM ('hitam', 'coklat', 'biru', 'hijau');

-- CreateEnum
CREATE TYPE "relationship" AS ENUM ('ayah', 'ibu', 'kakak_pria', 'kakak_wanita', 'adik_pria', 'adik_wanita', 'ipar_pria', 'ipar_wanita', 'anak_kandung', 'anak_angkat', 'none');

-- CreateEnum
CREATE TYPE "religion" AS ENUM ('islam', 'non_islam');

-- CreateEnum
CREATE TYPE "TaarufProcess" AS ENUM ('TaarufRequest', 'TaarufApproved', 'TaarufRejected', 'NadharRequest', 'NadharApproved', 'NadharRejected', 'NadharCanceled', 'KhitbahRequest', 'KhitbahAppproved', 'KhitbahRejected', 'KhitbahCanceled', 'AkadRequest', 'AkadApproved', 'AkadRejected', 'AkadCanceled', 'Completed', 'Canceled');

-- CreateEnum
CREATE TYPE "ApprovalStatus" AS ENUM ('Pending', 'Approved', 'Rejected', 'Canceled');

-- CreateEnum
CREATE TYPE "ShalatFardu" AS ENUM ('rutin_di_masjid', 'kadang_di_masjid', 'bolong_bolong', 'pernah_sekali', 'belum_pernah');

-- CreateEnum
CREATE TYPE "Cycle" AS ENUM ('rutin', 'kadang_kadang', 'pernah_sekali', 'belum_pernah');

-- CreateEnum
CREATE TYPE "ExperienceType" AS ENUM ('Kerja', 'Organisasi');

-- CreateTable
CREATE TABLE "user" (
    "id" TEXT NOT NULL,
    "old_id" INTEGER,
    "email" VARCHAR(100) NOT NULL,
    "firstname" VARCHAR(100) NOT NULL,
    "lastname" VARCHAR(100) NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT false,
    "verified" BOOLEAN NOT NULL DEFAULT false,
    "avatar" VARCHAR(255),
    "avatar_md" VARCHAR(255),
    "blurred_avatar" VARCHAR(255),
    "blurred_avatar_md" VARCHAR(255),
    "role" "RoleStatus" NOT NULL DEFAULT 'MEMBER',
    "taaruf_status" "TaarufStatus" NOT NULL DEFAULT 'BLOCKED',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "backup_detail" (
    "userId" TEXT NOT NULL,
    "old_id" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "password" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "password" VARCHAR(255) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "password_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "client" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "about" TEXT,
    "phone" VARCHAR(20) NOT NULL,
    "address" TEXT NOT NULL,
    "taaruf_muqoddimah" TEXT,
    "login_muqoddimah" TEXT,
    "signup_muqoddimah" TEXT,
    "youtube" VARCHAR(100),
    "facebook" VARCHAR(100),
    "twitter" VARCHAR(100),
    "tiktok" VARCHAR(100),
    "instagram" VARCHAR(100),
    "linkedin" VARCHAR(100),

    CONSTRAINT "client_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "auth" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "access_token" VARCHAR(300) NOT NULL,
    "expiredAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "path" VARCHAR(100) NOT NULL,
    "method" VARCHAR(100) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "auth_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "reset_password" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "used" BOOLEAN NOT NULL DEFAULT false,
    "expiredAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "reset_password_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "gallery" (
    "id" TEXT NOT NULL,
    "clientId" TEXT NOT NULL,
    "title" VARCHAR(100),
    "photo" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "gallery_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "slider" (
    "id" TEXT NOT NULL,
    "clientId" TEXT NOT NULL,
    "title" TEXT,
    "photo" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "slider_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "faq" (
    "id" TEXT NOT NULL,
    "clientId" TEXT NOT NULL,
    "question" VARCHAR(255) NOT NULL,
    "answer" VARCHAR(255) NOT NULL,
    "deleted" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "faq_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "activation" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "used" BOOLEAN NOT NULL DEFAULT false,
    "expiredAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "activation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "biodata" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "bio" TEXT NOT NULL,
    "phone" VARCHAR(20) NOT NULL,
    "company" VARCHAR(100),
    "manhaj" "ManhajStatus" NOT NULL,
    "gender" "Gender" NOT NULL,
    "marriage_status" "MarriageStatus" NOT NULL,
    "marriage_permission" "MarriagePermission" NOT NULL,
    "dob" DATE NOT NULL,
    "birth_place" VARCHAR(100) NOT NULL,
    "birth_order" SMALLINT NOT NULL,
    "address" VARCHAR(100) NOT NULL,
    "address_town" VARCHAR(100) NOT NULL,
    "address_province" VARCHAR(100) NOT NULL,
    "hometown_province" VARCHAR(100) NOT NULL,
    "address_zip_code" INTEGER NOT NULL,
    "ethnic" VARCHAR(100) NOT NULL,
    "poligami_opinion" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "biodata_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "province" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "deleted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "province_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "education" (
    "id" TEXT NOT NULL,
    "institution_name" VARCHAR(100) NOT NULL,
    "major" VARCHAR(100),
    "degree" VARCHAR(100),
    "city" VARCHAR(100),
    "startYear" INTEGER NOT NULL,
    "endYear" INTEGER,
    "deleted" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "biodataId" TEXT NOT NULL,

    CONSTRAINT "education_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "life_goal" (
    "id" TEXT NOT NULL,
    "career" TEXT,
    "domicile" TEXT,
    "child_count" TEXT,
    "child_education" TEXT,
    "financial_arrangement" TEXT,
    "knowledge_upgrade" TEXT,
    "short_term_achievement" TEXT,
    "long_term_achievement" TEXT,
    "wife_work_permit" BOOLEAN NOT NULL DEFAULT false,
    "wife_work_permit_desc" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "biodataId" TEXT NOT NULL,

    CONSTRAINT "life_goal_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "physical_character" (
    "id" TEXT NOT NULL,
    "height" INTEGER NOT NULL DEFAULT 0,
    "weight" INTEGER NOT NULL DEFAULT 0,
    "body_shape" "body_shape",
    "skin_color" "skin_color",
    "hair_color" "hair_color",
    "hair_type" "hair_type",
    "eye_color" "eye_Color",
    "characteristic" BOOLEAN NOT NULL DEFAULT false,
    "characteristic_detail" TEXT,
    "medical_history" BOOLEAN NOT NULL DEFAULT false,
    "medical_history_detail" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "biodataId" TEXT NOT NULL,

    CONSTRAINT "physical_character_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "non_physical_character" (
    "id" TEXT NOT NULL,
    "motto" TEXT,
    "life_goal" TEXT,
    "hobby" TEXT,
    "spare_time_activity" TEXT,
    "positive_traits" TEXT,
    "negative_traits" TEXT,
    "liked_things" TEXT,
    "unliked_things" TEXT,
    "drink_alcohol" BOOLEAN NOT NULL DEFAULT false,
    "smoking" BOOLEAN NOT NULL DEFAULT false,
    "sport" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "biodataId" TEXT NOT NULL,

    CONSTRAINT "non_physical_character_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "family_member" (
    "id" TEXT NOT NULL,
    "biodataId" TEXT NOT NULL,
    "relationship" "relationship",
    "religion" "religion",
    "dob" VARCHAR(20) NOT NULL,
    "education" TEXT NOT NULL,
    "job" TEXT NOT NULL,
    "is_alive" BOOLEAN NOT NULL DEFAULT true,
    "deleted" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "family_member_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "taaruf_gold" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "startedAt" TIMESTAMP(3),
    "endingAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "taaruf_gold_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "payment" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "gross_amount" INTEGER NOT NULL,
    "midtransToken" VARCHAR(255),
    "status" TEXT NOT NULL DEFAULT 'pending',
    "paidAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "taaruf_goldId" TEXT,

    CONSTRAINT "payment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "midtrans_callback" (
    "id" TEXT NOT NULL,
    "paymentId" TEXT NOT NULL,
    "callback_data" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "midtrans_callback_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "bookmark" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "candidateId" TEXT NOT NULL,
    "bookmarked" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "bookmark_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "taaruf" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "candidateId" TEXT NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "status" "ApprovalStatus" NOT NULL DEFAULT 'Pending',
    "message" TEXT NOT NULL,
    "taaruf_process" "TaarufProcess" NOT NULL DEFAULT 'TaarufRequest',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "taaruf_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "taaruf_cancelation" (
    "id" TEXT NOT NULL,
    "taarufId" TEXT NOT NULL,
    "cancelById" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "taaruf_cancelation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "nadhar" (
    "id" TEXT NOT NULL,
    "taarufId" TEXT NOT NULL,
    "requestById" TEXT NOT NULL,
    "schedule" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "status" "ApprovalStatus" NOT NULL DEFAULT 'Pending',
    "message" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "nadhar_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "khitbah" (
    "id" TEXT NOT NULL,
    "taarufId" TEXT NOT NULL,
    "requestById" TEXT NOT NULL,
    "schedule" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "status" "ApprovalStatus" NOT NULL DEFAULT 'Pending',
    "message" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "khitbah_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "akad" (
    "id" TEXT NOT NULL,
    "taarufId" TEXT NOT NULL,
    "requestById" TEXT NOT NULL,
    "schedule" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "status" "ApprovalStatus" NOT NULL DEFAULT 'Pending',
    "message" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "akad_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "response" (
    "id" TEXT NOT NULL,
    "responseById" TEXT NOT NULL,
    "taarufId" TEXT,
    "taarufCancelationId" TEXT,
    "nadharId" TEXT,
    "khitbahId" TEXT,
    "akadId" TEXT,
    "message" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "response_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "marriage_preparation" (
    "id" TEXT NOT NULL,
    "biodataId" TEXT NOT NULL,
    "visi" TEXT,
    "misi" TEXT,
    "mental" TEXT,
    "mahar" TEXT,
    "cost" TEXT,
    "span_time" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "marriage_preparation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ibadah" (
    "id" TEXT NOT NULL,
    "shalat_fardu" "ShalatFardu",
    "shalat_rawatib" "Cycle",
    "shalat_dhuha" "Cycle",
    "shalat_tahajud" "Cycle",
    "puasa_ramadhan" "Cycle",
    "puasa_senin_kamis" "Cycle",
    "puasa_daud" "Cycle",
    "puasa_ayamul_bid" "Cycle",
    "zakat" "Cycle",
    "sedekah" "Cycle",
    "umrah" "Cycle",
    "haji" BOOLEAN NOT NULL DEFAULT false,
    "biodataId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ibadah_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "physical_criteria" (
    "id" TEXT NOT NULL,
    "height" INTEGER NOT NULL DEFAULT 0,
    "weight" INTEGER NOT NULL DEFAULT 0,
    "body_shape" "body_shape",
    "skin_color" "skin_color",
    "hair_color" "hair_color",
    "hair_type" "hair_type",
    "eye_color" "eye_Color",
    "biodataId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "physical_criteria_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "non_physical_criteria" (
    "id" TEXT NOT NULL,
    "age" INTEGER,
    "domicile" TEXT,
    "education" TEXT,
    "married_status" "MarriageStatus",
    "sport" TEXT,
    "hobby" TEXT,
    "traits" TEXT,
    "ethnic" VARCHAR(100),
    "job" TEXT,
    "other" TEXT,
    "biodataId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "non_physical_criteria_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "question" (
    "id" TEXT NOT NULL,
    "question" TEXT NOT NULL,
    "deleted" BOOLEAN NOT NULL DEFAULT false,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "question_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "answer" (
    "id" TEXT NOT NULL,
    "biodataId" TEXT NOT NULL,
    "questionId" TEXT NOT NULL,
    "answer" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "answer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "experience" (
    "id" TEXT NOT NULL,
    "biodataId" TEXT NOT NULL,
    "type" "ExperienceType" NOT NULL DEFAULT 'Kerja',
    "start_year" INTEGER NOT NULL,
    "end_year" INTEGER NOT NULL,
    "position" VARCHAR(100) NOT NULL,
    "description" TEXT NOT NULL,
    "deleted" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "experience_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "inbox" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "taarufId" TEXT NOT NULL,
    "title" VARCHAR(255) NOT NULL,
    "read" BOOLEAN NOT NULL DEFAULT false,
    "is_favourite" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "datetime" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "inbox_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "inbox_message" (
    "id" TEXT NOT NULL,
    "inboxId" TEXT,
    "senderId" TEXT NOT NULL,
    "receiverId" TEXT NOT NULL,
    "taaruf_process" "TaarufProcess" NOT NULL,
    "title" VARCHAR(255) NOT NULL,
    "message" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "inbox_message_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");

-- CreateIndex
CREATE UNIQUE INDEX "backup_detail_userId_key" ON "backup_detail"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "password_userId_key" ON "password"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "biodata_userId_key" ON "biodata"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "province_name_key" ON "province"("name");

-- CreateIndex
CREATE UNIQUE INDEX "education_biodataId_key" ON "education"("biodataId");

-- CreateIndex
CREATE UNIQUE INDEX "life_goal_biodataId_key" ON "life_goal"("biodataId");

-- CreateIndex
CREATE UNIQUE INDEX "physical_character_biodataId_key" ON "physical_character"("biodataId");

-- CreateIndex
CREATE UNIQUE INDEX "non_physical_character_biodataId_key" ON "non_physical_character"("biodataId");

-- CreateIndex
CREATE UNIQUE INDEX "taaruf_gold_id_key" ON "taaruf_gold"("id");

-- CreateIndex
CREATE UNIQUE INDEX "payment_taaruf_goldId_key" ON "payment"("taaruf_goldId");

-- CreateIndex
CREATE UNIQUE INDEX "midtrans_callback_paymentId_key" ON "midtrans_callback"("paymentId");

-- CreateIndex
CREATE UNIQUE INDEX "taaruf_cancelation_taarufId_key" ON "taaruf_cancelation"("taarufId");

-- CreateIndex
CREATE UNIQUE INDEX "response_taarufId_key" ON "response"("taarufId");

-- CreateIndex
CREATE UNIQUE INDEX "response_taarufCancelationId_key" ON "response"("taarufCancelationId");

-- CreateIndex
CREATE UNIQUE INDEX "response_nadharId_key" ON "response"("nadharId");

-- CreateIndex
CREATE UNIQUE INDEX "response_khitbahId_key" ON "response"("khitbahId");

-- CreateIndex
CREATE UNIQUE INDEX "response_akadId_key" ON "response"("akadId");

-- CreateIndex
CREATE UNIQUE INDEX "marriage_preparation_biodataId_key" ON "marriage_preparation"("biodataId");

-- CreateIndex
CREATE UNIQUE INDEX "ibadah_biodataId_key" ON "ibadah"("biodataId");

-- CreateIndex
CREATE UNIQUE INDEX "physical_criteria_biodataId_key" ON "physical_criteria"("biodataId");

-- CreateIndex
CREATE UNIQUE INDEX "non_physical_criteria_biodataId_key" ON "non_physical_criteria"("biodataId");

-- CreateIndex
CREATE UNIQUE INDEX "answer_questionId_biodataId_key" ON "answer"("questionId", "biodataId");

-- CreateIndex
CREATE UNIQUE INDEX "inbox_userId_taarufId_key" ON "inbox"("userId", "taarufId");

-- AddForeignKey
ALTER TABLE "backup_detail" ADD CONSTRAINT "backup_detail_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "password" ADD CONSTRAINT "password_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "auth" ADD CONSTRAINT "auth_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reset_password" ADD CONSTRAINT "reset_password_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "gallery" ADD CONSTRAINT "gallery_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "client"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "slider" ADD CONSTRAINT "slider_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "client"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "faq" ADD CONSTRAINT "faq_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "client"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "activation" ADD CONSTRAINT "activation_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "biodata" ADD CONSTRAINT "biodata_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "education" ADD CONSTRAINT "education_biodataId_fkey" FOREIGN KEY ("biodataId") REFERENCES "biodata"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "life_goal" ADD CONSTRAINT "life_goal_biodataId_fkey" FOREIGN KEY ("biodataId") REFERENCES "biodata"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "physical_character" ADD CONSTRAINT "physical_character_biodataId_fkey" FOREIGN KEY ("biodataId") REFERENCES "biodata"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "non_physical_character" ADD CONSTRAINT "non_physical_character_biodataId_fkey" FOREIGN KEY ("biodataId") REFERENCES "biodata"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "family_member" ADD CONSTRAINT "family_member_biodataId_fkey" FOREIGN KEY ("biodataId") REFERENCES "biodata"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "taaruf_gold" ADD CONSTRAINT "taaruf_gold_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "payment" ADD CONSTRAINT "payment_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "payment" ADD CONSTRAINT "payment_taaruf_goldId_fkey" FOREIGN KEY ("taaruf_goldId") REFERENCES "taaruf_gold"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "midtrans_callback" ADD CONSTRAINT "midtrans_callback_paymentId_fkey" FOREIGN KEY ("paymentId") REFERENCES "payment"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "bookmark" ADD CONSTRAINT "bookmark_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "bookmark" ADD CONSTRAINT "bookmark_candidateId_fkey" FOREIGN KEY ("candidateId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "taaruf" ADD CONSTRAINT "taaruf_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "taaruf" ADD CONSTRAINT "taaruf_candidateId_fkey" FOREIGN KEY ("candidateId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "taaruf_cancelation" ADD CONSTRAINT "taaruf_cancelation_taarufId_fkey" FOREIGN KEY ("taarufId") REFERENCES "taaruf"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "taaruf_cancelation" ADD CONSTRAINT "taaruf_cancelation_cancelById_fkey" FOREIGN KEY ("cancelById") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "nadhar" ADD CONSTRAINT "nadhar_taarufId_fkey" FOREIGN KEY ("taarufId") REFERENCES "taaruf"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "nadhar" ADD CONSTRAINT "nadhar_requestById_fkey" FOREIGN KEY ("requestById") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "khitbah" ADD CONSTRAINT "khitbah_taarufId_fkey" FOREIGN KEY ("taarufId") REFERENCES "taaruf"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "khitbah" ADD CONSTRAINT "khitbah_requestById_fkey" FOREIGN KEY ("requestById") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "akad" ADD CONSTRAINT "akad_taarufId_fkey" FOREIGN KEY ("taarufId") REFERENCES "taaruf"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "akad" ADD CONSTRAINT "akad_requestById_fkey" FOREIGN KEY ("requestById") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "response" ADD CONSTRAINT "response_responseById_fkey" FOREIGN KEY ("responseById") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "response" ADD CONSTRAINT "response_taarufId_fkey" FOREIGN KEY ("taarufId") REFERENCES "taaruf"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "response" ADD CONSTRAINT "response_taarufCancelationId_fkey" FOREIGN KEY ("taarufCancelationId") REFERENCES "taaruf_cancelation"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "response" ADD CONSTRAINT "response_nadharId_fkey" FOREIGN KEY ("nadharId") REFERENCES "nadhar"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "response" ADD CONSTRAINT "response_khitbahId_fkey" FOREIGN KEY ("khitbahId") REFERENCES "khitbah"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "response" ADD CONSTRAINT "response_akadId_fkey" FOREIGN KEY ("akadId") REFERENCES "akad"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "marriage_preparation" ADD CONSTRAINT "marriage_preparation_biodataId_fkey" FOREIGN KEY ("biodataId") REFERENCES "biodata"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ibadah" ADD CONSTRAINT "ibadah_biodataId_fkey" FOREIGN KEY ("biodataId") REFERENCES "biodata"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "physical_criteria" ADD CONSTRAINT "physical_criteria_biodataId_fkey" FOREIGN KEY ("biodataId") REFERENCES "biodata"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "non_physical_criteria" ADD CONSTRAINT "non_physical_criteria_biodataId_fkey" FOREIGN KEY ("biodataId") REFERENCES "biodata"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "question" ADD CONSTRAINT "question_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "answer" ADD CONSTRAINT "answer_biodataId_fkey" FOREIGN KEY ("biodataId") REFERENCES "biodata"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "answer" ADD CONSTRAINT "answer_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "question"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "experience" ADD CONSTRAINT "experience_biodataId_fkey" FOREIGN KEY ("biodataId") REFERENCES "biodata"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "inbox" ADD CONSTRAINT "inbox_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "inbox" ADD CONSTRAINT "inbox_taarufId_fkey" FOREIGN KEY ("taarufId") REFERENCES "taaruf"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "inbox_message" ADD CONSTRAINT "inbox_message_inboxId_fkey" FOREIGN KEY ("inboxId") REFERENCES "inbox"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "inbox_message" ADD CONSTRAINT "inbox_message_senderId_fkey" FOREIGN KEY ("senderId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "inbox_message" ADD CONSTRAINT "inbox_message_receiverId_fkey" FOREIGN KEY ("receiverId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
