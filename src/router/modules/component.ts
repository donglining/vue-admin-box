import type { Route } from '../index.type'
import Layout from '@/layout/index.vue'
import { createNameComponent } from '../createNode'
const route: Route[] = [
  {
    path: '/component',
    component: Layout,
    redirect: '/component/button',
    meta: { title: 'message.menu.component.name', icon: 'sfont system-component' },
    alwayShow: true,
    children: [
      {
        path: 'button',
        component: createNameComponent(() => import('@/views/main/components/button/index.vue')),
        meta: { title: 'message.menu.component.button' },
      },
      {
        path: 'wordEditor',
        component: createNameComponent(() => import('@/views/main/components/wordEditor/index.vue')),
        meta: { title: 'message.menu.component.wordEditor',cache:true },
      },
      {
        path: 'mdEditor',
        component: createNameComponent(() => import('@/views/main/components/mdEditor/index.vue')),
        meta: { title: 'message.menu.component.mdEditor',cache:true },
      },
      {
        path: 'codeEditor',
        component: createNameComponent(() => import('@/views/main/components/codeEditor/index.vue')),
        meta: { title: 'message.menu.component.codeEditor' ,cache:true},
      },
      {
        path: 'jsonEditor',
        component: createNameComponent(() => import('@/views/main/components/jsonEditor/index.vue')),
        meta: { title: 'message.menu.component.jsonEditor' ,cache:true},
      },
      {
        path: 'dragPane',
        component: createNameComponent(() => import('@/views/main/components/dragPane/index.vue')),
        meta: { title: 'message.menu.component.dragPane' },
      },
      {
        path: 'map',
        component: createNameComponent(() => import('@/views/main/components/map/index.vue')),
        meta: { title: 'message.menu.component.map' },
      },
      {
        path: 'cutPhoto',
        component: createNameComponent(() => import('@/views/main/components/cutPhoto/index.vue')),
        meta: { title: 'message.menu.component.cutPhoto' },
      },
      {
        path: 'rightMenu',
        component: createNameComponent(() => import('@/views/main/components/rightMenu/index.vue')),
        meta: { title: 'message.menu.component.rightMenu' },
      },
      {
        path: 'exportExcel',
        component: createNameComponent(() => import('@/views/main/components/exportExcel/index.vue')),
        meta: { title: 'message.menu.component.exportExcel' },
      },
    ]
  }
]

export default route