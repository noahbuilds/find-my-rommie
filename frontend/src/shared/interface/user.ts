export interface IUser {
  result: {
    firstName: string;
    lastName: string;
    gender: string;
    phoneNumber: string;
    stateOfOrigin: string;
    age: number;
    interests: Array<string>;
    level: number;
    location: string;
    _id: string;
    createdAt: Date | string;
    updatedAt: Date | string;
    compatibilityScore?: string;
    bio?: string;
    socialStats?: SocialStats | string;
    roomTemperature?: RoomTemperature | string;
    visitorTolerance?: VisitorTolerance | string;
    country?: string;
    course?: string;
    genderinclusion?: string;
    sportChoice?: string;
    campusBudget?: string;
    campusPreference?: string;
    image?: string;
  };
}

export interface ILogin {
  email: string;
  password: string;
}

export enum SocialStats {
  extrovert = "extrovert",
  ambivert = "ambivert",
  introvert = "introvert",
}
export enum VisitorTolerance {
  few = "few",
  occassionally = "occassionally",
  often = "often",
}

export enum RoomTemperature {
  cold = "cold",
  cool = "cool",
  neutral = "neutral",
  warm = "warm",
  hot = "hot",
}
