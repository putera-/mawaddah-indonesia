-- AlterTable
ALTER TABLE "main_slide" ADD COLUMN     "image" TEXT;

-- AlterTable
ALTER TABLE "process_step" ADD COLUMN     "svg" TEXT;

-- CreateTable
CREATE TABLE "blog" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "landingPageId" TEXT,

    CONSTRAINT "blog_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "blog" ADD CONSTRAINT "blog_landingPageId_fkey" FOREIGN KEY ("landingPageId") REFERENCES "landing_page"("id") ON DELETE SET NULL ON UPDATE CASCADE;
