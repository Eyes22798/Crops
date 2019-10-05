<template>
  <v-app id="inspire" class="split-bg success theme--light">
    <v-content>
      <v-container class="fill-height" fluid>
        <v-layout class="align-center justify-center">
          <v-flex xs12 sm8 md4 lg4>
            <v-card class="elevation-12" pa-3>
              <v-card-text>
                <div class="layout column align-center">
                  <img
                    :src="require('@/assets/images/logo.png')"
                    alt="Vue Material Admin"
                    width="120"
                    height="120"
                  />
                  <h1 class="flex mt-n6 mb-6 success--text">广学坚守，勤思敏行</h1>
                </div>
                <v-form v-if="!toggleTag">
                  <v-text-field
                    id="phone"
                    label="用户名"
                    name="username"
                    prepend-icon="person"
                    type="text"
                    :rules="rules.username"
                    :clearable="clearable"
                    v-model="username"
                    :hint="usernameHint"
                    counter="11"
                    maxlength="11"
                    required
                  ></v-text-field>
                  <v-text-field
                    id="password"
                    label="密码"
                    name="password"
                    prepend-icon="lock"
                    :append-icon="show ? 'visibility' : 'visibility_off'"
                    :type="show ? 'text' : 'password'"
                    :rules="[
                     () => !!password || '请输入你的密码',
                     addressCheck
                    ]"
                    :clearable="clearable"
                    v-model="password"
                    counter="25"
                    maxlength="25"
                    hint="至少8个字符!"
                    required
                    @click:append="show = !show"
                  ></v-text-field>
                </v-form>
                <v-form v-if="toggleTag">
                  <v-text-field
                    id="phone"
                    label="用户名"
                    name="username"
                    prepend-icon="person"
                    type="text"
                    :rules="rules.username"
                    :clearable="clearable"
                    v-model="username"
                    counter="11"
                    maxlength="11"
                    required
                  ></v-text-field>
                  <v-row>
                    <v-col cols="8" lg="8">
                      <v-text-field
                        id="code"
                        label="验证码"
                        v-model="code"
                        name="code"
                        prepend-icon="vpn_key"
                        type="text"
                        required
                      ></v-text-field>
                    </v-col>
                    <v-col cols="4" lg="4">
                      <v-btn
                        :loading="loading3"
                        :disabled="disabled"
                        color="info"
                        class="mt-3 px-10 white--text float-right"
                        @click="loader = 'loading3';getSendCode()"
                      >{{ loadingText }}</v-btn>
                    </v-col>
                  </v-row>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-btn icon class="mx-2">
                  <v-icon color="light-blue">fa fa-qq fa-lg</v-icon>
                </v-btn>
                <v-btn icon class="mx-2">
                  <v-icon color="red">fa fa-google fa-lg</v-icon>
                </v-btn>
                <v-btn icon class="mx-2">
                  <v-icon color="green">fa fa-weixin fa-lg</v-icon>
                </v-btn>
                <v-spacer></v-spacer>
                <v-btn color="success px-10 subtitle-1 font-weight-bold" @click="login" :loading="loading4">登录</v-btn>
              </v-card-actions>
              <v-toolbar color="success" dark flat>
                <v-toolbar-title>
                  <v-tooltip bottom>
                  <template v-slot:activator="{ on }">
                    <v-btn icon large target="_blank" v-on="on" @click="toggle">
                      <v-icon>autorenew</v-icon>
                    </v-btn>
                  </template>
                  <span>{{ source }}</span>
                </v-tooltip>
                </v-toolbar-title>
                <div class="flex-grow-1"></div>
                <v-tooltip bottom>
                  <template v-slot:activator="{ on }">
                    <router-link :to="{path: '/register'}" tag="div">
                      <v-btn icon large target="_blank" v-on="on">
                        <v-icon>help_outline</v-icon>
                      </v-btn>
                    </router-link>
                  </template>
                  <span>没有账号?&nbsp;点击注册</span>
                </v-tooltip>
              </v-toolbar>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
    <Footer />
  </v-app>
</template>

<script>
import Footer from '@/components/content/Footer.vue'
import * as types from '@/store/global/mutation-types'
import { phoneRex } from '@/common/const.js'
import { mapMutations } from 'vuex'

