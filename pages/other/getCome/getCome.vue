<template>
  <div>
      <!-- <div class="order_title bg_fff flex justifyContentAround pp3 ca">
            <p v-for="(item,index) in menulist" :key="index" :class="{'active':activeIndex===index}" @tap="changeIndex(index)">{{item.Name}}</p>
      </div> -->
      <div class="jus-b ali-c time-box">
        <div class="time ali-c jus-c"  @tap="choseTime">
          <span>{{setUpDate}}</span>
          <img src="http://jyy.wtvxin.com/static/images/icons/sj.png" alt="" style="margin:0">
        </div>
        <p>
          <!-- <span v-if="activeIndex == 0">消费</span>
          <span v-else-if="activeIndex == 1">充值</span> -->
          <span>收益</span>
          ￥{{RechargeNumber}}</p>
      </div>
      <div v-if="hasData">
          <div class="list bp-box jus-b ali-c" v-for="(item, index) in datalist" :key="index">
            <div class="flex flexAlignCenter">
                <img :src="item.Avatar" alt="" class="ava">
                <div class="mr2">
                  <span>{{item.NickName}}</span>
                  <p>{{item.AddTime}}</p>
                </div>
            </div>
            <p class="cr">{{item.Change}}</p>
        </div>
      </div>
       <noData :isShow="noDataIsShow"></noData>
       <view class="loading" v-if="hasData">
        <load-more :loadingType="loadingType"></load-more>
      </view>
      <!--时间组件-->
      <pickerTime @success="success" :show.sync="showDate"></pickerTime>
  </div>
</template>

<script>
import {post} from '@/common/util.js'
import noData from "@/components/noData"; //没有数据的通用提示
import pickerTime from '@/components/pickerTime.vue'
// import LoadMore from '@/components/load-more';
export default {
  data () {
    return {
      activeIndex:0,
      // menulist:[{Id:1,Name:"消费记录"},{Id:2,Name:"充值记录"},
      // // {Id:3,Name:"提现记录"}
      // ],
      showDate:false,
      minDate:new Date().setFullYear(2019,0,1),
      currentDate:new Date().getTime(),
      setUpDate:"",//时间
      TypeId:1, //1.消费，2充值 3提现 
      RechargeNumber:0,//总数

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
  components: {
    noData,pickerTime,
	// LoadMore
  },
  onShow(){
    this.setBarTitle();
    //设置当前时间
    this.setDate()
    this.userId = wx.getStorageSync("userId")
    this.token = wx.getStorageSync("token")
    this.queryRecord();
  },
  methods: {
    setBarTitle() {
      wx.setNavigationBarTitle({
        title: "收益明细"
      });
    },
    changeIndex(i){
      this.activeIndex = i
      this.TypeId = i+1
      this.datalist = []
      this.setDate()//重置月份
      this.queryRecord()
      // console.log(this.TypeId)
    },
    choseTime(){
        this.showDate = true
    },
	success(value){
		this.setUpDate = value
		this.datalist = []
		this.page=1;
		this.queryRecord()
		console.log(value,"{{{{{{{{{{}}}}}}}}}}")
	},
    setDate(){
        let year = new Date().getFullYear()
        let month = new Date().getMonth()+1;
        month = month < 10 ? '0'+month : month;
        this.setUpDate = year+"-"+month
    },
    //查询充值提现
    queryRecord(){
        post('Recharge/IncomeDetails',{
            UserId:this.userId,
            Token:this.token,
            Date:this.setUpDate,
            Page:this.page,
            PageSize:this.pageSize
        }).then(res=>{
          if(res.code==0){
            this.RechargeNumber = res.data.AmountMon_hz;
            let _this = this;
            let len=res.data.list.length;
            if (len > 0) {
              this.hasData = true;
              this.noDataIsShow = false;
            }
            if (len == 0&&this.page==1) {
              this.noDataIsShow = true;
              this.hasData = false;
            }
            if (this.page === 1) {
              this.datalist = res.data.list;
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
            this.datalist.map(item=>{
                if(item.AddTime){
                    this.$set(item,"AddTime",item.AddTime.split("T")[0]+" "+item.AddTime.split("T")[1].slice(0,5))
                }
                if(item.CreateTime){
                    this.$set(item,"CreateTime",item.CreateTime.split("T")[0]+" "+item.CreateTime.split("T")[1].slice(0,5))
                }
            })
          }
        })
    }
},
  onReachBottom: function() {
    if (this.isLoad) {
      this.loadingType = 1;
      this.isOved = false;
      this.page++;
      this.queryRecord();
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

<style lang='scss' scoped>
	@import '../../../common/lz.css';
.list{
  height: 120rpx;
  border-bottom: 1rpx solid #ededed;
  div{
    span{
      font-size: 28rpx;
      color: #333;
    }
    p{
      margin-top: 15rpx;
      font-size: 20rpx!important;
      color:#999!important
    }
  }
  p{
    font-size: 28rpx;
  }
}
.time-box{
  height: 88rpx;
  font-size: 24rpx;
  color: #333;
  padding: 0 30rpx;
  .time{
    width: 170rpx;
    height: 44rpx;
    background-color: #ffffff;
    border-radius: 22rpx;
    img{
      width: 16rpx;
      height: 10rpx;
      margin-left: 10rpx
    }
  }
}
.order_title{
    padding:10rpx 0;
}
.active{
    color:#29a49f;
}
.order_title p{
    position:relative;
    width:50%;
    text-align: center;
    padding:10rpx;
}
.order_title p.active::after{
    position: absolute;
    content: "";
    height: 2px;
    width:80rpx;
    background: #29a49f;
    left:50%;
    transform: translateX(-50%);
    bottom: 0;
}
.ava{
  width:80rpx;height:80rpx;
}
</style>
