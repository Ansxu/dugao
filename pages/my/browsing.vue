<template>
	<!-- 浏览记录 -->
	<view class="browsing">
		<view class="nav" :style="{'padding-top':barHeight+'px'}">
			<!-- #ifndef MP-WEIXIN -->
			<view class="" @click="toback()"><image class="back" src="http://ddyp.wtvxin.com/static/hpicons/back.svg" mode=""></image></view>
			<view class="mine">我的足迹</view>
			<!-- #endif -->
			<!-- #ifdef MP-WEIXIN -->
			<view></view>
			<view></view>
			<!-- #endif --> 
			<view class="redact" v-if="isShowDel" @click="ShowDel">完成</view>
			<view class="redact" v-else @click="ShowDel">编辑</view>
		</view> 
		
		<view :style="{'height':barHeight+44+'px'}"></view>
		<view class="bb_pt">
<!-- 			<view class="minbox">
				<view class="min">今天</view>
				<view class="arrowss"><image class="arrows" src="http://ddyp.wtvxin.com/static/hpicons/arrows2.svg" mode=""></image></view>
			</view> -->
			<view class="listbox" v-for="(val, key) in footprintlist" :key="key">
				<view class="choose" v-if="isShowDel" @click.stop="shiftChecked(key)"><view class="IconsCK IconsCK-radio" :class="{ checked: val.checked }"></view></view>
				<view class="drawing">
					<view class=""><image class="imgs" :src="val.PicFrist" mode=""></image></view>
					<view class="brace">
						<view class="being">{{ val.ProName }}</view>
						<view class="correct">
							<span class="spanl">¥</span>
							{{ val.Price }}
							<span class="spanr" v-show="false">¥1888</span>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="lect" v-if="isShowDel">
			<view class="lects" @click="cancelDel()"><view class="IconsCK IconsCK-radio" :class="{ checked }"></view></view>
			<view class="cancel">
				<view class="cover">全选</view>
				<view class="covers" @click="btnDel">删除</view>
			</view>
		</view>
		<noData :isShow="noDataIsShow"></noData>
		<view class="uni-tab-bar-loading"><uni-load-more :loadingType="loadingType" v-if="noDataIsShow == false"></uni-load-more></view>
	</view>
</template>

<script>
import { post, get } from '@/common/util.js';
import uniLoadMore from '@/components/uni-load-more.vue'; //加载更多
import noData from '@/components/noData.vue'; //暂无数据
export default {
	data() {
		return {
			barHeight:0,
			isShowDel: false, //编辑完成
			userId: '',
			token: '',
			page: 1,
			pageSize: 10,
			loadingType: 0, //0加载前，1加载中，2没有更多了
			footprintlist: {}, //列表
			count: 0,
			noDataIsShow: false, //暂无数据
			allPage: 0,
			datalength: 0,
			Ids: [], //保存要删除数据
			checked: false
		};
	},
	components: {
		uniLoadMore,
		noData
	},
	onLoad() {
		// #ifdef APP-PLUS
		var height = plus.navigator.getStatusbarHeight();
		this.barHeight = height;
		// #endif
		// #ifdef H5
		this.barHeight = 0;
		// #endif
		this.userId = uni.getStorageSync('userId');
		this.token = uni.getStorageSync('token');
		console.log(this.userId, 'this.userId');
		console.log(this.token, 'this.token');
		this.FootprintList();
	},
	methods: {
		toback() {
			uni.switchTab({
				url: '/pages/tabBar/my/my'
			});
		},
		//点击编辑 完成
		ShowDel() {
			this.isShowDel = !this.isShowDel;
		},
		// 全选
		cancelDel() {
			this.checked = !this.checked;
			if (this.checked) {
				this.footprintlist.forEach(function(item) {
					item.checked = true;
				});
			} else {
				this.footprintlist.forEach(function(item) {
					item.checked = false;
				});
			}
		},
		//选择
		shiftChecked(key) {
			console.log(key, 'key');
			this.footprintlist[key].checked = !this.footprintlist[key].checked;
			let _this = this;
			let sum = 0;
			_this.footprintlist.forEach(function(item) {
				if (item.checked !== _this.checked) {
					sum += 1;
				}
			});
			if (sum == this.footprintlist.length) {
				_this.checked = this.footprintlist[0].checked;
			} else {
				_this.checked = false;
			}
		},
		/*获取足迹列表*/
		async FootprintList() {
			let result = await post('User/MemberFootprintList', {
				UserId: this.userId,
				Token: this.token,
				page: this.page,
				pageSize: this.pageSize
			});
			if (result.code === 0) {
				let _this = this;
				if (result.data.length > 0) {
					result.data.forEach(function(item) {
						_this.$set(item, 'txt', '');
						_this.$set(item, 'checked', false);
					});
				}
				this.count = result.count;
				if (result.data.length > 0) {
					this.noDataIsShow = false;
				}
				if (result.data.length == 0 && this.page == 1) {
					this.noDataIsShow = true;
				}
				if (this.page === 1) {
					this.footprintlist = result.data;
				}
				if (this.page > 1) {
					this.footprintlist = this.footprintlist.concat(result.data);
				}
				if (result.data.length < this.pageSize) {
					this.isLoad = false;
					this.loadingType = 2;
				} else {
					this.isLoad = true;
					this.loadingType = 0;
				}
				this.datalength = this.footprintlist.length;
			}
		},
		// 删除
		btnDel() {
			let _this = this;
			this.footprintlist.forEach(function(item) {
				if (item.checked == true) {
					_this.Ids.push(item.Id);
				}
				console.log(_this.Ids, '_this.Ids');
			});
			if (this.Ids.length > 0) {
				this.DeleteMyFootprint();
			} else {
				uni.showToast({
					title: '请选择需要删除的项！',
					icon: 'none',
					duration: 1500
				});
			}
		},
		async DeleteMyFootprint() {
			let result = await post('User/DeleteMyFootprint', {
				UserId: this.userId,
				Token: this.token,
				Id: this.Ids.join(',')
			});
			if (result.code === 0) {
				let _this = this;
				for (let j = 0; j < _this.Ids.length; j++) {
					for (let i = 0; i < _this.datalength; i++) {
						if (_this.footprintlist[i]) {
							if (_this.Ids[j] == _this.footprintlist[i].Id) {
								_this.footprintlist.splice(i, 1);
							}
						}
					}
				}
				_this.datalength = _this.footprintlist.length;
				_this.Ids = [];
				uni.showToast({
					title: result.msg,
					icon: 'none',
					duration: 2000
				});
			} else {
				uni.showToast({
					title: result.msg,
					icon: 'none',
					duration: 2000
				});
			}
		},
		// 上拉加载
		onReachBottom: function() {
			if (this.isLoad) {
				this.loadingType = 1;
				this.page++;
				this.FootprintList();
			} else {
				this.loadingType = 2;
			}
		}
	}
};
</script>

