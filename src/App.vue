<template>
  <div id="app">
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
  },
  mounted() {
  },
  methods: {
  }
}
</script>
<style lang="less">
  #app {
    height: 100%;
  }
</style>
