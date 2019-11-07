<template>
  <div id="plant">
    <Header />
    <Parallax
     :firstCategory="firstCategory"
     :img="img"
    />
    <Main />
    <Footer />
  </div>
</template>

<script>
import Header from '@/components/content/Header.vue'
import Footer from '@/components/content/Footer.vue'
import Parallax from '../components/Parallax'
import Main from './components/Main.vue'
export default {
  name: 'Plant',
  data () {
    return {
      firstCategory: ['kingdom', '植物界'],
      img: require('@/assets/images/header1.jpg')
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
