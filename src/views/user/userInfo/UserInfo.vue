<template>
  <v-app id="userInfo">
    <Header />
    <v-parallax :src="require('@/assets/images/header.jpg')" :height="height"></v-parallax>
    <v-container fluid>
      <v-layout>
        <v-row>
          <v-col cols="12" md="4">
            <v-card :elevation="6">
              <v-item-group v-model="window" class="shrink" mandatory tag="v-flex">
                <v-item
                  v-for="item in slideData"
                  :key="item.id"
                  v-slot:default="{ active, toggle }"
                >
                  <div>
                    <v-btn :input-value="active" @click="toggle" block text x-large>
                      <v-icon color="success">{{ item.icon }}</v-icon>
                      <div class="ml-4">{{ item.text }}</div>
                    </v-btn>
                  </div>
                </v-item>
              </v-item-group>
            </v-card>
          </v-col>

          <v-col cols="12" md="8">
            <v-hover>
              <template v-slot="{ hover }">
                <v-card :class="`elevation-${hover ? 24 : 6}`">
                  <v-window v-model="window" class="elevation-1" vertical>
                    <v-window-item>
                      <v-container fill-height fluid>
                        <v-row justify="center">
                          <v-col cols="12" md="8">
                            <material-card color="green" title="Edit Profile" text="编辑你的个人主页">
                              <v-form>
                                <v-container class="py-0">
                                  <v-row>
                                    <v-col cols="12" md="6">
                                      <v-text-field
                                        class="purple-input"
                                        label="姓名"
                                        :value="formData.name"
                                      />
                                    </v-col>
                                    <v-col cols="12" md="6">
                                      <v-text-field
                                        label="用户名"
                                        class="purple-input"
                                        :value="formData.nickname"
                                      />
                                    </v-col>
                                    <v-col cols="12" md="12">
                                      <v-text-field
                                        label="邮箱"
                                        class="purple-input"
                                        :value="formData.email"
                                      />
                                    </v-col>
                                    <v-col cols="12" md="12">
                                      <v-text-field
                                        class="purple-input"
                                        label="邮政编码"
                                        type="number"
                                        :value="formData.postcode"
                                      />
                                    </v-col>
                                    <v-col cols="12">
                                      <v-textarea
                                        class="purple-input"
                                        label="个人介绍"
                                        :value="formData.introduction"
                                      />
                                    </v-col>
                                    <v-col cols="12" class="text-right">
                                      <v-btn
                                        color="success"
                                        :loading="infoLoading"
                                        @click="updateInfo"
                                      >Update Profile</v-btn>
                                    </v-col>
                                  </v-row>
                                </v-container>
                              </v-form>
                            </material-card>
                          </v-col>
                          <v-col cols="12" md="4" class="mt-12">
                            <material-card class="v-card-profile">
                              <v-tooltip top>
                                <template v-slot:activator="{ on }">
                                  <v-avatar
                                    slot="offset"
                                    class="mx-auto d-block elevation-6 avatar"
                                    size="130"
                                    @click="updateAvatar"
                                    v-on="on"
                                  >
                                    <img
                                      src="https://demos.creative-tim.com/vue-material-dashboard/img/marc.aba54d65.jpg"
                                    />
                                  </v-avatar>
                                </template>
                                <span>点击更换头像</span>
                              </v-tooltip>
                              <v-card-text class="text-center">
                                <h6
                                  class="overline mb-3"
                                >{{ formData.state === 2 ? "专家" : "用户" }} / {{ formData.name }}</h6>

                                <h4 class="font-weight-light">{{ formData.nickname }}</h4>

                                <p
                                  class="font-weight-light"
                                >&nbsp;&nbsp;&nbsp;&nbsp;{{ formData.introduction }}</p>
                                <input type="file" id="upload" ref="upload" @change="updateAvatarData" accept=".jpg, .jpeg, .png">
                                <v-btn
                                  color="success"
                                  v-if="avatar"
                                  rounded
                                  :loading="loadingBtn"
                                  @click="selecAvatarImg"
                                >
                                  {{ uploadBtnText }}
                                </v-btn>
                              </v-card-text>
                            </material-card>
                          </v-col>
                        </v-row>
                      </v-container>
                    </v-window-item>
                    <v-window-item>
                      <v-container fill-height fluid>
                        <v-row justify="center">
                          <v-col cols="12" md="12">
                            <material-card color="blue" title="Edit Profile" text="更改你的账号信息">
                              <v-container class="py-0">
                                <v-col cols="12" md="12" sm="12">
                                  <v-card class="mx-auto">
                                    <v-expansion-panels>
                                      <v-expansion-panel>
                                        <v-expansion-panel-header v-slot="{ open }">
                                          <v-row no-gutters>
                                            <v-col cols="4">
                                              <v-icon color="info">https</v-icon>我的手机号
                                            </v-col>
                                            <v-col cols="8" class="text--secondary">
                                              <v-fade-transition leave-absolute>
                                                <span v-if="open" key="0">修改我的手机号</span>
                                              </v-fade-transition>
                                            </v-col>
                                          </v-row>
                                        </v-expansion-panel-header>
                                        <v-expansion-panel-content>
                                          <v-row no-gutters>
                                            <v-spacer></v-spacer>
                                            <v-col cols="5">
                                              <v-row>
                                                <v-col cols="8" md="8" sm="12">
                                                  <v-text-field
                                                    label="手机号"
                                                    type="text"
                                                    clearable
                                                    v-model="formData.phone"
                                                    counter="11"
                                                    maxlength="11"
                                                    required
                                                  ></v-text-field>
                                                </v-col>
                                                <v-col cols="4" md="4" sm="12">
                                                  <v-btn
                                                    color="info"
                                                    class="mt-4"
                                                    :loading="loadingBtn"
                                                    @click.stop="verifyNewPhone(formData.phone)"
                                                  >验证</v-btn>
                                                  <v-dialog
                                                    persistent
                                                    v-model="dialog3"
                                                    max-width="500"
                                                  >
                                                    <v-card>
                                                      <v-card-title class="headline">
                                                        <v-icon color="success darken-1">info</v-icon>&nbsp;&nbsp;请输入您的短信验证码
                                                      </v-card-title>
                                                      <v-card-text>
                                                        <v-row>
                                                          <v-text-field
                                                            label="验证码"
                                                            type="text"
                                                            clearable
                                                            counter="4"
                                                            maxlength="4"
                                                            required
                                                            class="mx-3"
                                                            v-model="newFormData.code"
                                                          ></v-text-field>
                                                        </v-row>
                                                      </v-card-text>
                                                      <v-card-actions>
                                                        <v-spacer></v-spacer>
                                                        <v-btn
                                                          color="green darken-1"
                                                          text
                                                          @click="dialog3 = false"
                                                        >取消</v-btn>
                                                        <v-btn
                                                          :disabled="dialog2"
                                                          :loading="dialog2"
                                                          color="green darken-1"
                                                          text
                                                          @click="dialog4 = true"
                                                        >验证</v-btn>
                                                      </v-card-actions>
                                                    </v-card>
                                                  </v-dialog>
                                                  <v-dialog
                                                    v-model="dialog4"
                                                    hide-overlay
                                                    persistent
                                                    width="300"
                                                  >
                                                    <v-card color="primary" dark>
                                                      <v-card-text>
                                                        验证中
                                                        <v-progress-linear
                                                          indeterminate
                                                          color="white"
                                                          class="mb-0"
                                                        ></v-progress-linear>
                                                      </v-card-text>
                                                    </v-card>
                                                  </v-dialog>
                                                </v-col>
                                              </v-row>
                                            </v-col>

                                            <v-divider vertical class="mx-4"></v-divider>

                                            <v-col cols="3">
                                              <v-card-actions class="mt-6">
                                                <v-btn
                                                 text
                                                 color="primary"
                                                 class="ml-4"
                                                 @click="updatePhone"
                                                >修改</v-btn>
                                              </v-card-actions>
                                            </v-col>
                                          </v-row>
                                        </v-expansion-panel-content>
                                      </v-expansion-panel>

                                      <v-expansion-panel>
                                        <v-expansion-panel-header v-slot="{ open }">
                                          <v-row no-gutters>
                                            <v-col cols="4">
                                              <v-icon color="info">https</v-icon>我的密码
                                            </v-col>
                                            <v-col cols="8" class="text--secondary">
                                              <v-fade-transition leave-absolute>
                                                <span v-if="open" key="0">修改我的密码</span>
                                              </v-fade-transition>
                                            </v-col>
                                          </v-row>
                                        </v-expansion-panel-header>
                                        <v-expansion-panel-content>
                                          <v-row no-gutters>
                                            <v-spacer></v-spacer>
                                            <v-col cols="5">
                                              <v-text-field
                                                v-model="formData.password"
                                                :append-icon="show ? 'visibility' : 'visibility_off'"
                                                placeholder="密码"
                                                :type="show ? 'text' : 'password'"
                                                counter="10"
                                                maxlength="10"
                                                required
                                                @click:append="show = !show"
                                              ></v-text-field>
                                            </v-col>

                                            <v-divider vertical class="mx-4"></v-divider>

                                            <v-col cols="3">
                                              <v-card-actions>
                                                <v-btn
                                                  color="primary"
                                                  dark
                                                  text
                                                  class="ml-4"
                                                  @click.stop="dialog = true"
                                                >修改</v-btn>

                                                <v-dialog v-model="dialog" max-width="500">
                                                  <v-card>
                                                    <v-card-title class="headline">
                                                      <v-icon color="success darken-1">info</v-icon>&nbsp;&nbsp;请先验证您的电话号码
                                                    </v-card-title>
                                                    <v-card-text>
                                                      <v-row>
                                                        <v-text-field
                                                          label="手机号"
                                                          prepend-icon="phone"
                                                          type="text"
                                                          clearable
                                                          counter="11"
                                                          maxlength="11"
                                                          required
                                                          class="mx-3"
                                                          v-model="newFormData.phone"
                                                        ></v-text-field>
                                                      </v-row>
                                                    </v-card-text>
                                                    <v-card-actions>
                                                      <v-spacer></v-spacer>
                                                      <v-btn
                                                        color="green darken-1"
                                                        text
                                                        @click="dialog = false"
                                                      >取消</v-btn>
                                                      <v-btn
                                                        :disabled="dialog2"
                                                        :loading="dialog2"
                                                        color="green darken-1"
                                                        text
                                                        @click="dialog2 = true"
                                                      >验证</v-btn>
                                                    </v-card-actions>
                                                  </v-card>
                                                </v-dialog>

                                                <v-dialog
                                                  v-model="dialog2"
                                                  hide-overlay
                                                  persistent
                                                  width="300"
                                                >
                                                  <v-card color="primary" dark>
                                                    <v-card-text>
                                                      验证中
                                                      <v-progress-linear
                                                        indeterminate
                                                        color="white"
                                                        class="mb-0"
                                                      ></v-progress-linear>
                                                    </v-card-text>
                                                  </v-card>
                                                </v-dialog>
                                              </v-card-actions>
                                            </v-col>
                                          </v-row>
                                        </v-expansion-panel-content>
                                      </v-expansion-panel>
                                    </v-expansion-panels>
                                  </v-card>
                                </v-col>
                              </v-container>
                            </material-card>
                          </v-col>
                        </v-row>
                      </v-container>
                    </v-window-item>
                  </v-window>
                </v-card>
              </template>
            </v-hover>
          </v-col>
        </v-row>
      </v-layout>
    </v-container>
    <Footer />
  </v-app>
