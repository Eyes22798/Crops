<template>
  <v-app id="userQuestion">
    <Header />
    <Parallax />
    <Main />
    <Footer />
  </v-app>
</template>

<script>
import Header from '@/components/content/Header.vue'
import Footer from '@/components/content/Footer.vue'
import Parallax from './components/Parallax'
import Main from './components/Main'
export default {
  name: 'UserQuestion',
  components: {
    Header,
    Parallax,
    Main,
    Footer
  }
}
</script>

<style lang="stylus" scoped>
  #userQuestion
    height 1000px
</style>
