<template>
  <div id="feature">
    <v-container class="feature-container">
      <v-row justify="center">
        <v-col cols="12">
          <v-card elevation="24" class="mt-lg-n12">
            <v-container fluid>
              <v-row justify="center">
                <v-col cols="12" lg="4" md="4" sm="12" v-for="(item, index) in feature" :key="index">
                  <v-card class="mx-auto feature-card" min-width="350">
                    <v-img
                      class="white--text"
                      min-height="350px"
                      :src="item.src"
                    >
                      <v-card-title class="align-end justify-center fill-height">{{ item.featureTitle }}</v-card-title>
                    </v-img>

                    <v-card-text>
                      <div v-for="(itemChild, indexChild) in item.featureInfo" :key="indexChild">
                        <span class="text--primary subtitle-1">
                          <v-icon v-if="index === 0" color="success">{{ itemChild.icon }}</v-icon>
                          <v-icon v-else-if="index === 1" color="red light">{{ itemChild.icon }}</v-icon>
                          <v-icon v-else color="orange">{{ itemChild.icon }}</v-icon>
                          {{ itemChild.text }}
                        </span>
                        <br />
                        <v-divider class="py-1"></v-divider>
                      </div>
                    </v-card-text>
                    <!-- <v-card-actions class="justify-center mt-n6">
                      <router-link :to="{path: '/plant'}" tag="div" class="fluid" v-if="index === 0" >
                        <v-btn class="my-2" tile outlined block color="success">
                          <v-icon left>fingerprint</v-icon> 点击进入
                        </v-btn>
                      </router-link>
                      <router-link :to="{path: '/enemy'}" tag="div" class="fluid" v-else-if="index === 1">
                        <v-btn class="my-2" tile outlined block color="red">
                          <v-icon left>fingerprint</v-icon> 点击进入
                        </v-btn>
                      </router-link>
                      <router-link :to="{path: '/disease'}" tag="div" class="fluid" v-else>
                        <v-btn  class="my-2" tile outlined block color="orange">
                          <v-icon left>fingerprint</v-icon> 点击进入
                        </v-btn>
                      </router-link>
                    </v-card-actions> -->
                  </v-card>
                </v-col>
              </v-row>
            </v-container>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  name: 'Feature',
  data () {
    return {
      colors: ['indigo', 'warning', 'pink darken-2', 'red lighten-1', 'deep-purple accent-4'],
      feature: [
        {
          src: require('@/assets/images/feature1.jpg'),
          featureTitle: '植物信息检索',
          featureInfo: [
            {
              icon: 'find_in_page',
              text: '按照农作物的名称, 学名等类信息查询'
            },
            {
              icon: 'swap_horiz',
              text: '按照作物的目、科、属、种等类属信息查询'
            },
            {
              icon: 'add_a_photo',
              text: '上传作物图片智能识别出植物作物详细信息'
            }
          ]
        },
        {
          src: require('@/assets/images/feature2.jpg'),
          featureTitle: '天敌信息检索',
          featureInfo: [
            {
              icon: 'local_offer',
              text: '按天敌的中文学名、拉丁学名或别名检索'
            },
            {
              icon: 'healing',
              text: '按照天敌的目、科、属、种等类属信息查询'
            },
            {
              icon: 'monochrome_photos',
              text: '上传天敌图片智能识别出天敌的详细信息'
            }
          ]
        },
        {
          src: require('@/assets/images/feature3.jpg'),
          featureTitle: '病害类型识别',
          featureInfo: [
            {
              icon: 'fa fa-bug',
              text: '根据病害、虫害名称图片胁迫查询诊断'
            },
            {
              icon: 'fa  fa-area-chart',
              text: '根据水分、养分名称图片胁迫查询诊断'
            },
            {
              icon: 'fa fa-bar-chart ',
              text: '根据温度、草害名称图片胁迫查询诊断'
            }
          ]
        }
      ]
    }
  }
}
</script>

<style lang="stylus" scoped>
  #feature
    background-color #E0E4E5
    .feature-container
      .feature-card
        .card-button-svg
          position absolute
          top 280px
          z-index 2
          .svg
            font-size 3rem
        .card-button
          position absolute
          display flex
          justify-content center
          align-items center
          top 300px
        .fluid
          width 100% !important
</style>
