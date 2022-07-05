import { Document, Schema } from "mongoose";

export interface IPreference extends Document {
    name: string,
    description: string,
    createdAt: Date,
    updatedAt: Date,
}

export interface IUserPreference extends Document {
    preference_id: Schema.Types.ObjectId,
    value: string
}

const PreferenceSchema: Schema<IPreference> = new Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: false,
    },
}, { timestamps: true });

const UserPreferenceSchema: Schema<IUserPreference> = new Schema({
    preference_id: {
        type: Schema.Types.ObjectId,
        required: true
    },
    value: {
        type: String,
        required: true,
    },
});

export { PreferenceSchema, UserPreferenceSchema };