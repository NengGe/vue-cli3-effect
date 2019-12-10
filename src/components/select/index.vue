<template>
  <div class="select-target" ref="target">
    <button @click.stop="select">{{condition}}</button>
  </div>
</template>
<script>
export default {
  name: 'selectCondition',
  props: {
    ind: { // 指定对应条件
      type: Number,
      default: 0
    },
    conditionData: {
      type: Array,
      default() {
        return []
      }
    }
  },
  created() {
    this.condition = this.conditionData[this.ind].condition
  },
  data() {
    return {
      activeIndex: this.ind, // 保存条件索引
      condition: ''
    }
  },
  methods: {
    select() {
      let pos = this.getCenterPos()
      let _this = this
      this.$selectComponent.transData(this.conditionData, this.activeIndex, function(item, index) {
        _this.activeIndex = index
        _this.condition = item.condition
        _this.$emit('changeCondition', item, index)
      })
      this.$selectComponent.fixedPosition(pos, false)
    },
    getCenterPos() {
      let target = this.$refs.target
      let targetWidth = target.clientWidth
      let targetHeight = target.clientHeight
      let offsetLeft = target.offsetLeft
      let offsetTop = target.offsetTop
      return {
        x: offsetLeft + targetWidth / 2,
        y: offsetTop + targetHeight
      }
    }
  }
}
</script>
<style lang="less" scoped>
.select-target {
  display: inline-block;
}
</style>
