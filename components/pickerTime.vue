<template>
  <div class="picker" v-if="show">
    <div class="mask" @click="cancel"></div>
    <div class="pickerBox">
        <div class="head">
            <div class="cancel" @click="cancel">取消</div>
            <div class="ca">请选择时间</div>
            <div class="confirm" @click="success">确认</div>
        </div>
        <picker-view class="pickerView" :value="value"  indicator-style="height: 50px;" style="height:480rpx;" @change="onChange">
                <picker-view-column class="pickerColumn">
                <div class="pickerItem" v-for="(item,key) in years" :key="key">{{item}}</div>
                </picker-view-column>
                <picker-view-column class="pickerColumn">
                <div class="pickerItem" v-for="(item,key) in months" :key="key">{{item}}</div>
                </picker-view-column>
        </picker-view>
      <!-- <picker-view
        indicator-style="height: 50px;"
        style="height:480rpx;"
        @change="onChange"
      >
        <picker-view-column>
          <div
            v-for="(item,index) in arr"
            :key="index"
            style="line-height: 100rpx;width:100%;text-align:center;"
          >{{item.Name}}</div>
        </picker-view-column>
      </picker-view> -->
    </div>
  </div>
</template>
<script>
export default {
  props:['show'],
  data() {
    return {
      //临时改变的值
      value:[0,0],
	  time:'',
	  years:[],
	  months:[],
      // datelist:[],
      // hourses:[],
      // minutes: [],
    };
  },
  mounted() {
    this.timeShow()
  },
  methods: {
    // 点击确认，返回当前选中的值
    success(e) {
	  this.time = `${this.years[this.value[0]]}-${this.months[this.value[1]]}`
      this.$emit("success", this.time);
	  this.$emit("update:show", false);
    },
    cancel() {
      this.$emit("update:show", false);
    },
    // 改变选择的值时
    onChange(e) {
	  this.value = e.mp.detail.value
    },
    timeShow(){
        this.getDate()
    },
    getDate(){
        const data = new Date();
        const year = data.getFullYear()
        const month = data.getMonth() + 1;
        const date = data.getDate();
		for (let i = 2018; i <= data.getFullYear(); i++) {
			this.years.push(i)
		}
		for (let i = 1; i <= 12; i++) {
			if (i.toString().length < 2) {
				i = "0" + i;
			}
			this.months.push(i)
		}
    }
  }
};
</script>
<style  scoped>
.mask {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
}
.pickerBox {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  z-index: 101;
  background: #fff;
}
.head {
  background: #fff;
  display: flex;
  justify-content: space-between;
  padding: 20rpx;
  color: #999;
  line-height: 80rpx;
  font-size: 30rpx;
  /* border-bottom:1rpx #eee solid; */
}
.head div {
  padding: 0 15rpx;
}
.confirm {
  color: #3172f5;
}
.pickerView{
    width:100%;
    height: 300rpx;
}
.pickerItem{
    line-height:68rpx;
    height:34rpx;
    overflow:hidden;
    text-align: center;
}

</style>