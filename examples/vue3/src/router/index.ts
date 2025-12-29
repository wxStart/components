import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'
export type MenuRouteRecordRaw = RouteRecordRaw & {
  name: string
  fullPath: string
  title: string
  id: string
  children?: MenuRouteRecordRaw[]
}

const routes = [
  {
    path: '/',
    name: 'menuLayout',
    component: () => import('@/layout/menuLayout/MenuLayout.vue'),
    redirect: '/waterfall-flow',
    children: [
      {
        path: 'waterfall-flow',
        name: 'WaterfallFlow',
        title: '瀑布流',
        component: () => import('@/views/waterfall-flow/index.vue'),
      },
      {
        path: 'a222',
        name: 'A222',
        title: '2222',
        component: () => import('@/views/a222/index.vue'),
      },
    ],
  },
]

const recursiveProcess = (routesArray: MenuRouteRecordRaw[], parentPath = '') => {
  const lists: MenuRouteRecordRaw[] = routesArray.map((item: MenuRouteRecordRaw) => {
    item.name = item.name || (item.path as string)
    const fullPath =
      parentPath[parentPath.length - 1] === '/'
        ? parentPath + item.path
        : parentPath + '/' + item.path
    return {
      path: item.path,
      name: item.name,
      title: item.title,
      id: fullPath,
      fullPath,
      children: recursiveProcess(item.children || [], item.path),
    }
  })
  return lists
}

// @ts-expect-error @ts-ignore
const menuRoutes = recursiveProcess(routes)?.[0].children as MenuRouteRecordRaw[]
console.log('menuRoutes: 11111', menuRoutes);

export { menuRoutes }

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: routes,
})

export default router
