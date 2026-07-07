import { Router } from "express";
import { Role } from "../../../generated/prisma/enums";
import { auth } from "../../middlewares/auth";
import { paymentController } from "./payment.controller";

const router = Router();

router.post("/create", auth(Role.Customer), paymentController.createCheckoutSession)
router.post("/confirm", paymentController.handleWebhook)

export const paymentRoutes = router;