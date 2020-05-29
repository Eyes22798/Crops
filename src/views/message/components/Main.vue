<template>
  <v-app id="message">
    <v-container class="px-2" fluid>
      <v-row>
        <v-col cols="12" md="3" sm="12" v-for="item in questionData" :key="item.messid">
          <v-hover>
            <template v-slot="{ hover }">
              <v-card wdith="400" min-height="400" :elevation="hover ? 24 : 12">
                <v-carousel
                  :continuous="false"
                  cycle
                  :show-arrows="false"
                  hide-delimiter-background
                  delimiter-icon="mdi-minus"
                  height="300"
                >
                  <v-carousel-item v-for="(key, value) in item.messageImage" :key="value">
                    <v-img :src="key"></v-img>
                  </v-carousel-item>
                </v-carousel>
                <v-card-title>
                  <v-icon color="info">label_important</v-icon>
                  &nbsp;{{ item.title }}
                </v-card-title>

                <v-card-title>
                  <v-icon color="info">person</v-icon>
                  &nbsp;{{ item.author }}
                </v-card-title>

                <v-card-text class="text--primary">
                  <v-icon color="info">schedule</v-icon>
                  &nbsp;{{ item.date }}
                  &nbsp;<p class="float-right eye-text">{{ item.count }}</p>
                  <v-icon color="info" class="float-right">remove_red_eye</v-icon>
                </v-card-text>
                <v-tooltip top>
                    <template v-slot:activator="{ on }">
                      <v-btn dark block color="info" v-on="on" :href="item.webpage">
                        <v-icon dark>send</v-icon>
                      </v-btn>
                    </template>
                    <span>查看原文链接</span>
                  </v-tooltip>
              </v-card>
            </template>
          </v-hover>
        </v-col>
      </v-row>
      <div class="text-center pt-4 mb-8">
        <v-pagination v-model="page" :length="totalPage" :total-visible="7"></v-pagination>
      </div>
    </v-container>
  </v-app>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'Main',
  data () {
    return {
      text: '水稻',
      questionData: {},
      keyword: '',
      number: null,
      page: 1,
      pageNum: 3,
      totalPage: null
    }
  },
  computed: {
    ...mapGetters([
      'searchText'
    ])
  },
  mounted () {
    this.keyword = this.searchText
    this.keyword = this.keyword ? this.keyword : '水稻'
    this.getQuestionInfo(this.keyword, this.page, this.pageSize)
  },
  watch: {
    page () {
      this.getQuestionInfo(this.keyword, this.page, this.pageSize)
    },
    searchText () {
      this.keyword = this.searchText
      this.getQuestionInfo(this.keyword, this.page, this.pageSize)
    }
  },
  methods: {
    getQuestionInfo (keyword, page, pageSize) {
      this.$api.common.getQuestionInfo(keyword, page, pageSize)
        .then(res => {
          if (res.code === 200) {
            // 数据库中总共有多少个list
            this.number = res.data.number
            // 每一页有 list.pageNumber 个 list
            this.pageNum = res.data.pageNumber
            this.totalPage = parseInt(res.data.number / res.data.pageNumber)
            // 获取热点访问值并添加到 list 中
            res.data.list.forEach(item => {
              this.$api.common.getCountMessage(item.messid)
                .then(res => {
                  if (res.code === 200) {
                    item['count'] = res.data
                  }
                })
            })
            // 拿到 资讯list 数据
            this.questionData = res.data.list
          }
        })
    }
  }
}
</script>

<style lang="stylus" scoped>
  #message
    min-height 00px
    .eye-text
      margin-top 2px
</style>
