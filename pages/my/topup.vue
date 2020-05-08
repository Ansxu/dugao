<template>
	<!-- 余额充值 -->
	<view class="wallet">
		<view style="height: 20upx;"></view>
		<view class="walletbox">
			<view class="across">
				<view class="withdraw">充值金额</view>
				<view class="drawing">
					<view class="sign">¥</view>
					<input class="sign signs" type="digit" v-model="money" placeholder="请输入要充值的金额" placeholder-class="sign2"/>
				</view>
			</view>
			<view class="carry">该卡本次最多可充值¥20000</view>
			<view class="pay-hd uni-mb10">选择支付方式</view>
			<view class="pay-bd line-list">
				<block v-for="(item,index) in payway" :key="index"> 
					<view class="line-item flex-between" @click="tabBtn(item.type)">
					  <view class="item-l flex-start">
						<view :class="['icon',item.className]"></view>
						<view class="lab">{{item.typeName}}</view>
					  </view>
					  <view class="item-r">
						<view style="margin: 0;" :class="['IconsCK IconsCK-radio',payType==index?'checked':'']"></view>
					  </view>
					</view>
				</block>
			</view>
		</view>
		<view class="present">
			<view class="recharge" @click="Submit">确认充值</view>
		</view>
	</view>
</template>

<script>
	import {host,post,get,toLogin} from '@/common/util.js';
	export default {
		data(){
			return{
				payway:[{
					type:0,
					typeName:"微信支付",
					className:"icon_weixin"
				},
				// {
				// 	type:1,
				// 	typeName:"支付宝",
				// 	className:"icon_alipay"
				// },{
				// 	type:2,
				// 	typeName:"银联支付",
				// 	className:"icon_yinlian"
				// },
				],
				payType:0, //0微信支付
				money:"",//充值金额
				WxOpenid:'',//微信支付
				WxCode:'',
			}
		},
		onShow() {
			this.userId = uni.getStorageSync("userId");
			this.token = uni.getStorageSync("token");
			// #ifdef  MP-WEIXIN
			this.WxOpenid = uni.getStorageSync("openId");
			this.WxCode = uni.getStorageSync('code')
			// #endif
			console.log(this.WxOpenid,"///////")
		},
		methods:{
			// 判断浏览器环境
			isWeixin() {
			    var ua = navigator.userAgent.toLowerCase();
				if (ua.match(/MicroMessenger/i)=="micromessenger") {
					return true;
				} else {
					return false;
				}
			},
			tabBtn(index){
				this.payType=index;
			},

			Submit(){
				if(this.money>0){
					// #ifdef  H5
					if(this.isWeixin()){
						//this.AddRecharge();
					}else{
						//this.H5AddRecharge();
					}
					// #endif
					this.ConfirmWeiXinSmallPay()
					
				}else{
					uni.showToast({
						title: "请输入充值金额",
						icon: "none",
						duration: 1500
					});
				}
			},
			//获取域名
			GetUrlRelativePath() {
				var urlStr = '';
				var url = document.location.toString();
				var arrUrl = url.split("//");
				var start = arrUrl[1].split("/");
				urlStr = arrUrl[0] + '//' + start[0];
				return urlStr;
			},
			//微信付款
			async AddRecharge(){
				let NewUrl=this.GetUrlRelativePath() +'/#/pages/member/Recharge/Recharge';
				let result= await post("Recharge/AddRecharge",{
					UserId: this.userId,
					Token: this.token,
					RechargeId: this.RechargeId,
					WxOpenid: this.WxOpenid,
					WxCode: this.WxCode,
					NewUrl: NewUrl
				});
				if (result.code == 201) {
					window.location.href=result.data;
				}else if(result.code == 0){
					this.callpay(result.data.JsParam);
					uni.setStorageSync('openId', result.data.openid);
				}else {
					uni.showToast({
						title: result.msg,
						icon: "none",
						duration: 1500
					});
				}
			},
			//非微信环境 使用微信支付H5
			async H5AddRecharge(){
				let NewUrl=this.GetUrlRelativePath() +'/#/pages/member/Recharge/Recharge';
				let result= await post("Recharge/AddRechargeWapPay",{
					UserId: this.userId,
					Token: this.token,
					RechargeId: this.RechargeId,
					NewUrl: NewUrl
				});
				if (result.code == 201) {
					window.location.href=result.data;
				}else if(result.code == 0){
					window.location.href = result.data.mweb_url;
				}else {
					uni.showToast({
						title: result.msg,
						icon: "none",
						duration: 1500
					});
				}
			},
			//小程序支付
			async ConfirmWeiXinSmallPay(){
				  let result= await post("Order/WeiXinSmallRechAmount",{
					WxCode: this.WxCode,
					UserId: this.userId,
					Token: this.token,
					RechargeAmount:this.money,
					WxOpenid:this.WxOpenid 
				  });
				  var payData=JSON.parse(result.data.JsParam)
				  if(result.code===0){
						let _this=this;
					uni.requestPayment({
					  timeStamp: payData.timeStamp,
					  nonceStr: payData.nonceStr,
					  package: payData.package,
					  signType: payData.signType,
					  paySign: payData.paySign,
					  success(res) {
						  _this.type = "";
							_this.showPay=false;
							uni.redirectTo({
								//url: "/pages/payresult/payresult?allprice="+_this.orderInfo.TotalPrice+"&orderNo="+_this.orderNo
							})
						},
					  fail(res) {}
					})
				  }
			},

		}
	
	}
