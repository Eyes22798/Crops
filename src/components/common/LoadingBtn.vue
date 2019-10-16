<template>
  <v-btn
    :loading="loading"
    :disabled="disabled"
    :color="color"
    :phone="phone"
    @click="loader = 'loading';getSendCode(phone)"
    :class="classStyle"
  >{{ loadingText }}</v-btn>
</template>

<script>
import { phoneRex } from '@/common/const.js'
export default {
  name: 'LoadingBtn',
  props: {
    color: {
      type: String,
      defalut: 'info'
    },
    btnText: {
      type: String,
      defalut: '点击'
    },
    phone: {
      type: [Number, String],
      default: 0
    },
    classStyle: {
      type: String
    }
  },
  data () {
    return {
      loader: null,
      loading: false,
      disabled: false,
      loadingText: this.btnText,
      loadingSecond: 60,
      phoneMeta: false
    }
  },
  watch: {
    loader () {
      const l = this.loader
      this.disabled = true
      this[l] = !this[l]
      setTimeout(() => {
        this[l] = false
        this.loadingText = `重发(${this.loadingSecond}s)`
        this.flashText()
      }, 1000)
      this.loader = null
    }
  },
  methods: {
    flashText () {
      let number = this.loadingSecond - 1
      let nIntervId = setInterval(() => {
        this.loadingText = `重发(${number--}s)`
        if (number < 0) {
          clearInterval(nIntervId)
          this.loadingText = '重新获得'
          this.disabled = false
        }
      }, 1000)
    },
    getSendCode (phone) {
      const getMessage = (phone) => {
        if (!phone) return ['请输入手机号', 'error']
        return phoneRex.test(phone) ? undefined : ['请输入正确的手机号!', 'error']
      }
      if (getMessage(phone)) {
        this.loader = null
        this.$toast(`${getMessage(phone)[0]}`, {
          x: 'right',
          y: 'top',
          icon: 'info',
          color: `${getMessage(phone)[1]}`,
          dismissable: false,
          showClose: true,
          timeout: 800
        })
      } else {
        this.$api.common
          .registerSendCode({
            phone: this.phone
          })
          .then(res => {
            if (res.code === 200) {
              this.$toast('短信已发送!', {
                x: 'right',
                y: 'top',
                icon: 'info',
                dismissable: false,
                showClose: true,
                timeout: 800
              })
              this.phoneMeta = true
              this.$emit('phoneMetaFun', this.phoneMeta)
            }
          })
      }
    }
  }
}
</script>

<style>
.custom-loader {
  animation: loader 1s infinite;
  display: flex;
}
@-moz-keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
@-webkit-keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
@-o-keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
@keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
