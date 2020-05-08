<template>
  <view style="padding-bottom:120upx">
    <radio-group class="radio-group" @tap="radioChange"  v-if="list.length>0">
      <view class="list bpr-box" v-for="(item, index) in list" :key="index" @click="choseAddress(index)">
        <view class="jus-b" ><span class="name">{{item.Consignee}}</span><span>{{item.Mobile}}</span></view>
        <view class="address">{{item.Address}}</view>
        <view class="ali-c jus-b foot gou flex justifyContentBetween flexAlignCenter">
          <label @click.stop="changeDefault(index)">
              <radio class="radio" color="#FF3333" :checked="item.IsDefault==1">
                <text>默认地址</text>
              </radio>
          </label> 
          <view class="ali-c flex justifyContentBetween flexAlignCenter">
            <view class="ali-c btt flex flexAlignCenter" @click.stop="editSite(item.Id)">
              <image class="write" src="http://jyy.wtvxin.com/static/images/icons/write.png" alt=""></image>
              <span>编辑</span>
            </view>
            <view class="ali-c btt flex flexAlignCenter" @click.stop="Delete(item.Id,index)">
              <img class="delete" src="http://jyy.wtvxin.com/static/images/icons/del.png" alt="">
              <span>删除</span>
            </view>
          </view>
        </view>    
      </view>
      </radio-group>
      <p class="nodata_log flex flexColumn flexAlignCenter" v-else>
          <image src="http://shop.dadanyipin.com/static/my/site.png" alt="" class="site_log"></image>
          <span class="cg mt2">还没有收货地址哦~</span>
          <span class="add_new" @tap="toAddSite()">新建地址</span>
      </p>
      <p
        class="ovedMsg"
        v-if="isOved && page>1"
        style="text-align:center;padding:20upx;font-size:26upx;color:#666;"
      >我也是有底线的</p>
      <p class="btnl" @tap="toAddSite()" v-if="list.length>0">添加收货地址</p>
  </view>
</template>

<script>
import {post} from '@/common/util.js'
// import { formatTime } from '@/utils/index'

export default {
  data () {
    return {
      page: 1,
      pageSize: 4,
      pagetype:"",//页面来源
      count:0,
      allPage:0,
      userId: "",
      token: "",
      isLoad:true,
	  isOved:false,
      list:[]
    }
  },
  onLoad(e) {
  	// #ifdef APP-PLUS
  	this.pagetype=e.pagetype
  	// #endif
  },
  onShow(){
    this.userId = uni.getStorageSync("userId");
    this.token = uni.getStorageSync("token");
   // #ifndef APP-PLUS
    this.pagetype=this.$root.$mp.query.pagetype||'';
   // #endif
    uni.setStorageSync("addressinfo",'');
    this.list = []
    this.page = 1
    this.geSiteList()
  },
  methods: {
    
    async geSiteList(){
      const res = await post('Address/AddressList',{
        UserId: this.userId,
        Token: this.token,
        Page: this.page,
        PageSize: this.pageSize
      })
      if(res.code==0){
        this.count = res.count
        if(this.page == 1){
          this.list = []
        }
        if(parseInt(this.count) % this.pageSize == 0){
          this.allPage = this.count / this.pageSize
        }else{
          this.allPage = parseInt(this.count / this.pageSize) + 1
        }
        if(this.allPage > this.page){
          this.isLoad = true;
        }else{
          this.isLoad = false
        }
        this.list = this.list.concat(res.data)
      }
    },
    radioChange(e) {
      //设置选中样式
        var arrs = this.list;
        var that = this;
        for (const x in arrs) {
          if (arrs[x].id == e.target.value) {
            arrs[x].checked = true;
          } else {
            arrs[x].checked = false;
          }
        }
    },
    changeDefault(i) {
      console.log('111111111111')
      //设置默认
      const params = {
        Id: this.list[i].Id,
        UserId: this.userId,
        Token: this.token
      };
      post("Address/SetDefaultaddress", params)
      
    },
     Delete(id, index) {
      //删除地址
      const that = this;
      uni.showModal({
        title: '您确定删除该收货地址吗？',
        content: '删除后无法恢复',
        showCancel: true,
        cancelText: '取消',
        cancelColor: '#000000',
        confirmText: '确定',
        confirmColor: '#29a49f',
        success: (result) => {
          if(result.confirm){
              this.SureDel(id,index)
          }
        },
        fail: ()=>{},
        complete: ()=>{}
      });
    },
    SureDel(id,index){
      post(
            "Address/DeleteAddress",
            {
              Id: id,
              UserId: this.userId,
              Token: this.token
            }
          ).then(res => {
            if (res.code === 0) {
              uni.showToast({
                title: "删除成功!",
                success:()=>{
                  this.list.splice(index, 1)
                }
              });
            }
          });
    },
    editSite(id){
		console.log(id)
       uni.navigateTo({
        url:'/pages/member/addsite/addsite?id='+id
      })
    },
    toAddSite(){
      uni.navigateTo({
        url:'/pages/member/addsite/addsite'
      })
    },
    choseAddress(i){
      if(this.pagetype == 'confirm'){
        uni.setStorageSync("addressinfo",this.list[i]);
        uni.navigateBack()
      }
    }
  },
  onReachBottom() {
      console.log("ddddd");
      //加载更多
      console.log(this.allPage,this.page,this.isLoad)
      if (this.isLoad) {
        this.page++;
        this.geSiteList()
      } else {
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
.nodata_log{
  padding:200upx 0;
}
.bpr-box{
	border-radius: 15upx;
	background: #ffffff;
}
.add_new{
  margin-top:80upx;
  width:200upx;
  border:1upx solid #ff3333;border-radius:8upx;
  color:#ff3333;
  height:60upx;line-height: 60upx;
  text-align: center;
}
.site_log{
  width:273upx;height:363upx;
}
.btnl{
  width: 100%;
	height: 100upx;
  background-color: #ff3333;
  text-align: center;
  line-height: 100upx;
  position: fixed;
  bottom: 0;
  font-size: 30upx;
  color: #fff;
  margin:auto;
}
.list{
  margin: 20upx 30upx 0;
  padding: 40upx 20upx 0;
  .btt{
    margin-left: 50upx
  }
  .foot{
    height: 100upx;
  }
  .address{
    line-height: 80upx;
    border-bottom: 1upx solid #ededed;
    color: #333
  }
  .name{
    font-size: 28upx;
    color: #3c3c3c;
  }
  .radio{
    transform: scale(0.7);
    position: relative;
    left: -30upx;
    text{  
      font-size: 40upx
    }
  }
  .write{
    width: 32upx;
    height: 31upx;
    margin-right: 10upx
  }
  .delete{
    width: 32upx;
    height: 32upx;
    margin-right: 10upx
  }
}
</style>
