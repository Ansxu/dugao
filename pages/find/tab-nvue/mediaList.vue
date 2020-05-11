<template>
	<view class="list-cell">
		<view class="media-list">
			<view class="media-hd" v-if="datas.FindType!=2">
				<view class="media-author" @click="gotoPensonal">
					<image class="img" v-if="datas.Avatar" :src="datas.Avatar" mode="aspectFill"></image>
					<image class="img" v-else-if="datas.FindType==2" src="/static/logo.png" mode="aspectFill"></image>
					<image class="img" v-else src="/static/default.png"></image>
				</view>
				<view class="author-name uni-ellipsis" @click="gotoPensonal">
					<block v-if="datas.NickName">{{datas.NickName}}</block>
					<block v-else-if="datas.FindType==1">店铺动态</block>
					<block v-else-if="datas.FindType==2">平台资讯</block>
				</view>
				<block v-if="datas.IsMy==0&&datas.FindType!=2&&isBtn==true">
					<view class="flow-btn" v-if="datas.IsFollow==0" @click="flowbtn">关注</view>
					<view class="flow-btn flowed" v-else @click="flowbtn">已关注</view>
				</block>
			</view>
			<view @click="bindClick(datas.FindType,datas.Id)">
				<view class="media-title" v-if="datas.Title">{{datas.Title}}</view>
				<view class="media-title" v-else-if="datas.ContentDetails">{{datas.ContentDetails}}</view>
				<!-- 一排两列 -->
				<block v-if="Grid==='2'">
					<view v-if="imgArr" :class="['image-section',imgArr.length==1?'image-section-one':'',imgArr.length==2?'image-section-two':'',imgArr.length==3?'image-section-three':'',imgArr.length>3?'image-section-four':'']">
						<view class="image-list" v-show="imgArr&&i<4" v-for="(source, i) in imgArr" :key="i" >
							<image class="img" :src="source" v-if="imgArr.length==1" mode="widthFix" @click.stop="previewImg(imgArr,i)" />
							<image class="img" :src="source" v-else mode="aspectFill" @click.stop="previewImg(imgArr,i)"/>
						</view>
						<view v-if="imgArr.length>4" class="count">{{imgArr.length}}</view>
					</view>
				</block>
				<!-- 一排3列 -->
				<block v-else>
					<view v-if="imgArr" :class="['image-section Grid3',imgArr.length==1?'image-section-one':'']">
						<view class="image-list" v-show="imgArr&&i<3" v-for="(source, i) in imgArr" :key="i" >
							<image class="img" :src="source" v-if="imgArr.length==1" mode="widthFix" @click.stop="previewImg(imgArr,i)" />
							<image class="img" :src="source" v-else mode="aspectFill" @click.stop="previewImg(imgArr,i)" />
						</view>
						<view v-if="imgArr.length>3" class="count">{{imgArr.length}}</view>
					</view>
				</block>
			
			<view class="media-location" v-if="datas.Location">
				<text class="info-text iconfont icon-dizhi1">{{datas.Location}}</text>
			</view>
			<view class="media-foot">
				<view class="media-info">
					<text class="info-text">{{datas.AddTime}}</text>
				</view>
				<view class="media-info-r">
					<text class="info-text scan">{{datas.BrowseNum}}</text>
					<text class="info-text comment" @click.stop="gotocommentlist">{{datas.CommentNum}}</text>
					<text :class="['info-text zan',datas.IsLike==1?'active':'']" @click.stop="like(datas.Id)">{{datas.LikeNum}}</text>
				</view>
			</view>
			</view>
		</view>
	</view>
