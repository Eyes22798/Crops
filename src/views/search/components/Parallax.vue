<template>
  <div>
    <v-parallax :src="img" :height="height">
      <v-spacer></v-spacer>
      <v-layout class="mt-12 mx-10">
        <v-flex>
          <v-row>
            <v-card class="basil">
              <v-card-title class="text-center justify-center py-6">
                <h1 class="font-weight-bold display-3 basil--text">自由开放地获取生物多样性数据</h1>
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
                        placeholder="按名称搜索"
                        v-model="search"
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
                    <v-row>
                      <v-col
                        class="selectCol"
                        v-for="catgroyNumber in catgroyNumbers"
                        :key="catgroyNumber"
                      >
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
                        ></v-select>
                      </v-col>
                    </v-row>
                  </v-container>
                </v-tab-item>

                <v-tab-item>
                  <input
                    type="file"
                    id="upload"
                    ref="upload"
                    @change="getImageData"
                    accept=".jpg, .jpeg, .png"
                  />
                  <v-btn large @click="selecAvatarImg" :width="btnWidth ? '80%' : '100%'">
                    <v-icon>{{ uploadBtnIcon }}</v-icon>
                    {{ uploadBtnText }}
                  </v-btn>
                  <v-btn
                    v-if="btnWidth"
                    width="20%"
                    large
                    color="info"
                    class="white--text"
                    :loading="btnLoading"
                    @click="uploadImg"
                  >
                    上传&nbsp;
                    <v-icon dark>mdi-cloud-upload</v-icon>
                  </v-btn>
                  <v-dialog v-model="dialog" hide-overlay persistent width="300">
                    <v-card color="primary" dark>
                      <v-card-text>
                        精准识别中，请稍等
                        <v-progress-linear indeterminate color="white" class="mb-0"></v-progress-linear>
                      </v-card-text>
                    </v-card>
                  </v-dialog>
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
  props: {
    firstCategory: {
      type: Array
    },
    img: {
      type: String,
      default: require('@/assets/images/header2.jpg')
    }
  },
  data: () => ({
    height: 400,
    search: null,
    tab: null,
    cols: 12,
    items: [
      '名称搜索',
      '联动搜索',
      '图像识别'
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
    categoryValue: [],
    uploadBtnText: '选择图片',
    uploadBtnIcon: 'unarchive',
    btnWidth: false,
    imageFile: null,
    btnLoading: false,
    dialog: false,
    imageName: ''
  }),
  watch: {
    tab () {
      if (this.tab === 1) {
        this.getCategory(this.firstCategory[0], this.firstCategory[1])
      }
    },
    dialog (val) {
      if (!val) return
      setTimeout(() => (this.dialog = false), 4000)
    }
  },
  methods: {
    ...mapMutations({
      setPageName: types.SET_PAGENAME,
      setCategory: types.SET_CATEGORY,
      setImageName: types.SET_IMAGENAME
    }),
    getSearchData () {
      if (this.search) {
        this.search = this.search.trim()
        this.setPageName(this.search)
        this.search = null
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
        obj[this.firstCategory[0]] = this.firstCategory[1]
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
    },
    getImageData (e) {
      this.btnWidth = this.$refs.upload ? true : false
      if (this.$refs.upload.value) {
        this.uploadBtnText = this.$refs.upload.value
        this.uploadBtnIcon = 'insert_drive_file'
        this.imageFile = e.target.files[0]
      }
      // 避免选择同一张图片 change 事件只触发一次
      this.$refs.upload.value = null
    },
    selecAvatarImg () {
      let uploadbtn = this.$refs.upload
      uploadbtn.click()
    },
    uploadImg () {
      if (!this.imageFile) {
        return
      }
      let formData = new FormData()
      formData.append('photo', this.imageFile)
      this.btnLoading = true
      this.dialog = true
      this.$api.common
        .getImageName(formData)
        .then(res => {
          if (res.code === 200) {
            this.imageName = res.data
            setTimeout(() => {
              this.btnLoading = false
              this.dialog = false
            }, 2000)
          }
        })
        .then(res => {
          setTimeout(() => {
            this.$toast(`识别成功！ ${this.imageName} 已检索成功`, {
              x: 'right',
              y: 'top',
              icon: 'info',
              dismissable: false,
              showClose: true
            })
            this.setImageName(this.imageName)
          }, 2500)
        })
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
      #upload
        height: 0
        width: 0
        visibility: hidden
</style>
