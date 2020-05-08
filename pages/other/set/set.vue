<template>
	<view class="uni-mt10">
		<!-- <view class="flex flexAlignCenter justifyContentBetween item bg_fff mt2">
			<view>账户和安全</view>
			<view class="iconfont icon-arrow_r font26"></view>
		</view> -->
		<view class="flex flexAlignCenter justifyContentBetween item bg_fff" @click="golink('/pages/other/changeLoginPwd/changeLoginPwd')">
			<view>修改登录密码</view>
			<view class="iconfont icon-arrow_r font26"></view>
		</view>
		<view class="flex flexAlignCenter justifyContentBetween item bg_fff" @click="golink('/pages/other/setpwd/setpwd')">
			<view>设置支付密码</view>
			<view class="iconfont icon-arrow_r font26"></view>
		</view>
		
		<!-- <view class="flex flexAlignCenter justifyContentBetween item bg_fff">
			<view>清理缓存</view>
			<view>63.25M</view>
		</view> -->
		
		<!-- <view class="flex flexAlignCenter justifyContentBetween item bg_fff">
			<view>关于我们</view>
			<view class="iconfont icon-arrow_r font26"></view>
		</view> -->
		<!-- #ifdef APP-PLUS -->
		<view class="flex flexAlignCenter justifyContentBetween item bg_fff">
			<view>软件版本</view>
			<view>{{version}}</view>
		</view>
		<!-- #endif -->
		<view class="" style="text-align: center;padding-top: 80px;color: #ccc;">
			<view class="">Copyright© 2020</view>
			<view class="">成都弘觅科技有限责任公司 版本所有</view>
			
			
		</view>
		
		<view class="btn_fix" @click="logOut">退出登录</view>
	</view>
</template>

<script>
	import {host,post,get,toLogin} from '@/common/util.js';
	export default{
		data(){
			return{
				version:''
			}
		},
		onShow(){
			// #ifdef APP-PLUS
			this.version = plus.runtime.version
			// #endif
		},
		methods:{
			golink(url){
				if(toLogin()){
					uni.navigateTo({
						url:url
					})
				}
			},
			// 退出登录
			logOut() {
				uni.showModal({
					title:'退出登录',
					content:"是否退出登录！",
					cancelColor:'#999',
					confirmColor:'#ff6f00',
					success(res){
						if(res.confirm){
							uni.setStorageSync('token', '');
							uni.setStorageSync('userId', '');
							uni.setStorageSync('liveUserId', '');//清除商家直播账号
							uni.setStorageSync('liveToken', '');//清除商家直播账号
							uni.setStorageSync("unionid", ""); 
							uni.setStorageSync("openId", ""); 
							uni.setStorageSync("userInfo", "");
							uni.switchTab({
								url: '/pages/tabBar/index/index'
							});
						}
					}
				})
			},
		}
	}
</script>

<style lang="scss">
@import './style';
</style>
