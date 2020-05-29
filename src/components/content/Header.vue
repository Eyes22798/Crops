<template>
  <div id="Header">
    <v-card>
      <v-app-bar
       app
       flat
       fixed
       id="app-bar"
       :color="color"
       :absolute="absolute"
       :elevate-on-scroll="false"
       :elevation="elevation"
       :class="headerBg"
       >
        <div class="flex-grow-1"></div>
        <v-toolbar-title :class="classObject" class="title" :style="{cursor: 'pointer'}">
          <router-link :to="{path: '/'}" tag="div">Crops</router-link>
        </v-toolbar-title>
        <div class="flex-grow-1"></div>
        <v-toolbar-items v-for="title in titles" :key="title">
          <v-btn text :class="classObject" @click="routerLink(title)" class="subtitle-1 font-weight-bold">{{ title }}</v-btn>
        </v-toolbar-items>
        <div class="flex-grow-1"></div>
        <v-row v-if="!userInfo">
          <router-link :to="{path: '/register'}" tag="div" class="mr-2">
            <v-btn class="white--text px-4 title-btn" :class="[classObject, classBg]" title>免费注册</v-btn>
          </router-link>
          <router-link :to="{path: '/login'}" tag="div">
            <v-btn class="title-btn" :class="classObject" title outlined>登录</v-btn>
          </router-link>
        </v-row>
        <v-row class="justify-center" v-if="userInfo">
          <div>
            <v-menu
             transition="slide-y-transition"
             close-delay
             :nudge-left="40"
             :nudge-bottom="50"
            >
              <template v-slot:activator="{ on }">
                <v-avatar v-on="on" color="grey">
                  <img
                   :src="src"
                   alt="avatar"
                   :style="{cursor: 'pointer'}"
                  >
                </v-avatar>
              </template>
              <v-list>
                <v-list-item v-for="(item, index) in items" :key="index" @click="handleClick(item.title)">
                  <v-list-item-title>
                    <v-icon>{{ item.icon }}</v-icon>
                    {{ item.title }}
                  </v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu>
          </div>
        </v-row>
        <div class="flex-grow-1"></div>
      </v-app-bar>
    </v-card>
  </div>
</template>

<script>
import * as types from '@/store/global/mutation-types'
import { mapGetters, mapMutations } from 'vuex'
export default {
  name: 'Header',
  props: ['absolute'],
  data: () => ({
    phone: 12345679,
    src: null,
    titles: ['病害', '虫害', '植保知识', '产品', '咨询', '资讯', '联系我们'],
    color: null,
    isActive: false,
    elevation: 0,
    items: [
      {
        title: '个人设置',
        icon: 'account_box'
      },
      {
        title: '个人咨询',
        icon: 'assignment_ind'
      },
      {
        title: '账号退出',
        icon: 'power_settings_new'
      }
    ],
    state: null
  }),
  computed: {
    ...mapGetters({
      userInfo: 'userData'
    }),
    classObject () {
      return {
        'text-color-white': true
      }
    },
    headerBg () {
      return {
        'bg-color': this.isActive
      }
    },
    classBg () {
      return {
        black: !this.isActive,
        accent: this.isActive
      }
    }
  },
  created () {
    // 如果，state 中的 userInfo 没有数据（用户没有登录）更改 view
    if (this.userInfo) {
      this.phone = this.userInfo.phone
      this.src = this.userInfo.photo
    }
  },
  watch: {
    userInfo: function () {
      if (this.userInfo) {
        this.phone = this.userInfo.phone
        this.src = this.userInfo.photo
      }
    }
  },
  mounted () {
    window.addEventListener('scroll', this.handleScroll)
  },
  destroyed () {
    window.removeEventListener('scroll', this.handleScroll)
  },
  methods: {
    ...mapMutations({
      removeUserInfoData: types.REMOVE_USERINFO
    }),
    loginout () {
      this.$api.common
        .loginout(this.phone)
        .then(res => {
          if (res.code === 200) {
            // 请求成功，清除 localStorage 中的 userInfo
            this.$toast('退出成功!', {
              x: 'right',
              y: 'top',
              icon: 'info',
              dismissable: false,
              showClose: true,
              timeout: 800
            })
            // 1. 清除 vuex 中所有用户信息
            // 2. 清除本地存储
            this.removeUserInfoData()
            localStorage.removeItem('userInfo')
            if (this.$route.path !== '/') {
              this.$router.push('/')
            }
          }
        })
    },
    setUserInfo () {
      this.$router.push('/userInfo')
    },
    setQuestion () {
      this.$router.push('/userQuestion')
    },
    setExpertQuestion () {
      this.$router.push('/expertQuestion')
    },
    handleScroll () {
      let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
      this.isActive = scrollTop > 0
      this.color = scrollTop > 0 ? 'black' : null
      this.elevation = scrollTop > 0 ? 6 : 0
    },
    handleClick (title) {
      const funObj = {
        '个人设置': () => {
          this.setUserInfo()
        },
        '个人咨询': () => {
          if (this.userInfo.state - 0 === 2) {
            this.setQuestion()
          } else if (this.userInfo.state - 0 === 1) {
            this.setExpertQuestion()
          }
        },
        '账号退出': () => {
          this.loginout()
        }
      }
      funObj[title]()
    },
    routerLink (title) {
      // 待补充
      if (title === '资讯' || title === '咨询') {
        const funObj = {
          '咨询': () => {
            this.$router.push('/question')
          },
          '资讯': () => {
            this.$router.push('/message')
          }
        }
        funObj[title]()
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
  #app-bar
    border-radius 0px
    background-color transparent
  .router-link-active
    text-decoration: none
  .title-btn
    border-radius 2px
  .text-color-white
    color #fff !important
  .bg-color
    background-image linear-gradient(45deg, #93a5cf 0%, #e4efe9 100%)
</style>
