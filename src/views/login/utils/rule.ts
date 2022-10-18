import { reactive } from 'vue'
import { isPassword, isPhone } from '@/utils/is/index'
import type { FormRules, FormItemRule } from 'element-plus'

const username: FormItemRule[] = [{ required: true, message: '请输入账号', trigger: 'blur' }]

const password: FormItemRule[] = [
    {
        validator: (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请输入密码'))
            } else if (!isPassword(value)) {
                callback(new Error('密码格式应为8-18位数字、字母、符号的三种组合'))
            } else {
                callback()
            }
        },
        trigger: 'blur',
    },
]

const vCode: FormItemRule[] = [
    {
        validator: (rule, value, callback) => {
            console.log('vCode', vCode)

            if (value === '') {
                callback(new Error('请输入验证码'))
            } else if (value && value.length !== 4) {
                callback(new Error('请输入正确的验证码'))
            } else {
                callback()
            }
        },
        trigger: 'blur',
    },
]

export const loginRules = reactive<FormRules>({
    username,
    password,
    vCode,
})

export const registerRules = reactive<FormRules>({
    username,
})
