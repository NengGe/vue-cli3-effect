//subscribe.js
class Subscribe {
  constructor() {
    //创建容器
    this.pond = [];
  }
  //向容器中增加方法，注意去重
  add(fn) {
    let pond = this.pond,
      isExist = false;
    //去重环节
    pond.forEach(item => item === fn ? isExist = true : null);
    !isExist ? pond.push(fn) : null;
  }
  remove(fn) {
    let pond = this.pond;
    pond.forEach((item, index) => {
      if (item === fn) {
        //提一下我在这里遇到的坑，这里如果写item=null是无效的
        //例子：let a = {name: funtion(){}};
        //let b = a.name;
        //这个时候操作b的值对于a的name属性是没有影响的
        pond[index] = null;
      }
    })
  }
  fire(...arg) {
    let pond = this.pond;
    for (let i = 0;i < pond.length;i++) {
      let item = pond[i];
      // 如果item为空了,最好把它删除掉
      if (item === null) {
        pond.splice(i, 1);
        // 如果用了splice要防止数组塌陷问题，即删除了一个元素后，后面所有元素的索引默认都会减1
        i--;
        continue;
      }
      item(...arg);
    }
  }
}
window.Subscribe = Subscribe

if (typeof Subscribe === 'undefined') {
  throw new ReferenceError('没有引入subscribe.js!');
}

class Drag {
  constructor(ele) {
      this.ele = ele;
      ['strX', 'strY', 'strL', 'strT', 'curL', 'curT'].forEach(item => {
          this[item] = null;
      });

      this.subDown = new Subscribe;
      this.subMove = new Subscribe;
      this.subUp = new Subscribe;

      //=>DRAG-START
      this.DOWN = this.down.bind(this);
      this.ele.addEventListener('mousedown', this.DOWN);
  }

  down(ev) {
      let ele = this.ele;
      this.strX = ev.clientX;
      this.strY = ev.clientY;
      this.strL = ele.offsetLeft;
      this.strT = ele.offsetTop;

      this.MOVE = this.move.bind(this);
      this.UP = this.up.bind(this);
      document.addEventListener('mousemove', this.MOVE);
      document.addEventListener('mouseup', this.UP);

      this.subDown.fire(ele, ev);
  }

  move(ev) {
      let ele = this.ele;
      this.curL = ev.clientX - this.strX + this.strL;
      this.curT = ev.clientY - this.strY + this.strT;
      ele.style.left = this.curL + 'px';
      ele.style.top = this.curT + 'px';

      this.subMove.fire(ele, ev);
  }

  up(ev) {
      document.removeEventListener('mousemove', this.MOVE);
      document.removeEventListener('mouseup', this.UP);

      this.subUp.fire(this.ele, ev);
  }
}

window.Drag = Drag;

//dragExtend.js
function extendDrag(drag) {
  //鼠标按下
  let stopAnimate = function stopAnimate(curEle) {
      clearInterval(curEle.flyTimer);
      curEle.speedFly = undefined;
      clearInterval(curEle.dropTimer);
  };
  //鼠标移动
  let computedFly = function computedFly(curEle) {
      if (!curEle.lastFly) {
          curEle.lastFly = curEle.offsetLeft;
          curEle.speedFly = 0;
          return;
      }
      curEle.speedFly = curEle.offsetLeft - curEle.lastFly;
      curEle.lastFly = curEle.offsetLeft;
  };
  //水平方向的运动
  let animateFly = function animateFly(curEle) {
      let minL = 0,
          maxL = document.documentElement.clientWidth - curEle.offsetWidth,
          speed = curEle.speedFly;
      curEle.flyTimer = setInterval(() => {
          speed *= .98;
          Math.abs(speed) <= 0.1 ? clearInterval(animateFly):null;
          let curT = curEle.offsetLeft;
          curT += speed;
          if (curT >= maxL) {
              curEle.style.left = maxL + 'px';
              speed *= -1;
              return;
          }
          if (curT <= minL) {
              curEle.style.left = minL + 'px';
              speed *= -1;
              return;
          }
          curEle.style.left = curT + 'px';
      }, 20);
  };
  //竖直方向的运动
  let animateDrop = function animateDrop(curEle) {
      let speed = 9.8,
          minT = 0,
          maxT = document.documentElement.clientHeight - curEle.offsetHeight;
      curEle.dropTimer = setInterval(() => {
          speed += 10;
          speed *= .98;
          Math.abs(speed) <= 0.1 ? clearInterval(animateFly):null;
          let curT = curEle.offsetTop;
          curT += speed;
          if (curT >= maxT) {
              curEle.style.top = maxT + 'px';
              speed *= -1;
              return;
          }
          if (curT <= minT) {
              curEle.style.top = minT + 'px';
              speed *= -1;
              return;
          }
          curEle.style.top = curT + 'px';
      }, 20);
  };
  drag.subDown.add(stopAnimate);
  drag.subMove.add(computedFly);
  drag.subUp.add(animateFly);
  drag.subUp.add(animateDrop);
};

