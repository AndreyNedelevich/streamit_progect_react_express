const baseURL = 'http://localhost:5120';
const auth = '/auth'

const urls_auth = {
        register: `${auth}/register`,
        login: `${auth}/login`,
        refresh: `${auth}/refresh`,
}

export {
    baseURL,
    urls_auth
}