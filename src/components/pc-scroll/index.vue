<template>
  <div class="scroll-wrapper">
    <div class="scroll-content" ref="content">
      scrollvxvxccccccccccccccccccccccccccccccccccccccdfdslfjkdslfjdslkfjdskfjdskfjdskfjdskfjdskfjkdsfjdskfkdsdkfsdkjfdskfjdskfjdskfjdsksdlfksdjflsfjlkdsjflksjfkdsljfkdslfjksdcccccccccccccccccccccccccccccccccccccccccccccccccccccsdjflsjflkdsfjsdlfjsccccccccccccccccccc
    </div>
  </div>
</template>
<script>
// import prefixStyle from '@/utils/prefixStyle'
import PcScroll from '@/utils/dom/pc-scroll'
export default {
  data() {
    return {
    }
  },
  created() {
    // console.log(prefixStyle('transform'))
    // console.log(PcScroll)
  },
  mounted() {
    setTimeout(() => {
      let el = this.$refs.content
      let pcscroll = new PcScroll({ el })
      console.log(pcscroll)
    }, 17)
  }
}
</script>
<style lang="less" scoped>
.scroll-wrapper {
  width: 960px;
  margin: 100px auto;
  height: 260px;
  border: 1px solid #cccccc;
  overflow: hidden;
  .scroll-content {
    height: 100%;
  }
}
</style>
