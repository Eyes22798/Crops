<template>
  <v-row justify="center" id="steppers">
    <v-card width="80%" height="300" class="my-12" elevation="12">
      <v-row class="justify-center">
        <v-col cols="10">
          <v-carousel
            :continuous="false"
            :show-arrows="false"
            hide-delimiter-background
            delimiter-icon="mdi-minus"
            height="200"
          >
            <v-carousel-item v-for="(carouselItem, i) in slides" :key="i" class="justify-center">
              <p class="title" style="text-align: center">{{ carouselItem.title }}</p>
              <v-parallax :src="carouselItem.webpage">
              </v-parallax>
            </v-carousel-item>
          </v-carousel>
          <div class="text-center">
            <v-pagination v-model="pageNum" :length="pageCount" class="mt-2" circle color="black"></v-pagination>
          </div>
        </v-col>
      </v-row>
      <div class="tangle"></div>
    </v-card>
    <v-sheet class="mx-auto" elevation="8" width="95%">
      <v-slide-group v-model="model" class="pa-4" center-active show-arrows active-class="info">
        <v-slide-item
          v-for="(item, index) in tabDatas"
          :key="index"
          v-slot:default="{ active, toggle }"
        >
          <v-card
            color="#26c6da"
            class="ma-4"
            height="100"
            width="290"
            @click="toggle"
          >
            <v-row
              class="fill-height"
              align="center"
              justify="center"
              @click="getKeyword(item.name)"
            >
              <v-scale-transition>
                <v-icon color="white" size="20" v-text="item.name"></v-icon>
              </v-scale-transition>
            </v-row>
          </v-card>
        </v-slide-item>
      </v-slide-group>
    </v-sheet>
  </v-row>
</template>

<script>
export default {
  name: 'Steppers',
  data () {
    return {
      model: 5,
      tabDatas: [
        {
          name: '稻瘟病',
          data: null
        },
        {
          name: '南瓜病',
          data: null
        },
        {
          name: '南瓜病症',
          data: null
        },
        {
          name: '南瓜病12',
          data: null
        },
        {
          name: '稻瘟病213',
          data: null
        },
        {
          name: '稻瘟病21',
          data: null
        },
        {
          name: '稻瘟病啊是大',
          data: null
        },
        {
          name: '牡丹',
          data: null
        },
        {
          name: '邹叶狗尾草',
          data: null
        }
      ],
      keyword: '稻瘟病',
      pageNum: 1,
      pageSize: 3,
      resData: null,
      slides: null,
      pageCount: 0
    }
  },
  mounted () {
    this.getProtectInfo(this.keyword, this.pageNum, this.pageSize)
  },
  watch: {
    keyword () {
      this.getProtectInfo(this.keyword, this.pageNum, this.pageSize)
    },
    pageNum () {
      this.getProtectInfo(this.keyword, this.pageNum, this.pageSize)
    }
  },
  methods: {
    getKeyword (name) {
      this.keyword = name
    },
    getProtectInfo (keyword, pageNum, pageSize) {
      this.$api.common.getProtectInfo(
        keyword,
        pageNum,
        pageSize
      )
        .then(res => {
          this.resData = res.data
          this.slides = res.data.list
          this.pageCount = res.data.number
        })
    }
  }
}
</script>

<style lang="stylus" scoped>
  #steppers
    .tangle
      position absolute
      content ''
      border-color #288aea transparent transparent
      border-style solid
      border-width 20px 20px 0
      bottom -20px
      left calc(50% - 20px)
</style>
