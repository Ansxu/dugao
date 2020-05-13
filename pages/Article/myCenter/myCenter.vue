<template>
	<view class="content">
		<!-- 个人简介 -->
		<view class="userTop">
			<view class="infobox uni-center">
				<view class="tx" @click="editInfo">
					<image class="img" :src="Userinfo.Headimgurl||'http://ddyp.wtvxin.com/static/default.png'" mode="aspectFill"></image>
				</view>
				<view class="username">
					<text class="txt uni-ellipsis">{{Userinfo.NickName}}</text>
					<text :class="['iconfont',Userinfo.Sex=='男'?'icon-nan':'icon-nv']"></text>
				</view>
				<view class="userdesc" v-if="false">
					<text class="txt uni-ellipsis">{{Userinfo.Introduction||'主人太懒了，什么都没有留下~'}}</text>
					<text class="iconfont icon-bianji1" v-if="Userinfo.IsMy==1"></text>
				</view>
				<view class="location uni-ellipsis" v-if="Userinfo.City">
					<text class="iconfont icon-dizhi"></text>{{Userinfo.City}}
				</view>
				<view class="infobox-ft uni-flex">
					<view class="uni-flex-item">获赞 <text class="txt">{{Userinfo.LikeNum}}</text></view>
					<view class="uni-flex-item" @click="goTomyflow">关注 <text class="txt c_theme">{{Userinfo.FollowNum}}</text></view>
					<view class="uni-flex-item" @click="goTomyFen">粉丝 <text class="txt c_theme">{{Userinfo.fansNum}}</text></view>
				</view>
			</view>
		</view>
		<!-- 我的发布 -->
		<view class="MYfubu">
			<view class="uni-list-cell" hover-class="uni-list-cell-hover">
				<view class="uni-list-cell-navigate uni-navigate-right" @click="gotomyPost">
					<block v-if="Userinfo.IsMy==1">我的发布</block>
					<block v-else>TA的发布</block>
					<text class="list-cell-r">全部({{findcount}})</text>
				</view>
			</view>
			<view class="list" v-if="hasData">
				<block v-for="(item,index) in medialist" :key="index">
					<media-list :datajson="item" Grid="3" :isBtn="false" @click="goDetail" @previewImg="previewImg"></media-list>
				</block>
			</view>
			<view v-else style="text-align: center; color: #999; padding: 20upx;">暂无数据</view>
		</view>
		<!-- 活动列表 -->
		<view class="Activity">
			<view class="uni-list-cell">
				<view class="uni-list-cell-navigate uni-navigate-right" @click="gotoActivity">
					<block v-if="Userinfo.IsMy==1">我的活动</block>
					<block v-else>TA的活动</block>
					<text class="list-cell-r">全部({{Actcount}})</text>
				</view>
			</view>
			<view class="list" v-if="hasActData">
				<block v-for="(item2,index2) in Actlist" :key="index2">
					<view class="list-item" @click="gotoactDetail(item2.Id)">
						<view class="mark" v-if="item2.IsOver==1">已结束</view>
						<view class="mark active" v-if="item2.IsOver==0">进行中</view>
						<image v-if="item2.PicImg" class="img" :src="item2.PicImg" mode="aspectFill"></image>
						<image v-else src="/static/logo.png" mode="aspectFill"></image>
					</view>
				</block>
			</view>
			<view v-else style="text-align: center; color: #999; padding: 20upx;">暂无数据</view>
		</view>
		<view class="foot-fiexd">
			<view class="foot">
				<view class="btn iconfont icon-bianji1" v-if="Userinfo.IsMy==1" @click="fubuBtn">
					 发布
				</view>
				<view :class="['btn',Userinfo.IsFollow==1?'white':'']" v-if="Userinfo.IsMy==0" @click="Follow">
					<block v-if="Userinfo.IsFollow==0">关注</block>
					<block v-else>取消关注</block>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {host,post,get,dateUtils,toLogin} from '@/common/util.js';
	import mediaList from '@/components/tab-nvue/mediaList.vue';
	import uniLoadMore from '@/components/uni-load-more.vue';
	export default {
		components: {
			mediaList,
			uniLoadMore
		},
		data() {
			return {
				userId: "",
				token: "",
				hasSetText:"我的主页",
				hasData:false,
				hasActData:false,
				myType:1,
				Memberid:"",
				Userinfo:{},//用户数据
				medialist:{},//发布数据
				Actlist:{},
				findcount:0,
				Actcount:0
			}
		},
		onLoad: function(e) {
			this.userId = uni.getStorageSync("userId");
			this.token = uni.getStorageSync("token");
			this.Memberid=e.Memberid;
			this.UserHomePageInfo();
			this.JoinActivityList();
		},
		methods: {
			//获取个人主页信息
			async UserHomePageInfo(){
				let	result = await post("Find/UserHomePageInfo", {
					"UserId": this.userId,
					"Token": this.token,
					"MemberId": this.Memberid,
				});
				if (result.code === 0){
					this.Userinfo=result.data;
					if(this.Userinfo.IsMy==1){
						this.hasSetText="我的主页";
						this.myType=0;
					}else{
						this.hasSetText="TA的主页";
						this.myType=1;
					}
					this.FindList();
					uni.setNavigationBarTitle({
						title: this.hasSetText
					})
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
			//获取用户发布列表
			async FindList() {
				let result = await post("Find/FindList", {
					"UserId": this.userId,
					"Token": this.token,
					"page": 1,
					"pageSize": 10,
					"myType": this.myType,
					"MemberId": this.Memberid,
					"SearchKey": ""
				});
				if (result.code === 0) {
					result.data.forEach(function(item) {
						item.Addtime=dateUtils.format(item.Addtime);
					})
					if (result.data.length > 0) {
						this.hasData = true;
					}
					this.medialist = result.data;
					this.findcount=result.count;
				} else if (result.code === 2) {
			
				} else {
					uni.showToast({
						title: result.msg,
						icon: "none",
						duration: 2000
					});
				}
			},
			
			//获取用户活动列表
			async JoinActivityList() {
				let result = await post("Find/UserJoinActivityList", {
					"page": 1,
					"pageSize": 10,
					"UserId": this.Memberid
				});
				if (result.code === 0) {
					if (result.data.length > 0) {
						this.hasActData = true;
					}
					this.Actlist = result.data;
					this.Actcount = result.count;
				} else if (result.code === 2) {
			
				} else {
					uni.showToast({
						title: result.msg,
						icon: "none",
						duration: 2000
					});
				}
			},
			//链接详情页
			goDetail(e) {
				uni.navigateTo({
					url: '/pages/Article/artDetail/artDetail?id='+e.id
				})
			},
			//预览图片
			previewImg(obj){
				uni.previewImage({
					current:obj.imgurls[obj.index],
					urls: obj.imgurls,
					indicator:obj.imgurls.length
				});
			},
			//互关
			async Follow(){
			    let result = await post("Find/FollowOperation", {
					"UserId": this.userId,
					"Token": this.token,
					"ToMemberId":this.Memberid
				});
				if (result.code === 0) {
					uni.showToast({
						title: result.msg
					})
					if(this.Userinfo.IsFollow==0){
						this.Userinfo.IsFollow=1;
					}else{
						this.Userinfo.IsFollow=0;
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
			//关注列表
			goTomyflow() {
				if(this.myType==0){
					uni.navigateTo({
						url: '/pages/Article/myflow/myflow'
					})
				}
			},
			// 粉丝列表
			goTomyFen() {
				if(this.myType==0){
					uni.navigateTo({
						url: '/pages/Article/myFensi/myFensi'
					})
				}
			},
			//全部发布
			gotomyPost(){
				uni.navigateTo({
					url:"/pages/Article/myPost/myPost?Memberid="+this.Memberid+"&myType="+this.myType
				})
			},
			//全部活动
			gotoActivity(){
				uni.navigateTo({
					url:"/pages/Article/TaActivity/TaActivity?Memberid="+this.Memberid+"&myType="+this.myType
				})
			},
			//活动详情
			gotoactDetail(id){
				uni.navigateTo({
					url:"/pages/Article/activityDetail/activityDetail?id="+id
				})
			},
			//编辑个人信息
			editInfo(){
				if(this.myType==0){
					uni.navigateTo({
						url:"/pages/member/editinfo/editinfo"
					})
				}
			},
			//去发布
			fubuBtn(){
				uni.navigateTo({
					url: '/pages/Article/artPost/artPost'
				})
			}
		}
	}
</script>

<style scoped>
	@import "./style";
</style>
