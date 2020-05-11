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
	import {host,post,get,formatLocation,formatTime,toLogin,getCurrentPageUrlWithArgs} from '@/common/util.js';
	import { pathToBase64, base64ToPath } from '@/common/image-tools.js';
	var sourceType = [
		['camera'],
		['album'],
		['camera', 'album']
	]
	var sizeType = [
		['compressed'],
		['original'],
		['compressed', 'original']
	]
	export default {
		data() {
			return {
				userId: "",
				token: "",
				curPage:"",
				hasLocation: false,
				isShowBtnUpload:true,
				location: {},
				locationAddress: '',
				imageList: [],
				sourceTypeIndex: 2,
				sourceType: ['拍照', '相册', '拍照或相册'],
				sizeTypeIndex: 0,
				sizeType: ['压缩', '原图', '压缩或原图'],
				countIndex: 8,
				count: [1, 2, 3, 4, 5, 6, 7, 8, 9],
				inputTxtLength:0,//当前输入字数
				role:0,//观看权限
				roletxt:["公开","好友","私密"],
				title:"",
				ContentAbstract:"",
				ContentDetails:"",
				imgs:[],
				imgsStr:""
			};
		},
		onLoad() {
			this.curPage = getCurrentPageUrlWithArgs().replace(/\?/g, '%3F').replace(/\=/g, '%3D').replace(/\&/g, '%26');
			this.userId = uni.getStorageSync("userId");
			this.token = uni.getStorageSync("token");
		},
		onShow(){
			
		},
		onUnload() {
			this.imageList = [],
			this.title="",
			this.isShowBtnUpload=true,
			this.sourceTypeIndex = 2,
			this.sourceType = ['拍照', '相册', '拍照或相册'],
			this.sizeTypeIndex = 0,
			this.sizeType = ['压缩', '原图', '压缩或原图'],
			this.countIndex = 8;
			this.clearlocation();
		},
		methods: {
			sourceTypeChange: function(e) {
				this.sourceTypeIndex = e.target.value
			},
			sizeTypeChange: function(e) {
				this.sizeTypeIndex = e.target.value
			},
			countChange: function(e) {
				this.countIndex = e.target.value;
			},
			chooseImage: async function() {
				if (this.imageList.length >= 9) {
					let isContinue = await this.isFullImg();
					console.log("是否继续?", isContinue);
					if (!isContinue) {
						return;
					}
				}
				uni.chooseImage({
					sourceType: sourceType[this.sourceTypeIndex],
					sizeType: sizeType[this.sizeTypeIndex],
					count: this.imageList.length + this.count[this.countIndex] > 9 ? 9 - this.imageList.length : this.count[this.countIndex],
					success: (res) => {
						this.imageList = this.imageList.concat(res.tempFilePaths);
						if (this.imageList.length >= 9) {
						    this.isShowBtnUpload = false;
						    this.imageList.splice(9);
						}
					}
				})
			},

			async base64Img(arr) {
				let base64Arr = [];
					for (let i = 0; i < arr.length; i += 1) {
					const res = await pathToBase64(arr[i]);
					base64Arr.push({
					  PicUrl: res
					});
				}
				return base64Arr;
			},
			isFullImg: function() {
				return new Promise((res) => {
					uni.showModal({
						content: "已经有9张图片了,是否清空现有图片？",
						success: (e) => {
							if (e.confirm) {
								this.imageList = [];
								res(true);
							} else {
								res(false)
							}
						},
						fail: () => {
							res(false)
						}
					})
				})
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
				  this.imgs.splice(index,1);
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
			limitInput() {
				this.inputTxtLength = this.title.length;
			},
			//发布
			async UserPublishFind(base64img){
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
				let imgArr = await this.base64Img(this.imageList);
				if(this.verifysubmint()){
					this.UserPublishFind(JSON.stringify(imgArr));
				}
			},
			//清除数据
			clearData(){
				this.imageList = [],
				this.title="",
				this.isShowBtnUpload=true,
				this.sourceTypeIndex = 2,
				this.sourceType = ['拍照', '相册', '拍照或相册'],
				this.sizeTypeIndex = 2,
				this.sizeType = ['压缩', '原图', '压缩或原图'],
				this.countIndex = 8;
				this.clearlocation();
			}
		}
		
	}
</script>

<style scoped>
	@import "./style";
</style>
