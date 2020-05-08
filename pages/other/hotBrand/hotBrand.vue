<template>
	<view class="hotBrand">
		<view class="banner">
			<swiper class="swiper" :indicator-dots="true" :autoplay="false" :interval="5000" :duration="500">
				<swiper-item v-for="(banner,index) in bannerlist" :key="index" >
					<view class="swiper-item" >
						<image class="img" :src="banner.Pic" mode="aspectFill"></image>
					</view>
				</swiper-item>
			</swiper>
		</view>
		<view class="list" v-if="hasData">
			<view class="item flex" v-for="(item,index) in datalist" :key="index">
				<view class="item_left">
					<image :src="item.PicNo" class="img" mode="aspectFit"></image>
					<image :src="'http://shop.dadanyipin.com/static/icons/b'+[index+1]+'.png'" class="tip" v-if="index<3"></image>
				</view>
				<view class="item_content flex1 flex flexColumn justifyContentBetween" @click="tolink('/pages/homePage/details?id='+item.Id)">
					<view class="uni-bold twoline">{{item.Name}}</view>
					<view class="color_red ">￥{{item.Price}}<span class="line-thon" v-if="item.MarketPrice>item.Price">指导价¥{{item.MarketPrice}}</span></view>
					<view class="flex  item_bt flex-between">
						<view class="flex flag">
							<block v-if="item.DistributionIncome">
								<span class="flag_pill">返</span>
								<span class="flag_mon color_red">￥{{item.DistributionIncome}}</span>
							</block>
						</view>
						<view class="qiang">马上抢</view>
					</view>
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
	import {post} from '@/common/util.js';
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
				page: 1,
				pageSize: 6,
				loadingType: 0, //0加载前，1加载中，2没有更多了
				isLoad: false,
				hasData: false,
				noDataIsShow: false,
				datalist:[],
				bannerlist:[],
			}
		},
		onShow(){
			this.banner();
			this.getHotList();
		},
		methods:{
			tolink(url){
				uni.navigateTo({
					url:url
				})
			},
			async banner() {
				let result = await post("Banner/BannerList", {
					Cid:3
				});
				if (result.code === 0) {
					this.bannerlist = result.data
				}
			},
			async getHotList(){
				let result = await post('Goods/GoodsList',{
					IsHits:1,
					Page: this.page,
					PageSize: this.pageSize
				})
				if(result.code == 0){
					let _this=this;
					if (result.data.length > 0) {
						this.hasData = true;
						this.noDataIsShow = false;
					}
					if (result.data.length == 0&&this.page==1) {
						this.noDataIsShow = true;
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
			
		},
		onReachBottom: function() {
			if (this.isLoad) {
				this.loadingType = 1;
				this.page++;
				this.getHotList();
			} else {
				this.loadingType = 2;
			}
		}
	}
</script>

<style scoped lang="scss">
	.hotBrand{
		background:#94aebe;
		.banner{
			padding: 20upx 0;
			.swiper{
				height:245upx;
				.swiper-item{
					padding: 0 20upx;
				}
				.img{ height: 245upx;
				border-radius: 12upx; 
				overflow: hidden;}
			}
		}
		.list{
			background: #ffffff;border-radius:12upx;padding:20upx; 
			margin: 0 20upx 20upx;
			.item{
				padding:10upx 0;
				.item_left{
					width:200upx;height:200upx;position: relative;margin-right:10upx;
					.img{
						width:100%;
						height:100%; 
						border-radius:12upx; 
						overflow: hidden;
						}
					.tip{
						position: absolute;top:0;left:0;
						width:70upx;height:96upx;
					}
				}
				.item_content{
					padding:10upx 0;
					.line-thon{
						color:#999!important;font-size:22upx;text-decoration: line-through;margin-left: 10upx;
					}
					.item_bt{
						width:100%;
						.qiang{
							background: #f00000;color:#ffffff;border-radius:50upx;font-size:22upx;padding:0 20upx;
						}
					}
				}
			}
		}
		.flag{
			font-size:20upx;height:40upx;box-sizing: border-box;
			.flag_pill{
				background: #f00000;color:#ffffff;line-height: 40upx;padding:0 15upx;height:40upx;
				border-radius: 5upx 0 0 5upx;
			}
			.flag_mon{
				line-height: 40upx;padding:0 10upx;height:40upx;border:1px solid red;
				border-radius: 0 5upx 5upx 0;
			}
		}
	}
	
</style>
