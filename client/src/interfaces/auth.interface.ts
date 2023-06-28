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
    status: string;
}

export interface ITokens {
    accessToken: string;
    refreshToken: string;
}



