<template>
	<view class="content myCollectPage">
		<!-- <view class="carthead"  :style="{'padding-top':barHeight+'px'}">
			<text>收藏</text>
		</view> -->
		<view class="uni-tab-bar bg_fff">
			<scroll-view id="tab-bar" :class="['uni-swiper-tab tabList li_50',isMultipleStore>0?'':'w50']">
				<view :class="['swiper-tab-list',tabIndex==0 ? 'active' : '']" id="list0" @click="tapTab(0)">
					<view class="s">商品</view>
				</view>
				<view v-if="isMultipleStore>0" :class="['swiper-tab-list',tabIndex==1 ? 'active' : '']" id="list1" @click="tapTab(1)">
					<view class="s">店铺</view>
				</view>
			</scroll-view>
		</view>
		<view class="hasContentPage">
			<view class="collect_list uni-mt10" v-if="hasData">
				<!--店铺收藏-->
				<view class="list" v-if="tabIndex==1">
					<view class="item mt10" v-for="(item,index) in list" :key="index" @click="tolink('/pages/brand/shopIndex/shopIndex?ShopId='+item.ShopId)">
						<view class="flex item_shop flexAlignCenter">
							<image :src="item.Logo" class="shop_logo"></image>
							<view class="flex1 uni-bold">{{item.Name}}</view>
						</view>
						<!-- <view class="item_list flex mt2">
							<view class="flex flexColumn flexAlignCenter item_list_fill" v-for="(item,index) in 3" :key="index">
								<view class="img flex flexAlignCenter justifyContentCenter">
									<image src="http://ddyp.wtvxin.com/static/of/car.png"></image>
								</view>
								<view>¥33万</view>
							</view>
						</view> -->
					</view>
				</view>
				<!--商品收藏-->
				<view class="list" v-else>
					<view class="item_pro flex" v-for="(item,index) in list" :key="index">
						<view class="item__hd" v-if="isShowDel" @click="shiftChecked(index)">
							<view :class="['IconsCK IconsCK-radio',item.checked?'checked':'' ]"></view>
						</view>
						<view class="item__bd flex" @click="tolink('/pages/homePage/details?id='+item.ProId)">
							<image :src="item.PicNo"></image>
							<view class="flex flexColumn flex1">
								<view class="uni-bold">{{item.Name}}</view>
								<view class="flex flex-between">
									<view class="color_red">¥{{item.Price}}<span class="line_thin" v-if="item.MarketPrice>item.Price">￥{{item.MarketPrice}}</span></view>
									<!-- <view class="flex flag">
										<span class="flag_pill">返</span>
										<span class="flag_mon color_red">￥2万</span>
									</view> -->
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
			<!-- 没有更多数据了 -->
			<view class="uni-tab-bar-loading" v-if="hasData">
				<uni-load-more :loadingType="loadingType"></uni-load-more>
			</view>
			<noData :isShow="noDataIsShow"></noData>
		</view>
		<view class="dd_foot" v-if="tabIndex==0">
			<view class="foot-fixed bt0">
				<view class="flex flex-between" v-if="hasData">
					<block v-if="isShowDel">
						<view class="lab flex flex-start" @click="selectAll">
							<view :class="['IconsCK IconsCK-radio',allSelect?'checked':'' ]"></view>全选
						</view>
						<view class="btn0" @click="cancelDel">取消</view>
						<view class="btn0 active" @click="btnDel">删除</view>
					</block>
					<view class="btn btn_100" v-else @click="ShowDel">
						<text class="uni-icon uni-icon-compose"></text>编辑
					</view>
				</view>
				<view class="flex" v-else>
					<view class="btn btn_100 red" @click="tolink('/pages/tabBar/index/index',true)">
						去逛逛
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import noData from '@/components/noData.vue'; //暂无数据
	import uniLoadMore from '@/components/uni-load-more.vue'; //加载更多
	import {
		host,
		post,
		get,
		dateUtils,
		toLogin,
		getCurrentPageUrlWithArgs
	} from '@/common/util.js';
	export default {
		data() {
			return {
				barHeight: 0,
				tabIndex: 0, //0:产品收藏；1：商家收藏 2：众筹收藏
				curPage: "",
				userId: "",
				token: "",
				isMultipleStore: 1, //0表示没有店铺
				list: [],
				listLength: 0,
				page: 1,
				pageSize: 6,
				isLoad: false,
				isShowDel: false, //是否显示删除的底部
				hasData: false,
				noDataIsShow: false,
				loadingType: 0, //0加载前，1加载中，2没有更多了
				allSelect:false,//全选
				selectlen:0
			};
		},
		components: {
			noData,
			uniLoadMore
		},
		onLoad() {
			// #ifdef APP-PLUS
			var height = plus.navigator.getStatusbarHeight();
			this.barHeight = height;
			// #endif
			// #ifdef H5
			this.barHeight = 0;
			// #endif
		},
		onShow() {
			this.tabIndex = uni.getStorageSync("collectIndex")
			this.initData();
			this.userId = uni.getStorageSync("userId");
			this.token = uni.getStorageSync("token");
			this.collectionsList();
			
		},
		methods: {
			//跳转
			tolink(Url,tabBar) {
				if(tabBar){
					uni.switchTab({
						url: Url
					})
				}else{
					uni.navigateTo({
						url: Url
					})
				}
			},
			tapTab(index) { //点击tab-bar
				uni.setStorageSync('collectIndex',index)
				this.tabIndex = index;
				this.initData();
				this.collectionsList();
			},
			initData() {
				this.list = [];
				this.page = 1;
				this.isShowDel = false;
				this.loadingType = 0;
				this.noDataIsShow = false;
				this.hasData = false;
			},
			//全选
			selectAll(){
			  let that=this;
			  if(this.allSelect){
				this.allSelect=false;
				this.selectlen=0;
				this.list.forEach(function(item) {
				  that.$set(item,"checked",false)
				});
				
			  }else{
				this.allSelect=true;
				this.selectlen=this.list.length;
				this.list.forEach(function(item) {
				  that.$set(item,"checked",true)
				});
			  }
			},
			//单选择
			shiftChecked(index) {
				let _this=this;
				let selectId=!_this.list[index].checked;
				_this.$set(_this.list[index],"checked",selectId);
				if(selectId){
					_this.selectlen++
				}else{
					_this.selectlen--
				}
				let len=_this.list.length;
				if(_this.selectlen==len){
					_this.allSelect=true
				}else{
					_this.allSelect=false
				}
			},
			//点击编辑
			ShowDel() {
				this.isShowDel = true;
			},
			cancelDel() {
				this.isShowDel = false;
				this.allSelect=false;
				this.selectlen=0;
				this.list.forEach(function(item) {
					item.checked = false;
				})
			},
			btnDel() { //删除收藏的产品
				let _this = this,
				    proIdArr = [];
				this.list.forEach(function(item) {
					if (item.checked == true) {
						proIdArr.push(item.Id);
					}
				})
				if (proIdArr.length > 0) {
					uni.showModal({
					  content: "您确定要删除所选商品吗？",
					  confirmColor:"#ff3333",
					  success: function(res) {
						if (res.confirm) {
							  _this.DeleteCollections(proIdArr.join(","))
							} else if (res.cancel) {
								
								}
							}
					}) 
				} else {
					uni.showToast({
						title: "请选择需要删除的项！",
						icon: "none",
						duration: 1500
					});
				}
			},
			async collectionsList() {
				let result = await post("User/MemberCollections", {
					UserId: this.userId,
					Token: this.token,
					Type: this.tabIndex,
					Page: this.page,
					PageSize: this.pageSize,
				});
				if (result.code === 0) {
					let _this = this;
					if (result.data.length > 0) {
						this.hasData = true;
						this.noDataIsShow = false;
						result.data.forEach(function(item) {
							_this.$set(item, "checked", false);
							_this.$set(item, "collectTxt", true);
						})
					}
					if (result.data.length == 0 && this.page == 1) {
						this.noDataIsShow = true;
						this.hasData = false;
					}
					if (this.page === 1) {
						this.list = result.data;
					}
					if (this.page > 1) {
						this.list = this.list.concat(
							result.data
						);
					}
					if (result.data.length < this.pageSize) {
						this.isLoad = false;
						this.loadingType = 2;
					} else {
						this.isLoad = true;
						this.loadingType = 0
					}
					this.listLength = this.list.length;
				}
			},
			async DeleteCollections(ids) { //取消产品收藏
				let result = await post("User/DelCollections", {
					UserId: this.userId,
					Token: this.token,
					IdArr: ids,
					Type:0
				});
				if (result.code === 0) {
					let _this = this;
					uni.showToast({
						title: result.msg,
						icon: "none",
						duration: 1500
					});
					setTimeout(res=>{
						_this.collectionsList();
					 },1500)
				}
			}
			
		},
		onPullDownRefresh() { //下拉刷新
			//监听下拉刷新动作的执行方法，每次手动下拉刷新都会执行一次
			let _this = this;
			_this.initData();
			setTimeout(function() {
				_this.collectionsList();
				uni.stopPullDownRefresh(); //停止下拉刷新动画
			}, 1000);
		},
		onReachBottom() { //上拉加载
			if (this.isLoad) {
				this.loadingType = 1;
				this.page++;
				this.collectionsList();
			} else {
				this.loadingType = 2;
			}
		},
	}
