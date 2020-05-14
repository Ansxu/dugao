<template>
	<view>
		<view class="banner">
			<swiper class="swiper" :indicator-dots="true" :autoplay="false" :interval="5000" :duration="500">
				<block v-if="imgArr.length>0">
				<swiper-item v-for="(item,index) in imgArr" :key="index">
					<view class="swiper-item">
						<image class="img" :src="item" mode="aspectFill"></image>
					</view>
				</swiper-item>
				</block>
			</swiper>
		</view>
		<view class="artCon uni-mb10" v-if="dataInfo">
			<view class="artInfo uni-mb10">
				<view class="media-title">
					{{NewsInfo.Title}}
				</view>
				<view class="media-foot">
					<text class="info-text time">{{NewsInfo.Addtime}}</text>
					<text class="info-text scan">{{NewsInfo.BrowseNum}}人浏览</text>
				</view>
			</view>
			
			<view class="media-hd">
				<view class="media-author" @click="gotoPensonal">
					<image class="img" v-if="NewsInfo.Avatar" :src="NewsInfo.Avatar" mode="aspectFill"></image>
					<image class="img" v-else-if="NewsInfo.FindType==2" src="/static/logo.png" mode="aspectFill"></image>
					<image class="img" v-else src="/static/default.png"></image>
				</view>
				<view class="author-name uni-ellipsis" @click="gotoPensonal">
					<block v-if="NewsInfo.FindType==1">
						{{NewsInfo.NickName}}
					</block>
					<block v-else>
						平台资讯
					</block>
				</view>
				<block v-if="NewsInfo.FindType==1">
					<view class="flow-btn" v-if="NewsInfo.IsFollow==0" @click="flowbtn">关注</view>
					<view class="flow-btn flowed" v-else @click="flowbtn">已关注</view>
				</block>
			</view>
			<view class="artInfo-desc" v-if="NewsInfo.ContentAbstract">
				{{NewsInfo.ContentAbstract}}
			</view>
			<view class="arthtmlbox" v-if="NewsInfo.ContentDetails !==''">	
				<!-- #ifdef H5 -->
				<uParse :content="NewsInfo.ContentDetails"></uParse>
				<!-- #endif -->
				<!-- #ifdef MP-WEIXIN -->
				<rich-text :nodes="arthtml"></rich-text>
				<!-- #endif -->
			</view> 
		</view>
		<!-- 评论 -->
		<reply-List v-if="dataInfo" :newsInfo="NewsInfo"></reply-List>
		<!-- 弹出分享 -->
		<popupShare :show="showPopupShare" :h5Top="true" v-on:hidePopup="hidePopup"></popupShare>
	</view>
</template>

<script>
	import {host,post,get,dateUtils,toLogin} from '@/common/util.js';
	import replyList from '@/components/reply.vue';
	import popupShare from '@/components/popshare.vue';
	import uParse from '@/components/uParse/src/wxParse.vue';
	export default {
		components: {
			replyList,
			popupShare,
			uParse
		},
		data() {
			return {
				userId: "",
				token: "",
				showPopupShare: false,
				Findid:"",
				NewsInfo:{},
				imgArr:[],
				dataInfo:false,
				arthtml:""
			};
		},
		onLoad: function(e) {
			this.userId = uni.getStorageSync("userId");
			this.token = uni.getStorageSync("token");
			this.Findid=e.id;
		},
		onShow(){
			this.FindNewsInfo();
		},
		onNavigationBarButtonTap(){
			this.showPopupShare=!this.showPopupShare;
		},
		methods:{
			onShareAppMessage: function(e) {
				return {
					title: this.NewsInfo.Title,
					path: 'pages/Article/NewsDetail/NewsDetail?id='+this.Findid
				}
			},
			//统一的关闭popup方法
			hidePopup: function() {
				this.showPopupShare = false;
			},
			/*获取发现详情*/
			async FindNewsInfo(){
			    let	result = await post("Find/FindNewsInfo", {
					"UserId": this.userId,
					"Token": this.token,
					"FindId":this.Findid
				});
				if (result.code === 0){
					if(result.data.ImgList !==""){
						this.imgArr=result.data.ImgList.split(",");
					}
					this.NewsInfo=result.data;
					this.dataInfo = true;
					this.NewsInfo.Addtime=dateUtils.format(this.NewsInfo.Addtime);
					this.arthtml=this.NewsInfo.ContentDetails.replace(/<section/gi,'<div').replace(/section>/gi,'div>');
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
			gotoPensonal() {
				if(this.NewsInfo.FindType==1){//指定店铺主页
					uni.navigateTo({
						url: '/pages/store/storeIndex/storeIndex?shopId='+this.NewsInfo.ShopId
					})	
				}
			},
			async flowbtn() {
				let result = await post("Goods/ShopCollection", {
					"UserId": this.userId,
					"Token": this.token,
					"ShopId":this.NewsInfo.ShopId
				});
				if (result.code === 0) {
					uni.showToast({
						title: result.msg
					})
					if(this.NewsInfo.IsFollow==0){
						this.NewsInfo.IsFollow=1;
					}else{
						this.NewsInfo.IsFollow=0;
					}
				
				} else if (result.code === 2) {
					let _this = this;
					uni.showModal({
						content: "您还没有登录，是否重新登录？",
						success(res) {
							if (res.confirm) {
								uni.navigateTo({
								  url: "/pages/login/login"
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
		},
		onPullDownRefresh() { //下拉刷新
			//监听下拉刷新动作的执行方法，每次手动下拉刷新都会执行一次
			let _this=this;
			_this.dataInfo = false;
			_this.NewsInfo={};
			setTimeout(function () {
				_this.FindNewsInfo();
				uni.stopPullDownRefresh();  //停止下拉刷新动画
			}, 1000);
		},
	}
</script>

<style scoped>
@import "./style";
</style>
