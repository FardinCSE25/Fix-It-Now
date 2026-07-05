import { Response } from "express";


type TMeta = {
    page: number;
    limit: number;
    total: number
}

type SResponse<T> = {
    statusCode: number;
    success: boolean;
    message: string;
    meta?: TMeta;
    data?: T;
    error?: string
}

const sendResponse = <T>(res: Response, data: SResponse<T>) => {
    res.status(data.statusCode).json({
        success: data.success,
        statusCode: data.statusCode,
        message: data.message,
        meta: data.meta,
        data: data.data,
        error: data.error
    })
}

export default sendResponse;