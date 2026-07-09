/*
  Warnings:

  - You are about to drop the `Booking` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Service` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Booking" DROP CONSTRAINT "Booking_customerId_fkey";

-- DropForeignKey
ALTER TABLE "Booking" DROP CONSTRAINT "Booking_serviceId_fkey";

-- DropForeignKey
ALTER TABLE "Booking" DROP CONSTRAINT "Booking_technicianId_fkey";

-- DropForeignKey
ALTER TABLE "Service" DROP CONSTRAINT "Service_categoryId_fkey";

-- DropForeignKey
ALTER TABLE "Service" DROP CONSTRAINT "Service_technicianId_fkey";

-- DropForeignKey
ALTER TABLE "payments" DROP CONSTRAINT "payments_bookingId_fkey";

-- DropTable
DROP TABLE "Booking";

-- DropTable
DROP TABLE "Service";

-- CreateTable
CREATE TABLE "bookings" (
    "id" TEXT NOT NULL,
    "customerId" TEXT NOT NULL,
    "technicianId" TEXT NOT NULL,
    "serviceId" TEXT NOT NULL,
    "status" "BookingStatus" NOT NULL DEFAULT 'Pending',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "bookings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "services" (
    "id" TEXT NOT NULL,
    "technicianId" TEXT NOT NULL,
    "categoryId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "price" DECIMAL(65,30) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "services_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "bookings_customerId_serviceId_id_technicianId_status_idx" ON "bookings"("customerId", "serviceId", "id", "technicianId", "status");

-- CreateIndex
CREATE INDEX "availabilities_technicianId_idx" ON "availabilities"("technicianId");

-- CreateIndex
CREATE INDEX "categories_id_idx" ON "categories"("id");

-- CreateIndex
CREATE INDEX "payments_id_idx" ON "payments"("id");

-- CreateIndex
CREATE INDEX "reviews_customerId_technicianId_idx" ON "reviews"("customerId", "technicianId");

-- CreateIndex
CREATE INDEX "technician_profiles_userId_idx" ON "technician_profiles"("userId");

-- CreateIndex
CREATE INDEX "users_email_id_role_idx" ON "users"("email", "id", "role");

-- AddForeignKey
ALTER TABLE "bookings" ADD CONSTRAINT "bookings_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "bookings" ADD CONSTRAINT "bookings_technicianId_fkey" FOREIGN KEY ("technicianId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "bookings" ADD CONSTRAINT "bookings_serviceId_fkey" FOREIGN KEY ("serviceId") REFERENCES "services"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "payments" ADD CONSTRAINT "payments_bookingId_fkey" FOREIGN KEY ("bookingId") REFERENCES "bookings"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "services" ADD CONSTRAINT "services_technicianId_fkey" FOREIGN KEY ("technicianId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "services" ADD CONSTRAINT "services_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "categories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
