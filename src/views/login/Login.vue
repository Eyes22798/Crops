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
                    width="150"
                    height="150"
                  />
                  <h1 class="flex my-6 success--text">广学坚守，勤思敏行</h1>
                </div>
                <v-form v-if="!toggleTag">
                  <v-text-field
                    id="phone"
                    label="用户名"
                    name="username"
                    prepend-icon="person"
                    type="text"
                    :rules="[() => !!username || '请输入你的手机号']"
                    :clearable="clearable"
                    v-model="username"
                    counter="11"
                    maxlength="11"
                    hint="请输入正确的手机号"
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
                    :rules="[() => !!username || '请输入你的手机号']"
                    :clearable="clearable"
                    v-model="username"
                    counter="11"
                    maxlength="11"
                    hint="请输入正确的手机号"
                    required
                  ></v-text-field>
                  <v-row>
                    <v-col cols="8" lg="8">
                      <v-text-field
                        id="code"
                        label="验证码"
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
                        @click="loader = 'loading3'"
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
export default {
  name: 'Login',
  data () {
    return {
      username: null,
      password: null,
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
      gradient: true
    }
  },
  watch: {
    loader () {
      const l = this.loader
      this.disabled = true
      this[l] = !this[l]
      setTimeout(() => {
        this[l] = false
        this.loadingText = `${this.loadingSecond}s`
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
    login () {
      this.loading4 = true
      this.$api.common
        .login({
          username: this.username,
          password: this.password
        })
        .then(res => {
          console.log(res)
          setTimeout(() => {
            this.loading3 = false
            this.$router.push('/')
          }, 1000)
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
        this.loadingText = `${number--}s`
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
