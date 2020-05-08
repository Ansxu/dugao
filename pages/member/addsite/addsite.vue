<template>
	<view class="content">
		<!-- 填写地址 -->
		<view class="defaultPage eadit__defaultPage">
			<view class="addAddress__weui-cells weui-cells mt0">
				<view class="weui-cell">
					<view class="weui-cell__hd">
						<label class="weui-label">收货人</label>
					</view>
					<view class="weui-cell__bd">
						<input type="text" class="weui-input" v-model="name" placeholder="请输入收货人姓名"  />
					</view>
				</view>
				<view class="weui-cell">
					<view class="weui-cell__hd">
						<label class="weui-label">手机号码</label>
					</view>
					<view class="weui-cell__bd">
						<input type="text" class="weui-input" v-model="tel" placeholder="请输入收货人手机号" />
					</view>
				</view>
				<view class="weui-cell" @click="choseSite">
					<view class="weui-cell__hd">
						<label class="weui-label">所在地区</label>
					</view>
					<view class="weui-cell__bd">
						<input type="text" class="weui-input" disabled="true" placeholder="请选择所在地区" v-model="pickerText"  />
					</view>
				</view>
				<view class="weui-cell flexAlignStart">
					<view class="weui-cell__hd">
						<label class="weui-label">详细地址</label>
					</view>
					<view class="weui-cell__bd">
						<textarea class="weui-Area" v-model="fullAddress" placeholder="道路、门牌号、小区、楼栋号、单元、室等" />
						</view>
				</view>
				<view class="weui-cell">
					<view class="weui-cell__bd">
						设为默认地址
					</view>
					<view class="weui-cell__ft text_r">
						<switch :checked="checked" @change="change" color="#89674c"/>
					</view>
				</view>
			</view>
			<view class="btnBox" style="padding:100upx 20upx">
				<button type="primary" class="btn_bb" @click="submit">{{buttonText}}</button>
			</view>
			<mpvue-city-picker v-if="hasData" :province="province" ref="mpvueCityPicker" :pickerValueDefault="cityPickerValueDefault" @onconfirm="onconfirm"></mpvue-city-picker>
		</view>
	</view>
</template>

