<template>
  <div id="enemy">
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
  name: 'Enemy',
  data () {
    return {
      firstCategory: ['kingdom', '动物界'],
      img: require('@/assets/images/header2.jpg')
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
