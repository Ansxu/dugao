<template>
	<view class="content">
		<form>
			<view class="uni-textarea">
				<textarea maxlength="200" @input="limitInput" placeholder-style="color:#999" placeholder="分享美好瞬间~" v-model="title" />
				<view class="counter"><text class="num">{{inputTxtLength}}</text>/200</view>
				</view>
		<view class="uni-list list-pd">
			<view class="uni-list-cell cell-pd">
				<view class="uni-uploader">
					<view class="uni-uploader-body">
						<view class="uni-uploader__files">
							<block v-for="(image,index) in imageList" :key="index">
								<view class="uni-uploader__file">
									<view class="iconfont icon-cha delbtn" @click="delImg(index)">
										
									</view>
									<image class="uni-uploader__img" :src="image" :data-src="image" @tap="previewImage"></image>
								</view>
							</block>
							<cpimg ref="cpimg" @result="cpimgOk" @err="cpimgErr" :number="9" :fixOrientation="true" :size="500" :maxWidth="1000" :ql="0.9" type="url" />
							<view class="uni-uploader__input-box" v-if="isShowBtnUpload">
								<view class="uni-uploader__input" @tap="chooseImage"></view>
							</view>
						</view>
					</view>
					<view class="uni-uploader-head">
						<view class="uni-uploader-title"></view>
						<view class="uni-uploader-info">{{imageList.length}}/9</view>
					</view>
				</view>
			</view>
			<view class="uni-list-cell location">
				<view class="uni-list-cell-navigate uni-navigate-right" @tap="chooseLocation">
					<view class="list-cell-l">
						<text class="iconfont icon-dizhi1"></text>所在位置
					</view>
					<block v-if="hasLocation === false">
						<view class="list-cell-r">不显示当前位置</view>
					</block>
					<block v-if="hasLocation === true">
					<view class="list-cell-r uni-ellipsis c_theme">
						<text class="iconfont icon-cha" @click.stop="clearlocation"></text>
						{{locationAddress}}
					</view>
					</block>
				</view>
			</view>
			<view class="uni-list-cell limit">
				<view class="uni-list-cell-navigate">
					<view class="list-cell-l">
						<text :class="['iconfont',role==0?'icon-gongkai':'',role==1?'icon-haoyou':'',role==2?'icon-suo':'']"></text>
						谁可以看
					</view>
					<view class="list-cell-r">
						<text v-for="(item,index) in roletxt" :key="index" :class="['txt', role==index ? 'active':'']" @click="selectRole(index)">{{item}}</text>
					</view>
				</view>
			</view>
		</view>
		</form>
		<!--底部-->
		<view class="foot-fiexd">
			<view class="foot-btn">
				<view class="btn" @click="Submit">发布</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {host,post,get,formatLocation} from '@/common/util.js';
	import cpimg from "@/components/cpimg.vue";
	export default {
		components: {
			cpimg
		},
		data() {
			return {
				userId: "",
				token: "",
				hasLocation: false,
				isShowBtnUpload:true,
				location: {},
				locationAddress: '',
				imageList: [],
				base64Arr:[],
				inputTxtLength:0,//当前输入字数
				role:0,//观看权限
				roletxt:["公开","好友","私密"],
				title:"",
				ContentAbstract:"",
				ContentDetails:""
			};
		},
		onLoad() {
			this.userId = uni.getStorageSync("userId");
			this.token = uni.getStorageSync("token");
		},
		onShow(){
			
		},
		onUnload() {
			this.imageList = [],
			this.base64Arr=[],
			this.title="",
			this.isShowBtnUpload=true,
			this.clearlocation();
		},
		methods: {
			// 添加图片
			chooseImage() {
				let that = this
				that.$refs.cpimg._changImg()
			},
			cpimgOk(file) {
				let that = this;
				that.base64Arr=that.base64Arr.concat(file);
				if(that.base64Arr.length>=9){
					that.isShowBtnUpload = false;
					that.base64Arr.splice(9);
				}
				that.imageList = that.base64Arr;
				console.log(that.imageList)
			},
			cpimgErr(e) {
				console.log(e)
			},

			previewImage: function(e) {
				var current = e.target.dataset.src
				uni.previewImage({
					current: current,
					urls: this.imageList
				})
			},
			chooseLocation: function () {
				uni.chooseLocation({
					success: (res) => {
						this.hasLocation = true,
							this.location = formatLocation(res.longitude, res.latitude),
							this.locationAddress = res.address
					}
				})
			},
			//删除图片
			delImg(index){  
				  this.imageList.splice(index,1);
				  if(this.imageList.length<9){
					this.isShowBtnUpload = true;
				  }
			},
			//清空当前地址
			clearlocation: function () {
				this.hasLocation = false
			},
			//设置观看权限
			selectRole(index){
				this.role=index;
			},
			limitInput(e) {
				// console.log(e)
				this.inputTxtLength = e.detail.cursor;
			},
			//发布
			async UserPublishFind(base64img){ 
				console.log(base64img)
				let result = await post("Find/UserPublishFind", {
					"UserId": this.userId,
					"Token": this.token,
					"ShowRole": this.role,
					"Title": this.title,
					"Location": this.locationAddress,
					"ContentAbstract": this.ContentAbstract,
					"ContentDetails":this.ContentDetails,
					"PicList":base64img
				});
				if (result.code === 0) {
					let _this=this;
					uni.showToast({
						title: result.msg,
						icon: "none",
						duration: 1500
					});
					setTimeout(function() {
						_this.clearData();
						uni.navigateTo({
						  url: "/pages/Article/myPost/myPost"
						});
					},2000)
				}else if (result.code === 2) {
					uni.showToast({
						title: result.msg,
						icon: "none",
						duration: 2000
					});
				} else {
					uni.showToast({
						title: result.msg,
						icon: "none",
						duration: 2000
					});
				}
			},
			//发布验证
			verifysubmint(){
				if(this.title==""){
					uni.showToast({
						title: "内容不能为空",
						icon: "none",
						duration: 2000
					});
					return false;
				}
				return true;
			},
			async Submit() {
				let _this=this;
				let base64Arr = [];
				for (let i = 0; i < _this.imageList.length; i++) {
					base64Arr.push({
					  PicUrl: _this.imageList[i]
					});
				}
				if(_this.verifysubmint()){
					_this.UserPublishFind(JSON.stringify(base64Arr));
				}
			},
			//清除数据
			clearData(){
				this.imageList = [],
				this.base64Arr=[],
				this.title="",
				this.isShowBtnUpload=true,
				this.clearlocation();
			}
		}
		
	}
</script>

<style scoped>
	@import "./style";
</style>
