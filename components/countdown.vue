<template>
	<div>
		<div class="countdown" v-if="diff>0">
			<block v-if="day>0">
				{{day}}<span>{{dStr}}</span>
			</block>
			{{hour}}<span>{{hStr}}</span>
			{{minute}}<span>{{mStr}}</span>
			{{second}}<span>{{sStr}}</span>
		</div>
		<div class="notDate" v-else>{{staleStr}}</div>
	</div>
</template>
<script>
// 倒计时组件
import {dateUtils,formatNumber} from '@/utils';
export default {
	name:'countdown',
	// 增加共用性，传过来的日期字符串必须是可以直接Date()调用转换的日期字符串如：yyyy/MM/dd h:m:s
	// 如需更改组件内样式，加了scoped的情况可以用穿透更改，如：
	// .父组件 /deep/ .countdown{} --scss
	//.父组件 >>> .countdown{} --css
	props:{
		// 结束时间
		timeEnd:{
			type:String,
			default:''
		},
		// 开始时间
		timeStart:{
			type:String,
			default:''
		},
		// 过时提示文本
		staleStr:{
			type:String,
			default:'时间已过'
		},
		dStr:{
			type:String,
			default:'天'
		},
		hStr:{
			type:String,
			default:'时'
		},
		mStr:{
			type:String,
			default:'分'
		},
		sStr:{
			type:String,
			default:'秒'
		}
	},
	data() {
		return {
			day:'',
			hour:'',
			minute:'',
			second:'',
			diff:0,//与当前时间相差的时间戳
			interval:null,//倒计时
		}
	},
	mounted() {
		clearInterval(this.interval);
		this.countdown();
	},
	methods: {
		countdown(){
			const timeStart = this.timeStart?(new Date(this.timeStart).getTime()):(new Date().getTime())
			const timeEnd = new Date(this.timeEnd).getTime();
			const diff = timeEnd - timeStart;//距离当前时间相差毫秒/时间戳
			this.diff = diff;
			if(diff<0){
				return;
			}
			//每天毫秒数
			const nd = dateUtils.UNITS['天'];
			//每小时毫秒数
			const nh = dateUtils.UNITS['小时'];
			//每分钟毫秒数
			const nm = dateUtils.UNITS['分钟'];
			// 秒数
			const ns = dateUtils.UNITS['秒'];
			// 天
			let d= parseInt(diff / nd);
			// 时
			let h = parseInt(diff % nd / nh);
			// 分
			let m = parseInt(diff % nd % nh / nm);
			// 秒
			let s = parseInt(diff % nd % nh % nm /ns);
			clearInterval(this.interval);
			this.interval = setInterval(()=>{
				if(s<1&&(m>0||h>0||d>0)){
					m-=1;
					s=60;
					if(m<1&&(h>0||d>0)){
						h-=1;
						m=59;
						if(h<1&&d>0){
						d-=1;
						h=23;
						}
					}
				}
				s-=1;
				this.day = d;
				this.hour = formatNumber(h);
				this.minute = formatNumber(m);
				this.second = formatNumber(s);
 			 },1000) 
		}
	}
}
</script>
<style scoped lang="scss">

</style>