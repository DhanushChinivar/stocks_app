import { Schema, model, models, type Document, type Model } from "mongoose";

export interface UserItem extends Document {
    id?: string;
    email?: string;
    name?: string;
    country?: string;
    emailVerified?: Date | null;
    image?: string | null;
    createdAt?: Date;
    updatedAt?: Date;
}

const UserSchema = new Schema<UserItem>(
    {
        id: { type: String, index: true },
        email: { type: String, index: true, sparse: true },
        name: { type: String, trim: true },
        country: { type: String, trim: true },
    },
    {
        timestamps: false,
        strict: false,
        collection: "user",
    }
);

export const User: Model<UserItem> =
    (models?.User as Model<UserItem>) || model<UserItem>("User", UserSchema);
