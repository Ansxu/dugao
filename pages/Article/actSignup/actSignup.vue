<template>
	<view class="content">
		<form>
			<view class="uni-list">
				<view class="uni-list-cell">
					<view class="uni-list-cell-navigate">
						<view class="list-cell-l">
							姓名<text style="color: red;">*</text>
						</view>
						<view class="list-cell-r">
							<input type="text" v-model="Name">
						</view>
					</view>
				</view>
				<view class="uni-list-cell">
					<view class="uni-list-cell-navigate">
						<view class="list-cell-l">
							手机号<text style="color: red;">*</text>
						</view>
						<view class="list-cell-r">
							<input type="text" v-model="Phone">
						</view>
					</view>
				</view>
				<view class="uni-list-cell">
					<view class="uni-list-cell-navigate">
						<view class="list-cell-l">
							证件类型
						</view>
						<view class="list-cell-r">
							<input type="text" disabled value="身份证" />
						</view>
					</view>
				</view>
				<view class="uni-list-cell">
					<view class="uni-list-cell-navigate">
						<view class="list-cell-l">
							证件号<text style="color: red;">*</text>
						</view>
						<view class="list-cell-r">
							<input type="text" v-model="Card">
						</view>
					</view>
				</view>
				<view class="uni-list-cell agree">
					<view class="uni-list-cell-navigate">
						<view class="list-cell-l">
							<label class="checkbox" @click="agreebtn">
								<checkbox value="" :checked="Isagree"></checkbox>
							</label>
							确认以上信息真实有效且报名即代表已同意<text style="color: #89674C;">《报名须知》</text>
						</view>
					</view>
				</view>
			</view>
			<view class="tipsbox">
				<view class="title">
					温馨提示
				</view>
				<view class="tipslist">
					1.活动开始前可取消
				</view>
			</view>
		</form>
		<!-- 底部-->
		<view class="foot-fiexd">
			<view class="foot-activity">
				<view class="btn" @click="Submit">提交</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {host,post,get,valPhone} from '@/common/util.js';
	export default {
		data() {
			return {
				userId: "",
				token: "",
				curPage:"",
				ActId:"",
				Name:"",
				Card:"",
				Phone:"",
				Isagree:true
			};
		},
		onLoad(e) {
			this.ActId=e.id;
		},
		onShow() {
			this.userId = uni.getStorageSync("userId");
			this.token = uni.getStorageSync("token");
			this.Name="",
			this.Card="",
			this.Phone="",
			this.Isagree=true;
		},
		methods:{
		// 报名活动
			async ActivityOperation(){
				let result = await post("Find/ActivityOperation", {
					"UserId": this.userId,
					"Token": this.token,
					"ActivityId": this.ActId,
					"UserName": this.Name,
					"UserIdCard": this.Card,
					"UserPhone": this.Phone
				});
				if (result.code === 0) {
					let _this=this;
					setTimeout(function() {
						uni.redirectTo({
							url: "/pages/Article/Suseess/Suseess?type=0"+"&id="+_this.ActId
						})
					},1000)
				}else if (result.code === 2) {
					uni.showToast({
						title: result.msg,
						icon: "none",
						duration: 2000
					});
				} else {
					uni.showToast({
						title: result.msg,
						icon: "none",
						duration: 2000
					});
				}
			},
			Submit(){
				if(this.verifysubmint()){
					this.ActivityOperation();
				}
			},
			agreebtn(){
				this.Isagree=!this.Isagree;
			},
			//验证
			verifysubmint(){
				if(this.Name==""){
					uni.showToast({
						title: "姓名不能为空",
						icon: "none",
						duration: 2000
					});
					return false;
				}
				if(valPhone(this.Phone)==false){
					return false;
				}
				if(this.Card==""){
					uni.showToast({
						title: "证件号不能为空",
						icon: "none",
						duration: 2000
					});
					return false;
				}
				let reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
				if(reg.test(this.Card) === false){
					uni.showToast({
						title: "请输入正确证件格式",
						icon: "none",
						duration: 2000
					});
					return false;
				}
				if(this.Isagree==false){
					uni.showToast({
						title: "请同意报名须知",
						icon: "none",
						duration: 2000
					});
					return false;
				}
				return true;
			}
		}
	}
</script>

<style scoped>
.content{ background: #fff; min-height: 100%;}
.uni-list:after{ display: none;}
.list-cell-l{ color: #999;}
.list-cell-r{ width: 560upx; color: #333; text-align: right; padding-right: 0;}
.agree .list-cell-l{ margin-left: 54upx;}
.agree .checkbox{ margin-left: -54upx;}
.tipsbox{ padding: 20upx;}
.tipsbox .title{ font-size: 30upx;}
.tipslist{ color: #666;}
.foot-fiexd {
	height: 120upx;
}
.foot-fiexd *{box-sizing: border-box;}
.foot-activity {
	height: 120upx;
	background: #f5f5f5;
	position: fixed;
	left: 0;
	bottom: 0;
	width: 100%;
	z-index: 998;
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	border-top: 1px solid #eee;
	padding: 20upx 40upx;
}
.foot-activity .btn{
	 height: 80upx; line-height: 80upx; width: 100%; text-align: center; background: #89674c; color: #fff; border-radius: 40upx; font-size: 30upx;
}
</style>
