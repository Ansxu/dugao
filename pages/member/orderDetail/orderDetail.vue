<template>
  <div class="ticket pw3" v-if="info.StatusName">
      <div class="bg_statu pp3 boxSize">
          <p class="order_statu mt1">{{info.StatusName}}</p>
          <!-- <p class="font22 mt1">剩余00:59:13自动取消订单</p> -->
      </div>
      <div class="or_list">
        <!-- <div class="pp2 flex justifyContentBetween  bg_fff bor_tit flexAlignEnd">
            <image src="http://jyy.wtvxin.com/static/images/icons/kc.png" alt="" class="kc_icon">
            <div class="flex flex1 flexAlignCenter">
                <div class="flex1">
                    <p class="cr">
                         [深圳市] 投递并签收，签收人：他人收 韵达，感谢使用 EMS经济快递，期待...
                    </p>
                    <p class=" cg mt1">2019-09-26 18:52:10</p>
                </div>
                <image src="http://jyy.wtvxin.com/static/images/icons/right.png" alt="" class="icon_right mr2">
            </div>
        </div> -->
        <div class="pp2 flex justifyContentBetween radius flexWrap flexAlignEnd bg_fff ">
            <image src="http://jyy.wtvxin.com/static/images/icons/lc.png" mode="aspectFit" alt="" class="icon_lc"></image>
            <div class="flex1">
                <p>
                    <span>{{info.ContactName}}</span><span class="mr5">{{info.Tel}}</span>
                </p>
                <p class="font24 cg mt1">{{info.Addr}}</p>
            </div>
        </div>
        <div class="or_item bg_fff radius">
            <div class="pp3 flex bor_tit" v-for="(item, index) in info.OrderDetails" :key="index" @click.stop="goUrl('/pages/product/productDetail/productDetail?id='+item.ProductId)">
                <image mode="aspectFit" :src="item.PicNo" alt="" class="shop mr2"></iamge>
                <div class="flex1 flex  mr2">
                    <div class="or_left flex flexColumn justifyContentBetween">
                      <p>{{item.ProductName}}</p>
                      <p class="c-999">{{item.SpecText}}</p>
                      <p class="cr font30">￥{{item.UnitPrice}}</p>
						          <text style="color: #ff6f00;">{{info.StatusName == item.OrderStatusName ? '' : item.OrderStatusName}}</text>
                    </div>
                    <div class="mr3 flex flexColumn flexAlignEnd">
                      <span>x{{item.Number}}</span>
                      <span class="tui_pill mt2" v-if="item.IsRefund!==0" @click.stop="navigate('member/afterSaleType/afterSaleType',{indexId:index,id:info.OrderNumber})">退款</span>
                    </div>
                </div>
            </div>
            <div class="bor_tit pp2">
                <p class="flex justifyContentBetween">
                    <span>支付方式</span>
                    <span>在线支付</span>
                </p>
                <p class="flex justifyContentBetween mt2">
                    <span>商品总价</span>
                    <span>¥{{info.TotalAmount}}</span>
                </p>
                <p class="flex justifyContentBetween mt2">
                    <span>优惠</span>
                    <span>¥{{info.DiscountedAmount}}</span>
                </p>
                <p class="flex justifyContentBetween mt2" v-if="info.IsNeedAudit==0">
                    <span>运费</span>
                    <span>¥{{info.ExpressPrice}}</span>
                </p>
            </div>
            <div class="flex justifyContentBetween mt1 pp2">
                <span>实付</span>
                <span class="cr">¥{{info.Total}}</span>
            </div>
        </div>
      </div>
      <!---订单信息-->
      <div class="bg_fff mt2 pp3 bor_tit radius order_posi">
          <div class="">
              <span class="order_title">订单信息</span>
          </div>
          <div class="cg mt2 order_info font24">
			  <!-- #ifdef H5 -->
			  <input type="text" class="font20 yy_ma mt1" @focus="blur()" :disabled="disabled" 
			   v-model="info.OrderNumber" style="opacity: 0;position: fixed;top: -10000px;">
			  <!-- #endif -->
              <p class="mt1">订单编号：{{info.OrderNumber}} <span class="copy" @click="cop()">复制</span> </p>
              <p class="mt1">创建时间：{{info.OrderTime}}</p>
              <!-- <p>取消时间：2019-12-20 09:18:30</p>
              <p>发货时间：2019-12-20 09:18:30</p> -->
              <p class="mt1">成交时间：{{info.Paytime}}</p>
			  <p v-if="info.OrderDetails[0].ConsumeCode">特 权 码  ：{{info.OrderDetails[0].ConsumeCode}}</p>
          </div>
      </div>
	  <!-- #ifndef MP-WEIXIN -->
      <div class="bg_fff pp2 flex justifyContentCenter flexAlignCenter radius mt2 order_posi" @click="goUrl('/pages/other/kefu/kefu?qqnum=996889692')">
          <image src="http://jyy.wtvxin.com/static/images/icons/kcf.png" alt="" class="icon_ch" mode="aspectFit"></iamge>
          <span>联系客服</span>
      </div>
	  <!-- #endif -->
	  <!-- #ifdef MP-WEIXIN -->
	  <button open-type="contact" @contact="btnConcat" class="bg_fff pp2 flex justifyContentCenter flexAlignCenter radius mt2 order_posi"
	   style="border:0!important;padding:20upx 0;background: #ffffff;line-height:1.9" >
	      <image src="http://jyy.wtvxin.com/static/images/icons/kcf.png" alt="" class="icon_ch" mode="aspectFit"></iamge>
	      <span class="font26">联系客服</span>
	  </button>
	  <!-- <button open-type="contact" class="WEIXIN_btn"></button> -->
	  <!-- #endif -->
      <div class="flex justifyContentEnd bg_fff mt2 bb_fix btnbox">
          <p class="btn btn_gray" v-if="info.StatusName=='已发货'||info.StatusName=='已收货'" @click="goUrl('/pages/member/logistics/logistics?orderNo='+info.OrderNumber)">查看物流</p>
          <p class="btn btn_gray" v-if="info.IsCancel==1" @click="chooseOrders(info.OrderNumber,1)">取消订单</p>
          <p class="btn btn_gray" v-if="info.IsDel==1" @click="chooseOrders(info.OrderNumber,2)">删除订单</p>
          <p class="btn btn_red" v-if="info.Ispay==1" @click="goUrl('/pages/card/pay?orderNo='+info.OrderNumber)">立即支付</p>
          <p class="btn btn_red" v-if="info.IsConfirmReceipt==1" @click="chooseOrders(info.OrderNumber,3)">确认收货</p>
      </div>
  </div>
