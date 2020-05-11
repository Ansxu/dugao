<template>
	<view class="uni-bg-white" style="min-height: 100%;">
		<!-- #ifdef MP-WEIXIN -->
		<view class="MP-header header-search flex-center-between plr30">
			<view class="input-view flex-center">
				<view class="uni-icon uni-icon-search"></view>
				<input confirm-type="search" class="input" type="text" placeholder="想搜什么？" v-model="SearchKey" />
			</view>
			<view class="searchbtn c_theme" @click="search">搜索</view>
		</view>
		<view style="height: 60upx;"></view>
		<!-- #endif -->
		<view class="uni-tab-bar">
			<view class="uni-swiper-tab tabList">
				<view :class="['swiper-tab-list',tabIndex==0?'active':'']" @click="tapTab(0)">
					<view class="s">
						资讯({{countfind}})
					</view>
				</view>
				<view :class="['swiper-tab-list',tabIndex==1?'active':'']" @click="tapTab(1)">
					<view class="s">
						活动({{countAct}})
					</view>
				</view>
			</view>
		</view>
		<view class="tabCon" v-if="hasData">
			<view class="uni-list">
				<block v-for="(item,index) in medialist" :key="index">
					<view class="uni-list-cell" @click="gotoDetail(item.Id,item.FindType)">
						<view class="uni-media-list">
							<view class="uni-media-list-logo">
								<image v-if="item.PicImg" :src="item.PicImg" mode="aspectFill"></image>
								<image v-else src="/static/60x60.png" mode="aspectFill"></image>
							</view>
							<view class="uni-media-list-body">
								<view class="uni-media-list-text-top" v-if="item.Title">
									{{item.Title}}
								</view>
								<view class="uni-media-list-text-top" v-else>
									{{item.ContentDetails}}
								</view>
								<view class="uni-media-list-info">
									{{item.ContentAbstract}}
								</view>
							</view>
						</view>
					</view>
				</block>
			</view>
			<view class="uni-tab-bar-loading">
				<uni-load-more :loadingType="loadingType"></uni-load-more>
			</view>
		</view>
		<noData :isShow="noDataIsShow"></noData>
	</view>
</template>

<script>
	import {host,post,get,dateUtils,toLogin,getCurrentPageUrlWithArgs} from '@/common/util.js';
	import noData from '@/components/noData.vue'; //暂无数据
	import uniLoadMore from '@/components/uni-load-more.vue'; //加载更多
	export default {
		components: {
			noData,
			uniLoadMore
		},
		data() {
			return {
				userId: "",
				token: "",
				curPage:"",
				loadingType: 0, //0加载前，1加载中，2没有更多了
				isLoad: false,
				hasData: false,
				noDataIsShow: true,
				page: 1,
				pageSize: 10,
				allPage: 0,
				count: 0,
				countfind:0,//发现总数
				countAct:0,//活动总数
				medialist: {},
				tabIndex: 0, //1资讯，2活动
				SearchKey:"",
			};
		},
		onLoad: function(e) {
			this.curPage = getCurrentPageUrlWithArgs().replace(/\?/g, '%3F').replace(/\=/g, '%3D').replace(/\&/g, '%26');
			this.userId = uni.getStorageSync("userId");
			this.token = uni.getStorageSync("token");
		},
		/*当 searchInput 输入时触发*/
		onNavigationBarSearchInputChanged(e){
			let text = e.text;
			this.SearchKey=text;
		},
		/*** 点击软键盘搜索按键触发*/
		onNavigationBarSearchInputConfirmed(e){
			let text = e.text;
			this.SearchKey=text;
			if(!text){
				uni.showModal({
					title: '提示',
					content: '请输入内容。',
					success: res => {
						if (res.confirm) {
						}
					}
				});
				return;
			}else{
				this.tapTab(0);
				this.actCount();
			}
		},
		/* 点击导航栏 buttons 时触发*/
		onNavigationBarButtonTap(){
			if(this.SearchKey==""){
				uni.showModal({
					title: '提示',
					content: '请输入内容。',
					success: res => {
						if (res.confirm) {
						}
					}
				});
				return;
			}else{
				this.tapTab(0);
				this.actCount();
			}
		},
		methods: {			
			/*获取发现列表*/
			async FindList() {
				let result;
				let that =this;
				if(this.tabIndex==1){
					result = await post("Find/ActivityList", {
						"UserId": this.userId,
						"Token": this.token,
						"page": this.page,
						"pageSize": this.pageSize,
						"myType": 0,//0全部，1热门，2置顶，3推荐
						"SearchKey": this.SearchKey
					});
				}else{
					result = await post("Find/FindList", {
						"UserId": this.userId,
						"Token": this.token,
						"page": this.page,
						"pageSize": this.pageSize,
						"myType": 4,//搜索
						"MemberId": "",
						"SearchKey": this.SearchKey
					});
				}
				if (result.code === 0) {
					let _this=this;
// 					result.data.forEach(function(item) {
// 						item.Title=item.Title.replace(new RegExp(_this.SearchKey, 'g'), '<span class="c_theme">'+_this.SearchKey+'</span>');
// 						item.ContentAbstract=item.ContentAbstract.replace(new RegExp(_this.SearchKey, 'g'), '<span class="c_theme">'+_this.SearchKey+'</span>');
// 					})
					if (result.data.length > 0) {
						this.hasData = true;
					}
					if(this.tabIndex==1){
						this.countAct = result.count;
					}else{
						this.countfind = result.count;
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
						this.medialist = result.data;
					}
					if (this.page > 1) {
						this.medialist = this.medialist.concat(
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
			//获取搜索活动总数
			async actCount(){
				let result = await post("Find/ActivityList", {
					"UserId": this.userId,
					"Token": this.token,
					"page": this.page,
					"pageSize": this.pageSize,
					"myType": 0,//0全部，1热门，2置顶，3推荐
					"SearchKey": this.SearchKey
				});
				if (result.code === 0) {
					this.countAct = result.count;
				}
			},
			tapTab(type) {
				this.tabIndex = type;
				this.loadingType = 0;
				this.hasData = false;
				this.noDataIsShow = false;
				this.isLoad = false;
				this.page = 1;
				this.allPage = 0;
				this.count = 0;
				this.medialist = {};
				this.FindList();
			},
			gotoDetail(id,FindType){
				if(this.tabIndex==1){
					uni.navigateTo({
						url: '/pages/Article/activityDetail/activityDetail?id='+id
					})
				}else{
					if(FindType==0){
						uni.navigateTo({
							url: '/pages/Article/artDetail/artDetail?id='+id
						})
					}else{
						uni.navigateTo({
							url: '/pages/Article/NewsDetail/NewsDetail?id='+id
						})
					}
				}
			},
			// #ifdef MP-WEIXIN
			search(){
				if(this.SearchKey==""){
					uni.showModal({
						title: '提示',
						content: '请输入内容。',
						success: res => {
							if (res.confirm) {
							}
						}
					});
					return;
				}else{
					this.tapTab(0);
					this.actCount();
				}
			}
			// #endif
		},
		onReachBottom: function() {
			if (this.isLoad) {
				this.loadingType = 1;
				this.page++;
				this.FindList();
			} else {
				this.loadingType = 2;
			}
		}
	}
</script>

<style scoped lang="scss">
	@import "./style";
	.wxParse *{display: inline-block !important;}
	/* #ifdef MP-WEIXIN */
	.MP-header{ padding-bottom: 0;}
	.uni-swiper-tab{ top: 60upx;}
	.tabCon{ padding-top: 80upx;}
	/* #endif */
	.header-search{
		input{
			width:550upx;
		}
	}
</style>
