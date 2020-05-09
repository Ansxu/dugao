<template>
	<!-- 我的钱包 -->
	<view class="wallet">
		<view class="walletbox">
			<view class="reveal">
				<img src="@/static/my/wallet-bg.png" alt="">
				<view class="symbol"><span>￥</span>{{wallet}}</view>
				<view class="balance">账户余额(元)</view>
			</view>
		</view>
		<view class="walletbox">
			<view class="drawing across">
				<view class="folds">
					<image class="fold" src="http://ddyp.wtvxin.com/static/icons/wallet1.png" mode=""></image>
				</view>
				<view class="detail" @click="golink('/pages/other/money/money')">交易明细</view>
				<view class="">
					<image class="arrows" src="http://ddyp.wtvxin.com/static/hpicons/arrows.svg" mode=""></image>
				</view>
			</view>
			<view class="drawing" style="padding-top: 20upx;">
				<view class="folds">
					<image class="fold" src="http://ddyp.wtvxin.com/static/icons/wallet3.png" mode=""></image>
				</view>
				<view class="detail" style="padding-right: 66%;" @click="golink('/pages/Wallet/bankCard/bankCard')">银行卡管理</view>
				<view class="">
					<image class="arrows" src="http://ddyp.wtvxin.com/static/hpicons/arrows.svg" mode=""></image>
				</view>
			</view>
		</view>
		<view class="present">
			<view class="recharge" style="width: 100%;"  @click="golink('/pages/my/topup')">充值</view>
			<!-- <view class="recharge" @click="golink('/pages/other/withdraw/withdraw')">提现</view> -->
		</view>
		
	</view>
</template>

<script>
	import {host,post,get,toLogin} from '@/common/util.js';
	export default {
		data(){
			return{
				wallet:0,//余额
			}
		},
		onShow() {
			this.wallet=this.$store.state.Wallet;
			//this.wallet=Number(this.wallet).toFixed(2)
		},
		methods:{
			golink(url){
				if(toLogin()){
					uni.navigateTo({
						url:url
					})
				}
			},
			
		}
	
	}
</script>

<style scoped lang="scss">
	.wallet{
	}
	.walletbox{
		background: #FFFFFF;
		padding: 30upx;
	}
	.across{
		padding-bottom: 20upx;
		border-bottom:1px solid rgba(236,236,236,1);
	}
	.reveal{
		width: 100%;
		height: 300upx;
		border-radius:30upx;
		// background:url('@/static/my/wallet-bg.png');
		font-family:PingFang;
		font-weight:bold;
		color:rgba(252,252,252,1);
		text-align: center;
		padding-top: 70upx;
		position:relative;
		img{
			height:300upx;
			width:100%;
			position:absolute;
			top:0;
			left:0;
			z-index:0;
		}
	}
	.symbol{
		font-size:60upx;
		position:relative;
	}
	.symbol span{
		font-size:40upx;
	}
	.balance{
		font-size:24upx;
		position:relative;
	}
	.drawing{
		display: flex;
	}
	.fold{
		width:44upx;
		height:44upx;
	}
	.detail{
		font-size:28upx;
		font-family:PingFang;
		font-weight:500;
		color:rgba(36,36,36,1);
		padding-left: 25upx;
		padding-right: 70%;
	}
	.arrows{
		width:22upx;
		height:19upx;
		padding-right: 1;
	}
	.present{
		padding: 100upx 30upx 0 30upx;
		display: flex;
		justify-content: space-between;
		align-items: center;
		font-family:PingFang;
		font-weight:500;
		color:rgba(255,255,255,1);
	}
	.recharge{
		width:320upx;
		height:80upx;
		background:#ff6f00;
		border-radius:10upx;
		font-size:32upx;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	
</style>
