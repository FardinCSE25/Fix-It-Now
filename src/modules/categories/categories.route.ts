import { Router } from "express";
import { Role } from "../../../generated/prisma/enums";
import { auth } from "../../middlewares/auth";
import { categoryController } from "./categories.controller";

const router = Router();

router.post("/", auth(Role.Admin), categoryController.createCategory)
router.get("/", categoryController.getAllCategories)

export const categoryRoutes = router;