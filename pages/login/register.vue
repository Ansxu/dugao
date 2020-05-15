<template>
  <div class="sectionPage">
    <div class="main">
      <div class="regLoginBox">
        <div class="logo">
          <div class="img">
            <img src="/static/logo.png" />
          </div>
        </div>
        <div class="from pd10">
          <div class="from-line">
            <img src="@/static/icons/phonecon.png" class="phone-icon" alt="" mode="widthFix">
            <input type="text" class="ipt phone-input" placeholder="请输入手机号码" v-model="phoneNumber" />
          </div>
          <div class="from-line">
            <img src="@/static/icons/d_code.png" class="phoneCode-icon" alt="" mode="widthFix">
            <input type="text" class="ipt" placeholder="请输入验证码" v-model="verifyCode" />
            <!-- <div class="getcode" @click="getCode(this)">{{btnText}}</div> -->
            <button
              class="getcode"
              :style="btnText!=='获取验证码'?'background:#ccc;':''"
              @click="getVerifyCode()"
            >{{btnText}}</button>
          </div>
          <!-- <div class="from-line"  v-if="inviteCode !=''">
            <span class="icon icon_code"></span>
            <input type="text" class="ipt" placeholder="邀请码" disabled v-model="inviteCode" />
            <button
              class="getcode"
              style="font-size:28upx;background:#ccc;width:26%;"
            >邀请码</button>
          </div> -->
          <!-- <div class="from-line">
            <span class="icon icon_pwd"></span>
            <input type="password" class="ipt" placeholder="请输入密码" v-model="password" />
          </div>
          <div class="from-line">
            <span class="icon icon_pwd"></span>
            <input type="password" class="ipt" placeholder="请确认密码" v-model="password2" />
          </div> -->
          
          <div class="flex-center">
            <label class=" flex-center " @click="onCheckedStatus">
              <radio color="#ff6f00" :checked="checkedStatus"></radio>
              <text style="font-size:28upx">我已阅读并同意</text>
            </label>
            <text class="primary" @click="goUrl()">《杜高用户协议》</text>
          </div>
        </div>
        <div class="ftbtn">
          <div class="btn" @click="onRegister()">确认注册</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { host, post, get, debounce,verifyPhone,toast,navigate,navigateBack } from "@/utils";
