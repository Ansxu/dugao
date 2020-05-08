<template>
  <div class="editpage">
      <div class="list-box bg_fff">
        <div class="list ali-c jus-b list_img flex" >
          <span>昵称</span>
          <div class="flex">
            <input type="text" placeholder="请输入" v-model="userNick" style="width:600upx" maxlength="16">
          </div>
        </div>
      </div>
      <div class="pp3 cr dec">
        *1~16个字符
      </div>
      <div class="btn" @click="EditUserNick">保存</div>
  </div>
</template>

<script>
import {post} from '@/common/util'
export default {
  data () {
    return {
      userId:"",
      token:"",
      userNick:""
    }
  },
  onLoad(e){
    this.userId = uni.getStorageSync("userId")
    this.token = uni.getStorageSync("token")
    this.userNick=e.nick;
  },
  methods: {
    //编辑昵称
    EditUserNick(){
      if(this.userNick){
        post('User/EditUserNick',{
          UserId:this.userId,
          Token:this.token,
          UserNick:this.userNick
        }).then(res=>{
          uni.showToast({
            title: res.msg,
            icon: 'none',
          })
          setTimeout(() =>{
            uni.navigateBack();
          },1500)
        })
      }else{
        uni.showToast({
          title: "请输入昵称",
          icon: 'none',
        })
      }
    },

  },
}
</script>

<style lang='scss' scoped>
.list-box{
  margin-top:20upx;
  .list{
    height: 88upx;
    line-height: 88upx;
    padding:0 30upx;
    display: flex;justify-content: space-between;align-items: center;
    border-bottom: 1upx solid #ededed;
  }
  .list_img{
    span{
      font-size: 28upx;
      color: #333
    }
    img{
      width: 11upx;
      height: 20upx;
      margin-left:10upx;
    }
  }
}
.text_fl{
  height:200upx;
}
.dec{
	padding-left: 30upx;
	padding-top: 20upx;
}
.btn{
  background: #ff3333;
  height:80upx;height:80upx;line-height: 80upx;width:690upx;margin: 0 auto;color:#ffffff;border-radius: 15upx;
  margin-top:50upx;
  text-align: center;
}
.editpage /deep/ .uni-popup-middle{
  padding: 0 !important;
  width: 480upx;
  .modal-head{
    font-size: 32upx;
    padding: 20upx;
  }
  .modal-content{ 
    padding: 0 20upx 20upx;
    input{
      height: 80upx; width: 100%;
    }
  }
}
</style>
