<template>
	<view class="uni-bg-white">
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			};
		},
		methods: {
			gotoDetail(){
				uni.navigateTo({
					url: '/pages/productDetail/productDetail'
				})
			}
		}
	}
</script>

<style scoped>
	@import "./style";
</style>
