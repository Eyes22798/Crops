<template>
  <v-app>
    <v-container fluid class="px-2">
      <v-row>
        <v-col cols="12" sm="6" md="6">
          <material-card color="#1867C0" title="咨询类别" icon="scatter_plot">
            <v-icon left>mdi-label</v-icon>
            <span class="title font-weight-bold">水稻咨询</span>
          </material-card>
        </v-col>
        <v-col cols="12" sm="6" md="6">
          <material-card color="#1867C0" title="咨询总数" icon="insert_chart_outlined">
            <v-icon left>mdi-label</v-icon>
            <span class="title font-weight-bold">{{ questCount }}</span>
          </material-card>
        </v-col>
      </v-row>
      <v-row class="px-4">
        <v-col cols="12" md="3" sm="12" v-for="item in pageInfoList" :key="item.userID">
          <v-hover>
            <template v-slot="{ hover }">
              <v-card wdith="400" min-height="600" :elevation="hover ? 24 : 12">
                <v-carousel
                  :continuous="false"
                  cycle
                  :show-arrows="false"
                  hide-delimiter-background
                  delimiter-icon="mdi-minus"
                  height="300"
                >
                  <v-carousel-item v-for="(key, value) in item.map" :key="value">
                    <v-img :src="key"></v-img>
                  </v-carousel-item>
                </v-carousel>
                <v-card-title>
                  <v-icon color="info">label_important</v-icon>
                  &nbsp;{{ item.domain }}
                </v-card-title>
                <v-card-title>
                  <v-icon color="info">turned_in</v-icon>
                  &nbsp;{{ item.title }}
                </v-card-title>

                <v-card-text class="text--primary">
                  <v-icon color="info">subject</v-icon>
                  &nbsp;{{ item.content }}
                </v-card-text>
              </v-card>
            </template>
          </v-hover>
        </v-col>
      </v-row>
      <div class="text-center pt-6">
        <v-pagination v-model="page" :length="totalPage" :total-visible="7"></v-pagination>
      </div>
    </v-container>
  </v-app>
</template>

<script>
import MaterialCard from '@/components/common/MaterialCard.vue'
export default {
  name: 'Main',
  components: {
    MaterialCard
  },
  data () {
    return {
      page: 1,
      pageSize: 4,
      totalPage: null,
      questionContent: '',
      pageInfoList: {},
      carouselImages: [],
      questCount: 123
    }
  },
  watch: {
    page () {
      this.getOrdinarySelectAll(this.page, this.pageSize)
    }
  },
  mounted () {
    this.getOrdinarySelectAll(this.page, this.pageSize)
    this.getQuestCount()
  },
  methods: {
    getOrdinarySelectAll (page, pageSize) {
      this.$api.ordinary.getOrdinarySelectAll(
        page,
        pageSize
      )
        .then(res => {
          if (res.code === 200) {
            this.pageInfoList = res.pageInfo.list
            // this.totalPage = parseInt(res.pageInfo.total / this.pageSize)
            this.totalPage = (res.pageInfo.endRow - res.pageInfo.startRow) + 1
          }
        })
    },
    getQuestCount () {
      this.$api.ordinary.getQuestCount()
        .then(res => {
          if (res.code === 200) {
            this.questCount = res.data - 0
          }
        })
    }
  }
}
</script>
