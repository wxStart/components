export interface WaterfallFlowOptions {
  items: any[];
  column: number;
  gutter: number;
  itemKey: string;
  getContainerWidth: () => Promise<number>;
  getItemsHeightMap: () => Promise<{ [key: string]: number }>;
}

class WaterfallFlow {
  items: any[];
  column: number;
  gutter: number;
  getContainerWidth: () => Promise<number>;
  columnInfo: {
    [key: number]: {
      height: number;
      left: number;
    };
  } = {};
  itemKey: string;

  getItemsHeightMap: () => Promise<{ [key: string]: number }>;

  constructor(options: WaterfallFlowOptions) {
    const {
      items,
      column,
      gutter,
      getContainerWidth,
      itemKey = "id",
      getItemsHeightMap,
    } = options;
    this.items = items;
    this.column = column;
    this.gutter = gutter;
    this.getContainerWidth = getContainerWidth;
    this.itemKey = itemKey;
    this.getItemsHeightMap = getItemsHeightMap;
  }

  async initColumnInfo() {
    const width = await this.getContainerWidth();
    const itemWidth = (width - this.gutter) / this.column;
    this.columnInfo = new Array(this.column)
      .fill(0)
      .reduce((pre, cur, index) => {
        if (!pre[index]) {
          pre[index] = {};
        }
        pre[index].height = 0;
        pre[index].left = itemWidth * index + this.gutter / 2;
        return pre;
      }, {});
  }
  async render() {
    await this.initColumnInfo();
    const renderItemData = [];
    const itemsHeightMap = await this.getItemsHeightMap();
    for (let index = 0; index < this.items.length; index++) {
      const item = this.items[index];
      const height = itemsHeightMap[item[this.itemKey]];
      let currentColumnIndex = 0;
      // zh-CN: 找到高度最小的列
      let i = 1;

      while (i <= this.column) {
        const currentHeight = this.columnInfo[i]?.height;
        const preHeight = this.columnInfo[currentColumnIndex]?.height;
        // if (currentHeight + height < preHeight) {
        if (currentHeight < preHeight) {
          currentColumnIndex = i;
        }
        i++;
      }

      const renderItem = {
        id: item[this.itemKey],
        columnIndex: currentColumnIndex,
        left: this.columnInfo[currentColumnIndex].left,
        top: this.columnInfo[currentColumnIndex].height,
      };

      renderItemData.push(renderItem);
      this.columnInfo[currentColumnIndex].height += height;
    }
    const containerHeight = Math.max(
      ...Object.values(this.columnInfo).map((item) => item.height)
    );
    return {
      items: renderItemData,
      height: containerHeight,
    };
  }
}

export default WaterfallFlow;
