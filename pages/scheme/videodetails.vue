<template>
	<!-- 视频详情 -->
	<view class="bgfff" v-if="data.Id">
		<view class="video">
			<video class=""
				id="myVideo"
				:src="data.Video"
				@error="videoErrorCallback"
				controls
				:poster="data.Logo"
			></video>
		</view>
		<view class="video-padd">
			<view class="video-mark">{{data.Title}}</view>
			<view class="video-flex flex-center-between">
				<view class="video-right">{{data.AddTime}}</view>
				<view class="">{{data.Hits}}人浏览</view>
				<view class="video-flexs">
					<view class="" @click="videoLink">
						<image class="videoimg" src="../../static/icons/like-red.png" mode="" v-if="data.IsLike" />
						<image class="videoimg" src="../../static/icons/like.png" mode="" v-else />
					</view>
					<view class="">{{data.LikeNum}}</view>
				</view>
			</view>
			<view class="video-brief">{{data.Intro}}</view>	
			<!-- 内容过长的显示 -->
			<!-- <view class="video-brief maskInfoBox">{{data.Intro}}
				<div class="maskBlock flex-column-center-end">
					<p>点击预览全部</p> 
					<uni-icons type="arrowdown" color="#999"></uni-icons>
				</div>
			</view> -->
		</view>
		<view class="ploe"></view>
		<view class="comments">
			<view class="video-comm">全部评论</view>
			<view class="video-con" v-for="(item,index) in comment" :key="index">
				<view class="videohead">
					<image :src="item.Avatar" mode=""></image>
				</view>
				<view class="video-con bott">
					<view class="video-box">
						<view class="fz28">{{item.NickName}}</view>
						<view class="fz22">{{item.AddTime}}</view>
						<view class="fz28">{{item.Comment}}</view>
					</view>
					<view class="video-con">
						<view class="" @click="link(item)">
							<image class="videoimgs" src="../../static/icons/like-red.png" mode="" v-if="item.IsLike" />
							<image class="videoimgs" src="../../static/icons/like.png" mode="" v-else />
						</view>
						<view class="fz22">{{item.LikeNum}}</view>
					</view>
				</view>
			</view>
			<view class="video-ex fz22" v-if="comment.length<1">暂时还没有评论哦~</view>
			<uni-load-more :loadingType="loadMore"  v-else></uni-load-more>
			<view class="video-bottom">
				<view class="video-leave flex-center">
					<!-- <image class="videoimgss" src="../../static/icons/classify-icon.png" mode=""></image> -->
					<uni-icons type="compose" color="#999" size="18"></uni-icons>
					<input  type="text" v-model.trim="commentText" placeholder="留下你精彩评论吧~"/>
				</view>
				<view @click="addComment">发送</view>
			</view>
		</view>
	</view>
</template>

<script>
import {post,navigate,toast} from '@/utils'
import fertilizerItem from '@/pages/scheme/fertilizerItem.vue';
export default {
	components:{fertilizerItem},
	data(){
		return {
			navigate,
			id:'',
			userId: "",
			token: "",
			page:1,
			pageSize:12,
			loadMore:0,//0-loading前；1-loading中；2-没有更多了
			data:{},
			comment:[],
			commentText:'',
		}
	},
	onLoad(options){
		this.userId = uni.getStorageSync("userId");
		this.token = uni.getStorageSync("token");
		this.id = options.id;
		this.getData();
		this.getComment();
	},
	onShow(){
		this.userId = uni.getStorageSync("userId");
		this.token = uni.getStorageSync("token");
		this.commentText ='';
	},
	methods:{
		getData(){
			post('News/GetBrandgoods',{
				UserId: this.userId,
				Token: this.token,
				Id: this.id
			}).then(res=>{
					this.data = res.data;
			})
		},
		getComment(){
			post('News/BrandgoodsCommentList',{
				UserId: this.userId,
				Token: this.token,
				Page:this.page,
				PageSize:this.pageSize,
				Id: this.id
			}).then(res=>{
					this.loadMore = 0;
					const data = res.data;
					if(this.page===1){
						this.comment =[];
					}
					this.comment.push(...data);
					if(data.length<this.pageSize){
						this.loadMore = 2;
					}
			})
		},
		// 发送评论
		addComment(){
			if(!this.commentText){
				toast('请输入评论')
				return}
			post('News/BrandgoodsComment',{
				UserId: this.userId,
				Token: this.token,
				Id: this.id,
				Comment:this.commentText
			},{isLogin:true}).then(res=>{
				this.commentText ='';
				this.page=1;
				this.loadMore = 0;
				setTimeout(()=> {
					this.getComment();
				}, 1000);
				toast('评论成功',true)
			})
		},
		// 视频点赞
		videoLink(){
			post('News/BrandgoodsLikesOperation',{
				UserId: this.userId,
				Token: this.token,
				Id: this.data.Id,
			},{isLogin:true}).then(res=>{
				this.data.IsLike = !this.data.IsLike;
				if(this.data.IsLike){
					this.data.LikeNum+=1;
				}else{
					this.data.LikeNum-=1;
				}
			})
		},
		// 评论点赞
		link(item){
			post('News/BG_CommentOperation',{
				UserId: this.userId,
				Token: this.token,
				Id: item.Id,
			},{isLogin:true}).then(res=>{
				item.IsLike = !item.IsLike;
				if(item.IsLike){
					item.LikeNum+=1;
				}else{
					item.LikeNum-=1;
				}
			})
		},
		videoErrorCallback(){
			toast('视频加载失败，请刷新页面重试！')
		},
	},
	// 上拉加载
	onReachBottom: function() {
		if (this.loadMore !== 2) {
			this.page++;
			this.getComment();
		}
	},
	onPullDownRefresh() {
		//监听下拉刷新动作的执行方法，每次手动下拉刷新都会执行一次
		this.page=1;
		this.loadMore = 0;
		setTimeout(()=> {
			this.getData();
			this.getComment();
			uni.stopPullDownRefresh();  //停止下拉刷新动画
		}, 1000);
	}
}
</script>