</script>

<style scoped lang="scss">
	@import "../../../common/dd_style.css"; 

	.hasContentPage {
		position: relative;
		top:88upx;
		height: calc(100% - 88upx);
		overflow-y: auto;
	}

	.uni-tab-bar {
		height: 80upx;
		position: fixed;
		width:100%;
		z-index: 9;
		.tabList{
			width: 100%;
			height: 80upx;
		}
	}

	.li_50 .swiper-tab-list {
		width: 50%;
		margin: 0;
	}

	.li_33.w50 .swiper-tab-list {
		width: 50%;
	}

	.swiper-tab-list .s {
		display: inline-block;
		line-height: 80upx;
		height: 80upx;
		box-sizing: border-box;
	}

	.carthead {
		background-color: #ffffff;
		width: 750upx;
		padding: 0 20upx;
		display: flex;
		align-items: center;
		justify-content: center;
		height: 88upx;
		z-index: 8;
		position: fixed;
		top: 0;
		box-sizing: border-box;
	}

	.wxcarthead {
		background-color: #fff;
		width: 100%;
		padding: 0 20upx;
		display: flex;
		align-items: center;
		justify-content: flex-end;
		height: 88upx;
		z-index: 8;
		position: fixed;
		top: 0;
		/* left: 20upx; */
	}

	.carthead text:nth-child(1) {
		font-size: 32upx;
		font-weight: bold;
	}

	.collect_list {
		.list {
			.item {
				width: 100%;
				padding: 20upx;
				background: #ffffff;

				.item_shop {
					.shop_logo {
						width: 88upx;
						height: 88upx;
						margin-right: 10upx;
					}
				}

				.item_list {
					justify-content: space-between;

					.item_list_fill {
						.img {
							width: 220upx;
							height: 220upx;
							border: 1upx solid #f5f5f5;
							border-radius: 15upx;

							image {
								width: 191upx;
								height: 154upx;
							}
						}

					}
				}
			}

			.item_pro {
				padding: 20upx;
				background: #ffffff;
				border-bottom: 1upx solid #f5f5f5;
				.item__hd{
					display: flex;
					justify-content: flex-start;
					align-items: center;
				}
				image {
					width: 162upx;
					height: 162upx;
					margin-right: 20upx;
				}

				.line_thin {
					text-decoration: line-through;
					font-size: 22upx;
					color: #999;
					margin-left: 10upx;
				}

				.color_red {
					color: #f00000;
				}

				.flag {
					margin-left: 40upx;
					font-size: 20upx;
					height: 40upx;
					box-sizing: border-box;

					.flag_pill {
						background: #f00000;
						color: #ffffff;
						line-height: 40upx;
						padding: 0 15upx;
						height: 40upx;
						border-radius: 5upx 0 0 5upx;
					}

					.flag_mon {
						line-height: 40upx;
						padding: 0 10upx;
						height: 40upx;
						border: 1px solid red;
						border-radius: 0 5upx 5upx 0;
					}
				}
			}
		}
	}

	.dd_foot {
		height: 90upx;
		.foot-fixed {
			position: fixed;
			bottom: 0;
			left: 0;
			width: 100%;
			background: #fff;
			z-index: 10;
			border-top: 1px solid #eee;
			.lab{ margin-left: 20upx;}
			.btn {
				font-size: 32upx;
				height: 90upx;
				line-height: 90upx;
				text-align: center;
				color: #333;
			}
			.btn0{
				width: 40%;
				font-size: 32upx;
				height: 90upx;
				line-height: 90upx;
				text-align: center;
				color: #333;
			}
			.btn0.active {
				color: #fff;
				background: #ff3333;
			}

			.btn_100 {
				width: 100%;

			}

			.uni-icon {
				font-size: 60upx;
				color: #333;
			}
		}

	}
</style>
