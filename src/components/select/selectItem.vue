<template>
  <transition name="scale">
    <div
      class="select-wrapper"
      ref="selectWrapper"
      v-show="isActive"
    >
      <ul class="condition-ul">
        <li
          class="select-item"
          v-for="(item, index) in conditionData"
          :class="[activeIndex===index?'item-active':'']"
          :key="index"
          @click.stop="selectItem(item, index)"
        >
          {{item.condition}}
        </li>
      </ul>
    </div>
  </transition>
</template>
<script>
export default {
  props: {},
  data() {
    return {
      conditionData: [],
      fn: null,
      isShow: false,
      activeIndex: 0,
      isActive: this.active
    }
  },
  methods: {
    transData(data = [], index, fn) {
      // console.log(index)
      this.activeIndex = index // 初始化activeIndex

      data.length && (this.conditionData = data)
      if (fn && typeof fn === 'function') {
        this.fn = fn
      }
    },
    fixedPosition(pos, isActive) {
      this.$nextTick(() => {
        let { x, y } = pos
        let top = y + 5
        let left
        this.isActive = isActive
        this.isActive = !this.isActive
        let vieWidth =
          document.documentElement.clientWidth || document.body.clientWidth

        this.$nextTick(() => {
          let wrapper = this.$refs.selectWrapper
          let wrapperWidth = wrapper.clientWidth
          // let wrapperHeight = wrapper.clientHeight
          if (x < wrapperWidth / 2) {
            // 左边距离不够时
            left = 0
            wrapper.style.cssText = `left:${left}px;top:${top}px`
          } else if (vieWidth - x < wrapperWidth / 2) {
            // 右边距离不够时
            left = 0
            wrapper.style.cssText = `left:${left}px;top:${top}px`
          } else {
            wrapper.style.cssText = `left:${x -
              wrapperWidth / 2}px;top:${top}px`
          }
        })
      })
    },
    hide() {
      this.isActive = false
    },
    selectItem(item, index) {
      this.hide()
      if (this.activeIndex === index) return
      this.activeIndex = index
      this.fn(item, index)
    }
  }
}
</script>
<style lang="less" scoped>
.select-wrapper {
  position: absolute;
  background: #f2f2f2;
  font-size: 14px;
  border-radius: 6px;
  // transition: all .3s;
  // transform: scaleY(0);
  &.active {
    transform: scaleY(1)
  }
  .select-item {
    padding: 6px 18px;
    cursor: pointer;
    &:hover {
      background:#ccc;
    }
    // &.item-active {
    //   background:#ccc;
    // }
  }
}
// .scale-enter, .scale-leave-to{
//   transform: translateY(0);
// }
// .scale-enter-active, .scale-leave-active {
//   transition: all .3s;
//   transform: translateY(1);
// }
</style>
