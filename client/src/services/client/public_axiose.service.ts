import axios from "axios";
import {baseURL} from "../../constans";


const publicClient = axios.create({baseURL});

//@ts-ignore
publicClient.interceptors.request.use(config => {
    return {
        ...config,
        headers: {
            "Content-Type": "application/json"
        }
    };
})


publicClient.interceptors.response.use((response) => {
    if (response) return response
}, (err) => {
    console.log(err);
    throw err.response.data
});

export {publicClient};