import logins from "./login";
export default {
  data() {
    return {
      btnText: "获取验证码",
      phoneNumber: "",
      verifyCode: "",
      password: "",
      password2: "",
      disabled: false,
      checkedStatus: true,
      shareId: "",
      timeout: false,
      inviteCode:"",//邀请码
    };
  },
  onLoad(params) {
    this.btnText = "获取验证码";
    this.phoneNumber = "";
    this.verifyCode = "";
    this.password = "";
    this.password2 = "";
    this.disabled = false;
    this.checkedStatus = true;
    this.setBarTitle();
    this.shareId = params.shareId || "";
  },
  onShow() {
    // 邀请码
    if(uni.getStorageSync('inviteCode') !='undefined'){
      this.inviteCode = uni.getStorageSync('inviteCode')
    }
  },
  methods: {
    setBarTitle() {
      uni.setNavigationBarTitle({
        title: "注册"
      });
    },
    // 事件防抖
    onRegister() {
      if (!this.registerCheck()) return;
      debounce(this.Register);
    },
    //注册账号
    async Register() {
      const userInfo = uni.getStorageSync("userInfo");
      const openId = uni.getStorageSync("openId");
      // const token = uni.getStorageSync("uniToken");
      const unionid = uni.getStorageSync("unionid");
      try{
      const res = await post("Login/BindOrRegister", {
        mobile: this.phoneNumber,
        yzCode: this.verifyCode,
        // PassWord: this.password,
        // OkPassWord: this.password2,
        unionid: unionid, //微信统一unionid号
        openId: openId,
        // LoginParameterType:0,
        // Token: token,
        userInfo:{
            nickName: userInfo.nickName,
            avatarUrl: userInfo.avatarUrl,
        },
        // gender: userInfo.gender === 1 ? "男" : "女",
        // IdentityType: 1, //操作的身份值 1-客户 2-师傅
        InviteCode:this.inviteCode
      });
      const _res = res.data;
        toast('绑定手机成功',{icon:true})
        uni.setStorageSync("userId", _res.UserId); //保存用户Id到本地缓存
        uni.setStorageSync("token", _res.Token); //保存的令牌 accessToken
        navigateBack()
      }catch(err){
        console.log(err)
      }
    },
    // 发送验证码
    getVerifyCode() {
      if (this.disabled) {
        return false;
      }
      const TIME_COUNT = 60; // 60s后重新获取验证码
      let codeNum = this.verificationCode;
      let phoneNum = this.phoneNumber;
      if(!verifyPhone(phoneNum)) return;
        // 验证码类型 会员注册0,会员登录1,会员找回密码2,会员找回支付密码3,会员修改手机号4,
        // 会员重新绑定手机号5,会员微信绑定手机号6, 师傅登录7,师傅注册8,师傅绑定银行卡9,
        // 师傅微信绑定手机号10,师傅修改手机号11,师傅重新绑定手机号12,师傅找回密码13,
        // 客服登录14,客服找回密码15,客服绑定账号16
      const result = get("Login/GetMiniAppBindTelCode", {
        Mobile: this.phoneNumber,
      });
      toast( "短信已发送",{icon:true})
      if (!this.timer) {
        this.count = TIME_COUNT;

        this.disabled = true;
        this.timer = setInterval(() => {
          if (this.count > 0 && this.count <= TIME_COUNT) {
            this.count--;
            this.btnText = this.count + "s后重新获取";
          } else {
            this.disabled = false;
            clearInterval(this.timer);
            this.timer = null;
            this.btnText = "获取验证码";
          }
        }, 1000);
      }
    },
    // 注册校验
    registerCheck() {

      if (!this.phoneNumber || !this.verifyCode) {
        toast("请填写手机号和验证码");
        return false;
      }
      if(!verifyPhone(this.phoneNumber))return;
      if (!this.checkedStatus) {
        toast("请阅读并同意用户协议");
        return false;
      }
      // if (!this.password) {
      //   uni.showToast({
      //     title: "请填写密码！",
      //     icon: "none",
      //     duration: 2000
      //   });
      //   return false;
      // }
      // if (this.password !== this.password2) {
      //   uni.showToast({
      //     title: "两次输入的密码不相同！",
      //     icon: "none",
      //     duration: 2000
      //   });
      //   return false;
      // }
      return true;
    },
    // 用户协议
    onCheckedStatus(e) {
      this.checkedStatus = !this.checkedStatus;
    },
    goUrl() {
      navigate(`message/agreement/agreement`);
    }
  },
  computed: {}
};
</script>
<style lang='scss' scoped>
.sectionPage{
	background: #fff !important;
	height:100vh;
}
.logo{
	display:flex;
	align-items:center;
	height:400upx;
	flex-direction: column;
	justify-content: center;
}
/* 单选钮样式 */
radio {
  transform:scale(0.8);
}
.ftbtn{
  margin-top:20upx;
  .btn{
      color:#fff;
      background: $primary;
      text-align: center;
      height: 86upx;
      line-height: 86upx;
      border-radius:15upx;
  }
}
.inlineflex{
    display: flex;
    justify-content: flex-start;
    align-items: center;
}

.pl10 {
	padding-left: 20upx !important;
}

.pr10 {
	padding-right: 20upx !important;
}

.pt10 {
	padding-top: 20upx !important;
}
.pb10 {
	padding-bottom: 20upx !important;
}
.aLine a {
	color: #505050;
}

.regLoginBox {
	padding: 0 30upx;
}

.from .from-line {
	margin-bottom: 30upx;
	position: relative;
	display:flex;
	align-items:center;
	border: 1px solid #d9d9d9;
	border-radius: 200upx;
	overflow:hidden;
	.phone-input{
		width:500upx;
	}
}

.from .ipt {
	height: 80upx;
	/* width: 100%; */
	padding: 0 20upx 0 20upx;
	font-size: 30upx;
}

.from .ipt:focus {
	border-color: $primary;
}

.from .from-line .icon {
	height: 100%;
	width: 120upx;
	position: absolute;
	left: 0;
	top: 0;
	z-index: 9;
}


.from .from-line .getcode {
	height: 84upx;
	line-height: 84upx;
	position: absolute;
	right: 0;
	top: 0;
	background: $primary;
	color: #fff;
	padding: 0 20upx;
	border-radius: 0 200upx 200upx 0;
	z-index: 5;
	font-size:28upx;
}

.from .from-txt {
	font-size: .14rem;
	color: #656565;
}

.from .from-txt .link {
	color: #0bd5a9;
}
.phone-icon{
	width:30upx;
	height:40upx;
	margin-left:30upx;
}
.phoneCode-icon{
	width:40upx;
	height:40upx;
	margin-left:20upx;
}
.img {
  width:200upx;
  height:200upx;
  img {
   width:100%;
   height:100%;
  }
}
.font30{
  font-size:40upx;
}
.primary{
  color:$primary;
}
</style>
