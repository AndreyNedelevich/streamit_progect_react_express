import {IRes} from "../types";
import {IUserFromDB} from "../interfaces";
import {privateClient} from "./client";
import {urls_user} from "../constans";


class UserService {
    getUserById (userId: string):IRes<IUserFromDB> {
        return privateClient.get(urls_user.userById(userId))
    }

    getUserByToken ():IRes<IUserFromDB> {
        return privateClient.get(urls_user.userByToken)
    }

    editEmailUserById (userId: string, email: string):IRes<IUserFromDB> {
        return privateClient.put(urls_user.updateEmail(userId), {email})
    }

    editUserById (userId: string, data: Partial<IUserFromDB>): IRes<IUserFromDB> {
        return privateClient.put(urls_user.updateUser(userId), data)
    }

    uploadAvatar (userId: string, formData: FormData):IRes<IUserFromDB> {
        return privateClient.post(urls_user.uploadAvatar(userId), formData)
    }
    deleteAvatar (userId: string):IRes<IUserFromDB> {
        return privateClient.delete(urls_user.daleteAvatar(userId))
    }

    deleteAccount (userId: string):IRes<IUserFromDB> {
        return privateClient.delete(urls_user.deleteAccount(userId))
    }
}

export const userService = new UserService()
