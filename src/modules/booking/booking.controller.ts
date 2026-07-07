import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";
import { catchAsync } from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { bookingService } from "./booking.service";

const createBooking = catchAsync(async (req: Request, res: Response, next: NextFunction) => {

    const customerId = req.user?.id;
    const payload = req.body;

    const result = await bookingService.createBookingIntoDB(customerId as string, payload.serviceId);

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.CREATED,
        message: "Booking created successfully",
        data: result,
    });
});


const getMyBookings = catchAsync(async (req, res) => {
    const customerId = req.user?.id;

    const result = await bookingService.getMyBookingsFromDB(customerId as string);

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Your Bookings retrieved successfully",
        data: result,
    });
});


const getMySpecificBooking = catchAsync(async (req: Request, res: Response) => {
    const customerId = req.user?.id;
    const { id } = req.params;

    const result = await bookingService.getMySpecificBookingFromDB(customerId as string, id as string);

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Your Booking retrieved successfully",
        data: result,
    });
});



const getTechnicianBookings = catchAsync(async (req, res) => {
    const technicianId = req.user?.id;

    const result = await bookingService.getTechnicianBookingsFromDB(technicianId as string);

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Your bookings retrieved successfully",
        data: result,
    });
});


const updateBookingStatus = catchAsync(async (req: Request, res: Response, next: NextFunction) => {

    const technicianId = req.user?.id;
    const { bookingId } = req.params;
    const { status } = req.body;

    const result = await bookingService.updateBookingStatusIntoDB(bookingId as string, technicianId as string, status);

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: `You ${status} the booking successfully.`,
        data: result,
    });
});


export const bookingController = {
    createBooking,
    getMyBookings,
    getMySpecificBooking,

    getTechnicianBookings,
    updateBookingStatus
}