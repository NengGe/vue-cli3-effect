
<script>
export default {
  name: 'timeLine',
  props: {
    timeData: {
      type: Array,
      default() {
        return [
          {
            name: '一审诉讼申请',
            content: {
              date: '2019-08-09',
              site: '镇州高新区技术法院开发牛逼啊'
            }
          },
          {
            name: '一审诉讼申请',
            content: {
              date: '2019-08-09',
              site: '镇州高新区技术法院开发牛逼啊'
            }
          },
          {
            name: '一审诉讼申请',
            content: {
              date: '2019-08-09',
              site: '镇州高新区技术法院开发牛逼啊'
            }
          },
          {
            name: '一审诉讼申请',
            content: {
              date: '2019-08-09',
              site: '镇州高新区技术法院开发牛逼啊'
            }
          },
          {
            name: '一审诉讼申请',
            content: {
              date: '2019-08-09',
              site: '镇州高新区技术法院开发牛逼啊'
            }
          }
        ]
      }
    }
  },
  render(h) {
    let timeItem = this.timeData.map((item, index) => {
      return (
        <div class="time-line-item">
          <div class="top-item">
            {
              index > 0 ? (<div class="bar"></div>) : ''
            }
            <div class="dot"></div>
          </div>
          <div class="time-line-content">
            <h3 class="title">{item.name}</h3>
          </div>
        </div>
      )
    })
    return (
      <div class="time-line">
        <div class="line-box">
          {timeItem}
        </div>
      </div>
    )
  },
  data() {
    return {
      text: 'test'
    }
  },
  mounted() {
    setTimeout(() => {
    }, 20)
  },
  methods: {
  }
}
</script>
<style lang="less" scoped>
.time-line {
  width: 960px;
  margin: 60px auto;
  border: 1px solid #ccc;
  height: 100px;
}
.line-box {
  display: flex;
  flex-wrap: wrap;
}
.time-line-item {
  position: relative;
  .time-line-content {
    position: absolute;
    width: 180px;
    right: -88px;
    text-align: left;
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
    background: #1890FF;
    width: 8px;
    height: 8px;
    border-radius: 4px;
    margin: 0px 3px;
  }
  .bar {
    width: 190px;
    height: 2px;
    background: #1890FF;
  }
}
</style>
