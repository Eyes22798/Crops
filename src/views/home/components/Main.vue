<template>
  <div id="main" :style="{backgroundImage: `url(${bg})` }">
    <v-row justify="center">
      <p class="d-inline-block text titlet">{{ text }}</p>
    </v-row>

    <v-row class="d-flex flex-row main-card align-end mt-10">
      <v-hover v-slot:default="{ hover }" open-delay="100" close-delay="100">
        <v-card
          width="700"
          height="500"
          :elevation="hover ? 24 : 12"
          class="card-one"
          :img="require('@/assets/images/card-image-1.jpg')"
        >
          <v-row>
            <div class="d-inline-flex white--text ml-8 title mt-2">动植物信息检索</div>
          </v-row>
          <v-expand-transition>
            <v-row class="d-flex align-start justify-end transition-fast-in-fast-out" v-if="hover">
              <v-card
                width="390"
                height="100"
                @click="test"
                class="card-button d-flex justify-start align-center"
                elevation="12"
              >
                <svg-icon iconClass="stock" class="svg"></svg-icon>
                <router-link tag="div" class="router-link" :to="{path: '/plant'}">进入植物信息搜索</router-link>
                <v-icon size="30" class="ml-4">keyboard_arrow_right</v-icon>
              </v-card>
              <v-card
                width="390"
                height="100"
                @click="test"
                class="card-button d-flex justify-start align-center my-4"
                elevation="12"
              >
                <svg-icon iconClass="stock" class="svg"></svg-icon>
                <router-link tag="div" class="router-link" :to="{path: '/enemy'}">进入天敌信息搜索</router-link>
                <v-icon size="30" class="ml-4">keyboard_arrow_right</v-icon>
              </v-card>
            </v-row>
          </v-expand-transition>
        </v-card>
      </v-hover>
    </v-row>
    <v-row class="d-flex flex-row align-end justify-end main-card">
      <v-card
        width="700"
        height="500"
        elevation="24"
        class="card-two"
        :img="require('@/assets/images/card-image-2.jpg')"
      >
        <v-row class="d-flex">
          <v-card
            width="390"
            height="100"
            @click="test"
            class="card-button d-flex justify-start align-center"
            elevation="12"
          >
            <svg-icon iconClass="stock" class="svg"></svg-icon>
            <router-link tag="div" class="router-link" :to="{path: '/disease'}">进入作物病害息诊断</router-link>
            <v-icon size="30" class="ml-4">keyboard_arrow_right</v-icon>
          </v-card>
        </v-row>
        <v-row class="link-text">
          <div class="white--text ml-8 title mt-2">作物病害诊断</div>
        </v-row>
      </v-card>
    </v-row>
  </div>
</template>

<script>
import bg from '@/assets/images/bg7.jpg'
export default {
  name: 'Main',
  data () {
    return {
      text: '产品中心',
      bg: bg
    }
  },
  methods: {
    test () {
      console.log('This is a test!')
    }
  }
}
</script>

<style lang="stylus" scoped>
  #main
    height 160vh
    // background-image url('test.jpg')
    background-size 100% 100%
    margin 0
    padding 0
    .text
      font-size 2rem
      font-family "seriftitle", serif
      color #303030
    .main-card
      margin 0 50px
      .card-one
        border-radius 20px
        transition all .5s linear
        .card-button
          margin 0
          margin-top 5px
          margin-right -20px
          .router-link
            font-size 18px
            line-height 28px
            padding 0 30px
      .card-one:hover
        transform: translateX(10px) translateY(10px) perspective(700px) rotateY(10deg)
      .card-two
        margin-top -75px
        display flex
        align-items flex-end
        border-radius 20px
        transition all .5s linear
        .link-text
          position absolute
          bottom 10px
          right 30px
        .card-button
          margin 0
          margin-top 5px
          margin-right -20px
          .router-link
            font-size 18px
            line-height 28px
            padding 0 30px
      .card-two:hover
        transform translateX(-10px) translateY(-10px) perspective(700px) rotateY(-10deg)
    .svg
      font-size 5rem
      margin-left 10px
</style>
