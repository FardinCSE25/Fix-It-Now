import { Router } from "express";
import { Role } from "../../../generated/prisma/enums";
import { auth } from "../../middlewares/auth";
import { bookingController } from "./booking.controller";

const router = Router();

//! Customer's booking routes 
router.post("/", auth(Role.Customer), bookingController.createBooking)
router.get("/my-bookings", auth(Role.Customer), bookingController.getMyBookings)
router.get("/my-bookings/:id", auth(Role.Customer), bookingController.getMySpecificBooking)

//! Technician's booking routes
router.get("/technician", auth(Role.Technician), bookingController.getTechnicianBookings)
router.patch("/technician/:bookingId", auth(Role.Technician), bookingController.updateBookingStatus)

export const bookingRoutes = router;