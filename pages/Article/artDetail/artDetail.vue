<template>
	<view>
		<!-- 内容详情 -->
		<view class="Detailbox">
			<view class="list-cell">
				<view class="media-list">
					<view class="media-hd">
						<view class="media-author" @click="gotoPensonal">
							<image class="img" v-if="NewsInfo.Avatar" :src="NewsInfo.Avatar" mode="aspectFill"></image>
							<image class="img" v-else src="/static/default.png"></image>
						</view>
						<view class="media-hd-l uni-ellipsis">
							<text class="txt author-name">{{NewsInfo.NickName}}</text>
							<text class="txt media-time">{{NewsInfo.Addtime}}</text>
						</view>
						
						<block v-if="NewsInfo.IsMy==0">
							<view class="flow-btn" v-if="NewsInfo.IsFollow==0" @click="flowbtn">关注</view>
							<view class="flow-btn flowed" v-else @click="flowbtn">已关注</view>
						</block>
					</view>
					<view>
						<view class="media-title" v-if="NewsInfo.Title">{{NewsInfo.Title}}</view>
						<view class="media-title" v-else-if="NewsInfo.ContentDetails">{{NewsInfo.ContentDetails}}</view>
						<view v-if="imgArr.length" :class="['image-section Grid3',imgArr.length==1?'image-section-one':'']">
							<view class="image-list" v-if="imgArr&&i<9" v-for="(source, i) in imgArr" :key="i" >
								<image class="img" :src="source" v-if="imgArr.length==1" mode="widthFix" @click="previewImg(imgArr,i)" />
								<image class="img" :src="source" v-else mode="aspectFill" @click="previewImg(imgArr,i)" />
							</view>
							<view v-if="imgArr.length>9" class="count">{{imgArr.length}}</view>
						</view>
					</view>
					<view class="media-foot">
						<view class="media-location">
							<text class="info-text iconfont icon-shouhuodizhi flex-start" v-if="NewsInfo.Location">{{NewsInfo.Location}}</text>
						</view>
						<view class="media-info-r">
							<text class="info-text flex-start"><text class="iconfont icon-eye"></text>{{NewsInfo.BrowseNum}}</text>
						</view>
					</view>
				</view>
			</view>
		</view>
		<!-- 评论 -->
		<reply-List v-if="dataInfo" :newsInfo="NewsInfo"></reply-List>
	</view>
</template>

<script>
	import {host,post,get,dateUtils,toLogin} from '@/common/util.js';
	import replyList from '@/components/reply.vue';
	export default {
		components: {
			replyList
		},
		data() {
			return {
				userId: "",
				token: "",
				Findid:"",
				NewsInfo:{},
				imgArr:[],
				dataInfo:false
			};
		},
		onLoad: function(e) {
			this.userId = uni.getStorageSync("userId");
			this.token = uni.getStorageSync("token");
			this.Findid=e.id;
			this.FindNewsInfo();
		},
		methods:{
			/*获取发现详情*/
			async FindNewsInfo(){
			    let	result = await post("Find/FindNewsInfo", {
					"UserId": this.userId,
					"Token": this.token,
					"FindId":this.Findid
				});
				if (result.code === 0){
					this.NewsInfo=result.data;
					this.dataInfo = true;
					this.NewsInfo.Addtime=dateUtils.format(this.NewsInfo.Addtime);
					this.imgArr=this.NewsInfo.ImgList.split(",");
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
			//预览图片
			previewImg(imgurls,index){
				uni.previewImage({
					current:imgurls[index],
					urls: imgurls,
					indicator:imgurls.length
				});
			},
			async flowbtn() {
				let result = await post("Find/FollowOperation", {
					"UserId": this.userId,
					"Token": this.token,
					"ToMemberId":this.NewsInfo.MemberId
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
			gotoPensonal(){
				uni.navigateTo({
					url: '/pages/Article/myCenter/myCenter?Memberid='+this.NewsInfo.MemberId
				})
			}
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
		}
	}
</script>

<style scoped>
@import "./style";
</style>
