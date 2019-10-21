<template>
  <div class="tab-wrapper">
    <div class="tab-header">
      <div
        class="header-item"
        v-for="(item, index) in headerItems"
        :key="index"
        @click="handleClick(item, index)"
      >
        <span
          class="header-s"
          :class="[index === activeIndex ? 'active' : '']"
          >{{ item }}</span
        >
      </div>
    </div>
    <div class="tab-content-box">
      <transition name="slide-left">
        <slot name="content" :index="activeIndex">
          <div class="content-item" key="content1" v-if="activeIndex===0">内容一</div>
          <div class="content-item" key="content2" v-else-if="activeIndex===1">内容二</div>
          <div class="content-item" key="content3" v-else-if="activeIndex===2">内容三</div>
          <div class="content-item" key="content4" v-else>内容四</div>
        </slot>
      </transition>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      activeIndex: 0,
      headerItems: ['选项一', '选项二', '选项三', '选项四']
    }
  },
  methods: {
    handleClick(item, index) {
      this.activeIndex = index
    }
  }
}
</script>
<style lang="less" scoped>
.tab-wrapper {
  width: 600px;
  margin: 30px auto;
  .tab-header {
    display: flex;
    .header-s {
      display: inline-block;
      padding: 8px 16px;
      cursor: pointer;
      &.active {
        background: #409eff;
        color: white;
        font-weight: bold;
        border-radius: 5px;
      }
    }
  }
  .tab-content-box {
    position: relative;
  }
}
</style>
