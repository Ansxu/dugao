<template>
	<view class="home">
		<div class="search flex-center mlr20">
			<img src="@/static/icons/search-icon.png" alt="">
			<p>请输入要搜索的商品</p>
		</div>
		<div class="nav-home flex-center-between">
			<scroll-view scroll-x="true" class="scroll-nav">
				<div class="left flex-center">
						<div class="item" :class="{'active':index==navindex}" 
							v-for="(item,index) in nav" :key="index"
							@click="onNavIndex(index)"
							>{{item.Name}}
						</div>
						<!-- 滑动的下标 -->
						<div class="active-border" :style="'left:'+navWidth[navindex]"></div>
				</div>
			</scroll-view>
			<div class="right flex-center" @click="navigate('product/classify/classify')">
				<img src="@/static/icons/classify-icon.png" alt="">
				分类
			</div>
		</div>
		<div class="banner">
			<swiper indicator-dots autoplay>
				<swiper-item  v-for="(item,index) in banner" :key="index">
					<img :src="item.Pic" alt="">
				</swiper-item>
			</swiper>
		</div>
		<div class="share mlr30">
			<div class="title flex-center-between">
				<h1>{{schemeTitle}}</h1>
				<div class="more flex-center" @click="navigate('scheme/fertilizer')">
					更多
					<img src="@/static/icons/arrow.png" alt="">
				</div>
			</div>
			<div class="list flex-center-between">
				<block  v-for="(item,index) in schemeList" :key="index">
					<fertilizer-item :item='item'></fertilizer-item>
				</block>
			</div>
		</div>
		<div class="gap20"></div>
		
		<div class="video mlr30">
			<div class="title flex-center-between">
				<h1>施肥视频分享</h1>
				<div class="more flex-center" @click="navigate('scheme/videozone')">
					更多
					<img src="@/static/icons/arrow.png" alt="">
				</div>
			</div>
			<div class="list flex-center-between">
				<div class="item" v-for="(item,index) in videoList" :key="index">
					<div class="imgBox">
						<img :src="item.Logo" alt="">
						<div class="content flex-center-center">
							<div class="video-mask flex-center-center">
								<img src="@/static/icons/video-arrow.png" alt="">
							</div>
						</div>
					</div>
					<div class="text ellipsis">{{item.Title}}</div>
				</div>
			</div>
		</div>
		<div class="gap20"></div>
		
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
							<div class="main-price flex-end"><span>¥</span>{{item.MarketPrice}}</div>
							<div class="o-price">¥{{item.Price}}</div>
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
				nav:[],
				navWidth:[],
				navindex:0,//分类下标
				banner:[],
				//方案
				schemeTitle:'',
				schemeList:[],
				// 视频
				videoTitle:'',
				videoList:[],

				page:1,
				pageSize:12,
				sortType:0,//排序类型0-默认1-人气2-价格
				sortMode:0,//排序方式 0-升序（从小到大） 1-降序（从大到小）
				list:[],
				loadMore:0,//0-loading前；1-loading中；2-没有更多了

			}
		},
		onLoad() {
			// this.getData();
			this.getBanner();
			this.getClassify();
			this.getScheme();//方案
			this.getVideo();//视频
		},
		methods: {
			getBanner(){
				post('Banner/BannerList',{Cid:1}).then(res=>{
					this.banner = res.data;
				})
			},
			//方案
			getScheme(){
				post('Find/FindList',{
					Page:1,
					PageSize:4,
					MyType:3,
					ClassId:16
				}).then(res=>{
					this.schemeList = res.data;
					this.schemeTitle =  res.data[0].ClassName;
				})
			},
			// 视频
			getVideo(){
				post('News/BrandgoodsList',{
					Page:1,
					PageSize:4,
				}).then(res=>{
					this.videoList = res.data;
					this.videoTitle =  res.data[0].ClassName;
				})
			},
			
			// *********分类********************
			getClassify(){
				post('Goods/TypeList').then(res=>{
					this.nav=[{Name:'全部',Id:0}]
					this.nav.push(...res.data);
					this.getPro();
					this.$nextTick(()=>{
						this.getScrollWidth();
					})
				})
			},
			// 获取导航的宽
			getScrollWidth(){
				const that =this;
				const obj=wx.createSelectorQuery();
				obj.selectAll('.nav-home .item').boundingClientRect();
				obj.exec(function (rect) {
					let leftW=0;//左边所有元素的宽度相加
					rect[0].map(item=>{
		    			//其中25为margin-left:25upx;30为下标宽度
						let val = leftW+(((item.width-uni.upx2px(32))/2)+uni.upx2px(25));
						that.navWidth.push(val + 'px');
						leftW +=(item.width+uni.upx2px(25));
					})

				}) ;
			},
			// 点击分类时
			onNavIndex(index){
				console.log(index,this.navWidth)
				this.navindex = index;
				this.page =1;
				this.sortType=0;
				this.sortMode=0;
				this.getPro();
				this.query('#sort');
			},
			// *********分类end********************
			getPro(){
				this.loadMore = 1;
				post('Goods/GoodsList',{
					TypeId:this.nav[this.navindex].Id,
					Page:this.page,
					PageSize:this.pageSize,
					sort:this.sortType,
					Order:this.sortMode
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
				this.getPro();
			},
			query(toViewid){
				const query=wx.createSelectorQuery();  //创建节点查询器
				query.select(toViewid).boundingClientRect()  //选择toViewid获取位置信息
				query.selectViewport().scrollOffset()  //获取页面查询位置的
				query.exec(function(res) {
					console.log(res)
					wx.pageScrollTo({
					scrollTop: res[0].top+res[1].scrollTop-80,
					duration: 300
					})
				})
			}
		},
		// 上拉加载
		onReachBottom: function() {
			if (this.loadMore !== 2) {
				this.page++;
				this.getPro();
			}
		}
	}
</script>

<style lang="scss" scoped>
	.home,page{
		background:#fff;
	}
	.search{
		background:#f4f4f4;
		color:#ccc;
		border-radius:40upx;
		margin:0 30upx 5upx;
		padding:0 30upx;
		height:65upx;
		img{
			width:26upx;
			height:26upx;
			margin-right:8upx;
		}
	}
	.nav-home{
		// padding:20upx 0 30upx;
		position:sticky;
		top:0;
		left:0;
		width:100%;
		background:#fff;
		z-index:99;
		.scroll-nav{
			width:83%;
			height:90upx;
			line-height:90upx;
		}
		.left{
			font-size:32upx;
			position:relative;
			.item{
				margin-left:25upx;
				padding-right:5upx;
				line-height:90upx;
				flex:0 0 auto;
				&.active{
					color:$primary;
				}
			}
			.active-border{
				position:absolute;
				bottom:10upx;
				width:30upx;
				height:4upx;
				background:$primary;
				left:0;
				transition:.2s;
			}
		}
		.right{
			height:40upx;
			// width:2upx;
			border-left:5upx solid #f3f3f3;
			padding:14upx;
			img{
				margin-right:10upx;
				width:29upx;height:23upx;
			}
		}
	}
	.banner{
		height:300upx;
		img{
			width:100%;
			height:100%;
		}
	}
	.title{
		line-height:90upx;
		height:90upx;
		.more{
			font-size:26upx;
			color:#999;
			img{
				width:13upx;height:21upx;
				margin-left:12upx;
			}
		}
	}
	.share{
		.list{
			flex-flow:row wrap;
			padding-bottom:10upx;
		}
	}
	.video{
		.list{
			flex-flow:row wrap;
			padding-bottom:10upx;
			.item{
				width:335upx;
				.imgBox{
					height:220upx;
					border-radius:10upx;
					overflow:hidden;
					position:relative;
					img{
						width:100%;
						height:100%;
					}
					.content{
						position:absolute;
						left:0;top:0;
						width:100%;height:100%;
						background:rgba(0,0,0,.3);
						color:$white;
						line-height:1.2;
						padding:20upx;
						.video-mask{
							background:rgba(0,0,0,.4);
							width:80upx;height:80upx;
							border-radius:50%;
							img{
								height:28upx;width:22upx;
							}
						}
					}
				}
				.text{
					line-height:88upx;
				}
			}
		}
	}
	.sort{
		.sort-nav{
			padding:0 80upx;
			height:80upx;
			line-height:80upx;
			position:sticky;
			top:90upx;
			left:0;
			width:100%;
			background:#fff;
			border-top:1upx solid #f5f5f5;
			border-bottom:1upx solid #f5f5f5;
			.avtive{
				color:$primary;
			}
			.item{
				p{
					// margin-right:;
				}
				span{
					img{
						width:14upx;height:8upx;
						margin:3upx 12upx;
						&:last-child{
							transform:rotate(180deg);
						}
					}
				}
				.arrow{
					margin-left:5upx;
					.arrow-top{
						border-right:10upx solid #fff;
						border-bottom:10upx solid #999;
						border-left:10upx solid #fff;
						margin-bottom:3upx;
					}
					.arrow-bottom{
						margin-top:3upx;
						border-right:10upx solid #fff;
						border-top:10upx solid #999;
						border-left:10upx solid #fff;
					}
					.active-arrow{
						border-top-color:$primary;
						border-bottom-color:$primary;
					}
				}
			}
		}
		.list{
			flex-flow:row wrap;
			.item{
				width:50%;
				border-bottom:1upx solid #e8e8e8;
				padding-bottom:30upx;
				&.border-r{
					border-right:1upx solid #e8e8e8;
				}
				img{
					width:100%;
					height:347upx;
				}
				.content{
					padding:0 20upx;
					.tit{
						line-height:51upx;
					}
					.price{
						height:51upx;
						.main-price{
							color:#ff6f00;
							font-size:36upx;
							span{
								font-size:20upx;
								line-height:1.8;
							}
						}
						.o-price{
							font-size:22upx;
							margin-left:10upx;
							line-height:1.8;
							color:#999;
							text-decoration:line-through;
						}
					}
					.num{
						line-height:44upx;
						font-size:22upx;
						color:#999;
					}
				}
			}
		}
	}
	.flex-ends{
		display: -webkit-box;
		display: -ms-flexbox;
		display: -webkit-flex;
		display:flex;
		-webkit-box-align: end;
		-ms-flex-align: end;
		-webkit-align-items: flex-end;
		align-items:flex-end;
	}
</style>
