import { Request, Response, NextFunction } from 'express';
import { IUserDocument } from "../models/user/user.profile";
import "express-session";

declare module 'express-serve-static-core' {
    interface Request {}
}

declare module 'express-session' {
    export interface SessionData {
        user: IUserDocument & {_id: any} | IUserDocument | null;
    }
}

export const authenticate = async (req: Request, res: Response, next: NextFunction) => {
    if (req.session.user)
        return next();
    else return res.sendStatus(401);
};
