<template>
	<view class="content">
		<view class="uni-list uni-bg-white" v-if="hasData">
			<view class="uni-list-cell" v-for="(item,index) in flowlist" :key="index">
				<view class="uni-media-list" @click="gotoMemberhome(item.ToUserId)">
					<view class="uni-media-list-logo">
						<image class="img" v-if="item.ToMemberHead" :src="item.ToMemberHead" mode="aspectFill"></image>
						<image class="img" v-else src="/static/default.png" mode="aspectFill"></image>
					</view>
					<view  class="uni-media-list-body">
						<view class="uni-media-list-text-top uni-ellipsis">{{item.ToMemberName}}</view>
						<view  class="uni-media-list-text-bottom uni-ellipsis"></view>
					</view>
					<view class="flow-btn flowed" @click.stop="cancel(item.ToUserId,index)">已关注</view>
				</view>
			</view>
			<view class="uni-tab-bar-loading">
				<uni-load-more :loadingType="loadingType"></uni-load-more>
			</view>
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
		onLoad: function() {
			this.curPage = getCurrentPageUrlWithArgs().replace(/\?/g, '%3F').replace(/\=/g, '%3D').replace(/\&/g, '%26');
			this.userId = uni.getStorageSync("userId");
			this.token = uni.getStorageSync("token");
			this.UserFollowList();
		},
		data() {
			return {
				userId: "",
				token: "",
				curPage:"",
				loadingType: 0, //0加载前，1加载中，2没有更多了
				isLoad: false,
				hasData: false,
				noDataIsShow: false,
				page: 1,
				pageSize: 10,
				allPage: 0,
				count: 0,
				flowlist:{}
			}
		},
		methods: {
			/*获取关注列表*/
			async UserFollowList() {
				let result = await post("Find/UserFollowList", {
					"UserId": this.userId,
					"Token": this.token,
					"page": this.page,
					"pageSize": this.pageSize,
					"myType": 0//0我的关注
				});
				if (result.code === 0) {
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
						this.flowlist = result.data;
					}
					if (this.page > 1) {
						this.flowlist = this.flowlist.concat(
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
					let _this =this;
					uni.showModal({
						content: "您还没有登录，是否重新登录？",
						success(res) {
							if (res.confirm) {
								uni.navigateTo({
								  url: "/pages/login/login?askUrl="+_this.curPage
								});
							} else if (res.cancel) {
							}
						}
					});
				} else {
					uni.showToast({
						title: result.msg,
						icon: "none",
						duration: 2000
					});
				}
			},
			//取消关注
			async cancel(Id,index){
			    let result = await post("Find/FollowOperation", {
					"UserId": this.userId,
					"Token": this.token,
					"ToMemberId":Id
				});
				if (result.code === 0) {
					uni.showToast({
						title: result.msg
					})
					this.flowlist.splice(index,1);
				} else if (result.code === 2) {
					let _this = this;
					uni.showModal({
						content: "您还没有登录，是否重新登录？",
						success(res) {
							if (res.confirm) {
								uni.navigateTo({
								  url: "/pages/login/login?askUrl="+_this.curPage
								});
							} else if (res.cancel) {
							}
						}
					});
				} else {
					uni.showToast({
						title: result.msg,
						icon: "none",
						duration: 2000
					});
				}
			},
			gotoMemberhome(MemberId){
				uni.navigateTo({
					url: '/pages/Article/myCenter/myCenter?Memberid='+MemberId
				})	
			}
		},
		onReachBottom: function() {
			if (this.isLoad) {
				this.loadingType = 1;
				this.page++;
				this.UserFollowList();
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
				_this.UserFollowList();
				uni.stopPullDownRefresh();  //停止下拉刷新动画
			}, 1000);
		}
	}
</script>

<style scoped>
	.content {
		min-height: 100%;
	}
	.uni-list:after{display: none;}
	.uni-media-list{padding: 22upx 20upx; position: relative;}
	.uni-media-list-logo{ height: 100upx; width: 100upx; border-radius: 50%; overflow: hidden;}
	.uni-media-list-body{ padding: 10upx 0; height: 100upx; max-width: 60%;box-sizing: border-box;}
	.flow-btn {
		position: absolute;
		right: 20upx;
		top: 50%;
		width: 150upx;
		height: 60upx;
		line-height: 60upx;
		text-align: center;
		background: #89674c;
		color: #fff;
		border-radius: 30upx;
		margin-top: -30upx;
	}
	
	.flow-btn.flowed {
		background: #fcf4e3;
		color: #89674c;
	}
</style>
