<template>
  <div>
    <v-parallax :src="require('@/assets/images/header.jpg')" :height="height">
      <v-spacer></v-spacer>
      <v-layout class="mt-12 mx-10">
        <v-flex>
          <v-row class="justify-center align-center">
            <v-col cols="8" md="8" sm="8">
              <v-row>
                <v-tooltip top>
                  <template v-slot:activator="{ on }">
                    <v-text-field
                      solo
                      append-icon="search"
                      autofocus
                      width="500"
                      height="65"
                      placeholder="搜索"
                      v-model="search"
                      @click:append="getSearchData"
                      @keyup.enter="getSearchData"
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <span>按 Enter 搜索</span>
                </v-tooltip>
              </v-row>
            </v-col>
          </v-row>
        </v-flex>
      </v-layout>
    </v-parallax>
  </div>
</template>

<script>
import * as types from '@/store/global/mutation-types'
import { mapMutations } from 'vuex'
export default {
  name: 'Parallax',
  data: () => ({
    height: 250,
    search: null
  }),
  methods: {
    ...mapMutations({
      setPageName: types.SET_PAGENAME
    }),
    getSearchData () {
      if (this.search) {
        this.search = this.search.trim()
        this.setPageName(this.search)
        this.search = null
      }
    }
  }
}
</script>