</template>
<script>
    import {host,post,toLogin} from '@/utils';
	export default {
		props: {
			Grid:{
				type:String,
				default:'2'
			},
			isBtn:{
				type:Boolean,
				default:true
			},
			datas: {
				type: Object,
				default: function(e) {
					return {}
				}
			}
		},
		created(){
			this.userId = uni.getStorageSync("userId");
			this.token = uni.getStorageSync("token");
			console.log(this.datas,'datas')
		},
		mounted(){
		},
		data(){
			return{
				userId: "",
				token: "",
			}
		},
		computed: {
			imgArr() {
				return this.datas.ImgList.split(",");
			}
		},
		methods: {
			flowbtn() {
				this.$emit('flow');
			},
			bindClick(artType,id) {
				this.$emit('click',{artType,id});
			},
			gotoPensonal() {
				if(this.datas.FindType==0){//指定用户个人主页
					uni.navigateTo({
						url: '/pages/Article/myCenter/myCenter?Memberid='+this.datas.MemberId
					})	
				}
				if(this.datas.FindType==1){//指定店铺主页
					uni.navigateTo({
						url: '/pages/store/storeIndex/storeIndex?shopId='+this.datas.ShopId
					})	
				}
			},
			//全部评论
			gotocommentlist(){
				uni.navigateTo({
					url:'/pages/Article/replylist/replylist?id='+this.datas.Id
				})
			},
			//预览图片
			previewImg(imgurls,index){
				this.$emit('previewImg',{imgurls,index});
			},
			//点赞/取消点赞
			async like(id){
				let result = await post("Find/FindlikeOperation", {
					"UserId": this.userId,
					"Token": this.token,
					"FindId": id,
					"TypeStatu":0
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
		font-size: 30upx;
		color: #333;
		float: left;
		max-width: 60%;
		margin-left: 20upx;
		line-height: 80upx;
	}

	.media-hd .flow-btn {
		width: 130upx;
		height: 60upx;
		line-height: 60upx;
		text-align: center;
		float: right;
		background: #fcf4e3;
		color: #89674c;
		border-radius: 30upx;
		margin-top: 10upx;
	}

	.media-hd .flow-btn.flowed {
		background: #eee;
		color: #999;
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
		margin-top: 20upx;
		flex-direction: row;
		justify-content: space-between;
		position: relative;
	}

	.image-section .image-list{
		height: 350upx;
	}
	.image-section .image-list .img{
		width: 100%;
		height: 100%;
		border-radius: 6px;
	}
	.image-section-one {
		display: block;
	}
	.image-section-one .image-list {
		width: 100%;
		height: auto;
		display: block;
	}
	.image-section-one .image-list .img{display: block; height: auto; max-height: 710upx;}
	.image-section-two,
	.image-section-three,
	.image-section-four {
		margin-right: -12upx;
		margin-bottom: -12upx;
		overflow: hidden;
	}
	.image-section-two .image-list,
	.image-section-four .image-list,
	.image-section-three .image-list {
		width: 50%;
		float: left;
		padding-right: 12upx;
		margin-bottom: 12upx;
		box-sizing: border-box;
		overflow: hidden;
	}

	.image-section-three .image-list:first-child {
		width: 100%;
	}

	.image-section .count {
		position: absolute;
		right: 30upx;
		bottom: 16upx;
		font-size: 40upx;
		color: #fff;
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
	.scan{padding-left: 46upx; background: url(http://www.sc-mall.net/static/eye.png) left top no-repeat; background-size: 40upx;}
	.media-info-r{
		display: flex;
		flex-direction: row;
		justify-content: flex-end;
	}
	.media-info-r .info-text{ margin-left: 20upx;}
	/*3列样式*/
	.Grid3.image-section {
		margin-top: 20upx;
		margin-right: -12upx;
		margin-bottom: -12upx;
		flex-direction: row;
		justify-content: space-between;
		position: relative;
		overflow: hidden;
	}
	.Grid3.image-section .image-list{
		height: 230upx;
		width: 33.3%;
		float: left;
		padding-right: 12upx;
		margin-bottom: 12upx;
		box-sizing: border-box;
		overflow: hidden;
	}
	.Grid3.image-section.image-section-one{
		display: block;
	}
	.Grid3.image-section.image-section-one .image-list{
		width: 100%;
		height: auto;
		display: block;
	}
	.Grid3.image-section.image-section-one .image-list .img{display: block; height: auto;}
</style>
