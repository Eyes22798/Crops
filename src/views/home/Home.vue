<template>
  <div
   id="Home"
   class="overflow-y-auto"
  >
    <Header />
    <HelloWorld />
    <Feature />
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
import Steppers from './components/Steppers'
import Parallaxs from './components/Parallaxs'
import Contact from './components/Contact'

export default {
  name: 'Home',
  components: {
    Feature,
    HelloWorld,
    Steppers,
    Parallaxs,
    Contact,
    Header,
    Footer
  }
}
</script>
