<template>
  <div>
    <div class="menu-layout">
      <MenuNav :menuList="menuList" @click="handleClick" />
    </div>
    <div class="content-layout">
      <router-view></router-view>
    </div>
  </div>
</template>

<script setup lang="ts">
import MenuNav from '@/components/MenuNav/Index.vue'

import { menuRoutes } from '@/router/index.ts'
import { useRouter } from 'vue-router'
import type { MenuRouteRecordRaw } from '@/router/index.ts'

const router = useRouter()
const menuList = menuRoutes.map((item) => {
  return {
    ...item,
    id: item.path,
  }
})

function handleClick(item: MenuRouteRecordRaw) {
  console.log('item: ', item)
  if (item.fullPath === undefined) {
    return
  }

  router.push({
    path: item.fullPath,
  })
}
</script>

<style lang="scss" scoped>
.menu-layout {
  width: 200px;
  height: 100%;
  background: #22272e;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 999;
}
.content-layout {
  margin-left: 200px;
  height: 100%;
}
</style>
