<template>
  <view class="sertype">
      <view class="mt2 bg_fff pp3 flex justifyContentBetween">
          <image :src="info.PicNo" alt="" class="shop mr2"></image>
         <view class="flex1 mr2">
              <view class="uni-bold">{{info.ProductName}}</view>
              <view class="cg font24 mt1 color_gray">{{info.SpecText}}</view>
			  <view class="cg font24 mt1 color_red">￥{{info.ActualPay}}元</view>
          </view>
      </view>
      <view class="pw3 mt2 bg_fff">
          
          <view class="menu_item flex justifyContentBetween flexAlignCenter" v-if="false">
              <view>货物状态</view>
              <view class="flex flex1 flexAlignCenter">
                  <input type="text" placeholder="请选择" disabled class="flex1 text_right">
                  <img src="http://jyy.wtvxin.com/static/images/icons/right.png" alt="" class="icon_right mr2">
              </view>
          </view>
          
          <view class="menu_item flex justifyContentBetween flexAlignCenter">
              <view>{{type==1?'换货':'退款'}}原因</view>
              <view class="flex flex1 flexAlignCenter"  @click="showReason">
                  <input type="text" placeholder="请选择" disabled class="flex1 text_right font26" v-model="typeTxt">
                  <text class="iconfont icon-arrow_r"></text>
              </view>
          </view>
          <view class="menu_item flex justifyContentBetween flexAlignCenter" v-if="type!=1">
              <view>退款金额</view>
              <view class="cr">¥{{info.ActualPay}}</view>
          </view>
          <view class="mt2">
              <view>{{type==1?'换货':'退款'}}说明</view>
			  <p class="sign" v-show="!showTextArea"  @click="showTextArea = true" :class="RefundContent.length>0?'well_color1':'well_color2'">{{RefundContent || '请输入说明详情'}}</p>
              <textarea class="sign" :focus="showTextArea" style="padding:10upx 3upx;" placeholder="请输入说明详情" v-model="RefundContent" @focus="showTextArea = true" @blur="showTextArea = true" v-show="showTextArea"></textarea>
          </view>
      </view>
      <view class="mt2 bg_fff pp3" v-if="false">
        <view>上传凭证（不超过5张）</view>
        <view class="fed_pic flex flexWrap">
          <view v-for="(item,index) in 5" :key="index" class="picbox">
            <image src="http://jyy.wtvxin.com/static/images/icons/add3.png" alt="" class="pic_itim"></image>
          </view>
          <view class="picbox upBtnImg">
            <image src="http://jyy.wtvxin.com/static/images/icons/add3.png" alt="" class="pic_itim"></image>
          </view>
        </view>
      </view>
      <view class="sub_btn" @click="submitSerty()">提交</view>
      <pickers v-if="showEdit" :arr="list" :show.sync="showEdit" @success="gettype"></pickers>
  </view>
</template>

<script>
import {switchPath,post,get,navigate} from '@/common/util.js'
import pickers from '@/components/pickers';
export default {
  components: {pickers},
  data () {
    return {
      indexId:0,
      type:1,//1:申请换货;2:申请退货退款;3:仅退款（无需退货）
      OrderNumber:"",
      info:{},
	  showTextArea:true,
      RefundContent:"",//退款说明
      RefundReasonId:0,//退原因id
      showEdit:false,
      // list:[{code:0,message:'请选择'}],
	   list:[],
      typeTxt:"请选择",
    }
  },
	onLoad(e){
	 // #ifdef APP-PLUS
		 this.type = e.type
		 this.indexId  = e.indexId
		 this.OrderNumber  = e.id
	// #endif
	},
  onShow(){
	// #ifndef APP-PLUS
	this.indexId=this.$mp.query.indexId
	this.OrderNumber=this.$mp.query.id
	this.type=this.$mp.query.type
	// #endif
	// if(this.type == 1){
	// 	this.list = []
	// }else{
	// 	this.list = [{code:0,message:'请选择'}]
	// }
	this.list = []
    this.getDetail();

  },
  methods: {
    gettype(e){
		console.log(e,"//")
      if(e.code){
        this.RefundReasonId=e.code;
        this.typeTxt=e.message;
      }
    },
	showReason(){
		// if(this.type == 1){
		// 	this.GetRefundReason()
		// }else{
		// 	this.getCancelReason()
		// }
		this.GetRefundReason()
		this.showEdit = true
	},
	//退货原因
    getCancelReason(){
      get('Order/GetRefundReason',{}).then(res=>{
        this.list.push(...res.data)
      })
    },
	//换货原因
	GetRefundReason(){
		get('Order/GetRefundReason',{}).then(res=>{
		  this.list.push(...res.data)
		})
	},
    getDetail(){
      post('Order/OrderDetails',{
        UserId:uni.getStorageSync("userId"),
        Token:uni.getStorageSync("token"),
        OrderNo:this.OrderNumber
      }).then(res=>{
        this.info = res.data.OrderDetails[this.indexId];
      })
    },
    submitSerty(){
		if(this.RefundReasonId == 0){
			uni.showToast({
				title:'请选择原因!',
				icon:'none'
			})
			return false;
		}else{
			if(this.type==1){
			  var url='Order/ApplicationBarter'
			}else if(this.type==2){
			  var url='Order/ApplicationReturn'
			}else{
			  var url='Order/ApplicationRefund'
			}
			post(url,{
			  UserId:uni.getStorageSync("userId"),
			  Token:uni.getStorageSync("token"),
			  OrderNo:this.OrderNumber,
			  OrderItemId:this.info.Id,
			  RefundContent:this.RefundContent,
			  RefundReasonId: this.RefundReasonId,
			}).then(res=>{
			  if(res.code===0){
			    uni.showToast({
			      title:res.msg
			    })
			    setTimeout(()=>{
			      uni.navigateBack();
			    },1500)
			  }
			})
		}
    },
    goUrl(url){
      uni.navigateTo({
        url:url
      })
    },
  },
}
</script>

<style scoped lang='scss'>
	.icon-arrow_r{
		font-size:12px;
	}
  .shop{
    width:161rpx;height:161rpx;
  }
	.well_color2{
		color:gray;
	}
	.well_color1{
		color:#1a1a1a;
	}
  .menu_item{
    border-bottom:1rpx solid #f5f5f5;
    padding:25rpx 0;
  }
  .sign{
    height:150rpx;width:100%;margin-top:20rpx;font-size: 26upx;
  }
  .picbox{
    width:25%;
    box-sizing: border-box;
    display: flex;justify-content: center;
    margin-top:20rpx;
  }
  .pic_itim{
    width:144rpx;height:144rpx;
  }
  .sub_btn{
    background: #ff3333;color:#ffffff;width:100%;
    height:98rpx;line-height: 98rpx;text-align: center;
    position: fixed;bottom:0;
  }
  .sertype{
    padding-bottom:100rpx;
  }
</style>
