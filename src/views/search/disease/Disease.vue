<template>
  <div id="disease">
    <Header />
    <Parallax />
    <Main />
    <Footer />
  </div>
</template>

<script>
import Header from '@/components/content/Header.vue'
import Footer from '@/components/content/Footer.vue'
import Parallax from './components/Parallax'
export default {
  name: 'Disease',
  components: {
    Header,
    Footer,
    Parallax
  }
}
</script>

<style lang="stylus" scoped>
  #disease
    min-height 1000px
</style>
