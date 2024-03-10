/*
  Warnings:

  - Made the column `organizationId` on table `pet` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "pet" DROP CONSTRAINT "pet_organizationId_fkey";

-- AlterTable
ALTER TABLE "pet" ALTER COLUMN "organizationId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "pet" ADD CONSTRAINT "pet_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "organization"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