</template>

<script>
import Header from '@/components/content/Header.vue'
import Footer from '@/components/content/Footer.vue'
import MaterialCard from '@/components/common/MaterialCard.vue'
import { mapGetters } from 'vuex'

export default {
  name: 'UserInfo',
  data () {
    return {
      height: 150,
      length: 8,
      window: 0,
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
      newFormData: {
        phone: null,
        code: null,
        phoneVerify: false
      },
      avatarImg: null,
      slideData: [
        {
          id: 0,
          text: '个人档案',
          icon: 'home_work'
        },
        {
          id: 1,
          text: '账号设置',
          icon: 'assignment_late'
        }
      ],
      loadingText: '验证码',
      color: 'success',
      avatar: false,
      infoLoading: false,
      loadingBtn: false,
      dialog: false,
      dialog2: false,
      dialog3: false,
      dialog4: false,
      show: false,
      uploadBtnText: '上传图片'
    }
  },
  watch: {
    dialog2 (val) {
      if (!val) return
      setTimeout(() => {
        this.verifyPhone(this.newFormData.phone)
        this.dialog2 = false
      }, 2000)
    },
    dialog4 (val) {
      if (!val) return
      setTimeout(() => {
        this.verificationPhone(this.newFormData.code)
        this.dialog4 = false
      }, 2000)
    }
  },
  computed: {
    ...mapGetters([
      'userData'
    ])
  },
  mounted () {
    this.getSessionData()
  },
  components: {
    Header,
    Footer,
    MaterialCard
  },
  methods: {
    updateAvatarData (e) {
      this.avatarImg = e.target.files[0]
      this.uploadBtnText = this.avatarImg.name
      // 避免选择同一张图片 change 事件只触发一次
      this.$refs.upload.value = null
    },
    uploadImg () {
      if (!this.avatarImg) {
        return
      }
      let formData = new FormData()
      formData.append('userid', this.formData.userid)
      formData.append('photo', this.avatarImg)
      this.loadingBtn = true
      this.$api.common
        .updateAvatar(formData)
        .then(res => {
          if (res.code === 200) {
            setTimeout(() => {
              this.$toast('头像修改成功!', {
                x: 'right',
                y: 'top',
                icon: 'info',
                dismissable: false,
                showClose: true
              })
              this.loadingBtn = false
            }, 500)
          }
        })
        .then(res => {
          setTimeout(() => {
            this.loadingBtn = false
          }, 500)
          this.getSessionData()
        })
    },
    getSessionData () {
      this.$api.common
        .getSessionData()
        .then(res => {
          if (res.code === 200) {
            const obj = Object.assign(
              {},
              { ...res.data },
              {
                provinceName: this.userData.provinceName
              },
              {
                cityName: this.userData.cityName
              },
              {
                addressName: this.userData.addressName
              }
            )
            this.formData = obj
          }
        })
    },
    updateInfo () {
      this.infoLoading = true
      this.$api.common
        .updateInfo({
          userID: this.formData.userid,
          name: this.formData.name,
          nickname: this.formData.nickname,
          email: this.formData.email,
          postcode: this.formData.postcode,
          introduction: this.formData.introduction
        })
        .then(res => {
          if (res.code === 200) {
            this.$toast('个人信息修改成功!', {
              x: 'right',
              y: 'top',
              icon: 'info',
              dismissable: false,
              showClose: true
            })
          }
        })
        .then(res => {
          setTimeout(() => {
            this.infoLoading = false
          }, 500)
          this.getSessionData()
        })
    },
    updateAvatar () {
      this.avatar = !this.avatar
    },
    selecAvatarImg () {
      if (this.avatarImg) {
        this.uploadImg()
        this.uploadBtnText = '上传图片'
        this.avatarImg = null
        return
      }
      let uploadbtn = this.$refs.upload
      uploadbtn.click()
    },
    verifyPhone (phone) {
      this.$api.common
        .phoneSendCode(phone)
        .then(res => {
          if (res.code === 200) {
            this.$toast('修改密码成功!', {
              x: 'right',
              y: 'top',
              icon: 'info',
              dismissable: false,
              showClose: true
            })
            this.dialog = false
          }
        })
        .then(res => {
          this.updatePassword()
        })
    },
    updatePassword () {
      this.$api.common
        .updatePassword({
          userid: this.formData.userid,
          password: this.formData.password
        })
        .then(res => {
          this.getSessionData()
        })
    },
    verifyNewPhone (phone) {
      this.loadingBtn = true
      this.$api.common
        .newPhoneSendCode({
          phone
        })
        .then(res => {
          if (res.code === 200) {
            setTimeout(() => {
              this.loadingBtn = false
              this.dialog3 = true
            }, 1000)
          }
          setTimeout(() => {
            this.loadingBtn = false
          }, 1000)
        })
    },
    verificationPhone (code) {
      this.$api.common
        .verificationPhone({
          code
        })
        .then(res => {
          if (res.code === 200) {
            this.newFormData.phoneVerify = true
            this.dialog3 = false
          }
        })
    },
    updatePhone () {
      if (!this.newFormData.phoneVerify) {
        this.$toast('请验证手机号!', {
          x: 'right',
          y: 'top',
          icon: 'info',
          color: 'error',
          dismissable: false,
          showClose: true
        })
        return
      }
      this.$api.common
        .updatePhone({
          userid: this.formData.userid,
          phone: this.newFormData.phone
        })
        .then(res => {
          if (res.code === 200) {
            this.$toast('更新手机号成功!', {
              x: 'right',
              y: 'top',
              icon: 'info',
              dismissable: false,
              showClose: true
            })
            this.getSessionData()
            this.newFormData.phoneVerify = false
          }
        })
    }
  }
}
</script>

<style lang="stylus" scoped>
  #userInfo
    height 1000px
    .avatar
      cursor pointer
    #upload
      height: 0
      width: 0
      visibility: hidden
</style>
