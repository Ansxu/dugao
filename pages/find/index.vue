<template>
	<view class="content">
		<!-- 固定在顶部的导航栏 -->
		<uni-nav-bar color="#333333" background-color="#f5f5f5" shadow="false" fixed="true" left-icon="search"
		 @click-left="search" right-icon="plus" @click-right="Issue">
			<view class="uni-head-tab">
				<view v-for="tab in tabBars" :key="tab.type" :class="['tab-item',tabIndex==tab.type ? 'active' : '']"
				 @click="tapTab(tab.type)">
					<view class="s"> {{tab.name}} </view>
				</view>
			</view>
		</uni-nav-bar>
		<view style="height:44px;"></view>
		<!-- 使用非原生导航栏后需要在页面顶部占位 -->
		<view class="list" v-if="hasData">
			<block v-for="(item,index) in medialist" :key="index">
				<block v-if="tabIndex!=6">
				<media-list :datas="item" Grid="2" @click="goDetail" @flow="flow(item.FindType,item.ShopId,item.MemberId,index)" @previewImg="previewImg"></media-list>	 
				</block>
				<block v-else>
				<actiList :datas="item"></actiList>
				</block>
			</block>
			
			<view class="uni-tab-bar-loading">
				<uni-load-more :loadingType="loadingType"></uni-load-more>
			</view>
		</view>
		<noData :isShow="noDataIsShow"></noData>
		<!-- #ifndef MP -->
		<view style="height:50px;"></view>
		<!-- #endif -->
	</view>
</template>

<script>
	import {host,post,get,dateUtils,toLogin,getCurrentPageUrlWithArgs} from '@/common/util.js';
	import uniNavBar from '@/components/uni-nav-bar.vue';
	import mediaList from '@/components/tab-nvue/mediaList.vue';//发现列表
	import actiList from '@/components/tab-nvue/actiList.vue';//活动（体验）
	import noData from '@/components/noData.vue'; //暂无数据
	import uniLoadMore from '@/components/uni-load-more.vue'; //加载更多
	import '@/common/head.css';
	export default {
		components: {
			uniNavBar,
			mediaList,
			actiList,
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
				noDataIsShow: false,
				page: 1,
				pageSize: 5,
				allPage: 0,
				count: 0,
				medialist: {},
				tabIndex: 0, //0我的，1指定用户，2推荐，3资讯，4搜索，5店铺,6活动
				tabBars: [{
						name: '推荐',
						type: 2
					},
					{
						name: '此刻',
						type: 4
					},
					{
						name: '体验',
						type: 6
					},
					{
						name: '资讯',
						type: 3
					}
				]
			}
		},
		onLoad: function() {
			this.curPage = getCurrentPageUrlWithArgs().replace(/\?/g, '%3F').replace(/\=/g, '%3D').replace(/\&/g, '%26');
			this.userId = uni.getStorageSync("userId");
			this.token = uni.getStorageSync("token");
		},
		onShow(){
			this.userId = uni.getStorageSync("userId");
			this.token = uni.getStorageSync("token");
			this.tapTab(2);
		},
		methods: {
			search() {
				uni.navigateTo({
					url: '/pages/Search/search_art/search_art'
				});
			},
			Issue() {
				if(toLogin(this.curPage)){
					uni.navigateTo({
						url: '/pages/Article/artPost/artPost'
					})
				}
			},
			/*获取发现列表*/
			
			async FindList() {
				let result;
				let that =this;
				if(this.tabIndex==6){
					result = await post("Find/ActivityList", {
						"UserId": this.userId,
						"Token": this.token,
						"page": this.page,
						"pageSize": this.pageSize,
						"myType": 0,//0全部，1热门，2置顶，3推荐
						"SearchKey": ""
					});
				}else{
					result = await post("Find/FindList", {
						"UserId": this.userId,
						"Token": this.token,
						"page": this.page,
						"pageSize": this.pageSize,
						"myType": this.tabIndex,
						"MemberId": "",
						"SearchKey": ""
					});
				}
				if (result.code === 0) {
					result.data.forEach(function(item) {
						if(that.tabIndex==6){
							item.AddTime=item.AddTime.split("T")[0];
						}else{
							item.Addtime=dateUtils.format(item.Addtime);
						}
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
					 this.userId=uni.setStorageSync("token", "");
					 this.token=uni.setStorageSync("userId", "");
					 this.FindList();
				} else {
					uni.showToast({
						title: result.msg,
						icon: "none",
						duration: 2000
					});
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
			//链接详情页
			goDetail(e) {
				if(e.artType==0){//用户发布详情
					uni.navigateTo({
						url: '/pages/Article/artDetail/artDetail?id='+e.id
					})
				}else{//资讯详情、店铺
					uni.navigateTo({
						url: '/pages/Article/NewsDetail/NewsDetail?id='+e.id
					})
				}
			},
			//关注
			async flow(FindType,ShopId,MemberId,index){
				let result;
				if(FindType==0){
					result = await post("Find/FollowOperation", {
						"UserId": this.userId,
						"Token": this.token,
						"ToMemberId":MemberId
					});
				}else if(FindType==1){
					result = await post("Goods/ShopCollection", {
						"UserId": this.userId,
						"Token": this.token,
						"ShopId":ShopId
					});
				}
				if (result.code === 0) {
					uni.showToast({
						title: result.msg
					})
					if(this.medialist[index].IsFollow==0){
						this.medialist[index].IsFollow=1;
					}else{
						this.medialist[index].IsFollow=0;
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
			//预览图片
			previewImg(obj){
				uni.previewImage({
					current:obj.imgurls[obj.index],
					urls: obj.imgurls,
					indicator:obj.imgurls.length
				});
			}
		},
		onReachBottom: function() {
			if (this.isLoad) {
				this.loadingType = 1;
				this.page++;
				this.FindList();
			} else {
				this.loadingType = 2;
			}
		},
		onPullDownRefresh() {
			//监听下拉刷新动作的执行方法，每次手动下拉刷新都会执行一次
			let _this=this;
				_this.page=1;
				_this.loadingType = 1;
				_this.medialist={};
			setTimeout(function () {
				_this.FindList();
				uni.stopPullDownRefresh();  //停止下拉刷新动画
			}, 1000);
		}
	}
</script>

<style scoped>
	@import "./style";
</style>
