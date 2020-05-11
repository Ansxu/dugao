<template>
	<view class="content">
		<view class="uni-list" v-if="hasData">
			<view class="uni-list-cell" v-for="(item,index) in flowlist" :key="index">
				<view class="uni-media-list" @click="gotoMemberhome(item.UserId,item.IsFollow)">
					<view class="uni-media-list-logo">
						<image class="img" v-if="item.MemberHead" :src="item.MemberHead" mode="aspectFill"></image>
						<image class="img" v-else src="/static/default.png" mode="aspectFill"></image>
					</view>
					<view  class="uni-media-list-body">
						<view class="uni-media-list-text-top uni-ellipsis">{{item.MemberName}}</view>
						<view  class="uni-media-list-text-bottom uni-ellipsis"></view>
					</view>
					<view class="flow-btn flowed" v-if="item.IsFollow==1" @click.stop="Follow(item.UserId,index)">互相关注</view>
					<view class="flow-btn" v-else @click.stop="Follow(item.UserId,index)">关注</view>
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
			};
		},
		methods: {
			/*获取粉丝列表*/
			async UserFollowList() {
				let result = await post("Find/UserFollowList", {
					"UserId": this.userId,
					"Token": this.token,
					"page": this.page,
					"pageSize": this.pageSize,
					"myType": 1//0我的粉丝
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
			//互关
			async Follow(Id,index){
			    let result = await post("Find/FollowOperation", {
					"UserId": this.userId,
					"Token": this.token,
					"ToMemberId":Id
				});
				if (result.code === 0) {
					uni.showToast({
						title: result.msg
					})
					if(this.flowlist[index].IsFollow==0){
						this.flowlist[index].IsFollow=1;
					}else{
						this.flowlist[index].IsFollow=0;
					}
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
			gotoMemberhome(MemberId,isFollow){
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
		}
	}
</script>

<style scoped>
	.content {
		background: #fff;
		min-height: 100%;
	}
	.uni-list:after{display: none;}
	.uni-media-list{padding: 22upx 20upx; position: relative;}
	.uni-media-list-logo{ height: 100upx; width: 100upx; border-radius: 50%; overflow: hidden;}
	.uni-media-list-body{ padding: 8upx 0; max-width: 60%;}
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
