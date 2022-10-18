import { defineStore } from 'pinia'
import { store } from '@/store'
import { getToken, setToken, removeToken } from '@/utils/auth'

const data = getToken()
let token = ''
let name = 'admin'
if (data) {
    const dataJson = JSON.parse(data)
    if (dataJson) {
        token = dataJson?.accessToken
        name = dataJson?.name ?? 'admin'
    }
}

export const useUserStore = defineStore({
    id: 'user',
    state: () => ({
        token,
        name,
        expired: 0,
        // 登录页状态 0：登陆 1 注册 3 忘记密码 默认0
        loginType: 0,
        avatar: new URL('../../assets/taco.svg', import.meta.url).href,
    }),
    getters: {
        nameLength: state => state.name.length,
    },
    actions: {
        setToken(token: string) {
            this.token = token
        },
        setName(name: string) {
            this.name = name
        },
        SET_LOGINTYPE(value: number) {
            this.loginType = value
        },
    },
})

export function useUserStoreHook() {
    return useUserStore(store)
}
