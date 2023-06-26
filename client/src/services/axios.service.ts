import axios from "axios";
import {baseUrl} from "../constans";
import {authService} from "./auth.service";


const axiosService = axios.create({baseURL:baseUrl});


axiosService.interceptors.request.use(config=>{
    const access=authService.getAccessToken();
    if(access) {
        config.headers.Authorization = `Bearer ${access}`

    }
    return config
})




export {
    axiosService
}
