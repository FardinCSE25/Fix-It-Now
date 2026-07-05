/*
  Warnings:

  - You are about to drop the column `yearsOfExperience` on the `technician_profiles` table. All the data in the column will be lost.
  - Added the required column `experience` to the `technician_profiles` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "technician_profiles" DROP COLUMN "yearsOfExperience",
ADD COLUMN     "experience" INTEGER NOT NULL;
