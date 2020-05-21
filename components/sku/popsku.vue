<template>
  <div class="mengban">
      <div  @click="hidePopup" class="mengban" v-if="showPop"></div>
        <!-- content -->
        <div class="main" id="main" v-if="showPop">
            <div class="top-box">
                <div class="one jus-b">
                    <div class="img-box jus-c ali-c">
                        <img :src="selectSku.img||product.img" alt="">
                    </div>
                    <div class="right jus-b">
                        <div>
                            <p class="tit">{{proInfo.Name}}</p>
                            <span v-if="isLimint">{{selectSku.price||product.price}}</span>
                            <span v-else><span class="fuhao">￥</span>{{selectSku.price||product.price}}</span>
                            <p class="font_four">库存：{{selectSku.num||product.num}}</p>
                                <!-- :SpecInfo.PunitPrice -->
                        </div>
                        <span @click="hidePopup" class="chacha">+</span>
                    </div>
                </div>
                <!-- <div class="guige" v-for="(item, index) in specList" :key="index">
                    <p>{{index}}</p>
                    <div class="flex-wrap">
                        <span :class="{'active':ite.name==SpecValue[index]}" @click="cliTag(index,ite.name)" class="ali-c jus-c" v-for="(ite, ind) in item" :key="ind">{{ite.name}}</span>
                    </div>
                </div> -->
                <div class="sku" v-for="(sku,skuIndex) in sku" :key="skuIndex">
                  <div class="spcestitle">{{sku.title}}</div>
                  <div class="specs">
                    <div
                      class="spec"
                      :class="{'specactive':item.selectStatus}"
                      :style="item.status?'color:#999;':''"
                      v-for="(item,index) in sku.list"
                      :key="index"
                      @click="clickSelectSku(skuIndex,index,item)"
                    >
                      <!-- @click="onSelectSku(val,index)" -->
                      <text>{{item.val}}{{item.selectStatus}}</text>
                    </div>
                  </div>
                </div>

                <div class="two jus-b ali-c">
                    <span>购买数量</span>
                    <div class="ali-c">
                        <span @click="suan(1)">-</span>
                        <input type="number" v-model="goodsNum" disabled>
                        <span @click="suan(2)">+</span>
                    </div>
                </div>
            </div>
            <div class="flex bot">
              <!-- <p v-if="isLimint==1&&starTimetype==0" class="flex1 jus-c ali-c">即将开始 敬请期待</p>
              <p v-else-if="isLimint==1&&starTimetype==2" class="flex1 jus-c ali-c btn_ccc">秒杀已结束</p> -->
              <!-- <block v-else> -->
              <block>
                <block v-if="reStock>0">
                  <block v-if="showbtntype==0">
                    <p class="flex1 jus-c ali-c" @click="addcart">加入购物车</p>
                    <p class="flex1 jus-c ali-c btn_red" @click="buy">立即购买</p>
                  </block>
                  <p v-else class="flex1 jus-c ali-c btn_red" @click="confirmBtn">确定</p>
                </block>
                <p v-else class="flex1 jus-c ali-c">商家补货中</p>
              </block>
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
      type: Array,
      dafault() {
        return [];
      }
    },
    skuAll: {
      type: Array,
      default() {
        return [];
      }
    },
    product:{
      type:Object,
      default(){
        return {
          img:''
        };
      }
    }
  },
  watch:{
    sku:{
      handler(e){
        console.log(e,'e')
      },
      deep:true
    }
  },
  data() {
    return {
      showPop:true,
      selectSku: {
        //选中的sku组合
        value: {},
        img: "",
        num: "",
        price: "",
        text: "" //sku组合用下划线分隔_
      },
      datas:{},
      reStock:0,//库存
      maxbuy:0,//最大购买量
      minbuy:1, //最小购买量
    };
  },
  mounted() {
    console.log(this.skuAll,this.sku,'data-sku')
    this.isUseSku();
  },
  methods: {
    // 加入购物车
    addcart(){

    },
    // 立即购买
    buy(){

    },
    // 确定
    confirmBtn(){

    },
    // 隐藏sku
    hidePopup(){
      this.showPop =false;
    },
    clickSelectSku(skuIndex,index,item){
      // let obj = item;
      // obj.selectStatus = !obj.selectStatus;
      // this.sku[skuIndex].list[index] = obj;
      let list = this.sku[skuIndex].list;
      list[index].selectStatus = !item.selectStatus;
      console.log(list,'list')
      this.$set(this.sku[skuIndex],'title','123');
      console.log(this.sku,'this.sku')

      // console.log(item,'item')
    },
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
<style scoped lang="scss">
.mengban{
    width: 100vw;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.5);
    position: fixed;
    top: 0;
    z-index: 98;
    .main{
        position: fixed;
        // bottom: -100vh;
        bottom: 0;
        left:0;
        transition: all 0.3s;
        width: 100vw;
        // height: 900rpx;
        z-index: 99;
        background-color: #fff;
        border-radius: 20rpx;
        .guige{
            p{
                font-size: 28rpx;
                color: #333;
                line-height: 80rpx;
            }
            span{
                background-color: #f5f5f5;
                color: #666;
                font-size: 24rpx;
                padding: 10rpx 20rpx;
                border-radius: 10rpx;
                margin: 0 20rpx 20rpx 0;
                border: 1rpx solid #f5f5f5;
            }
            .active{
              background-color:#f9eeec;
              color: #f0370b;
              border: 1rpx solid #f0370b;
            }
        }
        .top-box{
            padding: 30rpx 30rpx 130rpx;
            .two{
                height: 100rpx;
                font-size: 28rpx;
                color: #999;
                .ali-c{
                    width: 200rpx;
                    span{
                        font-size: 40rpx;
                        font-weight: 900;
                        color: #333
                    }
                    input{
                      width: 80rpx;
                        height: 44rpx;
                        background-color: #eeeeee;
                        border-radius: 8rpx; 
                        margin: 0 30rpx;
                        text-align: center;
                        position: relative;
                        top: 5rpx
                    }
                }
            }
            .one{
                border-bottom: 1rpx solid #ededed;
                .img-box{
                    width: 200rpx;
                    height: 200rpx;
                    border-radius: 10rpx;
                    border:1rpx solid #ededed;
                    position: relative;
                    top: -50rpx;
                    background-color: #fff
                }
                img{
                    width: 180rpx;
                    height: 180rpx;
                }
                .right{
                    width: 475rpx;
                    .chacha{
                        font-size: 50rpx;
                        transform: rotate(45deg);
                        width: 30rpx;
                        height: 30rpx;
                        position: relative;
                        top: -20rpx;
                        left: 20rpx;
                    }
                    div{
                        width: 410rpx;
                        p{
                            font-size: 28rpx;
                            color: #333;
                            margin-bottom: 30rpx
                        }
                        span{
                            color: #f0370b;
                            font-size: 32rpx;
                            .fuhao{
                                font-size: 22rpx
                            }
                        }
                    }
                }
            }
        }
        .bot{
            position: absolute;
            bottom: 0;
            width: 100%;
            height: 98rpx;
            color: #fff;
            font-size: 28rpx;
            p{
                background-color: #fda33a;
            }
            p.btn_red{
                background-color: #ff6f00;
            }
            p.btn_ccc{ background-color: #ccc}
        }
    }
}
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
  padding: 0rpx 25rpx;
  line-height:2;
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

