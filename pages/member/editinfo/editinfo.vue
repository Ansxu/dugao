<template>
  <div class="editpage">
      <div class="list-box bg_fff">
        <div class="ava_list">
          <span>头像</span>
          <div class="avatar" @click="uplLoadImg">
              <image class="img" v-if="Avatar" :src="Avatar" mode="aspectFill"></image>
              <image class="img" v-else src="http://shop.dadanyipin.com/static/default.png" mode="aspectFill"></image>
          </div>
        </div>
        <div class="list ali-c jus-b list_img flex" @click="switchPath('/pages/member/editNickName/editNickName?nick='+info.NickName)">
          <span>昵称</span>
          <div class="flex flexAlignCenter">
            <input type="text" placeholder="请输入" disabled v-model="info.NickName" class="flex1 text_right">
            <img src="http://jyy.wtvxin.com/static/images/icons/arrow.png" alt="">
          </div>
        </div>
        <div class="list ali-c jus-b list_img flex" >
          <span>ID</span>
          <div class="flex flexAlignCenter">
            <input type="text" placeholder="请输入" disabled v-model="info.Id" class="flex1 text_right">
          </div>
        </div>
        <div class="list ali-c jus-b list_img flex" >
          <span>手机号</span>
          <div class="flex flexAlignCenter">
            <input type="text" placeholder="请输入" disabled class="flex1 text_right" :value="info.Mobile">
          </div>
        </div>
        <div class="list ali-c jus-b list_img flex" @click="setsex">
          <span>性别</span>
          <div class="flex flexAlignCenter">
            <input type="text" placeholder="请选择" disabled v-model="Sexarr[Sex]" class="flex1 text_right">
            <img src="http://jyy.wtvxin.com/static/images/icons/arrow.png" alt="">
          </div>
        </div>
        <div class="list ali-c jus-b list_img flex" >
          <span>生日</span>
          <div class="flex flexAlignCenter">
            <picker mode="date" :value="Birthday" :start="startDate" :end="endDate" style="width: 460upx;text-align: right;" @change="bindDateChange">
            {{Birthday}}
            </picker>
            <img src="http://jyy.wtvxin.com/static/images/icons/arrow.png" alt="">
          </div>
        </div>
<!-- 		<div class="list ali-c jus-b list_img flex" >
		  <span>个性签名</span>
		  <div class="flex flexAlignCenter">
		    <input type="text" placeholder="请输入您的个性签名!" class="flex1 text_right" v-model="mysign">
		  </div>
		</div> -->
		<!-- <div class="list ali-c jus-b list_img flex" @click="BindRelation(info.IsBind)">
		  <span>邀请人</span>
		  <div class="flex flexAlignCenter">
			<input type="text" placeholder="未绑定" v-model="info.Inviter" disabled class="flex1 text_right">
			<img v-if="info.IsBind==1" src="http://jyy.wtvxin.com/static/images/icons/arrow.png" alt="">
		  </div>
		</div> -->
      </div>
      <div class="btn" @click="EditUserInfo">保存</div>
	  <!-- 弹出输入邀请人 -->
		<!-- <uni-popup :show="showPopupBind" v-on:hidePopup="hidePopup">
		  <div class="modal-head">填写邀请人</div>
		  <div class="modal-content">
			  <input type='text' placeholder="请输入您的邀请人" v-model="inviteCode" auto-focus/>
		  </div>
		  <div class="modal-footer flex justifyContentBetween">
			<div class="btn-cancel" @click="hidePopup">取消</div>
			<div class="btn-confirm" @click="onConfirmBind">确定</div> 
		  </div>
		</uni-popup> -->
  </div>
</template>

