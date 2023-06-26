
export interface IRegistr{
    email: string;
    username:string;
    password: string;
    confirmPassword:string;
}

export type IUser = Pick<IRegistr, "email" | "password">;






