<template>
  <div class="text-center">
    <v-snackbar
      v-model="snackbar"
      :bottom="y === 'bottom'"
      :color="color"
      :left="x === 'left'"
      :multi-line="mode === 'multi-line'"
      :right="x === 'right'"
      :timeout="timeout"
      :top="y === 'top'"
      :vertical="mode === 'vertical'"
    >
      {{ text }}
      <v-btn
        color="red"
        text
        @click="snackbar = false"
      >
        关闭
      </v-btn>
    </v-snackbar>
  </div>
</template>

<script>
export default {
  name: 'SnackBar',
  data () {
    return {
      color: '',
      mode: '',
      snackbar: false,
      multiLine: true,
      text: 'Hello, I\'m a snackbar',
      timeout: 6000,
      x: 'right',
      y: 'top'
    }
  },
  methods: {
    getaData () {
      console.log(11)
    },
    toast () {
      this.$toast('This is an information.', {
        x: 'right',
        y: 'top',
        timeout: 10000,
        icon: 'info',
        dismissable: false,
        showClose: true
      })
    }
  }
}
</script>
