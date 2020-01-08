<template>
  <div class="scroll-wrapper">
    <div class="scroll-content" ref="content">
      <slot name="element-box">
        <div class="element-box">
          <img src="./assets/img/1.jpg" alt="" width="300px" height="200px" />
          <img src="./assets/img/2.jpg" alt="" width="300px" height="200px" />
          <img src="./assets/img/3.jpg" alt="" width="300px" height="200px" />
          <img src="./assets/img/4.jpg" alt="" width="300px" height="200px" />
          <img src="./assets/img/5.jpg" alt="" width="300px" height="200px" />
          <img src="./assets/img/6.jpg" alt="" width="300px" height="200px" />
          <img src="./assets/img/7.jpg" alt="" width="300px" height="200px" />
          <img src="./assets/img/8.jpg" alt="" width="300px" height="200px" />
          <img src="./assets/img/9.jpg" alt="" width="300px" height="200px" />
        </div>
      </slot>
    </div>
  </div>
</template>
<script>
// import prefixStyle from '@/utils/prefixStyle'
import PcScroll from '@/utils/dom/pc-scroll'
export default {
  data() {
    return {}
  },
  created() {
    // console.log(prefixStyle('transform'))
    // console.log(PcScroll)
  },
  mounted() {
    setTimeout(() => {
      let el = this.$refs.content
      let pcscroll = new PcScroll({ el })
      let imgList = [
        ...document.querySelectorAll('img'),
        document.querySelector('.element-box')
      ]
      Array.prototype.forEach.call(imgList, function(ele, item) {
        ele.addEventListener('mousedown', ev => {
          ev.preventDefault()
        })
      })
      console.log(pcscroll)
    }, 17)
  }
}
</script>
<style lang="less" scoped>
.scroll-wrapper {
  width: 960px;
  margin: 100px auto;
  // height: 260px;
  border: 1px solid #cccccc;
  cursor: pointer;
  overflow: hidden;
  .scroll-content {
    height: 100%;
  }
  .element-box {
    display: inline-flex;
    height: 260px;
    flex-wrap: nowrap;
    align-items: center;
    width: auto;
    & > img {
      &:nth-last-of-type(1) {
        margin-right: 20px;
      }
      margin-left: 20px;
      -webkit-user-select: none;
      -moz-user-select: none;
      -khtml-user-select: none;
      -ms-user-select: none;

      /* 以下两个属性目前并未支持，写在这里为了减少风险 */
      -o-user-select: none;
      user-select: none;
    }
  }
}

</style>
