<template>
	<div class="item" @click="goFindDetail(item.Id)">
		<img :src="item.PicImg" alt="">
		<div class="content flex-end">
			<p class="ellipsis">{{item.Title}}</p>
		</div>
	</div>
</template>

<script>
	import {host,post,get,dateUtils,navigate} from '@/utils';
	export default {
		props:{
			item:{
				type:Object,
				default(){
					return {}
				}
			}
		},
		data() {
			return {
			}
		},
		onLoad() {
		},
		methods: {
			//链接发现详情页
			goFindDetail(fid) {
				navigate( 'Article/NewsDetail/NewsDetail',{id:+fid})
			},
		}
	}
</script>
<style scoped lang="scss">
	.item{
		width:335upx;height:168upx;
		border-radius:10upx;
		overflow:hidden;
		position:relative;
		margin-bottom:20upx;
		img{
			width:100%;
			height:100%;
		}
		.content{
			position:absolute;
			left:0;top:0;
			width:100%;height:100%;
			background:rgba(0,0,0,.3);
			color:$white;
			line-height:1.2;
			padding:20upx;
		}
	}
</style>