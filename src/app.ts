import cookieParser from "cookie-parser";
import cors from "cors";
import express, { Application, Request, Response } from "express";
import config from "./config";
import { globalErrorHandler } from "./middlewares/globalErrorHandler";
import { routeNotFound } from "./middlewares/routeNotFound";
import { authRoutes } from "./modules/auth/auth.route";
import { categoryRoutes } from "./modules/categories/categories.route";
import { servicesRoutes } from "./modules/services/services.route";
import { technicianRoutes } from "./modules/technician/technician.route";


const app: Application = express()

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors({
    origin: config.app_url,
    credentials: true
}))

app.get("/", (req: Request, res: Response) => {
    res.status(200).json({
        message: "Fix It Now",
        author: "Fardin Ahmed",
    });
});

app.use("/api/auth", authRoutes)
app.use("/api/categories", categoryRoutes)
app.use("/api/services", servicesRoutes)
app.use("/api/technicians", technicianRoutes)



app.use(routeNotFound)

app.use(globalErrorHandler)



export default app;