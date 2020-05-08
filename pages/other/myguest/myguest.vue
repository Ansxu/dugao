<template>
  <div class="student bg_fff" style="min-height:100vh">
      <div class="pp3">
          <div class="card_gu">
              <div class="flex gu_num">
                    <p>
                      <span class="fb">{{info.TeamNum}}</span>
                      <span class="font22">总人数</span>
                    </p>
                    <p>
                      <span class="fb">{{info.JTNum}}</span>
                      <span class="font22">今日新增</span>
                    </p>
                    <p>
                      <span class="fb">{{info.ZTNum}}</span>
                      <span class="font22">昨日新增</span>
                    </p>
              </div>
              <div class="flex flexAlignCenter gu_ava" v-if="isFather">
                  <img :src="info.FatherData[0].Avatar" alt="" class="ava1">
                  <div class="mr2">
                      <p>{{info.FatherData[0].NickName}}</p>
                      <p class="font22 mt1">我的邀请人</p>
                  </div>
              </div>
          </div>
      </div>
	  <div class="fb p3 flex justifyContentBetween bb_tab_list">
		  <!-- <view class="bb_gu_tab active">一级好友</view>
		  <view class="bb_gu_tab">二级好友</view> -->
		  <div class="pw3">我的下级</div>
	  </div>
	  <div class="slider"></div>
      <div class="mt2 bg_fff pw3">
          <block v-if="hasData">
            <div class="p3 flex stu_item justifyContentBetween flexAlignCenter pw3" v-for="(item,index) in datalist" :key="index">
              <div class="flex flexAlignCenter">
                <img :src="item.Avatar" alt=""  class="ava">
                <span class="mr2 font30">{{item.NickName}}</span>
              </div>
              <span class="cg font22">{{item.CreateTime}}</span>
            </div>
          </block>
          <noData :isShow="noDataIsShow"></noData>
          <view class="loading" v-if="hasData">
            <load-more :loadingType="loadingType"></load-more>
          </view>
      </div>
  </div>
</template>

<script>
import {post} from '@/common/util.js'
import noData from "@/components/noData"; //没有数据的通用提示
// import LoadMore from '@/components/load-more';
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
      info:{},
      isFather:false,
    }
  },
  components: {
    noData,
		// LoadMore
  },
  onShow(){
    this.userId = wx.getStorageSync("userId")
    this.token = wx.getStorageSync("token")
    this.MyCustom();
  },
  methods: {
    //我的客户
    MyCustom(){
        post('User/MyCustom',{
            UserId:this.userId,
            Token:this.token,
            Page:this.page,
            PageSize:this.pageSize
        }).then(res=>{
          if(res.code==0){
            this.info=res.data;
            if(this.info.FatherData.length){
              this.isFather=true;
            }
            let _this = this;
            let len=res.data.TeamList.length;
            if (len > 0) {
              this.hasData = true;
              this.noDataIsShow = false;
            }
            if (len == 0&&this.page==1) {
              this.noDataIsShow = true;
              this.hasData = false;
            }
            if (this.page === 1) {
              this.datalist = res.data.TeamList;
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
      this.MyCustom();
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
  .stu_item{
    border-bottom: 1rpx solid #f5f5f5;
  }
  .ava{
    width:80rpx;height:80rpx;
  }
  .name_pill{
    color:#ffffff;background: #f4b644;
    font-size:20rpx;padding:2rpx 10rpx;
    margin-left:10rpx;border-radius:2rpx;
  }
  .card_gu{
    border-radius:25rpx;
    background: #fd6a4c;
    width:692rpx;
    // height:298rpx;
    color:#fff;
    .ava1{
      width:100rpx;height:100rpx;
    }
    .gu_num{
      height:175rpx;
      p{
        width:33%;
        display: flex;justify-content: center;align-items: center;
        flex-direction: column;
        span:first-child{
          font-size:35rpx;
        }
      }
    }
    .gu_ava{
      background: rgba(255,255,255,0.3);
      height:125rpx;
      padding:0 30rpx;
    }
  }
  .bb_tab_list{
	  padding-bottom:30upx;
  }
  .bb_gu_tab{
	  width:50%;text-align: center;
	  &.active{
		  color:#fd6a4c;
		  position: relative;
		  &:after{
			  content:'';
			  position: absolute;
			  width:80upx;
			  height:4upx;
			  background: #fd6a4c;
			  bottom:-30upx;
			  left:50%;
			  transform: translateX(-50%);
		  }
	  }
  }
</style>
