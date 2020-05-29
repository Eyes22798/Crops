<template>
  <div>
    <v-card color="black" dark flat tile class="my-5">
      <v-window v-model="onboarding">
        <v-window-item v-for="item in parallaxItems" :key="item.id">
          <v-parallax :src="item.src" height="500">
            <v-row
              class="fill-height title white--text"
              align="center"
              justify="center"
            >{{ item.title }}</v-row>
          </v-parallax>
        </v-window-item>
      </v-window>

      <v-card-actions class="justify-space-between">
        <v-btn text @click="prev">
          <v-icon>mdi-chevron-left</v-icon>
        </v-btn>
        <v-item-group v-model="onboarding" class="text-center" mandatory>
          <v-item v-for="(n) in length" :key="`btn-${n}`" v-slot:default="{ active, toggle }">
            <v-btn :input-value="active" icon @click="toggle">
              <v-icon>mdi-record</v-icon>
            </v-btn>
          </v-item>
        </v-item-group>
        <v-btn text @click="next">
          <v-icon>mdi-chevron-right</v-icon>
        </v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
export default {
  name: 'Parallaxs',
  data () {
    return {
      parallaxItems: [
        {
          id: 0,
          src: require('@/assets/images/bg2.jpg'),
          title: '为了帮助CropDiagnosis识别问题，用户需要回答一个智能问卷。然后，该应用会建议最可能的诊断。'
        },
        {
          id: 1,
          src: require('@/assets/images/bg10.png'),
          title: 'Crops 旨在通过使农作物诊断更加准确，无误选择化学药品以及通过个性化说明辅助应用程序来改善有害生物管理决策。'
        },
        {
          id: 2,
          src: require('@/assets/images/bg11.png'),
          title: '通过评估用户通过智能问卷输入的农作物的详细信息（类型，位置，土壤，历史等）和威胁特征（类型，外观，进展等），该应用程序会建议最可能的诊断方法'
        }
      ],
      length: 3,
      onboarding: 0
    }
  },
  methods: {
    next () {
      this.onboarding = this.onboarding + 1 === this.length
        ? 0
        : this.onboarding + 1
    },
    prev () {
      this.onboarding = this.onboarding - 1 < 0
        ? this.length - 1
        : this.onboarding - 1
    }
  }
}
</script>
