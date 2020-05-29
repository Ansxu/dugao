<template>
	<view class="uni-bg-white">
		<div class="searchBox flex-center-between">
			<div class="search flex-center">
				<uni-icons type="search" size="18" color="#666666"></uni-icons>
				<input type="text" placeholder="输入要搜索的商品" v-model="searchText">
			</div>
			<div class="searchBtn" @click="searchBtn">搜索</div>
		</div>
		<div class="sort">
			<div class="sort-nav flex-center-between">
				<div class="item flex-center" :class="{'avtive':sortType===0}" @click="clickSort(0)">
					<p>默认</p>
					<!-- <span class="flex-column-center-center">
						<img src="@/static/icons/arrow-top.png" alt="">
						<img src="@/static/icons/arrow-top.png" alt="">
					</span> -->
				</div>
				<div class="item flex-center" :class="{'avtive':sortType===1}" @click="clickSort(1)">
					<p>销量</p>
					<div class="flex-column-center-center arrow">
						<span class="arrow-top" :class="{'active-arrow':sortType===1&&sortMode===0}"></span>
						<span class="arrow-bottom" :class="{'active-arrow':sortType===1&&sortMode===1}"></span>
						<!-- <img src="@/static/icons/arrow-top.png" alt="">
						<img src="@/static/icons/arrow-top.png" alt=""> -->
					</div>
				</div>
				<div class="item flex-center" :class="{'avtive':sortType===2}" @click="clickSort(2)">
					<p>价格</p>
					<div class="flex-column-center-center arrow">
						<!-- <img src="@/static/icons/arrow-top.png" alt="">
						<img src="@/static/icons/arrow-top.png" alt=""> -->
						<span class="arrow-top" :class="{'active-arrow':sortType===2&&sortMode===0}"></span>
						<span class="arrow-bottom" :class="{'active-arrow':sortType===2&&sortMode===1}"></span>
					</div>
				</div>
			</div>
			<div class="list flex-center-between" id="sort">
				<div class="item" :class="{'border-r':index%2==0}" 
					v-for="(item,index) in list" :key="index"
					@click="navigate('product/productDetail/productDetail',{id:item.Id})"
					>
					<img :src="item.PicNo" alt="">
					<div class="content">
						<div class="tit ellipsis">{{item.Name}}</div>
						<div class="price flex-ends">
							<div class="main-price flex-end"><span>¥</span>{{item.Price}}</div>
							<div class="o-price">¥{{item.MarketPrice}}</div>
						</div>
						<div class="num">已售{{item.SalesVolume}}件</div>
					</div>
				</div>
			</div>
			<noData v-if="list.length<1"></noData>
			<uni-load-more :loadingType="loadMore" v-else></uni-load-more>
		</div>
	</view>
</template>

<script>
import {post,navigate} from '@/utils';
import noData from '@/components/noData/noData.vue';
import fertilizerItem from '@/pages/scheme/fertilizerItem.vue';
	export default {
		components:{noData,fertilizerItem},
		data() {
			return {
				navigate,
				page:1,
				pageSize:12,
				sortType:0,//排序类型0-默认1-人气2-价格
				sortMode:0,//排序方式 0-升序（从小到大） 1-降序（从大到小）
				list:[],
				loadMore:0,//0-loading前；1-loading中；2-没有更多了
				searchText:'',
			};
		},
		onLoad(){
			this.init();
		},
		methods: {
			init(){
				this.page=1;
				this.sortType=0;
				this.sortMode=0;
				this.loadMore=0;
				this.searchText = '';
				this.getData();
			},
			getData(){
				this.loadMore = 1;
				post('Goods/GoodsList',{
					TypeId:0,
					Page:this.page,
					PageSize:this.pageSize,
					sort:this.sortType,
					Order:this.sortMode,
					Keywords:this.searchText
				}).then(res=>{
					this.loadMore = 0;
					const data = res.data;
					if(this.page===1){
						this.list =[];
					}
					this.list.push(...data);
					if(data.length<this.pageSize){
						this.loadMore = 2;
					}
				})
			},
			// 点击筛选
			clickSort(sortType){
				if(this.sortType === sortType){
					this.sortMode = this.sortMode?0:1;
				}else{
					this.sortMode = 0;
				}
				this.sortType = sortType;
				this.getData();
			},
			// 搜索
			searchBtn(){
				this.page=1;
				this.sortType=0;
				this.sortMode=0;
				this.loadMore=0;
				this.getData();
			}
		},
		onPullDownRefresh(){
			this.userId = uni.getStorageSync("userId");
			this.token = uni.getStorageSync("token");
			this.init();
			uni.stopPullDownRefresh();
		},
		// 上拉加载
		onReachBottom: function() {
			if (this.loadMore !== 2) {
				this.page++;
				this.getData();
			}
		}
	}
</script>

<style scoped lang="scss">
	@import "./style.scss";
</style>
