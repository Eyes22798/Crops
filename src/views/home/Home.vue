<template>
  <div
   id="Home"
   class="overflow-y-auto"
  >
    <Header />
    <HelloWorld />
    <Feature />
    <Steppers />
    <Footer />
  </div>
</template>

<script>
import Header from '@/components/content/Header.vue'
import Footer from '@/components/content/Footer.vue'
import HelloWorld from './components/HelloWorld'
import Feature from './components/Feature'
import Steppers from './components/Steppers'

export default {
  name: 'Home',
  components: {
    Feature,
    HelloWorld,
    Steppers,
    Header,
    Footer
  },
  data () {
    return {
      test: 'test'
    }
  }
}
</script>
