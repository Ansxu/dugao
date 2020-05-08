<template>
  <view class="sertype">
      <view class="mt2 bg_fff pp3 flex justifyContentBetween">
          <image :src="info.PicNo" alt="" class="shop mr2"></image>
          <view class="flex1">
              <view class="uni-bold">{{info.ProductName}}</view>
              <view class="cg font24 mt1 color_gray">{{info.SpecText}}</view>
			   <view class="cg font24 mt1 color_red">￥{{info.ActualPay}}元</view>
          </view>
      </view>
      <view class="pw3 mt2 bg_fff">
          <view class="menu_item flex justifyContentBetween flexAlignCenter" 
		  @click="goUrl(1)">
              <view class="flex flexAlignCenter">
                  <image src="http://jyy.wtvxin.com/static/images/icons/huan.png" alt="" class="huan mr2"></image>
				  <view>
					   <view >申请换货</view>
					   <view style="font-size: 24upx;" class="color_gray">已收到货，需要更换已收到的货物</view>
				  </view>
              </view>
               <span class="iconfont icon-arrow_r"></span>
          </view>
          <view class="menu_item flex justifyContentBetween flexAlignCenter" 
		  @click="goUrl(2)">
              <view class="flex flexAlignCenter">
                  <image src="http://jyy.wtvxin.com/static/images/icons/tui.png" alt="" class="huan mr2"></image>
				  <view>
					   <view >申请退货退款</view>
					   <view style="font-size: 24upx;" class="color_gray">已收到货，需要更换已收到的货物</view>
				  </view>
              </view>
             <span class="iconfont icon-arrow_r"></span>
          </view>
          <view class="menu_item flex justifyContentBetween flexAlignCenter" 
		  @click="goUrl(3)">
              <view class="flex flexAlignCenter">
                  <image src="http://jyy.wtvxin.com/static/images/icons/tuiq.png" alt="" class="huan mr2"></image>
				  <view>
					   <view>仅退款（无需退货）</view>
					   <view style="font-size: 24upx;" class="color_gray">未收到货（包含未签收）或卖家协商同意前提下</view>
				  </view>
              </view>
               <span class="iconfont icon-arrow_r"></span>
          </view>
      </view>
  </view>
</template>

<script>
import {switchPath,post,navigate} from '@/common/util.js'
export default {

  data () {
    return {
      navigate,
      indexId:0,
      OrderNumber:"",
      info:{}
    }
  },
 onLoad(e){
 	  // #ifdef APP-PLUS
 	   this.indexId = e.indexId
 	   this.OrderNumber  = e.id
 	   // #endif
 },
  onShow(){
	// #ifndef APP-PLUS
	this.indexId=this.$mp.query.indexId
	this.OrderNumber=this.$mp.query.id
	// #endif
	console.log(uni.getStorageSync("token"),"token")
    this.getDetail();
  },
  methods: {
    getDetail(){
      post('Order/OrderDetails',{
        UserId:uni.getStorageSync("userId"),
        Token:uni.getStorageSync("token"),
        OrderNo:this.OrderNumber
      }).then(res=>{
        this.info = res.data.OrderDetails[this.indexId];
      })
    },
    goUrl(type){
      navigate('member/applyReturn/applyReturn',{indexId:this.indexId,id:this.OrderNumber,type})
    },
    
  },
}
</script>

<style scoped lang='scss'>
  .shop{
    width:161upx;height:161upx;
  }
  .huan{
    width:42upx;height:40upx;
  }
  .menu_item{
    border-bottom:1upx solid #f5f5f5;
    padding:30upx 0;
  }
</style>
