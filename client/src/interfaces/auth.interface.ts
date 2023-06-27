export interface IRegistr {
    email: string;
    userName: string;
    age:number
    password: string;
    confirmPassword?: string;
}

export type IUser = Pick<IRegistr, "email" | "password">;

export type IUserfromDB = Pick<IRegistr, "email" | "userName">;

export interface ITokens {
    access: string;
    refresh: string;
}