<style scoped>	
.browsing {
	background: #ffffff;
}
.nav {
	height: 88upx;
	width: 710upx;
	padding: 0 20upx;
	display: flex;
	justify-content: space-between;
	align-items: center;
	position: fixed;
	top: 0;
	z-index: 12;
	box-sizing: content-box;
	background: #ffffff!important;
}
.back {
	width: 35rpx;
	height: 50rpx;
}
.mine {
	font-size: 34rpx;
	font-family: PingFang;
	font-weight: bold;
	color: rgba(51, 51, 51, 1);
}
.redact {
	font-size: 32rpx;
	font-family: PingFang;
	font-weight: 500;
	color: rgba(51, 51, 51, 1);
}
.minbox {
	width: 100%;
	height: 60rpx;
	background: rgba(236, 236, 236, 1);
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 0 30rpx;
}
.min {
	font-size: 24rpx;
	font-family: PingFang;
	font-weight: 500;
	color: rgba(102, 102, 102, 1);
}
.arrowss {
	width: 36rpx;
	height: 36rpx;
	background: rgba(255, 255, 255, 1);
	border-radius: 50%;
	display: flex;
	align-items: center;
	justify-content: center;
}
.arrows {
	width: 27rpx;
	height: 20rpx;
	margin-left: 2rpx;
}
.listbox {
	padding: 30rpx;
	display: flex;
	border-bottom: 1rpx solid rgba(236, 236, 236, 1);
}
.choose {
	width: 130rpx;
	display: flex;
	align-items: center;
}
.drawing {
	display: flex;
}
.imgs {
	width: 160rpx;
	height: 160rpx;
	border-radius: 10rpx;
	background: #cab38b;
}
.brace {
	font-family: PingFang;
	font-weight: 500;
}
.being {
	font-size: 28rpx;
	color: rgba(51, 51, 51, 1);
	padding-left: 20rpx;
}
.correct {
	font-size: 28rpx;
	color: rgba(255, 51, 51, 1);
	padding-left: 20rpx;
	line-height: 66rpx;
}
.spanl {
	font-size: 20rpx;
	color: rgba(255, 51, 51, 1);
}
.spanr {
	font-size: 22rpx;
	text-decoration: line-through;
	color: rgba(153, 153, 153, 1);
	padding-left: 20rpx;
}
.lect {
	height: 100rpx;
	width: 100%;
	background: rgba(0, 0, 0, 0.8);
	position: fixed;
	bottom: 0;
	display: flex;
	padding-left: 30rpx;
}
.lects {
	display: flex;
	align-items: center;
}
.cancel {
	display: flex;
	align-items: center;
	width: 100%;
}
.cover {
	width: 70%;
	height: 100rpx;
	display: flex;
	align-items: center;
	font-size: 28rpx;
	color: rgba(255, 255, 255, 1);
}
.covers {
	width: 30%;
	height: 100rpx;
	background: rgba(255, 51, 51, 1);
	display: flex;
	align-items: center;
	justify-content: center;
	font-size: 32rpx;
	color: rgba(255, 255, 255, 1);
}
</style>
