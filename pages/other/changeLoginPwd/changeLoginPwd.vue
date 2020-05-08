<template>
	<view>
		<view class="item bg_fff flex flexAlignCenter justifyContentBetween mt2">
			<text class="left_item">手机号</text>
			<view class="flex1 flex flexAlignCenter">
				<input type="text" placeholder="请输入手机号" class="flex1 font26" v-model="Mobile">
				<text class="color_red" @click="getCode">{{codeMsg}}</text>
			</view>
		</view>
		<view class="item bg_fff flex flexAlignCenter justifyContentBetween">
			<text class="left_item">验证码</text>
			<input type="text" placeholder="请输入验证码" class="flex1 font26" v-model="VerifyCode">
		</view>
		<view class="item bg_fff flex flexAlignCenter justifyContentBetween fa_pos">
			<text class="left_item">登录密码</text>
			<input type="password" placeholder="请输入登录密码" class="flex1 font26"  v-model="SecondPassWord">
			
		</view>
		<view class="item bg_fff flex flexAlignCenter justifyContentBetween">
			<text class="left_item">确认密码</text>
			<input type="password" placeholder="请确认登录密码" class="flex1 font26" v-model="Password">
		</view>
		<view class="btn_fix" @click="btnSubmit">确定</view>
	</view>
</template>

<script>
	import {
		host,
		post,
		get,
		valPhone
	} from '@/common/util.js';
	export default{
		data(){
			return {
				userId: "",
				token: "",
				Mobile:'',
				VerifyCode:'',
				Password:'',
				SecondPassWord:'',
				codeMsg:'获取验证码',
				has_click: false,
				count: "",
				TIME_COUNT:60,// 60s后重新获取验证码
			}
		},
		onLoad(){
			this.userId = uni.getStorageSync("userId");
			this.token = uni.getStorageSync("token");
		},
		onShow(){
			
		},
		methods:{
			getCode() {
				if (valPhone(this.Mobile)) {
					if (!this.has_click) {
						this.sendCode();
					}
				}
			},
			async sendCode(){
				const res = await post('User/GetUpdatePswCode',{
					UserId:this.userId,
					Token:this.token,
					Mobile:this.Mobile,
					Type:0,  //0-修改登录密码 1-修改支付密码
				})
				if(res.code == 0){
					this.has_click = true;
					this.count = this.TIME_COUNT;
					uni.showToast({
						title: "发送成功，请注意查收!",
						icon: "none",
						duration: 2000 
					});
					this.timer = setInterval(() => {
						if (this.count > 0 && this.count <= this.TIME_COUNT) {
							this.count--;
							this.codeMsg = this.count + "s后重新获取";
						} else {
							this.has_click = false;
							clearInterval(this.timer);
							this.timer = null;
							this.codeMsg = "获取验证码";
						}
					}, 1000);
					
				}else{
					this.has_click = false;
					uni.showToast({
						title: res.msg,
						icon: "none",
						duration: 2000
					});
				}
				console.log(res,"res")
			},
			btnSubmit(){
				if(valPhone(this.Mobile) && this.ValOther()){
					this.UpdatePayPwd();
				}
			},
			async UpdatePayPwd(){
				const res = await post('User/UpdatePassword',{
					"UserId":this.userId,
					"Token":this.token,
					"Mobile":this.Mobile,
					"VerifyCode":this.VerifyCode,
					"SecondPassWord":this.SecondPassWord
				})
				if(res.code == 0){
					let _this = this;
					uni.showToast({
						title: "密码修改成功!",
						icon: "success",
						duration: 2000,
						success: function() {
							setTimeout(function() {
								uni.removeStorageSync('userId')
								uni.removeStorageSync('token')
								
								uni.navigateTo({
									url:'/pages/login/login?isResgister=1'
								})
							}, 2000);
						}
					});
				}
				
			},
			ValOther() {
				if (this.VerifyCode == "") {
					uni.showToast({
						title: "验证码不能为空!",
						icon: "none",
						duration: 2000
					});
					return false;
				}
				if (this.Password == "" || this.SecondPassWord == "") {
					uni.showToast({
						title: "密码不能为空!",
						icon: "none",
						duration: 2000
					});
					return false;
				}
				if (this.Password != this.SecondPassWord) {
					uni.showToast({
						title: "两次输入密码不同!",
						icon: "none",
						duration: 2000
					});
					return false;
				}
				if (this.Password.length < 6) {
					uni.showToast({
						title: "密码长度不能小于6个字符!",
						icon: "none",
						duration: 2000
					});
					return false;
				}
				return true;
			},
		}
	}
</script>

<style lang="scss">
	.item{
		padding:20upx 30upx;border-bottom: 1upx solid #f5f5f5;
		.left_item{
			width:25%;
		}
	}
	.btn_fix{
		background: #ff3333;text-align: center;
		height:88upx;line-height: 88upx;
		width:690upx;margin:100upx auto;
		color:#ffffff;border-radius:15upx;
	}
	.fa_pos{
		position: relative;
	}
</style>
