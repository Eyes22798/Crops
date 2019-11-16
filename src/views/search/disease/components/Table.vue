<template>
  <div>
    <v-data-table :headers="headers" :items="listObj" hide-default-footer>
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
export default {
  data () {
    return {
      name: '',
      page: 1,
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
        { text: '区分类别',
          value: 'pathogeny',
          sortable: false
        },
        { text: '症状原因',
          value: 'occurrence',
          sortable: false
        },
        { text: '防治方法',
          value: 'control',
          sortable: false
        },
        {
          text: '操作',
          value: 'operator',
          align: 'center'
        }
      ],
      listObj: []
    }
  },
  watch: {
    page () {
      this.getDiseaseByName(this.name, this.page, this.pageSize)
    }
  },
  mounted () {
    this.getDiseaseByName(this.name, 1, 5)
  },
  methods: {
    getDiseaseByName (name, pageNum, pageSize) {
      this.$api.common
        .getDiseaseByName(
          name,
          pageNum,
          pageSize
        )
        .then(res => {
          this.pageCount = res.data.number
          this.listObj = res.data.list
        })
    }
  }
}
</script>
