<template>
  <div class="pc-page">
    <h3 class="animated fadeInLeft">pc组件全览</h3>
    <div class="pc-page-btns">
      <el-button
      type="info" round class="animated fadeInDown"
      v-for="(item, index) in btnData"
      :key="index"
      @click.native="goEffectPage(item.routePath)"
      >{{item.label}}</el-button>
    </div>
  </div>
</template>
<script>
// import contentItem from './conetent-item'
export default {
  name: 'pcPage',
  components: {
  },
  data() {
    return {
      btnData: [
        {
          routePath: 'timeLine',
          label: '横向时间轴组件'
        },
        {
          routePath: 'pcScroll',
          label: 'pc滚动组件'
        },
        {
          routePath: '',
          label: 'tab切换过度效果'
        }
      ]
    }
  },
  methods: {
    goEffectPage(path) {
      // this.$router.push(path)
      let href = location.href
      let index = href.indexOf('#')
      let newUrl = href.slice(0, index + 1) + '' + (['/'].includes(path) ? path : `/${path}`)
      window.open().location.href = newUrl
    }
  }
}
</script>
<style lang="less" scoped>
h3 {
  text-align: center;
  padding: 20px 0px 0px 0px;
  color: #dfaf6e;
}
.pc-page-btns {
  padding: 50px 20px 20px 20px;
  display: flex;
  justify-content: center;
}
/deep/ .el-button+.el-button {
 margin-left: 20px;
}
</style>
