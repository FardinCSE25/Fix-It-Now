/*
  Warnings:

  - Made the column `experience` on table `technician_profiles` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "technician_profiles" ALTER COLUMN "experience" SET NOT NULL;
