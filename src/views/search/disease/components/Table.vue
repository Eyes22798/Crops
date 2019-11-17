<template>
  <div>
    <v-data-table :headers="headers" :items="listObj" hide-default-footer>
      <template v-slot:item.operator="{ item }">
        <v-row justify="center">
          <v-dialog v-model="dialog" fullscreen hide-overlay transition="dialog-bottom-transition">
            <template v-slot:activator="{ on }">
              <v-btn color="info" dark v-on="on" text @click="itemData = item">查看详情</v-btn>
            </template>
            <v-card>
              <v-toolbar dark color="success">
                <v-toolbar-title>详细信息</v-toolbar-title>
                <v-spacer></v-spacer>
                <v-btn icon dark @click="dialog = false">
                  <v-icon>mdi-close</v-icon>
                </v-btn>
              </v-toolbar>
              <v-simple-table>
                <template v-slot:default>
                  <tbody>
                    <tr v-for="(item, index) in itemData" :key="index">
                      <td>{{ getDataInfo(index) }}</td>
                      <td>{{ item }}</td>
                    </tr>
                  </tbody>
                </template>
              </v-simple-table>
            </v-card>
          </v-dialog>
        </v-row>
      </template>
    </v-data-table>
    <div class="text-center">
      <v-container>
        <v-row justify="center">
          <v-col cols="8">
            <v-container class="max-width">
              <v-pagination v-model="page" class="my-4" :length="pageCount"></v-pagination>
            </v-container>
          </v-col>
        </v-row>
      </v-container>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  data () {
    return {
      name: '稻瘟病',
      page: 1,
      pageSize: 3,
      pageCount: 0,
      headers: [
        { text: 'id',
          value: 'diseaseid',
          align: 'center'
        },
        { text: '中文名',
          value: 'chinesename',
          sortable: false
        },
        { text: '拉丁名',
          value: 'latinname',
          sortable: false
        },
        { text: '别名',
          value: 'alias',
          sortable: false
        },
        { text: '具体描述',
          value: 'distribution',
          sortable: false
        },
        { text: '症状特征',
          value: 'symptom',
          sortable: false
        },
        {
          text: '操作',
          value: 'operator',
          align: 'center'
        }
      ],
      listObj: [],
      dialog: false,
      itemData: null,
      tag: '稻瘟病'
    }
  },
  computed: {
    ...mapGetters([
      'diseaseName',
      'pestDiseaseName',
      'category'
    ])
  },
  watch: {
    page () {
      const tagMap = new Map([
        ['disease', this.getDiseaseByName],
        ['pest', this.getPestDiseaseByName],
        ['稻瘟病', this.getDiseaseByName]
      ])
      if (tagMap.get(this.tag)) {
        tagMap.get(this.tag)(this.name, this.page, this.pageSize)
      } else {
        this.setCategoryData()
      }
    },
    diseaseName () {
      this.name = this.diseaseName
      this.tag = 'disease'
      this.getDiseaseByName(this.name, this.page = 1, this.pageSize)
    },
    pestDiseaseName () {
      this.name = this.pestDiseaseName
      this.tag = 'pest'
      this.getPestDiseaseByName(this.name, this.page = 1, this.pageSize)
    },
    name () {
      this.toast(this.name)
    },
    category () {
      this.tag = 'category'
      this.setCategoryData()
    }
  },
  mounted () {
    this.getDiseaseByName(this.name, 1, 3)
  },
  methods: {
    toast (name) {
      this.$toast(`${name}已经搜索成功`, {
        x: 'right',
        y: 'top',
        icon: 'info',
        dismissable: false,
        showClose: true
      })
    },
    pagination (data) {
      this.pageCount = data.number
      this.listObj = data.list
    },
    getDiseaseByName (name, pageNum, pageSize) {
      this.$api.common
        .getDiseaseByName(
          name,
          pageNum,
          pageSize
        )
        .then(res => {
          this.pagination(res.data)
        })
    },
    getDataInfo (item) {
      const nameMap = new Map([
        ['diseaseid', '胁迫类型Id'],
        ['stresstype', '胁迫类型'],
        ['cropid', '作物Id'],
        ['chinesename', '中文名字'],
        ['latinname', '拉丁名字'],
        ['alias', '别名'],
        ['distribution', '具体描述'],
        ['symptom', '症状特征'],
        ['pathogeny', '区分类别'],
        ['occurrence', '症状原因'],
        ['control', '防治方法'],
        ['pathoimage', 'pathoimage'],
        ['symptomimage', 'symptomimage']
      ])
      return nameMap.get(item)
    },
    getPestDiseaseByName (name, pageNum, pageSize) {
      this.$api.common
        .getPestByName(
          name,
          pageNum,
          pageSize
        )
        .then(res => {
          if (res.code === 200) {
            this.pagination(res.data)
          }
        })
    },
    getPestByCategory (params) {
      this.$api.common
        .getPestByCategory(params)
        .then(res => {
          if (res.code === 200) {
            this.pagination(res.data)
          }
        })
    },
    setCategoryData () {
      this.category['pagenum'] = this.page
      this.category['pagesize'] = this.pageSize
      this.name = this.category.species
      this.getPestByCategory(this.category)
    }
  }
}
</script>
