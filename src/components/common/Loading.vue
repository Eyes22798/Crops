<template>
  <v-app>
    <div class="text-center">
      <v-progress-circular :size="50" color="primary" indeterminate></v-progress-circular>
    </div>
  </v-app>
</template>

<script>
export default {
  name: 'Loading'
}
</script>

<style>
.request-loading-component {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background-color: rgb(33, 33, 33, 0.06);
  font-size: 150px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  z-index: 999999;
}
</style>