export default {
  name: 'Login',
  data () {
    return {
      username: null,
      password: null,
      code: null,
      toggleTag: true,
      source: null,
      show: false,
      clearable: true,
      loader: null,
      loading3: false,
      loading4: false,
      loadingText: '验证码',
      loadingSecond: 60,
      disabled: false,
      gradient: true,
      usernameHint: '请输入您的手机号',
      rules: {
        username: [
          val => {
            val = !val ? '' : val
            // let str = this.phone.test(val) ? true : '请输入正确的手机号'
            if (phoneRex.test(val) && val.length === 11) {
              this.usernameHint = '手机号正确'
              return true
            } else if (val.length === 11) {
              return phoneRex.test(val) || '请输入正确的手机号'
            } else if (val.length === 0) {
              return '请输入手机号'
            } else {
              this.usernameHint = '请输入您的手机号'
              return true
            }
          }
        ]
      }
    }
  },
  watch: {
    loader () {
      const l = this.loader
      this.disabled = true
      this[l] = !this[l]
      setTimeout(() => {
        this[l] = false
        this.loadingText = `重发(${this.loadingSecond}s)`
        this.flashText()
      }, 1000)
      this.loader = null
    }
  },
  components: {
    Footer
  },
  mounted () {
    this.toggle()
  },
  methods: {
    ...mapMutations({
      setUserInfoData: types.SET_USERINFO
    }),
    login () {
      // 打开 btn loading 动画
      this.loading4 = true
      // 保存表单提交信息
      const formData = {
        username: this.username,
        password: this.password,
        code: this.code
      }
      console.log(formData)
      if (formData.code === null) {
        this.$api.common
          .login({
            username: this.username,
            password: this.password
          })
          .then(res => {
            if (res.code === 200) {
              // 把用户的基本信息存储到 localStorage 中
              this.setUserInfoData(res.data)
              this.$toast('登录成功!', {
                x: 'right',
                y: 'top',
                icon: 'info',
                dismissable: false,
                showClose: true
              })
              setTimeout(() => {
                this.loading4 = false
                this.$router.push('/')
              }, 1000)
            } else {
              setTimeout(() => {
                this.loading4 = false
              }, 1000)
            }
          })
      } else if (formData.password === null) {
        this.$api.common
          .loginCodeSend({
            username: this.username,
            code: this.code
          })
          .then(res => {
            if (res.code === 200) {
              this.$toast('登录成功!', {
                x: 'right',
                y: 'top',
                icon: 'info',
                dismissable: false,
                showClose: true,
                timeout: 800
              })
              setTimeout(() => {
                this.loading4 = false
                this.$router.push('/')
              }, 1000)
            } else {
              setTimeout(() => {
                this.loading4 = false
              }, 1000)
            }
          })
      }
    },
    getSendCode () {
      this.$api.common
        .loginSendCode({
          phone: this.username
        })
        .then(res => {
          if (res.code === 200) {
            this.$toast('短信已发送!', {
              x: 'right',
              y: 'top',
              icon: 'info',
              dismissable: false,
              showClose: true
            })
          }
        })
    },
    toggle () {
      this.toggleTag = !this.toggleTag
      if (this.toggleTag) {
        this.source = '切换密码登录'
      } else {
        this.source = '切换验证码登录'
      }
    },
    addressCheck () {
      this.errorMessages = this.address && !this.name ? '😕! 我是必需的' : ''
      return true
    },
    flashText () {
      let number = this.loadingSecond - 1
      let nIntervId = setInterval(() => {
        this.loadingText = `重发(${number--}s)`
        if (number < 0) {
          clearInterval(nIntervId)
          this.loadingText = '重新获得'
          this.disabled = false
        }
      }, 1000)
    }
  }
}
</script>

<style>
.custom-loader {
  animation: loader 1s infinite;
  display: flex;
}
@-moz-keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
@-webkit-keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
@-o-keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
@keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
.split-bg {
  height: 55%;
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  content: "";
  z-index: 0;
}
h1 {
  font-size: 33px;
  font-weight: 300;
}
</style>
