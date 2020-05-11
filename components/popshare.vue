<template>
	<view>
		<view class="uni-mask" v-show="show" :style="{top:offsetTop + 'px'}" @click="hide" @touchmove.stop.prevent="moveHandle"></view>
		<view class="uni-popup" v-show="show">
			<view class="sharelist clear">
				<view class="share-item">
					<image class="imgico" src="http://www.sc-mall.net/static/ico_wx.png" mode="aspectFit"></image>
					<text class="txt">微信好友</text>
				</view>
				<view class="share-item">
					<image class="imgico" src="http://www.sc-mall.net/static/ico_quan.png" mode="aspectFit"></image>
					<text class="txt">微信朋友圈</text>
				</view>
				<view class="share-item">
					<image class="imgico" src="http://www.sc-mall.net/static/ico_qq.png" mode="aspectFit"></image>
					<text class="txt">QQ好友</text>
				</view>
				<view class="share-item">
					<image class="imgico" src="http://www.sc-mall.net/static/ico_qzoon.png" mode="aspectFit"></image>
					<text class="txt">QQ空间</text>
				</view>
				<view class="share-item">
					<image class="imgico" src="http://www.sc-mall.net/static/ico_weibo.png" mode="aspectFit"></image>
					<text class="txt">新浪微博</text>
				</view>
				<view class="share-item">
					<image class="imgico" src="http://www.sc-mall.net/static/ico_info.png" mode="aspectFit"></image>
					<text class="txt">短信发送</text>
				</view>
				<view class="share-item">
					<image class="imgico" src="http://www.sc-mall.net/static/ico_copy.png" mode="aspectFit"></image>
					<text class="txt">复制链接</text>
				</view>
			</view>
			<slot></slot>
			<view style="height: 90upx;"></view>
			<view class="uni-close-bottom" @click="hide">取消分享</view>
		</view>
	</view>
</template>
<script>
	export default {
		props: {
			show: {
				type: Boolean,
				default: false
			},
			/**
			 * h5遮罩是否到顶
			 */
			h5Top: {
				type: Boolean,
				default: false
			},
		},
		data() {
			let offsetTop = 0;
			//#ifdef H5
			if (!this.h5Top) {
				offsetTop = 44;
			} else {
				offsetTop = 0;
			}
			//#endif
			return {
				offsetTop: offsetTop
			}
		},
		watch: {
			h5Top(newVal) {
				if (newVal) {
					this.offsetTop = 44;
				} else {
					this.offsetTop = 0;
				}
			}
		},
		methods: {
			hide: function() {
				this.$emit('hidePopup');
			},
			moveHandle() {}
		}
	}
</script>
<style>
	.uni-mask {
		position: fixed;
		z-index: 999;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;
		background-color: rgba(0, 0, 0, .4);
	}
	.uni-popup {
		position: fixed;
		z-index: 999;
		background-color: #ffffff;
		box-shadow: 0 0 30upx rgba(0, 0, 0, .1);
		left: 0;
		bottom: 0;
		width: 100%;
		text-align: center;
	}
	.sharelist{ padding: 40upx 20upx 20upx;}
	.sharelist .share-item{ float: left; width: 25%; margin-bottom: 20upx;}
	.imgico{ display: block; width: 100upx; height: 100upx;}
	.txt{ color: #333; font-size: 26upx;}
	.uni-close-bottom{ height: 90upx; line-height: 90upx; width: 100%; position: absolute;bottom: 0; left: 0; font-size: 30upx; border-top: 1px solid #ddd; background: #eee; color: #999;}
</style>
