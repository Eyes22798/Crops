<template>
  <v-row justify="center">
    <v-col cols="12">
      <v-card elevation="24" class="mt-n10">
        <v-system-bar lights-out></v-system-bar>
        <v-stepper v-model="e6" vertical>
          <v-stepper-step :complete="e6 > 1" step="1">
            作物信息检索
            <small class="mt-2">查看您想要的农作物信息，我们数据库中有上千种的植物信息，了解农作物，提高生产力！</small>
          </v-stepper-step>
          <v-stepper-content step="1">
            <v-card>
              <v-tabs vertical color="success">
                <v-tab>
                  <v-icon left>find_in_page</v-icon>根据名称查询植物
                </v-tab>
                <v-tab>
                  <v-icon left>swap_horiz</v-icon>根据植物科属查询
                </v-tab>
                <v-tab>
                  <v-icon left>add_a_photo</v-icon>根据图片查询植物
                </v-tab>
                <v-tab-item>
                  <v-card flat>
                    <v-card-text>
                      <p>按作物的中文学名、拉丁学名或别名检索</p>
                      <p
                        class="mb-0"
                      >Phasellus dolor. Fusce neque. Fusce fermentum odio nec arcu. Pellentesque libero tortor, tincidunt et, tincidunt eget, semper nec, quam. Phasellus blandit leo ut odio.</p>
                    </v-card-text>
                  </v-card>
                </v-tab-item>
                <v-tab-item>
                  <v-card flat>
                    <v-card-text>
                      <p>按作物的目、科、属、种等类属信息进行级联查询</p>
                      <p
                        class="mb-0"
                      >Donec venenatis vulputate lorem. Aenean viverra rhoncus pede. In dui magna, posuere eget, vestibulum et, tempor auctor, justo. Fusce commodo aliquam arcu. Suspendisse enim turpis, dictum sed, iaculis a, condimentum nec, nisi.</p>
                    </v-card-text>
                  </v-card>
                </v-tab-item>
                <v-tab-item>
                  <v-card flat>
                    <v-card-text>
                      <p class="mb-0">使用简单的支持拍照的智能手机拍摄可耕作物的照片。 Crops眨眼间即可对其进行分析，并报告有关植物物种及其潜在疾病的详细信息</p>
                      <v-tabs background-color="white" color="deep-purple accent-4" right>
                          <v-tab>Landscape</v-tab>
                          <v-tab>City</v-tab>
                          <v-tab>Abstract</v-tab>

                          <v-tab-item v-for="n in 3" :key="n">
                            <v-container fluid>
                              <v-row>
                                <v-col v-for="i in 6" :key="i" cols="12" md="4">
                                  <v-img
                                    :src="`https://picsum.photos/500/300?image=${i * n * 5 + 10}`"
                                    :lazy-src="`https://picsum.photos/10/6?image=${i * n * 5 + 10}`"
                                    aspect-ratio="1"
                                  ></v-img>
                                </v-col>
                              </v-row>
                            </v-container>
                          </v-tab-item>
                        </v-tabs>
                    </v-card-text>
                  </v-card>
                </v-tab-item>
              </v-tabs>
            </v-card>
            <v-btn color="success mt-2" @click="e6 = 2">下一个</v-btn>
          </v-stepper-content>

          <v-stepper-step :complete="e6 > 2" step="2">
            天敌信息检索
            <small class="mt-2">查看您想要的农作物的天敌详细信息，让您可以对症下药。</small>
          </v-stepper-step>

          <v-stepper-content step="2">
            <v-card color=" lighten-1" class="mb-12" height="200px"></v-card>
            <v-btn color="success" @click="e6 = 3">下一个</v-btn>
          </v-stepper-content>

          <v-stepper-step :complete="e6 > 3" step="3">
            病害智能诊断
            <small class="mt-2">利用大数据技术，只需上传一张图片就可以精准识别出植物的病害。</small>
          </v-stepper-step>

          <v-stepper-content step="3">
            <v-card color=" lighten-1" class="mb-12" height="200px"></v-card>
            <v-btn color="success" @click="e6 = 4">下一个</v-btn>
          </v-stepper-content>

          <v-stepper-step step="4">
            资源信息推荐
            <small class="mt-2">根据您的位置信息，自动给您推荐附近一些农资商店、农资信息。</small>
          </v-stepper-step>
          <v-stepper-content step="4">
            <v-card color=" lighten-1" class="mb-12" height="200px"></v-card>
            <v-btn color="success" @click="e6 = 1">重新查看</v-btn>
          </v-stepper-content>
        </v-stepper>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: 'Steppers',
  data () {
    return {
      e6: 1
    }
  }
}
</script>
