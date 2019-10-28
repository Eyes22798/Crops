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
                    >{{ list.chinesename }}</v-card-title>

                    <v-img
                      src="https://picsum.photos/id/11/500/300"
                      lazy-src="https://picsum.photos/id/11/10/6"
                      aspect-ratio="1"
                      class="grey lighten-2"
                      contain
                      max-height="400"
                    ></v-img>
                    <v-card-text class="py-0">
                      <v-timeline align-top dense>
                        <v-timeline-item color="pink" small>
                          <v-row class="pt-1">
                            <v-col cols="4">
                              <strong>{{ biologycategory.kingdom }}</strong>
                            </v-col>
                            <v-col>
                              <strong>Lunch break</strong>
                            </v-col>
                          </v-row>
                        </v-timeline-item>

                        <v-timeline-item color="teal lighten-3" small>
                          <v-row class="pt-1">
                            <v-col cols="4">
                              <strong>{{ biologycategory.phylum }}</strong>
                            </v-col>
                            <v-col>
                              <strong>Design Stand Up</strong>
                              <div class="caption mb-2">Hangouts</div>
                              <v-avatar>
                                <v-img
                                  src="https://avataaars.io/?avatarStyle=Circle&topType=LongHairFrida&accessoriesType=Kurt&hairColor=Red&facialHairType=BeardLight&facialHairColor=BrownDark&clotheType=GraphicShirt&clotheColor=Gray01&graphicType=Skull&eyeType=Wink&eyebrowType=RaisedExcitedNatural&mouthType=Disbelief&skinColor=Brown"
                                ></v-img>
                              </v-avatar>
                              <v-avatar>
                                <v-img
                                  src="https://avataaars.io/?avatarStyle=Circle&topType=ShortHairFrizzle&accessoriesType=Prescription02&hairColor=Black&facialHairType=MoustacheMagnum&facialHairColor=BrownDark&clotheType=BlazerSweater&clotheColor=Black&eyeType=Default&eyebrowType=FlatNatural&mouthType=Default&skinColor=Tanned"
                                ></v-img>
                              </v-avatar>
                              <v-avatar>
                                <v-img
                                  src="https://avataaars.io/?avatarStyle=Circle&topType=LongHairMiaWallace&accessoriesType=Sunglasses&hairColor=BlondeGolden&facialHairType=Blank&clotheType=BlazerSweater&eyeType=Surprised&eyebrowType=RaisedExcited&mouthType=Smile&skinColor=Pale"
                                ></v-img>
                              </v-avatar>
                            </v-col>
                          </v-row>
                        </v-timeline-item>

                        <v-timeline-item color="pink" small>
                          <v-row class="pt-1">
                            <v-col cols="4">
                              <strong>{{ biologycategory._class }}</strong>
                            </v-col>
                            <v-col>
                              <strong>Lunch break</strong>
                            </v-col>
                          </v-row>
                        </v-timeline-item>

                        <v-timeline-item color="teal lighten-3" small>
                          <v-row class="pt-1">
                            <v-col cols="4">
                              <strong>{{ biologycategory.bioOrder }}</strong>
                            </v-col>
                            <v-col>
                              <strong>Finish Home Screen</strong>
                              <div class="caption">Web App</div>
                            </v-col>
                          </v-row>
                        </v-timeline-item>
                        <v-timeline-item color="teal lighten-3" small>
                          <v-row class="pt-1">
                            <v-col cols="4">
                              <strong>{{ biologycategory.family }}</strong>
                            </v-col>
                            <v-col>
                              <strong>Finish Home Screen</strong>
                              <div class="caption">Web App</div>
                            </v-col>
                          </v-row>
                        </v-timeline-item>
                        <v-timeline-item color="teal lighten-3" small>
                          <v-row class="pt-1">
                            <v-col cols="4">
                              <strong>{{ biologycategory.genus }}</strong>
                            </v-col>
                            <v-col>
                              <strong>Finish Home Screen</strong>
                              <div class="caption">Web App</div>
                            </v-col>
                          </v-row>
                        </v-timeline-item>
                        <v-timeline-item color="teal lighten-3" small>
                          <v-row class="pt-1">
                            <v-col cols="4">
                              <strong>{{ biologycategory.species }}</strong>
                            </v-col>
                            <v-col>
                              <strong>Finish Home Screen</strong>
                              <div class="caption">Web App</div>
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
                  <material-card color="info" class="mx-2 mt-n2" icon="whatshot" iconText="病害名称">
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
    page: 1,
    pageSize: 3,
    number: null,
    listObj: null
  }),
  computed: {
    ...mapGetters([
      'pageName'
    ])
  },
  mounted () {
    this.getPlantByName(this.pageName, this.page, this.pageSize)
  },
  watch: {
    page () {
      this.getPlantByName(this.pageName, this.page, this.pageSize)
    },
    pageName () {
      this.getPlantByName(this.pageName, this.page = 1, this.pageSize)
    }
  },
  methods: {
    getPlantByName (name, pageNum, pageSize) {
      this.$api.common
        .getPlantByName(
          name,
          pageNum,
          pageSize
        )
        .then(res => {
          if (res.code === 200) {
            let list = res.data.list
            Object.keys(list).forEach((key) => {
              list[key].show = true
            })
            this.listObj = list
            this.number = parseInt(res.data.number / this.pageSize)
          }
        })
    },
    getPlantById (plantId) {
      this.$api.common
        .getPlantInfo(plantId)
        .then(res => {
          this.list = {
            ...res.data.plant
          }
          this.biologycategory = {
            ...res.data.biologycategory
          }
          this.imageFile = res.data.list[0].imagefile
          console.log(this.imageFile)
        })
    }
  }
}
</script>
