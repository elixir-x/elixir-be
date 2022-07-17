import express from "express";
import UserProfile from "../models/user/user.profile";
import { sendData, sendError } from "../utils/request-util";
import { authenticate } from "../middleware/authentication";
import { StatusCodes } from "http-status-codes";
import { CheckUsernameSchema, UpdateUserSchema, validate } from "../models/zod.schema";
const router = express.Router();

router.get('/user', authenticate, async (req, res) => {
    if (req.session.user)
        sendData(res, { ...req.session.user, password: null });
    else sendError(res, [
        { message: 'This user does not exist!' }
    ], StatusCodes.NOT_FOUND);
});

router.patch('/user', validate(UpdateUserSchema), authenticate, async (req, res) => {
    const { email, username, bio, profileUrl } = req.body;
    UserProfile.findOneAndUpdate({ _id: req.session.user?._id }, { username, email, bio, profileUrl }, { new: true },
        (error, result) => {
        if (error || result === null)
            sendError(res, [
                { message: 'No users found!' }
            ], StatusCodes.NOT_FOUND);
        else {
            req.session.user = result;
            return res.sendStatus(200);
        }
    });
});

router.get('/users/:username', async (req, res) => {
    UserProfile
        .findOne({ username: req.params.username }, '-_id username')
        .exec((error, result) => {
            if (error || result === null)
                sendError(res, [
                    { message: 'This user does not exist!' }
                ], StatusCodes.NOT_FOUND);
            else sendData(res, result);
        });
});

router.get('/users', async (req, res) => {
    UserProfile
        .find({}, '-_id username email')
        .exec((error, result) => {
            if (error || !result.length)
                sendError(res, [
                    { message: 'No users found!' }
                ], StatusCodes.NOT_FOUND);
            else sendData(res, result);
        });
});

router.get('/check-username', validate(CheckUsernameSchema), async (req, res) => {
    UserProfile
        .find({ username: req.query.username })
        .exec((error, result) => {
            if (error || !result.length)
                res.sendStatus(200);
            else res.sendStatus(422);
        });
});

export default router;
