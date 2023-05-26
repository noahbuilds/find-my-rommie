import mongoose from 'mongoose';
import {
    IUser,
    RoomTemperature,
    SocialStats,
    VisitorTolerance,
} from '../interfaces/user';

const userSchema = new mongoose.Schema<IUser>(
    {
        firstName: { type: String, required: true },
        lastName: { type: String, required: true },
        email: { type: String, required: true, unique: true, uppercase: false },
        password: { type: String, required: true },
        gender: { type: String, required: true },
        phoneNumber: { type: String, required: true },
        stateOfOrigin: { type: String },
        age: { type: Number, required: true },
        interests: { type: [String] },
        level: { type: Number, required: true },
        location: { type: String, required: true },
        bio: { type: String, required: true },
        socialStats: {
            type: String,

            enum: [
                SocialStats.ambivert,
                SocialStats.extrovert,
                SocialStats.introvert,
            ],
            // required: true,
        },
        roomTemperature: {
            type: String,
            enum: [
                RoomTemperature.cold,
                RoomTemperature.cool,
                RoomTemperature.hot,
                RoomTemperature.neutral,
                RoomTemperature.warm,
            ],
            // required: true,
        },
        visitorTolerance: {
            type: String,
            enum: [
                VisitorTolerance.few,
                VisitorTolerance.occassionally,
                VisitorTolerance.often,
            ],
            // required: true,
        },
    },
    { timestamps: true }
);

const User = mongoose.model('User', userSchema);

export { User };
