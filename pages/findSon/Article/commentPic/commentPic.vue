<template>
	<view class="content">
		<form>
			<view class="uni-textarea">
				<textarea maxlength="200" @input="limitInput" placeholder-style="color:#999" placeholder="分享美好瞬间~" v-model="Comment" />
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
	import {host,post,get,formatTime,toLogin,getCurrentPageUrlWithArgs} from '@/common/util.js';
	import cpimg from "@/components/cpimg.vue";
	export default {
		components: {
			cpimg
		},
		data() {
			return {
				userId: "",
				token: "",
				curPage:"",
				ActivityId:"",
				isShowBtnUpload:true,
				imageList: [],
				base64Arr:[],
				inputTxtLength:0,//当前输入字数
				PCommentId:0,//上级评论id
				Comment:""//评论内容
			}
		},
		onLoad: function(e) {
			this.curPage = getCurrentPageUrlWithArgs().replace(/\?/g, '%3F').replace(/\=/g, '%3D').replace(/\&/g, '%26');
			this.userId = uni.getStorageSync("userId");
			this.token = uni.getStorageSync("token");
			this.ActivityId=e.id;
		},
		onShow() {
			
		},
		onUnload() {
			this.imageList = [],
			this.base64Arr=[],
			this.Comment="",
			this.isShowBtnUpload=true
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
			//删除图片
			delImg(index){  
				  this.imageList.splice(index,1);
				  if(this.imageList.length<9){
					this.isShowBtnUpload = true;
				  }
			},
			limitInput() {
			    this.inputTxtLength = this.Comment.length;
			},
			/*发表评论*/
			async CommentOperation(base64img){
				let result = await post("Find/CommentOperation",{
					"UserId": this.userId,
					"Token": this.token,
					"FkId":this.ActivityId,
					"TypeInt":1,
					"ParentCommentId":this.PCommentId,
					"Comment":this.Comment,
					"PicList":base64img
				});
				if(result.code===0){
					let _this=this;
					uni.showToast({
						title: result.msg,
						icon: "none",
						duration: 1500
					});
					setTimeout(function() {
						_this.clearData();
						uni.reLaunch({
							url: "/pages/Article/activityDetail/activityDetail?id="+_this.ActivityId
						});
					}, 2000);
					
				} else if (result.code === 2) {
					let _this =this;
					uni.showModal({
						content: "您还没有登录，是否重新登录？",
						success(res) {
							if (res.confirm) {
								uni.navigateTo({
								  url: "/pages/login/login?askUrl="+_this.curPage
								});
							} else if (res.cancel) {
							}
						}
					});
				} else {
					uni.showToast({
						title: result.msg,
						icon: "none",
						duration: 2000
					});
				}
			},			
			async Submit() {
				let _this=this;
				let base64Arr = [];
				for (let i = 0; i < _this.imageList.length; i++) {
					base64Arr.push({
					  PicUrl: _this.imageList[i]
					});
				}
				if(this.Comment!=""||this.imageList.length!=0){
					this.CommentOperation(JSON.stringify(base64Arr));
				}else{
					uni.showToast({
						title: "评论内容不能为空",
						icon: "none",
						duration: 2000
					});
				}
			},
			//清除数据
			clearData(){
				this.imageList = [],
				this.base64Arr=[],
				this.Comment="",
				this.isShowBtnUpload=true	
			}
		}
	}
</script>

<style scoped>
	@import "./style";
</style>
