<template>
  <div>
    <div class="menu-layout">
      <MenuNav :menuList="menuList" />
    </div>
    <div>
      <router-view></router-view>
    </div>
  </div>
</template>

<script setup lang="ts">
import MenuNav from '@/components/MenuNav/Index.vue'

const menuList = []
</script>

<style lang="scss" scoped></style>
