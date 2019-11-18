<template>
  <v-app id="test">
    <v-parallax :src="require('@/assets/images/bg.jpg')" :height="height">
      <v-layout text-center wrap>
        <v-flex justify-center align-self-center>
          <v-row>
            <v-col cols="12" lg="8" md="6" sm="12" class="justify-center align-self-center mb-12">
              <h1 class="title-text">{{ testText }}</h1>
              <p class="subheading font-weight-regular title">从零开始的巴伯尔本</p>
              <router-link :to="{path: '/login'}">
                <v-btn>点击跳转</v-btn>
              </router-link>
            </v-col>
            <v-col cols="12" lg="4" md="6" sm="12">
              <TabMessage />
            </v-col>
          </v-row>
        </v-flex>
      </v-layout>
    </v-parallax>
  </v-app>
</template>

<script>
import TabMessage from './TabMessage'
export default {
  data () {
    return {
      testText: '精准的识别技术，方便的用户交互',
      height: 900
    }
  },
  components: {
    TabMessage
  }
}
</script>

<style lang="stylus" scoped>
  .title-text
    font-size 3rem
    font-family "seriftitle",serif
    font-weight 400
    letter-spacing 3.3px
    margin-bottom 10px
</style>
