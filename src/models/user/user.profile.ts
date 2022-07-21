import mongoose, { Schema, Document, Model } from "mongoose";
import { IUserPreference, UserPreferenceSchema } from "../preference/preference";
import argon2 from "argon2";

export interface IUser extends Document {
    email: string,
    username: string,
    password: string,
    bio?: string,
    preferences: IUserPreference[],
    lastLogin: Date,
    createdAt: Date,
    updatedAt: Date,
}

export interface IUserDocument extends IUser, Document {
    checkPassword: (password: string) => Promise<boolean>;
}

interface IUserModel extends Model<IUserDocument> {
    findByUsername: (username: string) => Promise<IUserDocument>;
}

const UserSchema: Schema<IUserDocument> = new Schema({
    email: {
        type: String,
        unique: true,
        required: true,
    },
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
    },
    bio: String,
    preferences: [UserPreferenceSchema],
    lastLogin: Date,
}, { timestamps: true });


UserSchema.methods.checkPassword = async function (password: string) {
    return await argon2.verify(this.password, password);
};

export default mongoose.model<IUserDocument, IUserModel>('User', UserSchema);
