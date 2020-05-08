<template>
	<view class="bg">
		<view class="msk">
			<image src="http://shop.dadanyipin.com/static/x.png" mode="widthFix" class="close" @click="close"></image>
			<view class="img">
				<image src="http://shop.dadanyipin.com/static/logo2.png" mode="widthFix"></image>
			</view>
			<view class="btnbox">
				<!-- #ifdef MP-WEIXIN -->
				<view class="btnitem" @click="goUrl('/pages/login/login')">
					<image src="http://shop.dadanyipin.com/static/my/wx.png" mode=""></image>
					<text>微信登录</text>
				</view>
				<!-- #endif -->
				<!-- #ifndef MP-WEIXIN -->
				<view class="btnitem btnitem2" @click="goUrl('/pages/login/login')">
					<image src="http://shop.dadanyipin.com/static/mobile.png" mode="widthFix"></image>
					<text>手机登录</text>
				</view>
				<!-- #endif -->
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props:{
			showtype:{
				type: Number,
				default: 0
			},
		},
		data() {
			return {
				
			};
		},
		methods:{
			close(){
				uni.switchTab({
					url:"/pages/tabBar/index/index"
				})
			},
			goUrl(url){
				uni.navigateTo({
					url:url
				})
			}
		}
	}
</script>

<style>
.bg{
	background: url("http://shop.dadanyipin.com/static/bg.png");
	background-size: cover;
	width: 100%;
	height: 100vh;
	position: fixed;
	top: 0;
	z-index: 999;
}
.msk{
	background:rgba(0,0,0,.4);
	position: fixed;
	top: 0;
	width: 100%;
	height: 100vh;
	z-index: 999;
}
.close{
	position: fixed;
	top: 30upx;
	left: 30upx;
	width:40upx;
	height: 40upx;
	z-index: 9999;
}
.img{
	width: 380upx;
	/* height: 120upx; */
	position: absolute;
	top: 20%;
	left: 50%;
	transform: translateX(-50%);
}
.btnbox{
	width: 80%;
	position: absolute;
	bottom: 20%;
	left: 10%;
	height: 88upx;
}
.btnbox .btnitem{
	display: flex;
	align-items: center;
	justify-content: center;
	width: 100%;
	height: 100%;
	border-radius: 44upx;
	background: #fff;
	margin-bottom: 40upx;
}
.btnbox .btnitem2{
	background: rgba(255,255,255,0.4)!important;
	color: #fff!important;
}
.btnitem image{
	width: 44upx;
	height: 44upx;
	margin: 0;
	margin-right: 30upx;
}
.btnitem2 image{
	width: 30upx;
	margin: 0;
	margin-right: 30upx;
}
</style>
