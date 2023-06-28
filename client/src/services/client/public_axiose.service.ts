import axios from "axios";
import queryString from "query-string";
import {baseURL} from "../../constans";



const publicClient = axios.create({
    baseURL,
    paramsSerializer: {
        encode: params => queryString.stringify(params)
    }
});

//@ts-ignore
publicClient.interceptors.request.use( config => {
    return {
        ...config,
        headers: {
            "Content-Type": "application/json"
        }
    };
})





publicClient.interceptors.response.use((response) => {
    console.log(response);
    if (response&&response.data) return response.data;
    return response;
}, (err) => {
    console.log(err);
    throw err.response.data
});

export  {publicClient};