<template>
  <div class="bg_f2" style="min-height:100vh">
      <div class="search_inn bg_fff">
        <div class="sear_iner flex flexAlignCenter">
            <input type="text" :focus="true" placeholder="请输入要搜索的商品" class="flex1" v-model="keyword">
            <span class="sear_btn" @click="serchpro">
                <img src="http://jd.wtvxin.com/images/images/index/search.png" alt="" class="search">
            </span>
        </div>
      </div> 
      <!--展示搜索历史-->
      <div class="pw3" style="display:none">
          <div class="flex justifyContentBetween flexAlignCenter">
              <span>搜索历史</span>
              <img src="http://jd.wtvxin.com/images/images/icons/delete.png" alt="" class="del">
          </div>
          <div class="flex flexWrap">
              <span class="mt2 ser_iitem" v-for="(item,index) in 34" :key="index">煲仔饭</span>
          </div>
      </div>
      <!--搜索列表-->
    <div class="goods-box">
      <div class="xd">
        <div class="shai flex">
          <div :class="['flex1 flexc',item.active?'active':'']" @click="filter(index)" v-for="(item,index) in filterTab" :key="index">
            <span>{{item.name}}</span>
            <span v-if="item.isSortorder" :class="['filterBtn','f_'+item.sortorder]"><i class="icon-top"></i><i class="icon-down"></i></span>
          </div>
        </div>
      </div>
      <div class="goods jus-b flex-wrap" v-if="hasData">
        <div class="list" v-for="(item, index) in goodsList" :key="index" @click="goUrl('/pages/goodsSon/goodsDetail/main',item.Id)">
          <img class="img" :src="item.Pic" :alt="item.Name">
          <div class="text-box">
            <p class="tit oneline">{{item.Name}}</p>
            <div class="price">
              <span>￥</span><span>{{item.Price}}</span><span>￥{{item.MarketPrice}}</span>
            </div>
            <div class="carda ali-c jus-b">
              <span>已售{{item.SalesVolume}}</span>
              <img src="http://jd.wtvxin.com/images/images/index/shop_card.png" alt="">
            </div>
          </div>
        </div>
      </div>
      <noData :isShow="noDataIsShow"></noData>
      <view class="loading" v-if="hasData">
        <load-more :loadingType="loadingType"></load-more>
      </view>
    </div>
  </div>
</template>

