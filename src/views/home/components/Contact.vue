<template>
  <v-parallax :src="require('@/assets/images/bg4.jpg')" height="1000">
    <v-row class="justify-center mt-10">
      <h3 class="title font-weight-bold" id="title">您有任何的意见或者其他原因想要联系我们,请及时给我们留言</h3>
    </v-row>
    <v-row class="justify-lg-center">
      <v-col cols="6">
        <v-card>
          <v-card-text>
            <v-text-field label="姓名"></v-text-field>
            <v-text-field label="手机号"></v-text-field>
            <v-text-field label="邮箱"></v-text-field>
            <v-textarea></v-textarea>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-parallax>
</template>

<script>
export default {
  name: 'Contact'
}
</script>

<style lang="stylus" scoped>
  #title
    margin-bottom 0 !important
    padding-bottom 0 !important
</style>
