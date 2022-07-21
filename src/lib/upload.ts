import multer, { diskStorage } from "multer";

const multerStorage = diskStorage({
    destination: (req, file, callback) =>
        callback(null, process.env.PROFILE_UPLOAD_PATH as string),
    filename: (req, file, callback) =>
        callback(null, req.session.user?.username.toLowerCase() + "_avatar.png")
});

export const uploadFile = multer({
    storage: multerStorage,
    limits: {
        fileSize: 3 * 1024 * 1024
    }
});
