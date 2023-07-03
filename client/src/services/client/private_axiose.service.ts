import axios, {AxiosError} from 'axios';
import {authService} from "../auth.service";
import {IWaitListCB} from "../../types/waitList.type";
import {urls_auth,baseURL} from "../../constans";
import queryString from "query-string";


//const privateClient = axios.create({baseURL});
const privateClient = axios.create({
    baseURL,
    paramsSerializer: {
        encode: params => queryString.stringify(params)
    }
});

let isRefreshing = false
const weitList: IWaitListCB[] = [];



privateClient.interceptors.request.use(config => {
    const access = authService.getAccessToken();
    if (access) {
        config.headers.Authorization = `${access}`
    }
    return config
})


privateClient.interceptors.response.use(
    res => {
        return res
    },
    async (error: AxiosError) => {

        const originalRequest = error.config;


        if (error.response.status === 401) {
            if (!isRefreshing) {
                isRefreshing = true;
                try {
                    await authService.refresh()
                    isRefreshing = false;
                    afterRefresh()
                    return privateClient.request(originalRequest)
                } catch (e) {
                    authService.deleteTokens();
                    isRefreshing = false;
                    return Promise.reject(error)
                }
            }
            if (originalRequest.url === urls_auth.refresh) {
                return Promise.reject(error)
            }
            return new Promise(resolve => {
                    subscriveToWaitList(() => {
                        resolve(privateClient(originalRequest))
                    })
                }
            )
        }
        return Promise.reject(error)
    }
)

const subscriveToWaitList = (cb: IWaitListCB): void => {
    weitList.push(cb)
}

const afterRefresh = () => {
    while (weitList.length) {
        const callBeck = weitList.pop();
        callBeck();
    }
}

export {
    privateClient
}