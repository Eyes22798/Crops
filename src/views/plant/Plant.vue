<template>
  <div id="plant">
    <Header />
    <Parallax />
    <Main />
    <Footer />
  </div>
</template>

<script>
import Header from '@/components/content/Header.vue'
import Footer from '@/components/content/Footer.vue'
import Parallax from './components/Parallax.vue'
import Main from './components/Main.vue'
export default {
  name: 'Plant',
  data () {
    return {
      height: 200
    }
  },
  components: {
    Header,
    Footer,
    Main,
    Parallax
  }
}
</script>

<style lang="stylus" scoped>
  #plant
    min-height 600px
</style>
