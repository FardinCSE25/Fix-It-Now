import { Router } from "express";
import { Role } from "../../../generated/prisma/enums";
import { auth } from "../../middlewares/auth";
import { authController } from "./auth.controller";

const router = Router();

router.post("/register", authController.registerUser)
router.post("/login", authController.loginUser)
router.get("/me", auth(Role.Customer, Role.Technician, Role.Admin), authController.getMyProfile)
router.get("/users", auth(Role.Admin), authController.getAllUsers)
router.patch("/users/:id", auth(Role.Admin), authController.updateUser)

export const authRoutes = router;