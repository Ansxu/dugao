<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style lang="scss">
	/*每个页面公共css */
/* #ifndef APP-NVUE */
	@import './common/uni.css';
	@import './common/iconfont.css';
	@import './common/common.scss';
	@import './common/lz.css';
	@import './components/uParse/src/wxParse.css';
/* #endif */
	page{
		background: #f5f5f5;
		height: 100%;
		font-size: 28upx;
	}
	.uni-numbox__minus,.uni-numbox__plus{
		height:56upx!important;line-height: 56upx!important;
	}
	.uni-radio-input.uni-radio-input-checked{
		background-color: #FF3333!important;
		border-color: #FF3333!important;
	}
	uni-switch .uni-switch-input.uni-switch-input-checked{
		background-color: #FF3333!important;
		border-color: #FF3333!important;
	}
	.dot uni-radio .uni-radio-input{
		height: 40rpx!important;
		width: 40rpx!important;
		border-radius: 50%!important;
		border:1rpx solid #bbb!important;///替换边框 隐藏原有边框
	}
	.dot .uni-radio-input.uni-radio-input-checked{
		background-color: #ffffff!important;
		border-color: #FF3333!important; 
	}
	.dot uni-radio .uni-radio-input.uni-radio-input-checked:before{
		border-radius: 50%!important;
		/* 圆角 */
		width: 20rpx!important;
		/* 选中后对勾大小，不要超过背景的尺寸 */
		height: 20rpx!important;
		/* 选中后对勾大小，不要超过背景的尺寸 */
		text-align: center!important;
		line-height:30rpx!important;
		font-size: 0!important;
		/* 对勾大小 30rpx */
		color: #fff;
		/* 对勾颜色 白色 */
		background-color: #ff3333!important;
		transform: translate(-50%, -50%) scale(1)!important;
		-webkit-transform: translate(-50%, -50%) scale(1)!important;
	}
	
	.uni-scroll-view::-webkit-scrollbar {
		/* 隐藏滚动条，但依旧具备可以滚动的功能 */
		display: none
	}
	/*每个页面公共css */
	@import '@/common/style/main.scss';
</style>
