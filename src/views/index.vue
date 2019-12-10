<template>
  <div class="index">
    <div class="index-wrapper" ref="wrapper">
      <div class="box animated bounceInDown">
        <div
        class="effect pic"
        :class="[picShake?'shake':'']"
        @click="gopc"
        >pc端效果戳这里</div>
        <i class="iconfont iconshouzhi"></i>
      </div>
      <div class="box animated bounceInUp">
        <div class="move effect" :class="[moveShake?'shake':'']" @click="goMove">移动端效果戳这里</div>
        <i class="iconfont iconshouzhi"></i>
      </div>
    </div>
    <!-- <test :data="{}"></test> -->
  </div>
</template>
<script>
// import test from '@/components/test'
export default {
  name: 'index',
  components: {
    // test
  },
  data() {
    return {
      pic: null,
      move: null,
      picShake: false,
      moveShake: false
    }
  },
  mounted() {
    setTimeout(() => {
      let wrapper = this.$refs.wrapper
      this.pic = wrapper.children[0]
      this.move = wrapper.children[1]
      let { picEventFn, moveEventFn } = this
      this.pic.addEventListener('mouseover', picEventFn, false)
      this.move.addEventListener('mouseover', moveEventFn, false)
    }, 20)
  },
  destroyed() {
    let { picEventFn, moveEventFn } = this
    this.pic.removeEventListener('mouseover', picEventFn)
    this.move.removeEventListener('mouseover', moveEventFn)
  },
  methods: {
    picEventFn() {
      this.picShake = true
    },
    moveEventFn() {
      this.moveShake = true
    },
    gopc() {
      this.$router.push('/pcPage')
    },
    goMove() {
      this.$router.push('/movePage')
    }
  }
}
</script>
<style lang="less" scoped>
.index-wrapper {
  width: 300px;
  margin: 30px auto;
}
.effect {
  cursor: pointer;
  margin-top: 60px;
  font-size: 20px;
  &.pic {
    color: #ff6a00;
    opacity: 0.7;
    &:hover {
      opacity: 1;
    }
  }
  &.move {
    color: #3ee7ae;
    opacity: 0.7;
    &:hover {
      opacity: 1;
    }
  }
}
.iconfont.iconshouzhi {
  font-size: 26px;
  color: #6e55a8;
}
.box {
  text-align: center;
}
</style>
