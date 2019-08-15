
<script>
import { getStyle } from '@/utils'
export default {
  name: 'timeLine',
  props: {
    timeData: {
      type: Array,
      default() {
        return [
        ]
      }
    },
    widthData: {
      type: Number,
      default: 960
    }
  },
  render(h) {
    let timeItem = this.timeData.map((item, index) => {
      return (
        <div class="time-line-item">
          <div class="top-item">
            {index > 0 ? <div class="bar"></div> : ''}
            <div class="dot">
              <div class="time-line-content">
                <h3 class="title">{item.name}</h3>
                <div class="site">地址:{item.content.site}</div>
                <div class="date">日期:{item.content.date}</div>
              </div>
            </div>
            {this.endArr.indexOf(index) > -1 ? <div class="bar bar1"></div> : ''}
          </div>
        </div>
      )
    })
    return (
      <div class="time-line" style={{ width: `${this.widthData}px` }}>
        <div class="line-box">{timeItem}</div>
      </div>
    )
  },
  data() {
    return {
      text: 'test',
      endArr: []
    }
  },
  mounted() {
    // console.log(this.timeData)
    if (this.timeData.length) {
      setTimeout(this.flexViews, 20)
    }
  },
  watch: {
    timeData() {
      if (this.timeData.length) {
        this.$nextTick(this.flexViews)
      }
    },
    widthData() {
      if (this.timeData.length) {
        this.$nextTick(this.flexViews)
      }
    }
  },
  methods: {
    flexViews() {
      let timeLineWidth = document.querySelector('.time-line').clientWidth
      let lineBox = document.querySelector('.line-box')
      let topItem = document.querySelectorAll('.top-item')[1]
      // console.log(topItem)
      let paddingValue =
        getStyle(lineBox, 'padding')
          .split(' ')[1]
          .match(/\d+/)[0] - 0 // 得到lineBox的padding值

      if (!topItem) return null
      // 第一行中由于开头时间线item 只有一个圆点 接下来只需要算出剩余空间能放几个完整的时间线item(圆点width为8 margin为 3, 这里就按照样式的值来设定了)
      let timeNum =
        (timeLineWidth - paddingValue * 2 - (8 + 3 * 2)) /
        topItem.clientWidth

      // 向下取整
      timeNum = Math.floor(timeNum)
      let len = this.timeData.length
      this.endArr = this.findEndN(len, timeNum)
      // 每一行末尾的单个时间轴后面补充一段横线, 最后一行末尾不加
      this.$nextTick(() => {
        // 第一行剩余宽度
        let restWidth = timeLineWidth - paddingValue * 2 - (8 + 3 * 2) - timeNum * (topItem.clientWidth)
        let bar1s = document.querySelectorAll('.bar1')
        Array.prototype.forEach.call(bar1s, (item, index) => {
          item.style.width = (restWidth < 100 ? 10 : restWidth * 0.4) + 'px'
        })
      })
    },
    findEndN(len, timeNum, arr = []) {
      // 找出每一行时间轴的末尾item的索引,不包括最后一行末尾,并用数组保存
      let index = 0
      let fn = (function fn() {
        index++
        let n = timeNum * index
        if (n < len - 1) {
          arr.push(n)
          fn()
        } else {
        }
        return arr
      })()
      // console.log(fn)
      return fn
    }
  }
}
</script>
<style lang="less" scoped>
.time-line {
  // width: 1200px;
  margin: 60px auto;
  // border: 1px solid #ccc;
  height: 100%;
}
.line-box {
  display: flex;
  flex-wrap: wrap;
  padding: 0px 88px;
  // transform: translateX(88px)
  // justify-content: center;
}
.time-line-item {
  position: relative;
  height: 140px;
  .time-line-content {
    position: absolute;
    width: 180px;
    right: -83px;
    top: 16px;
    text-align: left;
    font-size: 13px;
    .title {
      text-align: center;
      font-size: 16px;
    }
  }
}
.top-item {
  display: flex;
  align-items: center;
  .dot {
    position: relative;
    background: #1890ff;
    width: 8px;
    height: 8px;
    border-radius: 4px;
    margin: 0px 3px;
  }
  .bar1 {
    width: 0px;
    margin: 0px;
  }
  .bar {
    width: 190px;
    height: 2px;
    background: #1890ff;
  }
}
</style>
