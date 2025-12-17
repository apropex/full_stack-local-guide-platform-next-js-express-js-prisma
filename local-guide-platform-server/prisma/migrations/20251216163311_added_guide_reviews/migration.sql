/*
  Warnings:

  - You are about to drop the column `averageRating` on the `Guide` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Guide" DROP COLUMN "averageRating",
ADD COLUMN     "totalRatings" DOUBLE PRECISION DEFAULT 0;

-- AlterTable
ALTER TABLE "Tour" ALTER COLUMN "isActive" SET DEFAULT false;

-- CreateTable
CREATE TABLE "GuideReview" (
    "id" TEXT NOT NULL,
    "rating" INTEGER NOT NULL,
    "comment" TEXT,
    "touristId" TEXT NOT NULL,
    "guideId" TEXT NOT NULL,
    "isVisible" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "GuideReview_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "GuideReview_guideId_idx" ON "GuideReview"("guideId");

-- CreateIndex
CREATE INDEX "GuideReview_touristId_idx" ON "GuideReview"("touristId");

-- CreateIndex
CREATE UNIQUE INDEX "GuideReview_guideId_touristId_key" ON "GuideReview"("guideId", "touristId");

-- AddForeignKey
ALTER TABLE "GuideReview" ADD CONSTRAINT "GuideReview_touristId_fkey" FOREIGN KEY ("touristId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GuideReview" ADD CONSTRAINT "GuideReview_guideId_fkey" FOREIGN KEY ("guideId") REFERENCES "Guide"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
