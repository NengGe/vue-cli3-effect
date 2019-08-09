<template>
  <div id="app">
    <transition :name="isTransition?animateName:''">
      <router-view class="view"></router-view>
    </transition>
  </div>
</template>
<script>
export default {
  data() {
    return {
      animateName: 'slide-left',
      isTransition: false
    }
  }
}
</script>
<style lang="less">
</style>
