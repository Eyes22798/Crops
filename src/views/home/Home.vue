<template>
  <div
   id="Home"
   class="overflow-y-auto"
  >
    <Header />
    <HelloWorld />
    <Feature />
    <Main />
    <Steppers />
    <Parallaxs />
    <Footer />
  </div>
</template>

<script>
import Header from '@/components/content/Header.vue'
import Footer from '@/components/content/Footer.vue'
import HelloWorld from './components/HelloWorld'
import Feature from './components/Feature'
import Main from './components/Main'
import Steppers from './components/Steppers'
import Parallaxs from './components/Parallaxs'
// import Contact from './components/Contact'

export default {
  name: 'Home',
  components: {
    Feature,
    Main,
    HelloWorld,
    Steppers,
    Parallaxs,
    Header,
    Footer
  }
}
</script>
