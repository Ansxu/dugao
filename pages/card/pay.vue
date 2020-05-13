<template>
	<!-- 购物车支付订单 -->
	<view>
		 <view class="payinfo">
		    <view class="p1">待付款金额</view>
		    <view class="p2 flex flex-center"><view class="yuan">￥</view><view class="payprice">{{orderInfo.TotalPrice}}</view></view>
		    <div class="countTiem">支付剩余时间{{Countdown}}</div>
		  </view>
		  <view class="pay-hd uni-mb10">选择支付方式</view>
		  <view class="pay-bd line-list">
			<block v-for="(item,index) in payway" :key="index"> 
				<view class="line-item flex-between" @click="tabBtn(item.type)">
				  <view class="item-l flex-start">
					<view :class="['icon',item.className]"></view>
					<view class="lab">{{item.typeName}}</view>
				  </view>
				  <view class="item-r">
					<view style="margin: 0;" :class="['IconsCK IconsCK-radio',payType==item.type?'checked':'']"></view>
				  </view>
				</view>
			</block>
		  </view>
		<view class="ftbtn" style="padding:20upx;">
		    <view :class="['btn',disable?'disabled':'']" @click="submitBtn">立即支付</view>
		</view>
		<view class="mask" v-if="showMask"></view>
		<view v-if="showMask" class="toastMask">
			<view class="toast_title">您还未设置支付密码，无法使用余额支付，是否马上设置？</view>
			<view class="flex taost_btn">
				<view class=" btn_tt btn_no1" @click="showMask=false">取消</view>
				<view class=" btn_tt btn_no2" @click="tolink('/pages/other/setpwd/setpwd')">确认</view>
			</view>
		</view>
		<pay v-on:hidePay="hidePay" v-on:getPassword="getPassword" v-if="showPay" :allprice="allprice"></pay>
		<!-- 支付宝H5表单 -->
		<view class="alipayfram" v-if="isshowalipay">
			<view id="alipayfram" v-html="alipayCon"></view>
		</view>
	</view>
</template>

