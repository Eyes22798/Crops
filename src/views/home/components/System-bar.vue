<template>
  <div>
    <v-system-bar dark :absolute="false" window height="40">
      <div class="flex-grow-1"></div>
      <v-btn icon class="mr-12 pr-12">
        <v-btn>
          <router-link :to="{path: '/login'}" tag="div">
            <v-icon class="white--text">account_box</v-icon>登录
          </router-link>
        </v-btn>
        <v-btn>
          <router-link :to="{path: '/register'}" tag="div">
            <v-icon class="white--text">person_add</v-icon>注册
          </router-link>
        </v-btn>
      </v-btn>
    </v-system-bar>
  </div>
</template>

<script>
export default {
  name: 'SystemBar'
}
</script>

<style lang="stylus" scoped>
.router-link-active {
  text-decoration: none;
}
</style>
