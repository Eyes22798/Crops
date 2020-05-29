<template>
  <v-app id="info-card">
    <v-layout>
      <v-flex>
        <v-container>
          <v-row class="mt-n2">
            <v-col v-show="showCols" cols="12" md="4" v-for="item in listObj" :key="item.plantid">
              <v-card min-width="300">
                <v-dialog v-model="dialog" max-width="600" class="info-dialog">
                  <template v-slot:activator="{ on }">
                    <material-card
                      color="success"
                      title="作物信息"
                      icon="featured_play_list"
                      @click="getPlantById(item.plantid)"
                      v-on="on"
                    >
                      <v-icon left>mdi-label</v-icon>点击查看详细信息
                    </material-card>
                  </template>
                  <v-card>
                    <v-card-title
                      class="headline grey lighten-2"
                      primary-title
                    >详细信息</v-card-title>
                    <v-row class="justify-center align-center text-center">
                      <material-card color="info" class="mx-2" width="100%" icon="spa" iconText="中文学名">
                        <v-chip outlined label>
                          <v-icon left>local_florist</v-icon>
                          {{ list.chinesename }}
                        </v-chip>
                      </material-card>
                    </v-row>
                    <v-row class="justify-center align-center text-center">
                      <material-card color="info" class="mx-2" width="100%" icon="public" iconText="拉丁学名">
                        <v-chip outlined label>
                          <v-icon left>local_florist</v-icon>
                          {{ list.latinname }}
                        </v-chip>
                      </material-card>
                    </v-row>
                    <v-row class="justify-center align-center text-center">
                      <material-card color="info" class="mx-2" width="100%" icon="whatshot" iconText="别称">
                        <v-chip outlined label>
                          <v-icon left>local_florist</v-icon>
                          {{ list.alias }}
                        </v-chip>
                      </material-card>
                    </v-row>
                    <v-card-text>
                      <strong class="title font-weight-bold">科属关系</strong>
                    </v-card-text>
                    <v-card-text class="py-0">
                      <v-timeline align-top dense>
                        <v-timeline-item
                         small
                         icon="star"
                         v-for="(key, index) in biologycategory"
                         :key="index"
                        >
                          <v-row>
                            <v-col cols="4">
                              <p v-if="index === 'bioid'">物种id</p>
                              <strong>{{ biologycategory[index] }}</strong>
                            </v-col>
                          </v-row>
                        </v-timeline-item>
                      </v-timeline>
                    </v-card-text>
                    <v-divider></v-divider>
                    <v-card-text class="mt-2">
                      <v-chip color="success" label class="info-chip"><v-icon left>mdi-label</v-icon>分布</v-chip>
                      <v-spacer></v-spacer>
                      {{ list.distribution }}
                      <v-spacer></v-spacer>
                      <v-chip color="success" label class="info-chip"><v-icon left>mdi-label</v-icon>描述</v-chip>
                      <v-spacer></v-spacer>
                      {{ list.morphology }}
                      <v-spacer></v-spacer>
                      <v-chip color="success" label class="info-chip"><v-icon left>mdi-label</v-icon>特征</v-chip>
                      <v-spacer></v-spacer>
                      {{ list.growthhabit }}
                    </v-card-text>
                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn color="primary" text @click="dialog = false">关闭</v-btn>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
                <v-card min-width="300">
                  <v-carousel
                    :continuous="false"
                    cycle
                    :show-arrows="false"
                    hide-delimiter-background
                    delimiter-icon="mdi-minus"
                    height="300"
                  >
                    <v-carousel-item v-for="(key, value) in item.plantimage" :key="value">
                      <v-img :src="key"></v-img>
                    </v-carousel-item>
                  </v-carousel>
                </v-card>
              </v-card>
            </v-col>
            <v-col v-show="!showCols" cols="12" md="4" v-for="item in imageListObj" :key="item.ID">
              <v-card>
                <v-dialog v-model="dialog2" width="500">
                  <template v-slot:activator="{ on }">
                    <material-card
                      color="success"
                      title="作物信息"
                      icon="featured_play_list"
                      @click="openDialog"
                      v-on="on"
                    >
                      <v-icon left>mdi-label</v-icon>点击查看详细信息
                    </material-card>
                  </template>

                  <v-card>
                    <v-card-title
                      class="headline grey lighten-2"
                      primary-title
                    >{{ item.chineseName }}</v-card-title>

                    <v-row justify="center">
                      <v-col cols="12">
                        <v-card elevation="24">
                          <v-system-bar lights-out></v-system-bar>
                          <v-carousel
                            :continuous="false"
                            cycle
                            :show-arrows="false"
                            hide-delimiter-background
                            delimiter-icon="mdi-minus"
                            height="300"
                          >
                            <v-carousel-item v-for="(slide, i) in item.image_imageFile" :key="i">
                              <v-parallax :src="slide"></v-parallax>
                            </v-carousel-item>
                          </v-carousel>
                        </v-card>
                      </v-col>
                    </v-row>
                    <v-card-text>
                      <strong class="title font-weight-bold">科属关系</strong>
                    </v-card-text>
                    <v-card-text class="py-0">
                      <v-timeline align-top dense>
                        <v-timeline-item color="red" small icon="star">
                          <v-row class="pt-1">
                            <v-col cols="4">
                              <strong>{{ item.category_kingdom }}</strong>
                            </v-col>
                            <v-col>
                              <strong>有关界的描述</strong>
                            </v-col>
                          </v-row>
                        </v-timeline-item>

                        <v-timeline-item color="orange" small icon="star">
                          <v-row class="pt-1">
                            <v-col cols="4">
                              <strong>{{ item.category_phylum }}</strong>
                            </v-col>
                            <v-col>
                              <strong>有关门的描述</strong>
                              <div class="caption mb-2">Hangouts</div>
                            </v-col>
                          </v-row>
                        </v-timeline-item>

                        <v-timeline-item color="blue" small icon="star">
                          <v-row class="pt-1">
                            <v-col cols="4">
                              <strong>{{ item.category_class }}</strong>
                            </v-col>
                            <v-col>
                              <strong>有关纲的描述</strong>
                            </v-col>
                          </v-row>
                        </v-timeline-item>

                        <v-timeline-item color="green" small icon="star">
                          <v-row class="pt-1">
                            <v-col cols="4">
                              <strong>{{ item.category_biology }}</strong>
                            </v-col>
                            <v-col>
                              <strong>有关目的描述</strong>
                              <div class="caption">Web App</div>
                            </v-col>
                          </v-row>
                        </v-timeline-item>

                        <v-timeline-item color="yellow" small icon="star">
                          <v-row class="pt-1">
                            <v-col cols="4">
                              <strong>{{ item.category_family }}</strong>
                            </v-col>
                            <v-col>
                              <strong>有关科的描述</strong>
                              <div class="caption">Web App</div>
                            </v-col>
                          </v-row>
                        </v-timeline-item>

                        <v-timeline-item color="teal" small icon="star">
                          <v-row class="pt-1">
                            <v-col cols="4">
                              <strong>{{ item.category_genus }}</strong>
                            </v-col>
                            <v-col>
                              <strong>有关属的描述</strong>
                              <div class="caption">Web App</div>
                            </v-col>
                          </v-row>
                        </v-timeline-item>

                        <v-timeline-item color="purple" small icon="star">
                          <v-row class="pt-1">
                            <v-col cols="4">
                              <strong>{{ item.category_species }}</strong>
                            </v-col>
                            <v-col>
                              <strong>有关种的表述</strong>
                              <div class="caption">{{ item.distribution }}</div>
                            </v-col>
                          </v-row>
                        </v-timeline-item>
                      </v-timeline>
                    </v-card-text>
                    <v-divider></v-divider>

                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn color="primary" text @click="dialog2 = false">关闭</v-btn>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
                <v-row class="justify-center align-center">
                  <material-card color="info" class="mx-2 mt-n2" icon="spa" iconText="中文学名">
                    <v-chip outlined label>
                      <v-icon left>local_florist</v-icon>
                      {{ item.chineseName }}
                    </v-chip>
                  </material-card>
                  <material-card color="info" class="mx-2 mt-n2" icon="public" iconText="拉丁学名">
                    <v-chip outlined label>
                      <v-icon left>local_florist</v-icon>
                      {{ item.latinName }}
                    </v-chip>
                  </material-card>
                  <material-card color="info" class="mx-2 mt-n2" icon="whatshot" iconText="别称">
                    <v-chip outlined label>
                      <v-icon left>local_florist</v-icon>
                      {{ item.alias }}
                    </v-chip>
                  </material-card>
                </v-row>

                <v-card-actions>
                  <v-chip color="success">分布</v-chip>
                  <v-spacer></v-spacer>
                  <v-btn icon>
                    <v-icon>mdi-chevron-down</v-icon>
                  </v-btn>
                </v-card-actions>
                <v-expand-transition>
                  <div>
                    <v-divider></v-divider>
                    <v-card-text class="text-justify">{{ item.distribution }}</v-card-text>
                  </div>
                </v-expand-transition>

                <v-card-actions>
                  <v-btn icon>
                    <v-icon>mdi-chevron-down</v-icon>
                  </v-btn>
                  <v-spacer></v-spacer>
                  <v-chip color="brown darken-3" text-color="white">描述</v-chip>
                </v-card-actions>
                <v-expand-transition>
                  <div>
                    <v-divider></v-divider>
                    <v-card-text class="text-justify">{{ item.morphology }}</v-card-text>
                  </div>
                </v-expand-transition>

                <v-card-actions>
                  <v-chip color="red accent-2" text-color="white">特征</v-chip>
                  <v-spacer></v-spacer>
                  <v-btn icon>
                    <v-icon>mdi-chevron-down</v-icon>
                  </v-btn>
                </v-card-actions>
                <v-expand-transition>
                  <div>
                    <v-divider></v-divider>
                    <v-card-text class="text-justify">{{ item.distribution }}</v-card-text>
                  </div>
                </v-expand-transition>
              </v-card>
            </v-col>
          </v-row>
          <!-- 分页组件 -->
          <div class="text-center">
            <v-container>
              <v-row justify="center">
                <v-col cols="8">
                  <v-container class="max-width">
                    <v-pagination v-model="page" class="my-4" :length="number"></v-pagination>
                  </v-container>
                </v-col>
              </v-row>
            </v-container>
          </div>
        </v-container>
      </v-flex>
    </v-layout>
  </v-app>