<script>
	import {post,get,getUrlParam} from '@/common/util.js';
	import pay from '@/components/pay.vue';
	export default {
		components: {pay},
		data() {
			return {
				userId: "",
				token: "",
				orderNo:"",
				payType:0, //0微信支付
				payway:[{
					type:0,
					typeName:"微信支付",
					className:"icon_weixin"
				},
				// #ifndef MP-WEIXIN
				{
					type:1,
					typeName:"支付宝",
					className:"icon_alipay"
				},
				// #endif
				// {
				// 	type:2,
				// 	typeName:"银联支付",
				// 	className:"icon_yinlian"
				// },
				{
					type:3,
					typeName:"余额支付",
					className:"icon_yue"
				}],
				orderInfo:{}, //订单信息
				allprice:'0',
				source:1,//1来源从下单页，0从订单列表或订单详情
				MemberWallet:0,//会员余额
				Score:0,//会员积分
				hasPayPassword:0, //是否设置支付密码
				showPay:false,//支付密码弹框
				Countdown:'00:00:00',
				disable:false,
				WxOpenid:"",
				WxCode:"",
				GroupId:0,//大于0 是拼团产品
				showMask:false,
				isshowalipay:false,
				alipayCon:"",
			}
		},
		
		onLoad(e) {
			// #ifdef APP-PLUS
			this.orderNo=e.orderNo;
			this.source=e.source||0;
			this.GroupId=e.GroupId||0;
			// #endif
			// #ifdef H5
			this.WxCode=getUrlParam("code");
			this.WxOpenid = uni.getStorageSync("openId");
			if(this.WxCode){//首次跳转获取code地址都直接调起支付
				this.payweixin()
			}
			// #endif
		},
		
		onShow(){
			this.userId = uni.getStorageSync("userId");
			this.token = uni.getStorageSync("token");
			this.WxOpenid=uni.getStorageSync("openId");
			// #ifndef APP-PLUS
			this.orderNo=this.$root.$mp.query.orderNo;
			this.source=this.$root.$mp.query.source||0;
			this.GroupId=this.$root.$mp.query.GroupId||0;
			// #endif
			this.PayOrderDetails();
			this.GetMemInfo();
			// #ifdef  MP-WEIXIN
			this.getcode();
			// #endif
			// #ifdef H5
			this.WxOpenid = uni.getStorageSync("openId");
			// #endif
			this.showMask = false
		},
		methods: {
			//跳转
			tolink(Url) {
				uni.navigateTo({
					url: Url
				})
			},
			// 判断浏览器环境
			isWeixin() {
			    var ua = navigator.userAgent.toLowerCase();
				if (ua.match(/MicroMessenger/i)=="micromessenger") {
					return true;
				} else {
					return false;
				}
			},
			//获取账户信息
			async GetMemInfo() {
				let result = await post("User/GetMemInfo", {
					UserId: this.userId,
					Token: this.token,
				})
				if (result.code == 0) {
					// this.IsPlus=result.data.IsPlus;
					// this.username=result.data.Mobile;
					this.MemberWallet=result.data.Wallet;
					this.Score=result.data.Score;
					this.hasPayPassword=result.data.IsSetPayPwd;
				}
			},
			//待付款订单信息
			async PayOrderDetails() {
				let result = await post("Order/PayOrderDetails", {
					OrderNo:this.orderNo
				})
				if (result.code == 0) {
					if(result.data){
						this.orderInfo=result.data;
						this.allprice=this.orderInfo.TotalPrice.toString();
						this.Countdown=this.orderInfo.Hours+':'+this.orderInfo.Minutes+':'+this.orderInfo.Seconds;
						this.downTiem(this.orderInfo.Hours,this.orderInfo.Minutes,this.orderInfo.Seconds);
					}
				}
			},
			//支付倒计时
			downTiem(h,m,s){
				let _this=this;
				let newTime = Date.parse(new Date());
				let timeResidue1 = (h*3600 +m*60 + s*1)*1000;
				let timeDing = 	newTime + timeResidue1; //截止时间
				let timer =setInterval(function(){
					let now = Date.parse(new Date());
					timeResidue1 = timeResidue1 - 1000;
					//定义变量 h,m,s保存倒计时的时间
					//var h,m,s;
					if (timeResidue1>=0) {
						h = Math.floor(timeResidue1/1000/60/60%24);
						m = Math.floor(timeResidue1/1000/60%60);
						s = Math.floor(timeResidue1/1000%60);  
						//将倒计时赋值到div中
           			    _this.Countdown=h+":"+m+":"+s;
					}else{
						_this.disable=true;
						clearInterval(timer)
					}
				},1000)
			},
			tabBtn(index){
				this.payType=index;
			},
			//关闭支付密码弹窗
			hidePay(e){
				this.showPay=false;
				// if(e==0){
				// 	this.showgetout = false;
				// }else{
				// 	this.showgetout = true;
				// }
			},
			//接收支付密码
			getPassword(Password){
				this.ConfirmPay(Password);
			},
			//余额支付
			async ConfirmPay(Password) {
				let result = await post('Order/PaymentOrder',{
					UserId: this.userId,
					Token: this.token,
					OrderNo: this.orderNo,
					Password: Password,
				});
				if (result.code === 0) {
					this.showPay=false;
					uni.redirectTo({
						url: "/pages/card/paysuccess?allprice="+this.orderInfo.TotalPrice+"&orderNo="+this.orderNo+"&GroupId="+this.GroupId
					})
				}else if(result.code === 102){
					uni.showModal({
						content: "您还没有设置支付密码，去设置？",
						success(res) {
							if (res.confirm) {
								uni.redirectTo({
									url:"/pages/member/pwdSet/pwdSet"
								})
							} else if (res.cancel) {
							}
						}
					});
				}else{
					let _this=this;
					//_this.showgetout = false;
					uni.showToast({
						title: result.msg,
						icon: "none",
						duration: 1500,
					});
					setTimeout(function(){
						_this.showPay=true;
					},1500)
				}
			},
			getcode(){
			    let _this=this;
				uni.login({
					success: function(res) {
					  if (res.code) {
						_this.WxCode=res.code;
					  } else {
						console.log('登录失败！' + res.errMsg)
					  }
					}
				});
			},
			//微信公众号支付  微信自带浏览器的h5支付
			async payweixin() {
				let NewUrl=this.GetUrlRelativePath() +'/#/pages/card/pay?orderNo='+this.orderNo;
				let result = await post("Order/WechatPay", {
					UserId: this.userId,
					Token: this.token,
					orderNo:this.orderNo,
					NewUrl:NewUrl,//支付后的回调地址
					WxCode:this.WxCode,
					WxOpenid:this.WxOpenid,
					paytype:0
				})
				if (result.code == 201) { //检测不到openid需要进行微信授权
					window.location.href=result.data;
				}else if(result.code == 0){console.log(result.data)
					uni.setStorageSync('openId', result.data.openid);
					this.WxOpenid = uni.getStorageSync("openId");
					if(this.WxOpenid!=""&&this.WxOpenid!="undefined"){
						this.WxCode="";//每次获取的code只能使用一次，有openid时用openid调起支付数据
					}
					this.callpay(result.data.JsParam);
				}else {
					uni.showToast({
						title: result.msg,
						icon: "none",
						duration: 1500
					});
				}
			},
			//微信app支付
			async wxapppay() {
				let result = await post("Order/WechatPay", {
					UserId: this.userId,
					Token: this.token,
					orderNo:this.orderNo,
					paytype:2
				})
				if(result.code==0){console.log(result.data)
					// var payData=JSON.parse(result.data.JsParam)
					let _this=this;
					uni.requestPayment({
					  provider:"wxpay",
					  orderInfo:result.data.JsParam,
					  success(res) {
						  console.log(res)
						  _this.type = "";
							_this.showPay=false;
							uni.redirectTo({
								url: "/pages/card/paysuccess?allprice="+_this.orderInfo.TotalPrice+"&orderNo="+_this.orderNo
							})
						},
					  fail(err) {console.log(err)
						  uni.showToast({
						  	title:"支付失败",
							icon:"none",
							duration:4000
						  })
					  }
					})
				}else {
					uni.showToast({
						title: result.msg,
						icon: "none",
						duration: 1500
					});
				}
			},
			//非微信环境 使用微信支付H5
			async H5payweixin() {
				let NewUrl=this.GetUrlRelativePath() +'/#/pages/member/orderDetail/orderDetail?id='+this.orderNo
				let result = await post("Order/WechatPay", {
					UserId: this.userId,
					Token: this.token,
					orderNo:this.orderNo,
					NewUrl:NewUrl,
					paytype:3
				})
				if(result.code == 0){
					window.location.href = result.data.mweb_url;
				}else {
					uni.showToast({
						title: result.msg,
						icon: "none",
						duration: 1500
					});
				}
			},
			callpay(param) {
				if(typeof WeixinJSBridge === 'undefined') {
					if(document.addEventListener) {
						document.addEventListener('WeixinJSBridgeReady', this.onBridgeReady(), false);
					} else if(document.attachEvent) {
						document.attachEvent('WeixinJSBridgeReady', this.onBridgeReady());
						document.attachEvent('onWeixinJSBridgeReady', this.onBridgeReady());
					}
				} else {
					this.onBridgeReady(param);
				}
			},
			onBridgeReady(param){
				var _this=this;
				var parameter = JSON.parse(param);
				WeixinJSBridge.invoke(
					'getBrandWCPayRequest', parameter,
					function(res){
					if(res.err_msg == "get_brand_wcpay_request:ok" ){
					// 使用以上方式判断前端返回,微信团队郑重提示：
					//res.err_msg将在用户支付成功后返回ok，但并不保证它绝对可靠。
					  uni.redirectTo({
						url: "/pages/payresult/payresult?allprice="+_this.orderInfo.TotalPrice+"&orderNo="+_this.orderNo
					  })
					}else{
						uni.showToast({
							title: "支付失败",
							icon: "none",
							duration: 1500
						});
					} 
				}); 
			},
			//支付宝app支付
			async zfbapppay() {
				let result = await post("Order/AliPay", {
					UserId: this.userId,
					Token: this.token,
					orderNo:this.orderNo,
					paytype:2
				});console.log(result)
				if(result.code==0){console.log(result.data)
					// var payData=JSON.parse(result.data.JsParam)
					let _this=this;
					uni.requestPayment({
					  provider:"alipay",
					  orderInfo:result.data,
					  success(res) {
						  console.log(res)
						  _this.type = "";
							_this.showPay=false;
							uni.redirectTo({
								url: "/pages/payresult/payresult?allprice="+_this.orderInfo.TotalPrice+"&orderNo="+_this.orderNo
							})
						},
					  fail(err) {console.log(err)
						 //  uni.showToast({
						 //  	title:"支付失败",
							// icon:"none",
							// duration:4000
						 //  })
					  }
					})
				}else {
					uni.showToast({
						title: result.msg,
						icon: "none",
						duration: 1500
					});
				}
			},
			//支付宝支付H5
			async zfbH5pay(){
				let NewUrl=this.GetUrlRelativePath() +'/#/pages/payresult/payresult?allprice='+this.orderInfo.TotalPrice+"&orderNo="+this.orderNo;
				let QuitUrl=this.GetUrlRelativePath() +'/#/pages/pay/pay?orderNo='+this.orderNo;
				let result= await post("Order/AliPay",{
					UserId: this.userId,
					Token: this.token,
					orderNo:this.orderNo,
					NewUrl: NewUrl,
					QuitUrl:QuitUrl,//放弃支付跳转
					paytype:3
				});
				if(result.code == 0){
					this.isshowalipay=true;
					this.alipayCon=result.data;console.log(result.data)
					this.$nextTick().then(() => {
						 document.forms['alipaysubmit'].submit()
					})
				}else {
					uni.showToast({
						title: result.msg,
						icon: "none",
					});
				}
			},
			//小程序支付
			async ConfirmWeiXinSmallPay(){
				  let result= await post("Order/WechatPay",{
					WxCode: this.WxCode,
					UserId: this.userId,
					Token: this.token,
					OrderNo: this.orderNo,
					WxOpenid:this.WxOpenid ,
					paytype:4
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
								url: "/pages/card/paysuccess?allprice="+_this.orderInfo.TotalPrice+"&orderNo="+_this.orderNo
							})
						},
					  fail(res) {}
					})
				  }
			},
			//立即支付
			submitBtn(){
				if(!this.disable){
					if(this.payType==0){//微信支付
						// #ifdef  H5
						if(this.isWeixin()){
							this.payweixin();
						}else{
							this.H5payweixin();
						}
						// #endif
						// #ifdef  MP-WEIXIN
						this.ConfirmWeiXinSmallPay()
						// #endif
						// #ifdef APP-PLUS
						this.wxapppay()
						// #endif
					}else if(this.payType==1){
						// #ifdef APP-PLUS
						this.zfbapppay()
						// #endif
						// #ifdef H5
						if(this.isWeixin()){
							uni.showToast({
								title:"微信暂不支持支付宝支付，请在浏览器中打开！",
								icon:"none",
								duration:2500
							})
						}else{
							this.zfbH5pay()
						}
						// #endif
					}else if(this.payType==2){
						uni.showToast({
							title: "暂未开通！",
							icon: "none",
							duration: 2000
						});
					}else if(this.payType==3){//余额
						if(this.hasPayPassword==1){
							if(this.MemberWallet<this.orderInfo.TotalPrice){
								uni.showToast({
									title: "余额不足，请选择其他支付方式！",
									icon: "none",
									duration: 2000
								});
							}else{
								this.showPay=true;
							}
						}else{
							this.showMask = true
							// uni.showModal({
							// 	content:'您还未设置支付密码，无法使用余额支付，是否马上设置？',
							// 	success: function (res) {
							// 		if (res.confirm) {
							// 			uni.navigateTo({
							// 				url:"/pages/other/setpwd/setpwd"
							// 			})
							// 		} else if (res.cancel) {
							// 			console.log('用户点击取消');
							// 		}
							// 	}
							// })
						}
					}
				}
			},
			GetUrlRelativePath() {
				var urlStr = '';　　　　
				var url = document.location.toString();　　　　
				var arrUrl = url.split("//");　　　　
				var start = arrUrl[1].split("/");
				urlStr = arrUrl[0] + '//' + start[0];　　　　
				return urlStr;　　
			},	
		}
	}
