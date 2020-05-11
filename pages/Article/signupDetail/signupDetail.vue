<template>
	<view class="commentPage">
		<view class="uni-list uni-bg-white uni-mb10">
			<view class="uni-list-cell" @click="gotoDetail(ActInfo.Id)">
				<view class="uni-media-list">
					<view class="uni-media-list-logo">
						<block v-if="ActInfo.ImgList">
							<image :src="imgArr[0]" mode="aspectFill"></image>
						</block>
						<image v-else src="/static/60x60.png" mode="aspectFill"></image>
					</view>
					<view class="uni-media-list-body">
						<view class="uni-media-list-text-top">{{ActInfo.Title}}</view>
						<view class="uni-media-list-info">
							<view class="info"><text class="iconfont icon-shijian"></text>{{ActInfo.AddTime}}</view>
							<view class="info"><text class="iconfont icon-dizhi1"></text>{{ActInfo.Location}}</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="uni-list uni-bg-white uni-mb10">
			<view class="title_hd">活动信息</view>
			<view class="uni-list-cell">
				<view class="uni-list-cell-navigate">
					<text class="list-cell-l">开始时间:</text>
					<text class="list-cell-r">{{ActInfo.AddTime}}</text>
				</view>
			</view>
			<view class="uni-list-cell">
				<view class="uni-list-cell-navigate">
					<text class="list-cell-l">结束时间:</text>
					<text class="list-cell-r">{{ActInfo.EndTime}}</text>
				</view>
			</view>
			<view class="uni-list-cell">
				<view class="uni-list-cell-navigate">
					<text class="list-cell-l">活动地址:</text>
					<text class="list-cell-r">{{ActInfo.Location}}</text>
				</view>
			</view>
		</view>
		<view class="uni-list uni-bg-white uni-mb10">
			<view class="title_hd">报名信息</view>
			<view class="uni-list-cell">
				<view class="uni-list-cell-navigate">
					<text class="list-cell-l">姓名:</text>
					<text class="list-cell-r">{{ActInfo.UserName}}</text>
				</view>
			</view>
			<view class="uni-list-cell">
				<view class="uni-list-cell-navigate">
					<text class="list-cell-l">手机号:</text>
					<text class="list-cell-r">{{ActInfo.UserPhone}}</text>
				</view>
			</view>
			<view class="uni-list-cell">
				<view class="uni-list-cell-navigate">
					<text class="list-cell-l">证件类型:</text>
					<text class="list-cell-r">身份证</text>
				</view>
			</view>
			<view class="uni-list-cell">
				<view class="uni-list-cell-navigate">
					<text class="list-cell-l">证件号:</text>
					<text class="list-cell-r">{{ActInfo.UserIdCard}}</text>
				</view>
			</view>
		</view>
		<view class="uni-list uni-bg-white">
			<view class="title_hd">温馨提示</view>
			<view class="art-desc">
				{{ActInfo.Remind}}
			</view>
		</view>
		<!-- 底部-->
		<view class="foot-fiexd">
			<view class="foot-activity">
				<view class="btn" @click="cancel(ActInfo.Id,ActInfo.UserName,ActInfo.UserIdCard,ActInfo.UserPhone)">取消报名</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {host,post,get,toLogin,getCurrentPageUrlWithArgs} from '@/common/util.js';
	export default {
		onLoad: function(e) {
			this.curPage = getCurrentPageUrlWithArgs().replace(/\?/g, '%3F').replace(/\=/g, '%3D').replace(/\&/g, '%26');
			this.userId = uni.getStorageSync("userId");
			this.token = uni.getStorageSync("token");
			this.ActivityId=e.id;
			this.ActivityInfo();
		},
		data() {
			return {
				userId: "",
				token: "",
				curPage:"",
				ActivityId:"",
				ActInfo:{},
				imgArr:[]
			};
		},
		methods:{
			/*获取报名详情*/
			async ActivityInfo(){
				let	result = await post("Find/ActivityInfo", {
					"UserId": this.userId,
					"Token": this.token,
					"ActivityId":this.ActivityId
				});
				if (result.code === 0){
					this.ActInfo=result.data;
					this.imgArr=this.ActInfo.ImgList.split(",");
					this.ActInfo.AddTime=this.ActInfo.AddTime.replace("T"," ").substring(0,16);
					this.ActInfo.EndTime=this.ActInfo.EndTime.replace("T"," ").substring(0,16);
					let PhoneNO=this.ActInfo.UserPhone;
					this.ActInfo.UserPhone = PhoneNO.substring(0, 3) + '****' + PhoneNO.substring(PhoneNO.length - 4);
					let CardNO=this.ActInfo.UserIdCard;
					this.ActInfo.UserIdCard = CardNO.substring(0, 1) + '****************' + CardNO.substring(CardNO.length - 1);
				}else if (result.code === 2) {
					//未登录
				} else {
					uni.showToast({
						title: result.msg,
						icon: "none",
						duration: 2000
					});
				}
			},
			// 取消活动
			async ActivityOperation(ActId,Name,Card,Phone){
				let result = await post("Find/ActivityOperation", {
					"UserId": this.userId,
					"Token": this.token,
					"ActivityId": ActId,
					"UserName": Name,
					"UserIdCard": Card,
					"UserPhone": Phone
				});
				if (result.code === 0) {
					setTimeout(function() {
						uni.navigateTo({
							url: "/pages/Article/Suseess/Suseess?type=1"+"&id="+ActId
						});
					},1000)
				}else if (result.code === 2) {
					uni.showToast({
						title: result.msg,
						icon: "none",
						duration: 2000
					});
				} else {
					uni.showToast({
						title: result.msg,
						icon: "none",
						duration: 2000
					});
				}
			},
			cancel(ActId,Name,Card,Phone){
				let _this=this;
				uni.showModal({
					content: "确定要取消该活动？",
					success(res) {
						if (res.confirm) {
							_this.ActivityOperation(ActId,Name,Card,Phone);
						} else if (res.cancel) {
						}
					}
				});
			},
			gotoDetail(id){
				uni.navigateTo({
					url: '/pages/Article/activityDetail/activityDetail?id='+id
				})
			}
		}
	}
