<template>
	<view>
		<view class="content">
			<view class="herebox">
				<text class="tit">定位到当前城市:</text><text class="here" @click="choosecity2(here)">{{here}}</text><text class="here" @click="choosecity2('全国')">全国</text>
			</view>
			<scroll-view scroll-y="true" class="scr0llbox" :scroll-into-view="toitem" scroll-with-animation=true :style="{'height':height+'px'}">
				<view class="item" v-for="(item,index) in citylist" :key="index">
					<view class="citytitle" :id="item.initial">{{item.initial}}</view>
					<view class="citybox">
						<view :class="['city',cityname==item1.name ? 'active' : '']" v-for="(item1,index1) in item.list" :key="index1" @click="choosecity(item1.name)">{{item1.name}}</view>
					</view>
				</view>
			</scroll-view>
		</view>
		<view class="zimubox">
			<view class="zimuname" v-for="(item,index) in citylist" :key="index" @click="chooseZM(item.initial)">
				{{item.initial}}
			</view>
		</view>
	</view>
</template>

<script>
	// #ifdef H5
	import {MP} from '@/common/map.js';//h5百度定位
	// #endif

	import {post,get,toLogin} from '@/common/util.js';
	import cityData from '@/common/cityname.js';
	export default {
		data() {
			return {
				citylist:cityData,
				height:"",
				toitem:'A',
				cityname:"",
				here:"定位中",//当前城市
				// #ifdef APP-PLUS
				//检测是否授权
				isIos: true,
				items: ['iOS', 'Android'],
				current: 0
				// #endif
				
				
			}
		},
		onLoad() {
			let res = uni.getSystemInfoSync()
			this.height = res.windowHeight-uni.upx2px(100);
			var _this=this
			// #ifdef MP-WEIXIN
			this.hasgps()
			// #endif
			// #ifdef APP-PLUS||MP-WEIXIN
			uni.getLocation({
			    type: 'wgs84',
				geocode: true,
			    success: function (res) {
					// #ifdef APP-PLUS
					var cityname=res.address.city.replace(/市/,'')
					_this.here=cityname
					// #endif
					// #ifdef MP-WEIXIN
					_this.wxGetCity(res.longitude,res.latitude)
					// #endif
			        // console.log(res);
			    },
				fail:function(){
					_this.here="定位失败"
					// #ifdef APP-PLUS
					uni.showModal({
					    content: '定位失败，请在设置中打开大单易拼的位置权限',
						showCancel: false,
					    success: function (res) {
					        if (res.confirm) {
					            console.log('用户点击确定');
					        }
					    }
					});
					// #endif
				}
			});
			// #endif
			//百度定位
			// #ifdef H5
			this.H5getcity()
			// #endif
		},
		onShow() {
			// #ifdef MP-WEIXIN
			var _this=this
			uni.getLocation({
			    type: 'wgs84',
				geocode: true,
			    success: function (res) {
					// #ifdef APP-PLUS
					var cityname=res.address.city.replace(/市/,'')
					_this.here=cityname
					// #endif
					// #ifdef MP-WEIXIN
					_this.wxGetCity(res.longitude,res.latitude)
					// #endif
			        // console.log(res);
			    },
				fail:function(){
					_this.here="定位失败"
					// #ifdef APP-PLUS
					uni.showModal({
					    content: '定位失败，请在设置中打开大单易拼的位置权限',
						showCancel: false,
					    success: function (res) {
					        if (res.confirm) {
					            console.log('用户点击确定');
					        }
					    }
					});
					// #endif
				}
			});
			// #endif
		},
		methods: {
			
			H5getcity(){
				var _this=this
				MP(1).then(BMap => {
					let myCity = new BMap.LocalCity()
					myCity.get(function (res) {
						var cityname=res.name.replace(/市/,'')
						_this.here=cityname;console.log(res,"$$$$$$$")
					})
				})
			},
			//小程序解析经纬度获取城市
			// #ifdef MP-WEIXIN
			wxGetCity(lon,lat){
				var _this=this
				wx.request({
					url:'https://api.map.baidu.com/reverse_geocoding/v3/?ak=3wwDKCk09o6hU0PK1605QUXOCBqGVHGx&location=' + lat + ',' + lon + '&output=json&coordtype=wgs84ll',
					data: {},
					header: {
						'content-type': 'application/json' // 默认值
					},
					success (res) {
					    // console.log(res)
						var cityname=res.data.result.addressComponent.city.replace(/市/,'')
						_this.here=cityname
					}
				})
			},
			hasgps(){
				uni.getSetting({
				  success: (res) => {
					if (!res.authSetting['scope.userLocation'])
					  wx.showModal({
						content: '检测到您没打开大单易拼的定位权限，是否去设置打开？',
						confirmText: "确认",
						cancelText: "取消",
						success: function (res) {
						  console.log(res);
						  //点击“确认”时打开设置页面
						  if (res.confirm) {
							console.log('用户点击确认')
							wx.openSetting({
							  success: (res) => { }
							})
						  } else {
							console.log('用户点击取消')
						  }
						}
					  });
				  }
				})
			},
			// #endif
			chooseZM(zm){
				this.toitem=zm
			},
			choosecity(name){
				this.cityname=name;
				uni.setStorageSync('cityname',name)
				uni.showToast({
				  title: '已重新定位城市',
				  success(){
					setTimeout(res=>{
						uni.navigateBack({})
					},1500)
				  }
				})
			},
			choosecity2(name){
				if(name=="定位中"){
					uni.showToast({
					  title: '城市定位中，请稍候再试！',
					  icon:"none"
					})
					return
				}
				if(name=="定位失败"){
					uni.showToast({
					  title: '定位失败，请在设置中打开大单易拼的位置权限',
					  icon:"none"
					})
					return
				}
				this.cityname=name;
				uni.setStorageSync('cityname',name)
				uni.showToast({
				  title: '已重新定位城市',
				  success(){
					setTimeout(res=>{
						uni.navigateBack({})
					},1500)
				  }
				})
			}
		}
	}
</script>

<style>
	page{
		background: #fff;
	}
	.scr0llbox{
		width: 100%;
	}
.content{
	box-sizing: border-box;
	width: 100%;
	padding: 20upx 40upx 20upx 30upx;
}
.citybox{
	display: flex;
	flex-wrap: wrap;
}
.city{
	width: 180upx;
	margin: 20upx 0;
	margin-right: 46upx;
	background: #eee;
	text-align: center;
	padding: 6upx 10upx;
	border-radius: 4upx;
}
.zimubox{
	width: 80upx;
	position: fixed;
	right: 0;
	top: 50%;
	transform: translateY(-50%);
}
.zimuname{
	margin:10upx 20upx;
	width: 40upx;
	line-height: 40upx;
	text-align: center;
	background: #ddd;
	border-radius: 50%;
	font-size: 22upx;
}
.citybox .active{
	background: #55aaff;
	color: #fff;
}
.here{
	width: 180upx;
	margin-right: 46upx;
	background: #eee;
	text-align: center;
	padding: 6upx 10upx;
	border-radius: 4upx;
}
.herebox{
	display: flex;
	align-items: center;
	height: 100upx;
}
.tit{
	color: #000000;
	font-weight: 600;
	font-size: 28upx;
	width: 226upx;
}
</style>
