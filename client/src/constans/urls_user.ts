const users = '/users'

const urls_user = {
    userById: (userId: string):string => `${users}/${userId}`,
    userByToken:`${users}/user/info`,
    updateEmail: (userId: string):string =>`${users}/update_email/${userId}`,
    updateUser: (userId: string):string =>`${users}/update/${userId}`,
    uploadAvatar: (userId: string):string =>`${users}/avatar/${userId}`,
    daleteAvatar:(userId: string):string =>`${users}/avatar/${userId}`,
    deleteAccount:(userId:string):string=>`${users}/delete/${userId}`,
}

export {
    urls_user
}