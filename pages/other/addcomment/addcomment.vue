<template>
  <div class="foot_list">
      <div class="or_list mt2">
        <div class="or_item mt2">
            <div class="flex or_main bg_fff">
                <img :src="shopInfo.PicNo" alt="" class="shop">
                <div class="flex1 flex flexAlignCenter mr2">
                    <div class="or_left flex flexColumn justifyContentBetween">
                      <div>
                        <p>{{shopInfo.ProductName}}</p>
                        <p class="c-999">{{shopInfo.SpecText}}</p>
                        <p class="cr font30 mt3">￥{{shopInfo.ActualPay}}</p>
                      </div>
                    </div>
                </div>
            </div>
            <!--评分-->
            <div class="flex flexAlignCenter pp3 bg_fff">
              <span class="mb1">评分</span>
              <span class="ml1 flex">
                  <div v-for="(item, index) in 5" :key="index" @click="cliScore(index)">
                    <img src="http://jyy.wtvxin.com/static/images/icons/xh.png" alt="" v-if="score>index" class="xing">
                    <img src="http://jyy.wtvxin.com/static/images/icons/xg.png" alt="" v-else class="xing">
                  </div>
              </span>
              <span class="mb1">{{score==5?'非常满意':score==4?'满意':score==3?'一般':score==2?'差':'很差'}}</span>
            </div>
            <!--遇到的问题-->
            <!-- <div class="mt2">
                <p class="cg font24">请选择您遇到的问题</p>
                <div class="mt2 flex flexWrap">
                    <p v-for="(item,oll) in plist" :key="oll" class="pp_item" :class="{'active':oll==1}">{{item.name}}</p>
                </div>
            </div> -->
            <textarea cols="30" rows="10" class="com_text mt2 bg_fff" v-model="text" placeholder="填写您对商品的评价~"></textarea>
            <div class="p3 bg_fff" style="border-bottom:1rpx solid #ededed">
            <!-- <div>上传图片（不超过5张）</div> -->
                <div class="fed_pic flex flexWrap">
                  <div v-for="(item,index) in imgList" :key="index" class="picbox">
                    <span class="" @click="deleteImg(index)">×</span>
                    <img :src="item.PicUrl" alt="" class="pic_itim">
                  </div>
                  <div class="picbox upBtnImg" @click="changeImg()" v-if="imgList.length<4">
                    <img src="http://jyy.wtvxin.com/static/images/icons/add2.png" alt="" class="pic_itim">
                  </div>
                </div>
            </div>
            <div class="porela" @click="pub()">提交</div>
        </div>
      </div>
      
  </div>
</template>

<script>
// import {switchPath,post} from '@/utils'
export default {

  data () {
    return {
      // plist:[{id:1,name:'商品问题'},{id:1,name:'客服问题'},{id:1,name:'包装问题'},{id:1,name:'物流问题'},{id:1,name:'其他'}],
      score:5,
      shopInfo:{},
      text:'',
      imgList:[],
	  OrderNo:'',
	  detailId:'',
    }
  },
  onLoad(){
    this.imgList = []
  },
  onShow(){
    console.log(this.$mp.query) 
	this.OrderNo = this.$mp.query.id
	this.detailId = this.$mp.query.detailId
    this.getDetail()
  },
  onLoad(e){
	  // #ifdef APP-PLUS
	  this.OrderNo = e.id
	  this.detailId = e.detailId
	  //#endif
  },
  watch: {
    imgList(e){
      console.log(e)
    }
  },
  methods: {
    pub(){
      if(this.text){
        post('Order/OrderComment',{
          UserId:wx.getStorageSync("userId"),
          Token:wx.getStorageSync("token"),
          OrderNo:this.OrderNo,
          CommentList:[{
            Id:this.detailId,
            Rank:this.score,
            ContentText:this.text,
            PicNo:JSON.stringify(this.imgList)
          }]
        }).then(res=>{
          if(res.code===0){
            wx.showToast({
              icon:'none',
              title:res.msg
            })
            setTimeout(() => {
              // wx.switchTab({
              //   url: '/pages/my/main'
              // })
              wx.navigateBack();
            }, 300);
          }
        })
      }else{
        wx.showToast({
          icon:'none',
          title:'您还没输入评论内容呢~'
        })
      }
    },
    deleteImg(index){
      this.imgList.splice(index,1)
    },
    changeImg(){
      let _this = this
      wx.chooseImage({
        count: 4-this.imgList.length,
        sizeType: ['original', 'compressed'],
        sourceType: ['album', 'camera'],
        success (res) {
          res.tempFilePaths.map(item=>{
            _this.imgList.push({PicUrl:"data:image/png;base64,"+wx.getFileSystemManager().readFileSync(item,"base64")})
          })
        }
      })
    },
    cliScore(index){//评分
      this.score = index+1
    },
    getDetail(){
      post('Order/OrderDetails',{
        UserId:wx.getStorageSync("userId"),
        Token:wx.getStorageSync("token"),
        OrderNo:this.OrderNo,
      }).then(res=>{
        res.data.OrderDetails.forEach(item=>{
          if(item.Id==this.detailId){
            this.shopInfo = item
          }
        })
      })
    },
    goUrl(url,param){
      wx.navigateTo({
        url:url+'?id='+param
      })
    },

    
  },
}
</script>

<style scoped lang='scss'>
.or_list{
  .shop{
    width:161rpx;height:161rpx;
  }
  .or_item{
    margin-top:20rpx;
    .or_left{
      height:100%;
    }
    .or_main{
      padding:20rpx 30rpx;
    }
  }
  .xing{
    width:42rpx;height:40rpx;
    margin-right:10rpx;
  }
  .mb1{
    margin-bottom: 10rpx;
  }
  
}
.pp_item{
  font-size:24rpx;
  padding:8rpx 20rpx;
  border:1rpx solid #ededed;border-radius: 10rpx;
  margin-right:25rpx;
  margin-top:10rpx;
  &:nth-child(4n){
    margin-right: 0;
  }
  &.active{
    border:1rpx solid #f00;color:#f00;
  }
}
.com_text{
  padding:20rpx;height:200rpx;width:100%;
}
.picbox{
    width:25%;
    box-sizing: border-box;
    display: flex;justify-content: center;
    margin-top:20rpx;
    position: relative;
    span{
      position: absolute;
      width: 32rpx;
      height: 32rpx;
      background-color: #ff3333;
      color: #fff;
      border-radius: 50%;
      top: -12rpx;
      right: 0rpx;
      // transform: rotate(45deg);
      // font-weight: 900;
      font-size: 34rpx;
      line-height:24rpx;
      text-align:center;
    }
  }
  .pic_itim{
    width:144rpx;height:144rpx;
  }
  .porela{
    width:690rpx;
    margin:0 auto;background:#338afb;color:#ffffff;
    height:88rpx;line-height:88rpx;text-align: center;border-radius:15rpx;
    margin-top:80rpx;
    // p{
    //   width:184rpx;height:64rpx;color:#444444;border:1rpx solid #444444;
    //   border-radius: 10rpx;text-align: center;line-height: 64rpx;
    //   position: absolute;right:0;
    // }
  }

</style>