<script>
import {post,get} from '@/utils'
import noData from "@/components/noData"; //没有数据的通用提示
import LoadMore from '@/components/load-more';
export default {
  components: {
		noData,
		LoadMore
  },
  data () {
    return {
      userId: "",
			token: "",
      title:"商品列表",
      shopid:"",
      keyword:"",
      hasData:false,
			noDataIsShow: false,//没有数据的提示是否显示
			page: 1,
      pageSize: 8,
      allPage: 0,
			count: 0,
			isLoad: false,
			isOved:false,       //显示已经到底了
			loadingType: 0, //0加载前，1加载中，2没有更多了
      goodsList:{},
      filterTab: [{
          name: "默认",
          sortname: "m",
          isSortorder: false,
          active: true
        },
        {
          name: "销量",
          sortorder: 0, //2：倒序；1:为顺序
          sortname: "s",
          isSortorder: true,
          active: false
        },
        {
          name: "价格",
          sortorder: 0, //2：倒序；1:为顺序
          sortname: "j",
          isSortorder: true,
          active: false
        }
      ],
      sortname: "m", //j：价格排序；s：销量排序；m：默认排序
      sFilter:0,//按销量
      pFilter:0//按价格
    }
  },
  onShow(){
    this.shopid = wx.getStorageSync("shopid");
    this.GetProductList();
  },
  methods: {
    goUrl(url,param){
      wx.navigateTo({
        url:url+'?id='+param
      })
    },
    async GetProductList(){
      let res=await post("Goods/GetProductList",{
        PageIndex: this.page,
        PageSize: this.pageSize,
        ShopId: this.shopid,
        SalesVolumeFilter: this.sFilter,
        PriceFilter: this.pFilter,
        Key: this.keyword
      })
      if(res.code==0){
          let _this=this;
					if (res.data.length > 0) {
						this.hasData = true;
						this.noDataIsShow = false;
					}
					this.count = res.count;
					if (this.count == 0) {
						this.noDataIsShow = true;
						this.hasData = false;
					}
					if (parseInt(this.count) % this.pageSize === 0) {
						this.allPage = this.count / this.pageSize;
					} else {
						this.allPage = parseInt(this.count / this.pageSize) + 1;
					}
					if (this.page === 1) {
						this.goodsList = res.data;
					}
					if (this.page > 1) {
						this.goodsList = this.goodsList.concat(
							res.data
						);
					}
					if (this.allPage <= this.page) {
						this.isLoad = false;
						this.loadingType = 2;
					} else {
						this.isLoad = true;
						this.loadingType = 0
					}
       }else{
				 wx.showToast({
          title: res.msg,
          icon: "none",
          duration: 1000
        });
			 }
    },
    filter(index){
      let _this=this;
      _this.filterTab.forEach(function(item, subIndex) {
        if (subIndex === index) {
          _this.$set(item, 'active', true);
          if (item.isSortorder) {
            if (item.sortorder == 0) {
              _this.$set(item, 'sortorder', 1);
              return false;
            } else if (item.sortorder == 1) {
              _this.$set(item, 'sortorder', 2);
              return false;
            } else if (item.sortorder == 2){
              _this.$set(item, 'sortorder', 1);
              return false;
            }
          }
        } else {
          _this.$set(item, 'active', false);
          _this.$set(item, 'sortorder', 0);
          return false;
        }
      });
      _this.sortname = _this.filterTab[index].sortname;
        if(_this.sortname=="s"){
          _this.sFilter=_this.filterTab[index].sortorder;
          _this.pFilter=0;
        }else if(_this.sortname=="j"){
          _this.sFilter=0;
          _this.pFilter=_this.filterTab[index].sortorder;
        }else{
          _this.sFilter=0;
          _this.pFilter=0;
        }
				_this.page = 1;
				_this.goodsList = {};
				_this.noDataIsShow = false;
				_this.isLoad = false;
				_this.isOved = false;
				_this.loadingType = 0; //0加载前，1加载中，2没有更多了
				_this.GetProductList();
    },
    serchpro(){
      this.page=1;
      this.GetProductList();
    }
  },
  onReachBottom: function() {
    if (this.isLoad) {
			this.loadingType = 1;
      this.isOved = false;
      this.page++;
      this.GetProductList();
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
  .search{
    width:28rpx;height:28rpx;
  }
  .search_inn{
   padding:30rpx;
  }
  .sear_iner{
    border:1rpx solid #ececec;border-radius: 30rpx;
    padding-left:30rpx;
    height:70rpx;
  }
  .sear_btn{
    background: #ff6f00;height:70rpx;
    width:100rpx;text-align: center;line-height: 70rpx;
    border-radius:0 30rpx 30rpx 0;
  }
  .del{
    width:32rpx;height:32rpx;
  }
  .ser_iitem{
    background: #f2f2f2;border-radius:25rpx;
    padding:10rpx 30rpx;
    margin-right:20rpx;
  }
  .goods-box{
    background-color: #fff;
    .goods{
      padding: 30rpx;
      background: #f2f2f2;
    .list{
      width: 335rpx;
      height: 525rpx;
      border-radius: 10rpx;
      overflow: hidden;
      margin-bottom: 20rpx;
      box-shadow: 0rpx 2rpx 5rpx 0rpx rgba(0, 0, 0, 0.1);
      background: #fff;
      .text-box{
        padding: 0 20rpx;
      }
      .carda{
        span{
          font-size: 22rpx;
          color: #999999;
        }
        img{
          width: 50rpx;
	        height: 50rpx;
        }
      }
      .img{
        width: 335rpx;
	      height: 342rpx;
      }
      .tit{
        color: #000000;
        line-height: 60rpx;
      }
      .price span:nth-child(1){
        font-size: 20rpx;
        color: #ff6f00;
        font-weight: 900;
      }
      .price span:nth-child(2){
        font-size: 36rpx;
        color: #ff6f00;
        font-weight: 900;
      }
      .price span:nth-child(3){
        font-size: 22rpx;
        color: #999;
        text-decoration:line-through;
        margin-left: 15rpx;
      }
    }
  }
  .shai{
    height: 70rpx;
    color: #000;
    font-size: 28rpx;
    .active{
      color: #ff6f00;
    }
    .filterBtn{
      display: block;
      width: 16rpx;
	    height: 22rpx;
      margin-left: 15rpx;
      position: relative;
      i{
        position: absolute;
        display: block;
      }
      .icon-top{
        top: 0;
        border-left: 8rpx solid transparent;
        border-right: 8rpx solid transparent;
        border-bottom: 10rpx solid #999;
      }
      .icon-down{
        bottom: 0;
        border-left: 8rpx solid transparent;
        border-right: 8rpx solid transparent;
        border-top: 10rpx solid #999;
      }
    }
    .f_1 .icon-top{
      border-bottom-color: #ff6f00
    }
    .f_2 .icon-down{
      border-top-color: #ff6f00
    }
  }
  .all{
    height: 100rpx;
    img{
      width: 378rpx;
	    height: 32rpx;
    }
  }
}
.loading{
  background: #f2f2f2!important
}
.bg_f2{
  background:#f2f2f2;
}
</style>
