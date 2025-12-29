<template>
  <div
    class="waterfall-container"
    :id="waterfallFlowId"
    :style="`--ui-gutter: ${gutter}px; --column: ${column}; height: ${containerHeight}px`"
  >
    <!-- @vue-ignore -->
    <div
      v-for="item in props.lists as any[]"
      :key="item[itemKey]"
      class="waterfall-item"
      :data-id="`${item[itemKey]}`"
      :style="renderItemsTopLeftMap[item[itemKey]] || {}"
    >
      <slot :item="item"> </slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted, onUnmounted, nextTick } from "vue";
import WaterfallFlow from "@wx/waterfall-flow-core";
import { debounce } from "@wx/shared";

const props = defineProps({
  itemKey: {
    type: String,
    default: "id",
  },
  lists: {
    type: Array,
    default: () => [],
  },
  gutter: {
    type: Number,
    default: 10,
  },
  column: {
    type: Number,
    default: 2,
  },
});

const waterfallFlowId = ref(`waterfall-container-${Date.now()}`);

const containerHeight = ref(0);

const renderItemsTopLeftMap = ref<
  Record<
    string,
    { top: string; left: string; position: string; transition: any }
  >
>({});

const querySelectAll: (selector: string, parent?: string) => Array<Element> = (
  selector: string,
  parent?: string
) => {
  return (document.querySelectorAll(
    parent ? `${parent} ${selector}` : selector
  ) || []) as unknown as Array<Element>;
};

// 渲染函数
const renderWaterfallFlow = async () => {
  const waterfallFlow = new WaterfallFlow({
    itemKey: props.itemKey,
    items: JSON.parse(JSON.stringify(props.lists)),
    column: props.column,
    gutter: props.gutter,

    getContainerWidth: async () => {
      const items = await querySelectAll(`#${waterfallFlowId.value}`);
      //@ts-ignore
      const width = items?.[0]?.offsetWidth as number;
      return width;
    },
    getItemsHeightMap: async () => {
      const items = await querySelectAll(
        ".waterfall-item",
        `#${waterfallFlowId.value}`
      );
      const result = {};
      for (let index = 0; index < items.length; index++) {
        const element = items[index];
        //@ts-ignore
        result[element.dataset.id] = element.offsetHeight;
      }

      return result;
    },
  });
  const { height } = await waterfallFlow.render();
  // 先把滚动条渲染出 等宽度确定好了再去渲染items，否则导致item的位置计算错误 left 会计算错误
  containerHeight.value = height;
  await nextTick();
  const { itemMapHeight, height: finalHeight } = await waterfallFlow.render();
  console.log("itemMapHeight: 1111111", itemMapHeight);

  containerHeight.value = finalHeight;

  const renderItemsTopLeftMapLocal: Record<
    string,
    { top: string; left: string; position: string; transition: any }
  > = {};
  Object.keys(itemMapHeight).forEach((key) => {
    renderItemsTopLeftMapLocal[key] = {
      top: `${itemMapHeight[key].top}px`,
      left: `${itemMapHeight[key].left}px`,
      position: "absolute",
      transition: "all 0.3s ease-in-out",
    };
  });
  // 更新位置映射
  renderItemsTopLeftMap.value = renderItemsTopLeftMapLocal;
};

// 监听props变化
watch(
  () => props.lists,
  () => {
    nextTick(() => {
      renderWaterfallFlow();
    });
  },
  { deep: true }
);

watch([() => props.column, () => props.gutter], () => {
  renderWaterfallFlow();
});

onMounted(renderWaterfallFlow);

const onResize = debounce(renderWaterfallFlow, 300);

onMounted(() => {
  window.addEventListener("resize", onResize);
});
onUnmounted(() => {
  window.removeEventListener("resize", onResize);
});
</script>

<style lang="scss" scoped>
.waterfall-container {
  position: relative;
  padding: var(--ui-gutter);
  .waterfall-item {
    width: calc((100% - var(--ui-gutter)) / var(--column));
    --image-width: calc((100% - var(--ui-gutter)) / var(--column));
    padding: calc(var(--ui-gutter) / 2);
    // background-color: red;
    box-sizing: border-box;
  }
}
</style>
