import { Router } from "express";
import { Role } from "../../../generated/prisma/enums";
import { auth } from "../../middlewares/auth";
import { technicianController } from "./technician.controller";

const router = Router();

router.get("/", technicianController.getAllTechnicians)
router.get("/:id",  technicianController.getSingleTechnician)
router.put("/profile", auth(Role.Technician), technicianController.updateTechnicianProfile)
router.put("/availability", auth(Role.Technician), technicianController.updateAvailability)

export const technicianRoutes = router;