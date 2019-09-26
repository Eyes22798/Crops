<template>
  <v-app id="inspire" class="split-bg success theme--light">
    <v-content>
      <v-container class="fill-height" fluid>
        <v-layout class="align-center justify-center">
          <v-flex xs12 sm8 md4 lg4>
            <v-card class="elevation-12" pa-3>
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
                        id="username"
                        label="用户名"
                        name="username"
                        prepend-icon="person"
                        type="text"
                        :rules="[() => !!username || '请输入你的用户名']"
                        :clearable="clearable"
                        v-model="username"
                        hint="请输入合法的用户名"
                        required
                      ></v-text-field>
                      <v-text-field
                        id="password"
                        label="密码"
                        name="password"
                        prepend-icon="lock"
                        :append-icon="show ? 'visibility' : 'visibility_off'"
                        :type="show ? 'text' : 'password'"
                        :rules="[
                          () => !!password || '请输入你的密码',
                          addressCheck
                        ]"
                        :clearable="clearable"
                        v-model="password"
                        counter="25"
                        maxlength="25"
                        hint="至少8个字符!"
                        required
                        @click:append="show = !show"
                      ></v-text-field>
                      <v-text-field
                        id="password2"
                        label="确认密码"
                        name="password2"
                        prepend-icon="lock"
                        :append-icon="show ? 'visibility' : 'visibility_off'"
                        :type="show ? 'text' : 'password'"
                        :rules="[
                          () => !!password2 || '请输入你的密码',
                          addressCheck
                        ]"
                        :clearable="clearable"
                        v-model="password2"
                        counter="25"
                        maxlength="25"
                        hint="至少8个字符!"
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
                            id="phone"
                            label="手机号"
                            name="phone"
                            prepend-icon="phone"
                            type="text"
                            :rules="[() => !!phone || '请输入你的手机号']"
                            :clearable="clearable"
                            v-model="phone"
                            counter="11"
                            maxlength="11"
                            hint="请输入正确的手机号"
                            required
                          ></v-text-field>
                        </v-col>
                        <v-col cols="4" lg="4">
                          <v-btn
                            :loading="loading3"
                            :disabled="disabled"
                            color="info"
                            class="mt-3 px-10 white--text float-right"
                            @click="loader = 'loading3'"
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
                      <v-text-field
                        id="email"
                        label="邮箱"
                        name="email"
                        prepend-icon="email"
                        type="email"
                        :rules="[() => !!email || '请输入你的邮箱']"
                        :clearable="clearable"
                        v-model="email"
                        hint="请输入正确的邮箱"
                        required
                      ></v-text-field>
                      <v-text-field
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
                       id="province"
                       label="省"
                       name="province"
                       prepend-icon="map"
                       :items="provinces"
                       :clearable="clearable"
                       :chips="chips"
                      >
                      </v-select>
                      <v-select
                       id="city"
                       label="市"
                       name="city"
                       prepend-icon="map"
                       :items="cities"
                       :clearable="clearable"
                       :chips="chips"
                      >
                      </v-select>
                      <v-select
                       id="address"
                       label="县"
                       name="address"
                       prepend-icon="map"
                       :items="districts"
                       :clearable="clearable"
                       :chips="chips"
                       v-model="address"
                      >
                      </v-select>
                      <v-textarea
                        id="introduction"
                        label="个人介绍"
                        name="introduction"
                        prepend-icon="info"
                        clearable
                        clear-icon="cancel"
                        v-model="introduction"
                        hint="输入您的个人介绍"
                      ></v-textarea>
                      <v-row class="mt-2">
                        <v-btn color="success" class="ml-3" @click="e1 = 2">Back</v-btn>
                        <div class="flex-grow-1"></div>
                        <v-btn color="info" :fab="fab" class="mr-3" @click="register" :loading="loading4">Submit</v-btn>
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
export default {
  name: 'Register',
  data () {
    return {
      username: null,
      password: null,
      password2: null,
      phone: null,
      email: null,
      postcode: null,
      address: null,
      introduction: null,
      e1: 0,
      show: true,
      clearable: true,
      altLabels: true,
      chips: true,
      fab: false,
      loader: null,
      loading3: false,
      loading4: false,
      loadingText: '验证手机号',
      loadingSecond: 60,
      disabled: false,
      provinces: ['江西省', '浙江省', '北京市', '广东省'],
      cities: ['吉安市', '井冈山市', '南昌市', '鹰潭市'],
      districts: ['青原区', '吉安县', '吉州区'],
      value: ['江西省', '浙江省', '北京市', '广东省']
    }
  },
  components: {
    Footer
  },
  watch: {
    loader () {
      const l = this.loader
      this.disabled = true
      this[l] = !this[l]
      setTimeout(() => {
        this[l] = false
        this.loadingText = `${this.loadingSecond}s`
        this.flashText()
      }, 1000)
      this.loader = null
    }
  },
  methods: {
    register () {
      this.loading4 = true
    },
    addressCheck () {
      this.errorMessages = this.address && !this.name ? '😕! 我是必需的' : ''
      return true
    },
    flashText () {
      let number = this.loadingSecond - 1
      let nIntervId = setInterval(() => {
        this.loadingText = `${number--}s`
        if (number < 0) {
          clearInterval(nIntervId)
          this.loadingText = '重新验证'
          this.disabled = false
        }
      }, 1000)
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
