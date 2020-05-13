<template>
	<view class="content" style="height: 100%;">
		<!-- 固定在顶部的导航栏 -->
		<!--<uni-nav-bar color="#333333" background-color="#f5f5f5" shadow="false" fixed="true">
			 #ifndef MP-WEIXIN -->
			<!-- <block slot="left">
				<view class="uni-icon uni-icon-arrowleft" style="color: #333;" @click="toback"></view>
			</block> -->
			<!-- #endif -->
			<!--<view class="input-view"  @click="navigate('Search/search_pro/search_pro')">
				<uni-icons type="search" size="22" color="#666666"></uni-icons>
				 <input confirm-type="search" disabled="true" class="input" @click="gotoProductList(0)" type="text"
				 placeholder="输入搜索关键词" />
				 <p>输入搜索关键词</p>
			</view> -->
			<!-- <block slot="right">
				<view class="iconfont icon-xiaoxi" style="color: #333;"><text class="uni-badge" v-if="newscount!=0">{{newscount}}</text></view>
			</block> 
		</uni-nav-bar>-->
		<div class="search flex-center-center m20" @click="navigate('Search/search_pro/search_pro')">
			<uni-icons type="search" size="18" color="#666666"></uni-icons>
			<p>搜索商品</p>
		</div>
		<!-- <view  :style="{'height':barHeight+44+'px'}"></view> -->
		<!-- 使用非原生导航栏后需要在页面顶部占位 -->
		<view class="container">
			<view class="page-body">
				<scroll-view class="nav-left" scroll-y :style="'height:'+height+'px'" v-if="categoryList.length>0">
					<view class="nav-left-item" @click="categoryClickMain(item.Id,index)" :key="index" :class="index==categoryActive?'active':''"
					 v-for="(item,index) in categoryList">
						{{item.Name}}
					</view>
				</scroll-view>
				<scroll-view class="nav-right" scroll-y :scroll-top="scrollTop" @scroll="scroll" @scrolltolower="loadMore" :style="'height:'+height+'px'"
				 scroll-with-animation>
<!-- 					<view class="rightbanner" v-if="categoryList.length>0&&categoryList[bannerindex].Pic">
						<image class="img" :src="categoryList[bannerindex].Pic" mode="heightFix"></image>
					</view> -->
					<view class="nav-rightList" v-if="hasData">
						<view :id="index===0?'first':''" class="nav-right-item" v-for="(item,index) in subCategoryList" :key="index"
						 @click="gotoProductList(1,item.Id)">
							<image :src="item.PicUrl||'http://shop.dadanyipin.com/static/noPicmin.png'" mode="" /></image>
							<view class="txt">{{item.ClassName}}</view>
						</view>
					</view>
					<block v-if="hasProData">
						<view class="level__product-list uni-mt10" style="padding-left: 20upx;">
							<view class="item flex" v-for="(item,index) in prolist" :key="index" @click="goDetail(item.Id)">
								<image :src="item.PicNo" class="item_img" mode=""></image>
								<view class="item_info" style="padding: 0;padding-bottom: 10upx;">
									<view class="item_title twoline">{{item.Name}}</view>
									<view class="flex flex-between">
										<view class="flex">
											<span class="item_price red">￥{{item.Price}}</span>
											<span class="item_market line-through" v-if="item.MarketPrice>item.Price">￥{{item.MarketPrice}}</span>
										</view>
										<view class="fz12 c_999">已售{{item.SalesVolume}}</view>
									</view>
									<view class="flex" v-if="item.DistributionIncome!= '0'" style="padding-top: 5px;"> 
										<view style="width: 70upx;height: 40upx;color: #fff;background: #ff6f00;line-height: 40upx;text-align: center;">补贴</view>
										<view style="height: 40upx;color: #ff6f00;line-height: 40upx;text-align: center;border: 1upx solid pink;padding: 0 10upx;">¥{{item.DistributionIncome}}</view>
									</view>
								</view>
							</view>
						</view>
						<view class="uni-tab-bar-loading">
							<uni-load-more :loadingType="loadingType"></uni-load-more>
						</view>
					</block>
					<noData :isShow="noDataIsShow"></noData>
				</scroll-view>

			</view>
		</view>
	</view>
