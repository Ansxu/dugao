<template>
	<view class="content">
		<!-- 固定在顶部的导航栏 -->
		<uni-nav-bar color="#333333" background-color="#ffffff" shadow="false" fixed="true">
			<block slot="left">
				<view class="tx" @click="toMyCenter">
					<image :src="avatarUrl||'http://ddyp.wtvxin.com/static/default.png'"></image>
				</view>
			</block>
			<view class="uni-head-tab">
				<view v-for="tab in tabBars" :key="tab.type" :class="['tab-item',tabIndex==tab.type ? 'active' : '']"
				 @click="tapTab(tab.type)">
					<view class="s"> {{tab.name}} </view>
				</view>
			</view>
			<block slot="right">
				<view class="uni-icon uni-icon-search" style="color: #333;" @click="search"></view>
			</block>
		</uni-nav-bar>
		<view style="height:44px;"></view>
		<!-- 使用非原生导航栏后需要在页面顶部占位 -->
		<view class="list" v-if="hasData">
			<block v-for="(item,index) in medialist" :key="index">
				<block v-if="tabIndex!=6">
				<media-list :datajson="item" Grid="2" @click="goDetail" @flow="flow(item.FindType,item.ShopId,item.MemberId,index)" @previewImg="previewImg"></media-list>	 
				</block>
				<block v-else>
				<actiList :datajson="item"></actiList>
				</block>
			</block>
		</view>
		<view class="uni-tab-bar-loading" v-if="hasData">
			<uni-load-more :loadingType="loadingType"></uni-load-more>
		</view>
		<noData :isShow="noDataIsShow"></noData>
		<!-- #ifndef MP -->
		<view style="height:50px;"></view>
		<!-- #endif -->
		<!-- 发布按钮 -->
		<view @click="Issue" class="fubuBtn iconfont icon-bianji1"></view>
	</view>
</template>

<script>
	import {host,post,get,dateUtils,editTime,navigate} from '@/utils';
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
				loadingType: 0, //0加载前，1加载中，2没有更多了
				isLoad: false,
				hasData: false,
				noDataIsShow: false,
				page: 1,
				pageSize: 8,
				allPage: 0,
				count: 0,
				medialist: [],
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
				],
				avatarUrl:"",
			}
		},
		onLoad: function() {
			this.userId = uni.getStorageSync("userId");
			this.token = uni.getStorageSync("token");
		},
		onShow(){
			this.userId = uni.getStorageSync("userId");
			this.token = uni.getStorageSync("token");
			this.avatarUrl=uni.getStorageSync("userInfo").avatarUrl;
			this.tapTab(2);
		},
		methods: {
			search() {
				navigate('Search/search_art/search_art');
			},
			Issue() {
				navigate('Article/artPost/artPost',{},true)
			},
			toMyCenter() {
				navigate('Article/myCenter/myCenter',{Memberid:this.userId},true)
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
					const data= result.data;
					data.forEach(function(item) {
						if(that.tabIndex==6){
							item.AddTime=dateUtils.format(item.AddTime);
						}else{
							item.Addtime=dateUtils.format(item.Addtime);
							item.imgArr = item.ImgList.split(',')
						}
					})
					if (data.length > 0) {
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
					if (this.page === 1) {this.medialist = [];}
					this.medialist.push(...data);
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
					navigate( 'Article/artDetail/artDetail',{id:+e.id})
				}else{//资讯详情、店铺
					navigate( 'Article/NewsDetail/NewsDetail',{id:+e.id})
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
				uni.showToast({
					title: result.msg
				})
				if(this.medialist[index].IsFollow==0){
					this.medialist[index].IsFollow=1;
				}else{
					this.medialist[index].IsFollow=0;
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