<script>
import {post,valPhone} from '@/common/util'
import { pathToBase64, base64ToPath } from '@/common/image-tools.js';
import uniPopup from '@/components/uni-popup/uni-popup.vue';
export default {
  data () {
    return {
      userId:"",
      token:"",
      info:{},
      Avatar:"",
      Avatarbese64:"",
      Sexarr:["保密","女","男"],
      Sex:0,
      Birthday:"",
      showPopupBind:false,
      inviteCode:"",
	  mysign:"",//个性签名
	  showPopupBind:false,
	  inviteCode:""
    }
  },
  components: {
    uniPopup
  },
  onLoad(){
  },
  onShow(){
    this.userId = uni.getStorageSync("userId")
    this.token = uni.getStorageSync("token")
    this.GetMemInfo();
  },
  computed: {
    startDate() {
      return this.getDate('start');
    },
    endDate() {
      return this.getDate('end');
    }
  },
  methods: {
    switchPath(url){
      uni.navigateTo({
        url
      })
    },
    GetMemInfo(){
      post('User/GetMemInfo',{
        UserId:this.userId,
        Token:this.token
      }).then(res=>{
        this.info = res.data;
        this.Avatar=this.info.Avatar;
        this.Sex=this.info.Sex;
        this.Birthday=this.info.Birthday;
      })
    },
    //上传头像
    uplLoadImg(){
		uni.chooseImage({
			count: 1,
			sizeType: ['compressed'],
			sourceType: ['album', 'camera'],
			success: (res) =>{
				// tempFilePath可以作为img标签的src属性显示图片
				this.Avatar=res.tempFilePaths[0];console.log(this.Avatar)
				this.UploadPhoto()
			} 
		})
    },
	async base64Img(arr) {
		const res = await pathToBase64(arr);
		return res;
	},
    async UploadPhoto(){
		let Avatarstr=await this.base64Img(this.Avatar);console.log(Avatarstr)
		post('User/UploadPhoto',{
			UserId:this.userId,
			Token:this.token,
			Avatar:Avatarstr
		}).then(res=>{
			this.Avatar=res.data;
			uni.showToast({
			  title: res.msg,
			})
		})
    },
	//绑定推荐关系（无推荐关系可绑定）
	BindRelation(e){
	  if(e==1){
		this.inviteCode="";
		this.showPopupBind=true;
	  }
	},
	//统一的关闭popup方法
	hidePopup: function() {
	  this.showPopupBind = false;
	},
	//确认绑定推荐人
	onConfirmBind(){
	  if(valPhone(this.inviteCode)){
		this.BindRelationMobile()
	  }
	},
	BindRelationMobile(){
	  post('Login/BindRelationMobile',{
		UserId:this.userId,
		Token:this.token,
		mobile:this.inviteCode
	  }).then(res=>{
		wx.showToast({
		  title: res.msg,
		  icon: "none"
		})
		this.hidePopup();
	  })
	},
    //性别
    setsex() {
      const that = this;
      uni.showActionSheet({
        itemList: that.Sexarr,
        success(res) { 
          that.Sex=res.tapIndex;
        },
        fail(res) {
          console.log(res.errMsg);
        }
      });
    },
    //日期
    bindDateChange(e) {
      this.Birthday = e.target.value
    },
    getDate(type) {
      const date = new Date();
      console.log(date);
      let year = date.getFullYear();
      let month = date.getMonth() + 1;
      let day = date.getDate();
      if (type === 'start') {
        year = year - 60;
      } else if (type === 'end') {
        year = year + 2;
      }
      month = month > 9 ? month : '0' + month;;
      day = day > 9 ? day : '0' + day;
      return `${year}-${month}-${day}`;
    },
    //编辑个人信息
    EditUserInfo(){
      post('User/EditUserInfo',{
        UserId:this.userId,
        Token:this.token,
        Birthday:this.Birthday,
        Sex:this.Sex
      }).then(res=>{
        uni.showToast({
          title: res.msg,
          icon: 'none',
        })
      })
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
  .ava_list{
    display: flex;justify-content: space-between;align-items: center;
    border-bottom: 1upx solid #ededed;padding:0 30upx;
    height:180upx;
  }
  .phone{
    color:#999999!important;
    font-size:26upx;margin-right:10upx;
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
.avatar{
  height:120upx;width:120upx;
  border-radius:50%;
  .img{
    width:120upx;height:120upx;border-radius:50%;
  }
}
.text_fl{
  height:200upx;
}
.btn{
  background: #ff6f00;
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
  .modal-footer{
    text-align: center;
    width: 100%;
    border-top: 1px solid #eee;
    div{ width: 50%; height: 80upx; line-height: 80upx; font-size: 30upx}
    div:hover{ background: #f5f5f5}
    .btn-cancel{ border-right: 1px solid #eee;}
    .btn-confirm{color: #ff6f00}
  }
}
</style>
