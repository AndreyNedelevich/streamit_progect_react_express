const baseURL = 'http://localhost:5120';
const auth = '/auth'

const urls_auth = {
        register: `${auth}/register`,
        login: `${auth}/login`,
        refresh: `${auth}/refresh`,
        forgot:`${auth}/forgot`,
}

export {
    baseURL,
    urls_auth
}