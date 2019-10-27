<template>
  <v-app>
    <v-layout>
      <v-flex>
        <v-container>
          <v-row class="mt-12">
            <v-col cols="12" md="4" v-for="item in listObj" :key="item.id">
              <v-card min-width="300">
                <material-card color="success" title="作物信息" icon="featured_play_list">
                  <v-icon left>mdi-label</v-icon>
                  点击查看详细信息
                </material-card>
               <v-row class="justify-center align-center">
                 <material-card color="success" class="mx-2 mt-n2" text="中文学名">
                  <v-chip outlined label>
                    <v-icon left>local_florist</v-icon>
                    {{ item.chinesename }}
                  </v-chip>
                 </material-card>
                 <material-card color="success" class="mx-2 mt-n2" text="拉丁学名">
                   <v-chip outlined label>
                    <v-icon left>local_florist</v-icon>
                    {{ item.latinname }}
                  </v-chip>
                 </material-card>
                 <material-card color="success" class="mx-2 mt-n2" text="病害别名">
                    <v-chip outlined label>
                    <v-icon left>local_florist</v-icon>
                    {{ item.alias }}
                  </v-chip>
                 </material-card>
               </v-row>

                <v-card-actions>
                  <v-chip color="success">分布</v-chip>

                  <v-spacer></v-spacer>

                  <v-btn icon @click="item.show = !item.show">
                    <v-icon>{{ item.show ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
                  </v-btn>
                </v-card-actions>

                <v-expand-transition>
                  <div v-show="item.show">
                    <v-divider></v-divider>
                    <v-card-text class="text-justify">{{ item.distribution }}</v-card-text>
                  </div>
                </v-expand-transition>


                <v-card-actions>
                  <v-btn icon @click="item.show = !item.show">
                    <v-icon>{{ item.show ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
                  </v-btn>

                  <v-spacer></v-spacer>

                  <v-chip color="brown darken-3" text-color="white">描述</v-chip>

                </v-card-actions>

                <v-expand-transition>
                  <div v-show="item.show">
                    <v-divider></v-divider>
                    <v-card-text class="text-justify">{{ item.morphology }}</v-card-text>
                  </div>
                </v-expand-transition>


                 <v-card-actions>
                  <v-chip color="red accent-2" text-color="white">特征</v-chip>


                  <v-spacer></v-spacer>

                   <v-btn icon @click="item.show = !item.show">
                    <v-icon>{{ item.show ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
                  </v-btn>


                </v-card-actions>

                <v-expand-transition>
                  <div v-show="item.show">
                    <v-divider></v-divider>
                    <v-card-text class="text-justify">{{ item.growthhabit }}</v-card-text>
                  </div>
                </v-expand-transition>
              </v-card>
            </v-col>
          </v-row>
          <div class="text-center">
            <v-container>
              <v-row justify="center">
                <v-col cols="8">
                  <v-container class="max-width">
                    <v-pagination v-model="page" class="my-4" :length="15"></v-pagination>
                  </v-container>
                </v-col>
              </v-row>
            </v-container>
          </div>
        </v-container>
      </v-flex>
    </v-layout>
  </v-app>
</template>

<script>
import MaterialCard from '@/components/common/MaterialCard.vue'
export default {
  name: 'Main',
  components: {
    MaterialCard
  },
  data: () => ({
    show: false,
    list: {
      plantid: null,
      chinesename: null,
      latinname: null,
      alias: null,
      category:  null,
      distribution: null,
      morphology: null,
      plantimage: null,
      growthhabit: null,
      imageList: null,
      show: false
    },
    page: 1,
    name: null,
    number: null,
    listObj: null,
    materialCardStyle: {
       marginTop: '-10px'
    }
  }),
  mounted () {
    this.getPlantByName()
  },
  methods: {
    getPlantByName () {
      this.$api.common
        .getPlantByName()
        .then(res => {
          let list = res.data.list
          Object.keys(list).forEach((key) => {
            list[key].show = false
          })
          this.listObj = list
        })
    }
  }
}
</script>
