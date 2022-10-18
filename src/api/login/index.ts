import { http } from '@/utils/http/index'
import * as T from './types'

const loginApi: T.LoginApi = {
    register(params: T.registerParams) {
        return http.post('/register', params)
    },

    login(params: T.LoginParams) {
        return http.post('/login', params)
    },

    getVerify() {
        return http.get('/captcha')
    },
}
export default loginApi
