<template>
	<!-- 施肥方案 -->
	<view>
		<view class="ploe"></view>
		<view class="fer-padd">
			<view class="fer-top">
				<view class="fer-pos">
					<view class="fer-img padd">
						<image src="@/static/scheme/scheme-3.png" mode=""></image>
					</view>
					<view class="fer-modal">
						<view class="fer-fz28">改良土壤解决方案</view>
					</view>
				</view>
				<view class="fer-pos">
					<view class="fer-img padd">
						<image src="@/static/scheme/scheme-3.png" mode=""></image>
					</view>
					<view class="fer-modal">
						<view class="fer-fz28">改良土壤解决方案</view>
					</view>
				</view>
			</view>
			<view class="fer-top">
				<view class="fer-pos">
					<view class="fer-img padd">
						<image src="@/static/scheme/scheme-3.png" mode=""></image>
					</view>
					<view class="fer-modal">
						<view class="fer-fz28">改良土壤解决方案</view>
					</view>
				</view>
				<view class="fer-pos">
					<view class="fer-img padd">
						<image src="@/static/scheme/scheme-3.png" mode=""></image>
					</view>
					<view class="fer-modal">
						<view class="fer-fz28">改良土壤解决方案</view>
					</view>
				</view>
			</view>
			<view class="fer-top">
				<view class="fer-pos">
					<view class="fer-img padd">
						<image src="@/static/scheme/scheme-3.png" mode=""></image>
					</view>
					<view class="fer-modal">
						<view class="fer-fz28">改良土壤解决方案</view>
					</view>
				</view>
				<view class="fer-pos">
					<view class="fer-img padd">
						<image src="@/static/scheme/scheme-3.png" mode=""></image>
					</view>
					<view class="fer-modal">
						<view class="fer-fz28">改良土壤解决方案</view>
					</view>
				</view>
			</view>
			
			
			
		</view>
	</view>
</template>

<script>
</script>

<style scoped>
	.ploe{
		height: 20upx;
		background: #f5f5f5;
	}
	.fer-padd{
		padding: 10upx 30upx 0 30upx;
	}
	.fer-top{
		padding-top: 20upx;
		display: flex;
	}
	.fer-pos{
		position: relative;
	}
	.fer-img{
		width:335upx;
		height:168upx;
		border-radius:15upx;
	}
	image{
		width: 100%;
		height: 100%;
	}
	.padd{
		margin-right: 22upx;
	}
	.fer-modal{
		width:335upx;
		height:168upx;
		border-radius:15upx;
		background-color:rgba(0,0,0,0.5);
		position: absolute;
		top: 0;
		z-index: 1;
	}
	.fer-fz28{
		font-size:28upx;
		color:rgba(255,255,255,1);
		position: absolute;
		bottom: 10%;
		left: 15%;
	}
</style>
