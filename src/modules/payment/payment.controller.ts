import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";
import { catchAsync } from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { paymentService } from "./payment.service";

const createCheckoutSession = catchAsync(async (req: Request, res: Response, next: NextFunction) => {

    const customerId = req.user?.id;
    const { bookingId } = req.body;

    const result = await paymentService.createCheckoutSessionIntoStripe(customerId as string, bookingId);

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.CREATED,
        message: "Checkout session created successfully",
        data: result,
    });
});


const handleWebhook = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const event = req.body as Buffer;
    const signature = req.headers["stripe-signature"];

    await paymentService.webhookHandler(event as Buffer, signature as string);

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Webhook handled successfully",
        data: null
    })
});


const getMyPaymentHistory = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const customerId = req.user?.id

    const result = await paymentService.getMyPaymentHistoryFromDB(customerId as string)

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Your payment history retrieved successfully",
        data: result
    })
})


const getMySinglePayment = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const customerId = req.user?.id
    const paymentId = req.params.id

    const result = await paymentService.getMySinglePaymentFromDB(customerId, paymentId as string)

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Your payment details retrieved successfully",
        data: result
    })
})


export const paymentController = {
    createCheckoutSession,
    handleWebhook,
    getMyPaymentHistory,
    getMySinglePayment
}