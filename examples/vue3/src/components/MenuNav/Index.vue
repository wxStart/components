<template>
  <el-menu :class="$style.menu" :collapse="true">
    <SubMenu
      v-for="menuItem in menuList as MenuItem[]"
      :key="menuItem.path || menuItem.id"
      :menuItem="menuItem"
    />
  </el-menu>
</template>

<script setup lang="ts">
interface MenuItem {
  path?: string
  id: string
  children?: MenuItem[]
}

// import { ref, computed } from 'vue'
// import { useRoute } from 'vue-router'
import SubMenu from './SubMenu.vue'

defineProps({
  menuList: {
    type: Array,
    default: () => [],
  },
})
</script>

<style lang="scss" module>
.title {
  display: flex;
  align-items: center;
  padding: 20px;

  .user {
    width: 100%;
    line-height: 40px;
    font-weight: 400;
    font-size: 16px;
    color: #ffffff;
    display: flex;
    justify-content: space-between;
  }
}
.userIcon {
  width: 40px;
  height: 40px;
  background: rgba(64, 158, 255, 0.41);
  border-radius: 20px 20px 20px 20px;
  border: 1px solid #409eff;
  border-radius: 50%;
  font-weight: 500;
  font-size: 25px;
  color: #64b0ff;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 10px;
}
.userInfo {
  flex: 1 0 auto;
  > div {
    width: 100%;
  }
}
.menu {
  background-color: transparent;

  --el-menu-bg-color: var(--mh-sidlerMenu-bg-color, #000) !important;
  --el-menu-text-color: var(--mh-sidlerMenu-color, #fff);
  --el-menu-hover-bg-color: var(--mh-sidlerMenu-hover-bg-color, rgba(64, 158, 255, 0.47));
}
:global {
  .el-menu {
    --el-menu-hover-bg-color: var(
      --mh-sidlerMenu-hover-bg-color,
      rgba(64, 158, 255, 0.47)
    ) !important;
    --el-menu-bg-color: var(--mh-sidlerMenu-bg-color, #202325) !important;
    --el-menu-text-color: var(--mh-sidlerMenu-color, #fff);
    border: 0;
  }
  .menu:not(.el-menu--collapse) {
    width: 100%;
  }
}
</style>
