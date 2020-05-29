<template>
  <v-parallax :src="require('@/assets/images/bg7.jpg')" :height="height"></v-parallax>
</template>

<script>
export default {
  name: 'Parallax',
  data () {
    return {
      height: 200
    }
  }
}
</script>
