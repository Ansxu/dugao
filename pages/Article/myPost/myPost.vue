<template>
	<view class="commentPage">
		<view class="list uni-bg-white" v-if="hasData">
			<block v-for="(item,index) in medialist" :key="index">
				<media-list :datajson="item" Grid="3" :isBtn="false" @click="goDetail" @previewImg="previewImg"></media-list>
			</block>
		</view>
		<view class="uni-tab-bar-loading" v-if="hasData">
			<uni-load-more :loadingType="loadingType"></uni-load-more>
		</view>
		<noData :isShow="noDataIsShow"></noData>
		<!-- 发布按钮 -->
		<view v-if="mytype==0" @click="fubuBtn" class="fubuBtn iconfont icon-bianji1"></view>
	</view>
</template>

<script>
	import {host,post,get,dateUtils,toLogin} from '@/common/util.js';
	import mediaList from '@/components/tab-nvue/mediaList.vue';
	import noData from '@/components/noData.vue'; //暂无数据
	import uniLoadMore from '@/components/uni-load-more.vue';
	export default {
		components: {
			mediaList,
			noData,
			uniLoadMore
		},
		data() {
			return {
				userId: "",
				token: "",
				hasSetText:"我的发布",
				loadingType: 0, //0加载前，1加载中，2没有更多了
				isLoad: false,
				hasData: false,
				noDataIsShow: false,
				page: 1,
				pageSize: 6,
				allPage: 0,
				count: 0,
				mytype:0,//0我的,1TA的
				Memberid:"",
				medialist:{}
			}
		},
		onLoad: function(e) {
			this.userId = uni.getStorageSync("userId");
			this.token = uni.getStorageSync("token");
			if(e.myType){
				this.mytype=e.myType;
			}
			this.Memberid=e.Memberid;
			this.SetText();
			this.FindList();
		},
		methods: {
			SetText(){
				if(this.mytype==1){
					this.hasSetText="TA的发布";
					
				}else{
					this.hasSetText="我的发布";
				}
				uni.setNavigationBarTitle({
					title: this.hasSetText
				})
			},
			/*获取发现列表*/
			async FindList() {
				let result = await post("Find/FindList", {
					"UserId": this.userId,
					"Token": this.token,
					"page": this.page,
					"pageSize": this.pageSize,
					"myType": this.mytype,
					"MemberId": this.Memberid,
					"SearchKey": ""
				});
				if (result.code === 0) {
					if (result.data.length > 0) {
						this.hasData = true;
						result.data.forEach(function(item) {
							item.Addtime=dateUtils.format(item.Addtime);
							item.imgArr = item.ImgList.split(',');
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
						this.medialist = result.data;
					}
					if (this.page > 1) {
						this.medialist = this.medialist.concat(
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
				} else if (result.code === 2) {
					let _this =this;
					uni.showModal({
						content: "您还没有登录，是否重新登录？",
						success(res) {
							if (res.confirm) {
								uni.navigateTo({
								  url: "/pages/login/login"
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
			previewImg(obj){
				uni.previewImage({
					current:obj.imgurls[obj.index],
					urls: obj.imgurls,
					indicator:obj.imgurls.length
				});
			},
			//链接详情页
			goDetail(e) {
				uni.navigateTo({
					url: '/pages/Article/artDetail/artDetail?id='+e.id
				})
			},
			//去发布
			fubuBtn(){
				uni.navigateTo({
					url: '/pages/Article/artPost/artPost'
				})
			}
		},
		onReachBottom: function() {
			if (this.isLoad) {
				this.loadingType = 1;
				this.page++;
				this.FindList();
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
				_this.FindList();
				uni.stopPullDownRefresh();  //停止下拉刷新动画
			}, 1000);
		}
	}
</script>

<style scoped>
.commentPage{ min-height: 100%; padding: 0; margin: 0 auto;}
.fubuBtn{
	position: fixed;
	right: 20upx;
	bottom: 20upx;
    width: 80upx;
    height: 80upx;
	text-align: center;
	line-height: 80upx;
	color: #fff;
	background: #89674C;
	border-radius: 50%;
	box-shadow: 0 0 5px 2px rgba(0, 0, 0, 0.2);
    z-index: 11;
}
</style>
