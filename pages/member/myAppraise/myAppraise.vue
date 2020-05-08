<template>
	<view class="content commet">
		<view class="comment-head weui-cell mb10">
			<view class="weui-cell__bd">
				<image class="tx" v-if="Userinfo.Avatar" :src="Userinfo.Avatar" mode="aspectFill"></image>
				<image class="tx" v-else src="http://shop.dadanyipin.com/static/default.png" mode="aspectFill"></image>
				<text class="name uni-ellipsis">{{Userinfo.NickName}}</text>
			</view>
			<view class="weui-cell__ft">
				<button type="primary" size="middle" plain="true" class="radius100 btn" @click="gotoOrder">写评价</button>
			</view>
		</view>
		<view class="comment-content">
			<view class="comment-content__hd">全部评价</view>
<!-- 			<view class="flex justifyContentBetween bg_fff bb_tba">
				<view class="active">全部评价</view>
				<view>有图</view>
			</view> -->
			<view class="commentList" v-if="hasData">
				<block v-for="(item,index) in Commentlist" :key="index">
					<view class="item" @click="commentDetail(item.Id)">
						<view class="time">{{item.AddTime}}</view>
						<view class="con">{{item.ContentText}}</view>
						<view v-if="item.CommentPic" class="image-section">
							<view class="image-list" v-if="item.imgArr&&i<3" v-for="(source, i) in item.imgArr" :key="i" >
								<image class="img" :src="source" mode="aspectFill" @click.stop="previewImg(item.imgArr,i)"></image>
							</view>
							<view v-if="item.imgArr.length>3" class="count">{{item.imgArr.length}}</view>
						</view>
						<view class="column levelPanel order__column bg_no">
							<view class="item">
								<view class="item__bd">
									<view class="outside" @click.stop="gotoDetail(item.ProductId)">
										<view class="pictrueAll">
											<view class="pictrue">
												<image :src="item.ProductPic" mode="aspectFill"></image>
											</view>
										</view>
										<view class="txtBox">
											<view class="title text-line2">{{item.ProductTitle}}</view>
											<view class="flex skuBox flex-between">
												<view class="flex-item flex1">
													<text class="sku">{{item.ProductSpecification}}</text>
												</view>
												<view class="flex-item right">
													<!-- <text class="buyNum">x1</text> -->
												</view>
											</view>
											<view class="flex flex-between">
												<view class="flex-item flex1">
													<text class="new-price">￥{{item.ProductPrice}}</text>
												</view>
												<view class="flex-item right">
													<text class="subStatus"></text>
												</view>
											</view>
										</view>
									</view>
								</view>
							</view>
						</view>
						<view class="item__ft weui-cell">
							<view class="weui-cell__bd">
								<text class="txt">浏览&nbsp;{{item.ViewingCount}}次</text>
								<text class="txt">点赞&nbsp;{{item.LikesCount}}次</text>
								<text class="txt">评论&nbsp;{{item.ReplyCount}}次</text>
							</view>
							<view class="weui-cell__ft">
								<button type="primary" size="middle" plain="true" class="radius100 btn" @click.stop="gotoDetail(item.ProductId)">再次购买</button>
							</view>
						</view>
					</view>
				</block>
				<view class="uni-tab-bar-loading">
					<uni-load-more :loadingType="loadingType"></uni-load-more>
				</view>
			</view>
			<noData :isShow="noDataIsShow"></noData>
		</view>
	</view>
</template>

<script>
	import {host,post,get,toLogin} from '@/common/util.js';
	import noData from '@/components/noData.vue'; //暂无数据
	import uniLoadMore from '@/components/uni-load-more.vue';
	export default {
		components: {
			noData,
			uniLoadMore
		},
		onLoad(){
			this.userId = uni.getStorageSync("userId");
			this.token = uni.getStorageSync("token");
		},
		onShow(){
			if (toLogin()) {
				this.getMemberInfo();
				this.CommentList();
			}
		},
		data() {
			return {
				userId: "",
				token: "",
				curPage:"",
				loadingType: 0, //0加载前，1加载中，2没有更多了
				isLoad: false,
				hasData: false,
				noDataIsShow: false,
				page: 1,
				pageSize: 6,
				allPage: 0,
				count: 0,
				Userinfo:{},//用户数据
				Commentlist:{}//评价列表
			};
		},
		methods:{
			//写评价
			gotoOrder(){
				uni.navigateTo({
					url:'/pages/member/order/order?tabIndex=4'
				})
			},
			gotoDetail(id){
				uni.navigateTo({
					url:'/pages/homePage/details?id='+id
				})
			},
			commentDetail(id){
				uni.navigateTo({
					url:'/pages/commentsDetail/commentsDetail?commentId='+id
				})
			},
			//获取用户信息
			async getMemberInfo() {
				let result = await post("User/GetCenterInfo", {
					"UserId": this.userId,
					"Token": this.token
				})
				if (result.code === 0) {
					this.Userinfo=result.data;
				} else if (result.code === 2) {
					let _this = this;
					uni.showToast({
						title: "登录超时，请重新登录!",
						icon: "none",
						duration: 2000,
						success: function() {
							setTimeout(function() {
								uni.redirectTo({
									url: "/pages/login/login?askUrl=" + _this.curPage
								});
							}, 2000);
						}
					}); //如果未登录则跳转到登陆页面
				}else {
					uni.showToast({
						title: result.msg,
						icon: "none",
						duration: 2000
					});
				}
			},
			//我的评价列表
			async CommentList(){
				let result = await post("User/CommentList", {
					"UserId": this.userId,
					"Token": this.token,
					"page": this.page,
					"pageSize": this.pageSize
				})
				if (result.code === 0) {
					let _this=this;
					if (result.data.length > 0) {
						this.hasData = true;
						result.data.forEach(function(item) {
							let arr = item.CommentPic.split(",");
							if(arr[arr.length-1] ==""){
								arr.splice(arr.length-1,1);
							}
							_this.$set(item, "imgArr",arr);
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
						this.Commentlist = result.data;
					}
					if (this.page > 1) {
						this.Commentlist = this.Commentlist.concat(
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
				}else {
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
		},
		onReachBottom: function() {
			if (this.isLoad) {
				this.loadingType = 1;
				this.page++;
				this.CommentList();
			} else {
				this.loadingType = 2;
			}
		},
		onPullDownRefresh() { //下拉刷新
			//监听下拉刷新动作的执行方法，每次手动下拉刷新都会执行一次
			let _this=this;
			_this.page = 1;
			_this.loadingType = 1;
			setTimeout(function () {
				_this.getMemberInfo();
				_this.CommentList();
				uni.stopPullDownRefresh();  //停止下拉刷新动画
			}, 1000);
		},
	}
</script>

<style lang="scss">
	@import "../../../common/dd_style.css";
	.comment-head .tx{ margin-right: 20upx;}
	.comment-head .name{ display: inline-block;vertical-align: middle; max-width: 60%;}
	.levelPanel .item .outside {
		background-color: #f6f6f6;
	}
	.image-section {
		margin-right: -12upx;
		margin-bottom: 10upx;
		flex-direction: row;
		justify-content: space-between;
		position: relative;
		overflow: hidden;
	}
	.image-section .image-list{
		height: 230upx;
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
	}
	.image-section .count {
		position: absolute;
		right: 30upx;
		bottom: 16upx;
		font-size: 40upx;
		color: #fff;
	}
	.bb_tba{
		view{
			width:50%;padding:20upx;text-align: center;
			&.active{
				border-bottom: 1upx solid #ff3333;color:#ff3333
			}
		}
	}
	
</style>