</script>

<style scoped lang="scss">
	.alipayfram{
		position: fixed;
		width: 100%;
		height: 100%;
		left: 0; top: 0;
		background: #fff;
		z-index: 999;
	}
	page{ background: #fff;}
	.toastMask{
		position: fixed;background: #ffffff;
		z-index:200;
		top:50%;left:50%;
		width:600upx;
		height:300upx;
		border-radius: 25upx;
		transform: translate(-50%,-50%);
		.toast_title{
			height:200upx;
			text-align: center;
			display: flex;justify-content: center;align-items: center;
			padding:0 30upx;
			font-size:30upx;
			fong-weight:600;
			border-bottom: 1upx solid #f5f5f5;
		}
		.taost_btn{
			.btn_tt{
				width:50%;text-align: center;
				height:100upx;line-height: 100upx;
			}
			.btn_no2{
				color:#ff3333;
				border-left: 1upx solid #f5f5f5;
			}
		}
	}
  .ftbtn{
    position: fixed;
	width: 100%;
	bottom: 0;
	left: 0;
  }
  .ftbtn .btn{ height: 80upx; width: 100%; border-radius: 16upx; background: #FF6F00; display: flex; justify-content: center; align-items: center; flex-direction: column; font-size: 30upx; color:  #fff;}
  .ftbtn .btn.disabled{ background-color: #C9C9C9;}
  .payinfo{ background: #FF6F00; text-align: center; color: #fff; padding: 40upx 0;}
  .payinfo .p1{font-size: 32upx;}
  .payinfo .p2{justify-content: center;}
  .payinfo .p2 .payprice{ font-size: 76upx; line-height: 1.5}
  .payinfo .p2 .yuan{ font-size: 40upx}
  .countTiem{ background: rgba(255,255,255,.2); border-radius: 100px; padding: 4upx 30upx; display: inline-block;}
  .pay-hd{ padding: 20upx 20upx 0; font-size: 32upx; font-weight: 600}
  .pay-bd .line-item .icon {
      height: 72upx;
      width: 72upx;
  }
  .pay-bd .line-item .lab{ padding-left: 20upx; font-size: 30upx}
  .icon_alipay {
      background: url(http://shop.dadanyipin.com/static/icons/pay_alipay.png) center center no-repeat;
      background-size: cover;
  }
  .icon_weixin {
      background: url(http://shop.dadanyipin.com/static/icons/pay_weixin.png) center center no-repeat;
      background-size: cover;
  }
  .icon_yinlian {
      background: url(http://shop.dadanyipin.com/static/icons/pay_yinlian.png) center center no-repeat;
      background-size: cover;
  }
  .icon_yue {
      background: url(http://shop.dadanyipin.com/static/icons/pay_yue.png) center center no-repeat;
      background-size: cover;
  }
  .real-ipt{ width: 400upx; margin: 0 auto; font-size: 36upx;border: 1px solid #ddd; padding: .1rem;}
</style>
