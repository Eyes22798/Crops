<template>
  <div id="Home" class="overflow-y-auto">
    <SystemBar />
    <v-container>
      <Header />
    </v-container>
    <div >
      <HelloWorld />
      <Footer />
    </div>
  </div>
</template>

<script>
import HelloWorld from '@/components/HelloWorld.vue'
import Header from '@/components/content/Header.vue'
import Footer from '@/components/content/Footer.vue'
import SystemBar from './components/System-bar.vue'

export default {
  name: 'Home',
  components: {
    HelloWorld,
    Header,
    Footer,
    SystemBar
  },
  data () {
    return {
      test: 'test'
    }
  }
}
</script>
