<template>
	<!-- 全部评价 -->
	<view class="evaluation">
		<view class="minute uni-bg-white" style="display: none;">
			<view class="given flex flex-between">
				<view class="screen">评分：</view>
				<view class="flex">
				   <view class="star iconfont icon-collect" v-for="(item1,index1) in 5" :key="index1"></view> 
				</view>
				<view class="min">商品好评度99%</view>
			</view>
			<view class="graded">
				<view class="gradedbox">
					<view class="">全部(300)</view>
				</view>
				<view class="gradedbox">
					<view class="">有图(120)</view>
				</view>
				<view class="gradedbox">
					<view class="">好评(68)</view>
				</view>
			</view>
			<view class="below">
				<image class="belowimg" src="http://shop.dadanyipin.com/static/hpicons/arrows2.svg" mode=""></image>
			</view>
		</view>
		<!-- 商品评价详情 -->
		<view class="CommentList uni-bg-white" v-if="hasData">
			<view class="minute" v-for="(item,index) in datalist" :key="index">
				<view class="given flex flex-between">
					<view class="flex flex-start">
						<view class="tx">
							<image :src="item.Avatar||'http://shop.dadanyipin.com/static/default.png'" mode="aspectFill"></image>
						</view>
						<view class="name uni-ellipsis">{{item.NickName}}</view>
						<view class="flex">
						   <view class="star iconfont icon-collect" v-for="(item1,index1) in item.Rank" :key="index1"></view> 
						</view>
					</view>
					<view class="min">{{item.AddTime}}</view>
				</view>
				<view class="carport">{{item.ContentText}}</view>
				<view class="commentpic" v-if="item.PicData.length">
					<block v-for="(i,e) in item.imgArr" :key="e">
					  <image :src="i" alt="" class="shop_pic" @click="previewImg(item.imgArr,i)" mode="aspectFill"></image>
					</block>
				</view>
				<view class="figure" style="display: none;">
					<view class="figurebox">
						<text class="iconfont icon-pinglun1"></text>5786
					</view>
					<view class="figurebox"><text class="iconfont icon-zan"></text>4633</view>
				</view>
			</view>
		</view>
		<noData :isShow="noDataIsShow"></noData>
		<view class="uni-tab-bar-loading" v-if="hasData">
			<uni-load-more :loadingType="loadingType"></uni-load-more>
		</view>
	</view>
</template>

<script>
	import {post,get,dateUtils,uncodeUtf16} from '@/common/util.js';
	import noData from '@/components/noData.vue'; //暂无数据
	import uniLoadMore from '@/components/uni-load-more.vue';
	export default{
		components: {
			noData,
			uniLoadMore
		},
		data(){
			return{
				userId: "",
				token: "",
				proId:'',//商品id
				loadingType: 0, //0加载前，1加载中，2没有更多了
				isLoad: false,
				hasData: false,
				noDataIsShow: false,
				page: 1,
				pageSize: 5,
				datalist:[]
			}
		},
		onLoad(e){
			// #ifdef APP-PLUS
			this.proId=e.id;
			// #endif
		},
		onShow() {
			this.userId = uni.getStorageSync("userId");
			this.token = uni.getStorageSync("token");
			// #ifndef APP-PLUS
			this.proId=this.$root.$mp.query.id;
			// #endif
			this.GetEvaluate();
		},
		methods:{
			async GetEvaluate() {
				let result = await post("Order/OrderCommentList", {
					UserId: this.userId,
					Token: this.token,
					ProId:this.proId,
					Page: this.page,
					PageSize: this.pageSize
				});
				if (result.code === 0) {
					let _this=this
					if (result.data.length > 0) {
						this.hasData = true;
						this.noDataIsShow = false;
						result.data.forEach(function(item){
							item.AddTime=dateUtils.format(item.AddTime)
							 let arr = [];
							 for(var i=0;i<item.PicData.length;i++){
								arr.push(item.PicData[i].PicUrl)
							 }
							 _this.$set(item, "imgArr",arr);
							 let str = uncodeUtf16(item.ContentText)
							  _this.$set(item,"ContentText",str)
						})
					}
					if (result.data.length == 0&&this.page==1) {
						this.noDataIsShow = true;
						this.hasData = false;
					}
					if (this.page === 1) {
						this.datalist = result.data;
					}
					if (this.page > 1) {
						this.datalist = this.datalist.concat(
							result.data
						);
					}
					if (result.data.length <this.pageSize) {
						this.isLoad = false;
						this.loadingType = 2;
					} else {
						this.isLoad = true;
						this.loadingType = 0
					}
				}
			},
			//预览图片
			previewImg(imgurls,index){
			  uni.previewImage({
				current:index,
				urls: imgurls,
				indicator:imgurls.length
			  });
			},
		},
		onReachBottom: function() {
			if (this.isLoad) {
				this.loadingType = 1;
				this.page++;
				this.GetEvaluate();
			} else {
				this.loadingType = 2;
			}
		}
	}
</script>

<style scoped lang="scss">
	/* 商品评价详情 */
	.CommentList{ margin-top: 20upx;}
	.minute{
		padding: 30upx;
		border-bottom: 1px solid #eee
	}
	.CommentList .minute:last-child{
		border-bottom: none;
	}
	.given{
		display: flex;
		/* padding-left: 22upx; */
		height:78upx;
		.tx{
			width:48upx;
			height:48upx;
			margin-right: 10upx;
			border-radius:50%;
			background: #eee;
			overflow: hidden; 
			image{
				display: block;
				height: 100%; width: 100%;
			}
		}
		.name{ max-width: 200upx;}
		.star{
		  font-size: 24upx;
		  margin-left: 10upx;
		  color: #ffc405 !important;
		}
	}
	.min{
		font-size:24upx;
		font-family:PingFang;
		font-weight:500;
		color:rgba(255,51,51,1);
	}
	.graded{
		display: flex;
		justify-content: space-around;
		font-size:24upx;
		font-family:PingFang;
		font-weight:500;
		color:rgba(51,51,51,1);
	}
	.gradedbox{
		width:152upx;
		height:56upx;
		border:1upx solid rgba(255,51,51,1);
		border-radius:28upx;
		text-align: center;
	}
	.below{
		display: flex;
		justify-content: center;
		padding-top: 20upx;
	}
	.belowimg{
		width: 35upx;
		height: 35upx;
	}
	.carport{
		font-size:28upx;
		font-family:PingFang;
		font-weight:500;
		color:rgba(51,51,51,1);
		line-height:50upx;
	}
	.commentpic{
		display: flex;
		justify-content: flex-start;
		flex-wrap: wrap;
		margin: 20upx 0 20upx;
	}
	.commentpic image{
		width:220upx;
		height:220upx;
		border-radius:12upx;
		background: #eee;
		margin: 0 4upx 8upx;
		overflow: hidden;
	}
	.figure{
		display: flex;
		justify-content: flex-end;
		color:rgba(147,147,147,1);
	}
	.figurebox{
		display: flex;
		align-items: center;
		padding-left: 40upx;
		font-size:22upx;
		font-family:PingFang;
		font-weight:500;
		.iconfont{ margin-right: 10upx;}
	}
	
</style>
