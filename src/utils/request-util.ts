import { Response } from 'express';
import { StatusCodes, getReasonPhrase } from "http-status-codes";
export interface RequestError {
    sex?: boolean
    message?: string,
}

export const sendError = (res: Response, errors: RequestError[], code: StatusCodes = StatusCodes.OK) => res.status(code).json(constructError(code, errors));
export const sendData = (res: Response, data: any) => res.json(constructData(data));

export const constructError = (code: StatusCodes, errors: Array<RequestError>) => {
    const mappedErrors = errors.map((value) => value.message ? value : { value, message: "No message available." });
    return {
        errors: mappedErrors,
    };
};

export const constructData = (data: any) => {
    return {
        data
    }
}
