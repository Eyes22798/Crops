<template>
  <v-parallax :src="require('@/assets/images/header2.jpg')" :height="height"></v-parallax>
</template>

<script>
export default {
  name: 'Parallax',
  data () {
    return {
      height: 150
    }
  }
}
</script>
