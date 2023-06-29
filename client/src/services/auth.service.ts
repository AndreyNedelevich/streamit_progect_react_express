import {IRegistr, ITokens, IUser, IUserIdWithITokens} from "../interfaces";
import {publicClient, privateClient} from "./client";
import {urls_auth} from "../constans";
import { AxiosResponse} from "axios";
import {IRes} from "../types";


class AuthService {
    private readonly accessKey = 'access'
    private readonly refreshKey = 'refresh'
    private readonly accessKeyforMovieDB = 'accessforMovie'


    register({email, password, age, userName}: IRegistr): IRes<any> {
        return publicClient.post(urls_auth.register,
            {email, password, age, userName})
    }


    async login({email, password}: IUser): Promise<AxiosResponse<IUserIdWithITokens>> {
        const response = await publicClient.post(urls_auth.login, {email, password});
        this.setTokens(response.data.tokens)
        return response
    }

    async forotPassword(email: string):  Promise<void>{
        await publicClient.post(urls_auth.forgot, {email});
    }

    async refresh(): Promise<void> {
        const refreshToken = this.getRefreshToken();
        if (!refreshToken) {
            throw new Error("Refresh token isn't exists")
        }
        const {data}: AxiosResponse<ITokens> = await privateClient.post(urls_auth.refresh, {refresh: refreshToken});
        this.setTokens(data)
    }



    private setTokens({accessToken, refreshToken}: ITokens): void {
        localStorage.setItem(this.accessKey, accessToken)
        localStorage.setItem(this.refreshKey, refreshToken)
    }

    setTokensfromMovieDB(access:string ): void {
        localStorage.setItem('accessforMovie', access)
    }

    getAccessTokenforMovieDB(): string {
        return localStorage.getItem(this.accessKeyforMovieDB)
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