<template>
	<view class="emptybox" v-if="isShow">
		<view class="iconimg">
			<view class="iconfont icon-wushuju"></view>
			<!-- <image class="img" src="http://www.sc-mall.nethttp://shop.dadanyipin.com/static/noCart.png" mode="aspectFill"></image> -->
		</view>
		<view class="tips uni-center">暂无数据 </view>
	</view>
</template>

<script>
	export default {
		props: ["isShow"],
		data() {
			return {
				
			};
		},
		created: function(){
			
		}
	}
</script>

<style>
.emptybox{
    padding-bottom: 80upx;
    padding-top:180upx;
    margin-top:0 !important;
  }
  .iconimg{
	  display: flex;justify-content: center;align-items: center;
  }
 .iconimg .img{ display: block; width: 200upx; height: 200upx; margin: 0 auto 20upx;}
 .iconimg .iconfont{ display: block; font-size: 80upx; color: #999; margin: 0 auto 20upx; text-align:center;}
 .emptybox .tips{ color: #999;}
</style>
