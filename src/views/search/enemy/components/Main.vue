<template>
  <v-app>
    <v-layout>
      <v-flex>
        <v-container>
          <v-row class="mt-n2">
            <v-col cols="12" md="4" v-for="item in listObj" :key="item.plantid">
              <v-card min-width="300">
                <v-dialog v-model="dialog" width="500">
                  <template v-slot:activator="{ on }">
                    <material-card
                      color="red light"
                      title="天敌信息"
                      icon="featured_play_list"
                      @click="getEnemyInfoById(item.plantid)"
                      v-on="on"
                    >
                      <v-icon left>mdi-label</v-icon>点击查看详细信息
                    </material-card>
                  </template>

                  <v-card>
                    <v-card-title
                      class="headline grey lighten-2"
                      primary-title
                    >{{ list.chinesename }}</v-card-title>

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
                            <v-carousel-item v-for="(slide, i) in imageFile" :key="i">
                              <v-parallax :src="slide.imagefile">
                                <v-row class="fill-height" align="center" justify="center">
                                  <div class="display-3 mt-n12">{{ slide.name }}</div>
                                </v-row>
                              </v-parallax>
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
                              <strong>{{ biologycategory.kingdom }}</strong>
                            </v-col>
                            <v-col>
                              <strong>有关界的描述</strong>
                            </v-col>
                          </v-row>
                        </v-timeline-item>

                        <v-timeline-item color="orange" small icon="star">
                          <v-row class="pt-1">
                            <v-col cols="4">
                              <strong>{{ biologycategory.phylum }}</strong>
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
                              <strong>{{ biologycategory._class }}</strong>
                            </v-col>
                            <v-col>
                              <strong>有关纲的描述</strong>
                            </v-col>
                          </v-row>
                        </v-timeline-item>

                        <v-timeline-item color="green" small icon="star">
                          <v-row class="pt-1">
                            <v-col cols="4">
                              <strong>{{ biologycategory.bioOrder }}</strong>
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
                              <strong>{{ biologycategory.family }}</strong>
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
                              <strong>{{ biologycategory.genus }}</strong>
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
                              <strong>{{ biologycategory.species }}</strong>
                            </v-col>
                            <v-col>
                              <strong>有关种的表述</strong>
                              <div class="caption">{{ item.growthhabit }}</div>
                            </v-col>
                          </v-row>
                        </v-timeline-item>
                      </v-timeline>
                    </v-card-text>
                    <v-divider></v-divider>

                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn color="primary" text @click="dialog = false">关闭</v-btn>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
                <v-row class="justify-center align-center">
                  <material-card color="info" class="mx-2 mt-n2" icon="spa" iconText="中文学名">
                    <v-chip outlined label>
                      <v-icon left>local_florist</v-icon>
                      {{ item.chinesename }}
                    </v-chip>
                  </material-card>
                  <material-card color="info" class="mx-2 mt-n2" icon="public" iconText="拉丁学名">
                    <v-chip outlined label>
                      <v-icon left>local_florist</v-icon>
                      {{ item.latinname }}
                    </v-chip>
                  </material-card>
                  <material-card color="info" class="mx-2 mt-n2" icon="whatshot" iconText="别名">
                    <v-chip outlined label>
                      <v-icon left>local_florist</v-icon>
                      {{ item.alias }}
                    </v-chip>
                  </material-card>
                </v-row>

                <v-card-actions>
                  <v-chip color="success">分布</v-chip>
                  <v-spacer></v-spacer>
                  <v-btn icon @click="item.show = !item.show">
                    <v-icon>{{ item.show ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
                  </v-btn>
                </v-card-actions>
                <v-expand-transition>
                  <div v-show="item.show">
                    <v-divider></v-divider>
                    <v-card-text class="text-justify">{{ item.distribution }}</v-card-text>
                  </div>
                </v-expand-transition>

                <v-card-actions>
                  <v-btn icon @click="item.show = !item.show">
                    <v-icon>{{ item.show ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
                  </v-btn>
                  <v-spacer></v-spacer>
                  <v-chip color="brown darken-3" text-color="white">描述</v-chip>
                </v-card-actions>
                <v-expand-transition>
                  <div v-show="item.show">
                    <v-divider></v-divider>
                    <v-card-text class="text-justify">{{ item.morphology }}</v-card-text>
                  </div>
                </v-expand-transition>

                <v-card-actions>
                  <v-chip color="red accent-2" text-color="white">特征</v-chip>
                  <v-spacer></v-spacer>
                  <v-btn icon @click="item.show = !item.show">
                    <v-icon>{{ item.show ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
                  </v-btn>
                </v-card-actions>
                <v-expand-transition>
                  <div v-show="item.show">
                    <v-divider></v-divider>
                    <v-card-text class="text-justify">{{ item.growthhabit }}</v-card-text>
                  </div>
                </v-expand-transition>
              </v-card>
            </v-col>
          </v-row>
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
    name: '蝗虫',
    page: 1,
    pageSize: 3,
    number: null,
    listObj: null,
    tag: false
  }),
  computed: {
    ...mapGetters([
      'pageName',
      'category'
    ])
  },
  mounted () {
    this.getEnemyByName(this.name, this.page, this.pageSize)
  },
  watch: {
    page () {
      if (this.tag) {
        this.category['pagenum'] = this.page
        this.category['pagesize'] = this.pageSize
        this.getEnemyByCategory(this.category)
      } else {
        const name = this.pageName ? this.pageName : this.name
        this.getEnemyByName(name, this.page, this.pageSize)
      }
    },
    pageName () {
      this.getEnemyByName(this.pageName, this.page = 1, this.pageSize)
      this.tag = false
      this.toast(this.pageName)
    },
    category () {
      this.category['pagenum'] = this.page
      this.category['pagesize'] = this.pageSize
      this.getEnemyByCategory(this.category)
      this.toast(this.category.species)
      this.tag = true
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
      this.number = parseInt(data.number / this.pageSize)
    },
    getEnemyByName (name, pageNum, pageSize) {
      this.$api.common
        .getEnemyByName(
          name,
          pageNum,
          pageSize
        )
        .then(res => {
          if (res.code === 200) {
            this.pagination(res.data)
          }
        })
    },
    getEnemyInfoById (plantId) {
      this.$api.common
        .getEnemyInfo(plantId)
        .then(res => {
          if (res.code === 200) {
            this.list = {
              ...res.data.plant
            }
            this.biologycategory = {
              ...res.data.biologycategory
            }
            this.imageFile = res.data.list
          }
        })
    },
    getEnemyByCategory (params) {
      this.$api.common
        .getEnemyByCategory(params)
        .then(res => {
          if (res.code === 200) {
            this.pagination(res.data)
          }
        })
    }
  }
}
</script>
