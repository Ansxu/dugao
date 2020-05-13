<template>
	<view>
		<!-- 轮播 -->
		<view class="actiBanner">
			<block v-if="ActInfo.ImgList">
			<swiper class="swiper" :indicator-dots="true" :autoplay="false" :interval="5000" :duration="500">
				<swiper-item v-if="imgArr" v-for="(item,index) in imgArr" :key="index">
					<view class="swiper-item">
						<image class="img" :src="item" mode="aspectFill"></image>
					</view>
				</swiper-item>
			</swiper>
			</block>
		</view>
		<view class="artCon">
			<view class="artCon-item artInfo">
				<view class="title">
					{{ActInfo.Title}}
				</view>
				<view class="artInfo-desc" v-if="ActInfo.ContentAbstract">
					{{ActInfo.ContentAbstract}}
				</view>
				<view class="media-info">
					<view class="info-text">
						<text class="iconfont icon-shijian"></text>{{ActInfo.AddTime}} 至 {{ActInfo.EndTime}}
					</view>
					<view class="info-text" v-if="ActInfo.Location">
						<text class="iconfont icon-dizhi"></text>{{ActInfo.Location}}
					</view>
					<view class="info-text" v-if="ActInfo.Quota">
						<text class="iconfont icon-haoyou"></text>{{ActInfo.Quota}}名额
					</view>
				</view>
			</view>
			<view class="artCon-item artdetail">
				<view class="title">
					活动详情
				</view>
				<view class="art-desc" v-if="ActInfo.ContentDetails">
					<uParse :content="ActInfo.ContentDetails" />
				</view>
				<!-- <view class="uni-center">
					<text class="more">展开更多</text>
				</view> -->
			</view>
			<view class="artCon-item artTips" v-if="ActInfo.Remind">
				<view class="title">
					温馨提示
				</view>
				<view class="art-desc">
					{{ActInfo.Remind}}
				</view>
			</view>
			<view class="artCon-item uesrPIC" v-if="ActInfo.IsOver==1">
				<view class="title">
					用户晒图({{ActInfo.CommentNum}})
				</view>
				<actreply-List v-if="dataInfo" :ActInfo="ActInfo"></actreply-List>
				
			</view>
		</view>
		<!-- 底部-->
		<view class="foot-fiexd">
			<view class="foot-activity">
				<view class="tips flex">
					<block v-if="ActInfo.IsOver==1">活动已结束</block>
					<block v-else>{{ActInfo.JoinNum}}人已参与</block>
					<text class="info-text zan" @click="like(ActInfo.Id)"><text :class="['iconfont',ActInfo.IsLike==1?'icon-zan1':'icon-zan']"></text>{{ActInfo.LikeNum}}</text>
				</view>
				<view class="btn-r">
					<view class="active btn" @click="goTocomment" v-if="ActInfo.IsOver==1&&ActInfo.IsJoin==1">晒图</view>
					<view class="btn" @click="signupDetail" v-else-if="ActInfo.IsOver==0&&ActInfo.IsJoin==1">查看报名详情</view>
					<view class="active btn" @click="signup" v-else-if="ActInfo.IsOver==0&&ActInfo.IsJoin==0">报名</view>
					<view class="btn disabled" @click="nosignup" v-else-if="ActInfo.IsOver==1&&ActInfo.IsJoin==0">报名</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {host,post,get,dateUtils,toLogin} from '@/common/util.js';
	import actreplyList from '@/components/actreplyList.vue';
	import uParse from '@/components/uParse/src/wxParse.vue';
	export default {
		components: {
			actreplyList,
			uParse
		},
		data() {
			return {
				userId: "",
				token: "",
				ActivityId:"",
				ActInfo:{},
				imgArr:[],
				dataInfo:false
			};
		},
		onLoad: function(e) {
			this.userId = uni.getStorageSync("userId");
			this.token = uni.getStorageSync("token");
			this.ActivityId=e.id;
		},
		onShow(){
			this.ActivityInfo();
		},
		methods: {
			onShareAppMessage: function(e) {
				return {
					title: this.ActInfo.Title,
					path: 'pages/Article/activityDetail/activityDetail?id='+this.ActivityId
				}
			},
			/*获取活动详情*/
			async ActivityInfo(){
				let	result = await post("Find/ActivityInfo", {
					"UserId": this.userId,
					"Token": this.token,
					"ActivityId":this.ActivityId
				});
				if (result.code === 0){
					this.ActInfo=result.data;
					this.dataInfo = true;
					this.imgArr=this.ActInfo.ImgList.split(",");
					this.ActInfo.AddTime=this.ActInfo.AddTime.split("T")[0];
					this.ActInfo.EndTime=this.ActInfo.EndTime.split("T")[0];
				}else if (result.code === 2) {
					//未登录
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
			//去报名
			signup(){
				if(toLogin(this.curPage)){
					uni.navigateTo({
						url: '/pages/Article/actSignup/actSignup?id='+this.ActivityId
					})
				}
			},
			nosignup(){
				uni.showToast({
					title: '您没有报名参与活动哦',
					icon: "none",
					duration: 2000
				});
			},
			signupDetail(){
				uni.navigateTo({
					url: '/pages/Article/signupDetail/signupDetail?id='+this.ActivityId
				})
			},
			//去晒图
			goTocomment(){
				uni.navigateTo({
					url: '/pages/Article/commentPic/commentPic?id='+this.ActivityId
				})
			},
			//点赞/取消点赞
			async like(id){
				let result = await post("Find/FindlikeOperation", {
					"UserId": this.userId,
					"Token": this.token,
					"FindId": id,
					"TypeStatu":1
				});
				if (result.code === 0) {
					uni.showToast({
						title: result.msg,
						icon: "none",
						duration: 2000
					});
					if(this.ActInfo.IsLike==1){
						this.ActInfo.IsLike=0;
						this.ActInfo.LikeNum--;
					}else{
						this.ActInfo.IsLike=1;
						this.ActInfo.LikeNum++;
					}
				}else if (result.code === 2) {
					let _this =this;
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
			}
		},
		onPullDownRefresh() {
			//监听下拉刷新动作的执行方法，每次手动下拉刷新都会执行一次
			let _this=this;
			_this.ActInfo={};
			setTimeout(function () {
				_this.ActivityInfo();
				uni.stopPullDownRefresh();  //停止下拉刷新动画
			}, 1000);
		}
	}
</script>

<style scoped>
@import "./style";
</style>
