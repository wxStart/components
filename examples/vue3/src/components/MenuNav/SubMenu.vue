<template>
  <el-sub-menu v-if="isSubMenu" :index="menuItem.id" :disabled="menuItem.disabled">
    <template #title>
      <!-- <span :class="`icon meihao-zhongtai ${icon} ${$style.icon}`"></span> -->
      <span>{{ menuItem.title }}</span>
    </template>
    <SubMenu v-for="item in children" :key="item.id" :menuItem="item" v-bind="$attrs" />
  </el-sub-menu>
  <el-menu-item v-else :index="menuItem.id" :disabled="menuItem.disabled" @click="handleClick">
    <template #title>
      <!-- <span :class="`icon meihao-zhongtai ${icon} ${$style.icon}`"></span> -->
      <span>{{ menuItem.title }}</span>
    </template>
  </el-menu-item>
</template>

<script setup lang="ts">
import { computed } from 'vue'

defineOptions({
  name: 'SubMenu',
})

const $emit = defineEmits(['click'])

const props = defineProps({
  menuItem: {
    type: Object,
    default: () => {},
  },
})
const menuItem = computed(() => {
  return props.menuItem
})
// const icon = computed(() => {
//   return menuItem.value.icon
// })
const isSubMenu = computed(() => {
  return menuItem.value.children && menuItem.value.children.length
})
const children = computed(() => {
  return menuItem.value.children || []
})

function handleClick() {
  $emit('click', menuItem.value)
}
</script>

<style lang="scss" module>
.icon {
  display: inline-block;
  margin-right: 8px;
}
</style>
