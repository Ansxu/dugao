<template>
	<view class="content pw3">
		<view class="postmas">
			<!-- <view class="bg_fff flex flexAlignCenter info">
				<image src="http://shop.dadanyipin.com/static/of/yd.png"></image>
				<view class="flex1">
					<view class="uni-bold">{{logistics.companyName}}</view>
					<view class="font18">官方电话 95546 ></view>
				</view>
			</view> -->
			<view class="flex flexAlignCenter posnum">
				<!-- #ifdef H5 -->
				<input type="text" class="font20" @focus="blur()" :disabled="disabled" 
				 v-model="logistics.nu" style="opacity: 0;position: fixed;top: -10000px;">
				<!-- #endif -->
				<span class="uni-bold font26 " v-if="logistics.companyName&&logistics.nu">{{logistics.companyName}} {{logistics.nu}} </span>
				<span class="uni-bold font26 " v-else>暂无物流信息 </span>
				<span class="copy font26" @click="copybtn" v-if="logistics.nu">复制</span>
			</view>
		</view>
		<view class="logistics">
			<view class="addr">
				<view class="inner">
					<view class="dian">收</view>
					<view class="addrInfo">
						<view class="title">[收货地址]</view>
						<view class="txt">{{orderinfo.Addr}}</view>
					</view>
				</view>
			</view>
			<view class="logisticsList">
				<block v-if="logistics.data">
				<view :class="['item',index==0?'active':'']" v-for="(item,index) in logistics.data" :key="index">
					<view class="dian"></view>
					<view class="addrInfo">
						<view class="title"><text class="time">{{item.time}}</text></view>
						<view class="txt">{{item.context}}</view>
					</view>
				</view>
				</block>
				<view v-else class="item">
					<view class="dian"></view>
					<view class="addrInfo">
						<view class="title">{{logistics.message}}</view>
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
				disabled:false,
				logistics: {}, //物流信息
				orderinfo: {}, //订单信息
				orderdetails: [], //订单详情
			};
		},
		onLoad: function(option) {
			this.orderNo = option.orderNo;
			this.userId = uni.getStorageSync("userId");
			this.token = uni.getStorageSync("token");
			this.getLogistics();
			this.getOrderDetails();
		},
		methods: {
			//物流信息
			async getLogistics() {
				let result = await post("Order/GetLogistics", {
					UserId: this.userId,
					Token: this.token,
					OrderNo: this.orderNo
				});
				if (result.code == 0) {
					this.logistics = JSON.parse(result.data);
					console.log(this.logistics,"/////////")
				}
			},
			//订单信息
			async getOrderDetails() {
				let result = await post("Order/OrderDetails", {
					UserId: this.userId,
					Token: this.token,
					OrderNo: this.orderNo
				})
				if (result.code == 0) {
					this.orderinfo = result.data;
					this.orderdetails = result.data.orderDetails;
				}
			},
			copybtn(){
				if(this.logistics.nu){
					// #ifdef  H5
					let url = document.getElementsByTagName("input")[0];
					url.select(); // 选择对象
					document.execCommand("Copy");
					uni.showToast({
						icon:"none",
						title:"复制成功"
					})
					// #endif
					// #ifdef  MP-WEIXIN
					uni.setClipboardData({
						data: this.logistics.nu,
						success: function () {
							uni.showToast({
								icon:"none",
								title:"复制成功"
							})
						}
					});
					// #endif
					// #ifdef APP-PLUS
					uni.setClipboardData({
						data: this.logistics.nu,
						success: function () {
							uni.showToast({
								icon:"none",
								title:"复制成功"
							})
						}
					});
					console.log(this.logistics.nu)
					// #endif
				}else{
					uni.showToast({
						icon:"none",
						title:"快递单号为空！"
					})
				}
			},
			blur(){
				this.disabled=true;
			}
		},
	}
</script>

<style lang="scss">
	@import "../../../common/dd_style.css";
	.color_000000 * {
		color: #000;
	}
	.logistics,.postmas{
		border-radius:15upx;
	}
	.postmas{
		margin:20upx 0;
		.info{
			padding:20upx 30upx;
			border-radius: 15upx 15upx 0 0;
		}
		image{
			width:90upx;height:90upx;
			margin-right:20upx;
		}
	}
	.posnum{
		padding:20upx 30upx;
		background: #fafafa;border-radius: 0 0 15upx 15upx;
		.copy{
			padding:0 20upx;border:1upx solid #999999;border-radius:8upx;
			margin-left:20upx;
		}
	}
</style>
