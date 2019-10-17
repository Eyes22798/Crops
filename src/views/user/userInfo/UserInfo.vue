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
                                    <v-col cols="12" md="6">
                                      <v-text-field
                                       label="邮箱"
                                       class="purple-input"
                                       :value="formData.email"
                                      />
                                    </v-col>
                                    <v-col cols="12" md="6">
                                      <v-text-field
                                        class="purple-input"
                                        label="邮政编码"
                                        type="number"
                                        :value="formData.postcode"
                                      />
                                    </v-col>
                                    <v-col cols="12" md="12">
                                      <Distpicker
                                       :row="1"
                                      />
                                    </v-col>
                                    <v-col cols="12">
                                      <v-textarea
                                        class="purple-input"
                                        label="个人介绍"
                                        value="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
                                      />
                                    </v-col>
                                    <v-col cols="12" class="text-right">
                                      <v-btn color="success">Update Profile</v-btn>
                                    </v-col>
                                  </v-row>
                                </v-container>
                              </v-form>
                            </material-card>
                          </v-col>
                          <v-col cols="12" md="4">
                            <material-card class="v-card-profile">
                              <v-avatar
                                slot="offset"
                                class="mx-auto d-block elevation-6"
                                size="130"
                              >
                                <img
                                  src="https://demos.creative-tim.com/vue-material-dashboard/img/marc.aba54d65.jpg"
                                />
                              </v-avatar>
                              <v-card-text class="text-center">
                                <h6 class="overline mb-3">{{ formData.state === 2 ? "专家" : "CEO" }} / {{ formData.name }}</h6>

                                <h4 class="font-weight-light">{{ formData.nickname }}</h4>

                                <p
                                  class="font-weight-light"
                                >&nbsp;&nbsp;&nbsp;&nbsp;{{ formData.introduction }}</p>

                                <v-btn color="success" rounded>更改头像</v-btn>
                              </v-card-text>
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
import Distpicker from '@/components/common/Distpicker.vue'
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
        state: null
      },
      slideData: [
        {
          id: 0,
          text: '个人档案',
          icon: 'home_work'
        },
        {
          id: 1,
          text: '通知设置',
          icon: 'assignment_late'
        },
        {
          id: 3,
          text: '我的上传',
          icon: 'folder'
        }
      ],
      loadingText: '验证码',
      color: 'success'
    }
  },
  mounted () {
    this.$api.common
      .getSessionData()
      .then(res => {
        if (res.code === 200) {
          console.log('获得数据成功')
          this.formData = { ...res.data }
        }
      })
  },
  components: {
    Header,
    Footer,
    MaterialCard,
    Distpicker
  },
  methods: {
    test () {
      console.log(11)
    }
  }
}
</script>

<style lang="stylus" scoped>
  #userInfo
    height 1500px
</style>
