/*
  Warnings:

  - The `verificationDocs` column on the `Admin` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `verificationDocs` column on the `Guide` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Admin" DROP COLUMN "verificationDocs",
ADD COLUMN     "verificationDocs" JSONB;

-- AlterTable
ALTER TABLE "Guide" DROP COLUMN "verificationDocs",
ADD COLUMN     "verificationDocs" JSONB;
