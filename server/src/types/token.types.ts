import { IUser } from "./user.type";

export interface ITokensPair {
  accessToken: string;
  refreshToken: string;
}

export interface ITokensPairWithIdUser {
  id: string;
  tokens: ITokensPair;
}

export type ICredentials = Pick<IUser, "email" | "password">;

export type ITokenPayload = Pick<IUser, "email" | "_id">;

export type IActionTokenPayload = Pick<IUser, "userName" | "_id">;
