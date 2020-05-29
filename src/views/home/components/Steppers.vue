<template>
  <div id="steppers">
    <v-row justify="center">
      <p class="d-inline-block text">{{ text }}</p>
    </v-row>
    <v-row>
      <v-sheet width="100%" class="mx-auto steppers-sheet">
        <v-slide-group
          v-model="model"
          class="mx-auto pa-4"
          center-active
          show-arrows
          active-class="dark"
        >
          <v-slide-item
            v-for="(item, index) in hotProtectedData"
            :key="index"
            v-slot:default="{ active, toggle }"
          >
            <v-card width="420" elevation="8" @click="toggle" class="ma-4">
              <v-carousel
                :continuous="false"
                :show-arrows="false"
                hide-delimiter-background
                delimiter-icon="mdi-minus"
                height="250"
              >
                <v-carousel-item
                  v-for="(carouselItem, i) in item.protectionImage"
                  :key="i"
                  class="justify-center"
                >
                  <v-img :src="carouselItem"></v-img>
                </v-carousel-item>
              </v-carousel>
              <v-card-title>
                <svg-icon iconClass="title" class="card-svg ml-0 mr-4"></svg-icon>
                &nbsp;{{ item.title }}
              </v-card-title>

              <v-card-title>
                <svg-icon iconClass="my-daily" class="card-svg ml-0 mr-4"></svg-icon>
                &nbsp;{{ item.author }}
              </v-card-title>

              <v-card-title class="text--primary">
                <svg-icon iconClass="project" class="card-svg ml-0 mr-4 justify-start"></svg-icon>
                &nbsp;{{ item.date }}
              </v-card-title>
              <div class="d-inline-flex justify-end eye">
                  <v-icon color="info" class="justify-end">remove_red_eye</v-icon>
                  <p class="eye-text">{{ item.count }}</p>
                </div>
              <v-row class="d-flex flex-row-reverse a-row" @click="gotToLink(item.webpage)">
                <v-card width="300" height="80" class="d-flex justify-center align-center a-card" elevation="24">
                <svg-icon iconClass="information" class="svg ml-0 mr-8"></svg-icon>
                <a :href="item.webpage" class="a-text">点击了解详情</a>
                <v-icon size="24" class="ml-4">keyboard_arrow_right</v-icon>
              </v-card>
              </v-row>
            </v-card>
          </v-slide-item>
        </v-slide-group>
      </v-sheet>
      <!-- <div class="tangle"></div> -->
    </v-row>
  </div>
</template>

<script>
export default {
  name: 'Steppers',
  data () {
    return {
      text: '植保知识',
      model: 5,
      tabDatas: [],
      keyword: '稻瘟病',
      resData: null,
      slides: null,
      hotProtectedData: {},
      hotProtectedDataInfo: {},
      aActive: false
    }
  },
  mounted () {
    this.getHotProtected()
  },
  methods: {
    getHotProtected () {
      this.$api.common.getHotProtected()
        .then(res => {
          if (res.code === 200) {
            this.hotProtectedData = res.list
            res.list.forEach(item => {
              this.$api.common.getCountProtect(item.knowid)
                .then(res => {
                  if (res.code === 200) {
                    item['count'] = res.data - 0
                  }
                })
            })
          }
        })
    },
    gotToLink (item) {
      window.location.href = item
    }
  }
}
</script>

<style lang="stylus" scoped>
  #steppers
    height 120vh
    background-color #E5EEF6
    .text
      font-size 2rem
      font-family "seriftitle", serif
      color #303030
    .steppers-sheet
      background-color #E5EEF6
      .eye
        position: absolute;
        margin-top: 50px;
        margin-left: 15px;
        .eye-text
          margin-bottom 4px
          margin-left 6px
      .tangle
        position absolute
        content ''
        border-color #288aea transparent transparent
        border-style solid
        border-width 20px 20px 0
        margin-top 165px
        left calc(50% - 20px)
      .text
        font-family "seriftitle", serif
        margin 20px auto
      .v-slide-group__next
        .v-icon notranslate
          font-size 5rem
      .a-row
        z-index 4
        transition all .8s
        .svg
          font-size 4rem
      .a-row:hover
         transform translateY(-15px) scale(.9)
        .a-card
          border-radius 5px
          .a-text
            font-size 18px
            line-height 28px
            font-weight 500
            text-decoration none
            color #000
            margin-right 10px
  .card-svg
    font-size 3rem
</style>
