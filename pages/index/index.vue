<template>
	<view class="home">
		<div class="search flex-center mlr20">
			<img src="@/static/icons/search-icon.png" alt="">
			<p>请输入要搜索的商品</p>
		</div>
		<div class="nav flex-center-between">
			<scroll-view scroll-x="true" class="scroll-nav">
				<div class="left flex-center">
						<div class="item" :class="{'active':index==navindex}" 
							v-for="(item,index) in nav" :key="index"
							@click="onNavIndex(index)"
							>{{item}}
						</div>
						<!-- 滑动的下标 -->
						<div class="active-border" :style="'left:'+navWidth[navindex]"></div>
				</div>
			</scroll-view>
			<div class="right flex-center">
				<img src="@/static/icons/classify-icon.png" alt="">
				分类
			</div>
		</div>
		<div class="banner">
			<swiper indicator-dots autoplay>
				<swiper-item  v-for="(item,index) in 3" :key="index">
					<img src="@/static/home/banner.png" alt="">
				</swiper-item>
			</swiper>
		</div>
		<div class="share mlr30">
			<div class="title flex-center-between">
				<h1>施肥方案分享</h1>
				<div class="more flex-center">
					更多
					<img src="@/static/icons/arrow.png" alt="">
				</div>
			</div>
			<div class="list flex-center-between">
				<div class="item" v-for="(item,index) in 4" :key="index">
					<img src="@/static/home/share-list1.png" alt="">
					<div class="content flex-end">
						<p class="ellipsis">促根促长解决方案促根促长解决方案</p>
					</div>
				</div>
			</div>
		</div>
		<div class="gap20"></div>
		
		<div class="video mlr30">
			<div class="title flex-center-between">
				<h1>施肥方案分享</h1>
				<div class="more flex-center">
					更多
					<img src="@/static/icons/arrow.png" alt="">
				</div>
			</div>
			<div class="list flex-center-between">
				<div class="item" v-for="(item,index) in 2" :key="index">
					<div class="imgBox">
						<img src="@/static/home/share-list1.png" alt="">
						<div class="content flex-center-center">
							<div class="video-mask flex-center-center">
								<img src="@/static/icons/video-arrow.png" alt="">
							</div>
						</div>
					</div>
					<div class="text ellipsis">
						叶面肥冲施肥果树通用型肥冲施肥果树通用型
					</div>
				</div>
			</div>
		</div>
		<div class="gap20"></div>
		
		<div class="sort">
			<div class="sort-nav flex-center-between">
				<div class="item flex-center">
					<p>全部</p>
					<!-- <span class="flex-column-center-center">
						<img src="@/static/icons/arrow-top.png" alt="">
						<img src="@/static/icons/arrow-top.png" alt="">
					</span> -->
				</div>
				<div class="item flex-center">
					<p>销量</p>
					<span class="flex-column-center-center">
						<img src="@/static/icons/arrow-top.png" alt="">
						<img src="@/static/icons/arrow-top.png" alt="">
					</span>
				</div>
				<div class="item flex-center">
					<p>价格</p>
					<span class="flex-column-center-center">
						<img src="@/static/icons/arrow-top.png" alt="">
						<img src="@/static/icons/arrow-top.png" alt="">
					</span>
				</div>
			</div>
			<div class="list flex-center-between">
				<div class="item" :class="{'border-r':index%2==0}" v-for="(item,index) in 10" :key="index">
					<img src="@/static/home/list1.png" alt="">
					<div class="content">
						<div class="tit ellipsis">优根腐植酸肥料植物优根腐植酸肥料植物</div>
						<div class="price flex-end">
							<div class="main-price flex-end"><span>¥</span>298.00</div>
							<div class="o-price">¥398.00</div>
						</div>
						<div class="num">已售235件</div>
					</div>
				</div>
			</div>
		</div>
	</view>
</template>

<script>
import {post} from '@/utils';
	export default {
		data() {
			return {
				nav:[],
				navWidth:[],
				navindex:0,

				interval:null,
			}
		},
		onLoad() {
			this.getData();
			setTimeout(()=>{
				this.nav=['改良土壤','土壤','改良土','改良土壤','改壤','改良土','改良土壤','改壤']
				this.$nextTick(()=>{
					this.getScrollWidth();
				})
			},2000)
		},
		methods: {
			getData(){
				
			},
			// 获取导航的宽
			getScrollWidth(){
				const that =this;
				const obj=wx.createSelectorQuery();
				obj.selectAll('.nav .item').boundingClientRect();
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
			onNavIndex(index){
				this.navindex = index
			}
		}
	}
</script>

<style lang="scss" scoped>
	.search{
		background:#f4f4f4;
		color:#ccc;
		border-radius:40upx;
		margin:5upx 30upx;
		padding:0 30upx;
		height:65upx;
		img{
			width:26upx;
			height:26upx;
			margin-right:8upx;
		}
	}
	.nav{
		// padding:20upx 0 30upx;
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
			.item{
				width:335upx;height:168upx;
				border-radius:10upx;
				overflow:hidden;
				position:relative;
				margin-bottom:20upx;
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
				}
			}
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
			height:85upx;
			line-height:85upx;
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
			}
		}
		.list{
			flex-flow:row wrap;
			.item{
				width:50%;
				border-top:1upx solid #e8e8e8;
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
							color:#ff3333;
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
</style>
