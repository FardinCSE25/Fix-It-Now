import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";
import { catchAsync } from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { technicianService } from "./technician.service";


const getAllTechnicians = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const query = req.query;

    const result = await technicianService.getAllTechniciansFromDB(query)

     sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Technicians retrieved successfully",
        data: result
    });
})


const getSingleTechnician = catchAsync(async (req: Request, res: Response, next: NextFunction) => {

    const { id } = req.params;

    const result = await technicianService.getSingleTechnicianFromDB(id as string)

     sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Technician retrieved successfully",
        data: result
    });
})


export const technicianController = {
    getAllTechnicians,
    getSingleTechnician
}