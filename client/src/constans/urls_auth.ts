const baseURL = 'http://localhost:5110';
const auth = '/auth'

const urls_auth = {
        register: `${auth}/register`,
        login: `${auth}/login`,
        refresh: `${auth}/refresh`,
        forgot:`${auth}/forgot`,
        changePassword:`${auth}/changePassword`,
        forgotPassword:(token:string):string =>`${auth}/forgot/${token}`,
        activateAccaunt:(token:string):string =>`${auth}//register/${token}`
}

export {
    baseURL,
    urls_auth
}