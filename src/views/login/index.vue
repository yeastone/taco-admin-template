<template>
    <div class="bg"></div>
    <div class="login">
        <div></div>
        <div class="login-box">
            <Avatar class="avatar" />
            <h2 class="title">Taco Admin</h2>
            <el-form
                v-if="loginType === 0"
                class="login-form"
                ref="loginFormRef"
                :model="loginForm"
                :rules="loginRules"
                size="large"
            >
                <Motion :delay="50">
                    <el-form-item prop="username">
                        <el-input
                            clearable
                            :input-style="{ 'user-select': 'none' }"
                            placeholder="账号"
                            v-model="loginForm.username"
                            :prefix-icon="User"
                        ></el-input>
                    </el-form-item>
                </Motion>

                <Motion :delay="100">
                    <el-form-item prop="password">
                        <el-input
                            clearable
                            :input-style="{ 'user-select': 'none' }"
                            placeholder="密码"
                            v-model="loginForm.password"
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
                            v-model="loginForm.captchaCode"
                            :prefix-icon="Lock"
                        >
                            <template #append>
                                <image-verify :img="captchaImg" @click="verifyRefresh"></image-verify>
                            </template>
                        </el-input>
                    </el-form-item>
                </Motion>
                <Motion :delay="200">
                    <el-form-item>
                        <div class="operate">
                            <div class="operate-tool">
                                <el-checkbox v-model="pwdChecked">记住密码</el-checkbox>
                                <el-button type="text" @click="forgotPwd"> 忘记密码? </el-button>
                            </div>
                            <div class="operate-btns">
                                <el-button
                                    class="login-btn"
                                    size="default"
                                    type="primary"
                                    :loading="loginLoading"
                                    @click="onLogin(loginFormRef)"
                                >
                                    登陆
                                </el-button>
                                <el-button class="register-btn" size="default" @click="onHandelType(1)">注册</el-button>
                            </div>
                        </div>
                    </el-form-item>
                </Motion>
            </el-form>

            <!-- 注册 - 1 -->
            <register v-if="loginType === 1"></register>
        </div>
    </div>
</template>
<script setup lang="ts">
import { ref, reactive, computed } from 'vue'
import { ElMessage, FormInstance } from 'element-plus'
import { User, Lock } from '@element-plus/icons-vue'
import Avatar from '@/assets/taco.svg'
import pbkdf2 from '@/utils/pbkdf2'
import Motion from './utils/motion'
import { useUserStoreHook } from '@/store/modules/user'

import imageVerify from './components/imageVerify.vue'
import register from './components/register.vue'
import { loginRules } from './utils/rule'

import loginApi from '@/api/login/index'
import { useRouter } from 'vue-router'

const password = pbkdf2('a123456!')
const router = useRouter()
console.log(password)

const loginFormRef = ref<FormInstance>()
const captchaImg = ref()
const loginForm = reactive({
    username: 'test1',
    password: 'a123456!',
    captchaCodeId: '',
    captchaCode: '',
})
const pwdChecked = ref(false)
const loginLoading = ref(false)
const loginType = computed(() => {
    return useUserStoreHook().loginType
})

const forgotPwd = () => {}

// 获取验证码
const verifyRefresh = () => {
    loginApi
        .getVerify()
        .then((res: any) => {
            console.log(res)
            loginForm.captchaCodeId = res.id
            captchaImg.value = 'data:image/jpeg;base64,' + res.imgBase64
        })
        .catch(() => {
            captchaImg.value = ''
            loginForm.captchaCodeId = ''
            ElMessage.error('获取验证码失败')
        })
}

verifyRefresh()

// 登陆
const onLogin = (formEl: FormInstance | undefined) => {
    loginLoading.value = true

    if (!formEl) return
    formEl.validate((valid, fields) => {
        if (valid) {
            const loginParams = {
                username: loginForm.username,
                password: pbkdf2(loginForm.password),
                // password: 'wvlhaghrhorijfegdvrgipgliqpcdmjv',
                captchaId: loginForm.captchaCodeId,
                captchaCode: loginForm.captchaCode,
            }

            loginApi
                .login(loginParams)
                .then((res: any) => {
                    console.log(res)
                    sessionStorage.setItem('access-token', res.token)
                    router.push('/dashboard')
                    loginLoading.value = false
                })
                .catch(() => {
                    verifyRefresh()
                    loginLoading.value = false
                })
        } else {
            loginLoading.value = false
        }
    })
}

// 更变登陆页类型
const onHandelType = (value: number) => {
    useUserStoreHook().SET_LOGINTYPE(value)
}
</script>
<style lang="less" scoped>
.bg {
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background: #ddd;
}
.login {
    width: 100vw;
    height: 100vh;
    display: flex;
    position: relative;
    justify-content: space-between;
    padding: 20px;
    align-items: center;
    .el-button {
        height: 40px;
    }

    .login-box {
        width: 320px;
        margin-right: 20px;
        .avatar {
            width: 320px;
            height: 100px;
        }
        h2 {
            text-transform: uppercase;
            margin: 15px 20px;
            color: #999;
            font: bold 200% Consolas, Monaco, monospace;
            text-align: center;
        }
        :deep(.el-form-item) {
            // height: 20px;
            margin-bottom: 22px;
        }
        :deep(.el-input-group__append, .el-input-group__prepend) {
            padding: 0;
        }

        .operate {
            width: 100%;
            .operate-tool {
                width: 100%;
                display: inline-flex;
                justify-content: space-between;
                align-items: center;
                height: 20px;
                .el-button {
                    padding: 0;
                }
            }
            .operate-btns {
                .el-button + .el-button {
                    margin-left: 0;
                }
            }
        }
        .login-btn,
        .register-btn {
            width: 100%;
            margin-top: 16px;
        }
    }
}
</style>
