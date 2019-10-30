<template>
  <div id="app">
    <!-- <transition :name="isTransition?animateName:''"> -->
      <router-view class="view"></router-view>
    <!-- </transition> -->
  </div>
</template>
<script>
export default {
  data() {
    return {
      animateName: 'slide-left',
      isTransition: true
    }
  }
}
</script>
<style lang="less">
  #app {
    height: 100%;
  }
</style>
