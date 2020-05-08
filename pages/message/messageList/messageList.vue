<template>
	<view>
		<view v-if="Msgtype==1" class="uni-tab-bar bg_fff">
			<view class="uni-swiper-tab tabList flex flex-between">
				<view class="swiper-tab-list">
					<view class="s">销售收益</view>
				</view>
				<view class="swiper-tab-list active">
					<view class="s">新邀客户</view>
				</view>
			</view>
		</view>
		<view :class="['uni-mt10',Msgtype==1?'uni-list':'Messagelist']" v-if="hasData">
			<block v-for="(item,index) in newslist" :key="index">
				<view  v-if="Msgtype==1" class="uni-list-cell">
					<view class="uni-media-list">
						<view class="uni-media-list-logo">
							<image class="img" src="http://shop.dadanyipin.com/static/default.png" mode="aspectFill"></image>
						</view>
						<view  class="uni-media-list-body">
							<view class="uni-media-list-text-top flex flex-between">
							  <view class="uni-ellipsis">{{item.title}}</view>
							  <view class="time">{{item.PubTime}}</view>
							</view>
							<view  class="uni-media-list-text-bottom uni-ellipsis">
								{{item.Memo}}
							</view>
						</view>
					</view>
				</view>
				<view v-else class="list-item" @click="tolink('/pages/message/msgDetail/msgDetail?id='+item.id)">
					<view class="center uni-mb10">
						<text class="time">{{item.PubTime}}</text>
					</view>
					<view class="txtbox">
						<view class="title">
							{{item.title}}
						</view>
						<view class="uni-list-cell-navigate uni-navigate-right">
							<view class="desc text-line2">
								<uParse :content="item.Memo" />
							</view>
						</view>
					</view>
				</view>
			</block>
		</view>
		<view class="uni-tab-bar-loading" v-if="hasData">
			<uni-load-more :loadingType="loadingType"></uni-load-more>
		</view>
		<noData :isShow="noDataIsShow"></noData>
	</view>
</template>

<script>
	import {host,post,get,dateUtils,getCurrentPageUrlWithArgs,toLogin} from '@/common/util.js';
	import uParse from '@/components/uParse/src/wxParse.vue';
	import noData from '@/components/noData.vue'; //暂无数据
	import uniLoadMore from '@/components/uni-load-more.vue'; //加载更多
	export default {
		components: {
			uParse,
			noData,
			uniLoadMore
		},
		data() {
			return {
				userId: "",
				token: "",
				curPage:"",
				Msgtype:"",
				keyname:"",
				shopId:"",
				loadingType: 0, //0加载前，1加载中，2没有更多了
				isLoad: false,
				hasData: false,
				noDataIsShow: false,
				page: 1,
				pageSize: 10,
				allPage: 0,
				count: 0,
				newslist:[],
				datalist:[{
					title:'测试消息',
					PubTime:'2019-07-02 18:07:56',
					Memo:'<p>这是一条测试消息这是一条测试消息，这是一条测试消息，这是一条测试消息，这是一条测试消息，这是一条测试消息</p>'
				},{
					title:'测试消息2',
					PubTime:'2020-03-02 18:07:56',
					Memo:'<p>这是一条测试消息这是一条测试消息，这是一条测试消息，这是一条测试消息，这是一条测试消息，这是一条测试消息</p>'
				}]
				
			}
		}, 
		onLoad: function(e) {
			this.userId = uni.getStorageSync("userId");
			this.token = uni.getStorageSync("token");
			this.Msgtype=e.type;
			this.keyname=e.keyname;
			this.shopId=e.shopId;
		},
		onShow(){
			console.log(this.Msgtype,"////////")
			if (toLogin(this.curPage)) {
				this.NoticeList();
				uni.setNavigationBarTitle({
					title: this.keyname
				})
			}
		},
		methods: {
			/*获取消息列表*/
			async NoticeList() {
				let result = await post("News/MyNoticeList", {
					UserId: this.userId, 
					Token: this.token,
					page: this.page,
					pageSize: this.pageSize,
					MsgType: this.Msgtype,
					ShopId:this.shopId
				});
					let _this=this;
					if (result.data.length > 0) {
						this.hasData = true;
						result.data.forEach(function(item) {
							item.PubTime=dateUtils.format(item.PubTime);
							if(item.Islook==0){
								_this.ReadNoticeInfo(item.id);
							}
						})
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
						this.newslist = result.data;
					}
					if (this.page > 1) {
						this.newslist = this.newslist.concat(
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
			},
			gotoMsg(id){
				uni.navigateTo({
					url:'/pages/Message/msgDetail/msgDetail?id='+id
				})
			},
			//添加阅读记录
			async ReadNoticeInfo(Msgid){
				let result = await post("News/ReadNoticeInfo",{
					 UserId: this.userId,
					 Token: this.token,
					 newsid:Msgid
				})
				if (result.code === 0) {
					
				}
			},
			//跳转
			tolink(Url) {
				uni.navigateTo({
					url: Url
				})
			},
		},
		onReachBottom: function() {
			if (this.isLoad) {
				this.loadingType = 1;
				this.page++;
				this.NoticeList();
			} else {
				this.loadingType = 2;
			}
		}
	}
</script>

<style scoped>
	.tabList .swiper-tab-list{ width: 50%;}
	.uni-swiper-tab .active .s{ display: inline-block;}
	.list-item{margin: 20upx 20upx 0;}
	.txtbox{ background: #fff; border-radius: 6px;}
	.txtbox .title{ border-bottom: 1px solid #eee; padding: 20upx; font-size: 30upx; line-height: 1.2;}
	.txtbox .desc{
		width: 100%;
		color: #666;
	}
	.txtbox .desc.text-line2{
		padding-right: 40upx;
		word-break: break-all;
		display: -webkit-box;
		overflow: hidden;
		-o-text-overflow: ellipsis;
		text-overflow: ellipsis;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 2;
	}
	.list-item .time{ color: #fff; background: #e2e2e2; font-size: 24upx; border-radius: 4px; padding: 4upx 10upx;}
	.uni-media-list{ align-items: center;}
	.uni-media-list-logo{ width: 100upx; height: 100upx; border-radius: 50%; overflow: hidden;}
	.uni-media-list .time{ color: #999; line-height: 36upx; font-size: 26upx;}
	.uni-badge-red{ background: #fa3d34;}
	.uni-list-cell::after{left: 150upx;}
</style>
