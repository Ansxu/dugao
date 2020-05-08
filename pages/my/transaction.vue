<template>
	<!-- 交易明细 -->
	<view class="transaction">
		<view class="head">
			<view class="">
				<view class="" style="color:rgba(255,51,51,1);">全部</view>
				<view class="across"></view>
			</view>
			<view class="">
				<view class="">充值记录</view>
				<view class="across"></view>
			</view>
			<view class="">
				<view class="">提现记录</view>
				<view class="across"></view>
			</view>
		</view>
		<view class="times">
			<view class="dates">2019-08<image class="uta" src="http://ddyp.wtvxin.com/static/hpicons/uta.svg" mode=""></image></view>
		</view>
		<view class="rechargebox">
			<view class="recharge">
				<view class="">
					<view class="full">充值</view>
					<view class="fulls">2019-08-29 15:06</view>
				</view>
				<view class="">-13.00</view>
			</view>
			<view class="recharge">
				<view class="">
					<view class="full">充值</view>
					<view class="fulls">2019-08-29 15:06</view>
				</view>
				<view class="">-13.00</view>
			</view>
		</view>
	</view>
</template>

<script>
</script>

<style scoped>
	.transaction{
		background: #FFFFFF;
		/* padding: 30rpx; */
	}
	.head{
		display: flex;
		justify-content: space-around;
		font-size:30rpx;
		font-family:PingFang;
		font-weight:bold;
		color:rgba(51,51,51,1);
		padding: 30rpx;
		position: relative;
	}
	.across{
		width:72rpx;
		height:4rpx;
		background:rgba(255,51,51,1);
		position: absolute;
		bottom: 0;
	}
	.times{
		width:100%;
		height:56px;
		background:rgba(236,236,236,1);
		display: flex;
		justify-content: flex-start;
		align-items: center;
	}
	.dates{
		width:170rpx;
		height:44rpx;
		background:rgba(255,255,255,1);
		border-radius:22rpx;
		font-size:24rpx;
		font-family:PingFang;
		font-weight:500;
		color:rgba(51,51,51,1);
		margin-left: 30rpx;
		padding-left: 20rpx;
	}
	.uta{
		width:32rpx;
		height:20rpx;
	}
	.rechargebox{
		padding:0 30rpx;
	}
	.recharge{
		display: flex;
		justify-content: space-between;
		align-items: center;
		border-bottom: 1rpx solid #ECECEC;
		font-family:PingFang;
		font-weight:500;
		padding: 20rpx 0;
	}
	.full{
		font-size:28rpx;
		color:rgba(51,51,51,1);
		line-height: 60rpx;
	}
	.fulls{
		font-size:20rpx;
		color:rgba(153,153,153,1);
	}
	
	
	
	
</style>
