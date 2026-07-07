import { Router } from "express";
import { Role } from "../../../generated/prisma/enums";
import { auth } from "../../middlewares/auth";
import { reviewController } from "./review.controller";

const router = Router()

router.post("/", auth(Role.Customer), reviewController.createReview);
router.get("/", auth(Role.Admin), reviewController.getAllReviews);

export const reviewRoutes = router