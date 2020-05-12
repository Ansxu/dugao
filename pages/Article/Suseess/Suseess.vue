<template>
	<view class="commentPage">
		<view class="statusbox uni-center">
			<view class="icoimg">
				<image class="img" src="http://www.sc-mall.net/static/ok.png" mode="aspectFill"></image>
			</view>
			<view v-if="Type==1" class="statustext">取消成功</view>
			<view v-else class="statustext">报名成功</view>	
			
			<view class="txt">
				恭喜您成功<block v-if="Type==1">取消</block><block v-else>报名</block>
				{{actTitle}}
			</view>
		</view>
		<view class="btnBox">
			<view class="btn active" @click="gotoactDetail">完成</view>
			<view class="btn" v-if="Type==0" @click="gotosignupDetail">查看报名详情</view>
		</view>
	</view>
</template>

<script>
	import {host,post,get,toLogin,getCurrentPageUrlWithArgs} from '@/common/util.js';
	export default {
		data() {
			return {
				userId: "",
				token: "",
				curPage:"",
				Type:0,//0表示报名，1表示取消报名
				ActId:"",
				actTitle:"",
			};
		},
		onLoad(e) {
			this.curPage = getCurrentPageUrlWithArgs().replace(/\?/g, '%3F').replace(/\=/g, '%3D').replace(/\&/g, '%26');
			this.userId = uni.getStorageSync("userId");
			this.token = uni.getStorageSync("token");
			if(e.type){
				this.Type=e.type;
			}
			this.ActId=e.id;
		},
		methods:{
			gotoactDetail(){
				uni.navigateTo({
				  url: "/pages/Article/activityDetail/activityDetail?id="+this.ActId
				});
			},
			gotosignupDetail(){
				uni.navigateTo({
				  url: "/pages/Article/signupDetail/signupDetail?id="+this.ActId
				});
			}
		}
	}
</script>

<style scoped>
.commentPage{ background: #fff; min-height: 100%;}
.statusbox{ padding: 200upx 60upx;}
.icoimg{ width: 180upx; height: 180upx; margin: 0 auto;}
.icoimg .img{ width: 100%; height: 100%;}
.statustext{ color: #89674C; font-size: 40upx; margin: 20upx 0 10upx;}
.txt{ color: #999;}
.btnBox{ margin: 0 40upx;}
.btnBox .btn{height: 80upx;font-size: 30upx; line-height: 80upx; width: 100%; text-align: center; background: #fff; color: #89674c; border-radius: 40upx; border: 1px solid #89674c; margin-bottom: 40upx;}
.btnBox .btn.active{background: #89674c; color: #fff;}
</style>
