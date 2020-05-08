<template>
	<view class="content">
		<view style="width: 100%;background:#ff4e4f;" :style="{'height':barHeight+'px'}"></view>
		
		<view class="memberTop">
			<!-- <view class="iconBtnBox">
				<view @click="navigate('message/messageClass/messageClass')" class="iconfont icon-xiaoxi iconBtn"><text class="uni-badge" v-if="newscount!=0">{{newscount}}</text></view>
			</view> -->
			<view class="conBox">
				<view class="tx_info flex-column-center">
					<view @click="navigate('member/editinfo/editinfo',{Memberid:memberInfo.Id},true)">
						<image class="tx" v-if="memberInfo.Avatar" :src="memberInfo.Avatar" mode="aspectFill"></image>
						<image class="tx" v-else src="http://ddyp.wtvxin.com/static/default.png" mode="aspectFill"></image>
					</view>
					<view class="info flex">
						<view class="info-item" style="width: 100%;">
							<view class="name">
								<text class="txt" style="max-width: 100%;">{{memberInfo.NickName||'您还未登录，请先登录！'}}</text>
								<!-- <text class="plusicon" v-if="memberInfo.IsVip==1">VIP</text> -->
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>	
		
		<!-- 我的订单 -->
		<view class="b_radius myOrder">
			<view class="section__hd weui-cell" @click="navigate('member/order/order?tabIndex=0')">
				<view class="weui-cell__bd">
					<view class="title">我的订单</view>
				</view>
				<view class="weui-cell__ft flex-center">
					<text class="more">查看全部</text>
					<uni-icons type="arrowright" color="#797979"></uni-icons>
				</view>
			</view>
			<view class="section__bd">
				<view class="dd-list col__list li_20 center clear pt5 flex" >
					<view class="item flex1" @click="navigate('member/order/order?tabIndex=1')">
						<view class="iconImg">
							<image class="icon" src="/static/my/pend-pay.png" mode="widthFix"></image>
							<view class="circleNum" v-if="memberInfo.num_dfk>0">{{memberInfo.num_dfk}}</view>
						</view>
						<view class="txt">待付款</view>
					</view>
					<view class="item flex1" @click="navigate('member/order/order?tabIndex=6')">
						<view class="iconImg">
							<image class="icon" src="/static/my/wait-ship.png" mode="widthFix"></image>
							<view class="circleNum" v-if="memberInfo.num_audit>0">{{memberInfo.num_audit}}</view>
						</view>
						<view class="txt">待发货</view>
					</view>
					<view class="item flex1" @click="navigate('member/order/order?tabIndex=2')">
						<view class="iconImg">
							<image class="icon" src="/static/my/ship.png" mode="widthFix"></image>
							<view class="circleNum" v-if="memberInfo.num_dfh>0">{{memberInfo.num_dfh}}</view>
						</view>
						<view class="txt">已发货</view>
					</view>
					<view class="item flex1" @click="navigate('member/order/order?tabIndex=3')">
						<view class="iconImg">
							<image class="icon" src="/static/my/evaluation.png" mode="widthFix"></image>
							<view class="circleNum" v-if="memberInfo.num_dsh>0">{{memberInfo.num_dsh}}</view>
						</view>
						<view class="txt">评价</view>
					</view>
					<view class="item flex1" @click="navigate('member/order/order?tabIndex=4')">
						<view class="iconImg">
							<image class="icon" src="/static/my/after-sale.png" mode="widthFix"></image>
							<view class="circleNum" v-if="memberInfo.num_dpj>0">{{memberInfo.num_dpj}}</view>
						</view>
						<view class="txt">售后</view> 
					</view>
				</view>
			</view>
		</view>
		<!-- 我的订单 end-->

		<!-- 我的服务 -->
		<view class="memberIndex__section b_radius uni-mb10">
			<view class="section__hd weui-cell">
				<view class="weui-cell__bd">
					<view class="title">我的服务</view>
				</view>
			</view>
			<view class="section__bd Sevice">
				<view class="dd-list col__list li_25 center clear">
					<view class="item" @click="navigate('tabBar/my/wallet')">
						<image class="iconImg" src="/static/my/wallet.png" mode=""></image>
						<view class="txt">我的钱包</view>
					</view>
					<view class="item" @click="navigate('other/myAcount/myAcount')">
						<image class="iconImg" src="/static/my/income.png" mode=""></image>
						<view class="txt">我的收益</view>
					</view>
					<view class="item" @click="navigate('other/myguest/myguest')">
						<image class="iconImg" src="/static/my/team.png" mode=""></image>
						<view class="txt">我的团队</view>
					</view>
					<view class="item" @click="navigate('member/orderTui/orderTui')">
						<image class="iconImg" src="/static/my/coupon.png" mode=""></image>
						<view class="txt">优惠券</view>
					</view>
					<view class="item" @click="navigate('member/orderTui/orderTui')">
						<image class="iconImg" src="/static/my/collect.png" mode=""></image>
						<view class="txt">我的收藏</view>
					</view>
					<view class="item" @click="navigate('member/myAppraise/myAppraise')">
						<image class="iconImg" src="/static/my/comment.png" mode=""></image>
						<view class="txt">我的评价</view>
					</view>
					<view class="item" @click="navigate('member/invoiceList/invoiceList')">
						<image class="iconImg" src="/static/my/footprint.png" mode=""></image>
						<view class="txt">浏览记录</view>
					</view>
					<view class="item" @click="navigate('member/address/address')">
						<image class="iconImg" src="/static/my/address.png" mode=""></image>
						<view class="txt">收货地址</view>
					</view>
					<view class="item" @click="navigate('member/invite/invite')">
						<image class="iconImg" src="/static/my/invite.png" mode=""></image>
						<view class="txt">邀请好友</view>
					</view>
					<view class="item" @click="navigate('member/address/address')">
						<image class="iconImg" src="/static/my/feedback.png" mode=""></image>
						<view class="txt">意见反馈</view>
					</view>
					<view class="item" @click="navigate('other/kefu/kefu')">
						<image class="iconImg" src="/static/my/service.png" mode=""></image>
						<view class="txt">在线客服</view>
					</view>
					<view class="item" @click="navigate('other/set/set')">
						<image class="iconImg" src="/static/my/setting.png" mode=""></image>
						<view class="txt">设置</view>
					</view>
				</view>
			</view>
		</view>
		<!-- 我的服务  end-->
	</view>
