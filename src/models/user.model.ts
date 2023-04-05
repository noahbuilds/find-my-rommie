import mongoose from "mongoose";
import { IUser } from "../interfaces/user";

const userSchema = new mongoose.Schema<IUser>({
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    email: {type: String, required: true, unique: true, uppercase: false},
    password: {type: String, required: true},
    gender: {type: String, required: true},
    phoneNumber: {type: String, required: true},
    stateOfOrigin: {type: String},
    age: {type: Number, required: true},
    interests: {type: [String]},
    level: {type: Number, required: true},
    location: {type: String, required: true}
}, {timestamps: true})

const User = mongoose.model("User",userSchema);



export {User}