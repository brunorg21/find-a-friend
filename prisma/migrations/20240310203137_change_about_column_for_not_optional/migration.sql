/*
  Warnings:

  - Made the column `about` on table `pet` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "pet" ALTER COLUMN "about" SET NOT NULL;
