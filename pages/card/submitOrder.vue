<template>
	<!-- 购物车确定订单 -->
	<view class="wrap">
		<view class="uni-pd10 p_re">
			<view class="addrbox uni-bg-white b_radius uni-mb10" v-if="(info.IsAloneBuy==0&&info.IsSalesOffice==0&&orderSType==0) || orderSType==1">
				<view class="address flex flex-between" v-if="isAddress" @click="golink('/pages/member/address/address?pagetype=confirm&checkId='+addrInfo.Id)">
					<!-- <view class="local"> -->
						<!-- <view class="iconfont icon-dizhi"></view> -->
					<!-- </view> --> <!-- 收货地址图标 --> 
					<view class="addrdetail">
						<view class="receiver">
							<text>{{addrInfo.Consignee}}</text><text>{{addrInfo.Mobile}}</text>
						</view>
						<view class="addr">
							{{addrInfo.Address}}
						</view>
						<!-- <view class="addresstips">(温馨提示：请核对收货地址是否正确)</view> -->
					</view>
					<view class="next">
						<view class="uni-icon uni-icon-arrowright"></view>
					</view>
				</view>
				<view class="noaddr" v-else @click="golink('/pages/member/address/address?pagetype=confirm')">
					<view class="icon icon_addr"><image src="http://shop.dadanyipin.com/static/icons/no_addr2.png" mode="widthFix"></image></view>
					<view class="addtxt center">暂无收货地址，点击添加</view>
				</view>
			</view>
			
			<!-- 购物车过来的产品列表 -->
			<block v-if="orderSType==1">
				<view class=" b_radius uni-mb10">
					<view class="shopbox procontent">
						<view class="iconfont icon-dianpu"></view>
						<text class="shopName" style="padding-right: 71%;">{{info.ShopName}}</text>
						<view class="next">
							<view class="uni-icon uni-icon-arrowright"></view>
						</view>
					</view>
					<view class="outside procontent" v-for="(item2,index2) in info.ProData" :key="index2">
						<view class="pictrueAll">
							<view class="pictrue">
								<image :src="item2.PicNo" mode="aspectFill" ></image>
							</view>
						</view>
						<view class="txtBox">
							<view class="title">{{item2.Name}}</view>
							<view class="pronumber">
								<view class="protype" v-if="item2.SpecText">{{item2.SpecText}}</view>
								<view class="number">x{{item2.Number}}</view>
							</view>
							<view class="pronumber">
								<view class="price" >￥{{item2.Price}}</view>
							</view>
						</view>
					</view>
					<view class="procontent orderbox mb10 b_radius">
						<view class="orderinfo"  @click="openshopCoupon(info.UseCouponList,info.CouponId,index)">
							<view class="orderleft">优惠劵</view>
							<view class="orderright">
								<view class="infotxt actives" v-if="couponPrice">-￥{{couponPrice}}</view>
								<view class="infotxt" v-else>暂无可用优惠劵</view>
								<!-- <block v-for="(e,i) in info.UseCouponList" :key="i">
									<view class="infotxt" v-if="e.Id==info.CouponId">
										{{e.Id==info.CouponId?'￥'+info.yhPrice:'不使用'}}
									</view>
								</block> -->
								<view class="uni-icon uni-icon-arrowright"></view>
							</view>
						</view>
						<view class="orderinfo" v-if="item.IsInvoice==1" @click="ChooseInvoice(index)">
							<view class="orderleft">开票类型</view>
							<view class="orderright">
								<view class="infotxt flex flex-end">{{Invoicetxt[index]||'不开发票'}}
									<span v-if="InvoiceIdArr[index]>0" @click.stop="delInvoicet(index)" class="delinvoice">×</span>
								</view>
								<view class="uni-icon uni-icon-arrowright"></view>
							</view>
						</view>
					</view>
					<view class="orderbox procontent b_radius">
						<view class="orderinfo">
							<view class="orderleft">商品金额</view>
							<view class="orderright">
								￥{{info.TotalPrice}}
							</view>
						</view>
						<view class="orderinfo">
							<view class="orderleft">运费</view>
							<view class="orderright" style="color: #FF3333;">
								{{info.Freight ? '￥'+info.Freight:'包邮'}}
							</view>
						</view>
						<!-- <view class="orderinfo">
							<view class="orderleft">合计</view>
							<view class="orderright">￥{{item.TotalPrice}}</view>
						</view> -->
						
						<view class="orderinfo">
							<view class="orderleft">优惠</view>
							<view class="orderright">
								{{couponPrice?'-￥'+couponPrice:'-￥0.00'}}</view>
						</view>
						<!-- <view class="orderinfo" v-if="item.zkPrice>0">
							<view class="orderleft">折扣金额</view>
							<view class="orderright">￥{{item.zkPrice}}</view>
						</view> -->
						<view class="orderinfo" style="border: none;">
							<view class="orderleft">买家留言</view>
							<input class="inputtxt" placeholder="填写内容需与商家协商并确认,45字以内" type="text" v-model="Remark"/>
						</view>
						
						<!-- <view class="allprice">
							<text>共计{{item.AllNumber}}件商品</text><text>小计：</text><text>￥{{item.AllPrice}}</text>
						</view> -->
					</view>			
				</view>
			</block>
			<!-- 立即购买 -->
			<block v-if="orderSType==0&&GroupId==0">
				<view class=" b_radius uni-mb10">
					<view class="shopbox procontent">
						<view class="iconfont icon-dianpu"></view>
						<text class="shopName" style="padding-right: 71%;">{{info.ShopName}}</text>
						<view class="next">
							<view class="uni-icon uni-icon-arrowright"></view>
						</view>
					</view>
					<view class="outside procontent" v-for="(item2,index2) in info.ProData" :key="index2">
						<view class="pictrueAll">
							<view class="pictrue">
								<image :src="item2.PicNo" mode="aspectFill" ></image>
							</view>
						</view>
						<view class="txtBox">
							<view class="title">{{item2.Name}}</view>
							<view class="pronumber">
								<view class="protype" v-if="item2.SpecText">{{item2.SpecText}}</view><view class="number">x{{item2.Number}}</view>
							</view>
							<view class="pronumber">
								<view class="price" >￥{{item2.Price}}</view>
							</view>
						</view>
					</view>
					<view class="procontent orderbox mb10 b_radius">
						<view class="orderinfo" @click="openshopCoupon(info.CouponsList,info.CouponId,0)">
							<view class="orderleft">优惠劵</view>
							<view class="orderright">
								<!-- <view class="infotxt">{{couponPrice || '暂无可用优惠劵'}}</view>
								<block v-for="(e,i) in info.UseCouponList" :key="i">
									<view class="infotxt" v-if="e.Id==info.CouponId">{{e.Id==info.CouponId?'￥'+info.yhPrice:'不使用'}}</view>
								</block> -->
								<view class="infotxt actives" v-if="couponPrice">-￥{{couponPrice}}</view>
								<view class="infotxt" v-else>暂无可用优惠劵</view>
								<view class="uni-icon uni-icon-arrowright"></view>
							</view>
						</view>
						<!-- <view class="orderinfo" @click="ChooseInvoice(0)">
							<view class="orderleft">开票类型</view>
							<view class="orderright">
								<view class="infotxt flex flex-end">{{Invoicetxt[index]||'不开发票'}}
									<span v-if="InvoiceIdArr[index]>0" @click.stop="delInvoicet(index)" class="delinvoice">×</span>
								</view>
								<view class="uni-icon uni-icon-arrowright"></view>
							</view>
						</view> -->
					</view>
					<view class="orderbox procontent b_radius">
						<view class="orderinfo">
							<view class="orderleft">商品金额</view>
							<view class="orderright">
								￥{{info.TotalPrice}}
							</view>
						</view>
						<view class="orderinfo">
							<view class="orderleft">运费</view>
							<view class="orderright" style="color: #FF3333;">
								{{info.Freight ? '￥'+info.Freight:'包邮'}}
							</view>
						</view>
						<!-- <view class="orderinfo">
							<view class="orderleft">合计</view>
							<view class="orderright">￥{{item.TotalPrice}}</view>
						</view> -->
						
						<view class="orderinfo">
							<view class="orderleft">优惠</view>
							<view class="orderright">
								{{couponPrice?'-￥'+couponPrice:'-￥0.00'}}</view>
						</view>
						<!-- <view class="orderinfo" v-if="item.zkPrice>0">
							<view class="orderleft">折扣金额</view>
							<view class="orderright">￥{{item.zkPrice}}</view>
						</view> -->
						<view class="orderinfo" style="border: none;">
							<view class="orderleft">买家留言</view>
							<input class="inputtxt" placeholder="填写内容需与商家协商并确认,45字以内" type="text" v-model="Remark"/>
						</view>
						
						<!-- <view class="allprice">
							<text>共计{{item.AllNumber}}件商品</text><text>小计：</text><text>￥{{item.AllPrice}}</text>
						</view> -->
					</view>			
				</view>
			</block>
			<!-- 拼团 购买 -->
			<view v-if="orderSType==0&&GroupId>0" class="procontent b_radius uni-mb10">
				<view class="shopbox">
					<view class="iconfont icon-dianpu"></view>
					<text class="shopName">{{info.ShopName}}</text>
					<view class="uni-icon uni-icon-arrowright"></view>
				</view>
				<view class="outside">
					<view class="pictrueAll">
						<view class="pictrue">
							<image :src="info.ImageNo" mode="aspectFill" ></image>
						</view>
					</view>
					<view class="txtBox">
						<view class="title">{{info.Title}}</view>
						<view class="protype" v-if="info.SpecText">{{info.SpecText}}</view>
						<view class="pronumber">
							<view class="number">x{{Total}}</view><view class="price">￥{{info.FightingPrice}}</view>
						</view>
					</view>
				</view>
				<view class="orderbox">
					<view class="orderinfo" v-if="this.info.IsAloneBuy==0&&this.info.IsSalesOffice==0">
						<view class="orderleft">运费</view>
						<view class="orderright">
							{{info.Freight>0?'￥'+info.Freight:'免邮'}}
						</view>
					</view>
					<view class="orderinfo">
						<view class="orderleft">合计</view>
						<view class="orderright">￥{{info.allPayMoney}}</view>
					</view>
					<view class="orderinfo" style="border: none;">
						<view class="orderleft">订单备注</view>
						<input class="inputtxt" placeholder="填写内容已和商家家协商确认" type="text" v-model="remarkTxtArr[0]"/>
					</view>
					<view class="orderinfo" @click="ChooseInvoice(0)">
						<view class="orderleft">开具发票</view>
						<view class="orderright">
							<view class="infotxt flex flex-end">{{Invoicetxt[0]||'可开票'}}
								<span v-if="InvoiceIdArr[0]>0" @click.stop="delInvoicet(0)" class="delinvoice">×</span>
							</view>
							<view class="uni-icon uni-icon-arrowright"></view>
						</view>
					</view>
					<view class="allprice">
						<text>共计{{Total}}件商品</text><text>小计：</text><text>￥{{info.allPayMoney}}</text>
					</view>
				</view>				
			</view>
			
			<!-- 使用平台券 (购物车)-->
			<view class="orderbox uni-bg-white b_radius uni-mb10" v-if="orderSType==1&&hasCouponpt">
				<view class="orderinfo" @click="openCoupon(info.CouponsList,info.CouponId)">
					<view class="orderleft">平台优惠</view>
					<view class="orderright">
						<view class="infotxt">{{info.CouponId>0?'￥'+info.PlatDisPrice:'不使用'}}</view>
						<view class="uni-icon uni-icon-arrowright"></view>
					</view>
				</view>
			</view>
			
		</view>
		<view style="width: 100%;height: 160upx;"></view>
		<view class="footer flex flex-between">
			<view class="footleft" v-if="orderSType==1"><text class="color_gray fz12">(共{{info.AllNumber}}件)</text>总计：<text class="num"><text class="fz12">￥</text>{{info.AllPrice}}</text></view>
			<view class="footleft" v-if="orderSType==0&&GroupId==0"><text class="color_gray fz12">(共{{info.AllNumber}}件)</text>总计：<text class="num"><text class="fz12">￥</text>{{info.AllPrice}}</text></view>
			<view class="footleft" v-if="orderSType==0&&GroupId>0"><text class="color_gray fz12">(共{{Total}}件)</text>总计：<text class="num"><text class="fz12">￥</text>{{info.allPayMoney}}</text></view>
			<view class="footright" @click="confirm">{{GroupId>0?'确认拼团':'去付款'}}</view>
		</view>
		<!-- 优惠券弹窗 -->
		<uni-popup mode="fixed" :show="showCoupon" :h5Top="true" position="bottom" @hidePopup="closeCoupon">
			<view class="couponbox" style="z-index: 10000;">
				<view class="bottom-title">
					选择优惠券
				</view>
				<view class="uni-close-btn" @click="closeCoupon">
					<view class="iconfont icon-close"></view>
				</view>
				<scroll-view scroll-y style="width: 100%;height: 560upx;">
					<view class="coupon">
						<view class="couponitem" @click="selectCoupon(-1)">
							<view class="couponname">不使用</view>
							<view style="margin: 0;" :class="['IconsCK IconsCK-radio',llCouponId<0?'checked':'']"></view>
						</view>
						<view class="couponitem" v-for="(item,index) in popcouponData" :key="index" @click="selectCoupon(item.Id)">
							<view class="couponname">
								{{item.Title}}
							</view>
							<view style="margin: 0;" :class="['IconsCK IconsCK-radio',llCouponId==item.Id?'checked':'']"></view>
						</view>
					</view>
				</scroll-view>
				<view class="bottom-btn" @click="selectCouponok">完成</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	import {post,get,navigateBack} from '@/utils';
	import uniPopup from '@/components/uni-popup/uni-popup.vue';
	export default {
		components: {
			uniPopup
		},
		data() {
			return {
				userId: "",
				token: "",
				orderSType:1,//0立即购买，1购物车
				showCoupon:false,//优惠券弹框
				CartIds: "", //购物车提交的item的id
				ProId:"",//产品Id(立即购买)
				GroupId:0,//拼团产品id
				GroupRecordId:0,//拼团记录id
				Total:"",//购买总数量(立即购买)
				SpecText:"",//产品规格文本(立即购买)
				hasCoupon:false,//是否有店铺券（立即购买）
				info:{},//产品信息
				addrInfo:{},//地址信息
				isAddress:false,
				addressId:0,//地址id
				couponId:0,//平台优惠券id
				ShopCouponId:0,//店铺优惠券
				hasCouponpt:false,
				isPayWallet:0,//是否使用余额支付
				isPayScore:0,//是否使用积分抵扣
				shopIndex:0,
				InvoiceIdArr:[],
				Invoicetxt:[],
				remarkTxtArr:[],
				couponPrice:0,//优惠价格
				popCouponType:0,//弹出优惠券类型，0平台券，1店铺券
				popcouponData:[],//弹出优惠券数据
				popCouponId:-1,//弹出选中优惠券id
				llCouponId:-1,//临时优惠券id
				popCouponIdArr:[],
				popshopCouponIndex:0,
				CouponStr:'',
				ContactName:"",//业主姓名
				Tel:"",//业主电话
				IsSalesOffice:null,//去过或咨询售楼处 1-有 0-没有
				shopDataArr:[],//购物车默认选择店铺优惠券
				inCode:0,//立即购买得邀请码分享好友得佣金
				Remark:'', //买家留言
			};
		},
		onLoad: function(e) {
			console.log(e)
			// #ifdef APP-PLUS
			this.orderSType=e.orderSType*1;
			this.CartIds=e.cartItem
			this.ProId=e.id
			this.GroupId=e.GroupId||0
			this.Total=e.number
			this.SpecText=e.SpecText
			if(e.inCode){
				this.inCode = e.inCode
			}
			// #endif
		},
		onShow() {
			// this.ContactName = this.$store.state.peopleInfo.ContactName;console.log(this.$store.state.peopleInfo,11)
			// this.Tel = this.$store.state.peopleInfo.Tel;
			// this.IsSalesOffice = this.$store.state.peopleInfo.IsSalesOffice;
			this.userId = uni.getStorageSync("userId");
			this.token = uni.getStorageSync("token");
			// #ifndef APP-PLUS
			this.orderSType= this.$root.$mp.query.orderSType*1;
			this.CartIds=this.$root.$mp.query.cartItem;
			this.ProId=this.$root.$mp.query.id;
			this.GroupId=this.$root.$mp.query.GroupId||0;
			this.Total=this.$root.$mp.query.number;
			this.SpecText=this.$root.$mp.query.SpecText;
			if(this.$root.$mp.query.inCode){
				this.inCode = this.$root.$mp.query.inCode
				console.log(this.inCode,"///////")
			}
			// #endif
			if(uni.getStorageSync("addressinfo")){
			  this.addrInfo=uni.getStorageSync("addressinfo");
			  uni.setStorageSync("addressinfo",null)
			  this.isAddress=true;
			  this.addressId=this.addrInfo.Id;
			}else{
			  this.getAdress();
			}
			if(uni.getStorageSync("invoiceinfo")){
			  this.InvoiceInfo=uni.getStorageSync("invoiceinfo");
			  this.shopIndex= this.InvoiceInfo.shopIndex;
			  this.InvoiceIdArr[this.shopIndex]=this.InvoiceInfo.Id;//发票的id
			  this.Invoicetxt[this.shopIndex]=this.InvoiceInfo.InvoiceTitleStr+"："+this.InvoiceInfo.HeaderName;
			}else{
			  this.InvoiceIdArr[this.shopIndex]=0;//发票的id
			  this.Invoicetxt[this.shopIndex]="可开票";
			}
			if(this.orderSType==1){
				console.log(this.orderSType,'12')
				
				this.GoodsCartList();
			}else{
				if(this.GroupId>0){
					this.BuyGroup();//拼团确认订单
					this.GetGroupRecordList()
				}else{
					this.BuyNowGoods();//立即购买确认订单
				}
			}
		},
		onUnload() {
			//初始化业主参数
			let peopleInfo={ //业主信息
				ContactName:"",//业主姓名
				Tel:"",//业主电话
				IsSalesOffice:null,//去过或咨询售楼处 1-有 0-没有
			}
			this.$store.commit("update", { peopleInfo });
		},
		methods: {
			golink(url){
				console.log(url,'url')
				uni.navigateTo({
					url:url
				})
			},
			//获取默认地址
			async getAdress(){
			  let res=await post("Address/DefaultAddress",{
				UserId: this.userId,
				Token: this.token,
				Id:0
			  })
			  if(res.code==0){
				if(res.data){
				  this.addrInfo=res.data;
				  this.addressId=this.addrInfo.Id;
				  this.isAddress=true;
				}else{
				  this.isAddress=false;
				} 
			  }
			},
			
			closeCoupon(){
				this.showCoupon=false;
				// this.llCouponId=id;
			},
			openshopCoupon(data,id,index){  
				this.popCouponType=1;
				this.showCoupon=true;
				// this.popcouponData=data;
				// this.popCouponId=id;
				this.popshopCouponIndex=index;//index-0立即购买  其他购物车店铺list
			},
			openCoupon(data,id){
				this.popCouponType=0;
				this.showCoupon=true;
				this.popcouponData=data;
				this.popCouponId=id;
			},
			//选择优惠券
			selectCoupon(id){
				this.llCouponId=id;
				console.log(id,"////////")
			
			},
			selectCouponok(){
				if(this.llCouponId ===this.popCouponId){
					return;
				}
				this.popCouponId =this.llCouponId;
				this.couponId=-1;
				this.ShopCouponId=-1;
				const info =this.info;
				if(info.UseCouponList&&info.UseCouponList.length>0){
					info.UseCouponList.map(item=>{
						if(item.Id===this.popCouponId){
							this.ShopCouponId = this.popCouponId;
						}
					})
				}
				if(info.CouponsList&&info.CouponsList.length>0){
					info.CouponsList.map(item=>{
						if(item.Id===this.popCouponId){
							this.couponId = this.popCouponId;
						}
					})
				}
				this.showCoupon=false;
				// 立即购买
				if(!this.orderSType){
					this.BuyNowGoods();
				}
				// 购物车
				else{
					this.GoodsCartList();
				}
				// if(this.popCouponType==0){//0平台券，1店铺券
				// console.log(this.popCouponId,"11111111111")
				// 	this.couponId=this.popCouponId;
					
				// }else{  
				// 	if(this.orderSType ==  0){ //0立即购买，1购物车
				// 		this.popCouponIdArr[0] = this.popCouponId
				// 	}else{
				// 		this.shopDataArr[this.popshopCouponIndex].CouponId=this.popCouponId;
				// 		// console.log(this.shopDataArr[this.popshopCouponIndex].CouponId,"999999999999")
				// 		if(this.popCouponId == -1){
				// 			this.$set(this.info.CartList[this.popshopCouponIndex],'yhPrice','不使用')
				// 		}else{
				// 			// console.log(this.popcouponData,"****************")
				// 			// console.log(this.popshopCouponIndex,"//////////")
				// 			this.popcouponData.map(item=>{
				// 				if(item.Id == this.popshopCouponIndex){
				// 					this.$set(this.info.CartList[this.popshopCouponIndex],'yhPrice',item.Denomination)
				// 				}
				// 			})
							
				// 		}
				// 	}
				// }
				// if(this.orderSType==1){ //购物车
				// 	for (let i = 0; i < this.info.CartList.length; i++) {
				// 		let json = {};
				// 		json["ShopId"] = this.info.ShopId;
				// 		json["CouponId"]=this.shopDataArr[i].CouponId;
				// 		this.shopDataArr.push(json);
				// 		console.log(this.shopDataArr,'this.shopDataArr')
				// 	}
				// 	this.GoodsCartList();
				// }else{
				// 	this.BuyNowGoods();//立即购买确认订单
				// }
				// this.closeCoupon();

			},
			//选择发票
			ChooseInvoice(index){
				uni.navigateTo({
					url:'/pages/member/invoiceList/invoiceList?pagetype=confirm&shopIndex='+index
				})
			},
			delInvoicet(i){
				let _this=this;
			  _this.$set(_this.InvoiceIdArr,i,0);
			  _this.$set(_this.Invoicetxt,i,"可开票");
			  uni.setStorageSync("invoiceinfo","");
			},
			// 初始化优惠券数据
			onCouponData(data){
				let arr1= data.UseCouponList||[];
				let arr2= data.CouponsList||[];
				this.popcouponData=arr1.concat(...arr2);
				let id = 0;
				if(data.CouponId>0){
					id = data.CouponId;
				}
				if(data.ShopCouponId&&data.ShopCouponId>0){
					id = data.ShopCouponId;
				}
				this.popCouponId = id;
				this.llCouponId = id;
				console.log(data.PlatDisPrice,data.PlatDisPrice+0)
				this.couponPrice = data.yhPrice+data.zkPrice+(data.PlatDisPrice||0);
			},
			//购物车下单获取
			async GoodsCartList(){
			  let result=await post("Cart/GoodsCartList",{
				UserId: this.userId, 
				Token: this.token,
				CartIdList:this.CartIds,
				AddressId:this.addressId,
				CouponId:this.ShopCouponId,
				// ShopData:this.shopDataArr
			  })
			  if(result.code==0){
				this.info=result.data;
				// if(result.data.CouponId>0){ //平台优惠
				// 	this.couponId = result.data.CouponId
				// }
				//默认优惠券
				// for (let i = 0; i < this.info.ProData.length; i++) {
					let json = {};
					json["ShopId"] = this.info.ShopId;
					json["CouponId"]=this.info.CouponId;
					this.shopDataArr.push(json);
					this.onCouponData(result.data);
				// }
				// console.log( this.info.ProData,' this.info.ProData')
				// if(result.data.CouponsList.length){
				// 	this.hasCouponpt=true;
				// }else{
				// 	this.hasCouponpt=false;
				// }
				let countItem=0;
				this.info.CartData.forEach(function(item){
					countItem+=item.Total
				})
				this.$set(this.info,"countItem",countItem)
			  }else{
				uni.showToast({
				  title: result.msg,
				  icon: "none",
				  duration: 1000
				});
			  }
			},
			//购物车提交订单
			async BuyCart() {
				let result = await post("Order/BuyCart", {
					UserId: this.userId,
					Token: this.token,
					CartIds: this.CartIds,        //购物车Id组
					AddressId: this.addressId,    //地址Id
					IsPayWallet:this.isPayWallet, //使用余额支付 1-使用 0-不使用
					IsPayScore:this.isPayScore,   //使用积分抵扣 1-使用 0-不使用
					CouponId:this.info.CouponId,       //优惠劵
					Remark:this.Remark,           //买家备注
					// ShopData:this.shopDataArr,
					AreaCode:uni.getStorageSync("AreaCode")  //邀请码
				})
				if (result.code == 0) {
					uni.showToast({
					  title: '订单提交成功',
					  success(){
						setTimeout(res=>{
							uni.redirectTo({
								url: '/pages/card/pay?orderNo='+result.data+'&source=1'
							})
						},1500)
					  }
					})
				}else{
					uni.showToast({
						title: result.msg,
						icon: "none",
						duration: 1500
					});
				}
			},
			//立即购买订单渲染
			async BuyNowGoods(){
				let dataArr=[{
					ProId:this.ProId,//产品Id
					Total:this.Total,//购买总数量
					SpecText:this.SpecText//产品规格文本
				}];
				try{
					let result=await post("Order/BuyNowGoods",{
						UserId: this.userId,
						Token: this.token,
						AddressId:this.addressId,
						CouponId:this.couponId,
						ShopCouponId:this.ShopCouponId,
						data:dataArr,
					})
					if(result.code==0){
						let _this=this;
						_this.info=result.data;console.log(_this.info)
						//店铺优惠券
						this.popCouponIdArr[0] = result.data.ShopCouponId
						//平台优惠券
						this.couponId = result.data.CouponId
						if(result.data.ShopCouponId == -1){
							this.CouponStr = '不使用'
						}else{
							this.CouponStr = '￥' + result.data.yhPrice
						}
						this.onCouponData(result.data);
						// if(result.data.CouponsList.length){
						// 	this.hasCouponpt=true;
						// }else{
						// 	this.hasCouponpt=false;
						// }
						// if(result.data.UseCouponList.length){
						// 	this.hasCoupon=true;
						// }else{
						// 	this.hasCoupon=false;
						// }
						_this.$set(_this.info,"countItem",_this.infoAllNumber)
					}else{
						uni.showToast({
						title: result.msg,
						icon: "none",
						duration: 1000
						});
					}
			  }catch(err){
				  navigateBack();
			  }
			},
			//拼团订单渲染
			async BuyGroup(){
			  let result=await post("GroupBuy/ConfirmationGroup",{
				UserId: this.userId,
				Token: this.token,
				AddressId:this.addressId,
				GroupId:this.GroupId,
				Number:this.Total,//购买总数量
				SpecText:this.SpecText,//产品规格文本
			  })
			  if(result.code==0){
				  let _this=this;
				_this.info=result.data;
			  }else{
				uni.showToast({
				  title: result.msg,
				  icon: "none",
				  duration: 1000
				});
			  }
			},
			//获取拼团记录id
			async GetGroupRecordList(){
			  let result=await post("GroupBuy/GetGroupRecordList",{
				UserId: this.userId,
				Token: this.token,
				GroupId:this.GroupId,
			  })
			  if(result.code==0){
				  if(result.data.length>0){
					  this.GroupRecordId=result.data[0].Id;
				  }
			  }else{
				uni.showToast({
				  title: result.msg,
				  icon: "none",
				  duration: 1000
				});
			  }
			},
			//立即购买提交
			async BuyNowSubmitOrder(){
			  let result=await post("Order/BuyNowSubmitOrder",{
				UserId: this.userId,
				Token: this.token,
				ProId:this.ProId,//产品Id
				Number:this.Total,
				SpecText:this.SpecText,
				AddressId:this.addressId,
				CouponId:this.info.CouponId>0?this.info.CouponId:0,
				ShopCouponId:this.info.ShopCouponId>0?this.info.ShopCouponId:0,
				InvoiceId:this.InvoiceIdArr[0],
				Remark:this.Remark,
				ContactName:this.ContactName,
				Tel:this.Tel,
				InviteCode:this.inCode,
				IsSalesOffice:this.IsSalesOffice,
				AreaCode:uni.getStorageSync("AreaCode")
			  })
			  if(result.code==0){
				uni.showToast({
				  title: '订单提交成功',
				  success(){
					setTimeout(res=>{
						uni.redirectTo({
							url: '/pages/card/pay?orderNo='+result.data+'&source=1'
						})
					},1500)
				  }
				})
			  }else{
				uni.showToast({
				  title: result.msg,
				  icon: "none",
				  duration: 1000
				});
			  }
			  //初始化业主参数
			  let peopleInfo={ //业主信息
			  	ContactName:"",//业主姓名
			  	Tel:"",//业主电话
			  	IsSalesOffice:null,//去过或咨询售楼处 1-有 0-没有
			  }
			  this.$store.commit("update", { peopleInfo });
			},
			//确认拼团
			async CreateGroupOrder(){
			  let result=await post("GroupBuy/CreateGroupOrder",{
				UserId: this.userId,
				Token: this.token,
				GroupId:this.GroupId,//产品Id
				GroupRecordId:this.GroupRecordId,
				Number:this.Total,
				SpecText:this.SpecText,
				AddressId:this.addressId,
				InvoiceId:this.InvoiceIdArr[0],
				Remark:this.remarkTxtArr[0],
				ContactName:this.ContactName,
				Tel:this.Tel,
				InviteCode:this.inCode,
				IsSalesOffice:this.IsSalesOffice,
				AreaCode:uni.getStorageSync("AreaCode")
			  })
			  if(result.code==0){
				  var _this=this
				uni.showToast({
				  title: '订单提交成功',
				  success(){
					setTimeout(res=>{
						uni.redirectTo({
							url: '/pages/pay/pay?orderNo='+result.data.OrderNo+'&source=1&GroupId='+_this.GroupId
						})
					},1500)
				  }
				})
			  }else{
				uni.showToast({
				  title: result.msg,
				  icon: "none",
				  duration: 1000
				});
			  }
			  //初始化业主参数
			  let peopleInfo={ //业主信息
			  	ContactName:"",//业主姓名
			  	Tel:"",//业主电话
			  	IsSalesOffice:null,//去过或咨询售楼处 1-有 0-没有
			  }
			  this.$store.commit("update", { peopleInfo });
			},
			//提交订单
			confirm(){console.log(this.yanzheng())
				if(this.addressId>0||(this.addressId==0&&(this.info.IsSalesOffice==1||this.info.IsAloneBuy==1))){
					console.log(this.orderSType,'order')
					if(!this.orderSType){
					//   if(this.GroupId>0){
					// 	  if(!this.yanzheng()){
					// 		  uni.navigateTo({
					// 			url:"/pages/homePage/writeInfo?IsSalesOffice="+this.info.IsSalesOffice
					// 		  })
					// 	  }else{
					// 		this.CreateGroupOrder();//确认拼团
					// 	  }
					//   }else{
					// 	  if(!this.yanzheng()){
					// 		  uni.navigateTo({
					// 		  	url:"/pages/homePage/writeInfo?IsSalesOffice="+this.info.IsSalesOffice
					// 		  })
					// 	  }else{
						this.BuyNowSubmitOrder();//立即购买
					// 	  }
					//   }
					}else{
					  let DataArr = [];
					  for (let i = 0; i < this.info.ProData.length; i++) {
					  	let json = {};
					  	json["ShopId"] = this.info.ShopId;
						json["CouponId"]=this.info.CouponId;
						json["InvoiceId"]= this.InvoiceIdArr[i];
					  	json["Remark"] = this.Remark;
					  	DataArr.push(json);
					  }
					  // console.log({
						 //  CouponId:this.couponId,
						 //  ShopData:this.shopDataArr
					  // },"55555555555555555")
					  this.BuyCart(DataArr);
					}
				}else{
					uni.showToast({
					  title:"请选择收货地址！",
					  icon:"none"
					})
				}
			},
			//验证是否提交业主信息
			yanzheng(){
				if(this.info.IsAloneBuy==1||this.info.IsSalesOffice==1){console.log()
					if(this.Tel==""||this.Tel==undefined){
						return false
					}
					if(this.ContactName==""||this.ContactName==undefined){
						return false
					}
					if(this.info.IsSalesOffice==1){
						if(this.IsSalesOffice==null||this.IsSalesOffice==undefined){
							return false
						}
					}
					return true
				}
				return true
			}
		}
	}
</script>

<style scoped>
	
	@import "../../common/dd_style.css";
	@import "./submitOrder";
	@import "../../common/dd_style.css";
</style>
