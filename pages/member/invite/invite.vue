<template>
  <view class="invite bg_fff" style="padding-bottom: 30upx;overflow:hidden;position: fixed;min-height:100vh">
		<view id="bb_canvas">
			  <view class="inn_bg ">
				  <image src="http://shop.dadanyipin.com/static/icons/inn.png" alt="" class="invite"></image>
			  </view>
			  <view class=" flex bg_fff pp3 flexAlignCenter">
				  <view class=" flex flexColumn flex1 justifyContentStart">
					  <view class=" flex flexAlignCenter">
						  <image :src="Avatar" alt="" class="ava mr2"></image>
						  <view class="mr2" style="margin-left:20upx;">
							  <view>{{tel}}</view>
							  <!-- #ifdef H5 -->
							  <input type="text" class="font20 yy_ma mt1" @focus="blur()" :disabled="disabled" 
							   v-model="info.ReferralCode" style="opacity: 0;position: fixed;top: -10000px;">
							  <!-- #endif -->
							  <view class="font20 yy_ma mt1" @click="copybtn()">邀请码：{{info.ReferralCode}}</view>
						  </view>
					  </view>
				  </view>
				  <image :src="info.InviteQRcode" alt="" class="code_img"></image>
			  </view>
		</view>
		  <view class="yy_scan font30 " @click="showShare" >点击分享</view>
		  <!--分享-->
		  <view class="mask" v-if="isShowShare" @click="cancelShare" @catchtouchmove="true"></view>
		  <view class="modal_mask flex justifyContentAround pp3" v-if="isShowShare">
			  <!-- #ifdef MP-WEIXIN-->
			  <button open-type="share" class="flex flexColumn flexAlignCenter">
				  <image src="http://jyy.wtvxin.com/static/images/icons/vy.png" alt="" class="circle_img"></image>
				  <view class="mt1 flex1 font18">分享微信好友</view>
			  </button>
			  <!-- #endif -->
			  <!-- #ifdef APP-PLUS -->
			 <view class="flex flexColumn flexAlignCenter" @click="sharePlus">
				  <image src="http://jyy.wtvxin.com/static/images/icons/vy.png" alt="" class="circle_img"></image>
				  <view class="mt1 flex1 font18">分享微信好友</view>
			  </view>
			  <!-- #endif -->
			
				<view class="flex flexColumn flexAlignCenter" @click="saveImg">
					<image src="http://jyy.wtvxin.com/static/images/icons/quan.png" alt="" class="circle_img"></image>
					<view class="mt1 flex1 font18">分享到朋友圈</view>
				</view>
			 
		  </view>
		  <!-- 保存海报 -->
		  <view class="mask" v-if="showImg" @catchtouchmove="true"></view>
		  <!-- #ifndef H5-->
		  <view class="imgbox" v-if="showImg">
			<canvas canvas-id="myCanvas" disable-scroll="true" @touchmove="touchMove" class="share-canvas" style="width:100%;height:100%;" v-if="!hasimg"></canvas>
			<image :src="saveImgurl" alt="" v-else style="width:100%;height:100%;"></image>
		  </view>
		  <!-- #endif -->
		 <!-- #ifdef H5-->
		  <view class="imgbox" v-if="showImg">
			<image :src="shareImgUrl" alt="" style="height:100%;width:100%;"></image>
		  </view>
		  <!-- #endif -->
		  
		   <!-- #ifdef H5-->
		   <view class="saveBtn" v-if="showImg" @click="H5share">长按图片保存</view>
		   <!-- #endif -->
		   <!-- #ifndef H5-->
		   <view class="saveBtn" v-if="showImg" @click="Wxshare">保存相册分享到朋友圈</view>
		   <!-- #endif -->
  </view>
</template>

<script>
import {post} from '@/common/util.js'
import {
		pathToBase64,
		base64ToPath
	} from '@/common/image-tools.js';
 //#ifdef H5
