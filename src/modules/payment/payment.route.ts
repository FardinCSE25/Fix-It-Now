import { Router } from "express";
import { Role } from "../../../generated/prisma/enums";
import { auth } from "../../middlewares/auth";
import { paymentController } from "./payment.controller";

const router = Router();

router.post("/create", auth(Role.Customer), paymentController.createCheckoutSession)
router.post("/confirm", paymentController.handleWebhook)
router.get("/history", auth(Role.Customer), paymentController.getMyPaymentHistory)
router.get("/:id", auth(Role.Customer), paymentController.getMySinglePayment)

export const paymentRoutes = router;