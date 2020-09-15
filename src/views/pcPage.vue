<template>
  <div class="pc-page" ref="pcPage">
    <p class="animated fadeInLeft header">pc组件全览</p>
    <div class="pc-page-btns">
      <el-button
        type="info"
        round
        class="animated fadeInDown"
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
  components: {},
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
          routePath: 'tab',
          label: 'tab切换过度效果'
        },
        {
          routePath: 'select',
          label: '条件选择框'
        },
        {
          routePath: 'sort',
          label: '排序耗时测试'
        }
      ]
    }
  },
  mounted() {
    // setTimeout(() => {
    //   this.$getPdf({
    //     element: this.$refs.pcPage
    //   })
    // }, 1000)
  },
  methods: {
    goEffectPage(path) {
      // this.$router.push(path)
      let href = location.href
      let index = href.indexOf('#')
      let newUrl =
        href.slice(0, index + 1) +
        '' +
        (['/'].includes(path) ? path : `/${path}`)
      window.open().location.href = newUrl
    }
  }
}
</script>
<style lang="less" scoped>
p.header {
  text-align: center;
  padding: 20px 0px 0px 0px;
  text-align: center;
  font-weight: bold;
  color: #dfaf6e;
}
// P {
//   padding: 30px 0px;
// }
.pc-page-btns {
  padding: 50px 20px 20px 20px;
  display: flex;
  justify-content: center;
}
/deep/ .el-button + .el-button {
  margin-left: 20px;
}
// .pc-page {
//   /deep/ .el-button {
//     span {
//       color: black;
//     }
//   }
// }
</style>
