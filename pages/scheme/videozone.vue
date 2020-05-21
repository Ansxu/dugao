<template>
	<!-- 视频专区 -->
	<view class="videozone bgfff">
		<view class="ploe"></view>
		<view class="video-padd">
			<view class="video-top" v-for="(item,index) in list" :key="index" @click="navigate('scheme/videodetails',{id:item.Id})">
				<view class="video-img">
					<view class="video-img bgf5">
						<img :src="item.Logo" mode=""/>
					</view>
					<view class="video-imgs">
						<img src="@/static/icons/video-arrow.png" mode=""/>
					</view>
				</view>
				<view class="video-topic flex-column-start-between">
					<view class="video-fz30 ellipsis-col2">{{item.Title}}</view>
					<view class="video-flex">
						<view class="">{{item.Hits}}人浏览</view>
						<view class="">{{item.AddTime}}</view>
					</view>
				</view>
			</view>
		</view>
		<noData v-if="schemeList.length<1"></noData>
		<uni-load-more :loadingType="loadMore" v-else></uni-load-more>
	</view>
</template>

<script>
import {post,navigate} from '@/utils'
import noData from '@/components/noData/noData.vue';
import fertilizerItem from '@/pages/scheme/fertilizerItem.vue';
export default {
		components:{noData,fertilizerItem},
	data(){
		return {
			navigate,
			page:1,
			pageSize:12,
			list:[],
			loadMore:0,//0-loading前；1-loading中；2-没有更多了
		}
	},
	onLoad(){
		this.getList();//方案
	},
	methods:{
		//方案
		getList(){
			post('News/BrandgoodsList',{
				Page:this.page,
				PageSize:this.pageSize,
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
			this.getList();
			uni.stopPullDownRefresh();  //停止下拉刷新动画
		}, 1000);
	}
}
</script>


<style lang="css" scoped>
	.bgf5{
		background:#f5f5f5;
	}
	.ploe{
		height: 20upx;
		background: #f5f5f5;
	}
	.video-padd{
		padding: 0 30upx;
	}
	.video-top{
		padding-top: 30upx;
		display: flex;
	}
	.video-img{
		width:268upx;
		height:176upx;
	}
	.video-img img{
		width: 100%;
		height: 100%;
	}
	.video-imgs{
		width:64upx;
		height:64upx;
		background-color:rgba(0,0,0,0.5);
		border-radius:50%;
		margin: -45% auto;
		position: relative;
		z-index: 1;
	}
	.video-imgs img{
		width:18upx;
		height:22upx;
		margin: 0 auto;
		position: absolute;
		top: 33%;
		left: 42%;
	}
	.video-topic{
		padding-left: 30upx;
	}
	.video-fz30{
		font-size:30upx;
		font-weight:bold;
		color:rgba(51,51,51,1);
		line-height:45upx;
	}
	.video-flex{
		line-height:1.8;
		display: flex;
		font-size:22upx;
		color:rgba(153,153,153,1);
	}
</style>
