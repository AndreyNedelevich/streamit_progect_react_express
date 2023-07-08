import {IRes} from "../types";
import {IUserFromDB} from "../interfaces";
import {privateClient} from "./client";
import {urls_user} from "../constans";


const userService = {
    getUserById: (userId:string): IRes<IUserFromDB> => privateClient.get(urls_user.userById(userId)),
    getUserByToken:(): IRes<IUserFromDB>=>privateClient.get(urls_user.userByToken),
    updateUserById:(userId:string,email:string): IRes<IUserFromDB>=>privateClient.put(urls_user.updateEmail(userId),{email}),
}


export {
    userService
}