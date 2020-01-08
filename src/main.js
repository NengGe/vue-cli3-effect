import 'animate.css'
import './assets/less/commom.less'
import 'element-ui/lib/theme-chalk/index.css'
// import './utils/api'
// import './theme/index.css'

import './utils/excute'
import Vue from 'vue'
import axios from 'axios'
// const Vue = require('vue/dist/vue.runtime.common.js')
// import ElementUI from 'element-ui'
import App from './App.vue'
import router from './router'
import store from './store/index'
import selectCondition from '@/components/select/js'

import { Button, Select, Option, Table, TableColumn } from 'element-ui'
Vue.component(Button.name, Button)
Vue.component(Select.name, Select)
Vue.component(Option.name, Option)
Vue.component(Table.name, Table)
Vue.component(TableColumn.name, TableColumn)

Vue.use(selectCondition)
// console.log(selectItem)
Vue.config.productionTip = false
Vue.prototype.$axios = axios

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
// window.addEventListener('scroll', () => {
//   console.log(document.documentElement.scrollTop)
// })
