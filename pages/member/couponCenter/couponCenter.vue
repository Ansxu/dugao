<template>
  <div class="ticket">
     <block v-if="hasData">
      <div class="list jus-b" v-for="(item,index) in datalist" :key="index">
        <div class="left flex flexColumn">
			<div class="flex">
				<div class="price">
				  {{item.DiscountType==1?item.Denomination:item.Denomination*10}}<span>{{item.DiscountType==1?'元':'折'}}</span>
				</div>
				<div class="info flex flexColumn">
					<P>{{item.Name}}</P>
				    <span class="mt1">有效期至{{item.EndTime}}</span>
				</div>
			</div>
          <div class="coupoutag flexc back_col">{{item.DiscountType==1?'满减券':'折扣券'}}</div>
		  <div class="useinfo oneline" v-if="item.ShopName&&item.ShopId!=0">仅可购买{{item.ShopName}}店铺商品</div>
          <div class="useinfo oneline" v-else-if="item.ScopeOfUse">说明：{{item.ScopeOfUse}}</div>
        </div>
        <div v-if="item.IsMyAlready==0" class="right flexc back_col" @click="ReceiveCoupon(item.Id)">
          <div>
            <p>立即领取</p>
          </div>
        </div>
		<div v-else class="right flexc">
		  <div>
		   <image class="iconimg" src="http://shop.dadanyipin.com/static/my/ylq.png" mode="widthFix"></image>
		  </div>
		</div>
      </div>
     </block>
      <noData :isShow="noDataIsShow"></noData>
      <view class="loading" v-if="hasData">
        <load-more :loadingType="loadingType"></load-more>
      </view>
  </div>
</template>

<script>
import {post} from '@/common/util.js'
import noData from "@/components/noData"; //没有数据的通用提示
import LoadMore from '@/components/uni-load-more.vue';
export default {
  data () {
    return {
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
  onShow(){
    this.userId = uni.getStorageSync("userId")
    this.token = uni.getStorageSync("token")
    this.CouponCenter()
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
   
    //优惠券
    CouponCenter(){
      post('Coupon/CouponCenter',{
          UserId:this.userId,
          Token:this.token,
          Page:this.page,
          PageSize:this.pageSize
      }).then(res=>{
        if(res.code==0){
          let _this = this;
          let len=res.data.length;
          if (len > 0) {
            this.hasData = true;
            this.noDataIsShow = false;
            res.data.forEach(item=>{
              item.EndTime=item.EndTime.split(" ")[0];
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
    //领券
    ReceiveCoupon(id){
      post('Coupon/GetCoupon',{
          UserId:this.userId,
          Token:this.token,
          CouponId:id
      }).then(res=>{
         uni.showToast({
            title: res.msg,
            icon: 'none',
          })
      })
    },
  },
  onReachBottom: function() {
    if (this.isLoad) {
      this.loadingType = 1;
      this.isOved = false;
      this.page++;
      this.CouponCenter();
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
    padding: 50upx 0 0 25upx;
    position: relative;
    .price{
      color: #f00;
      font-size: 48upx;
      margin-right: 20upx;
      width:35%;
      span{
        font-size: 30upx!important;
        color: #f00;
      }
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
    .info{
      line-height: 1.2;
      text-align: left;
      p{margin-bottom: .1rem}
    }
    span{
      font-size: 24upx;
      color: #999;
    }
    .back_col{
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
      width: 100%;
      padding: 10upx 20upx;
      font-size: 24upx;
      color: #999;
      box-sizing: border-box;
      border-top: 1px dashed #eee;
    }
  }
  .right{
    width: 230upx;
    text-align: center;
	border-left: 1px dashed #e5e5e5;
    p{
      color: #fff;
      font-size: 38upx;
      font-weight: bold;
      span{
        font-size: 20upx
      }
    }
    span{
      font-size: 20upx;
      color: #fff;
    }
	.iconimg{ height: 100upx; width: 100upx;}
  }
}
.tab{
  position: relative;
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

</style>
