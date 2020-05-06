<template>
  <div class="login">
    <open-data class="icon icon_circular_bead" type="userAvatarUrl"></open-data>
    <div class="auth-text">
      <text class="main">{{title}}</text>
      <text class="sub">{{content}}</text>
    </div>
    <button class="login-btn" open-type="getUserInfo" lang="zh_CN" @getuserinfo="doBind">{{buttonText}}</button>
  </div>
</template>

<script>
import logins from './login'
export default {
  data() {
    return {
      // 是否授权的提示信息
      title:'该小程序由***开发，请提供以下授权，即可继续操作',
      content:'· 获得你的公开信息（昵称、头像等）',
      buttonText:'登录'
    };
  },
  onLoad(){
  },
  onShow() {
    const that =this;
    // 判断是否已授权，未授权做不同提示
    uni.getSetting({
      success(res){
        // 已授权
        if(res.authSetting['scope.userInfo']){
          that.title = '登录信息已过期或者已经失效，需重新进行登录'
          that.buttonText = '授权登录'
        }
        // 未授权
        else{

        }
      }
    })
  },
  computed:{
  },
  methods: {
    // 点击登录
    doBind(){
        logins({
          success(res){
            setTimeout(()=>{
              uni.navigateBack();
            },1500)
          }
        });
    },
  }
};
</script>
<style lang='scss' scoped>
.login {
    .icon {
      display: block;
      margin: 100upx auto 64upx;
      width: 200upx;
      height: 200upx;
  }
  
  .icon_circular_bead {
      width: 200upx;
      height: 200upx;
      border-radius: 50%;
      overflow: hidden;
  }
  
  .auth-text {
      margin: 50upx 64upx;
      padding: 32upx 0;
      border-top: 1px solid #ddd;
      text-align: justify;
  }
  
  .auth-text .main {
      display: block;
      font-size: 28upx;
  }
  
  .auth-text .sub {
      display: block;
      font-size: 24upx;
      color: #888;
      margin-top: 16upx;
  }
  
  .msxcx-widget-btn {
      margin-left: 64upx;
      margin-right: 64upx;
  }
  
    // .logo {
    //   width: 600upx;
    //   height: 100upx;
    //   background: url('http://img.su-cloud.cn/mini/logo.png') no-repeat;
    //   background-size: 100% 100%;
    //   margin: 200upx auto 0 auto;
    // }
    .login-btn {
      text-align: center;
      background: #cc9f68;
      width: 90%;
      height: 80upx;
      line-height: 80upx;
      color: #fff;
      font-size: 28upx;
      margin-top: 30upx;
    }
    .item {
      width: 690upx;
      height: 70upx;
      line-height: 70upx;
      margin: 0 auto;
      padding: 10upx 0;
      border-bottom: 1upx solid #f4f4f4;
      input {
        width: 100%;
        height: 100%;
      }
      .code1{
        width: 60%;
        height: 100%;
        float:left;
        display: inline;
      }
      .btn{
        padding: 0 10upx;
        margin: 0;
        font-size: 28upx;
        text-align: center;
        background: transparent;
        color: #a07941;
        border-color: #a07941;
        display:inline;
        width:30%;
        float:right;
   
      }
    
    }
  }
  
</style>
