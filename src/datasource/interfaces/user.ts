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
}
