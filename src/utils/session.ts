import { Request } from "express";
import { IUserDocument } from "../models/user/user.profile";

export const regenerateUserSession = (req: Request, user: IUserDocument & {_id: any}, callback: (err: any) => void) => {
    // regenerate the session to prevent session fixation attack vectors
    req.session.regenerate(() => {
        // store database user in session object (to be saved)
        req.session.user = user;
        // save the new session to database
        req.session.save(callback);
    });
}

export const deleteUserSession = (req: Request) => {
    // delete the user from session
    req.session.user = null;
    // save and regenerate the session
    req.session.save(() => req.session.regenerate);
}