</template>
<script>
	import {post,get,navigate} from '@/common/util.js';
	import uniNavBar from '@/components/uni-nav-bar.vue';
	import uniIcons from '@/components/uni-icon.vue';
	import noData from '@/components/noData.vue'; //暂无数据
	import uniLoadMore from '@/components/uni-load-more.vue';
	
	export default {
		onLoad() {
			// #ifdef APP-PLUS
			var height1 = plus.navigator.getStatusbarHeight();
			this.barHeight = height1;console.log(this.barHeight)
			this.height = uni.getSystemInfoSync().windowHeight-44-height1;
			// #endif
			// #ifndef APP-PLUS
			this.barHeight = 0;
			this.height = uni.getSystemInfoSync().windowHeight-44;
			// #endif
			this.getTypeList()
		},
		onShow() {
			this.userId = uni.getStorageSync("userId");
			this.token = uni.getStorageSync("token");
		},
		components: {
			uniNavBar,
			uniIcons,
			noData,
			uniLoadMore
		},
		data() {
			return {
				navigate,
				barHeight:0,
				userId: "",
				token: "",
				categoryList: [], //左边的类型数据
				subCategoryList: [], //右边的分类数据
				height: 0,
				categoryActive: 0,
				scrollTop: 0,
				scrollHeight: 0,
				typeId: '',
				newscount:0,//未读消息
				bannerindex:0,//类型banner
				hasData: false,//是否有下级分类
				hasProData: false,//是否有产品
				noDataIsShow: false,
				page: 1,
				pageSize: 6,
				loadingType: 0, //0加载前，1加载中，2没有更多了
				isLoad: false,
				prolist:[],
			}
		},
		methods: {
			toback(){
				uni.navigateBack();
			},
			scroll(e) {
				this.scrollHeight = e.detail.scrollHeight;
			},
			// 点击分类
			categoryClickMain(id, index) {
				this.categoryActive = index;
				this.typeId = id;
				this.scrollTop = -this.scrollHeight * index;
				this.bannerindex=index;
				this.page=1;
				this.isLoad=false;
				this.prolist=[];
				this.hasProData=false;
				this.classifyList();
			},
			getTypeList(){
				post('Goods/TypeList',{}).then(res=>{
					if(res.code==0){
						this.categoryList=res.data;
						this.typeId = res.data[0].Id;
						this.categoryClickMain(this.typeId, this.categoryActive); //默认的第一条顶级分类(获取下级分类)
					}
				})
			},
			async classifyList() {
				//获取下级分类
				let result = await post("Goods/GetProductClass", {
					TypeId: this.typeId
				});
				if (result.code === 0) {
					if(result.data.length){
						this.hasData=true;
						this.hasProData=false;
						this.noDataIsShow=false;
						this.subCategoryList = result.data;
					}else{
						this.hasData=false;
						this.getprolist();
					}
					
				}
			},
			// 跳转
			gotoProductList(type, id) {
				if (type === 0) {
					uni.navigateTo({
						url: "/pages/product/productDetail/productDetail?typeId="+this.categoryList[0].Id+'&isOpen=1'
					}); //点击搜素页面跳转，不需要传入参数
				}
				if (type === 1) {
					uni.navigateTo({
						url: "/pages/product/productDetail/productDetail?classId=" + id+"&typeId="+this.typeId
					}); //点击分类跳转，需要传入参数
				}
			},
			//分类商品列表
			async getprolist(){
				let res = await post("Goods/GoodsList", {
				Page: this.page,
				PageSize: this.pageSize,
				TypeId:this.typeId,
				
				});
				if(res.code==0){
					let len=res.data.length;
					if (len > 0) {
					  this.hasProData = true;
					  this.noDataIsShow = false;
					}
					if (len == 0&&this.page==1) {
					  this.noDataIsShow = true;
					  this.hasProData = false;
					}
					if (this.page === 1) {
					  this.prolist = res.data;
					}
					if (this.page > 1) {
					  this.prolist = this.prolist.concat(
					    res.data
					  );
					}
					if (len < this.pageSize) {
					  this.isLoad = false;
					  this.loadingType = 2;
					} else {
					  this.isLoad = true;
					  this.loadingType = 0
					}
				}
			},
			goDetail(id) {
				uni.navigateTo({
					url: '/pages/product/productDetail/productDetail?id='+id
				})
			},
			loadMore(){
				if (this.isLoad) {
					this.loadingType = 1;
					this.page++;
					this.getprolist();
				} else {
					this.loadingType = 2;
				}
			}
		}
	}
</script>
<style scoped lang="scss">
	@import "./style.scss";
	@import '../../../common/head.css';
	// @import '../../common/dd_style.css';
	@import '../../../common/product.scss';
	.uni-navbar /deep/ .uni-navbar-header-btns .uni-icon{ line-height: 44px;}
	.nav-right{
		background: #fff!important;
	}
	.nav-right .level__product-list /deep/ .uni-product .image-view {
	    width: 200upx !important;
	    height: 200upx !important;
	}
	.nav-right .level__product-list /deep/ .uni-product .uni-product-image {
	    height: 200upx !important;
	}
	.nav-right .level__product-list /deep/ .uni-product .txtbox{
		height: 200upx;
	}
	.search{
		background:#fff;
		color:#999;
		border-radius:40upx;
		padding:0 30upx;
		height:65upx;
		p{
			margin-left:8upx;
		}
	}
</style>
