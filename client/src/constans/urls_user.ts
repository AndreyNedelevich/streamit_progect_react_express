const users = '/users'

const urls_user = {
    userById: (userId: string) => `${users}/${userId}`,
    userByToken:`${users}/user/info`
}

export {
    urls_user
}