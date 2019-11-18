<template>

<v-parallax :src="require('@/assets/images/iphone6-frame.png')" height="670" style="width: 315px">
  <v-card>
    <v-toolbar color="black" dark flat prominent="115">
      <v-text-field
        append-icon="mic"
        class="mx-4"
        flat
        hide-details
        label="搜索更多资讯"
        prepend-inner-icon="search"
        solo-inverted
      ></v-text-field>

      <v-tabs slot="extension" v-model="tabs" background-color="transparent" centered>
        <v-tab
          v-for="(item, index) in tabDatas"
          :key="index"
          @change="getKeyword(item)"
        >{{ item.name }}</v-tab>
      </v-tabs>
    </v-toolbar>

    <v-tabs-items v-model="tabs">
      <v-tab-item v-for="(tabData, index) in tabDatas" :key="index">
        <v-card>
          <v-hover v-slot:default="{ hover }">
            <v-carousel :show-arrows="false" height="300" hide-delimiter-background>
              <v-carousel-item
                v-for="(carouselItem, i) in tabData.data"
                :key="i"
                :src="carouselItem.webpage"
              >
                <v-expand-transition>
                  <div
                    v-if="hover"
                    class="d-flex transition-fast-in-fast-out info v-card--reveal white--text text-justify title"
                    style="height: 100%; width: 100%;"
                  >&nbsp;&nbsp;&nbsp;&nbsp;{{ carouselItem.title }}</div>
                </v-expand-transition>
              </v-carousel-item>
            </v-carousel>
          </v-hover>
          <div class="text-center">
            <v-pagination v-model="pageNum" :length="pageCount" class="mt-2"></v-pagination>
          </div>
        </v-card>
      </v-tab-item>
    </v-tabs-items>
  </v-card>
</v-parallax>

</template>

<script>
export default {
  name: 'TabMessage',
  data () {
    return {
      keyword: '',
      pageNum: 1,
      pageSize: 3,
      pageCount: 6,
      tabs: null,
      tabDatas: [
        {
          name: '紫纹兜兰',
          data: null
        },
        {
          name: '冬小麦',
          data: null
        },
        {
          name: '小叶瓶尔小草',
          data: null
        },
        {
          name: '狭叶方竹',
          data: null
        },
        {
          name: '朴树',
          data: null
        },
        {
          name: '岩栎',
          data: null
        },
        {
          name: '醉香含笑',
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
      questionData: {}
    }
  },
  mounted () {
    this.keyword = '紫纹兜兰'
  },
  watch: {
    keyword () {
      this.setQuestionInfoData()
    },
    pageNum () {
      this.setQuestionInfoData()
    }
  },
  methods: {
    getKeyword (item) {
      this.keyword = item.name
    },
    async getQuestionInfo (keyword, pageNum, pageSize) {
      await this.$api.common
        .getQuestionInfo(
          keyword,
          pageNum,
          pageSize
        )
        .then(res => {
          if (res.code === 200) {
            this.pageCount = parseInt(res.data.number / this.pageSize)
            this.questionData = res.data.list
          }
        })
    },
    setQuestionInfoData () {
      this.getQuestionInfo(this.keyword, this.pageNum, this.pageSize).then(res => {
        this.tabDatas.some(item => {
          if (item['name'] === this.keyword) {
            item['data'] = this.questionData
            return true
          }
        })
      })
    }
  }
}
</script>

<style lang="stylus" scoped>
  .v-card--reveal
    align-items center
    bottom 0
    justify-content center
    opacity .6
    position absolute
    width 100%
</style>
