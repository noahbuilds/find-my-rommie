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
        email: {
            type: String,
            required: true,
            unique: true,
            uppercase: false,
            match: /.+\@.+\..+/,
        },
        password: { type: String, required: true, minlength: 4 },
        gender: { type: String },
        phoneNumber: { type: String },
        stateOfOrigin: { type: String },
        age: { type: Number },
        interests: { type: [String], default: [] },
        level: { type: Number },
        location: { type: String },
        bio: { type: String },
        country: { type: String },
        course: { type: String },
        genderinclusion: { type: String },
        sportChoice: { type: String },
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
        campusPreference: { type: String },
        campusBudget: { type: String },
    },
    { timestamps: true }
);

const User = mongoose.model('User', userSchema);

export { User };
