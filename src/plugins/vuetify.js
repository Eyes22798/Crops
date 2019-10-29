import Vue from 'vue'
import '@mdi/font/css/materialdesignicons.css'
import 'font-awesome/css/font-awesome.min.css'
import Vuetify, {
  VSnackbar,
  VBtn,
  VIcon
} from 'vuetify/lib'
import { Ripple } from 'vuetify/lib/directives'
import VuetifyToast from 'vuetify-toast-snackbar'

Vue.use(Vuetify, {
  components: {
    VSnackbar,
    VBtn,
    VIcon
  },
  directives: {
    Ripple
  },
  theme: {
    primary: '#ee44aa',
    secondary: '#424242',
    accent: '#82B1FF',
    error: '#FF5252',
    info: '#2196F3',
    success: '#4CAF50',
    warning: '#FFC107'
  },
  customProperties: true
})

Vue.use(Vuetify)

Vue.use(VuetifyToast)

export default new Vuetify({
  icons: {
    iconfont: 'mdi' || 'fa4'
  }
})
