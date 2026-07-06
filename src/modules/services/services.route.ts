import { Router } from "express";
import { Role } from "../../../generated/prisma/enums";
import { auth } from "../../middlewares/auth";
import { servicesController } from "./services.controller";

const router = Router();

router.post("/", auth(Role.Technician), servicesController.createService)
router.get("/",  servicesController.getAllServices)

export const servicesRoutes = router;