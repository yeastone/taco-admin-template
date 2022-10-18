export interface LoginParams {
    username: string
    password: string
    captchaId?: string
    captchaCode?: string
}
export interface registerParams extends LoginParams {
    phone?: string
}

export interface LoginApi {
    login: (params: LoginParams) => Promise<any>
}
