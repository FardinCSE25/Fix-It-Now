import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";
import { catchAsync } from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { servicesService } from "./services.service";

const createService = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const technicianId = req.user?.id
    const payload = req.body;
    
    const result = await servicesService.createServiceIntoDB(payload, technicianId);

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.CREATED,
        message: "Service created successfully",
        data: result
    });
});


const getAllServices = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const {type} = req.query
    const result = await servicesService.getAllServicesFromDB(type as string)

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Services retrieved successfully",
        data: result
    });
})


export const servicesController = {
    createService,
    getAllServices
}