<template>
	<!-- 施肥方案 -->
	<view class="bgfff">
		<view class="ploe"></view>
		<view class="fer-padd flex-center-between">
			<block  v-for="(item,index) in schemeList" :key="index">
				<fertilizer-item :item='item'></fertilizer-item>
			</block>
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
			schemeList:[],
			loadMore:0,//0-loading前；1-loading中；2-没有更多了
		}
	},
	onLoad(){
		this.getScheme();//方案
	},
	methods:{
		//方案
		getScheme(){
			post('Find/FindList',{
				Page:this.page,
				PageSize:this.pageSize,
				ClassId:16
			}).then(res=>{
					this.loadMore = 0;
					const data = res.data;
					if(this.page===1){
						this.schemeList =[];
					}
					this.schemeList.push(...data);
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
			this.getScheme();
		}
	},
	onPullDownRefresh() {
		//监听下拉刷新动作的执行方法，每次手动下拉刷新都会执行一次
			this.page=1;
			this.loadMore = 0;
		setTimeout(()=> {
			this.getScheme();
			uni.stopPullDownRefresh();  //停止下拉刷新动画
		}, 1000);
	}
}
</script>

<style scoped>
	.ploe{
		height: 20upx;
		background: #f5f5f5;
	}
	.fer-padd{
		padding:30upx;
		flex-flow:row wrap;
	}
	.fer-top{
		padding-top: 20upx;
		display: flex;
	}
	.fer-pos{
		position: relative;
	}
	.fer-img{
		width:335upx;
		height:168upx;
		border-radius:15upx;
	}
	image{
		width: 100%;
		height: 100%;
	}
	.padd{
		margin-right: 22upx;
	}
	.fer-modal{
		width:335upx;
		height:168upx;
		border-radius:15upx;
		background-color:rgba(0,0,0,0.5);
		position: absolute;
		top: 0;
		z-index: 1;
	}
	.fer-fz28{
		font-size:28upx;
		color:rgba(255,255,255,1);
		position: absolute;
		bottom: 10%;
		left: 15%;
	}
</style>
