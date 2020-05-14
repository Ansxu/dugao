<template>
	<view class="content">
		<!-- 固定在顶部的导航栏 -->
		<uni-nav-bar color="#333333" background-color="#ffffff" shadow="false" fixed="true">
			<block slot="left">
				<view class="uni-icon uni-icon-search" style="color: #333;" @click="search"></view>
				<!-- <view class="tx" @click="toMyCenter">
					<image :src="avatarUrl||'http://ddyp.wtvxin.com/static/default.png'"></image>
				</view> -->
			</block>
			<view class="uni-head-tab">
				<view v-if="index<4" v-for="(item,index) in tabBars" :key="index" :class="['tab-item',tabIndex==index ? 'active' : '']"
				 @click="tapTab(item.Id,index)">
					<view class="s"> {{item.Name}} </view>
				</view>
			</view>
			<block slot="right">
				
			</block>
		</uni-nav-bar>
		<view style="height:44px;"></view>
		<!-- 使用非原生导航栏后需要在页面顶部占位 -->
		<view class="list" v-if="hasData">
			<block v-for="(item,index) in medialist" :key="index">
				<media-list :datajson="item" Grid="1" @click="goDetail"></media-list>
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
		<!-- <view @click="Issue" class="fubuBtn iconfont icon-bianji1"></view> -->
	</view>
</template>

<script>
	import {host,post,get,dateUtils,editTime,navigate} from '@/utils';
	import uniNavBar from '@/components/uni-nav-bar.vue';
	import mediaList from '@/components/tab-nvue/mediaList.vue';//发现列表
	import noData from '@/components/noData.vue'; //暂无数据
	import uniLoadMore from '@/components/uni-load-more.vue'; //加载更多
	import '@/common/head.css';
	export default {
		components: {
			uniNavBar,
			mediaList, 
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
				tabIndex: 0,
				tabId:0,
				tabBars: [],
				avatarUrl:"",
			}
		},
		onLoad: function() {
			this.userId = uni.getStorageSync("userId");
			this.token = uni.getStorageSync("token");
			this.FindClassList();
		},
		onShow(){
			this.userId = uni.getStorageSync("userId");
			this.token = uni.getStorageSync("token");
			//this.avatarUrl=uni.getStorageSync("userInfo").avatarUrl;
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
			async FindClassList(){
				let result = await post("Find/FindClassList", {
					"page": 1,
					"pageSize": 4
				});
				if(result.code==0){
					this.tabBars=result.data;
					this.tabId=result.data[0].Id;
					this.tapTab(this.tabId,0);
				}
			},
			async FindList() {
				let result = await post("Find/FindList", {
					"UserId": this.userId,
					"Token": this.token,
					"page": this.page,
					"pageSize": this.pageSize,
					"ClassId": this.tabId,
				});
				if (result.code === 0) {
					const data= result.data;
					data.forEach(function(item) {
						item.Addtime=dateUtils.format(item.Addtime);
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
			tapTab(id,index) {
				this.tabIndex = index;
				this.tabId=id;
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
				navigate( 'Article/NewsDetail/NewsDetail',{id:+e.id})
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
