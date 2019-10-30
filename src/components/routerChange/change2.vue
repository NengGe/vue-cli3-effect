<template>
  <div class="change2">
    <div @click="gochange1" class="btn">去change1页面</div>
    <h3>
      这是test router2
    </h3>
  </div>
</template>
<script>
export default {
  methods: {
    gochange1() {
      this.$router.push('/routerChange/change1')
    }
  }
}
</script>
<style lang="less" scoped>
  .btn {
    text-align: center;
    padding: 10px;
    background: #ccc;
  }
  h3 {
    text-align: center;
    margin-top: 20px
  }
</style>
