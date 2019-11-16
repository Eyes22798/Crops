<template>
  <v-app>
    <v-layout>
      <v-flex>
        <v-container>
          <v-row class="mt-n2">
            <v-col cols="12" md="4" v-for="item in listObj" :key="item.plantid">
              <v-card min-width="300">
                <material-card color="warning light" title="病害信息" icon="featured_play_list">
                  <v-icon left>mdi-label</v-icon>
                  {{ item.chinesename }}
                </material-card>
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
    name: '稻瘟病',
    page: 1,
    pageSize: 3,
    number: null,
    listObj: null,
    tag: null
  }),
  computed: {
    ...mapGetters([
      'diseaseName',
      'pestDiseaseName',
      'category'
    ])
  },
  mounted () {
    this.getDiseaseByName(this.name, this.page, this.pageSize)
  },
  watch: {
    page () {
      if (this.tag === 'disease') {
        this.getDiseaseByName(this.name, this.page, this.pageSize)
      } else if (this.tag === 'pest') {
        this.getPestDiseaseByName(this.name, this.page, this.pageSize)
      } else if (this.name === '稻瘟病') {
        this.getDiseaseByName(this.name, this.page, this.pageSize)
      } else {
        this.category['pagenum'] = this.page
        this.category['pagesize'] = this.pageSize
        this.getPestByCategory(this.category)
      }
    },
    diseaseName () {
      this.name = this.diseaseName
      this.tag = 'disease'
      this.getDiseaseByName(this.name, this.page = 1, this.pageSize)
    },
    pestDiseaseName () {
      this.name = this.pestDiseaseName
      this.tag = 'pest'
      this.getPestDiseaseByName(this.name, this.page = 1, this.pageSize)
    },
    name () {
      this.toast(this.name)
    },
    category () {
      this.category['pagenum'] = this.page
      this.category['pagesize'] = this.pageSize
      this.name = this.category.species
      this.getPestByCategory(this.category)
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
    getDiseaseByName (name, pageNum, pageSize) {
      this.$api.common
        .getDiseaseByName(
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
    getPestDiseaseByName (name, pageNum, pageSize) {
      this.$api.common
        .getPestByName(
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
    getPestByCategory (params) {
      this.$api.common
        .getPestByCategory(params)
        .then(res => {
          if (res.code === 200) {
            this.pagination(res.data)
          }
        })
    }
  }
}
</script>
