<template>
  <div>
    <v-parallax :src="require('@/assets/images/header.jpg')" :height="height">
      <v-spacer></v-spacer>
      <v-layout class="mt-12 mx-10">
        <v-flex>
          <v-row class="justify-center align-center">
            <v-col cols="8" md="8" sm="8">
              <v-row>
                <v-text-field
                  solo
                  append-icon="search"
                  autofocus
                  width="500"
                  height="65"
                  placeholder="搜索"
                  v-model="search"
                  @click:append="test"
                ></v-text-field>
              </v-row>
            </v-col>
          </v-row>
        </v-flex>
      </v-layout>
    </v-parallax>
  </div>
</template>

<script>
export default {
  name: 'Parallax',
  data: () => ({
    height: 250,
    search: null
  }),
  methods: {
    test () {
      if (this.search) {
        this.search = this.search.trim()
      }
    }
  }
}
</script>
