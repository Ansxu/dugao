<template>
		<view class="common-part">
        <view class="common-dialog pay-dialog">
            <view class="dialog-title">请输入支付密码
				<text class="iconfont icon-close cancle" @click="hide"></text>
			</view>
            <view class="pay-money">
				<text class="font26">￥</text>{{allprice}}
			</view>
            <view class="pay-password">
				<input type="number" maxlength="6" class="real-ipt" v-model="Password">
                <view class="surface-ipts">
                    <view class="surface-ipt">
                        <input type="password" disabled=true v-model="PasswordArr[0]">
                        <input type="password" disabled=true v-model="PasswordArr[1]">
                        <input type="password" disabled=true v-model="PasswordArr[2]">
                        <input type="password" disabled=true v-model="PasswordArr[3]">
                        <input type="password" disabled=true v-model="PasswordArr[4]">
                        <input type="password" disabled=true v-model="PasswordArr[5]">
                    </view>
                </view>
            </view>
            <view class="btns">
                <button class="confirm-btn" @click="paybtn">确定</button>
            </view>
        </view>
    </view>
</template>

<script>
	export default {
		props:{
			allprice:{
				type: String,
				default: "0"
			}
		},
		data() {
			return {
				Password:"",//密码
				PasswordArr:[],//密码数组
			};
		},
		watch: {
			Password(newVal) {console.log(newVal)
				this.PasswordArr=newVal.split("");
				if(this.PasswordArr[0]==undefined){//app兼容
					this.PasswordArr[0]=''
				}else if(this.PasswordArr[1]==undefined){
					this.PasswordArr[1]=''
				}else if(this.PasswordArr[2]==undefined){
					this.PasswordArr[2]=''
				}else if(this.PasswordArr[3]==undefined){
					this.PasswordArr[3]=''
				}else if(this.PasswordArr[4]==undefined){
					this.PasswordArr[4]=''
				}else if(this.PasswordArr[5]==undefined){
					this.PasswordArr[5]=''
				}
			},
			allprice(newVal) {
				console.log(newVal)
			},
		},
		methods:{
			hide(){
				this.$emit('hidePay',1);//关闭弹窗
			},
			paybtn(){
				if(this.PasswordArr.length===6){
					this.$emit('hidePay',0);
					this.$emit('getPassword',this.Password);
				}else{
					uni.showToast({
						title: "请输入支付密码！",
						icon: "none",
						duration: 1500
					});
				}
			}
		}
	}
</script>

<style>
.common-part{
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
	z-index: 18;
    background: rgba(0,0,0,0.4);
	display: flex;
	justify-content: center;
	align-items: center;
}
.common-dialog{
    width: 680upx;
    text-align: center;
    background: #ffffff;
    border-radius: 25upx;
    border: 1px solid #f2f2f2;
}
.dialog-title{
    height: 100upx;
    line-height: 100upx;
    color: #333333;
	background: #f5f5f5;
    font-size: 30upx;
	border-radius: 25upx 25upx 0  0;
    border-bottom: 1px solid #f2f2f2;
	position: relative;
}
.cancle{
	position: absolute;
	right:30upx;
	top:0upx;
}
.pay-money{
    color: #333333;
    font-size: 50upx;
    margin: 25upx 0;
    font-weight: bold;
}
.pay-password{
    width: 552upx;
    height: 90upx;
    /* border: 1upx solid #999999; */
		/* border-right: none; */
    margin: 0 auto;
    position: relative;
}

.pay-password .real-ipt{
    position: absolute;
    top: 0;
    right: 0;
    width: 150%;
    height: 90upx;
    opacity: 0;
    z-index: 3;
	background-color: rgba(0,0,0,0);
	box-sizing: border-box;
	font-size: 1upx;
	color: transparent;
	text-align: left;
}
.pay-password /deep/ .real-ipt input{ color: transparent;}
.pay-password .surface-ipts{
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 90upx;
    z-index: 1;
	opacity: 1;
}
.pay-password .surface-ipts .surface-ipt{
    height: 90upx;
    line-height: 90upx;
    display: flex;
    justify-content: space-between;
}
.pay-password .surface-ipts .surface-ipt input{
    width: 100upx;
    height: 90upx;
    line-height: 90upx;
    border:1px solid #E5E5E5;
	margin-right:10upx;
    color: #333333;
    font-size: 40upx;
    text-align: center;
    padding: 0;
}
..pay-password .surface-ipts .surface-ipt input:last-child{
	margin-right:0;
}
.pay-password .surface-ipts /deep/ .uni-input-input{font-size: 80upx; height: 90upx;}
/* #ifdef MP-WEIXIN */
.pay-password .surface-ipts .surface-ipt input{
    width: 90upx;
    height: 90upx;
    line-height: 100upx;
	border:1px solid #E5E5E5;
	margin-right:10upx;
    color: #333333;
    font-size: 40upx;
    text-align: center;
    padding: 0;
}
/* #endif */
.btns{
	margin-top: 50upx;
	margin-bottom: 70upx;
  display: flex;
	justify-content: space-around;
	align-items: center;
}
.cancel-btn{
    width: 240upx;
    height: 100upx;
    line-height: 100upx;
    color: #ff3333;
    font-size: 40upx;
    /* border: #2AA8E1 1upx solid; */
		border: #fff;
}
.confirm-btn{
    width: 552upx;
    height: 90upx;
    line-height: 90upx;
    background-size: 100%;
    color: #ffffff;
    font-size: 32upx;
		background-color: #ff3333;
}
</style>
