import 'animate.css'
import './assets/less/commom.less'
import 'element-ui/lib/theme-chalk/index.css'

import Vue from 'vue'
// import ElementUI from 'element-ui'
import App from './App.vue'
import router from './router'
import store from './store/index'

import { Button, Select, Option } from 'element-ui'
Vue.component(Button.name, Button)
Vue.component(Select.name, Select)
Vue.component(Option.name, Option)
// Vue.use(ElementUI)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
