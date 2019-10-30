<template>
  <div class="move-wrapper">
    <ul>
      <li class="move-effect-item" v-for="(item, index) in effects" :key="index" @click="goRouter">{{item.name}}</li>
    </ul>
  </div>
</template>
<script>
let effects = [
  {
    name: '路由切换效果',
    path: 'routerChange'
  }
]
export default {
  name: 'movePage',
  data() {
    return {
      effects
    }
  },
  methods: {
    goRouter() {
      this.$router.push('/routerChange')
    }
  }
}
</script>
<style lang="less" scoped>
  .move-wrapper {
    padding: 0px 15px;
    .move-effect-item {
      text-align: center;
      background: #1989fa;
      color: #fff;
      opacity: .8;
      border-radius: 10px;
      padding: 12px 0px;
      margin-top: 15px;
      &:nth-last-of-type(1) {
        margin-bottom: 15px;
      }
      &:active {
        opacity: 1;
      }
    }
  }
</style>