</template>

<script>
import {switchPath,post,navigate} from '@/common/util.js'
export default {

  data () {
    return {
      navigate,
      info:{},
	  OrderNo:'',
	  disabled:false,
    }
  },
  onShow(){
	  // #ifndef APP-PLUS
	  this.OrderNo = this.$mp.query.id
	  // #endif
     this.getDetail()
  },
  onLoad(e){
	  // #ifdef APP-PLUS
		this.OrderNo = e.id
	 // #endif
  },
  methods: {
	  btnConcat(e){
		  console.log(e)
	  },
    getDetail(){
      post('Order/OrderDetails',{
        UserId:uni.getStorageSync("userId"),
        Token:uni.getStorageSync("token"),
        OrderNo:this.OrderNo
      }).then(res=>{
        this.info = res.data;
		console.log(this.info)
      })
    },
    //微信支付需参数
    async ConfirmWeiXinSmallPay(no){
      let result = await post('Order/ConfirmWeiXinSmallPay',{
        OrderNo:no,
        UserId:uni.getStorageSync("userId"),
        Token:uni.getStorageSync("token"),
        WxCode:uni.getStorageSync("wxCode"),
		WxOpenid:uni.getStorageSync("openId")
      })
      let payData=JSON.parse(result.data.JsParam)
      if(result.code==0){
        let _this=this;
        uni.requestPayment({
          timeStamp: payData.timeStamp,
          nonceStr: payData.nonceStr,
          package: payData.package,
          signType: payData.signType,
          paySign: payData.paySign,
          success(res) {
              uni.redirectTo({
                url: "/pages/card/pay?OrderNo="+no
              })
            },
          fail(res) {
            console.log(res);
            uni.redirectTo({
              url: "/pages/card/pay?OrderNo="+no+"&msg=fail"
            })
          }
        })
      }
    },
    chooseOrders(OrderNo,type){//确认取消
      if(type==1){
        var content="您确定要取消此订单吗？"
        var url="Order/CancelOrders"
      }else if(type==2){
        var content="您确定要删除此订单吗？"
        var url="Order/DeleteOrders"
      }else{
        var content="您确定收货成功吗？"
        var url="Order/ConfirmReceipt"
      }
      uni.showModal({
        title: '提示',
        cancelText:"再想想",
        content: content,
				cancelColor:'#999',
				confirmColor:'#ff6f00',
        success (res) {
          if (res.confirm) {
            post(url,{
              UserId:uni.getStorageSync("userId"),
              Token:uni.getStorageSync("token"),
              OrderNo:OrderNo,
            }).then(res=>{
              uni.showToast({
                icon:'none',
                title:res.msg,
				success() {
					uni.navigateBack({
						
					})
				}
              })
            })
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
    }, 
	blur() {
		this.disabled = true;
	},
    cop(){
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
		// console.log( _this.info.OrderNumber)
		uni.setClipboardData({
			data: _this.info.OrderNumber,
			success: function() {
				// console.log(123)
				uni.showToast({
					icon: 'none',
					title: "复制成功"
				})
			}
		});
		// #endif
        // uni.showToast({
        //   icon:'none',
        //   title: '复制成功',
        // })
        uni.setClipboardData({
          data: this.info.OrderNumber,
          success: function (res) {
            uni.getClipboardData({ 
              success: function (res) {
                console.log(res.data) // data
              }
            })
          }
        })
    },
    goUrl(url){
      uni.navigateTo({
        url:url
      })
    },
  },
  onShareAppMessage: function( options ){
  　　var that = this;
  　　// 设置菜单中的转发按钮触发转发事件时的转发内容
  　　var shareObj = {
  　　　　title: "转发的标题",        // 默认是小程序的名称(可以写slogan等)
  　　　　path: '/pages/tabBar/index/index',        // 默认是当前页面，必须是以‘/’开头的完整路径
  　　　　imageUrl: '',     //自定义图片路径，可以是本地文件路径、代码包文件路径或者网络图片路径，支持PNG及JPG，不传入 imageUrl 则使用默认截图。显示图片长宽比是 5:4
  　　　　success: function(res){
  　　　　　　// 转发成功之后的回调
  　　　　　　if(res.errMsg == 'shareAppMessage:ok'){
  				console.log("1111111111111111")
  　　　　　　}
  　　　　},
  　　　　fail: function(){
  		console.log("22222222222")
  　　　　　　// 转发失败之后的回调
  　　　　　　if(res.errMsg == 'shareAppMessage:fail cancel'){
  　　　　　　　　// 用户取消转发
  　　　　　　}else if(res.errMsg == 'shareAppMessage:fail'){
  　　　　　　　　// 转发失败，其中 detail message 为详细失败信息
  　　　　　　}
  　　　　},
  　　　　complete: function(){
  　　　　　　// 转发结束之后的回调（转发成不成功都会执行）
  			console.log("33333333333333")
  　　　　}
  　　};
  　　// 来自页面内的按钮的转发
  // 　　if( options.from == 'button' ){
  // 　　　　var eData = options.target.dataset;
  // 　　　　console.log( eData.name );     // shareBtn
  // 　　　　// 此处可以修改 shareObj 中的内容
  // 　　　　shareObj.path = '/pages/btnname/btnname?btn_name='+eData.name;
  // 　　}
  　　// 返回shareObj
  　　return shareObj;
  }
}
</script>

<style scoped lang='scss'>
  .ticket{
    padding-bottom:300upx;
  }
.back_col{
  background-color: #ff6f00!important;
}
.or_list{
  position: relative;top:180upx;left:0;
  .shop_logo{
    width:40upx;height:36upx;
  }
  .shop{
    width:161upx;height:161upx;
  }
  .or_item{
    margin-top:20upx;
    &:first-child{
      margin-top:0;
    }
    .or_left{
      width:88%;
      height:98%;
    }
  }
}
  .bor_tit{
      border-bottom:1upx solid #f5f5f5;
    }
  .btn{
    width:50%;height:88upx;text-align: center;line-height: 88upx;
    margin-left:20upx;border-radius: 5upx;
    flex: 1;
  }
  .btn_gray{
    color:#858585;
  }
  .btn_red{
    color:#ffffff;background:#ff6f00; 
  }
  .btnbox .btn:nth-child(2){
    color:#ffffff;background:#ff6f00;
  }
  .order_title{
   border-left:4upx solid #ff6f00;padding-left:20upx;
 }
 .order_info p{
   padding:5upx 0;
   display: flex;
 }
 .copy{
   padding:2upx 20upx 0 20upx;border:1upx solid red;color:#ff6f00;font-size:20upx;
   border-radius: 5upx;margin: 0 20rpx;
 }

 .bg_statu{
   width:750upx;background: #ff6f00;
   height:245upx;position: absolute;top:0;left:0;
   color:#ffffff;
 }
 .icon_lc{
   width:60upx;height:61upx;margin-right:20upx;
   margin-bottom:6upx;
 }
 .kc_icon{
   width:43upx;height:33upx;margin-right:20upx;
   margin-bottom:6upx;
 }
  .icon_ch{
    width:34upx;height:34upx;margin-right:15upx;
	margin-left:0
  }
  .btn_menu{
    height:80upx;
    width:50%;border-left:1px solid #f5f5f5;
    &:first-child{
      border-left:0;
    }
  }
  .radius{
    border-radius:15upx;
  }
  .tui_pill{
    width:86upx;font-size:22upx;padding:5upx 0;text-align: center;
    border:1upx solid #999999;color:#999999;border-radius: 10upx;
  }
  .bb_fix{
    position: fixed;width:100%;bottom:0;left:0;
  }
  .order_statu{
    font-size:38upx;
  }
  .order_posi{
    position: relative;top:180upx;left:0;
  }
  button::after{
  		border:none;
  }
</style>
