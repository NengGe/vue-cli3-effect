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
  },
  {
    path: '/pcScroll',
    name: 'pcScroll',
    component: () => import('@/components/pc-scroll')
  },
  {
    path: '/tab',
    name: 'tab',
    component: () => import('@/components/tab/demo')
  },
  {
    path: '/select',
    name: 'select',
    component: () => import('@/components/select/demo')
  },
  {
    path: '/sort',
    name: 'sort',
    component: () => import('@/components/sort-block')
  }
]
