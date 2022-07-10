import { Request, Response, Router } from "express";
import { validate, EmailVerificationSchema, EmailVerificationCheckSchema } from "../models/zod.schema";
import { sendError } from "../utils/request-util";
import { StatusCodes } from "http-status-codes";

const router = Router();

router.get('/email-verification', validate(EmailVerificationSchema), (req: Request, res: Response) => {
    const { token } = req.query;
    // TODO: add email
    sendError(res, [
        { message: "This email verification code does not exist." }
    ], StatusCodes.NOT_FOUND);
});

router.get('/email-verification', validate(EmailVerificationCheckSchema), (req: Request, res: Response) => {
    const { token, code } = req.query;
    // TODO: add email
    sendError(res, [
        { message: "This email verification code was incorrect." }
    ], StatusCodes.FORBIDDEN);
});

export default router;