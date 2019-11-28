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
                      class="d-flex transition-fast-in-fast-out grey v-card--reveal white--text text-justify title"
                      style="height: 100%; width: 100%;"
                    >&nbsp;&nbsp;&nbsp;&nbsp;{{ carouselItem.title }}</div>
                  </v-expand-transition>
                </v-carousel-item>
              </v-carousel>
            </v-hover>
            <div class="text-center">
              <v-pagination v-model="pageNum" :length="pageCount" class="mt-2" circle color="black"></v-pagination>
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
      show: false,
      tabDatas: [
        {
          name: '水稻',
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
      questionData: {},
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
    this.keyword = '水稻'
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
    },
    changeTooltip () {
      this.show = !this.show
    },
    changeKeyword () {
      if (this.searchText) {
        // 定义一个新的 tabData 保存用户搜索的新数据
        const tabData = {}
        // 创建一个 Promise 对象判断是否有重复的数据
        const promise = new Promise((resolve, reject) => {
          // 打开 progress 动画
          this.custom = false
          this.tabDatas[0].name !== this.searchText ? resolve(this.searchText) : reject(this.tabDatas[0].name)
        })
        promise.then(res => {
          // 初始化数据
          tabData.name = res
          tabData.data = null
          // 添加新数据
          this.tabDatas.unshift(tabData)
          // 发起请求获得数据并渲染到 view 中
          this.keyword = res
        }).then(res => {
          setTimeout(() => {
            this.custom = true
          }, 1000)
        }).catch(error => {
          this.custom = true
        })
      }
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
