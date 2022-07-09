import { Request, Response, Router } from "express";
import { validate, EmailVerificationSchema, EmailVerificationCheckSchema } from "../models/zod.schema";
import { sendError } from "../utils/request-util";

const router = Router();

router.get('/email-verification', validate(EmailVerificationSchema), (req: Request, res: Response) => {
     const { token } = req.query;
     // TODO: add email
     sendError(res, {
         code: 404,
         message: "This email verification code does not exist."
     });
});

router.get('/email-verification', validate(EmailVerificationCheckSchema), (req: Request, res: Response) => {
    const { token, code } = req.query;
    // TODO: add email
    sendError(res, {
        code: 404,
        message: "This email verification code was incorrect."
    });
});

export default router;