<template>
  <div class="wallet">
      <div class="wa_bg">
          <img src="http://shop.dadanyipin.com/static/my/gao.png" alt="" class="qiao">
          <div class="wa_mon flex flexColumn flexAlignCenter">
              <p>当前可提收益（元）</p>
              <p class="total_wa">{{info.KTAmount}}</p>
          </div>
      </div>
      <div :class="['mm_btn',info.KTAmount>0?'':'disable']" @click="towithdraw">提现</div>
	  <view class="pw3">
	  	<div class="wa_list bg_fff">
	  	    <div class="flex justifyContentBetween wa_item pp3">
	  	        <div class="flex flexAlignCenter">
	  	            <img src="http://jyy.wtvxin.com/static/images/icons/w1.png" alt="" class="ww_wa">
	  	            <span class="mr2">今日收益</span>
	  	        </div>
	  	        <span class="cr font30">{{info.JTAmount}}元</span>
	  	    </div>
	  	    <div class="flex justifyContentBetween  wa_item pp3">
	  	        <div class="flex flexAlignCenter">
	  	            <img src="http://jyy.wtvxin.com/static/images/icons/w2.png" alt="" class="ww_wa">
	  	            <span class="mr2">昨日收益</span>
	  	        </div>
	  	        <span class="cr font30">{{info.ZTAmount}}元</span>
	  	    </div>
	  	    <div class="flex justifyContentBetween  wa_item pp3">
	  	        <div class="flex flexAlignCenter">
	  	            <img src="http://jyy.wtvxin.com/static/images/icons/w3.png" alt="" class="ww_wa">
	  	            <span class="mr2">累计收益</span>
	  	        </div>
	  	        <span class="cr font30">{{info.LJAmount}}元</span>
	  	    </div>
			<div class="flex justifyContentBetween  wa_item pp3 flexAlignCenter" @click="switchPath('/pages/other/getCome/getCome',$event)">
				  <div class="flex flexAlignCenter">
					  <img src="http://jyy.wtvxin.com/static/images/icons/w4.png" alt="" class="ww_wa">
					  <span class="mr2">收益明细</span>
				  </div>
				  <view class="iconfont icon-arrow_r fz12"></view>
			</div>
	  	</div>
	  	<div class="wa_list bg_fff uni-mt10">
			<div class="flex justifyContentBetween  wa_item pp3 bg_fff flexAlignCenter" @click="switchPath('/pages/other/money/money??type=1',$event)">
			  <div class="flex flexAlignCenter">
				  <img src="http://jyy.wtvxin.com/static/images/icons/w5.png" alt="" class="ww_wa">
				  <span class="mr2">提现记录</span>
			  </div>
			  <img src="http://jyy.wtvxin.com/static/images/icons/arrow.png" alt="" class="icon_right">
		   </div>
	  	</div>
	  </view>
  </div>
</template>

<script>
import {post} from '@/common/util.js'
export default {
  data () {
    return {
      userId:"",
      token:"",
      info:{},//收益统计
    }
  },
  computed: {
    domStyle(){
      return 'top:'+(this.clientY*2)+'upx;left:'+(this.clientX*2)+'upx'
    }
  },
  onShow(){
    this.userId = uni.getStorageSync("userId")
    this.token = uni.getStorageSync("token")
    this.IncomeDetailsTZ();
  },
  methods: {
    switchPath(path,e){
      this.clientX = e.clientX
      this.clientY = e.clientY
      setTimeout(() => {
        this.clientX = 0
        this.clientY = 0
        uni.navigateTo({
          url:path
        })
      }, 0);
    },
    //收益统计
    IncomeDetailsTZ(){
      post('Recharge/IncomeDetailsTZ',{
        UserId:this.userId,
        Token:this.token
      }).then(res=>{
        this.info = res.data; 
        this.$store.commit("update", {
          Wallet:res.data.KTAmount
        });    
      })
    },
	towithdraw(){
		if(this.info.KTAmount>0){
			uni.navigateTo({
				url:'/pages/other/withdraw/withdraw?type=1'
			})
		}else{
			uni.showToast({
				title:'您当前的收益无法提现！',
				icon:'none'
			})
		}
	}

  },
}
</script>

<style scoped lang='scss'>
  .wa_bg{
    height:535upx;
    width:100%;
    background: #ff3333;
    position: relative;
    .qiao{
      width:451upx;height:336upx;
      position: absolute;z-index:20;
      top:80upx;left:50%;transform: translateX(-50%)
    }
    .total_wa{
      font-size:100upx;
    }
    .wa_mon{
      color:#ffffff;
      width: 100%;
      position: absolute;
      top:250upx;
      left:0;
    }
  }
  .mm_btn{
    width:379upx;height:70upx;
    background:#ffa800;color:#ffffff;
    border-radius:30upx;text-align: center;line-height: 70upx;
    position: relative;top:-50%;left:50%;transform: translate(-50%,-50%)
  }
  .mm_btn.disable{
	  background-color: #ccc;
  }
  .wa_list{
	border-radius: 12upx;
    .ww_wa{
      width:44upx;height:44upx;margin-right:20upx
    }
    .wa_item{
        border-bottom:1px dashed #f5f5f5;
    }
	.wa_item::last-child{
		 border-bottom:none
	}
  }
  .icon_right{
	  width:12upx;height:22upx;
	  margin:0
  }

</style>
