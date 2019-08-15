<template>
  <div class="time-line-demo">
    <div class="select-box">
      <span>改变布局宽度看效果: </span>
      <el-select v-model="widthData" placeholder="请选择">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
        </el-option>
      </el-select>
    </div>
    <timeLine :timeData="timeData" :widthData="widthData"></timeLine>
  </div>
</template>
<script>
import timeLine from './index'
export default {
  components: {
    timeLine
  },
  data() {
    return {
      timeData: [],
      widthData: 960,
      options: [
        {
          label: '960px',
          value: 960
        },
        {
          label: '1100px',
          value: 1100
        },
        {
          label: '1200px',
          value: 1200
        }
      ]
    }
  },
  watch: {
    widthData() {
      console.log(this.widthData)
    }
  },
  created() {
    setTimeout(() => {
      this.timeData = [
        {
          name: '一审诉讼申请',
          content: {
            date: '2019-08-09',
            site: '镇州高新区技术法院开发牛逼啊'
          }
        },
        {
          name: '二审牛逼',
          content: {
            date: '2019-08-09',
            site: '镇州高新区技术法院开发牛逼啊'
          }
        },
        {
          name: '三审厉害',
          content: {
            date: '2019-08-09',
            site: '镇州高新区技术法院开发牛逼啊'
          }
        },
        {
          name: '四申绝了',
          content: {
            date: '2019-08-09',
            site: '镇州高新区技术法院开发牛逼啊'
          }
        },
        {
          name: '回到一审',
          content: {
            date: '2019-08-09',
            site: '镇州高新区技术法院开发牛逼啊'
          }
        },
        {
          name: '二审继续',
          content: {
            date: '2019-08-09',
            site: '镇州高新区技术法院开发牛逼啊'
          }
        },
        {
          name: '三审还来',
          content: {
            date: '2019-08-09',
            site: '镇州高新区技术法院开发牛逼啊'
          }
        },
        {
          name: '四审再来',
          content: {
            date: '2019-08-09',
            site: '镇州高新区技术法院开发牛逼啊'
          }
        },
        {
          name: '五审超神',
          content: {
            date: '2019-08-09',
            site: '镇州高新区技术法院开发牛逼啊'
          }
        }
      ]
    }, 20)
  }
}
</script>
<style lang="less" scoped>
.select-box {
  margin-top: 20px;
  text-align: center;
}
</style>
