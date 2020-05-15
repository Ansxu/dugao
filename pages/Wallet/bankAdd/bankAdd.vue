<template>
  <div class="pageContent">
    <div class="addCardFrom">
      <div class="tipsbox flex flex-center-start">
        <img class="tipicon" src="http://jyy.wtvxin.com/static/images/icons/tips.png" alt="">
        <p>姓名必须和身份证中保持一致，务必保证银行卡信息正确</p>
      </div>
      <div class="addCard__form">
        <div class="select__weui-cells">
          <div class="ipt flex flexAlignCenter">
            <div class="lab">持卡人姓名</div>
            <div class="flex1">
              <input type="text" placeholder="请输入持卡人姓名" v-model="bankCardName" class="weui-input">
            </div>
          </div>
        </div>
        <div class="select__weui-cells">
          <div class="ipt flex flexAlignCenter" @click="selectCardName">
            <div class="lab">选择对应银行</div>
            <div class="flex1">
              <input
                type="text"
                placeholder="请选择"
                disabled="true"
                :value="BankName"
                class="weui-input"
              >
            </div>
            <view class="iconfont icon-arrow_r fz12"></view>
          </div>
          <div class="ipt flex flexAlignCenter">
            <div class="lab">银行卡号</div>
            <div class="flex1">
              <input type="text" placeholder="请输入银行卡号" v-model="bankCardNo" class="weui-input">
            </div>
          </div>
          <div class="ipt flex flexAlignCenter">
            <div class="lab">支行名称</div>
            <div class="flex1">
              <input type="text" placeholder="请输入支行名称" v-model="bankAddress" class="weui-input">
            </div>
          </div>
        </div>
       
        <div class="select__weui-cells">
          <div class="ipt flex flexAlignCenter">
            <div class="lab">已绑定手机号</div>
            <div class="flex1">
              <input type="text" placeholder="请输入手机号码" v-model="mobile" class="weui-input">
            </div>
          </div>
          <div class="ipt flex flexAlignCenter" style="overflow:hidden;">
            <div class="lab">验证码</div>
            <div class="flex1">
              <input type="text" placeholder="6位验证码" v-model="Code" class="weui-input">
            </div>
            <span class="btnCode" @click="getCode">{{codeMsg}}</span>
          </div>
        </div>
       
      </div>
      <div class="btn" @tap="bindCard">确定</div>
    </div>
  </div>