</template>

<script>
import MaterialCard from '@/components/common/MaterialCard.vue'
import { mapGetters } from 'vuex'
export default {
  name: 'Main',
  components: {
    MaterialCard
  },
  data: () => ({
    show: false,
    dialog: false,
    list: {
      plantid: null,
      chinesename: null,
      latinname: null,
      alias: null,
      category: null,
      distribution: null,
      morphology: null,
      plantimage: null,
      growthhabit: null,
      imageList: null
    },
    biologycategory: {
      bioid: null,
      kingdom: null,
      phylum: null,
      _class: null,
      bioOrder: null,
      family: null,
      genus: null,
      species: null
    },
    taxonomy: [
      '界',
      '门',
      '纲',
      '目',
      '科',
      '属'
    ],
    imageFile: null,
    name: '玫瑰',
    page: 1,
    pageSize: 3,
    number: null,
    listObj: null,
    tag: false,
    imageListObj: null,
    dialog2: false,
    showCols: true,
    imageTag: false
  }),
  computed: {
    ...mapGetters([
      'pageName',
      'category',
      'imageName'
    ])
  },
  mounted () {
    this.getPlantByName(this.name, this.page, this.pageSize)
  },
  watch: {
    page () {
      if (this.imageTag) {
        this.getImageDataBySolr(this.imageName, this.page - 1, this.pageSize)
        this.imageTag = false
        return
      }
      if (this.tag) {
        this.category['pagenum'] = this.page
        this.category['pagesize'] = this.pageSize
        this.getPlantByCategrory(this.category)
      } else {
        const name = this.pageName ? this.pageName : this.name
        this.getPlantByName(name, this.page, this.pageSize)
      }
    },
    pageName () {
      this.getPlantByName(this.pageName, this.page = 1, this.pageSize)
      this.tag = false
      this.toast(this.pageName)
    },
    category () {
      this.category['pagenum'] = this.page
      this.category['pagesize'] = this.pageSize
      this.getPlantByCategrory(this.category)
      this.toast(this.category.species)
      this.tag = true
    },
    imageName () {
      this.getImageDataBySolr(this.imageName, this.page = 1, this.pageSize)
    }
  },
  methods: {
    toast (name) {
      this.$toast(`${name}已经搜索成功`, {
        x: 'right',
        y: 'top',
        icon: 'info',
        dismissable: false,
        showClose: true
      })
    },
    pagination (data) {
      let list = data.list
      Object.keys(list).forEach((key) => {
        list[key].show = true
      })
      this.listObj = list
      // 得到分页数量
      this.number = parseInt(data.number / data.pageNumber || 3)
    },
    getPlantByName (name, pageNum, pageSize) {
      this.$api.common
        .getPlantByName(
          name,
          pageNum,
          pageSize
        )
        .then(res => {
          if (res.code === 200) {
            this.pagination(res.data)
            this.showCols = true
          }
        })
    },
    getPlantById (plantId) {
      console.log(plantId)
      this.$api.common
        .getPlantInfo(plantId)
        .then(res => {
          if (res.code === 200) {
            this.list = {
              ...res.data.plant
            }
            this.biologycategory = {
              ...res.data.biologycategory
            }
          }
        })
    },
    getPlantByCategrory (params) {
      this.$api.common
        .getPlantByCategory(params)
        .then(res => {
          if (res.code === 200) {
            this.pagination(res.data)
            this.showCols = true
          }
        })
    },
    getImageDataBySolr (name, pageNum, pageSize) {
      this.$api.ordinary.getImageDataBySolr(
        name,
        pageNum,
        pageSize
      )
        .then(res => {
          if (res.code === 200) {
            this.showCols = false
            this.imageTag = true
            this.imageListObj = res.solrDocuments
            this.number = parseInt(res.num / this.pageSize || 3)
          }
        })
    },
    openDialog () {

    }
  }
}
</script>

<style lang="stylus" scoped>
  #info-card
    .info-dialog
      .info-chip
        display flex
        justify-content center
        width 65px
</style>
