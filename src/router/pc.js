export default [
  {
    path: '/pcPage',
    name: 'pcPage',
    component: () => import('@/views/pcPage')
  },
  {
    path: '/timeLine',
    name: 'timeLine',
    component: () => import('@/components/time-line/demo')
  }
]
