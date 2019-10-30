<template>
  <div class="routerChange">
    <transition name="slide-left">
      <router-view></router-view>
    </transition>
  </div>
</template>
<script>
export default {
  name: 'routerChnage',
  data() {
    return {
      transtionName: 'slide-left'
    }
  },
  // beforeRouteUpdate(to, from, next) {
  //   // console.log(to.path)
  //   let fromPath = from.path.split('/')
  //   let toPath = to.path.split('/')
  //   this.transtionName = toPath < fromPath ? 'slide-right' : 'slide-left'
  //   next()
  // },
  watch: {
  },
  methods: {
    gochange2() {
      this.$router.push('change2')
    }
  }
}
</script>
<style lang="less" scoped>
</style>
