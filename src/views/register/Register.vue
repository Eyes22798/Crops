<template>
    <v-app id="inspire" class="split-bg success theme--light">
      <v-content>
        <v-container class="fill-height" fluid>
          <v-layout class="align-center justify-center">
            <v-flex xs12 sm8 md4 lg4 class="mb-10">
              <v-card class="elevation-12" pa-3>
                <div class="layout column align-center">
                  <img
                    :src="require('@/assets/images/logo.png')"
                    alt="Vue Material Admin"
                    width="100"
                    height="100"
                  />
                  <h1 class="flex mt-n6 mb-4 success--text">账号注册</h1>
                </div>
                <v-stepper v-model="e1" :alt-labels="altLabels">
                  <v-stepper-header>
                    <v-stepper-step :complete="e1 > 1" step="1" color="success">个人账号</v-stepper-step>
                    <v-divider></v-divider>
                    <v-stepper-step :complete="e1 > 2" step="2" color="success">手机验证</v-stepper-step>
                    <v-divider></v-divider>
                    <v-stepper-step step="3" color="success">个人详细信息</v-stepper-step>
                  </v-stepper-header>
                  <v-stepper-items>
                    <v-form>
                      <v-stepper-content step="1">
                        <v-text-field
                          ref="username"
                          id="username"
                          label="用户名"
                          name="username"
                          prepend-icon="person"
                          type="text"
                          :rules="rules.usernameRules"
                          :clearable="clearable"
                          v-model="username"
                          required
                        ></v-text-field>
                        <v-text-field
                          ref="password"
                          id="password"
                          label="密码"
                          name="password"
                          prepend-icon="lock"
                          :append-icon="show ? 'visibility' : 'visibility_off'"
                          :type="show ? 'text' : 'password'"
                          :rules="rules.passwordRules"
                          :clearable="clearable"
                          v-model="password"
                          counter="10"
                          maxlength="10"
                          required
                          @click:append="show = !show"
                        ></v-text-field>
                        <v-text-field
                          ref="password2"
                          id="password2"
                          label="确认密码"
                          name="password2"
                          prepend-icon="lock"
                          :append-icon="show ? 'visibility' : 'visibility_off'"
                          :type="show ? 'text' : 'password'"
                          :rules="rules.passwordConformRules"
                          :clearable="clearable"
                          v-model="password2"
                          counter="10"
                          maxlength="10"
                          required
                          @click:append="show = !show"
                        ></v-text-field>
                        <v-row class="mt-2">
                          <div class="flex-grow-1"></div>
                          <v-btn color="success" class="mr-3" @click="e1 = 2">Continue</v-btn>
                        </v-row>
                      </v-stepper-content>
                      <v-stepper-content step="2">
                        <v-row>
                          <v-col cols="8" lg="8">
                            <v-text-field
                              ref="phone"
                              id="phone"
                              label="手机号"
                              name="phone"
                              prepend-icon="phone"
                              type="text"
                              :rules="rules.phoneRules"
                              :clearable="clearable"
                              v-model="phone"
                              counter="11"
                              maxlength="11"
                              required
                            ></v-text-field>
                          </v-col>
                          <v-col cols="4" lg="4">
                            <LoadingBtn
                              :btnText="loadingText"
                              :color="color"
                              :phone="phone"
                              :class="classStyle"
                              v-on:phoneMetaFun="phoneMetaFun"
                            />
                          </v-col>
                        </v-row>
                        <v-row class="mt-2">
                          <v-btn color="success" class="ml-3" @click="e1 = 1">Back</v-btn>
                          <div class="flex-grow-1"></div>
                          <v-btn color="success" class="mr-3" @click="e1 = 3">Continue</v-btn>
                        </v-row>
                      </v-stepper-content>
                      <v-stepper-content step="3">
                        <v-radio-group v-model="role" row class="d-flex justify-center">
                          <v-radio label="我是普通用户" id="ordinary" color="success" value="3"></v-radio>
                          <v-radio label="我是专家用户" id="expert" color="success" value="2"></v-radio>
                        </v-radio-group>
                        <v-text-field
                          ref="name"
                          id="name"
                          label="姓名"
                          name="name"
                          prepend-icon="person"
                          type="text"
                          :rules="rules.nameRules"
                          :clearable="clearable"
                          v-model="name"
                          required
                        ></v-text-field>
                        <v-text-field
                          ref="email"
                          id="email"
                          label="邮箱"
                          name="email"
                          prepend-icon="email"
                          type="email"
                          :rules="rules.emailRules"
                          :clearable="clearable"
                          v-model="email"
                          required
                        ></v-text-field>
                        <v-text-field
                          ref="postcode"
                          id="postcode"
                          label="邮政编码"
                          name="postcode"
                          prepend-icon="fa fa-globe"
                          type="number"
                          :rules="[() => !!postcode || '请输入你的邮政编码']"
                          :clearable="clearable"
                          v-model="postcode"
                          hint="请输入正确的邮政编码"
                        ></v-text-field>
                        <Distpicker
                         :row="3"
                         prependIcon="map"
                         :clearable="true"
                         ref="distpicker"
                        />
                        <v-textarea
                          ref="introduction"
                          id="introduction"
                          label="个人介绍"
                          name="introduction"
                          prepend-icon="info"
                          :rules="[() => !!introduction || '请填写您的个人介绍']"
                          clearable
                          clear-icon="cancel"
                          v-model="introduction"
                          hint="输入您的个人介绍"
                        ></v-textarea>
                        <v-row class="mt-2">
                          <v-btn color="success" class="ml-3" @click="e1 = 2">Back</v-btn>
                          <div class="flex-grow-1"></div>
                          <v-slide-x-reverse-transition>
                            <v-tooltip v-if="formHasErrors" left>
                              <template v-slot:activator="{ on }">
                                <v-btn icon class="my-0" @click="resetForm" v-on="on">
                                  <v-icon>mdi-refresh</v-icon>
                                </v-btn>
                              </template>
                              <span>重新输入</span>
                            </v-tooltip>
                          </v-slide-x-reverse-transition>
                          <v-btn
                            color="info light"
                            :fab="fab"
                            class="mr-3"
                            @click="register"
                            :loading="loading4"
                          >Submit</v-btn>
                        </v-row>
                      </v-stepper-content>
                    </v-form>
                  </v-stepper-items>
                </v-stepper>
              </v-card>
            </v-flex>
          </v-layout>
        </v-container>
        <Footer />
      </v-content>
    </v-app>
