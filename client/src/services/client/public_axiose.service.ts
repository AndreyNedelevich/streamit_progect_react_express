import axios from "axios";
import {baseURL} from "../../constans";


const publicClient = axios.create({baseURL});


publicClient.interceptors.request.use(config => {
    return {
        ...config,
    };
})

publicClient.interceptors.response.use((response) => {
    if (response) return response
}, (err) => {
    console.log(err);
    throw err.response.data
});

export {publicClient};