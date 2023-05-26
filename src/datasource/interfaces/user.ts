export interface IUser {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    gender: string;
    phoneNumber: string;
    stateOfOrigin: string;
    age: number;
    interests: Array<string>;
    level: number;
    location: string;
    _id: string;
    createdAt: Date;
    updatedAt: Date;
    compatibilityScore: string;
    bio: string;
    socialStats: SocialStats;
    roomTemperature: RoomTemperature;
    visitorTolerance: VisitorTolerance;
}

export enum SocialStats {
    extrovert= 'extrovert',
    ambivert = 'ambivert',
    introvert= 'introvert',
}
export enum VisitorTolerance {
    few='few',
    occassionally='occassionally',
    often='often',
}

export enum RoomTemperature{
    cold='cold',
    cool='cool',
    neutral='neutral',
    warm= 'warm',
    hot='hot'
}
