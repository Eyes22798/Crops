<template>
  <div>
    <v-row>
      <v-col cols="12" :md="md">
        <v-select
          ref="province"
          id="province"
          label="省"
          name="province"
          :prepend-icon="prependIcon"
          :clearable="clearable"
          :rules="[() => !!province || '请选择您的省份']"
          :items="provinces"
          :chips="chips"
          v-model="province"
          @change="getAddressData($event, 'province')"
        ></v-select>
      </v-col>
      <v-col cols="12" :md="md">
        <v-select
          ref="city"
          id="city"
          label="市"
          name="city"
          :prepend-icon="prependIcon"
          :clearable="clearable"
          :rules="[() => !!city || '请选择您的市/县']"
          :items="cities"
          :chips="chips"
          v-model="city"
          @change="getAddressData($event, 'city')"
        ></v-select>
      </v-col>
      <v-col cols="12" :md="md">
        <v-select
          ref="address"
          id="address"
          label="县"
          name="address"
          :prepend-icon="prependIcon"
          :clearable="clearable"
          :rules="[() => !!address || '请选择您的县/区']"
          :items="districts"
          :chips="chips"
          v-model="address"
          @change="getAddressData($event, 'district')"
        ></v-select>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  name: 'Distpicker',
  props: {
    prependIcon: {
      type: String
    },
    clearable: {
      type: Boolean,
      default: true
    },
    row: {
      type: Number,
      default: 1
    }
  },
  data () {
    return {
      province: null,
      city: null,
      address: null,
      provinces: [],
      cities: [],
      districts: [],
      chips: true,
      provinceData: undefined,
      cityData: undefined,
      districtData: undefined
    }
  },
  computed: {
    md () {
      return this.row === 3 ? 12 : 4
    }
  },
  watch: {
    province () {
      this.cities = []
      this.districts = []
    },
    city () {
      this.districts = []
    }
  },
  mounted () {
    this.$api.common
      .linkAge()
      .then(res => {
        if (res.code === 200) {
          res.data.forEach(item => {
            this.provinces.push(item.name)
          })
          this.provinceData = res.data
        }
      })
  },
  methods: {
    getAddressDataInfo (name, data) {
      data.some(item => {
        // 根据所选地区名称发起请求得到数据
        if (item.name === name) {
          this.$api.common
            .linkAge(item.level, item.id)
            .then(res => {
              // 如果是 city 的数据渲染到 city 数组中
              if (item.level - 0 === 1) {
                this.cityData = res.data
                res.data.forEach(city => {
                  this.cities.push(city.name)
                })
              // 如果是 districts 的数据渲染到 districts 数组中
              } else if (item.level - 0 === 2) {
                this.districtData = res.data
                res.data.forEach(district => {
                  this.districts.push(district.name)
                })
              }
            })
          return true
        }
      })
    },
    getAddressData ($event, str) {
      let data
      if (str === 'province') {
        data = this.provinceData
        this.getAddressDataInfo($event, data)
      } else if (str === 'city') {
        data = this.cityData
        this.getAddressDataInfo($event, data)
      } else {
        // 找到最后所选地区的 id
        this.districtData.some(item => {
          if (item.name === $event) {
            this.address = item.id
            console.log('联动完成')
            return true
          }
        })
      }
    }
  }
}
</script>
