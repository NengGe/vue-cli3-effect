import change1 from '@/components/routerChange/change1'
import change2 from '@/components/routerChange/change2'
export default [
  {
    path: '/movePage',
    name: 'movePage',
    component: () => import('@/views/movePage')
  },
  // {
  //   path: '/change1',
  //   component: change1
  // },
  {
    path: '/routerChange',
    component: () => import('@/components/routerChange'),
    children: [
      {
        path: '',
        component: change1
      },
      {
        path: 'change1',
        component: change1
      },
      {
        path: 'change2',
        component: change2
      }
    ]
  }
]