import html2canvas from 'html2canvas';
//#endif
export default {
  data () {
    return {
      userId:"",
      token:"",
      tel:"",
      Avatar:"",
      info:{},
      isShowShare:false,
      showImg:false,
      bgurl:"",
      codeurl:"",
      avaurl:"",
      hasimg:false,
      saveImgurl:"",
	  shareImgUrl:'',//h5分享好友图片
	  disabled: false,
	  canvasWidthPx:300,
	  canvasHeightPx:500,
    }
  },

  onLoad(){
    
  },
  onShow(){
    this.userId = uni.getStorageSync("userId");
    this.token = uni.getStorageSync("token");
    this.hasimg=false;
    this.showImg=false;
    this.isShowShare=false;
    this.InviteFriends();
    this.GetCenterInfo();
  },

  methods: {
	  touchMove(){
		  console.log("jinzhi")
	  },
    showShare(){
      this.isShowShare=true;
    },
    cancelShare(){
      this.isShowShare=false;
    },
	sharePlus(){
		console.log(this.codeurl,"app分享微信好友拉！！！！！！")
		uni.share({
		    provider: "weixin",
		    scene: "WXSceneSession",
		    type: 0,
		    href: "http://shop.dadanyipin.com/#/pages/tabBar/index/index?inviteCode="+this.info.ReferralCode,
		    title: "大单易拼等你来！",
		    summary: "我正在使用大单易拼，赶紧跟我一起来体验！",
		    imageUrl: this.codeurl,
		    success: function (res) { 
		        console.log("success:" + JSON.stringify(res));
		    },
		    fail: function (err) {
		        console.log("fail:" + JSON.stringify(err));
		    }
		});
	},
    saveImg(){
      this.showImg=true
      this.isShowShare=false
	  //#ifndef H5
	  let tempTimeOut = setTimeout(()=>{
		  this.drawCanvas()
		  clearTimeout(tempTimeOut)
	  },100)
	  //#endif
	  //#ifdef H5
	  html2canvas(document.getElementById("bb_canvas"), {
	  	allowTaint: true,
	  	taintTest: false,
	  	useCORS: true,
	  }).then((canvas) => {
	  		let shareImgUrl = canvas.toDataURL("image/png");//canvas画布导出图片地址
	  		this.shareImgUrl = shareImgUrl;
	  });
	  //#endif
    },
	blur() {
		this.disabled = true;
	},
	copybtn() {
		// #ifdef  H5
		let url = document.getElementsByTagName("input")[0];
		url.select(); // 选择对象
		document.execCommand("Copy");
		uni.showToast({
			icon: "none",
			title: "复制成功"
		})
		// #endif
		// #ifdef  MP-WEIXIN
		let _this = this;
		uni.setClipboardData({
			data: _this.info.ReferralCode,
			success: function() {
				uni.showToast({
					icon: 'none',
					title: "复制成功"
				})
			}
		});
		// #endif
	},
	H5share() {
		uni.showToast({
			icon: "none",
			title: "请长按保存图片"
		})
	},
	// Wxshare() {
	// 		let _this = this
	// 		let aa = uni.getFileSystemManager();
	// 		 aa.writeFile({
	// 		   filePath:uni.env.USER_DATA_PATH+'/test.png',
	// 		   data: _this.qrimg.slice(22),
	// 		   encoding:'base64',
	// 		   success: res => {
	// 		     uni.saveImageToPhotosAlbum({
	// 		       filePath: uni.env.USER_DATA_PATH + '/test.png',
	// 		       success: function (res) {
	// 		         uni.showToast({
	// 		           title: '保存成功',
	// 		         })
	// 		       },
	// 		       fail: function (err) {
	// 		         //需要用户授权设置
	// 				if (err.errMsg === "saveImageToPhotosAlbum:fail:auth denied" || err.errMsg === "saveImageToPhotosAlbum:fail auth deny") {
	// 					console.log('用户一开始拒绝了，我们想再次发起授权')
	// 					// 用户授权设置
	// 					uni.showModal({
	// 						title: '提示',
	// 						content: '需要您授权保存相册',
	// 						showCancel: false,
	// 						success:modalSuccess=>{
	// 						  uni.openSetting({
	// 							success(settingdata) {
	// 							  console.log("settingdata", settingdata)
	// 							  if (settingdata.authSetting['scope.writePhotosAlbum']) {
	// 								uni.showModal({
	// 								  title: '提示',
	// 								  content: '获取权限成功,再次点击图片即可保存',
	// 								  showCancel: false,
	// 								})
	// 							  } else {
	// 								uni.showModal({
	// 								  title: '提示',
	// 								  content: '获取权限失败，将无法保存到相册哦~',
	// 								  showCancel: false,
	// 								})
	// 							  }
	// 							},
	// 							fail(failData) {
	// 							  console.log("failData",failData)
	// 							},
	// 							complete(finishData) {
	// 							  console.log("finishData", finishData)
	// 							}
	// 						  })
	// 						}
	// 					  })
	// 		       }
			     
	// 			    }
	// 			 })
	// 		     console.log(res)
	// 		   }, fail: err => {
	// 		     console.log(err)
	// 		   }
	// 		 })
	// 	},
	drawCanvas() {
		let _this = this
      if(!this.hasimg){
        const ctx = uni.createCanvasContext('myCanvas');
        //背景图片
        // #ifndef MP-WEIXIN
        var codeurl = this.info.InviteQRcode
        // #endif
		// #ifdef MP-WEIXIN
		 var codeurl = this.codeurl
		// #endif
        var bgurl = this.bgurl
        var avaurl = this.avaurl
        var tel=this.tel 
        var code="邀请码："+this.info.ReferralCode
		console.log(bgurl,"bgurl")
		console.log(codeurl)
        //画布背景填色
        ctx.setFillStyle('#ffffff')
		ctx.fillRect(0, 350, 300, 500);
        // ctx.setFillStyle('#5A4ABA')
        // ctx.fillRect(0, 0, 300, 32);
        //图片
		// ctx.setFillStyle('#5A4ABA')
        ctx.drawImage(bgurl, 0, 0, 300,370);
        ctx.drawImage(avaurl, 12, 410, 50,50); //头像没有路径
		
        //说明文字
        ctx.setFontSize(12)
        ctx.setFillStyle('#333333')
        ctx.fillText(tel, 80, 420)
        ctx.setFontSize(9)
		ctx.setFillStyle('#5A4ABA')
		this.drawRoundedRect(ctx,"#7364ca","#7364ca",74,435,90,18,9);
        ctx.setFillStyle('#ffffff')
        ctx.fillText(code, 84, 447.5)
		
		ctx.rect(200, 400, 64,64)
		ctx.stroke()
		ctx.drawImage(codeurl, 200, 400, 64,64);
		
        ctx.draw(true,function(){
			uni.canvasToTempFilePath({
				canvasId: 'myCanvas',
				x: 0,
				y: 0,
				width: 300-12, //截取canvas的宽度 -10解决白边问题
				height: 500, //截取canvas的高度
				destWidth: 600,    //输出图片宽度
				destHeight: 1000,
				quality:1,
				success: function (res){
					console.log(res,"pppppppppppppp")
					_this.hasimg=true
					_this.saveImgurl=res.tempFilePath;
					console.log( _this.saveImgurl,"画布画图。。。")
				}
			})
		})
      }
    },
    Wxshare(){
		var _this=this
		uni.saveImageToPhotosAlbum({  //保存图片到相册
		  filePath: _this.saveImgurl,
		  success: function (result) {
			uni.showToast({
			  title: "图片保存成功！",
			  duration: 2000
			})
			console.log(result,"llllllllllllllll")
			// #ifdef MP-WEIXIN
			setTimeout(() => {
			  uni.navigateBack({})
			}, 2000);
			// #endif
			// #ifdef APP-PLUS
			uni.share({
			    provider: "weixin",
			    scene: "WXSenceTimeline",
			    type: 2,
			    imageUrl: _this.saveImgurl,
			    success: function (res) {
			        console.log("success:" + JSON.stringify(res));
			    },
			    fail: function (err) {
			        console.log("fail:" + JSON.stringify(err));
			    }
			});
			// #endif
		  }
		})
    },
    roundedRect(ctx,x,y,width,height,radius){
        if(width <= 0 || height <= 0){
            ctx.arc(x,y,radius,0,Math.PI*2);
            return;
        }
        ctx.moveTo(x+radius,y);
        ctx.arcTo(x+width,y,x+width,y+height,radius);
        ctx.arcTo(x+width,y+height,x,y+height,radius);
        ctx.arcTo(x,y+height,x,y,radius);
        ctx.arcTo(x,y,x+radius,y,radius);
    },
    drawRoundedRect(ctx,strokeStyle,fillStyle,x,y,width,height,radius){
        ctx.beginPath();
        this.roundedRect(ctx,x,y,width,height,radius);
        ctx.strokeStyle = strokeStyle;
        ctx.fillStyle = fillStyle;
        ctx.stroke();
        ctx.fill();
    },
    GetCenterInfo(){
      post('User/GetCenterInfo',{
        UserId:this.userId,
        Token:this.token
      }).then(res=>{
        this.tel = res.data.Mobile;
        this.Avatar=res.data.Avatar
        var _this=this
         uni.getImageInfo({
            src: "http://jyy.wtvxin.com/static/images/icons/inn.png",//服务器返回的图片地址 
            success: function (res) {
            //res.path是网络图片的本地地址
            _this.bgurl = res.path;
            },
            fail: function (err) {
            //失败回调
            }
        });
        uni.getImageInfo({
            src: this.Avatar,//服务器返回的图片地址 
            success: function (res) {
            //res.path是网络图片的本地地址
            _this.avaurl = res.path;
            },
            fail: function (err) {
            //失败回调
            }
        });
      })
    },
    InviteFriends(){
      post('User/InviteFriends',{
        UserId:this.userId,
        Token:this.token
      }).then(res=>{
        this.info=res.data;
        var _this=this
        uni.getImageInfo({
            src: this.info.InviteQRcode,//服务器返回的图片地址 
            success: function (res) {
            //res.path是网络图片的本地地址
			console.log(res.path,"邀请好友")
            _this.codeurl = res.path;
            },
            fail: function (err) {
            //失败回调
            }
        });
      })
    },
    copy(str){
      uni.showModal({
        title:'复制邀请码？',
        content:str,
        cancelColor:'#999',
        confirmColor:'#ff6f00',
        success(res){
          if(res.confirm){
           uni.setClipboardData({
              data: str,
              success (res) {
              
              }
            })
          }
        }
      })
    },

  },
  onShareAppMessage: function() {
	  console.log(this.info.ReferralCode,"this.info.ReferralCode")
    return {
      title: "大单易拼", //转发页面的标题
      path: '/pages/tabBar/index/index?inviteCode='+this.info.ReferralCode
    }
  },
  onPullDownRefresh(){
	  this.hasimg=false;
	  this.showImg=false;
	  this.isShowShare=false;
	  this.InviteFriends();
	  this.GetCenterInfo();
	  uni.stopPullDownRefresh()
  }
}
</script>

