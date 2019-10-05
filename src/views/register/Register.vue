<template>
  <v-app id="inspire" class="split-bg success theme--light">
    <v-content>
      <v-container class="fill-height" fluid>
        <v-layout class="align-center justify-center">
          <v-flex xs12 sm8 md4 lg4>
            <v-card class="elevation-12" pa-3>
              <div class="layout column align-center">
                <img
                  :src="require('@/assets/images/logo.png')"
                  alt="Vue Material Admin"
                  width="100"
                  height="100"
                />
                <h1 class="flex mt-n6 mb-4 success--text">账号注册</h1>
              </div>
              <v-stepper
               v-model="e1"
               :alt-labels="altLabels"
              >
                <v-stepper-header>
                  <v-stepper-step :complete="e1 > 1" step="1" color="success">个人账号</v-stepper-step>
                  <v-divider></v-divider>
                  <v-stepper-step :complete="e1 > 2" step="2" color="success">手机验证</v-stepper-step>
                  <v-divider></v-divider>
                  <v-stepper-step step="3" color="success">个人详细信息</v-stepper-step>
                </v-stepper-header>
                <v-stepper-items>
                  <v-form>
                    <v-stepper-content step="1">
                      <v-text-field
                        ref="username"
                        id="username"
                        label="用户名"
                        name="username"
                        prepend-icon="person"
                        type="text"
                        :rules="rules.usernameRules"
                        :clearable="clearable"
                        v-model="username"
                        required
                      ></v-text-field>
                      <v-text-field
                        ref="password"
                        id="password"
                        label="密码"
                        name="password"
                        prepend-icon="lock"
                        :append-icon="show ? 'visibility' : 'visibility_off'"
                        :type="show ? 'text' : 'password'"
                        :rules="rules.passwordRules"
                        :clearable="clearable"
                        v-model="password"
                        counter="10"
                        maxlength="10"
                        required
                        @click:append="show = !show"
                      ></v-text-field>
                      <v-text-field
                        ref="password2"
                        id="password2"
                        label="确认密码"
                        name="password2"
                        prepend-icon="lock"
                        :append-icon="show ? 'visibility' : 'visibility_off'"
                        :type="show ? 'text' : 'password'"
                        :rules="rules.passwordConformRules"
                        :clearable="clearable"
                        v-model="password2"
                        counter="10"
                        maxlength="10"
                        required
                        @click:append="show = !show"
                      ></v-text-field>
                      <v-row class="mt-2">
                        <div class="flex-grow-1"></div>
                        <v-btn color="success" class="mr-3" @click="e1 = 2">Continue</v-btn>
                      </v-row>
                    </v-stepper-content>
                    <v-stepper-content step="2">
                      <v-row>
                        <v-col cols="8" lg="8">
                          <v-text-field
                            ref="phone"
                            id="phone"
                            label="手机号"
                            name="phone"
                            prepend-icon="phone"
                            type="text"
                            :rules="rules.phoneRules"
                            :clearable="clearable"
                            v-model="phone"
                            counter="11"
                            maxlength="11"
                            required
                          ></v-text-field>
                        </v-col>
                        <v-col cols="4" lg="4">
                          <v-btn
                            :loading="loading3"
                            :disabled="disabled"
                            color="info"
                            class="mt-3 px-10 white--text float-right"
                            @click="loader = 'loading3';getSendCode(phone)"
                          >{{ loadingText }}</v-btn>
                          </v-col>
                      </v-row>
                      <v-row class="mt-2">
                        <v-btn color="success" class="ml-3" @click="e1 = 1">Back</v-btn>
                        <div class="flex-grow-1"></div>
                        <v-btn color="success" class="mr-3" @click="e1 = 3">Continue</v-btn>
                      </v-row>
                    </v-stepper-content>
                    <v-stepper-content step="3">
                      <v-radio-group v-model="role" row class="d-flex justify-center">
                        <v-radio
                         label="我是普通用户"
                         id="ordinary"
                         color="success"
                         value="3"
                        ></v-radio>
                        <v-radio
                         label="我是专家用户"
                         id="expert"
                         color="success"
                         value="2"
                        ></v-radio>
                      </v-radio-group>
                      <v-text-field
                        ref="name"
                        id="name"
                        label="姓名"
                        name="name"
                        prepend-icon="person"
                        type="text"
                        :rules="rules.nameRules"
                        :clearable="clearable"
                        v-model="name"
                        required
                      ></v-text-field>
                      <v-text-field
                        ref="email"
                        id="email"
                        label="邮箱"
                        name="email"
                        prepend-icon="email"
                        type="email"
                        :rules="rules.emailRules"
                        :clearable="clearable"
                        v-model="email"
                        required
                      ></v-text-field>
                      <v-text-field
                       ref="postcode"
                       id="postcode"
                       label="邮政编码"
                       name="postcode"
                       prepend-icon="fa fa-globe"
                       type="text"
                       :rules="[() => !!postcode || '请输入你的邮政编码']"
                       :clearable="clearable"
                       v-model="postcode"
                       hint="请输入正确的邮政编码"
                      ></v-text-field>
                      <v-select
                       ref="province"
                       id="province"
                       label="省"
                       name="province"
                       prepend-icon="map"
                       :rules="[() => !!province || '请选择您的省份']"
                       :items="provinces"
                       :clearable="clearable"
                       :chips="chips"
                       v-model="province"
                       @change="getAddressData($event, 'province')"
                      >
                      </v-select>
                      <v-select
                       ref="city"
                       id="city"
                       label="市"
                       name="city"
                       prepend-icon="map"
                       :rules="[() => !!city || '请选择您的市/县']"
                       :items="cities"
                       :clearable="clearable"
                       :chips="chips"
                       v-model="city"
                       @change="getAddressData($event, 'city')"
                      >
                      </v-select>
                      <v-select
                       ref="address"
                       id="address"
                       label="县"
                       name="address"
                       prepend-icon="map"
                       :rules="[() => !!address || '请选择您的县/区']"
                       :items="districts"
                       :clearable="clearable"
                       :chips="chips"
                       v-model="address"
                       @change="getAddressData($event, 'district')"
                      >
                      </v-select>
                      <v-textarea
                        ref="introduction"
                        id="introduction"
                        label="个人介绍"
                        name="introduction"
                        prepend-icon="info"
                        :rules="[() => !!introduction || '请填写您的个人介绍']"
                        clearable
                        clear-icon="cancel"
                        v-model="introduction"
                        hint="输入您的个人介绍"
                      ></v-textarea>
                      <v-row class="mt-2">
                        <v-btn color="success" class="ml-3" @click="e1 = 2">Back</v-btn>
                        <div class="flex-grow-1"></div>
                        <v-slide-x-reverse-transition>
                          <v-tooltip
                            v-if="formHasErrors"
                            left
                          >
                            <template v-slot:activator="{ on }">
                              <v-btn
                                icon
                                class="my-0"
                                @click="resetForm"
                                v-on="on"
                              >
                                <v-icon>mdi-refresh</v-icon>
                              </v-btn>
                            </template>
                            <span>重新输入</span>
                          </v-tooltip>
                        </v-slide-x-reverse-transition>
                        <v-btn color="info light" :fab="fab" class="mr-3" @click="register" :loading="loading4">Submit</v-btn>
                      </v-row>
                    </v-stepper-content>
                  </v-form>
                </v-stepper-items>
              </v-stepper>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
    <Footer />
  </v-app>
