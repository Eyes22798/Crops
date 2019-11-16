<template>
  <div>
    <v-parallax :src="require('@/assets/images/header2.jpg')" :height="height">
      <v-spacer></v-spacer>
      <v-layout class="mt-12 mx-10">
        <v-flex>
          <v-row class="justify-center">
            <v-card class="basil">
              <v-card-title class="text-center justify-center py-6">
                <h1 class="font-weight-bold display-2 basil--text">更详细的胁迫诊断</h1>
              </v-card-title>

              <v-tabs v-model="tab" background-color="#559a55" grow center-active>
                <v-tab v-for="item in items" :key="item" class="white--text">{{ item }}</v-tab>
              </v-tabs>

              <v-tabs-items v-model="tab" id="tabItem">
                <v-tab-item>
                  <v-tooltip bottom>
                    <template v-slot:activator="{ on }">
                      <v-text-field
                        solo
                        append-icon="search"
                        autofocus
                        height="65"
                        placeholder="根据病害名称检索"
                        v-model.trim="diseaseSearch"
                        @click:append="getSearchData"
                        @keyup.enter="getSearchData"
                        v-on="on"
                      ></v-text-field>
                    </template>
                    <span>按 Enter 搜索</span>
                  </v-tooltip>
                </v-tab-item>

                <v-tab-item>
                  <v-tooltip bottom>
                    <template v-slot:activator="{ on }">
                      <v-text-field
                        solo
                        append-icon="search"
                        autofocus
                        height="65"
                        placeholder="根据虫害名称检索"
                        v-model.trim="pestSearch"
                        @click:append="getSearchData"
                        @keyup.enter="getSearchData"
                        v-on="on"
                      ></v-text-field>
                    </template>
                    <span>按 Enter 搜索</span>
                  </v-tooltip>
                </v-tab-item>

                <v-tab-item>
                  <v-container fluid id="tabContainer">
                    <v-row >
                      <v-col class="selectCol" v-for="catgroyNumber in catgroyNumbers" :key="catgroyNumber">
                        <v-select
                         class="selectItem"
                         background-color="white"
                         :label="catgroyItems[catgroyNumber - 1].label"
                         chips
                         filled
                         clearable
                         single-line
                         height="65"
                         :items="catgroyItems[catgroyNumber - 1].value"
                         @click:clear="removeSelectItem(catgroyNumber)"
                         @change="addSelectItem($event, catgroyItems[catgroyNumber - 1].type)"
                        >
                        </v-select>
                      </v-col>
                    </v-row>
                  </v-container>
                </v-tab-item>

              </v-tabs-items>
            </v-card>
          </v-row>
        </v-flex>
      </v-layout>
    </v-parallax>
  </div>
</template>

<script>
import * as types from '@/store/global/mutation-types'
import { mapMutations } from 'vuex'
export default {
  name: 'Parallax',
  data: () => ({
    height: 400,
    search: null,
    diseaseSearch: null,
    pestSearch: null,
    tab: null,
    cols: 12,
    items: [
      '病害名搜索',
      '虫害名搜索',
      '虫害科属联动检索',
      '病虫害图象识别',
      '水分胁迫检索',
      '养分胁迫检索',
      '温度胁迫检索',
      '草海胁迫检索'
    ],
    catgroyNumbers: 1,
    catgroyItems: [
      {
        id: 0,
        label: '请选择什么门',
        type: 'phylum',
        value: []
      },
      {
        id: 1,
        label: '请选择什么纲',
        type: 'class',
        value: []
      },
      {
        id: 2,
        label: '请选择什么目',
        type: 'bioOrder',
        value: []
      },
      {
        id: 3,
        type: 'family',
        label: '请选择什么科',
        value: []
      },
      {
        id: 4,
        label: '请选择什么属',
        type: 'genus',
        value: []
      },
      {
        id: 5,
        label: '选择您要查找的',
        type: 'species',
        value: []
      }
    ],
    categoryValue: []
  }),
  watch: {
    tab () {
      if (this.tab === 2) {
        this.getCategory('kingdom', '动物界')
      }
    }
  },
  methods: {
    ...mapMutations({
      setDiseaseName: types.SET_DISEASENAME,
      setPestDiseaseName: types.SET_PESEDISEASENAME,
      setCategory: types.SET_CATEGORY
    }),
    getSearchData () {
      if (this.diseaseSearch) {
        this.setDiseaseName(this.diseaseSearch)
        this.diseaseSearch = null
      }
      if (this.pestSearch) {
        this.setPestDiseaseName(this.pestSearch)
        this.pestSearch = null
      }
    },
    getCategory (type, value) {
      this.$api.common
        .getCategory({
          type,
          value
        })
        .then(res => {
          if (res.code === 200) {
            this.catgroyItems[this.catgroyNumbers - 1].value = res.data
          }
        })
    },
    addSelectItem (e, type) {
      const map = new Map([
        ['phylum', 2],
        ['class', 3],
        ['bioOrder', 4],
        ['family', 5],
        ['genus', 6],
        ['species', 7]
      ])
      if (e) {
        this.categoryValue.push([type, e])
        if (this.categoryValue.length > (map.get(type) - 1)) {
          this.categoryValue.splice(map.get(type) - 2, 1)
        }
      }
      if (map.get(type) !== 7 && e) {
        this.getCategory(type, e)
        this.catgroyNumbers = map.get(type)
      } else if (map.get(type) === 7) {
        let obj = {}
        obj['kingdom'] = '植物界'
        obj['pagenum'] = 1
        obj['pagesize'] = 3
        this.categoryValue.forEach(item => {
          obj[item[0]] = item[1]
        })
        this.setCategory(obj)
      }
    },
    removeSelectItem (id) {
      // 删除要传输的数组的值
      this.categoryValue.splice(id - 1, this.categoryValue.length - id + 1)
      // 移除 对应的 select
      this.catgroyNumbers = id--
    }
  }
}
</script>

<style lang="stylus" scoped>
  .basil
    background-color transparent!important
    box-shadow none !important
    .basil--text
      color #fff !important
    #tabItem
      background transparent
      #tabContainer
        padding-top 0
        .selectCol
          padding-top 0
          padding-right 0
          padding-left 0
</style>
