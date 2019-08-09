import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)
// 路由拆分
let otherRouteDir = require.context('../router', true, /(pc)\.js/)
function importRoutes(r) {
  let routes = []
  r.keys().forEach(key => {
    routes = routes.concat(r(key).default)
  })
  // console.log(routes)
  return routes
}
export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: () => import('@/views')
    },
    ...importRoutes(otherRouteDir)
  ]
})
