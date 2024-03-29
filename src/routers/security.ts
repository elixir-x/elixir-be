import express from "express";
import { sendError, sendData } from "../utils/request-util";
import UserProfile from "../models/user/user.profile";
import { deleteUserSession, regenerateUserSession } from "../utils/session";
import argon2 from "argon2";
import { validate } from "../models/zod.schema";
import { LoginSchema, RegisterSchema } from '../models/zod.schema';
import { StatusCodes } from "http-status-codes";

const router = express.Router();

router.post('/login', validate(LoginSchema), async (req, res) => {
    const { user, password } = req.body;

    UserProfile
        .findOne({})
        .or([ { 'username': user }, { 'email': user } ])
        .exec(async (error, doc) => {
            if (doc) {
                const verified = await doc.checkPassword(password);
                if (verified) {
                    regenerateUserSession(req, doc, error => {
                        if (error)
                            return res.sendStatus(500);
                    });
                    doc.lastLogin = new Date(Date.now());
                    await doc.save();
                    res.sendStatus(200);
                }
            } else return res.sendStatus(404);
        });
});

router.get('/logout', (req, res) => {

    deleteUserSession(req, err => {
        if (err)
            res.sendStatus(StatusCodes.NOT_FOUND)
        else {
            res.clearCookie('_sid');
            return res.sendStatus(StatusCodes.OK);
        }
    });
});

router.post('/register', validate(RegisterSchema), async (req, res) => {
    const { email, username, password } = req.body;

    const hashedPassword = await argon2.hash(password);
    await UserProfile.create({ email, username, password: hashedPassword }, (error, result) => {
        if (error)
            sendError(res, [
                { message: 'An error has occurred during the registration process.' }
            ], StatusCodes.BAD_REQUEST);
        else sendData(res, { user: result });
    });
});

export default router;
