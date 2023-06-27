import {IRegistr, ITokens, IUser} from "../interfaces";
import {IRes} from "../types";
import {publicClient, privateClient} from "./client";
import {urls_auth} from "../constans";
import {AxiosResponse} from "axios";


class AuthService {
    private readonly accessKey = 'access'
    private readonly refreshKey = 'refresh'


    register({email, password, age, userName}: IRegistr): IRes<any> {
        return publicClient.post(urls_auth.register,
            {email, password, age, userName})
    }


    async login({email, password}: IUser): Promise<any> {
        const {data} = await privateClient.post(urls_auth.login, {email, password});
        this.setTokens(data)
    }


    async refresh(): Promise<void> {
        const refreshToken = this.getRefreshToken();
        if (!refreshToken) {
            throw new Error("Refresh token isn't exists")
        }
        const {data}: AxiosResponse<ITokens> = await privateClient.post(urls_auth.refresh, {refresh: refreshToken});
        console.log(data);
        this.setTokens(data)
    }


    // me(): IRes<any> {
    //     return privateClient.get(urls_auth.me)
    // }

    private setTokens({access, refresh}: ITokens): void {
        localStorage.setItem(this.accessKey, access)
        localStorage.setItem(this.refreshKey, refresh)

    }


    getAccessToken(): string {
        return localStorage.getItem(this.accessKey)
    }

    private getRefreshToken(): string {
        return localStorage.getItem(this.refreshKey)
    }

    deleteTokens(): void {
        localStorage.removeItem(this.accessKey)
        localStorage.removeItem(this.refreshKey)
    }
}

export const authService = new AuthService()