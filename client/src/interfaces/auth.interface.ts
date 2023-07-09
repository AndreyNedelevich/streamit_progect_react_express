import {EUserStatus} from "../enums";

export interface IRegistr {
    email: string;
    userName: string;
    age: number
    password?: string;
    confirmPassword?: string;

}

export type IUser = Pick<IRegistr, "email" | "password">;


export interface IUserFromDB extends IRegistr {
    _id: string;
    status: EUserStatus;
    avatar?:string|null
}

export interface ITokens {
    accessToken: string;
    refreshToken: string;
}


export interface IUserIdWithITokens {
    tokens: ITokens;
    id: string;
}
