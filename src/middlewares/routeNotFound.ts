import { Request, Response } from "express";
import httpStatus from "http-status";


export const routeNotFound = (req: Request, res: Response) => {
    res.status(404).json({
        statusCode: httpStatus.NOT_FOUND,
        message: "Route not found",
    })

}