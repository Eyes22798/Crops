<template>
  <div>
    <v-container fluid class="mt-n12">
      <v-row>
        <v-col cols="4">
          <v-card width="100%" height="500" elevation="8">
            <v-navigation-drawer permanent width="100%">
              <v-list>
                <v-list-item>
                  <v-list-item-avatar size="70">
                    <img :src="formData.photo" />
                  </v-list-item-avatar>
                </v-list-item>

                <v-list-item link>
                  <v-list-item-content>
                    <v-list-item-title class="title">{{ formData.name }}</v-list-item-title>
                    <v-list-item-subtitle>{{ formData.email }}</v-list-item-subtitle>
                  </v-list-item-content>

                  <v-list-item-action>
                    <v-icon>mdi-menu-down</v-icon>
                  </v-list-item-action>
                </v-list-item>
              </v-list>
              <v-divider></v-divider>
              <v-list nav dense>
                <v-list-item-group color="primary">
                  <v-list-item v-for="(item, i) in items" :key="i" @click="toggleTab(item.text)">
                    <v-list-item-icon>
                      <v-icon v-text="item.icon"></v-icon>
                    </v-list-item-icon>

                    <v-list-item-content>
                      <v-list-item-title v-text="item.text"></v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                </v-list-item-group>
              </v-list>
            </v-navigation-drawer>
          </v-card>
        </v-col>
        <v-col cols="8">
          <v-expand-transition>
            <v-card
              v-if="tabSlideItem === '我的问题咨询'"
              width="100%"
              elevation="8"
              transition="scroll-y-transition"
            >
              <v-row>
                <v-col cols="6" md="6" sm="12" v-for="item in pageInfoList" :key="item.questID">
                  <v-card class="mx-2" min-height="600" elevation="12">
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

                    <v-card-actions id="create">
                      <v-dialog v-model="dialog" width="500">
                        <template v-slot:activator="{ on }">
                          <v-speed-dial
                            :fab="fab"
                            direction="top"
                            bottom
                            right
                            transition="slide-y-reverse-transition"
                          >
                            <template v-slot:activator>
                              <v-btn v-model="fab" color="blue darken-2" dark fab>
                                <v-icon v-if="fab">mdi-close</v-icon>
                                <v-icon v-else>camera</v-icon>
                              </v-btn>
                            </template>
                            <v-btn
                              fab
                              dark
                              small
                              color="green"
                              @click="updateQuestion(item)"
                              v-on="on"
                            >
                              <v-icon>mdi-pencil</v-icon>
                            </v-btn>
                            <v-btn fab dark small color="indigo" @click="addQuestion">
                              <v-icon>mdi-plus</v-icon>
                            </v-btn>
                            <v-btn fab dark small color="red" @click="deleteQuestion(item)">
                              <v-icon>mdi-delete</v-icon>
                            </v-btn>
                          </v-speed-dial>
                          <v-dialog v-model="dialogPlus" persistent max-width="600px">
                            <v-card>
                              <v-card-title>
                                <v-icon color="info">post_add</v-icon>&nbsp;
                                <span class="headline">咨询问题</span>
                              </v-card-title>
                              <v-card-text>
                                <small class="font-weight-bold">*咨询新的问题</small>
                                <v-container>
                                  <v-row>
                                    <v-col cols="12" sm="6" md="6">
                                      <v-text-field
                                        label="咨询标题*"
                                        required
                                        prepend-icon="format_list_bulleted"
                                        v-model.trim="newQuestionData.title"
                                      ></v-text-field>
                                    </v-col>
                                    <v-col cols="12" sm="6" md="6">
                                      <v-text-field
                                        label="咨询领域*"
                                        required
                                        prepend-icon="border_all"
                                        v-model.trim="newQuestionData.domain"
                                      ></v-text-field>
                                    </v-col>
                                    <v-col cols="12" md="12">
                                      <v-file-input
                                        label="上传图片*"
                                        hint="您可以上传多张图片"
                                        small-chips
                                        multiple
                                        prepend-icon="insert_photo"
                                        v-model="newQuestionData.imageFile"
                                      ></v-file-input>
                                    </v-col>
                                    <v-col cols="12" md="12">
                                      <v-textarea
                                        prepend-icon="text_fields"
                                        name="input-7-1"
                                        label="咨询内容*"
                                        hint="在这里填写您想要咨询的问题"
                                        persistent-hint
                                        outlined
                                        v-model.trim="newQuestionData.content"
                                      ></v-textarea>
                                    </v-col>
                                  </v-row>
                                  <div>
                                    <v-row style="justify-content: space-around">
                                      <v-btn
                                        color="defalut"
                                        width="45%"
                                        @click="dialogPlus = false"
                                        class="font-weight-bold"
                                      >取消</v-btn>
                                      <v-btn
                                        color="info"
                                        width="45%"
                                        @click="addQuestionAPI()"
                                        class="font-weight-bold"
                                      >提交</v-btn>
                                    </v-row>
                                  </div>
                                </v-container>
                              </v-card-text>
                            </v-card>
                          </v-dialog>
                        </template>

                        <v-card>
                          <v-card-title>
                            <v-icon color="info">edit</v-icon>&nbsp;
                            <span class="headline">我的咨询</span>
                          </v-card-title>
                          <v-card-text>
                            <small class="font-weight-bold">*修改咨询文本内容</small>
                            <v-container>
                              <v-row>
                                <v-col cols="12" sm="12" md="12">
                                  <v-text-field label="咨询标题*" v-model.trim="questionTitle" required></v-text-field>
                                </v-col>
                                <v-col cols="12" md="12">
                                  <v-textarea
                                    name="input-7-1"
                                    label="咨询内容*"
                                    hint="在这里修改您想要咨询的问题"
                                    v-model.trim="questionContent"
                                    persistent-hint
                                  ></v-textarea>
                                </v-col>
                              </v-row>
                              <div class="text-center">
                                <v-btn
                                  color="info"
                                  width="100%"
                                  @click="updateQuestionAPI()"
                                  class="font-weight-bold"
                                >更新</v-btn>
                              </div>
                            </v-container>
                          </v-card-text>
                          <v-card-title>
                            <v-icon color="info">image</v-icon>&nbsp;
                            <span class="headline">我的图片</span>
                          </v-card-title>
                          <v-card-text>
                            <small class="font-weight-bold">*上传新的图片</small>
                            <v-file-input label="File input" v-model="newFileImage"></v-file-input>
                            <small class="font-weight-bold">*删除我上传的图片</small>
                            <v-item-group active-class="primary">
                              <v-container>
                                <v-row>
                                  <v-col
                                    v-for="(value, key) in carouselImages"
                                    :key="key"
                                    cols="12"
                                    md="6"
                                  >
                                    <v-item v-slot:default="{ active, toggle }">
                                      <v-card
                                        class="d-flex align-center"
                                        height="200"
                                        :img="value"
                                        @click="toggle"
                                      >
                                        <v-scroll-y-transition>
                                          <v-card width="100%" height="200" v-if="active" dark>
                                            <v-card-text class="title text-center">点击按钮删除</v-card-text>
                                            <v-card-actions class="justify-center">
                                              <v-btn
                                                large
                                                class="error"
                                                x-large
                                                fab
                                                @click="deleteImage(key)"
                                              >
                                                <v-icon>close</v-icon>
                                              </v-btn>
                                            </v-card-actions>
                                          </v-card>
                                        </v-scroll-y-transition>
                                      </v-card>
                                    </v-item>
                                  </v-col>
                                </v-row>
                              </v-container>
                            </v-item-group>
                          </v-card-text>
                          <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn color="blue darken-1" text @click="dialog = false">关闭</v-btn>
                          </v-card-actions>
                        </v-card>
                      </v-dialog>
                    </v-card-actions>
                  </v-card>
                </v-col>
              </v-row>
              <div class="text-center pb-2">
                <v-pagination v-model="page" :length="totalPage" :total-visible="7"></v-pagination>
              </div>
            </v-card>
          </v-expand-transition>
          <v-expand-transition>
            <v-card
              v-if="tabSlideItem === '我的已答咨询'"
              width="100%"
              min-height="500"
              elevation="8"
              transition="scroll-y-transition"
            >asdasdasdad</v-card>
          </v-expand-transition>
          <v-expand-transition>
            <v-card
              v-if="tabSlideItem === '胁迫情报上传'"
              width="100%"
              min-height="500"
              elevation="8"
              transition="scroll-y-transition"
              class="px-6 pt-2 py-sm-2"
            >
              <v-row>
                <v-col cols="6" md="6" sm="12">
                  <v-text-field label="标题*" required prepend-icon="bookmark" outlined color="info accent-4" v-model.trim="duressFormData.title"></v-text-field>
                </v-col>
                <v-col cols="6" md="6" sm="12">
                  <v-text-field label="地点*" required prepend-icon="room" outlined color="info accent-4" v-model.trim="duressFormData.location"></v-text-field>
                </v-col>
              </v-row>
              <v-file-input
                color="info accent-4"
                counter
                label="图片"
                multiple
                placeholder="上传图片"
                prepend-icon="mdi-image"
                outlined
                :show-size="1000"
                v-model="duressFormData.imageFile"
              >
                <template v-slot:selection="{ index, text }">
                  <v-chip v-if="index < 2" color="info accent-4" dark label small>{{ text }}</v-chip>

                  <span
                    v-else-if="index === 2"
                    class="overline grey--text text--darken-3 mx-2"
                  >+{{ files.length - 2 }} 个文件</span>
                </template>
              </v-file-input>
              <v-file-input
                v-model="duressFormData.videoFiles"
                color="info accent-4"
                counter
                label="视频"
                multiple
                placeholder="上传视频"
                prepend-icon="mdi-video"
                outlined
              >
                <template v-slot:selection="{ index, text }">
                  <v-chip v-if="index < 2" color="info accent-4" dark label small>{{ text }}</v-chip>

                  <span
                    v-else-if="index === 2"
                    class="overline grey--text text--darken-3 mx-2"
                  >+{{ files.length - 2 }} 个文件</span>
                </template>
              </v-file-input>
              <v-textarea label="内容*" required prepend-icon="chrome_reader_mode" outlined color="info accent-4" v-model="duressFormData.content"></v-textarea>
              <v-card-actions class="justify-center">
                <v-btn large color="info accent-4" class="title mt-n2" width="30%" @click="uploadDuress" :loading="submitLoadingBtn">提交</v-btn>
              </v-card-actions>
            </v-card>
          </v-expand-transition>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  name: 'Main',
  data: () => ({
    items: [
      { text: '我的问题咨询', icon: 'mdi-folder' },
      { text: '我的已答咨询', icon: 'mdi-account-multiple' },
      { text: '我上传的胁迫', icon: 'mdi-upload' },
      { text: '胁迫情报上传', icon: 'mdi-cloud-upload' },
      { text: '我的最近上传', icon: 'mdi-history' },
      { text: 'Starred', icon: 'mdi-star' },
      { text: 'Offline', icon: 'mdi-check-circle' }
    ],
    formData: {
      userid: null,
      password: null,
      role: 1,
      name: null,
      nickname: null,
      phone: null,
      email: null,
      address: null,
      postcode: null,
      photo: null,
      introduction: null,
      state: null,
      provinceName: null,
      cityName: null,
      addressName: null
    },
    newQuestionData: {
      title: '',
      domain: '',
      imageFile: [],
      content: ''
    },
    duressFormData: {
      title: '',
      location: '',
      content: '',
      imageFile: [],
      videoFile: []
    },
    files: [],
    videoFiles: [],
    newFileImage: null,
    tabSlideItem: '我的问题咨询',
    page: 1,
    pageSize: 2,
    totalPage: null,
    questionID: '',
    questionTitle: '',
    questionContent: '',
    questionImageID: '',
    pageInfoList: {},
    carouselImages: [],
    dialog: false,
    dialogPlus: false,
    fab: false,
    submitLoadingBtn: false
  }),
  mounted () {
    this.getSessionData()
    this.getOrdinarySelect(this.page, this.pageSize)
  },
  watch: {
    page () {
      this.getOrdinarySelect(this.page, this.pageSize)
    },
    newFileImage () {
      // 选择图片后自动上传
      let formData = new FormData()
      formData.append('questID', this.questionID)
      formData.append('matchID', this.questionImageID)
      formData.append('file', this.newFileImage)
      this.$api.ordinary.updateQuestionAddImg(formData)
        .then(res => {
          if (res.code === 200) {
            setTimeout(() => {
              this.$toast('上传新的图片成功!', {
                x: 'right',
                y: 'top',
                icon: 'info',
                dismissable: false,
                showClose: true
              })
            }, 500)
          }
        })
    }
  },
  methods: {
    getSessionData () {
      this.$api.common
        .getSessionData()
        .then(res => {
          if (res.code === 200) {
            const obj = Object.assign(
              {},
              { ...res.data }
            )
            this.formData = obj
          }
        })
    },
    getOrdinarySelect (page, pageSize) {
      this.$api.ordinary.getOrdinarySelect(
        page,
        pageSize
      ).then(res => {
        this.pageInfoList = res.pageInfo.list
        this.totalPage = parseInt(res.pageInfo.total / this.pageSize)
      })
    },
    toggleTab (item) {
      this.tabSlideItem = item
      const funObj = {
        '我的问题咨询': () => {
          this.getOrdinarySelect(this.page, this.pageSize)
        },
        '胁迫情报上传': () => {
          console.log('我是胁迫情报上传')
        },
        '我的已答咨询': () => {
          console.log('我是我的已答咨询')
        }
      }
      funObj[this.tabSlideItem]()
    },
    updateQuestion (item) {
      this.questionID = item.questID
      this.questionTitle = item.title
      this.questionContent = item.content
      this.carouselImages = item.map
      this.questionImageID = item.image
    },
    updateQuestionAPI () {
      this.$api.ordinary.updateQuestionText({
        questID: this.questionID,
        title: this.questionTitle,
        content: this.questionContent
      })
        .then(res => {
          if (res.code === 200) {
            setTimeout(() => {
              this.$toast('修改成功!', {
                x: 'right',
                y: 'top',
                icon: 'info',
                dismissable: false,
                showClose: true
              })
            }, 500)
          }
        })
        .then(res => {
          setTimeout(() => {
            this.dialog = false
            this.getOrdinarySelect(this.page, this.pageSize)
          }, 1000)
        })
    },
    addQuestion () {
      this.dialogPlus = true
    },
    addQuestionAPI () {
      let formData = new FormData()
      formData.append('title', this.newQuestionData.title)
      formData.append('domain', this.newQuestionData.domain)
      formData.append('content', this.newQuestionData.content)
      formData.append('file1', this.newQuestionData.imageFile)
      console.log(this.newQuestionData.imageFile)
      this.$api.ordinary.addQuestion(formData)
        .then(res => {
          if (res.code === 200) {
            setTimeout(() => {
              this.$toast('添加咨询成功!', {
                x: 'right',
                y: 'top',
                icon: 'info',
                dismissable: false,
                showClose: true
              })
            }, 500)
          }
        })
        .then(res => {
          setTimeout(() => {
            this.dialogPlus = false
          }, 1000)
        })
    },
    deleteImage (imageID) {
      this.$api.ordinary.updateQuestionDelImg(this.questionID, imageID)
        .then(res => {
          if (res.code === 200) {
            setTimeout(() => {
              this.$toast('删除成功!', {
                x: 'right',
                y: 'top',
                icon: 'info',
                dismissable: false,
                showClose: true
              })
            }, 500)
            this.getOrdinarySelect(this.page, this.pageSize)
          }
        })
        .then(res => {
          setTimeout(() => {
            this.dialog = false
          }, 1000)
        })
    },
    deleteQuestion (item) {
      this.$api.ordinary.deleteQuestion(
        item.questID
      )
        .then(res => {
          if (res.code === 200) {
            setTimeout(() => {
              this.$toast('删除成功!', {
                x: 'right',
                y: 'top',
                icon: 'info',
                dismissable: false,
                showClose: true
              })
            }, 500)
            this.getOrdinarySelect(this.page, this.pageSize)
          }
        })
    },
    uploadDuress () {
      // 暂时不做
      this.$api.ordinary.uploadDuress()
        .then(res => {
          console.log(res)
        })
    }
  }
}
</script>

<style>
  /* This is for documentation purposes and will not be needed in your application */
  #create .v-speed-dial {
    position: absolute;
  }

  #create .v-btn--floating {
    position: relative;
  }
</style>
