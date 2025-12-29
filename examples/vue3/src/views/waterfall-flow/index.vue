<template>
  <div>
    <el-button type="primary" @click="addItem">添加</el-button>
    <el-button type="primary" @click="deleteItem">随机删除</el-button>
    <WaterfallFlow :lists="lists" :column="4">
      <template #default="{ item }">
        <div class="item">
          <img :src="item.chat_url" alt="" />
          <div class="title">{{ item.chat_name }}</div>
          <div class="price">¥{{ item.message }}</div>
        </div>
      </template>
    </WaterfallFlow>
  </div>
</template>

<script setup lang="ts">
import { ElButton } from 'element-plus'
import WaterfallFlow from '@wx/waterfall-flow-vue3'
import { ref } from 'vue'
import { dataLists } from './mockData'
console.log('dataLists: 1111', dataLists)
defineOptions({
  name: 'WaterfallFlowPage',
})

const lists = ref(dataLists)

function addItem() {
  const index = Math.floor(Math.random() * lists.value.length)
  const id = new Date().valueOf()
  const item = lists.value[index]!
  lists.value.splice(1, 0, {
    ...item,
    id,
  })
}

function deleteItem() {
  const index = Math.floor(Math.random() * lists.value.length)
  lists.value.splice(index, 1)
}
</script>

<style lang="scss" scoped>
.item {
  border: 1px solid #ccc;
  width: 100%;
  overflow: hidden;
  img {
    width: 200px;
    height: 160px;
  }
}
</style>
