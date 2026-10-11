import mongoose , { Schema, Document, Model} from "mongoose"

export interface Iuser extends Document {
    name: string;
    email: string;
    passwordHash: string;
    createdAt: Date;
    updatedAt: Date;
}

const UserSchema: Schema<Iuser> = new Schema<Iuser>({
    name: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    passwordHash: {type: String, required: true},
    },
    {timestamps: true}
)

export const User: Model<Iuser> = mongoose.model<Iuser>('User',UserSchema)

export default User;