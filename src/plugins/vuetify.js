import Vue from 'vue'
import '@mdi/font/css/materialdesignicons.css'
import Vuetify, { VSnackbar, VBtn, VIcon } from 'vuetify/lib'
import VuetifyToast from 'vuetify-toast-snackbar'

Vue.use(Vuetify, {
  components: {
    VSnackbar,
    VBtn,
    VIcon
  }
})

Vue.use(Vuetify)

Vue.use(VuetifyToast)

export default new Vuetify({
  icons: {
    iconfont: 'mdi'
  }
})
