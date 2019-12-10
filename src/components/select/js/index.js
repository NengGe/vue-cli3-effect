import selecItem from '../selectItem'
import index from '../index'
export default {
  install(Vue) {
    let SelectConstructor = Vue.extend(selecItem)
    let selectComponent = new SelectConstructor()

    document.body.appendChild(selectComponent.$mount().$el)
    Vue.prototype.$selectComponent = selectComponent
    // 全局注册组件
    Vue.component(index.name, index)
    window.addEventListener('click', (ev) => {
      selectComponent.hide()
    }, false)
  }
}
