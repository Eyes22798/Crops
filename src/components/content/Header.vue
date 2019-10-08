<template>
  <div id="Header">
    <v-card>
      <v-app-bar app flat fixed id="app-bar" :color="color">
        <div class="flex-grow-1"></div>
        <v-toolbar-title :class="classObject" class="title" :style="{cursor: 'pointer'}">
          <router-link :to="{path: '/'}" tag="div">Crops</router-link>
        </v-toolbar-title>
        <div class="flex-grow-1"></div>
        <v-toolbar-items v-for="title in titles" :key="title">
          <v-btn text :class="classObject">{{ title }}</v-btn>
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
                <v-avatar v-on="on">
                  <img
                   src="https://cdn.vuetifyjs.com/images/john.jpg"
                   alt="John"
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
  data: () => ({
    phone: 12345679,
    titles: ['国际', '国内', '病害', '虫害', '植保知识', '产品', '资讯'],
    color: null,
    isActive: false,
    items: [
      {
        title: '个人设置',
        icon: 'account_box'
      },
      {
        title: '账号设置',
        icon: 'assignment_ind'
      },
      {
        title: '账号退出',
        icon: 'power_settings_new'
      }
    ]
  }),
  computed: {
    ...mapGetters({
      userInfo: 'userData'
    }),
    classObject () {
      return {
        'text-color-white': !this.isActive
      }
    },
    classBg () {
      return {
        black: this.isActive,
        accent: !this.isActive
      }
    }
  },
  created () {
    // 如果，state 中的 userInfo 没有数据（用户没有登录）更改 view
    if (!this.userInfo) {
      console.log('用户数据为空')
    }
    this.phone = this.userInfo.phone
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
            this.removeUserInfoData()
          }
        })
    },
    setUserInfo () {
      console.log('我是个人设置')
    },
    setAccount () {
      console.log('我是账号设置')
    },
    handleScroll () {
      let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
      this.isActive = scrollTop > 0
      this.color = scrollTop > 0 ? 'white' : null
    },
    handleClick (title) {
      const funObj = {
        '个人设置': () => {
          this.setUserInfo()
        },
        '账号设置': () => {
          this.setAccount()
        },
        '账号退出': () => {
          this.loginout()
        }
      }
      funObj[title]()
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
</style>