</template>

<script>
import Footer from '@/components/content/Footer.vue'
import LoadingBtn from '@/components/common/LoadingBtn'
import { phoneRex, usernameRex, passwordstrongRex, emailRex, nameRex } from '@/common/const.js'
import * as types from '@/store/global/mutation-types'
import { mapMutations } from 'vuex'
import Distpicker from '@/components/common/Distpicker.vue'

export default {
  name: 'Register',
  data () {
    return {
      username: null,
      password: null,
      password2: null,
      phone: null,
      role: '3',
      name: null,
      email: null,
      postcode: null,
      province: null,
      city: null,
      address: null,
      introduction: null,
      formHasErrors: false,
      formKey: true,
      phoneMeta: false,
      errorMessages: '',
      rules: {
        usernameRules: [
          v => !!v || '请输入昵称!',
          v => usernameRex.test(v) || '中文、英文、数字包括下划线'
        ],
        passwordRules: [
          v => !!v || '请输入密码!',
          v => passwordstrongRex.test(v) || '必须包含大小写字母和数字的组合，不能使用特殊字符，长度在8-10之间'
        ],
        passwordConformRules: [
          v => !!v || '请再次输入密码!',
          v => this.password === this.password2 || '两次密码不一致'
        ],
        phoneRules: [
          v => !!v || '请输入手机号!',
          v => phoneRex.test(v) || '必须是有效的手机号'
        ],
        emailRules: [
          v => !!v || '请输入邮箱!',
          v => emailRex.test(v) || '必须是有效的邮箱'
        ],
        nameRules: [
          v => !!v || '请输入姓名!',
          v => nameRex.test(v) || '必须是有效的姓名'
        ]
      },
      e1: 0,
      show: false,
      clearable: true,
      altLabels: true,
      fab: false,
      loading4: false,
      loadingText: '验证手机号',
      classStyle: 'mt-3 px-10 white--text float-right',
      color: 'success'
    }
  },
  components: {
    LoadingBtn,
    Distpicker,
    Footer
  },
  computed: {
    form () {
      return {
        username: this.username,
        password: this.password,
        password2: this.password2,
        phone: this.phone,
        name: this.name,
        email: this.email,
        postcode: this.postcode,
        province: this.province,
        city: this.city,
        address: this.address,
        introduction: this.introduction
      }
    }
  },
  methods: {
    ...mapMutations({
      setUserInfoData: types.SET_USERINFO,
      setNamePassword: types.SET_REGISTER_LOGIN
    }),
    registerSet (state) {
      console.log(state)
      // 把用户信息存到 localStorage 中
      this.setUserInfoData(Object.assign(
        {},
        this.form,
        {
          state: state
        },
        {
          role: this.role - 0
        }
      ))
      this.$toast('注册成功!', {
        x: 'right',
        y: 'top',
        icon: 'info',
        dismissable: false,
        showClose: true,
        timeout: 800
      })
      // 跳转到登录
      setTimeout(() => {
        this.loading4 = false
        this.$router.push('/login')
      }, 1000)
    },
    register () {
      this.loading4 = true
      this.formHasErrors = false
      const validateArr = [
        usernameRex.test(this.username) && this.username !== null,
        passwordstrongRex.test(this.password),
        this.password === this.password2,
        phoneRex.test(this.phone),
        nameRex.test(this.name) && this.name !== null,
        emailRex.test(this.email)
      ]
      const errMessage = ['用户名不符合规范', '密码不符合规范', '两次密码不一致', '未输入正确的手机号', '不符合的姓名', '未输入正确的邮箱']
      validateArr.forEach((rexp, key) => {
        if (!rexp) {
          this.$toast(`${errMessage[key]}`, {
            x: 'right',
            y: 'top',
            icon: 'info',
            color: 'error',
            dismissable: false,
            showClose: true,
            timeout: 800
          })
          this.formKey = false
        }
      })
      Object.keys(this.form).forEach(f => {
        if (!this.form[f]) {
          this.formHasErrors = true
          this.formKey = false
        }
        if (!this.$refs[f]) {
          this.$refs['distpicker'].$refs[`${f}`].validate(true)
          return
        }
        this.$refs[f].validate(true)
      })
      // 判断该用户是否验证过手机号
      if (!this.phoneMeta) {
        this.formKey = false
        this.$toast('手机号未验证!', {
          x: 'right',
          y: 'top',
          icon: 'info',
          color: 'error',
          dismissable: false,
          showClose: true,
          timeout: 800
        })
      }
      // 判断 用户类别 (表单提交完全正确的情况)
      if (this.role === '3' && this.formKey) {
        console.log('我是普通用户')
        this.$api.common
          .ordinaryRegister({
            name: this.name,
            password: this.password,
            nickname: this.username,
            phone: this.phone,
            email: this.email,
            address: this.address,
            postcode: this.postcode,
            introduction: this.introduction,
            state: 1,
            role: this.role - 0
          })
          .then(res => {
            if (res.code === 200) {
              this.registerSet(1)
              this.setNamePassword({
                phone: this.phone,
                password: this.password
              })
            }
            setTimeout(() => {
              this.loading4 = false
            }, 1000)
          })
      } else if (this.role === '2' && this.formKey) {
        this.loading4 = false
        console.log('我是专家用户')
        this.$api.common
          .expertRegister({
            name: this.name,
            password: this.password,
            nickname: this.username,
            phone: this.phone,
            email: this.email,
            address: this.address,
            postcode: this.postcode,
            introduction: this.introduction,
            state: 0,
            role: this.role - 0
          })
          .then(res => {
            if (res.code === 200) {
              this.registerSet(0)
              this.setNamePassword({
                phone: this.phone,
                password: this.password
              })
            }
          })
      }
      setTimeout(() => {
        this.loading4 = false
      }, 1000)
    },
    resetForm () {
      this.errorMessages = []
      this.formHasErrors = false
      Object.keys(this.form).forEach(f => {
        if (!this.$refs[f]) {
          this.$refs['distpicker'].$refs[`${f}`].reset()
          return
        }
        this.$refs[f].reset()
      })
    },
    phoneMetaFun (value) {
      this.phoneMeta = value
    }
  }
}
</script>

<style lang="stylus" scoped>
.split-bg {
  height: 55%;
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  content: '';
  z-index: 0;
}
</style>
