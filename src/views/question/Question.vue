<template>
  <v-app id="question">
    <Header />
    <Parallax />
    <Main />
    <Contact />
    <Footer />
  </v-app>
</template>

<script>
import Header from '@/components/content/Header.vue'
import Footer from '@/components/content/Footer.vue'
import Parallax from '@/views/user/UserQuestion/components/Parallax'
import Main from './components/Main'
import Contact from './components/Contact'
export default {
  name: 'Question',
  components: {
    Header,
    Footer,
    Parallax,
    Main,
    Contact
  }
}
</script>

<style lang="stylus" scoped>
  #question
    min-height 1000px
</style>
