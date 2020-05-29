<template>
  <v-app id="test">
    <v-carousel
    cycle
    :height="height"
    hide-delimiter-background
    :show-arrows="false"
    hide-delimiters
  >
    <v-carousel-item>
      <v-parallax :src="require('@/assets/images/bg5.png')" :height="height">
        <v-layout text-center wrap>
        <v-flex justify-center align-self-center class="knText">
          <v-row>
            <v-col cols="12" lg="8" md="6" sm="12" class="justify-center">
              <h1 class="title-text white--text">{{ slidesText.third.title }}</h1>
              <p class="white--text">{{ slidesText.third.text }}</p>
              <router-link :to="{path: '/'}">
                <v-btn class="btn-more">点击进去</v-btn>
              </router-link>
            </v-col>
          </v-row>
        </v-flex>
        </v-layout>
    </v-parallax>
    </v-carousel-item>
    <v-carousel-item>
      <v-parallax :src="require('@/assets/images/bg.jpg')" :height="height">
        <v-layout text-center wrap>
        <v-flex justify-center align-self-center>
          <v-row>
            <v-col cols="12" lg="8" md="6" sm="12" class="justify-center align-self-center mb-12">
              <h1 class="title-text">{{ testText }}</h1>
              <router-link :to="{path: '/login'}">
                <v-btn default>了解更多</v-btn>
              </router-link>
            </v-col>
            <v-col cols="12" lg="4" md="6" sm="12">
              <TabMessage class="TabMessage" />
            </v-col>
          </v-row>
        </v-flex>
        </v-layout>
      </v-parallax>
    </v-carousel-item>
    <v-carousel-item>
      <v-parallax :src="require('@/assets/images/bg1.png')" :height="height">
        <v-layout text-center wrap>
          <v-flex justify-center align-self-center>
          <v-row>
            <v-col cols="12" lg="8" md="6" sm="12" class="justify-center align-self-center mb-12">
              <h1 class="title-text black--text">{{ slidesText.second.title }}</h1>
              <p class="black--text">{{ slidesText.second.text }}</p>
              <router-link :to="{path: '/'}">
                <v-btn class="btn-more-second">点击了解</v-btn>
              </router-link>
            </v-col>
          </v-row>
          </v-flex>
        </v-layout>
      </v-parallax>
    </v-carousel-item>
  </v-carousel>
  </v-app>
</template>

<script>
import TabMessage from './TabMessage'
export default {
  data () {
    return {
      testText: '精准的识别技术，方便的用户交互',
      slidesText: {
        second: {
          title: '农作物病虫害识别',
          text: '利用人工智能对象智能提取技术，学习大量的农作物病虫害图片、视频，从而实现通过拍照或视频监控，就可以及时发现病虫害情况，做到迅速、有针对性的预防和治疗。'
        },
        third: {
          title: '农作物生长分期',
          text: '利用人工智能图像分类技术，根据农作物外观生理特征，智能判断农作物所处生长期，生长周期可自定义。精准监控农作物生长周期，精准培植，提高生产效率。'
        }
      },
      height: 1000,
      colors: [
        'indigo',
        'warning',
        'pink darken-2',
        'red lighten-1',
        'deep-purple accent-4'
      ],
      slides: [
        'First',
        'Second',
        'Third'
      ]
    }
  },
  components: {
    TabMessage
  }
}
</script>

<style lang="stylus" scoped>
  .title-text
    font-size 3vw
    font-family "seriftitle",serif
    font-weight 400
    letter-spacing 3.3px
    margin-bottom 10px
  .btn-more
    display inline-block
    width 120px
    height 15px
    background-image linear-gradient(to right, #92fe9d 0%, #00c9ff 100%)
    background-blend-mode normal,normal
    border-radius 20px
    font-size 20px
    text-align center
    line-height 45px
    letter-spacing 1px
    color #fff
    box-sizing border-box
    box-shadow rgba(0,0,0,0.25) 0px 15px 45px -9px
  .btn-more-second
    display inline-block
    width 120px
    height 45px
    background-image linear-gradient(45deg, #93a5cf 0%, #e4efe9 100%)
    background-blend-mode normal,normal
    border-radius 2px
    font-size 20px
    text-align center
    line-height 45px
    letter-spacing 1px
    color #fff
    box-sizing border-box
  .knText
    position absolute
    margin-bottom 300px
    margin-left 719px
  .TabMessage
    position absolute
    height 670px
    width 315px
    margin-top -370px
</style>
