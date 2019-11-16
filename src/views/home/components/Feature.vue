<template>
  <div id="Feature">
    <v-container>
      <v-row justify="center">
        <v-col cols="12">
          <v-card elevation="24" class="mt-lg-n12">
            <v-container fluid>
              <v-row justify="center">
                <v-col cols="12" lg="4" md="4" sm="12" v-for="(item, index) in feature" :key="index">
                  <v-card class="mx-auto" min-width="390">
                    <v-img
                      class="white--text"
                      min-height="390px"
                      :src="item.src"
                    >
                      <v-card-title class="align-end justify-center fill-height">{{ item.featureTitle }}</v-card-title>
                    </v-img>

                    <v-card-text>
                      <div v-for="(itemChild, indexChild) in item.featureInfo" :key="indexChild">
                        <span class="text--primary">
                          <v-icon v-if="index === 0" color="success">{{ itemChild.icon }}</v-icon>
                          <v-icon v-else-if="index === 1" color="red light">{{ itemChild.icon }}</v-icon>
                          <v-icon v-else color="orange">{{ itemChild.icon }}</v-icon>
                          {{ itemChild.text }}
                        </span>
                        <br />
                        <v-divider class="py-1"></v-divider>
                      </div>
                    </v-card-text>
                    <v-card-actions class="justify-center mt-n6">
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
                    </v-card-actions>
                  </v-card>
                </v-col>
              </v-row>
            </v-container>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
    <v-container>
      <v-row justify="center">
        <v-col cols="12">
          <v-card elevation="24" class="mt-n10">
            <v-system-bar lights-out></v-system-bar>
            <v-carousel
              :continuous="false"
              :cycle="cycle"
              :show-arrows="false"
              hide-delimiter-background
              delimiter-icon="mdi-minus"
              height="300"
            >
              <v-carousel-item v-for="(slide, i) in slides" :key="i">
                <v-sheet :color="colors[i]" height="100%" tile>
                  <v-row class="fill-height" align="center" justify="center">
                    <div class="display-3">{{ slide }} Slide</div>
                  </v-row>
                </v-sheet>
              </v-carousel-item>
            </v-carousel>
            <v-list two-line>
              <v-list-item>
                <v-list-item-avatar>
                  <v-img src="https://cdn.vuetifyjs.com/images/john.png"></v-img>
                </v-list-item-avatar>
                <v-list-item-content>
                  <v-list-item-title>John Leider</v-list-item-title>
                  <v-list-item-subtitle>Author</v-list-item-subtitle>
                </v-list-item-content>
                <v-list-item-action>
                  <v-switch v-model="cycle" label="Cycle Slides" inset></v-switch>
                </v-list-item-action>
              </v-list-item>
            </v-list>
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
      cycle: false,
      slides: ['First', 'Second', 'Third', 'Fourth', 'Fifth'],
      items: [
        {
          src: 'https://cdn.vuetifyjs.com/images/carousel/squirrel.jpg'
        },
        {
          src: 'https://cdn.vuetifyjs.com/images/carousel/fsky.jpg'
        },
        {
          src: 'https://cdn.vuetifyjs.com/images/carousel/bird.jpg'
        },
        {
          src: 'https://cdn.vuetifyjs.com/images/carousel/planet.jpg'
        }
      ],
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
  .fluid
    width 100% !important

</style>
