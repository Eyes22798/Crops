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
        <v-row>
          <router-link :to="{path: '/register'}" tag="div" class="mr-2">
            <v-btn class="white--text px-4 title-btn" :class="[classObject, classBg]" title>免费注册</v-btn>
          </router-link>
          <router-link :to="{path: '/login'}" tag="div">
            <v-btn class="title-btn" :class="classObject" title outlined>登录</v-btn>
          </router-link>
        </v-row>
        <v-row class="justify-center" v-show="false">
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
                <v-list-item v-for="(item, index) in items" :key="index" @click="1">
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
export default {
  name: 'Header',
  data: () => ({
    titles: ['国际', '国内', '病害', '虫害', '植保知识', '产品', '资讯'],
    color: null,
    isActive: false,
    items: [
      { title: '信息设置', icon: 'account_box'},
      { title: '账号设置', icon: 'assignment_ind'},
      { title: '账号退出', icon: 'power_settings_new'}
    ],
  }),
  mounted () {
    window.addEventListener('scroll', this.handleScroll)
  },
  destroyed () {
    window.removeEventListener('scroll', this.handleScroll)
  },
  computed: {
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
  methods: {
    handleScroll () {
      let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
      this.isActive = scrollTop > 0
      this.color = scrollTop > 0 ? 'white' : null
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
