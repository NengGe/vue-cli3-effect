<template>
  <div class="change1">
    <div @click="gochange2" class="btn">去change2页面</div>
    <h3>
      这是test router1
    </h3>
  </div>
</template>
<script>
export default {
  methods: {
    gochange2() {
      this.$router.push('/routerChange/change2')
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
