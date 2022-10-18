<template>
    <el-form ref="formRef" :model="form" :rules="registerRules" size="large">
        <Motion :delay="50">
            <el-form-item prop="username">
                <el-input
                    clearable
                    :input-style="{ 'user-select': 'none' }"
                    placeholder="账号"
                    v-model="form.username"
                    :prefix-icon="User"
                ></el-input>
            </el-form-item>
        </Motion>
        <Motion :delay="100">
            <el-form-item prop="phone">
                <el-input
                    clearable
                    :input-style="{ 'user-select': 'none' }"
                    placeholder="手机号码"
                    v-model="form.phone"
                    :prefix-icon="Iphone"
                ></el-input> </el-form-item
        ></Motion>

        <Motion :delay="100">
            <el-form-item prop="password">
                <el-input
                    clearable
                    :input-style="{ 'user-select': 'none' }"
                    placeholder="密码"
                    v-model="form.password"
                    show-password
                    :prefix-icon="Lock"
                ></el-input> </el-form-item
        ></Motion>
        <Motion :delay="100">
            <el-form-item :rules="repeatPasswordRule" prop="repeatPassword">
                <el-input
                    clearable
                    :input-style="{ 'user-select': 'none' }"
                    placeholder="确认密码"
                    v-model="form.repeatPassword"
                    show-password
                    :prefix-icon="Lock"
                ></el-input> </el-form-item
        ></Motion>
        <Motion :delay="150">
            <el-form-item prop="captchaCode">
                <el-input
                    clearable
                    :input-style="{ 'user-select': 'none' }"
                    placeholder="验证码"
                    v-model="form.captchaCode"
                >
                    <template #append>
                        <image-verify :img="captchaImg" @click="verifyRefresh"></image-verify>
                    </template>
                </el-input>
            </el-form-item>
        </Motion>
        <Motion :delay="200">
            <el-form-item>
                <el-button
                    class="form-btn register"
                    size="default"
                    type="primary"
                    :loading="loading"
                    @click="onRegister(formRef)"
                >
                    注册
                </el-button>
            </el-form-item>
        </Motion>
        <Motion :delay="250">
            <el-form-item>
                <el-button class="form-btn back" size="default" @click="onBack()"> 返回 </el-button>
            </el-form-item>
        </Motion>
    </el-form>
</template>
<script setup lang="ts">
import { ref, reactive, computed } from 'vue'
import { ElMessage } from 'element-plus'
import type { FormInstance, FormItemRule } from 'element-plus'
import Motion from '../utils/motion'
import { registerRules } from '../utils/rule'
import { useUserStoreHook } from '@/store/modules/user'
import { User, Lock, Iphone } from '@element-plus/icons-vue'
import pbkdf2 from '@/utils/pbkdf2'
import imageVerify from './imageVerify.vue'
import loginApi from '@/api/login/index'

const loading = ref(false)
const formRef = ref<FormInstance>()
const form = reactive({
    username: '',
    password: '',
    repeatPassword: '',
    phone: '',
    captchaCode: '',
    captchaId: '',
})

const repeatPasswordRule: FormItemRule[] = [
    {
        validator: (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请输入确认密码'))
            } else if (form.password !== value) {
                callback(new Error('两次密码不一致!'))
            } else {
                callback()
            }
        },
        trigger: 'blur',
    },
]
const captchaImg = ref('')

const verifyRefresh = () => {
    loginApi
        .getVerify()
        .then((res: any) => {
            console.log(res)
            form.captchaId = res.id
            captchaImg.value = 'data:image/jpeg;base64,' + res.imgBase64
        })
        .catch(() => {
            captchaImg.value = ''
            form.captchaId = ''
            ElMessage.error('获取验证码失败')
        })
}

verifyRefresh()
const onRegister = (formEl: FormInstance | undefined) => {
    loading.value = true

    if (!formEl) return
    formEl.validate((valid, fields) => {
        if (valid) {
            const params = {
                username: form.username,
                phone: form.phone,
                password: pbkdf2(form.password),
                // password: 'wvlhaghrhorijfegdvrgipgliqpcdmjv',
                captchaId: form.captchaId,
                captchaCode: form.captchaCode,
            }

            loginApi
                .register(params)
                .then((res: any) => {
                    console.log(res)
                    ElMessage.success('注册成功')
                    onBack()
                    loading.value = false
                })
                .catch(() => {
                    verifyRefresh()
                    loading.value = false
                })
        } else {
            loading.value = false
        }
    })
}

const onBack = () => {
    useUserStoreHook().SET_LOGINTYPE(0)
}
</script>
<style lang="less" scoped>
.form-btn {
    width: 100%;
    height: 40px;
}
</style>
