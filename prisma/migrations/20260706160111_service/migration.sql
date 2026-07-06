-- DropForeignKey
ALTER TABLE "services" DROP CONSTRAINT "services_technicianId_fkey";

-- AddForeignKey
ALTER TABLE "services" ADD CONSTRAINT "services_technicianId_fkey" FOREIGN KEY ("technicianId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
