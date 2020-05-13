<template>
  <div>
    <div class="sku" v-for="(sku,val) in sku" :key="val">
      <div class="spcestitle">{{val}}</div>
      <div class="specs">
        <div
          class="spec"
          :class="{'specactive':item.selectStatus}"
          :style="item.status?'color:#999;':''"
          v-for="(item,index) in sku"
          :key="index"
          @click="onSelectSku(val,index)"
        >
          <text>{{item.val}}</text>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
// 获取的sku格式：渲染的数据格式
//   {
//     尺寸:{
//       selectStatus:false, //选中状态
//       status:true,  //可选状态
//       val:"S"
//     },
//     颜色:{
//       selectStatus:false,
//       status:true,
//       val:"白色"
//     },
//   }
// 获取的skuAll格式：全部sku列表 数组
// [
//   {
//     img:"", //sku图片
//     num:10,  //sku数量
//     price:1, //sku价格
//     text:"白色_S_T恤", //sku组合，下划线分隔
//     value:{    //sku的key和值
//       尺寸:"S",
//       款式:"T恤",
//       颜色:"白色"
//     }
//   },
//   {
//     img:"", //sku图片
//     num:10,  //sku数量
//     price:1, //sku价格
//     text:"白色_S_T恤", //sku组合，下划线分隔
//     value:{    //sku的key和值
//       尺寸:"M",
//       款式:"T恤",
//       颜色:"白色"
//     }
//   },
// ]
export default {
  props: {
    sku: {
      type: Object,
      dafault() {
        return {};
      }
    },
    skuAll: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  data() {
    return {
      selectSku: {
        //选中的sku组合
        value: {},
        img: "",
        num: "",
        price: "",
        text: "" //sku组合用下划线分隔_
      }
    };
  },
  onLoad() {
    this.isUseSku();
  },
  methods: {
    // 选择sku
    onSelectSku(val, index) {
      if (this.sku[val][index].status) {
        return false;
      }
      // 更改选择sku的状态
      this.sku[val].map((oeb, i) => {
        this.$set(this.sku[val][i], "selectStatus", false);
      });
      let sku = JSON.parse(JSON.stringify(this.sku[val]));
      sku[index].selectStatus = true;
      this.$set(this.sku, val, sku);

      this.selectSku.value[val] = this.sku[val][index].val;
      // return false;
      // 是否选择完sku属性
      this.checkedSku();
      this.isUseSku();
    },
    // 全部选择完sku属性执行
    checkedSku() {
      //首先，选择后的属性肯定是不会重复的，只会特换选择的sku。
      //再判断选择后的数量是否等于数据返回的属性数量。
      // 只有相等的情况再执行判断，遍历数组，存在相等属性的话+1.
      // 如果相等的数量等于返回数据的属性数量，那就是唯一的sku了

      // 选择sku的数量
      let selectSkuNum = 0;
      Object.keys(this.selectSku.value).map(() => {
        selectSkuNum += 1;
      });
      // 判断sku选择的数量是否全部选择
      let skuAttrNum = 0;
      Object.keys(this.sku).map(() => {
        skuAttrNum += 1;
      });
      // 全部选择完sku属性
      if (skuAttrNum === selectSkuNum) {
        this.skuAll.map(skuAllItem => {
          // 遍历全部数组的对象，如果存在相同的属性则数量+1
          let skuAllNum = 0;
          Object.keys(skuAllItem.value).map(skuAllItemValue => {
            Object.keys(this.selectSku.value).map(selectItem => {
              if (
                skuAllItemValue === selectItem &&
                skuAllItem.value[selectItem] ===
                  this.selectSku.value[selectItem]
              ) {
                skuAllNum += 1;
              }
            });
          });
          // 判断全部属性相等的数量是否等于sku全部属性的数量
          if (skuAttrNum === skuAllNum) {
            console.log(skuAllItem, "选择的sku");
            const value = this.selectSku.value;
            this.selectSku = {
              num: skuAllItem.num,
              price: skuAllItem.price,
              img: skuAllItem.img,
              text: skuAllItem.text,
              value
            };
            this.$emit("getSkuData", skuAllItem);
          }
        });
      }
    },
    // 判断可使用的sku
    isUseSku() {
      // 创建一个对象,用于进行添加值判断
      Object.keys(this.sku).map(skuItem => {
        // 遍历渲染的sku值，只有跟选中的key值不相同的情况。再把值添加到obj
        let obj = JSON.parse(JSON.stringify(this.selectSku.value));
        this.sku[skuItem].map((skuItemValue, skuItemIndex) => {
          // 选择sku的数量
          let selectSkuNum = 0;
          Object.keys(this.selectSku.value).map(() => {
            selectSkuNum += 1;
          });
          // 判断sku选择的数量是否全部选择
          let skuAttrNum = 0;
          Object.keys(this.sku).map(() => {
            skuAttrNum += 1;
          });
          if (selectSkuNum === skuAttrNum) {
            obj[skuItem] = skuItemValue.val;
            const status = this.isUseSku2(obj);
            this.sku[skuItem][skuItemIndex].status = status;
          } else if (!this.selectSku.value[skuItem]) {
            obj[skuItem] = skuItemValue.val;
            const status = this.isUseSku2(obj);
            this.sku[skuItem][skuItemIndex].status = status;
          }
        });
      });
    },
    // 拿到组合的数据来判断是否有库存
    // 没有选择全部sku的话，拿选中的key和值+遍历的每一个没选中的进行判断，
    // 判断是否有库存

    // 全部选中sku的话，则每个组合都进行判断，是否有库存

    // 每次执行isUseSku2传过来的obj应该只有一个渲染数据this.sku的遍历
    isUseSku2(obj) {
      // true为不可选，false--可选状态
      let status = true;
      // console.log(obj, "obj");
      let objNum = 0;
      Object.keys(obj).map(() => {
        objNum += 1;
      });
      // 渲染全部sku，判断跟boj的值相同剩余可选的sku属性库存
      this.skuAll.map(skuAllItem => {
        let sameNum = 0;
        Object.keys(skuAllItem.value).map(skuAllValueItem => {
          Object.keys(obj).map(bojItem => {
            if (
              skuAllValueItem === bojItem &&
              skuAllItem.value[bojItem] === obj[bojItem]
            ) {
              sameNum += 1;
            }
          });
        });
        // 相等的情况下,判断库存是否大于0，
        // 大于0：状态为可选，跳出
        // 没有一个大于0：则没有库存，状态为禁用
        if (objNum === sameNum) {
          if (skuAllItem.num * 1 > 0) {
            status = false;
            return false;
          }
        }
      });
      return status;
    }
  }
};
</script>
<style scoped>
.spcestitle {
  padding: 20rpx 0;
}
.specs {
  flex-wrap: wrap;
  display: flex;
  align-items: center;
}
.specs div {
  font-size: 24rpx;
  margin-top: 20rpx;
  padding: 5rpx 20rpx;
  background: #f3f3f3;
}
.spec {
  border: 1rpx solid #fff;
  border-radius: 10rpx;
  background: #fff7f4;
  margin-right: 20rpx;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.specactive {
  border: 1rpx solid #ff6325;
  border-radius: 10rpx;
  background: #fff7f4;
}
</style>

