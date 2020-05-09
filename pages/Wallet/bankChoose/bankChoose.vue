<template>
  <div class="page">
    <div class="chooseList bg_fff">
      <div class="bank" v-if="banklist.length>0">
        <div class="pull">推荐银行</div>
        <div
          class="payitem flex flexAlignCenter"
          :class="{'active':activeIndex===index||activeid==item.Id}"
          v-for="(item,index) in banklist"
          :key="index"
          @click="selectCardList(index,item.Id)"
        >
          <div class="flex1 flex flexAlignCenter">
            <img :src="item.BankLogo" class="cardpic" mode="widthFix">
            <div class="txtBox flex1">
              <p>{{item.BankName}}</p>
            </div>
          </div>
          <span class="icon-chose"></span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { post, get } from "@/common/util.js";
export default {
  onLoad() {
    this.setBarTitle();
  },
  onShow() {
    this.banklist = [];
    this.userId = uni.getStorageSync("userId");
    this.token = uni.getStorageSync("token");
    this.getBankinfoList();
	this.activeid=this.$store.state.cardInfo.id;
  },
  data() {
    return {
      userId: "",
      token: "",
      activeIndex: -1,
	  activeid:"",
      banklist: []
    };
  },
  components: {},
  methods: {
    setBarTitle() {
      uni.setNavigationBarTitle({
        title: "选择银行名称"
      });
    },
    selectCardList(index, id) {
      console.log("__________")
      let cardInfo = {
        id,
        bankLogo: this.banklist[index].BankLogo,
        bankName: this.banklist[index].BankName
      };
      this.activeIndex = index;
      const selectCard = this.$store.state.selectCard;
      if (!selectCard.status) {
        return false;
      }

      // 设置提交订单参数
      this.$store.commit("update", { cardInfo });
      console.log(this.$store.state.cardInfo)
      // 跳转到上一页
      uni.navigateBack({ url: selectCard.url });
    },
    getBankinfoList() {
      let that = this;
      post("Bank/BankinfoList",{}).then(result => {
        if (result.code === 0) {
          if (result.data.length > 0) {
            that.banklist = result.data;
          }
        }
      });
    }
  }
};
</script>
<style lang='scss' scoped>
.chooseList {
    margin-top: 20upx;
}

.cardpic {
    width: 48upx;
    max-height: 48upx;
    margin-right: 20upx;
}

.pull {
    font-size: 30upx;
    padding: 18upx 30upx;
}

.pull,
.payitem {
    position: relative;
}

.pull::before,
.payitem::before {
    position: absolute;
    content: "";
    left: 30upx;
    height: 1px;
    background: #e5e5e5;
    right: 0;
    bottom: 0;
}

.payitem {
    padding: 20upx 30upx;
}

.icon-chose{
    position: relative;
    width: 40upx;
    height: 40upx;
}

.payitem.active .icon-chose::before {
    content: "";
    display:block;
    position: absolute;
    width: 28upx;
    height: 14upx;
    border-left: 2px solid #ff9325;
    border-bottom: 2px solid #ff9325;
    transform: rotate(-45deg);
    top: 4upx;
    left: 0;
}
</style>