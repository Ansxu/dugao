<template>
  <view class="ticket">
      <view class="tab flex">
        <view class="flex1 flexc" :class="{'active':tabIndex==index}" v-for="(item, index) in tabList" :key="index" @click="cliTab(index)">{{item}}</view>
        <!-- #ifndef MP-WEIXIN -->
        <span :style="{'left':tabStyle+'upx'}"></span>
        <!-- #endif -->
		<!-- #ifdef MP-WEIXIN -->
		<span :style="{'left':tabStyle+'rpx'}"></span>
		<!-- #endif -->
      </view>
      <block v-if="hasData">
        <view class="list jus-b" v-for="(item,index) in datalist" :key="index">
          <view class="left">
            <view class="name">{{item.Title}}</view>
            <view class="time">有效期{{item.AddTime}}至{{item.EndTime}}</view>
            <div class="useinfo oneline" v-if="item.ShopName" style="left: 15upx;">仅可购买{{item.ShopName}}店铺商品</div>
            <div class="useinfo oneline" v-else-if="item.ScopeOfUse">说明：{{item.ScopeOfUse}}</div>
            <view class="coupoutag flexc" :class="tabIndex==0?'back_col':'use'">{{item.DiscountType==1?'满减券':'折扣券'}}</view>
          </view>
          <view class="right flexc" :class="tabIndex==0?'back_col':''">
            <view>
              <view class="num">{{item.DiscountType==1?item.Denomination:item.Denomination*10}}<span>{{item.DiscountType==1?'元':'折'}}</span></view>
              <span>满{{item.MeetConditions}}元可使用</span>
            </view>
          </view>
        </view>
      </block>
      <noData :isShow="noDataIsShow"></noData>
      <view class="loading" v-if="hasData">
        <load-more :loadingType="loadingType"></load-more>
      </view>
      <view class="btn_de" @click="goUrl('/pages/member/couponCenter/couponCenter')">领券中心</view>
  </view>
</template>

<script>
import {post} from '@/common/util.js'
import noData from "@/components/noData"; //没有数据的通用提示
import LoadMore from '@/components/uni-load-more.vue';
export default {
  data () {
    return {
		tabList:['未使用','已使用','已失效'],
		tabIndex:0,
		couponStatus:1,//0全部，1可用，2已使用，3已失效
		userId:"",
		token:"",
		hasData:false,
		noDataIsShow: false,//没有数据的提示是否显示
		page: 1,
		pageSize: 8,
		isLoad: false,
		isOved:false,       //显示已经到底了
		loadingType: 0, //0加载前，1加载中，2没有更多了
		datalist:{},
    }
  },
  computed: {
    tabStyle(){
		console.log(((750/this.tabList.length)*this.tabIndex)+(((750/this.tabList.length)-50)/2))
      return ((750/this.tabList.length)*this.tabIndex)+(((750/this.tabList.length)-50)/2)
    }
  },
  onShow(){
    this.userId = uni.getStorageSync("userId")
    this.token = uni.getStorageSync("token")
    this.page=1;
    this.CouponList()
  },
  components: {
    noData,LoadMore
  },
  methods: {
    goUrl(url){
      uni.navigateTo({
        url:url
      })
    },
    cliTab(index){
      this.tabIndex = index;
      this.couponStatus=index+1;
      this.page=1;
      this.noDataIsShow=false;
      this.hasData=false;
      this.CouponList();
    },
    //我的优惠券
    CouponList(){
      post('User/CouponList',{
          UserId:this.userId,
          Token:this.token,
          Page:this.page,
          PageSize:this.pageSize,
          Status:this.couponStatus
      }).then(res=>{
        if(res.code==0){
          let _this = this;
          let len=res.data.length;
          if (len > 0) {
            this.hasData = true;
            this.noDataIsShow = false;
            res.data.map(item=>{
              item.AddTime=item.AddTime.split("T")[0];
              item.EndTime=item.EndTime.split("T")[0];
            })
          }
          if (len == 0&&this.page==1) {
            this.noDataIsShow = true;
            this.hasData = false;
          }
          if (this.page === 1) {
            this.datalist = res.data;
          }
          if (this.page > 1) {
            this.datalist = this.datalist.concat(
              res.data
            );
          }
          if (len < this.pageSize) {
            this.isLoad = false;
            this.loadingType = 2;
          } else {
            this.isLoad = true;
            this.loadingType = 0
          }
          
        }
      })
    },

  },
  onReachBottom: function() {
    if (this.isLoad) {
      this.loadingType = 1;
      this.isOved = false;
      this.page++;
      this.CouponList();
    } else {
      this.loadingType = 2;
      if (this.page > 1) {
        this.isOved = true;
      } else {
        this.isOved = false;
      }
    }
  }
}
</script>

<style scoped lang='scss'>
.list::after{
  content:'';
  display: inline-block;
  position: absolute;
  top: -20upx;
  left: 440upx;
  width: 40upx;
  height: 40upx;
  border-radius: 50%;
  background-color: #f5f5f5;
}
.list::before{
  content:'';
  display: inline-block;
  position: absolute;
  bottom: -20upx;
  left: 440upx;
  width: 40upx;
  height: 40upx;
  border-radius: 50%;
  background-color: #f5f5f5;
}
.list{
  width: 690upx;
  height: 200upx;
  border-radius: 15upx;
  margin: 30upx;
  background-color: #fff;
  overflow: hidden;
  position: relative;
  .use{
    background-color: #d4d5d6!important
  }
  .left{
    width: 460upx;
    padding: 40upx 0 0 35upx;
    position: relative;
	
    .time{
      font-size: 24upx;
      color: #999;
    }
    .coupoutag{
      width: 128upx;
	  height: 40upx;
      border-radius: 0 0 24px 0;
      position: absolute;
      top: 0;
      left: 0;
      font-size: 24upx;
      color: #fff
    }
	.useinfo{
		position: absolute;
		bottom: 0;
		left: 0;
		width: 93%;
		padding: 10upx 20upx;
		font-size: 24upx;
		color: #999;
		box-sizing: border-box;
		border-top: 1px dashed #eee;
	}
  }
  .right{
    width: 230upx;
    background-color: #d4d5d6;
    text-align: center;
    .num{
      color: #fff;
      font-size: 56upx;
      font-weight: 900;
      span{
        font-size: 20upx
      }
    }
    span{
      font-size: 20upx;
      color: #fff;
    }
  }
}
.tab{
  height: 92upx;
  background-color: #fff;
  position: relative;
  .active{
    color: #f00
  }
  span{
    position: absolute;
    bottom: 0;
    transition: all .2s;
    height: 5upx;
    width: 50upx;
    background-color: #f00
  }
}
.back_col{
  background-color: #FF3737!important;
}
.btn_de{
  width:100%;position: fixed;bottom:0;
  height:88upx;line-height: 88upx;background: #FF3737;
  color:#ffffff;text-align: center;
}
</style>
