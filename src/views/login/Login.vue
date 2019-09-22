<template>
  <v-app id="inspire">
    <Header />
    <v-container class="fill-height" fluid>
      <v-row justify="end">
        <v-col cols="12" sm="6" md="4">
          <v-card class="elevation-12">
            <v-toolbar color="primary" dark flat>
              <v-toolbar-title>
                <v-icon>navigation</v-icon>&nbsp;登录
              </v-toolbar-title>
              <div class="flex-grow-1"></div>
              <v-tooltip bottom>
                <template v-slot:activator="{ on }">
                  <v-btn icon large target="_blank" v-on="on" @click="toggle">
                    <v-icon>flip_camera_android</v-icon>
                  </v-btn>
                </template>
                <span>{{ source }}</span>
              </v-tooltip>
              <v-tooltip top>
                <template v-slot:activator="{ on }">
                  <router-link :to="{path: '/register'}" tag="div">
                    <v-btn icon large target="_blank" v-on="on">
                      <v-icon>mdi-codepen</v-icon>
                    </v-btn>
                  </router-link>
                </template>
                <span>没有账号?&nbsp;点击注册</span>
              </v-tooltip>
            </v-toolbar>
            <v-card-text>
              <v-form>
                <v-text-field
                 id="phone"
                 label="手机号"
                 name="login"
                 prepend-icon="person"
                 type="text"
                 v-model="username"
                ></v-text-field>
                <v-text-field
                  v-if="!toggleTag"
                  id="password"
                  label="密码"
                  name="password"
                  prepend-icon="lock"
                  type="password"
                  v-model="password"
                ></v-text-field>
                <v-text-field
                 v-if="toggleTag"
                 id="code"
                 label="验证码"
                 name="code"
                 prepend-icon="vpn_key"
                 type="text"
                ></v-text-field>
              </v-form>
            </v-card-text>
            <v-card-actions>
              <div class="flex-grow-1"></div>
              <v-btn color="primary">登录</v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
    <Footer />
  </v-app>
</template>

<script>
import Header from '@/components/content/Header.vue'
import Footer from '@/components/content/Footer.vue'
export default {
  name: 'Login',
  data () {
    return {
      username: null,
      password: null,
      toggleTag: true,
      source: null
    }
  },
  components: {
    Header,
    Footer
  },
  mounted () {
    this.toggle()
  },
  methods: {
    login () {
      this.$api.common
        .login({
          username: this.username,
          password: this.password
        })
        .then(res => {
          console.log(res)
        })
    },
    toggle () {
      this.toggleTag = !this.toggleTag
      if (this.toggleTag) {
        this.source = '切换密码登录'
      } else {
        this.source = '切换验证码登录'
      }
    }
  }
}
</script>