<style scoped lang="scss">
	.video video{
		width: 100%;
	}
	.video-padd{
		padding: 0 30upx;
	}
	.video-mark{
		font-size:32upx;
		line-height:80upx;
	}
	.video-flex{
		display: flex;
		font-size:20upx;
		color:rgba(153,153,153,1);
	}
	.video-right{
		/* padding-right: 10%; */
	}
	.video-flexs{
		display: flex;
		/* padding-left: 44%; */
	}
	.videoimg{
		width: 26upx;
		height: 26upx;
		margin-top: -14upx;
		padding-right: 10upx;
	}
	.video-brief{
		background:rgba(245,245,245,1);
		border-radius:10px;
		padding: 30upx;
		font-size:28upx;
		line-height:40upx;
		margin: 30upx 0;
		position:relative;
	}
	.maskInfoBox{
		padding: 30upx 30upx 80upx;
		.maskBlock{
			position:absolute;
			bottom:0;
			left:0;
			width:100%;height:150upx;
			line-height:1.3;
			background:linear-gradient(rgba(255,255,255,0.6),rgba(255,255,255,1));
		}
	}
	.ploe{
		height:20upx;
		background:rgba(245,245,245,1);
	}
	.video-comm{
		font-size:32upx;
		font-weight:bold;
		color:rgba(51,51,51,1);
		padding: 27upx;
		border-bottom: 1upx solid rgba(236,236,236,1);
	}
	.video-con{
		display: flex;
	}
	.videohead{
		width: 64upx;
		height: 64upx;
		border-radius: 50%;
		background: pink;
		margin: 20upx 16upx 0 30upx;
	}
	.videohead image{
		width: 100%;
		height: 100%;
	}
	.bott{
		width: 85%;
		border-bottom: 1upx solid rgba(236,236,236,1);
		padding: 28upx 0;
		
	}
	.video-box{
		width: 82%;
	}
	.fz28{
		font-size:28upx;
	}
	.fz22{
		font-size:22upx;
		color:rgba(152,154,166,1);
		line-height: 50upx;
	}
	.videoimgs{
		width: 26upx;
		height: 26upx;
		padding-right: 10upx;
	}
	.video-ex{
		padding: 40upx 0;
		text-align: center;
	}
	.video-bottom{
		display: flex;
		padding: 19upx 30upx 10upx 30upx;
		line-height:60upx;
		position:fixed;
		bottom:0;left:0;
		background:#fff;
		border-top:1upx solid #ececec;
	}
	.comments{
		padding-bottom:90upx;
	}
	.video-leave{
		width:614upx;
		height:60upx;
		background:rgba(247,247,247,1);
		border-radius:10upx;
		margin-right: 20upx;
		padding:20rpx;
		.videoimgss{
			width:30upx;
			height:25upx;
			padding-right:20rpx;
		}
		input{
			font-size:26upx;
			width:100%;
			height:35upx;
			line-height:35upx;
			padding-left:10rpx;
		}
	}
</style>