</template>

<script>
	import {host,post,get,judgeLogin,navigate} from '@/utils';
	export default {
		data() {
			return {
				navigate,
				barHeight:0,//app端增加状态栏高度
				userId: "",
				token: "",
				memberInfo:{},
				OrderInfo:{},
				newscount:0,
			}
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
			this.userId = uni.getStorageSync("userId");
			this.token = uni.getStorageSync("token");
			if (judgeLogin()) {
				this.NewsCount();
			    this.getMemberInfo();
			}
		},
		methods: {
			gotab(url,type){
				if(judgeLogin()){
					uni.setStorageSync('collectIndex',type)
					uni.switchTab({
						url:url
					})
				}
			},
			async getMemberInfo() {
				let result = await post("User/GetCenterInfo", {
					"UserId": this.userId,
					"Token": this.token
				})
					this.memberInfo = result.data;
					// 推荐码
					uni.setStorageSync('ReferralCode',result.data.ReferralCode)
			},
			async NewsCount() {
				let result = await post("News/NewsCount", {
					"UserId": this.userId,
					"Token": this.token
				});
				if (result.code === 0) {
					this.newscount = result.count;
				} 
			},
			// #ifndef MP
			QQSevice(){
				navigate('home/kefu/kefu')
				// if(toLogin(this.curPage)){
				// 	window.location.href = "http://wpa.qq.com/msgrd?v=3&uin=8888888&site=qq&menu=yes"
				// }
			}
			// #endif
		}
	}
</script>

<style scoped lang="scss">
	@import './index.scss';
	


	.content{height: 100%;overflow-y: auto;}
	.Sevice .dd-list{padding: 26upx 0 0;}
	.Sevice .dd-list .item{ padding: 0; margin-bottom: 20upx;}
	.WEIXIN_btn{ position: absolute; left: 0; top: 0; width: 100%; height: 100%; opacity: 0;}
	.item .iconImg{
		width: 50upx;
		height: 45upx;
		display: block;
	}
	.myOrder .dd-list .iconImg{
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}
	/* #ifdef MP-WEIXIN */
	.myOrder .dd-list .iconImg image {
		width: 45upx;
		height: 50upx;
	}
	/* #endif */
	.vip-section{ padding: 0 30upx; position: relative;}
	.vip-section image{ display: block;}
	.btn-concat{
		border: none;
		padding: 0;
		background-color: none;
		width: 25%;
		background: #fff;
		display: inline-block;
		color: #5e5e5e;
	}
	button::after {
		border: none;
	}
	.btn-concat .item{
		width: 100%;
	}
</style>