<script>
	import {host,post,get} from '@/common/util.js';
	import mpvueCityPicker from '@/components/mpvue-citypicker/mpvueCityPicker.vue'
	import cityData from '@/common/city.data.js';
	export default {
		components: {
			mpvueCityPicker
		},
	  data () {
	    return {
	      token: "",
	      userId: "",
	      buttonText:'保存',
	      name: "", //收货人姓名
	      tel: "", //收货人电话
	      fullAddress: "", //详细地址
	      isDefault: 0,   //设为默认地址 
	      checked: false,
		  province:{},
	      ProvinceCode:0,
	      ProvinceName:"",
	      CityCode:0,
	      CityName:"",
	      DistrictCode:0,
	      DistrictName:"",
	      FullAddress:"",
	      address:"",
	      areaList:[],
		  cityPickerValueDefault: [0, 0, 1],  //默认选中
		  pickerText: '',  //选择的地址值
		  pickerTextArr:[],
		  code:"",  //地址code
		  id: "", //收货地址的id
		  hasData:false,
	    }
	  },
	  onLoad(e) {
		  this.userId = uni.getStorageSync("userId");
		  this.token = uni.getStorageSync("token");
	  	// #ifdef APP-PLUS
	  	console.log(e)
		console.log('获得地址id')
	  	this.id=parseInt(e.id)
		
		console.log(this.id)
		this.getprovinces();
		if(this.id){
		    this.buttonText= '确认修改';
		    this.GetAddressInfo()
		  }
	  	// #endif
	  },
	  onShow(){
	    this.userId = uni.getStorageSync("userId");
	    this.token = uni.getStorageSync("token");
	    // #ifndef APP-PLUS
	    this.id = this.$mp.query.id
		console.log('获得地址id')
		this.getprovinces();
		if(this.$mp.query.id){
		    this.buttonText= '确认修改';
		    this.GetAddressInfo()
		  }
	    // #endif
		
	    console.log(this.id,"idiiiii")
	  },
	  methods:{
	    initData(){
	      this.name = ''
	      this.Mobile = ''
	      this.isDefault = ''
	      this.ProvinceCode = ''
	      this.CityCode =''
	      this.DistrictCode = ''
	      this.FullAddress = ''
	      this.ProvinceName = ''
	      this.CityName = ''
	      this.DistrictName = ''
	      this.address = ''
	    },
	    choseSite(){
		  this.$refs.mpvueCityPicker.show();
	    },
	    //提交验证
	    yanzheng() {
	    	if (this.name == "" || this.tel == "" || this.fullAddress == "") {
	    		uni.showToast({
	    			title: "姓名，电话，详细地址不能为空",
	    			icon: "none",
	    			duration: 1000
	    		});
	    		return false;
	    	}
	    	if (this.name.length) {
	    		if (this.name.length > 6) {
	    			uni.showToast({
	    				title: "姓名的长度不能超过6位",
	    				icon: "none",
	    				duration: 1000
	    			});
	    			return false;
	    		}
	    	}
	    	if (!/^1[345678]\d{9}$/.test(this.tel)) {
	    		wx.showToast({
	    			title: "手机号不合法",
	    			icon: "none",
	    			duration: 1000
	    		});
	    		return false;
	    	}
	    	return true;
	    },
	    change(){
	      if(this.isDefault==0){
	        this.isDefault = 1
	      }else{
	        this.isDefault = 0
	      }
	      
	      // console.log(this.isDefault)
	    },
		//获取选择的地址code
		onconfirm(code) {
			console.log(code,"}}}}}}}}}")
			this.provincesCode=code[0];
			this.cityCode=code[1];
			this.quCode=code[2];
			this.pickerText=code[3];
			this.pickerTextArr = this.pickerText.split(' ')
			console.log(this.pickerTextArr)
		},
		//获取省集合
		async getprovinces() {
			this.province = await post("Area/GetArea", {
				Types: "Province"
			});
			this.hasData=true;
		},
	    async GetAddressInfo() {
	      var info = await post("Address/GetInfo", {
	        UserId: this.userId,
	        Token: this.token,
	        Id: this.id
	      });
	      if (info.code == 0) {
	        this.name = info.data.Consignee;
	        this.tel = info.data.Mobile;
	        this.pickerText = info.data.ProvinceName+" "+info.data.CityName+" "+info.data.DistrictName;
			this.pickerTextArr = this.pickerText.split(' ')
	        this.fullAddress=info.data.FullAddress;
	        this.isDefault=info.data.IsDefault;
	        if (this.id != "") {
	          this.provincesCode = info.data.ProvinceCode;
	          this.cityCode = info.data.CityCode;
	          this.quCode = info.data.DistrictCode;
	        }
	        if(info.data.IsDefault==1){
	          this.checked=true
	        }
	        if(info.data.IsDefault==0){
	          this.checked=false
	        }
	      }
	    },
	    //保存地址
	    submit() {
	    	if (this.yanzheng()) {
	    		if (this.id) {
	    			this.setAddressInfo();
	    		} else {
	    			this.AddAddress();
	    		}
	    	}
	    },
		//添加
		async AddAddress(){
			let result = await post("Address/AddAddress", {
			UserId: this.userId,
			Token: this.token,
			Consignee: this.name,
			Mobile: this.tel,
			IsDefault: this.isDefault,
			ProvinceCode: this.provincesCode,
			ProvinceName:this.pickerTextArr[0],
			CityCode: this.cityCode,
			CityName:this.pickerTextArr[1],
			DistrictCode: this.quCode,
			DistrictName:this.pickerTextArr[2],
			FullAddress: this.fullAddress,
			StreetCode: "",
			});
			if (result.code == 0) {
				uni.showToast({
					title: "添加成功",
					icon: "none",
					duration: 1000
				});
				let _this=this;
				setTimeout(function() {
					uni.navigateBack({})
				},1000);
			}
		},
		//修改收货地址
		async setAddressInfo() {
		  var info = await post("Address/UpdateAddress", {
		    UserId: this.userId,
		    Token: this.token,
		    Id: this.id,
		    Consignee: this.name,
		    Mobile: this.tel,
		    IsDefault: this.isDefault,
		    ProvinceCode: this.provincesCode,
		    CityCode: this.cityCode,
		    DistrictCode: this.quCode,
			ProvinceName:this.pickerTextArr[0],
			CityName:this.pickerTextArr[1],
			DistrictName:this.pickerTextArr[2],
		    FullAddress: this.fullAddress
		  });
		  if (info.code == 0) {
		    uni.showToast({
		      title: "修改成功",
		      icon: "none",
		      duration: 1000
		    });
			console.log(132131321313213)
			// setTimeout(function() {
			// 	uni.navigateBack({})
			// },1000)
		  }
		},
	  },
	}
</script>

<style lang="scss">
	@import "../../../common/dd_style.css";
.content{
	height: 100%;
	.bg_89674c{
		background: #cc9f68;
	}
}

</style>
