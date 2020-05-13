<template>
	<view class="list-cell">
		<view class="media-list">
			<view class="media-hd" v-if="false">
				<view class="media-author">
					<image class="img" src="/static/logo.png" mode="aspectFill"></image>
				</view>
				<view class="author-name uni-ellipsis">平台活动</view>
			</view>
			<view @click="bindClick(dataitem.Id)">
				<view class="media-title">{{dataitem.Title}}</view>
				<view v-if="dataitem.PicImg" class="image-section image-section-one">
					<view class="image-list">
						<image class="img" :src="dataitem.PicImg" mode="widthFix" />
					</view>
				</view>
				<view class="media-location" v-if="dataitem.Location">
					<text class="info-text iconfont icon-shouhuodizhi">{{dataitem.Location}}</text>
				</view>
				<view class="media-foot">
					<view class="media-info">
						<text class="info-text">{{dataitem.AddTime}}</text>
					</view>
					<view class="media-info-r">
						<text class="info-text">{{dataitem.JoinNum}}人参与</text>
						<text class="info-text" @click.stop="gotocommentlist(dataitem.Id)"><text class="iconfont icon-pinglun1"></text>{{dataitem.CommentNum}}</text>
						<text class="info-text" @click.stop="like(dataitem.Id)"><text :class="['iconfont',dataitem.IsLike==1?'icon-zan1':'icon-zan']"></text>{{dataitem.LikeNum}}</text>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	 import {host,post} from '@/utils';
	export default {
		props: {
			datajson: {
				type: Object,
				default: function(e) {
					return {
						
					}
				}
			}
		},
		created(){
			this.userId = uni.getStorageSync("userId");
			this.token = uni.getStorageSync("token");
			this.dataitem=this.datajson;
		},
		data(){
			return{
				userId: "",
				token: "",
				dataitem:{}
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
					if(this.dataitem.IsLike==1){
						this.dataitem.IsLike=0;
						this.dataitem.LikeNum--;
					}else{
						this.dataitem.IsLike=1;
						this.dataitem.LikeNum++;
					}
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
	.media-location .icon-shouhuodizhi{
		display: flex;
		flex-direction: row;
		justify-content: flex-start;
		align-items: center;
	}
	.media-location .icon-shouhuodizhi:before{ color: #bbb; font-size: 28upx; line-height: 1;margin-right: 8upx; }
	.media-info-r{
		display: flex;
		flex-direction: row;
		justify-content: flex-end;
		align-items: center;
	}
	.media-info-r .info-text{ margin-left: 20upx;
	    display: flex;
		flex-direction: row;
		justify-content: flex-end;
		align-items: center;
	}
	.media-info-r .info-text .iconfont{
		margin-right: 8upx;
	}
	.media-info-r .info-text .iconfont.icon-zan1{
		color: #89674C;
	}
</style>
