<template>
	<view class="apply">
		<view class="mt2 bg_fff pw3">
			<view class="head1">退款原因</view>
			<view class="flex reasonbox justifyContentBetween flexAlignCenter">
				<input type="text" placeholder="请选择原因" class="flex1" disabled >
				<text class="iconfont icon-arrow_down-copy"></text>
			</view>
			<view class="mt2 app_tot">退款金额 <span class="color_red apply_money">¥2.8万</span></view>
			<view>退款说明 <span class="font18 color_gray">（选填）</span></view>
			<textarea name="" id="" cols="30" rows="10" placeholder="200字内"></textarea>
			<view class="color_gray mt2 font26">
				温馨提示：订单退款金额以实际支付金额为准，不包括优惠 券抵扣金额，且订单申请退款后优惠券将不会返还，请您谨 慎操作。  
			</view>
			<view class="color_gray p2 font26">无质量问题退货所产生的的物流费用由购买者承担，从退款 中直接扣除。</view>
		</view>
		<view class="btn_bb">提交退款申请</view>
		<!--遮罩层-->
		<view class="mask" v-if="isShow"></view>
		<view class="mask_model" v-if="isShow">
		  <view class="flex justifyContentBetween mask_title">
			  <text @click="isShow = false">取消</text>
			  <view class="mask_info">请选择原因</view>
			  <text class="color_def" @click="confirm">确定</text>
		  </view>
		  <picker-view indicator-style="height: 50px;" style="width: 100%; height: 300px;"  @change="bindChange">
		    <picker-view-column>
		      <view v-for="(item,index) in list" :key="index" style="line-height: 50px" class="text_center">{{item.name}}</view>
		    </picker-view-column>
		  </picker-view>
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				isShow:true,
				list:[{id:1,name:'不想要了'},{id:2,name:'商品与描述不符'},{id:3,name:'其它'}],
			}
		},
		methods:{
			showMask(){
				this.isShow = true
			},
			bindChange(e){
				console.log(e.mp.detail.value)
				this.setIndex = e.mp.detail.value
			},
			confirm(){
				this.sexList.map((item,index)=>{
					if(this.setIndex==index){
						this.sex = item.name
					}
				})
				this.isShow = false
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import './style'
</style>
