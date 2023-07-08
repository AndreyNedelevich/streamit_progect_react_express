import {IRes} from "../types";
import {IUserFromDB} from "../interfaces";
import {privateClient} from "./client";
import {urls_user} from "../constans";


const userService = {
    getUserById: (userId:string): IRes<IUserFromDB> => privateClient.get(urls_user.userById(userId)),
    getUserByToken:(): IRes<IUserFromDB>=>privateClient.get(urls_user.userByToken),
    editEmailUserById:(userId:string,email:string): IRes<IUserFromDB>=>privateClient.put(urls_user.updateEmail(userId),{email}),
    editUserById: (userId: string, data: Partial<IUserFromDB>): IRes<IUserFromDB>=>privateClient.put(urls_user.updateUser(userId),data),
}


export {
    userService
}