</script>

<style scoped>
	.uni-list:after{ display: none;}
	.uni-media-list {
		padding: 22upx 20upx;
	}

	.uni-list-cell::after {
		left: 20upx;
	}

	.uni-media-list-logo {
		height: 200upx;
		width: 200upx;
		border-radius: 6px;
		overflow: hidden;
	}

	.uni-media-list-body {
		height: 200upx;
	}

	.uni-media-list-text-top {
		word-break: break-all;
		display: -webkit-box;
		overflow: hidden;
		line-height: 1.5;
		text-overflow: ellipsis;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 2;
		color: #333;
	}

	.uni-media-list-info .info {
		font-size: 26upx;
		color: #999;
		line-height: 1.5;
		white-space: nowrap;
		text-overflow: ellipsis;
		overflow: hidden;
	}
	.title_hd{
		font-size: 32upx;
		line-height: 1.5;
		padding: 10px;
		border-bottom: 1px solid #eee;
	}
	.list-cell-r{max-width: 540upx;color: #333;}
	.list-cell-l{ color: #999;}
	.art-desc{padding: 20upx;color: #999;}
	.foot-fiexd {
		height: 120upx;
	}
	.foot-fiexd *{box-sizing: border-box;}
	.foot-activity {
		height: 120upx;
		background: #fff;
		position: fixed;
		left: 0;
		bottom: 0;
		width: 100%;
		z-index: 998;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		padding: 20upx 40upx;
	}
	.foot-activity .btn{
		 height: 80upx; line-height: 80upx; width: 100%; text-align: center; background: #fff; color: #333; border-radius: 40upx; font-size: 30upx; border: 1px solid #ddd;
	}
</style>