</template>
<script>
import { post, valPhone} from "@/common/util.js";
export default {
  onLoad() {
    this.setBarTitle();
  },
  onShow() {
    this.bankId = this.$store.state.cardInfo.id;
    this.BankName = this.$store.state.cardInfo.bankName;
    // this.mobile = uni.getStorageSync("mobile");
    this.userId = uni.getStorageSync("userId");
    this.token = uni.getStorageSync("token");
    console.log(this.mobile);
    console.log(this.$store.state.cardInfo)
    // if (this.mobile) {
    //   this.tel =
    //     this.mobile.substring(0, 3) +
    //     "****" +
    //     this.mobile.substring(this.mobile.length - 4);
    // }
  },
  data() {
    return {
      cardNum:'',
      userId: "",
      token: "",
      bankCardName: "", //持卡人人名字
      bankCardNo: "", //银行卡号
      bankAddress: "", //开户地址
      bankId: "", //选择的银行Id
      BankName: "",
      mobile: "",
      tel: "",
      Code: "",
      codeMsg: "获取验证码",
      timer: null,
      count: "",
      TIME_COUNT: 60,
      has_click: false
    };
  },
  methods: {
    setBarTitle() {
      uni.setNavigationBarTitle({
        title: "添加银行卡"
      });
    },
    initData(){
      this.userId = "";
      this.token = "";
      this.bankCardName = ""; //持卡人人名字
      this.bankCardNo = ""; //银行卡号
      this.bankAddress = ""; //开户地址
      this.BankName = "";
      this.mobile = "";
      this.tel = "";
      this.Code = "";
      this.codeMsg = "获取验证码";
      this.timer = null;
      this.count = "";
      this.TIME_COUNT = 60;
      this.has_click = false;
    },
    selectCardName() {
      //选择银行卡
      this.$store.commit("setSelectCard", {
        url: "/pages/Wallet/bankAdd/bankAdd",
        status: true
      });
      uni.navigateTo({ url: "/pages/Wallet/bankChoose/bankChoose" });
    },
    valOther() {
      if (this.bankCardName == "") {
        uni.showToast({
          title: "请输入持卡人姓名!",
          icon: "none",
          duration: 1500
        });
        return false;
      }
      if(this.BankName == ""){
        uni.showToast({
          title: "请选择银行名称!",
          icon: "none",
          duration: 1500
        });
        return false;
      }
      
      if (this.bankCardNo == "") {
        uni.showToast({
          title: "请输入银行卡号!",
          icon: "none",
          duration: 1500
        });
        return false;
      }
	  if (this.bankAddress == "") {
	    uni.showToast({
	      title: "请输入支行名称!",
	      icon: "none",
	      duration: 1500
	    });
	    return false;
	  }
      if (
        !/^([1-9]{1})(\d{15}|\d{16}|\d{17}|\d{18}|\d{19}|\d{20})$/.test(
          this.bankCardNo
        )
      ) {
        uni.showToast({
          title: "请输入正确的卡号格式!",
          icon: "none",
          duration: 1500
        });
        return false;
      }
      if(this.mobile == ""){
        uni.showToast({
          title: "请输入手机号码!",
          icon: "none",
          duration: 1500
        });
        return false;
      }
      if(this.Code == ""){
        uni.showToast({
          title: "请输入手机验证码!",
          icon: "none",
          duration: 1500
        });
        return false;
      }
      return true;
    },
    bindCard() {
      if (this.valOther()) {
        this.addBank();
      }
    },
    getCode() {
      if (valPhone(this.mobile)) {
        if (!this.has_click) {
          this.getWxBindTelCode();
        }
      }
    },
    //获取验证码
    async getWxBindTelCode() {
      let that = this;
      post("Bank/BindingBankCards", {
        UserId: this.userId,
        Token: this.token,
        Mobile: this.mobile,
      }).then(result => {
        if (result.code === 0) {
          that.has_click = true;
          const TIME_COUNT = 90; // 90s后重新获取验证码
          that.count = TIME_COUNT;
          uni.showToast({
            title: "发送成功，请注意查收!",
            icon: "none",
            duration: 1500
          });
          that.timer = setInterval(() => {
            if (that.count > 0 && that.count <= TIME_COUNT) {
              that.count--;
              that.codeMsg = that.count + "s后重新获取";
            } else {
              that.has_click = false;
              clearInterval(that.timer);
              that.timer = null;
              that.codeMsg = "获取验证码";
            }
          }, 1000);
        }
      });
    },
    addBank() {
      let that = this;
      post("Bank/AddBank", {
          UserId: this.userId,
          Token: this.token,
          Mobile: this.mobile,
          VerifyCode: this.Code,
          BankCardName: this.bankCardName,
          BankCardNo: this.bankCardNo,
          BankAddress: this.bankAddress,
          BankName: this.BankName
        }
      ).then(result => {
        if (result.code === 0) {
          uni.showToast({
            title: "新增成功!",
            icon: "none",
            duration: 1500,
            success: function() {
              setTimeout(function() {
                that.initData();
                uni.redirectTo({
                  url: "/pages/Wallet/bankCard/bankCard"
                });
              }, 1500);
            }
          });
        }
      });
    }
    
    
  }
};
</script>
<style lang='scss' scoped>
.tipsbox{
  padding: 30upx;
  .tipicon{ width: 36upx; height: 36upx; margin-right: 10upx}
  p{ font-size: 24upx; color: #999 }
}

.weui-input {
    font-size: 28upx;
    line-height: 1.8;
    height: auto;
    text-align: right
}
.select__weui-cells {
    margin-bottom: 16upx;
    background: #fff;
    .ipt {
      padding: 24upx 30upx;
      border-bottom: 1px solid #eee;
    }
    .ipt:last-child{
      border-bottom: none;
    }
}

.btnCode {
    border-left: 1px solid #ddd;
    color: #ff6f00;
    padding-left: 20upx;
    margin-left: 20upx;
}
.btn{
  color:#ffffff;background: #ff6f00;
  margin:80upx auto 0upx;
  width: 690upx;
  height: 88upx;
  line-height: 88upx;
  border-radius: 12upx;
  text-align: center;
  
}
</style>