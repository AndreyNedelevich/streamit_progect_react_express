import axios from "axios";

import {IRes} from "../types";
import { IUser} from "../interfaces";

class AuthService {
    private readonly accessKey = 'access'


    getUseers():IRes<IUser[]>{
        return axios.get<IUser[]>('../users.json')
    }

     setTokens(access:string ): void {
        localStorage.setItem(this.accessKey, access)
    }
    getAccessToken(): string {
        return localStorage.getItem(this.accessKey)
    }
}

export const authService = new AuthService()