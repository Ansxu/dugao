<template>
	<view>
		<view class="payinfo">
		  <view class="p1 flex flex-center"><view class="iconfont icon-gou2"></view>支付成功</view>
		  <view class="p2"><span class="yuan">￥</span>669.00</view>
		  <view class="btns">
			<view class="btn toindex" @click="tolink('/pages/tabBar/index/index',true)">返回首页</view>
			<view class="btn todetail" @click="toOrder">查看订单</view>
		  </view>
		</view>
		<view class="foryouCon">
		  <view class="for_hd">
			<view class="icon icon_l"></view><view class="txt">为你推荐</view><view class="icon icon_r"></view>
		  </view>
		  <view class="for_bd">
			<view class="proList flex flexWrap justifyContentBetween">
				<view class="item" v-for="(item,index) in 4" :key="index">
					<image src="http://shop.dadanyipin.com/static/of/4.png" class="item_img"></image>
					<view class="item_info flex flexColumn flexAlignCenter">
						<view class="item_title">超越极限音波拉皮-颈部</view>
						<view class="flexAlignEnd justifyContentBetween item_total">
							<view class="flex flexAlignEnd">
								<span class="item_price">￥980</span>
								<span class="item_market line-through">￥2980</span>
							</view>
							<view class="item_market">已售35件</view>
						</view>
					</view>
				</view>
			</view>
		  </view>
		</view>
	</view>
</template>

<script>
	import {post,get} from '@/common/util.js';
	export default {
		data() {
			return {
				userId: "",
				token: "",
				orderNo:"",
				Noarr:[],
				GroupId:0,//大于0 是拼团
			}
		},
		onLoad(e) {
			// #ifdef APP-PLUS
			this.orderNo=e.orderNo;
			this.GroupId=e.query.GroupId;
			// #endif
		},
		onShow(){
			this.userId = uni.getStorageSync("userId");
			this.token = uni.getStorageSync("token");
			// #ifndef APP-PLUS
			this.orderNo=this.$root.$mp.query.orderNo;
			this.GroupId=this.$root.$mp.query.GroupId;
			// #endif
			this.Noarr=this.orderNo.split(",");
		},
		methods: {
			//跳转
			tolink(Url,tabBar) {
				if(tabBar){
					uni.switchTab({
						url: Url
					})
				}else{
					uni.navigateTo({
						url: Url
					})
				}
			},
			//跳转订单详情
			toOrder() {
				if(this.Noarr.length>1){
					uni.navigateTo({
						url: '/pages/member/order/order'
					})
				}else{
					uni.navigateTo({
						url: '/pages/member/orderDetail/orderDetail?id='+this.orderNo
					})
				}
			},
		}
	}
</script>

<style scoped lang="scss">
	@import "../../common/product.scss";
  .payinfo{background: #ff6f00; text-align: center; color: #fff; padding: 20upx 0 40upx;}
  .payinfo .p1{font-size: 42upx;}
  .payinfo .p1 .iconfont{ margin-right: 20upx;}
  .payinfo .icon-gou2,.payinfo .icon-cha{ font-size: 56upx; line-height:1; }
  .payinfo .p2{ font-size: 60upx; line-height: 1.5}
  .payinfo .p2 .yuan{ font-size: 32upx}
  .payinfo .btns{ display:flex;align-items:center;justify-content:center;}
  .payinfo .btns .btn{ width: 200upx; padding: 6upx 0; margin: 0 20upx; border-radius: 100px; border: 1px solid #fff;}
  .foryouCon{background: #f2f2f2;}
  .for_hd{ padding: 40upx 20upx;
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  -webkit-justify-content: center;
  justify-content: center;}
  .for_hd .txt{ line-height: 1;font-size: 32upx; font-weight: 600; padding: 0 20upx}
  .for_hd .icon{ height: 32upx; width: 32upx;}
  .for_hd .icon_l {
      background: url(http://shop.dadanyipin.com/static/icons/tit_l.png) center center no-repeat;
      background-size: cover;
  }
  .for_hd .icon_r {
      background: url(http://shop.dadanyipin.com/static/icons/tit_r.png) center center no-repeat;
      background-size: cover;
  }
</style>
