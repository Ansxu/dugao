<template>
	<view class="list-cell">
		<view class="media-list">
			<view class="media-hd" v-if="false">
				<view class="media-author">
					<image class="img" src="/static/logo.png" mode="aspectFill"></image>
				</view>
				<view class="author-name uni-ellipsis">平台活动</view>
			</view>
			<view @click="bindClick(datas.Id)">
				<view class="media-title">{{datas.Title}}</view>
				<view v-if="datas.PicImg" class="image-section image-section-one">
					<view class="image-list">
						<image class="img" :src="datas.PicImg" mode="widthFix" />
					</view>
				</view>
				<view class="media-location" v-if="datas.Location">
					<text class="info-text iconfont icon-dizhi1">{{datas.Location}}</text>
				</view>
				<view class="media-foot">
					<view class="media-info">
						<text class="info-text">{{datas.AddTime}}开始</text>
					</view>
					<view class="media-info-r">
						<text class="info-text scan">{{datas.JoinNum}}人参与</text>
						<text class="info-text comment" @click.stop="gotocommentlist(datas.Id)">{{datas.CommentNum}}</text>
						<text :class="['info-text zan',datas.IsLike==1?'active':'']" @click.stop="like(datas.Id)">{{datas.LikeNum}}</text>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	 import {host,post,toLogin,getCurrentPageUrlWithArgs} from '@/utils';
	export default {
		props: {
			datas: {
				type: Object,
				default: function(e) {
					return {
						
					}
				}
			}
		},
		created(){
			this.curPage = getCurrentPageUrlWithArgs().replace(/\?/g, '%3F').replace(/\=/g, '%3D').replace(/\&/g, '%26');
			this.userId = uni.getStorageSync("userId");
			this.token = uni.getStorageSync("token");
		},
		data(){
			return{
				userId: "",
				token: "",
				curPage:""
			}
		},
		computed: {},
		onLoad(){
		},
		methods: {
			flowbtn(e) {
				this.$emit('flow');
				e.stopPropagation();
			},
			bindClick(id) {
				uni.navigateTo({
					url: '/pages/Article/activityDetail/activityDetail?id='+id
				})
			},
			//全部评论
			gotocommentlist(id){
				uni.navigateTo({
					url:'/pages/Article/Actreplylist/Actreplylist?id='+id
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
					if(this.datas.IsLike==1){
						this.datas.IsLike=0;
						this.datas.LikeNum--;
					}else{
						this.datas.IsLike=1;
						this.datas.LikeNum++;
					}
				}else if (result.code === 2) {
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
			}
		}
	}
</script>

<style scoped>
	view {
		box-sizing: border-box;
	}

	.list-cell {
		width: 750upx;
		padding: 0 20upx;
	}

	.uni-list-cell-hover {
		background-color: #eeeeee;
	}

	.media-list {
		flex: 1;
		flex-direction: column;
		border-bottom-width: 1upx;
		border-bottom-style: solid;
		border-bottom-color: #eee;
		padding: 20upx 0;
	}

	.list-cell:last-child .media-list {
		border-bottom: none;
	}
	.image-section-one .image-list {
		width: 100%;
		height: auto;
		max-height: 710upx;
		display: block;
	}
	.media-hd {
		height: 80upx;
		margin-bottom: 10upx;
	}
	
	.media-hd .media-author {
		float: left;
		height: 80upx;
		width: 80upx;
	}
	
	.media-hd .media-author .img {
		width: 100%;
		height: 100%;
		border-radius: 50%;
	}
	
	.media-hd .author-name {
		float: left;
		max-width: 60%;
		margin-left: 20upx;
		line-height: 80upx;
	}
	.media-title {
		font-size: 32upx;
		word-break: break-all;
		display: -webkit-box;
		overflow: hidden;
		line-height: 1.5;
		-o-text-overflow: ellipsis;
		text-overflow: ellipsis;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 2;
	}
	.image-section {
		display: block;
		margin-top: 20upx;
		position: relative;
	}
	.image-section .image-list .img{
		display: block;
		width: 100%;
		height: 100%;
		border-radius: 6px;
	}
	.media-foot {
		display: flex;
		flex-direction: row;
		margin-top: 20upx;
		justify-content: space-between;
	}
	.media-info {
		display: flex;
		flex-direction: row;
	}

	.info-text {
		display: flex;
		color: #999999;
		font-size: 24upx;
	}
	.media-location{ margin-top: 20upx;}
	.media-location .icon-dizhi1:before{ color: #bbb; font-size: 36upx; line-height: 1; }
	.comment{ padding-left: 40upx; background: url(http://www.sc-mall.net/static/pl_icon.png) left center no-repeat; background-size: 32upx;}
	.zan{ padding-left: 40upx; background: url(http://www.sc-mall.net/static/zan.png) left top no-repeat; background-size: 32upx;}
	.zan.active{ background: url(http://www.sc-mall.net/static/zan2.png) left top no-repeat; background-size: 32upx;}
	.media-info-r{
		display: flex;
		flex-direction: row;
		justify-content: flex-end;
	}
	.media-info-r .info-text{ margin-left: 20upx;}
</style>
