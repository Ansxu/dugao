<template>
	<!-- 视频详情 -->
	<view class="">
		<view class="video">
			<video class=""
				id="myVideo"
				src="https://img.cdn.aliyun.dcloud.net.cn/guide/uniapp/%E7%AC%AC1%E8%AE%B2%EF%BC%88uni-app%E4%BA%A7%E5%93%81%E4%BB%8B%E7%BB%8D%EF%BC%89-%20DCloud%E5%AE%98%E6%96%B9%E8%A7%86%E9%A2%91%E6%95%99%E7%A8%8B@20181126.mp4"
				@error="videoErrorCallback"
				controls
			></video>
		</view>
		<view class="video-padd">
			<view class="video-mark">儒家武林武功秘籍 功夫书籍</view>
			<view class="video-flex">
				<view class="video-right">2018-06-28</view>
				<view class="">20人浏览</view>
				<view class="video-flexs">
					<view class="">
						<image class="videoimg" src="../../static/icons/like.png" mode=""></image>
					</view>
					<view class="">252</view>
				</view>
			</view>
			<view class="video-brief">简介:重新发出来的新梢基本上都有花穗，并且花穗饱满，和第一次发出来的花穗质量相差无几，后来采收时130亩的夏黑葡萄每亩产量平均有2000多公斤，此次雪灾对徐老板的葡萄基本上没多少影响，也更加坚定了徐老板继续用杜高的决心。徐老板说:我投资这么大，我不敢换其它产品，我只用杜高产品。</view>
		</view>
		<view class="ploe"></view>
		<view class="">
			<view class="video-comm">全部评论</view>
			<view class="video-con">
				<view class="videohead">
					<image src="" mode=""></image>
				</view>
				<view class="video-con bott">
					<view class="video-box">
						<view class="fz28">刘潇潇</view>
						<view class="fz22">12分钟前</view>
						<view class="fz28">枣上好，愿你开心一整天。</view>
					</view>
					<view class="video-con">
						<view class="">
							<image class="videoimgs" src="../../static/icons/like-red.png" mode=""></image>
						</view>
						<view class="fz22">252</view>
					</view>
				</view>
			</view>
			<view class="video-con">
				<view class="videohead">
					<image src="" mode=""></image>
				</view>
				<view class="video-con bott">
					<view class="video-box">
						<view class="fz28">刘潇潇</view>
						<view class="fz22">12分钟前</view>
						<view class="fz28">枣上好，愿你开心一整天。</view>
					</view>
					<view class="video-con">
						<view class="">
							<image class="videoimgs" src="../../static/icons/like.png" mode=""></image>
						</view>
						<view class="fz22">252</view>
					</view>
				</view>
			</view>
			<view class="video-ex fz22">已显示全部评论</view>
			<view class="video-bottom">
				<view class="video-leave">
					<image class="videoimgss" src="../../static/icons/classify-icon.png" mode=""></image>
					<input type="text" value="" placeholder="留下你精彩评论吧~"/>
				</view>
				<view>发送</view>
			</view>
		</view>
	</view>
</template>

<script></script>

<style scoped>
	.video video{
		width: 100%;
	}
	.video-padd{
		padding: 0 30upx;
	}
	.video-mark{
		font-size:32upx;
		line-height:80upx;
	}
	.video-flex{
		display: flex;
		font-size:20upx;
		color:rgba(153,153,153,1);
	}
	.video-right{
		padding-right: 10%;
	}
	.video-flexs{
		display: flex;
		padding-left: 44%;
	}
	.videoimg{
		width: 26upx;
		height: 26upx;
		margin-top: -14upx;
		padding-right: 10upx;
	}
	.video-brief{
		background:rgba(245,245,245,1);
		border-radius:10px;
		padding: 30upx;
		font-size:28upx;
		line-height:40upx;
		margin: 30upx 0;
	}
	.ploe{
		height:20upx;
		background:rgba(245,245,245,1);
	}
	.video-comm{
		font-size:32upx;
		font-weight:bold;
		color:rgba(51,51,51,1);
		padding: 27upx;
		border-bottom: 1upx solid rgba(236,236,236,1);
	}
	.video-con{
		display: flex;
	}
	.videohead{
		width: 64upx;
		height: 64upx;
		border-radius: 50%;
		background: pink;
		margin: 20upx 16upx 0 30upx;
	}
	.videohead image{
		width: 100%;
		height: 100%;
	}
	.bott{
		width: 85%;
		border-bottom: 1upx solid rgba(236,236,236,1);
		padding: 28upx 0;
		
	}
	.video-box{
		width: 82%;
	}
	.fz28{
		font-size:28upx;
	}
	.fz22{
		font-size:22upx;
		color:rgba(152,154,166,1);
		line-height: 50upx;
	}
	.videoimgs{
		width: 26upx;
		height: 26upx;
		padding-right: 10upx;
	}
	.video-ex{
		padding: 40upx 0;
		text-align: center;
		border-bottom: 1upx solid rgba(236,236,236,1);
	}
	.video-bottom{
		display: flex;
		padding: 19upx 30upx 10upx 30upx;
		line-height:60upx;
	}
	.videoimgss{
		width:29upx;
		height:30upx;
		padding: 17upx 20upx 0upx 30upx;
	}
	.video-leave{
		width:614upx;
		height:60upx;
		background:rgba(247,247,247,1);
		border-radius:10upx;
		display: flex;
		margin-right: 20upx;
	}
	.video-leave input{
		font-size:26upx;
		font-weight:500;
		color:rgba(153,153,153,1);
		padding-top: 17upx;
	}
</style>
