<template>
  <v-parallax :src="require('@/assets/images/iphone6-frame.png')" height="670" style="width: 315px">
    <v-card>
      <v-toolbar color="black" dark flat prominent>
        <v-tooltip v-model="show" bottom>
          <template v-slot:activator="{ on }">
            <v-text-field
              :append-icon="!show ? 'mic' : 'mdi-send'"
              class="mx-4"
              id="searchInput"
              hide-details
              label="搜索更多资讯"
              prepend-inner-icon="search"
              solo
              loading
              v-model.trim="searchText"
              @focus="changeTooltip"
              @blur="changeTooltip"
              @keyup.enter="changeKeyword"
              @click:append="changeKeyword"
            >
              <template v-slot:progress>
                <v-progress-linear
                  v-if="custom"
                  :value="progress"
                  :color="color"
                  absolute
                  height="7"
                ></v-progress-linear>
              </template>
            </v-text-field>
          </template>
          <span>按Enter键搜索</span>
        </v-tooltip>

        <v-tabs slot="extension" v-model="tabs" background-color="transparent" centered>
          <v-tab
            v-for="(item, index) in tabDatas"
            :key="index"
            @change="getKeyword(item)"
          >{{ item }}</v-tab>
        </v-tabs>
      </v-toolbar>

      <v-tabs-items v-model="tabs">
        <v-tab-item v-for="(tabData, index) in hotQuestionData" :key="index">
          <v-card>
            <v-hover v-slot:default="{ hover }">
              <v-carousel :show-arrows="false" height="350" hide-delimiter-background>
                <v-carousel-item
                  v-for="(carouselItem, i) in tabData.messageImage"
                  :key="i"
                  :src="carouselItem"
                >
                  <v-expand-transition>
                    <div
                      v-if="hover"
                      class="d-flex transition-fast-in-fast-out grey v-card--reveal white--text text-justify title"
                      style="height: 100%; width: 100%;"
                    >
                      <v-row class="ml-0 mr-0  d-flex justify-center content">
                        <div class="subtitle-1 font-weight-bold d-inline-block white--text">点击右边按钮查看原文热点资讯</div>
                        <v-btn color="accent" dark class="d-inline-block" :href="tabData.webpage" icon>
                          <v-icon>send</v-icon>
                        </v-btn>
                      </v-row>
                    </div>
                  </v-expand-transition>
                </v-carousel-item>
              </v-carousel>
            </v-hover>
          </v-card>
        </v-tab-item>
      </v-tabs-items>
    </v-card>
  </v-parallax>
</template>

<script>
import * as types from '@/store/global/mutation-types'
import { mapMutations } from 'vuex'
export default {
  name: 'TabMessage',
  data () {
    return {
      keyword: '',
      pageNum: 1,
      pageSize: 3,
      pageCount: null,
      tabs: null,
      show: false,
      tabDatas: [],
      hotQuestionData: {},
      searchText: '',
      value: '',
      custom: true
    }
  },
  computed: {
    progress () {
      return Math.min(100, this.value.length * 10)
    },
    color () {
      return ['error', 'warning', 'success'][Math.floor(this.progress / 40)]
    }
  },
  mounted () {
    this.getHotMessage()
  },
  methods: {
    ...mapMutations({
      setSearchText: types.SET_SEARCHTEXT
    }),
    getKeyword (item) {
      // 带扩展提示
      console.log('getKeyWord', item, this.keyword)
    },
    async getHotMessage (keyword, pageNum, pageSize) {
      await this.$api.common.getHotMessage()
        .then(res => {
          if (res.code === 200) {
            this.hotQuestionData = res.list
            this.keyword = res.list[0].keyword
            res.list.forEach(item => {
              this.tabDatas.push(item.keyword)
            })
          }
        })
    },
    setQuestionInfoData () {
      this.getQuestionInfo(this.keyword, this.pageNum, this.pageSize)
    },
    changeTooltip () {
      this.show = !this.show
    },
    changeKeyword () {
      if (this.searchText) {
        console.log(this.searchText)
        this.setSearchText(this.searchText)
        // 创建一个 Promise 对象判断是否将 searchText 传到其他组件中
        const promise = new Promise((resolve, reject) => {
          resolve(this.searchText)
          this.setSearchText(this.searchText)
          // 打开 progress 动画
          this.custom = false
        })

        promise.then(res => {
        }).then(res => {
          setTimeout(() => {
            this.custom = true
            // 跳转页面
            this.$router.push('/message')
          }, 1000)
        }).catch(error => {
          console.log(error)
          this.custom = true
        })
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
  .v-card--reveal
    z-index 1
    background-position center top
    background-size cover
    align-items center
    bottom 0
    justify-content center
    opacity .6
    position absolute
    width 100%
    box-shadow 0 10px 20px rgba(0,0,0,0.5)
    overflow hidden
    box-sizing: border-box
  .v-card--reveal::before
    content ''
    background inherit
    background-attachment fixed
    filter blur(4px)
  .v-card--reveal::after
    content ""
    background rgba(0, 0, 0, 0.25)
</style>
