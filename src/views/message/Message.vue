<template>
  <v-app id="message">
    <Header />
    <Parallax />
    <Main />
    <Footer />
  </v-app>
</template>

<script>
import Header from '@/components/content/Header.vue'
import Footer from '@/components/content/Footer.vue'
import Parallax from '@/views/user/UserQuestion/components/Parallax'
import Main from './components/Main'
export default {
  name: 'Message',
  components: {
    Header,
    Footer,
    Parallax,
    Main
  }
}
</script>
