<template>
  <div id="app">
    <router-view />
  </div>
</template>
<script>

export default {
  name: 'app',
};
</script>
<style lang="scss">
@import 'assets/scss/override';
@import '../node_modules/bootstrap/scss/bootstrap';
@import '../node_modules/bootstrap-vue/src/index.scss';
@import 'assets/scss/style';
</style>
