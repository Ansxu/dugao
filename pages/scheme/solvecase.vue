<template>
	<!-- 保花保果解决方案 -->
	<view class="">
		<view class="banner">
			<swiper>
				<swiper-item v-for="(item, index) in 1" :key="index"><img src="@/static/home/banner.png" alt="" /></swiper-item>
			</swiper>
		</view>
		<view class="introduce">
			<view class="introduce-flex">
				<view class="introduce-width">
					<view class="fz30">作物</view>
					<view class="fz28">大棚夏黑葡萄</view>
				</view>
				<view class="">
					<view class="fz30">面积</view>
					<view class="fz28">50多亩</view>
				</view>
			</view>
			<view class="introduce-top">
				<view class="fz30">问题</view>
				<view class="fz28">2014年1月份，建水遭遇了多年不遇的雪灾天气，当时大棚夏黑葡萄的新梢普遍有20来公分长，雪灾导致大多数葡萄基地的新梢和花穗都被冻坏、冻死，后来重新发出来的新梢花穗少、质量差，产量大幅下降。</view>
			</view>
			<view class="introduce-top">
				<view class="fz30">解决方案</view>
				<view class="fz28">2014年1月份，建水遭遇了多年不遇的雪灾天气，当时大棚夏黑葡萄的新梢普遍有20来公分长，雪灾导致大多数葡萄基地的新梢和花穗都被冻坏、冻死，后来重新发出来的新梢花穗少、质量差，产量大幅下降。</view>
			</view>
			<view class="introduce-top">
				<view class="fz30">使用效果</view>
				<view class="fz28">2014年1月份，建水遭遇了多年不遇的雪灾天气，当时大棚夏黑葡萄的新梢普遍有20来公分长，雪灾导致大多数葡萄基地的新梢和花穗都被冻坏、冻死，后来重新发出来的新梢花穗少、质量差，产量大幅下降。</view>
			</view>
			<view class="introduce-top">
				<view class="introduce-img">
					<img src="@/static/scheme/scheme-1.png" alt="" mode=""></img>
				</view>
				<view class="introduce-fz28">2014年1月份遭遇雪灾，葡萄受冻时的情况</view>
			</view>
			<view class="introduce-top">
				<view class="introduce-img">
					<img src="@/static/scheme/scheme-1.png" alt="" mode=""></img>
				</view>
				<view class="introduce-fz28">2014年1月份遭遇雪灾，葡萄受冻时的情况</view>
			</view>
			<view class="introduce-top">
				<view class="introduce-img">
					<img src="@/static/scheme/scheme-1.png" alt="" mode=""></img>
				</view>
				<view class="introduce-fz28">2014年1月份遭遇雪灾，葡萄受冻时的情况</view>
			</view>
		</view>
	</view>
</template>

<script></script>

<style lang="css" scoped>
.banner {
	// height: 749upx;
}
img {
	width: 100%;
	height: 100%;
}
.introduce{
	padding: 0 30upx;
}
.introduce-flex{
	display: flex;
	padding-top: 30upx;
}
.introduce-width{
	width: 50%;
}
.fz30{
	font-size:30upx;
	font-weight:bold;
	color:rgba(51,51,51,1);
	line-height:60upx;
}
.fz28{
	font-size:28upx;
	color:rgba(102,102,102,1);
}
.introduce-top{
	padding-top: 30upx;
}
.introduce-img{
	width:690upx;
	height:400upx;
}
.introduce-fz28{
	height:100upx;
	background:rgba(245,245,245,1);
	border-radius:0px 0px 16upx 16upx;
	font-size:28upx;
	color:rgba(51,51,51,1);
	text-align: center;
	line-height: 100upx;
}
</style>
