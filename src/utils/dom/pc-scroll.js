
import prefixStyle from '@/utils/prefixStyle'
// import { getStyle } from '@/utils'
class PcScroll {
  constructor({ el, direction = 'x', downNumber = 16 } = {}) {
    this.$el = el
    this.downNumber = downNumber // 调控速度的系数,越大速度越快,惯性距离越长
    this.direction = direction
    this.$el && this.init()
  }
  init() {
    this.parent = this.$el.parentNode // 父元素
    this.start = 0
    this.startTime = 0
    this.endTIme = 0
    this.move = 0
    this.isMove = false // 是否执行移动回调函数的判断条件
    this.initPostion = 0 // 记录每次开始滑动的时候起始点坐标,算释放鼠标点击时候的速度有用
    this.timer = null // 是否执行惯性动画
    this.isforceMove = false // 没有触发mousemove事件不能触发惯性滚动(一次瞬时点击会触发惯性滚动)
    this.dis = 0
    this.setTransform(0)
    this.bindEvent()
  }
  setTransition(time = 300) {
    let preTransition = prefixStyle('transition')
    this.$el.style[preTransition] = `all ${time}ms ease-out`
  }
  setTransform(dis = 0) { // 设置transform值
    let { direction } = this
    let translateStr = direction === 'x' ? `translate3d(${dis}px, 0, 0)` : `translate3d(0, ${direction}px, 0)`
    this.$el.style[prefixStyle('transform')] = translateStr
  }
  bindEvent() {
    let { $el, mousedownHandle, mouseupHandle, parent, direction } = this
    let parentSize = direction === 'x' ? parent.clientWidth : parent.clientHeight
    let scrollSize = direction === 'x' ? $el.scrollWidth : $el.scrollHeight
    if (scrollSize <= parentSize) return null // 滚动容器尺寸不超过父容器时候不能移动

    $el.style[direction === 'x' ? 'width' : 'height'] = scrollSize + 'px' // 设置滚动容器宽度为内容宽度
    $el.addEventListener('mousedown', mousedownHandle.bind(this), false)
    window.addEventListener('mouseup', mouseupHandle.bind(this), false)
  }
  mousedownHandle(event) { // 鼠标向下点击时回调
    let { $el, mousemoveHandle } = this
    event = event || window.event
    this.setTransition(0)
    this.isMove = true
    this.timer = false // 一点击就禁止掉惯性动画
    this.startTime = new Date().getTime()
    this.initPostion = this.start = this.direction === 'x' ? event.clientX : event.clientY // 记录起始点位置
    $el.addEventListener('mousemove', mousemoveHandle.bind(this), false)
  }
  mousemoveHandle(event) { // 鼠标移动时回调
    if (!this.isMove) return
    let { direction, parent, $el } = this
    event = event || window.event
    this.isforceMove = true
    this.move = direction === 'x' ? event.clientX : event.clientY
    this.dis += this.move - this.start // 每次移动的距离
    this.start = this.move

    if (this.dis >= 0) { // 对向左向右滑动的距离做限制
      this.dis = this.dis <= 200 ? this.dis : 200
    } else {
      let leftLimit = $el.scrollWidth - parent.clientWidth
      this.dis = this.dis < (-leftLimit - 200) ? (-leftLimit - 200) : this.dis
    }

    this.setTransform(this.dis)
  }
  mouseupHandle() { // 鼠标释放时候回调
    this.isMove = false
    this.endTIme = new Date().getTime()
    if (!this.isforceMove) return
    this.isforceMove = false
    this.bounceBack()
    if (this.endTIme - this.startTime > 300) return null
    this.moveEase()
    // console.log(speed)
    this.removeEvent()
  }
  bounceBack() { // 超过一定极限需要回弹
    let { dis, $el, parent } = this
    let leftLimit = $el.scrollWidth - parent.clientWidth
    if (dis > 0) {
      this.setTransition()
      this.dis = 0
      this.setTransform(this.dis)
      return null
    }
    if (dis < -leftLimit) {
      this.setTransition()
      this.dis = -leftLimit
      this.setTransform(this.dis)
      return null
    }
    this.setTransform(this.dis)
  }
  moveEase() { // 释放鼠标点击后的惯性移动
    let { initPostion, move, startTime, endTIme, downNumber } = this
    let speed = ((move - initPostion) / (endTIme - startTime)) * downNumber // 释放鼠标时候的瞬时速度,模拟算法
    this.timer = true
    let moveEase = () => {
      let f = Math.min(Math.abs(speed) / 16, 1.6) // 摩擦力有极限,也就是加速度是有极限的,因此速度删减也是有极限的,这里指定极限是1.6
      // console.log(speed)
      this.timer && requestAnimationFrame(moveEase)
      if (speed < -0.3) {
        speed += f
      } else if (speed > 0.3) {
        speed -= f
      } else {
        speed = 0
        this.timer = false
      }
      this.dis += speed
      this.bounceBack()
      this.setTransition(0) // 在回弹距离内的时候有惯性移动,transition会有默认300ms延时,第二次在距离内滑动时候会有明显滞后,所以每次惯性滑动设置为0ms
      // this.setTransform(this.dis)
    }
    moveEase()
  }
  removeEvent() { // 解除监听事件
    let { $el, mousedownHandle, mouseupHandle, mousemoveHandle } = this
    $el.removeEventListener('mousedown', mousedownHandle)
    $el.removeEventListener('mousemove', mousemoveHandle)
    window.removeEventListener('mouseup', mouseupHandle)
  }
}
export default PcScroll
