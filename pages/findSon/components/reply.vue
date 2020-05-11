<template>
	<view>
		<!-- 评价列表 -->
		<view class="commentlist">
			<view class="uni-list-cell">
				<view class="uni-list-cell-navigate">
					精选评论
				</view>
			</view>
			<block v-if="hasData">
			<view class="uni-comment">
				<view class="uni-comment-list" v-for="(item,index) in replylist" :key="index">
					<view class="uni-comment-face" @click="gotoUserhome(item.MemberId)">
						<image class="img" v-if="item.MemberHead" :src="item.MemberHead" mode="aspectFill"></image>
						<image class="img" v-else src="/static/default.png" mode="aspectFill"></image>
					</view>
					<view class="uni-comment-body">
						<view class="uni-comment-top">
							<text class="name">
								<block v-if="item.MemberName">{{item.MemberName}}</block>
								<block v-else>匿名</block>
							</text>
							<view :class="['zan',item.IsLike==1?'active':'']" @click="like(item.Id,2,index)">{{item.LikeNum}}</view>
						</view>
						<view class="uni-comment-content">{{item.Comment}}</view>
						<view v-if="item.ImgList" class="image-section">
							<view class="image-list" v-if="item.imgArr&&i<3" v-for="(source, i) in item.imgArr" :key="i" >
								<image class="img" :src="source" mode="aspectFill" />
							</view>
							<view v-if="item.imgArr.length>3" class="count">{{item.imgArr.length}}</view>
						</view>
						<view class="comment-date">
							<view class="date">{{item.AddTime}}</view><view>▪</view><view class="replay-btn" @click="Sendreplay(item.Id,item.MemberName,false)">回复TA</view>
						</view>
						<view class="replaybox" v-if="item.MyCommnetList.length>0">
							<view class="replaylist">
								<block v-if="item.isSHOW">
									<view class="replay-item" v-for="(item2,index2) in item.MyCommnetList" :key="index2">
										<text class="name" @click="Sendreplay(item2.ParentCommentId,item2.MemberName,true)">
											<block v-if="item2.MemberName">{{item2.MemberName}}<text style="color: #0A98D5;">{{item2.pname}}</text>：</block>
											<block v-else>匿名：</block>
										</text>
										<view class="desc">
											{{item2.Comment}}
										</view>
									</view>
								</block>
								<block v-else>
									<view class="replay-item" v-if="index2<3" v-for="(item2,index2) in item.MyCommnetList" :key="index2">
										<text class="name" @click="Sendreplay(item2.ParentCommentId,item2.MemberName,true)">
											<block v-if="item2.MemberName">{{item2.MemberName}}<text style="color: #0A98D5;">{{item2.pname}}</text>：</block>
											<block v-else>匿名：</block>
										</text>
										<view class="desc">
											{{item2.Comment}}
										</view>
									</view>
								</block>
							</view>
							<view class="morereply" v-if="item.MyCommnetList.length>3" @click="showAll(index)">
								<block v-if="item.isSHOW">收起回复</block>
								<block v-else>
								—查看全部回复{{item.MyCommnetList.length-3}}条
								</block>
							</view>
						</view>
					</view>
				</view>
			</view>
			<view class="uni-center">
				<view class="allcomment" v-if="replylist.length>10" @click="gotoAll">
					查看全部评论
				</view>
				<text  v-else style="color: #999; padding: 20upx;">已显示全部评论</text>
			</view>
			</block>
			<block v-else>
				<view style="text-align: center; color: #999; padding: 20upx;">暂无评论</view>
			</block>
		</view>
		
		<!-- 底部发表按钮 -->
		<view class="foot-fiexd">
			<view class="mark" v-if="IsShowReplyBox" @click="CancelReply"></view>
			<view :class="['foot-reply',IsShowReplyBox?'active':'']">
				<input class="ipt" type="text" v-model="Comment" @click="showReplyBox" :placeholder="placeholder"/>
				<view class="btn-r">
					<block v-if="IsShowReplyBox">
						<view :class="['sendBtn',Comment==''?'dis':'']" @click="Send">发表</view>
					</block>
					<block v-if="!IsShowReplyBox">
						<view class="info-text comment">{{comment_count}}</view>
						<view :class="['info-text zan',iszan==1?'active':'']" @click="like(FkId,0)">{{zan}}</view>
					</block>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {host,post,get,dateUtils,toLogin,getCurrentPageUrlWithArgs} from '@/common/util.js';
	export default {
		props:{
			newsInfo: {
				type: Object,
				default: null
			}
		},
		created(){
			this.curPage = getCurrentPageUrlWithArgs().replace(/\?/g, '%3F').replace(/\=/g, '%3D').replace(/\&/g, '%26');
			this.userId = uni.getStorageSync("userId");
			this.token = uni.getStorageSync("token");
			this.CommnetList();
		},
		data(){
			return{
				userId: "",
				token: "",
				curPage:"",
				hasData: false,
				page: 1,
				pageSize: 11,
				replylist:{},
				FkId:this.newsInfo.Id,
				comment_count:this.newsInfo.CommentNum,
				zan:this.newsInfo.LikeNum,
				iszan:this.newsInfo.IsLike,
				IsShowReplyBox:false,//是否显示评论按钮
				placeholder:"我也来说~",
				PCommentId:0,//上级评论id
				Comment:"",//评论内容
				PCommentname:"",//上级评论名
				imgs:[],
				imgsStr:"",
				PicNos:""
			}
		},
		methods:{
			/*获取评论列表*/
			async CommnetList() {
				let result = await post("Find/CommnetList", {
					"UserId": this.userId,
					"Token": this.token,
					"page": this.page,
					"pageSize": this.pageSize,
					"FkId": this.FkId
				});
				if (result.code === 0) {
					let _this=this;
					result.data.forEach(function(item) {
						item.AddTime=dateUtils.format(item.AddTime);
						_this.$set(item, "imgArr",item.ImgList.split(","));
						_this.$set(item, "isSHOW",false);
						item.MyCommnetList.forEach(function(item2) {
							let txt =item2.Comment.split("#$#");
							if(txt.length==2){
								_this.$set(item2, "Comment",txt[1]);
								_this.$set(item2, "pname",txt[0]);
							}else{
								_this.$set(item2, "Comment",txt[0]);
								_this.$set(item2, "pname","");
							}
						})
					})
					if (result.data.length > 0) {
						this.hasData = true;
					}
					this.replylist = result.data;
				} else if (result.code === 2) {
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
			},
			/*发表评论*/
			async CommentOperation(){
				let result = await post("Find/CommentOperation",{
					"UserId": this.userId,
					"Token": this.token,
					"FkId":this.FkId,
					"TypeInt":0,
					"ParentCommentId":this.PCommentId,
					"Comment":this.Comment,
					"PicList":this.imgsStr,
					"PicNo":this.PicNos
				});
				if(result.code===0){
					uni.showToast({
						title: result.msg,
						icon: "none",
						duration: 1500
					});
					//更新评论列表，并清空评论内容
					this.CommnetList();
					this.IsShowReplyBox=false;
					this.placeholder="我也来说~";
					this.PCommentname="";
					this.PCommentId=0,
					this.Comment="";
					this.imgsStr="";
					this.PicNos="";
				} else if (result.code === 2) {
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
			},
			//显示全部回复
			showAll(index){
				this.replylist[index].isSHOW=!this.replylist[index].isSHOW;
			},
			//显示评论按钮
			showReplyBox(){
				this.IsShowReplyBox=true;
			},
			//取消评论
			CancelReply(){
				this.placeholder="我也来说~";
				this.IsShowReplyBox=false;
			},
			Send(){
				if(this.Comment!=""){
					if(this.PCommentname!=""){
						this.Comment=this.PCommentname+this.Comment;
					}
					this.CommentOperation();
				}else{
					uni.showToast({
						title: "评论内容不能为空",
						icon: "none",
						duration: 2000
					});
				}
			},
			Sendreplay(mid,name,isPname){
				if(name==""){
					this.placeholder="回复匿名";
					if(isPname==true){
						this.PCommentname="@匿名"+"#$#"
					}
				}else{
					this.placeholder="回复"+name;
					if(isPname==true){
						this.PCommentname="@"+name+"#$#";
					}
				}
				this.PCommentId=mid;
				this.IsShowReplyBox=true;
			},
			gotoAll(){
				uni.navigateTo({
					url: '/pages/Article/replylist/replylist?id='+this.FkId
				})
			},
			gotoUserhome(mid){
				uni.navigateTo({
					url: '/pages/Article/myCenter/myCenter?Memberid='+mid
				})	
			},
			//点赞/取消点赞
			async like(id,Likestatu,index){
				let result = await post("Find/FindlikeOperation", {
					"UserId": this.userId,
					"Token": this.token,
					"FindId": id,
					"TypeStatu":Likestatu
				});
				if (result.code === 0) {
					uni.showToast({
						title: result.msg,
						icon: "none",
						duration: 2000
					});
					if(Likestatu==0){//发现点赞
						if(this.iszan==1){
							this.iszan=0;
							this.zan--;
						}else{
							this.iszan=1;
							this.zan++;
						}
					}else if(Likestatu==2){//评论点赞
						if(this.replylist[index].IsLike==1){
							this.replylist[index].IsLike=0;
							this.replylist[index].LikeNum--;
						}else{
							this.replylist[index].IsLike=1;
							this.replylist[index].LikeNum++;
						}
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
	/* 评论样式 */
	.commentlist {
		background: #fff;
		margin-top: 20upx;
		padding-bottom: 40upx;
	}

	.uni-comment {
		padding: 20upx;
	}

	.uni-comment-list {
		position: relative;
		padding-bottom: 40upx;
	}

	.uni-comment-list:after {
		position: absolute;
		right: 0;
		bottom: 0;
		left: 90upx;
		height: 1px;
		content: '';
		-webkit-transform: scaleY(.5);
		transform: scaleY(.5);
		background-color: #eee;
	}

	.uni-comment-top {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
	}
	.uni-comment-face .img{ height: 100%; width: 100%;}
	.uni-comment-top .name {
		color: #89674c;
		font-size: 26upx;
	}
	.comment {
		padding-left: 40upx;
		background: url(http://www.sc-mall.net/static/pl_icon.png) left center no-repeat;
		background-size: 32upx;
	}

	.zan {
		padding-left: 40upx;
		background: url(http://www.sc-mall.net/static/zan.png) left top no-repeat;
		background-size: 32upx;
	}

	.zan.active {
		background: url(http://www.sc-mall.net/static/zan2.png) left top no-repeat;
		background-size: 32upx;
	}
	.uni-comment .comment-date uni-view,.uni-comment .comment-date view {
		font-size: 24upx;
		color: #999;
		display: inline-block;
		padding-right: 4upx;
	}

	.uni-comment .comment-date .replay-btn {
		color: #89674c;
	}

	.uni-comment-top .zan {
		font-size: 24upx;
		color: #999;
	}

	.replaybox {
		background: #f6f8f7;
		padding: 20upx;
		border-radius: 6upx;
	}

	.replaybox .replay-item {
		overflow: hidden;
	}

	.replaybox .name {
		float: left;
		color: #89674c;
		font-size: 26upx;
	}

	.replaybox .desc {
		color: #888;
		font-size: 26upx;
	}

	.replaybox .morereply {
		color: #89674c;
		font-size: 26upx;
	}

	.allcomment {
		display: inline-block;
		height: 60upx;
		line-height: 60upx;
		color: #89674c;
		background: #fcf4e3;
		border-radius: 30upx;
		padding: 0 20upx;
	}

	.foot-fiexd {
		height: 100upx;
	}
	.foot-fiexd .mark{
		position: fixed;
		left: 0;
		bottom: 0;
		width: 100%;
		height: 100%;
		z-index: 997;
		background: transparent;
	}
	.foot-reply {
		height: 100upx;
		background: #fff;
		box-sizing: border-box;
		position: fixed;
		left: 0;
		bottom: 0;
		width: 100%;
		z-index: 998;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		border-top: 1px solid #eee;
	}
	.foot-reply .ipt{ width: 520upx; padding: 0 20upx; height: 60upx; font-size: 24upx; color: #999; background: #f6f8f7; border-radius: 6px; margin: 20upx 0 20upx 20upx;}
	.foot-reply.active .ipt{ width: 554upx;}
	.foot-reply .btn-r{
		display: flex;
		flex-direction: row;
		justify-content: space-between;
	}
	.foot-reply .btn-r .info-text{ display: block; width: 90upx; text-align: center; padding: 48upx 0 0; margin: 0;}
	.foot-reply .btn-r .comment {
		background-position: center 14upx;
	}
	.foot-reply .btn-r .zan{ background-position: center 14upx;}
	.foot-reply .sendBtn{ background: #89674c; color: #fff; border-radius: 6px; height: 60upx; line-height: 60upx; padding: 0 20upx; margin: 20upx 20upx 20upx 0;}
	.foot-reply .sendBtn.dis{opacity: .4;}
	.image-section {
		margin-top: 20upx;
		margin-right: -12upx;
		margin-bottom: -12upx;
		flex-direction: row;
		justify-content: space-between;
		position: relative;
		overflow: hidden;
	}
	.image-section .image-list{
		height: 210upx;
		width: 33.3%;
		float: left;
		padding-right: 12upx;
		margin-bottom: 12upx;
		box-sizing: border-box;
		overflow: hidden;
	}
	.image-section .image-list .img{
		width: 100%;
		height: 100%;
		border-radius: 6px;
		background: #f5f5f5;
	}
	.image-section .count {
		position: absolute;
		right: 30upx;
		bottom: 16upx;
		font-size: 40upx;
		color: #fff;
	}
</style>
