<template>
	<view class="order">
		<view class="list pw3">
			<view class="order_item bg_fff mt2" v-for="(item,index) in list" :key="index" @click="goUrl('/pages/member/orderDetail/orderDetail?id='+item.OrderNo)">
				<view class="flex justifyContentBetween flexAlignCenter">
					<view>
						<image src="http://shop.dadanyipin.com/static/my/shop.png" class="logo"></image>
						<text class="uni-bold shop_name">{{item.ShopName}}</text>
						<text class="iconfont icon-arrow_r font18"></text>
					</view>
					<view class="color_red">{{item.OrderStatusName}}</view>
				</view>
				<view class="flex justifyContentBetween mt2">
					<image :src="item.ProductImg" class="img mr2"></image>
					<view class="flex1 order_info">
						<view>{{item.ProductName}}</view> 
						<view class="color_gray font18">{{item.ProductSkuName}}</view> 
						<view class="flex justifyContentBetween flexAlignCenter mt1">
							<text class="color_gray">x{{item.ProductCount}}</text>
							<text>¥{{item.UnitPrice}}</text>
						</view>
					</view>
				</view>
				<view class="text_right mt2">实付：¥<span class="font32 uni-bold">{{item.RefundMoney}}</span></view>
				<view class="btn flex justifyContentEnd" >
					<view class="btn_r"
					  @click.stop="goUrl('/pages/member/orderTuidetail/orderTuidetail?orderNo='+item.OrderNo+'&RefundId='+item.RefundId)"
					 	>售后详情
					</view>
					<view class="btn_c" v-if="item.OrderStatusId===5||item.OrderStatusId===6||item.OrderStatusId===16
						||item.OrderStatusId===9||item.OrderStatusId===10"
						@click.stop="cancel(item)">取消售后</view>
				</view>
			</view>
			<noData v-if="!list.length"></noData>
			<uni-load-more :loadingType="loadingType" v-else></uni-load-more>
		</view>
	</view>
</template>

<script>
	import {host,post,get,toLogin} from '@/common/util.js';
	import noData from '@/components/noData/noData.vue';
	import uniLoadMore from '@/components/uni-load-more.vue';

	export default {
		components: {
			noData,uniLoadMore
		},
		data(){
			return{
				page:1,
				pagesize:12,
				list:[],
				isnNoData:false,
				isOver:false,
				loadingType: 0, //0加载前，1加载中，2没有更多了
			}
		},
		onShow() {
			this.userId = uni.getStorageSync("userId");
			this.token = uni.getStorageSync("token");
			this.init();
			if (toLogin()) {
			    this.getList();
			}
		},
		methods:{
			init(){
				this.list = []
				this.page = 1
				this.isOver = false
				this.isnNoData = false
			},
			goUrl(url){
			  uni.navigateTo({
				url:url
			  })
			},
			getList(){
			  post('Order/RefundOrderList',{
				UserId:uni.getStorageSync("userId"),
				Token:uni.getStorageSync("token"),
				Page:this.page,
				PageSize:this.pagesize,
			  }).then(res=>{
				if(res.code===0){
					this.loadMore = 0;
					const data = res.data;
					if(this.page===1){
						this.schemeList =[];
					}
				  this.list.push(...res.data)
					if(data.length<this.pageSize){
						this.loadMore = 2;
					}
				//   if(res.count == 0){
				// 	this.isnNoData = true
				//   }
				//   if(res.count<=this.isOver){
				// 	this.isOver = true;console.log(this.isOver)
				//   }
				}
			  })
			},
			// 取消售后
			cancel(item){
				const that = this;
				uni.showModal({
					title:'取消售后',
					content:'是否取消当前售后！',
					cancelColor:'#999',
					confirmColor:'#ff6f00',
					success(res){
						if(res.confirm){
							post('Order/CanelRefund',{
								UserId: that.userId,
								Token: that.token,
								OrderNo: item.OrderNo,
								RefundId: item.RefundId,
							}).then(ret=>{
								if(ret.code===0){
									uni.showToast({
										title:'取消成功！'
									})
									setTimeout(()=>{
										that.init();
										that.getList();
										// uni.redirectTo({
										// 	url:'/pages/member/order/order'
										// })
									},1500)
								}
							})
						}
					}
				})
			}
		},
		// 上拉加载
		onReachBottom: function() {
			if (this.loadMore !== 2) {
				this.page++;
				this.getList();
			}
		},
		onPullDownRefresh() {
			//监听下拉刷新动作的执行方法，每次手动下拉刷新都会执行一次
				this.page=1;
				this.loadMore = 0;
			setTimeout(()=> {
				this.init();
				this.getList();
				uni.stopPullDownRefresh();  //停止下拉刷新动画
			}, 1000);
		}
	}
	
</script>

<style lang="scss" scoped>
	.order_item{
		padding:20upx;border-radius:15upx;
		.shop_name{
			margin:0 10upx;
		}
		.logo{
			width:32upx;height:28upx;
		}
		.img{
			width:162upx;height:162upx;
		}
		.order_info{
			padding: 10upx 0;
		}
		.btn{
			padding:10upx 0;
			view{
				width:145upx;height:60upx;line-height: 60upx;font-size:24upx;
				text-align: center;
				border-radius:10upx;
				margin-right:20upx;
				&:last-child{margin-right: 0;}
			}
			.btn_g{
				border:1upx solid #999999;
			}
			.btn_r{
				background: #ff6f00;color:#ffffff;
			}
			.btn_c{
				background: #ccc;color:#ffffff;
			}
			
		}
	}
</style>
