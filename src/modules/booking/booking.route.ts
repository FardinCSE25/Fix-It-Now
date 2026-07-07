import { Router } from "express";
import { Role } from "../../../generated/prisma/enums";
import { auth } from "../../middlewares/auth";
import { bookingController } from "./booking.controller";

const router = Router();

router.post("/", auth(Role.Customer), bookingController.createBooking)
router.get("/my-bookings", auth(Role.Customer), bookingController.getMyBookings)
router.get("/my-bookings/:id", auth(Role.Customer), bookingController.getMySpecificBooking)

export const bookingRoutes = router;