</script>

<style scoped>
	.wallet{
	}
	.walletbox{
		background: #FFFFFF;
		padding: 30rpx;
	}
	.across{
		justify-content: space-between;
		padding-bottom: 30rpx;
		border-bottom:1px solid rgba(236,236,236,1);
	}
	.drawing{
		display: flex;
		align-items: center;
	}
	.present{
		padding: 60rpx 30rpx 0 30rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
		font-family:PingFang;
		font-weight:500;
		color:rgba(255,255,255,1);
	}
	.recharge{
		width:100%;
		height:88rpx;
		background:#FF3333;
		border-radius:10rpx;
		font-size:32rpx;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.withdraw{
		font-size:30rpx;
		font-family:PingFang;
		font-weight:bold;
		color:rgba(51,51,51,1);
		line-height:120rpx;
	}
	.sign{
		font-size:50rpx;
		font-family:PingFang;
		font-weight:bold;
		color:rgba(51,51,51,1);
	}
	.sign2{
		font-size:30upx;
		font-family:PingFang;
		font-weight:normal;
		color:#999;
	}
	.signs{
		display: flex;
		padding: 20upx;
		height: 80upx;
	}
	.carry{
		font-size:24rpx;
		font-family:PingFang;
		font-weight:500;
		color:#999999;
		padding-top: 25rpx;
	}
		
	.pay-hd{ padding: 20upx 0 0; font-size: 32upx; font-weight: 600}
	.pay-bd .line-item .icon {
	    height: 72upx;
	    width: 72upx;
	}
	.line-list .line-item {
	    padding: 15px 0;
	    position: relative;
	}
	.pay-bd .line-item .lab{ padding-left: 20upx; font-size: 30upx}
	.icon_alipay {
	    background: url(http://ddyp.wtvxin.com/static/icons/pay_alipay.png) center center no-repeat;
	    background-size: cover;
	}
	.icon_weixin {
	    background: url(http://ddyp.wtvxin.com/static/icons/pay_weixin.png) center center no-repeat;
	    background-size: cover;
	}
	.icon_yinlian {
	    background: url(http://ddyp.wtvxin.com/static/icons/pay_yinlian.png) center center no-repeat;
	    background-size: cover;
	}
	.icon_yue {
	    background: url(http://ddyp.wtvxin.com/static/icons/pay_yue.png) center center no-repeat;
	    background-size: cover;
	}
	.real-ipt{ width: 400upx; margin: 0 auto; font-size: 36upx;border: 1px solid #ddd; padding: .1rem;}
</style>
