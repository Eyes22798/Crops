import Vue from 'vue'
// 拿到 Vue 原型上的 $toast 对象
const prototype = Vue.prototype
export function ifEmety (data) {
  for (let key in data) {
    if (!data[key]) {
      prototype.$toast('请完整填写表单', {
        x: 'right',
        y: 'top',
        icon: 'info',
        dismissable: false,
        showClose: true
      })
      return false
    }
  }
  return true
}
