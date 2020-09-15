<template>
  <div class="sort-block-index">
    <el-select v-model="value" placeholder="请选择" @change="figureOut">
      <el-option
        v-for="item in options"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      >
      </el-option>
    </el-select>
    <div class="time-num" v-for="(ele, index) in timeText" :key="index" v-html="ele.text"></div>
  </div>
</template>
<script>
import { bubbleSort, selectSort, insertSort, shellSort, quickSort } from './sort.js'
export default {
  data() {
    return {
      value: '01',
      time: 0,
      timeText: [],
      options: [
        {
          label: '冒泡排序',
          value: '01'
        },
        {
          label: '选择排序',
          value: '02'
        },
        {
          label: '插入排序',
          value: '03'
        },
        {
          label: '希尔排序',
          value: '04'
        },
        {
          label: '快速排序',
          value: '05'
        },
        {
          label: '归并排序',
          value: '06'
        }
      ]
    }
  },
  computed: {
    sortWay() {
      return this.options.find(item => item.value === this.value).label
    }
  },
  created() {
    this.figureOut()
    // let arr = [9, 8, 6, 0]
  },
  methods: {
    figureOut() {
      let arr = []
      const { value } = this
      const item = this.timeText.find(item => item.value === this.value)
      if (item) return

      for (let i = 0; i < 20000; i++) {
        arr.push(Math.random())
      }
      const start = new Date().getTime()
      if (value === '01') {
        bubbleSort(arr)
      }
      if (value === '02') {
        selectSort(arr)
      }
      if (value === '03') {
        insertSort(arr)
        // console.log(insertSort([30, 8, 6, 10, 23, 11, 16]))
      }
      if (value === '04') {
        shellSort(arr)
        // console.log(shellSort([30, 8, 6, 10, 23, 11, 16]))
      }
      if (value === '05') {
        quickSort(arr, 0, arr.length - 1)
      }
      const end = new Date().getTime()
      // console.log()
      this.time = end - start
      const ele = this.options.find(item => item.value === this.value)
      this.timeText.push({ text: `${ele.label}方法耗时时长是:<span class="red">${this.time}ms</span>`, value: this.value })

      // console.log(this.timeText)
    }
  }
}
</script>
<style lang="less">
  .red {
    color: red;
    font-weight: bold;
  }
</style>
<style lang="less" scoped>
.sort-block-index {
  margin-top: 20px;
  text-align: center;
  .time-num {
    margin-top: 20px;
  }
}
</style>
