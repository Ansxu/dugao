<template>
	<view class="content">
		<view class="list" v-if="hasData">
			<view class="uni-list">
				<block v-for="(item,index) in Actlist" :key="index">
					<view class="uni-list-cell" @click="gotoDetail(item.Id)">
						<view class="uni-media-list">
							<view class="uni-media-list-logo">
								<image v-if="item.PicImg" :src="item.PicImg" mode="aspectFill"></image>
								<image v-else src="/static/60x60.png" mode="aspectFill"></image>
							</view>
							<view class="uni-media-list-body">
								<view class="uni-media-list-text-top">{{item.Title}}</view>
								<view class="uni-media-list-info">
									<view class="info"><text class="iconfont icon-shijian"></text>{{item.AddTime}}</view>
									<view v-if="item.Location" class="info addr"><text class="iconfont icon-dizhi1"></text>{{item.Location}}</view>
								</view>
								<view v-if="mytype==0&&item.IsOver==0" class="cancel" @click.stop="cancel(item.Id,item.UserName,item.UserIdCard,item.UserPhone)">取消报名</view>
							</view>
						</view>
					</view>
				</block>
			</view>
			
		</view>
		<view class="uni-tab-bar-loading" v-if="hasData">
			<uni-load-more :loadingType="loadingType"></uni-load-more>
		</view>
		<noData :isShow="noDataIsShow"></noData>
	</view>
</template>

<script>
	import {host,post,get,toLogin,getCurrentPageUrlWithArgs} from '@/common/util.js';
	import noData from '@/components/noData.vue'; //暂无数据
	import uniLoadMore from '@/components/uni-load-more.vue';
	export default {
		components: {
			noData,
			uniLoadMore
		},
		onLoad: function(e) {
			this.curPage = getCurrentPageUrlWithArgs().replace(/\?/g, '%3F').replace(/\=/g, '%3D').replace(/\&/g, '%26');
			this.userId = uni.getStorageSync("userId");
			this.token = uni.getStorageSync("token");
			if(e.myType){
				this.mytype=e.myType;
			}
			this.Memberid=e.Memberid;
			this.SetText();
			this.JoinActivityList();
		},
		data() {
			return {
				userId: "",
				token: "",
				curPage:"",
				hasSetText:"我的活动",
				loadingType: 0, //0加载前，1加载中，2没有更多了
				isLoad: false,
				hasData:false,
				noDataIsShow: false,
				page: 1,
				pageSize: 10,
				allPage: 0,
				count: 0,
				mytype:0,//0我的,1TA的
				Memberid:"",
				Actlist:{},
			};
		},
		methods: {
			SetText(){
				if(this.mytype==1){
					this.hasSetText="TA的活动";
					
				}else{
					this.hasSetText="我的活动";
				}
				uni.setNavigationBarTitle({
					title: this.hasSetText
				})
			},
			//获取用户活动列表
			async JoinActivityList() {
				let result = await post("Find/UserJoinActivityList", {
					"page": this.page,
					"pageSize": this.pageSize,
					"UserId": this.Memberid
				});
				if (result.code === 0) {
					result.data.forEach(function(item) {
						item.AddTime=item.AddTime.replace("T"," ").substring(0,16);
					})
					if (result.data.length > 0) {
						this.hasData = true;
					}
					this.count = result.count;
					if (this.count == 0) {
						this.noDataIsShow = true;
					}
					if (parseInt(this.count) % this.pageSize === 0) {
						this.allPage = this.count / this.pageSize;
					} else {
						this.allPage = parseInt(this.count / this.pageSize) + 1;
					}
					if (this.page === 1) {
						this.Actlist = result.data;
					}
					if (this.page > 1) {
						this.Actlist = this.Actlist.concat(
							result.data
						);
					}
					if (this.allPage <= this.page) {
						this.isLoad = false;
						this.loadingType = 2;
					} else {
						this.isLoad = true;
						this.loadingType = 0
					}
				} else if (result.code === 2) {
			
				} else {
					uni.showToast({
						title: result.msg,
						icon: "none",
						duration: 2000
					});
				}
			},
			//活动详情
			gotoDetail(id){
				uni.navigateTo({
					url: '/pages/Article/activityDetail/activityDetail?id='+id
				})
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
			}
		},
		onReachBottom: function() {
			if (this.isLoad) {
				this.loadingType = 1;
				this.page++;
				this.JoinActivityList();
			} else {
				this.loadingType = 2;
			}
		},
		onPullDownRefresh() { //下拉刷新
			//监听下拉刷新动作的执行方法，每次手动下拉刷新都会执行一次
			let _this=this;
			_this.page = 1;
			_this.loadingType = 1;
			setTimeout(function () {
				_this.JoinActivityList();
				uni.stopPullDownRefresh();  //停止下拉刷新动画
			}, 1000);
		}
	}
</script>

<style>
	.content{ background: #fff; min-height: 100%;}
	.uni-media-list {
		padding: 22upx 20upx;
	}

	.uni-list-cell::after {
		left: 0;
	}

	.uni-media-list-logo {
		height: 200upx;
		width: 200upx;
		border-radius: 6px;
		overflow: hidden;
	}

	.uni-media-list-body {
		height: 200upx;
		position: relative;
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
	.uni-media-list-info .info.addr{ max-width: 300upx;}
	.cancel{ position: absolute; right: 0; bottom: 0; padding: 6upx 20upx; font-size: 24upx; border: 1px solid #ddd; border-radius: 30upx; color: #333;}
</style>