</template>

<script>
import Footer from '@/components/content/Footer.vue'
import { phoneRex, usernameRex, passwordstrongRex, emailRex, nameRex } from '@/common/const.js'
import * as types from '@/store/global/mutation-types'
import { mapMutations } from 'vuex'

export default {
  name: 'Register',
  data () {
    return {
      username: null,
      password: null,
      password2: null,
      phone: null,
      name: null,
      email: null,
      postcode: null,
      address: null,
      introduction: null,
      role: '3',
      province: null,
      city: null,
      provinceData: undefined,
      cityData: undefined,
      districtData: undefined,
      provinces: [],
      cities: [],
      districts: [],
      formHasErrors: false,
      formKey: true,
      phoneMeta: false,
      errorMessages: '',
      rules: {
        usernameRules: [
          v => !!v || '请输入昵称!',
          v => usernameRex.test(v) || '中文、英文、数字包括下划线'
        ],
        passwordRules: [
          v => !!v || '请输入密码!',
          v => passwordstrongRex.test(v) || '必须包含大小写字母和数字的组合，不能使用特殊字符，长度在8-10之间'
        ],
        passwordConformRules: [
          v => !!v || '请再次输入密码!',
          v => this.password === this.password2 || '两次密码不一致'
        ],
        phoneRules: [
          v => !!v || '请输入手机号!',
          v => phoneRex.test(v) || '必须是有效的手机号'
        ],
        emailRules: [
          v => !!v || '请输入邮箱!',
          v => emailRex.test(v) || '必须是有效的邮箱'
        ],
        nameRules: [
          v => !!v || '请输入姓名!',
          v => nameRex.test(v) || '必须是有效的姓名'
        ]
      },
      e1: 0,
      show: false,
      clearable: true,
      altLabels: true,
      chips: true,
      fab: false,
      loader: null,
      loading3: false,
      loading4: false,
      loadingText: '验证手机号',
      loadingSecond: 60,
      disabled: false
    }
  },
  components: {
    Footer
  },
  mounted () {
    this.$api.common
      .linkAge()
      .then(res => {
        if (res.code === 200) {
          res.data.forEach(item => {
            this.provinces.push(item.name)
          })
          this.provinceData = res.data
        }
      })
  },
  computed: {
    form () {
      return {
        username: this.username,
        password: this.password,
        password2: this.password2,
        phone: this.phone,
        name: this.name,
        email: this.email,
        postcode: this.postcode,
        address: this.address,
        introduction: this.introduction,
        province: this.province,
        city: this.city
      }
    }
  },
  watch: {
    loader () {
      const l = this.loader
      this.disabled = true
      this[l] = !this[l]
      setTimeout(() => {
        this[l] = false
        this.loadingText = `重新验证(${this.loadingSecond}s)`
        this.flashText()
      }, 1000)
      this.loader = null
    },
    province () {
      this.cities = []
      this.districts = []
    },
    city () {
      this.districts = []
    }
  },
  methods: {
    ...mapMutations({
      setUserInfoData: types.SET_USERINFO
    }),
    registerSet (state) {
      console.log(state)
      // 把用户信息存到 localStorage 中
      this.setUserInfoData(Object.assign(
        {},
        this.form,
        {
          state: state
        },
        {
          role: this.role - 0
        }
      ))
      this.$toast('注册成功!', {
        x: 'right',
        y: 'top',
        icon: 'info',
        dismissable: false,
        showClose: true,
        timeout: 800
      })
      // 跳转到主页
      setTimeout(() => {
        this.loading4 = false
        this.$router.push('/')
      }, 1000)
    },
    register () {
      this.loading4 = true
      this.formHasErrors = false
      const validateArr = [
        usernameRex.test(this.username) && this.username !== null,
        passwordstrongRex.test(this.password),
        this.password === this.password2,
        phoneRex.test(this.phone),
        nameRex.test(this.name) && this.name !== null,
        emailRex.test(this.email)
      ]
      const errMessage = ['用户名不符合规范', '密码不符合规范', '两次密码不一致', '未输入正确的手机号', '不符合的姓名', '未输入正确的邮箱']
      validateArr.forEach((rexp, key) => {
        if (!rexp) {
          this.$toast(`${errMessage[key]}`, {
            x: 'right',
            y: 'top',
            icon: 'info',
            color: 'error',
            dismissable: false,
            showClose: true,
            timeout: 800
          })
          this.formKey = false
        }
      })
      Object.keys(this.form).forEach(f => {
        if (!this.form[f]) {
          this.formHasErrors = true
          this.formKey = false
        }
        this.$refs[f].validate(true)
      })
      // 判断该用户是否验证过手机号
      if (!this.phoneMeta) {
        this.formKey = false
        this.$toast('手机号未验证!', {
          x: 'right',
          y: 'top',
          icon: 'info',
          color: 'error',
          dismissable: false,
          showClose: true
        })
      }
      // 判断 用户类别 (表单提交完全正确的情况)
      if (this.role === '3' && this.formKey) {
        console.log('我是普通用户')
        this.$api.common
          .ordinaryRegister({
            name: this.name,
            password: this.password,
            nickname: this.username,
            phone: this.phone,
            email: this.email,
            address: this.address,
            postcode: this.postcode,
            introduction: this.introduction,
            state: 1,
            role: this.role - 0
          })
          .then(res => {
            if (res.code === 200) {
              this.registerSet(1)
            }
            setTimeout(() => {
              this.loading4 = false
            }, 1000)
          })
      } else if (this.role === '2' && this.formKey) {
        this.loading4 = false
        console.log('我是专家用户')
        this.$api.common
          .expertRegister({
            name: this.name,
            password: this.password,
            nickname: this.username,
            phone: this.phone,
            email: this.email,
            address: this.address,
            postcode: this.postcode,
            introduction: this.introduction,
            state: 0,
            role: this.role - 0
          })
          .then(res => {
            if (res.code === 200) {
              this.registerSet(0)
            }
          })
      }
      setTimeout(() => {
        this.loading4 = false
      }, 1000)
    },
    flashText () {
      let number = this.loadingSecond - 1
      let nIntervId = setInterval(() => {
        this.loadingText = `重新验证(${number--}s)`
        if (number < 0) {
          clearInterval(nIntervId)
          this.loadingText = '重新验证'
          this.disabled = false
        }
      }, 1000)
    },
    resetForm () {
      this.errorMessages = []
      this.formHasErrors = false
      Object.keys(this.form).forEach(f => {
        this.$refs[f].reset()
      })
    },
    getSendCode ($event) {
      if ($event === null) {
        this.loader = null
        this.$toast('手机号为空!', {
          x: 'right',
          y: 'top',
          icon: 'error',
          dismissable: false,
          showClose: true,
          timeout: 800
        })
      } else if (!phoneRex.test($event)) {
        this.loader = null
        this.$toast('请输入正确的手机号!', {
          x: 'right',
          y: 'top',
          icon: 'info',
          dismissable: false,
          showClose: true,
          timeout: 800
        })
      } else {
        this.$api.common
          .registerSendCode({
            phone: this.phone
          })
          .then(res => {
            if (res.code === 200) {
              this.$toast('短信已发送!', {
                x: 'right',
                y: 'top',
                icon: 'info',
                dismissable: false,
                showClose: true,
                timeout: 800
              })
              this.phoneMeta = true
            }
          })
      }
    },
    getAddressDataInfo (name, data) {
      data.some(item => {
        // 根据所选地区名称发起请求得到数据
        if (item.name === name) {
          this.$api.common
            .linkAge(item.level, item.id)
            .then(res => {
              // 如果是 city 的数据渲染到 city 数组中
              if (item.level - 0 === 1) {
                this.cityData = res.data
                res.data.forEach(city => {
                  this.cities.push(city.name)
                })
              // 如果是 districts 的数据渲染到 districts 数组中
              } else if (item.level - 0 === 2) {
                this.districtData = res.data
                res.data.forEach(district => {
                  this.districts.push(district.name)
                })
              }
            })
          return true
        }
      })
    },
    getAddressData ($event, str) {
      let data
      if (str === 'province') {
        data = this.provinceData
        this.getAddressDataInfo($event, data)
      } else if (str === 'city') {
        data = this.cityData
        this.getAddressDataInfo($event, data)
      } else {
        // 找到最后所选地区的 id
        this.districtData.some(item => {
          if (item.name === $event) {
            this.address = item.id
            console.log('联动完成')
            return true
          }
        })
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
.split-bg {
  height: 55%;
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  content: '';
  z-index: 0;
}
</style>
