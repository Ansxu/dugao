<template>
	<view class="uni-rate">
		<view class="uni-rate-icon" v-for="(star,index) in stars" :key="index" :style="{marginLeft:margin+'px'}" @click="onClick(index)">
			<font-icon :size="size" :color="color" :type="isFill === false || isFill === 'false' ? 'collect1' : 'collect'"></font-icon>
			<view class="uni-rate-icon-on" :style="{width:star.activeWitch}">
				<font-icon :size="size" :color="activeColor" type="collect"></font-icon>
			</view>
		</view>
		<view class="ratetxt" v-if="showtxt">{{ratetxt[txtindex]}}</view>
	</view>
</template>

<script>
	import fontIcon from '@/components/font-icon.vue'
	export default {
		name: "uni-rate",
		components: {
			fontIcon
		},
		props: {
			starType: {
				type: Number,
				default: 1
			},
			showtxt:{
				type:Boolean,
				type:true
			},
			isFill: { //星星的类型，是否镂空
				type: [Boolean, String],
				default: true
			},
			color: { //星星的颜色
				type: String,
				default: '#ececec'
			},
			activeColor: { //星星选中状态颜色
				type: String,
				default: '#ffca3e'
			},
			size: { //星星的大小
				type: [Number, String],
				default: 24
			},
			value: { //当前评分
				type: [Number, String],
				default: 0
			},
			max: { //最大评分
				type: [Number, String],
				default: 5
			},
			margin: { //星星的间距
				type: [Number, String],
				default: 0
			},
			disabled: { //是否可点击
				type: [Boolean, String],
				default: false
			}
		},
		data() {
			return {
				maxSync: this.max,
				valueSync: this.value,
				ratetxt:["非常差","差","一般","很好","非常好"],
				txtindex:this.value-1
			}
		},
		computed: {
			stars() {
				const max = Number(this.maxSync) ? Number(this.maxSync) : 5
				const value = Number(this.valueSync) ? Number(this.valueSync) : 0
				const starList = []
				const floorValue = Math.floor(value)
				const ceilValue = Math.ceil(value)
				for (let i = 0; i < max; i++) {
				
					if (floorValue > i) {
						starList.push({
							activeWitch: '100%'
						})
					} else if (ceilValue - 1 === i) {
						starList.push({
							activeWitch: (value - floorValue) * 100 + '%',
						})
					} else {
						
						starList.push({
							activeWitch: '0'
						})
					}
				}
				console.log(starList,"starList")
				return starList
			}
		},
		methods: {
			onClick(index) {
				if (this.disabled === true || this.disabled === 'true') {
					return
				}
				this.valueSync = index + 1;
				this.txtindex=index;
				this.$emit('change', {
					value: this.valueSync,
					type:this.starType
				})
			}
		}
	}
</script>

<style>
	@charset "UTF-8";
	.uni-rate {
		line-height: 0;
		font-size: 0;
		display: flex;
		flex-direction: row;
		align-items: center;
	}
	.ratetxt{color: #b2b2b2; font-size: 28upx; margin-left: 20upx;}
	.uni-rate-icon {
		position: relative;
		line-height: 0;
		font-size: 0;
		display: inline-block
	}
	.uni-rate-icon .uni-icon:before{ line-height: 1; vertical-align: initial;}
	.uni-rate-icon-on {
		line-height: 1;
		position: absolute;
		top: 0;
		left: 0;
		overflow: hidden
	}
</style>