<style scoped lang='scss'>
  .inn_bg{
    width:750upx;
	height:900upx;
    background-image: linear-gradient(#5645b7, #7364ca);
    position: relative;
    .invite{
      width:750upx;top:100upx;height:auto;
      position: absolute;bottom:0;left:0;
    }
  }
  .ava{
    width:100upx;height:100upx;
	margin:0
  }
  .code_img{
    width:160upx;height:160upx;
  }
  .yy_ma{
    background: $primary;padding:2upx 15upx;border-radius: 20upx;
	font-size:24upx;
    color:#ffffff;
  }
  .yy_scan{
    background: $primary;color:#ffffff;border-radius: 30upx;
    width:280upx;margin-left:30upx;
    padding:5upx 0;text-align: center;
    display: inline-block;
  }
  .yy_scan_save{
	  background: $primary;color:#ffffff;border-radius: 30upx;
	  width:560upx;margin:50upx auto;
	  padding:5upx 0;text-align: center;
	  display:block;
  }
  .modal_mask{
    position: fixed;
    height:200upx;
	z-index:30;width:100%;
    background: #ffffff;
    bottom:0;
    .circle_img{
      width:96upx;height:96upx;
    }
    button{
      margin: 0;
      padding: 0;
      border: none;
      display: block;
      background: #fff;
      line-height:1.3;
      p{
        font-size: 28upx;
      }
      img{
        display: block;
        margin:0 auto;
        width:96upx;height:96upx;
        margin-bottom: 10upx
      }
    }
    button::after {
      border: 0;
    }
  }
.saveBtn{
  width: 100%;
  position: fixed;
  bottom: 0;
  height: 88upx;
  line-height: 88upx;
  background: #ff3333;
  color: #fff;
  text-align: center;
  z-index: 998;
}
.imgbox{
  width: 600upx;
  height:1000upx;
  position: fixed;
  top: 46%;
  left: 50%;
  transform: translate(-50%,-50%);
  z-index: 10;
  background: #fff;
  .share-canvas{
    width: 100%;
    height: 100%;
  }
  img{
    width: 100%;
    height: 100%;
  }
}
.emptybox{
	display: flex;flex-direction: column;
	justify-content: space-between;
	align-items: center;
	image{
		width:200upx;height:200upx;
	}
}
</style>

