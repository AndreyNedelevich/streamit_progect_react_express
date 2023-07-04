import {IRes} from "../types";
import {IUserFromDB} from "../interfaces";
import {privateClient, publicClient} from "./client";
import {urls_user} from "../constans/urls_user";


const userService = {
    getUserById: (userId:string): IRes<IUserFromDB> => privateClient.get(urls_user.userById(userId)),
    getUserByToken:(): IRes<IUserFromDB>=>privateClient.get(urls_user.userByToken),
}


export {
    userService
}