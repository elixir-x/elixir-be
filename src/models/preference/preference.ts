import { Document } from "mongoose";

export interface IPreference extends Document {
    name: string,
    description: string,
    createdAt: Date,
    updatedAt: Date,
}

export interface IUserPreference extends Document {
    id: string,
    value: any
}