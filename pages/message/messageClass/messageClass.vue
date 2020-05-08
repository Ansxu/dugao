<template>
	<view>
		<view class="uni-list" v-if="hasData">
			<block v-for="(item,index) in TypeList" :key="index">
				<view class="uni-list-cell" @click="tolink('/pages/message/messageList/messageList')">
					<view class="uni-media-list">
						<view class="uni-media-list-logo">
							<image class="img" :src="item.TypeImg" mode="aspectFill"></image>
						</view>
						<view  class="uni-media-list-body">
							<view class="uni-media-list-text-top uni-ellipsis">{{item.MsgName}}</view>
							<view  class="uni-media-list-text-bottom uni-ellipsis">
								{{item.NoticeTitle}}
							</view>
						</view>
						<view class="uni-media-list-r">
							<view class="time">{{item.PubTime}}</view>
							<view class="uni-badge uni-badge-red" v-if="item.unCount!=0">{{item.unCount}}</view>
						</view>
					</view>
				</view>
			</block>
		</view>
		<noData :isShow="noDataIsShow"></noData>
	</view>
</template>

<script>
	import {host,post,get,dateUtils,toLogin,getCurrentPageUrlWithArgs} from '@/common/util.js';
	import noData from '@/components/noData.vue'; //暂无数据
	export default {
		components: {
			noData
		},
		data() {
			return {
				curPage: "",
				userId: "",
				token: "",
				hasData:false,
				noDataIsShow: false,
				
				TypeList:[{
					TypeImg:'http://shop.dadanyipin.com/static/icons/notice0.png',
					MsgName:'收益通知',
					NoticeTitle:'您的客户在03/26/ 10:00购物',
					PubTime:'03/26/ 10:00',
					unCount:0
				},{
					TypeImg:'http://shop.dadanyipin.com/static/icons/notice1.png',
					MsgName:'系统通知',
					NoticeTitle:'欢迎注册会员,快开启省钱模式吧！',
					PubTime:'03/26/ 10:00',
					unCount:0
				}]
			};
		},
		onLoad() {
			this.userId = uni.getStorageSync("userId");
			this.token = uni.getStorageSync("token");
			this.curPage = getCurrentPageUrlWithArgs().replace(/\?/g, '%3F').replace(/\=/g, '%3D').replace(/\&/g, '%26');
		},
		onShow() {
			// if (toLogin(this.curPage)) {
				this.NoticeTypeList();
			// }
		},
		methods:{
			async NoticeTypeList() {
				let result = await post("News/NoticeTypeList", {
					"UserId": this.userId,
					"Token": this.token
				});
				if (result.code === 0) {
					console.log(result,"news")
					this.TypeList=result.data;
					if (result.data.length > 0){
						this.hasData = true;
						result.data.forEach(function(item){
							item.PubTime=dateUtils.format(item.PubTime);
						})
					}else{
						this.noDataIsShow = true;
					}
				} else if (result.code === 2) {
					let _this = this;
					uni.showToast({
						title: "登录超时，请重新登录!",
						icon: "none",
						duration: 2000,
						success: function() {
							setTimeout(function() {
								uni.redirectTo({
									url: "/pages/login/login?askUrl=" + _this.curPage
								});
							}, 2000);
						}
					}); //如果未登录则跳转到登陆页面
				} else {
					uni.showToast({
						title: result.msg,
						icon: "none",
						duration: 2000
					});
				}
			},
			MessageList(type,keyname,shopid){
				uni.navigateTo({
					url: '/pages/Message/MessageList/MessageList?type='+type+'&keyname='+keyname+'&shopId='+shopid
				});
			},
			//跳转
			tolink(Url) {
				uni.navigateTo({
					url: Url
				})
			},
		}
	}
</script>

<style scoped>
	.uni-media-list-logo{ width: 100upx; height: 100upx;}
	.uni-media-list-body{ padding: 8upx 0;}
	.uni-media-list-r{ text-align: right; height: 84upx; padding: 8upx 0;}
	.uni-media-list-r .time{ color: #999; line-height: 36upx;}
	.uni-badge-red{ background: #fa3d34;}
	.uni-list-cell::after{left: 150upx;}
</style>
