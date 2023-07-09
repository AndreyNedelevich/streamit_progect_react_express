import { Document } from "mongoose";

export interface IUser extends Document {
  email: string;
  userName?: string;
  age?: number;
  password: string;
  status?: string;
  avatar?: string;
}
