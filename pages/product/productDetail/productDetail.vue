<template>
	<!-- 家居详情 -->
	<view class="details uni-bg-white">
		<!-- 首图展示 -->
		<view class="productBanner">
			<!-- #ifdef MP-WEIXIN -->
			<view class="menubtn iconfont icon-cart" @click="tolink('/pages/tabBar/cart/cart', true)"></view>
			<button class="sharebtn" open-type="share"><view class="iconfont icon-share"></view></button>
			<!-- #endif -->
			<swiper class="swiper" :indicator-dots="false" :autoplay="false" :interval="5000" :duration="500" @change="changeBanner">
				<swiper-item v-for="(item, index) in proInfo.PicData" :key="index">
					<view class="swiper-item"><image class="img" :src="item.PicUrl" mode="aspectFill"></image></view>
				</swiper-item>
			</swiper>
			<view class="streaming" v-if="false">
				<image class="figure" src="" mode=""></image>
				<view class="closes"><image class="close" src="http://shop.dadanyipin.com/static/hpicons/close.svg" mode=""></image></view>

				<view class="broadcast">
					<image class="litre" src="http://shop.dadanyipin.com/static/hpicons/close.svg" mode=""></image>
					<view class="">直播中</view>
				</view>
			</view>
			<view class="pagination" v-if="hasBanner">{{ bannerindex + 1 }}/{{ proInfo.PicData.length }}</view>
		</view>
		<div v-if="isLimint == 1" :class="['limitTiem jus-b ali-c', starTimetype != 1 ? 'no' : '']">
			<div class="limt-left">
				<div class="active-price jus-a ali-c">
					<h3>
						<span>¥</span>
						{{ proInfo.TimePrice }}
					</h3>
					<p>¥{{ proInfo.Price }}</p>
				</div>
				<div class="percentage">
					<span :style="['width:' + proInfo.StockProportion + '%']">
						<i>已抢{{ proInfo.SalesVolume }}件</i>
					</span>
				</div>
			</div>
			<div class="limt-right">
				<div class="txt">限时秒杀</div>
				<div class="time ali-c jus-b">
					<span class="timetxt">{{ starTimetype == 1 ? '距离结束' : '距离开始' }}</span>
					<div class="countDown" v-if="timeStr.length">
						<span>{{ timeStr[1] }}</span>
						:
						<span>{{ timeStr[2] }}</span>
						:
						<span>{{ timeStr[3] }}</span>
					</div>
				</div>
			</div>
		</div>
		<!-- 价格 位置 展示 -->
		<view class="">
			<view class="listpt">
				<view class="listprice" v-if="isLimint == 0">
					<view class="listm">
						<view class="selling">
							<span>¥</span>
							{{ proInfo.Price ? proInfo.Price : '' }}
						</view>
						<view class="original" v-if="proInfo.MarketPrice != 0">¥{{ proInfo.MarketPrice ? proInfo.MarketPrice :'' }}</view>
					</view>
					<view class="listm rt" v-if="proInfo.DistributionIncome != 0">
						<view class="cash">补贴</view>
						<view class="cashm">¥{{ proInfo.DistributionIncome }}</view>
					</view>
				</view>
			</view>
			<view class="site flex flex-between">
				<view class="slogan">{{ proInfo.Name }}</view>
				<div class=""><img style="width: 88upx;height: 88upx;" src="http://jd.wtvxin.com/images/images/index/fenxiang.png" alt="" /></div>
			</view>

			<view class="discount flex flex-between">
				<view class="payment">已售{{ proInfo.SalesVolume ? proInfo.SalesVolume : ''}}</view>
				<view class="payment">福建泉州</view>
			</view>

			<view class="flex justifyContentStart bb_shop" v-if="false">
				<image :src="proInfo.ShopData.Logo" class="shop_bb_logo"></image>
				<view class="uni-bold">{{ proInfo.ShopData.ShopNick }}</view>
			</view>
			<!--2020-4-11新增拼团显示-->
			<view class="swiper_bb flex justifyContentBetween" v-if="recordList.length > 0">
				<swiper class="swiper_pt" vertical="false" circular :autoplay="true" interval="3000" :duration="5000">
					<swiper-item class="swiper_item_box" v-for="(item, sindex) in recordList" :key="sindex">
						<view class="swiper_inner flex flexAlignCenter">
							<image :src="item.MemberHeadImg"></image>
							<view class="nick_name">{{ item.MemberHeadNick }}</view>
							<view class="sub_nick">刚刚这些人拼团成功！</view>
						</view>
					</swiper-item>
				</swiper>
				<view class="swiper_btn" @click="showSku(1)">去拼单</view>
			</view>
			<!--end!!!!!!!!!!!!!!!!!!-->
			<view class="purchase" style="display: none;">
				<view class="picture">
					<view class="portrait"><!-- <image src="http://shop.dadanyipin.com/static/hpicons/back.svg" mode=""></image> --></view>
					<view class="portrait left"><!-- <image src="http://shop.dadanyipin.com/static/hpicons/back.svg" mode=""></image> --></view>
					<view class="portrait left"><!-- <image src="http://shop.dadanyipin.com/static/hpicons/back.svg" mode=""></image> --></view>
				</view>
				<view class="screen">心善若水</view>
				<view class="make">这些人刚刚购买成功</view>
				<view class="bill">去拼单</view>
			</view>
		</view>
		<view class="pole"></view>
		<!-- 发货选择 -->
		<view class="shipments" v-if="proInfo.IsAloneBuy == 0">
			<view class="pick">
				<!-- <view class="shipmentsbox">
					<view class="">快递</view>
					<input class="province" type="text" placeholder="广东 广州" disabled>
					<view class="">{{ proInfo.Freight == 0 ? '包邮' : proInfo.Freight }}</view>
					<image class="exemption" style="width: 20rpx; height: 20rpx;" src="http://shop.dadanyipin.com/static/hpicons/arrows.svg" mode=""></image>
				</view> -->
				<view class="shipmentsbox">
					<view class="">领劵</view>
					<view class="merging" v-for="(e,i) in proInfo.CouponList" :key="i">{{e.Name}}</view>
					<!-- <image class="exemption" style="width: 20rpx; height: 20rpx;" src="http://shop.dadanyipin.com/static/hpicons/arrows.svg" mode=""></image> -->
				</view>
			</view>
			<view class="pick" @click="showSku(0)">
				<view class="shipmentsbox">
					<view class="">规格</view>
					<input class="province" type="text" placeholder="1件" disabled v-model="SpecText" />
					<view class="iconfont icon-arrow_r"></view>
				</view>
			</view>
			<view class="pick">
				<view class="shipmentsbox">
					<view class="">快递</view>
					<!-- <input class="province" type="text" placeholder="广东 广州" disabled> -->
					<view class="">{{ proInfo.Freight == 0 ? '包邮' : proInfo.Freight }}</view>
					<!-- <image class="exemption" style="width: 20rpx; height: 20rpx;" src="http://shop.dadanyipin.com/static/hpicons/arrows.svg" mode=""></image> -->
				</view>
			</view>
			<!-- <view class="pick" v-if="proInfo.ParameterJson !== '{}' && proInfo.ParameterJson !== ''" @click="showInfo">
				<view class="shipmentsbox">
					<view class="">参数</view>
					<input class="province" type="text" placeholder="产品参数" disabled />
					<view class="iconfont icon-arrow_r"></view>
				</view>
			</view> -->
		</view>
		<view v-if="proInfo.IsAloneBuy == 1 && proInfo.IsSku == 1" class="proguige">
			<block v-for="(item, index) in specList" :key="index">
				<view class="comment_hd">
					<view class="tit_l">选择所需{{ index }}</view>
					<view class="tit_r flex flex-end" v-if="item.length > 15">
						<view class="flex search flexAlignCenter">
							<view class="iconfont icon-sousuo" @click="searchSKU(index)"></view>
							<input type="text" @confirm="searchSKU(index)" @input="onInput" :placeholder="'请输入' + index" v-model.trim="inputSKU" />
							<view class="iconfont icon-cha" v-if="inputSKU" @click="delInput"></view>
						</view>
					</view>
				</view>
				<view class="box_bd">
					<view class="selectedSKU" v-if="showsearchres">搜索结果：{{ showsearchtext }}</view>
					<view class="guige">
						<view class="guigelist flex-wrap">
							<block v-for="(ite, ind) in item" :key="ind">
								<block v-if="skuall">
									<view :class="{ active: ite.name == SpecValue[index] }" @click="cliTag(index, ite.name)" class="skuitem ali-c jus-c">{{ ite.name }}</view>
								</block>
								<block v-else>
									<view v-if="ind < 15" :class="{ active: ite.name == SpecValue[index] }" @click="cliTag(index, ite.name)" class="skuitem ali-c jus-c">
										{{ ite.name }}
									</view>
								</block>
							</block>
						</view>
						<view class="more flex flex-center" v-if="item.length > 15" @click="showskuAll">
							{{ skuall ? '收起' : '查看全部' }}
							<view :class="['iconfont icon-shuangjiantouxia', skuall ? 'all' : '']"></view>
						</view>
					</view>
				</view>
			</block>
			<view class="pole"></view>
		</view>
		<!-- 服务介绍 -->
		<!-- <view class="needknow" v-if="isServiceInfo">
			服务
			<view class="drawinfo" v-for="(item, index) in proInfo.ServiceInfo" :key="index">
				<image class="drawimg" src="http://shop.dadanyipin.com/static/hpicons/draw.svg" mode=""></image>
				{{ item.Name }}
			</view>
		</view> -->
		<div class="serve">
			<span>服务</span>
			<img src="http://jd.wtvxin.com/images/images/index/ok.png" alt="" />
			<p>品质保证</p>
			<img src="http://jd.wtvxin.com/images/images/index/ok.png" alt="" />
			<p>破损补寄</p>
			<img src="http://jd.wtvxin.com/images/images/index/ok.png" alt="" />
			<p>及时发货</p>
		</div>
		<view class="pole"></view>
		<!-- 商品评价 -->
		<view class="comment">
			<view class="comment_hd">
				<view class="tit_l">
					商品评价
					<span>({{ commentCount }})</span>
				</view>
				<view class="tit_r flex flex-end" v-if="hasComment" @click="tolink('/pages/homePage/evaluation?id=' + proId)">
					<view class="red">查看全部</view>
					<view class="iconfont icon-arrow_r"></view>
				</view>
			</view>
			<block v-if="hasComment">
				<view class="comment-item" v-for="(item, index) in CommentList" :key="index">
					<view class="name ali-c jus-b">
						<view class="ali-c">
							<img class="tx" :src="item.Avatar || 'http://shop.dadanyipin.com/static/default.png'" alt="" />
							<view>{{ item.NickName }}</view>
						</view>
						<view class="flex"><view class="star iconfont icon-collect" v-for="(item1, index1) in item.Rank" :key="index1"></view></view>
					</view>
					<view class="detail">{{ item.ContentText }}</view>
					<!-- <view class="flex flexWrap" v-if="item.PicData">
						<block v-for="(i, e) in item.imgArr" :key="e"><img v-if="e < 3" :src="i" alt="" class="shop_pic" @click="previewImg(item.imgArr, i)" /></block>
					</view> -->
					<view class="time">{{ item.AddTime }}</view>
				</view>
			</block>
			<view class="uni-comment" v-else><view class="uni-center" style="padding: 20upx; color: #999;">暂无评论</view></view>
		</view>
		<view class="pole"></view>
		<!-- 商品特别说明 -->
		<view class="attrbox" v-if="proInfo.IsAloneBuy == 1 && proInfo.ParameterJson !== '{}' && proInfo.ParameterJson !== ''">
			<view class="comment_hd" style="border-bottom: none;"><view class="tit_l">商品属性</view></view>
			<view class="box_bd">
				<view class="uni-list flex flex-wrap">
					<view class="uni-list-cell" v-for="(item, index) in attrArr" :key="index">
						<view class="uni-list-cell-navigate">
							<text class="list-cell-l">{{ index }}</text>
							<text class="list-cell-r">{{ item }}</text>
						</view>
					</view>
				</view>
			</view>
			<view class="pole"></view>
		</view>
		<!-- 地理位置 -->
		<!-- <view class="Position" v-if="proInfo.Lat != '0' && proInfo.Lng != '0'">
			<view class="comment_hd"><view class="tit_l">地理位置</view></view>
			<view class="box_bd flex flex-between" @click="lookmap(proInfo.Lat, proInfo.Lng)">
				<view class="txtbox">
					<view class="addr">{{ proInfo.AreaSite + proInfo.Address }}</view>
				</view>
				<view class="iconfont icon-shouhuodizhi"></view>
			</view>
			<view class="pole"></view>
		</view> -->

		<!-- 拼单流程 -->

		<!-- <view class="flow">
			<image src="http://shop.dadanyipin.com/static/of/ptrules.jpg" mode="widthFix"></image> -->
		<!-- <view class="joint">
				<view class="stream"></view>
				<view class="process">拼单流程</view>
				<view class="stream"></view>
			</view>
			<view class="online">
				<view class="serials">
					<image class="serialimg" src="" mode=""></image>
					<view class="once">1</view>
					<view class="contract">在线选择意向车位编号 及就近签约地点。</view>
				</view>
				<view class="serials">
					<image class="serialimg" src="" mode=""></image>
					<view class="once">2</view>
					<view class="contract">拼单并备注购车位信息 (业主姓名、联系方式)</view>
				</view>
				<view class="serials">
					<image class="serialimg" src="" mode=""></image>
					<view class="once">3</view>
					<view class="contract">凭短信验证码到签约 中心核销完成购车位。</view>
				</view>
			</view>
			<view class="online">
				<view class="serials">
					<image class="serialimg" src="" mode=""></image>
					<view class="once">4</view>
					<view class="contract">成功购车位后将购车位 发票提交至万科云子代. 销商在线客服处审核。</view>
				</view>
				<view class="serials">
					<image class="serialimg" src="" mode=""></image>
					<view class="once">5</view>
					<view class="contract">审核通过后即可获取 大单易拼相关活动权。</view>
				</view>
			</view> -->
		<!-- </view> -->
		<!-- 图片展砂 -->
		<view class="pole"></view>
		<view class="graphic">
			<view class="brand">图文详情</view>
			<view class="detailhtml" v-if="proInfo.ContentDetail"><uParse :content="proInfo.ContentDetail" /></view>
		</view>
		<!-- 详情底部 -->
		<view style="height: 100upx;"></view>
		<view class="foot-fiexd">
			<view class="dd-foot">
				<view class="border-top"></view>
				<!-- <view class="foot-item" @click="tolink('/pages/brand/shopIndex/shopIndex?ShopId=' + proInfo.ShopData.ShopId)">
					<view class="bd">
						<view class="iconfont icon-dianpu"></view>
						店铺
					</view>
				</view> -->
				<view class="foot-item" style="position: relative;">
					<!-- #ifndef MP-WEIXIN -->
					<view class="bd" @click="tolink('/pages/other/kefu/kefu?qqnum=996889692')">
						<view class="iconfont icon-kefu"></view>
						客服
					</view>
					<!-- <view class="WEIXIN_btn" style="border:1px solid red" @click="tolink('/pages/other/kefu/kefu?qqnum=996889692')"></view> -->
					<!-- <a class="WEIXIN_btn" href="mqqapi://card/show_pslcard?src_type=internal&version=1&uin=996889692&card_type=group&source=qrcode" 
					></a> -->
					<!-- #endif -->
					<!-- #ifdef MP-WEIXIN -->
					<button class="bd" open-type="contact" style="border:0!important;padding:0;background: #ffffff;line-height:1.9">
						<view class="iconfont icon-kefu"></view>
						客服
					</button>
					<!-- <button open-type="contact" class="WEIXIN_btn"></button> -->
					<!-- #endif -->
				</view>
				<view class="foot-item">
					<view class="bd">
						<view class="iconfont" :class="[IsCollect ? 'icon-collect' : 'icon-collect1']" @click="collect"></view>
						收藏
					</view>
					<!-- 实心 icon-collect-->
				</view>
				<view class="foot-item"  @click="tolink('/pages/card/index','tabBar')">
					<view class="bd" style="padding-top: 20upx;">
						<img style="width: 40upx;height: 40upx;" src="http://jd.wtvxin.com/images/images/index/cart.png" alt="" />
						<view style="font-size: 22upx;padding:0 10upx;">购物车</view>
					</view>
					<!-- 实心 icon-collect-->
				</view>
				<!-- 有拼团样式 -->
				<view class="foot-item foot-item-btns" v-if="proInfo.IsAloneBuy == 0">
					<view class="btn btn_1 flex" @click="showSku(proInfo.IsAloneBuy == 0 ? 0 : 2)">
						<view class="num" v-if="isLimint == 0">¥{{ proInfo.Price }}</view>
						<view class="num" v-else>¥{{ proInfo.TimePrice }}</view>
						<view class="txt">单独购买</view>
					</view>
					<view class="btn btn_2 flex" @click="showSku(0)" v-if="proInfo.IsAloneBuy == 0 && GroupId == 0"><view class="txt">加入购物车</view></view>
					<view class="btn btn_2 flex" style="flex:1.5" @click="showSku(1)" v-if="GroupId > 0">
						<view>
							<view class="num">¥{{ GroupPrice }}</view>
							<view class="txt">我要拼团</view>
						</view>
						<view class="listm rt flex" v-if="proInfo.DistributionIncome != 0">
							<view class="cash fa">补贴</view>
							<view class="cashm fas">¥{{ proInfo.DistributionIncome }}</view>
						</view>
					</view>
				</view>

				<view class="foot-item foot-item-btns" v-else>
					<block v-if="reStock > 0">
						<view class="btn btn_1 flex" @click="gouBuy(0)">
							<view class="num">¥{{ alonePrice }}</view>
							<view class="txt">单独购买</view>
						</view>
						<view class="btn btn_2 flex" style="flex:1.4" v-if="GroupId > 0" @click="gouBuy(1)">
							<view>
								<view class="num">¥{{ GroupPrice }}</view>
								<view class="txt">我要拼团</view>
							</view>
							<view class="listm rt flex" v-if="proInfo.DistributionIncome != 0">
								<view class="cash fa">补贴</view>
								<view class="cashm fas">¥{{ proInfo.DistributionIncome }}</view>
							</view>
						</view>
					</block>
					<block v-else>
						<view class="btn btn_1 flex" style="background-color: #C9C9C9;"><view class="txt" style="font-size: 30upx;">已售罄</view></view>
					</block>
				</view>
				<!-- 无拼团样式 -->
				<!-- 				<view class="foot-item foot-item-btns" v-else>
					
					<view class="btn btn_2 flex" @click="showSku(0)">
						<view>
							<view class="txt">立即购买</view>
						</view>
					</view>
				</view> -->
			</view>
		</view>
		<!-- 详情底部 end -->
		<view class="topbtn" @click="Top" v-if="isTop"></view>
		<popupsku :proInfo="proInfo"  v-if="isProData" :show="showPopupSku" :showbtntype="showbtntype" :fromPinTuan="fromPinTuan" v-on:hidePopup="hidePopup" v-on:getsku="getsku(arguments)" :isLimint="isLimint*1" :inviteCode="inviteCode"></popupsku>
		<!-- 弹出产品参数 -->
		<uni-popup position="bottom" mode="fixed" :show="showPopupinfo" :h5Top="true" @hidePopup="hidePopup">
			<view class="uni-modal-Attr">
				<view class="bottom-title">产品参数</view>
				<view class="bottom-content">
					<view class="uni-list attrlist">
						<view class="uni-list-cell" v-for="(item, index) in attrArr" :key="index">
							<view class="uni-list-cell-navigate">
								{{ index }}
								<text class="list-cell-r">{{ item }}</text>
							</view>
						</view>
					</view>
				</view>
				<view class="bottom-btn" @click="hidePopup">完成</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
import { post, get, toLogin, uncodeUtf16 } from '@/common/util.js';
import uParse from '@/components/uParse/src/wxParse.vue';
import uniPopup from '@/components/uni-popup/uni-popup.vue';
import popupsku from '@/components/popupSku.vue';
import uniRate from '@/components/uni-rate.vue';
export default {
	components: {
		uParse,
		uniPopup,
		popupsku,
		uniRate
	},
	data() {
		return {
			userId: '',
			token: '',
			isTop: false, //是否显示置顶
			proId: '', //商品id
			GroupId: 0, //拼团id
			GroupPrice: 0, //拼团价格
			proInfo: {},
			IsCollect: false, //是否收藏该商品
			bannerindex: 0, //当前轮播图
			hasBanner: false,
			showPopupSku: false,
			showPopupinfo: false, //参数
			attrArr: {}, //产品参数
			isServiceInfo: false, //服务
			showbtntype: 0, //0:购物车+立即 1:拼团确定 2:立即
			fromPinTuan: false, //是否是拼团sku
			isProData: false,
			number: 1,
			SpecText: '',
			canaddcar: false, //sku齐全可以加入购物车
			price: '',
			plusprice: '',
			hasComment: false,
			commentCount: 0, //评价总数
			CommentList: [], //评价列表
			recordList: [], //拼团记录列表
			isLimint: 0, //0非限时购产品，1限时购产品
			timer: null,
			timeStr: [], //倒计时
			starTimetype: 1, //0秒杀未开始，1一开始，2已结束
			percentage: 0, //已售百分比
			GroupSku: [], //拼团商品Sku
			ProSku: [], //普通商品Sku
			hasData: false, //是否渲染页面
			//特殊产品
			alonePrice: 0,
			specList: [], //规格总列表
			specListname: '',
			SpecValue: {}, //当前选择规格的对象
			SpecInfo: {}, //当前选择规格的信息--图片，价钱
			reStock: 0, //库存
			skuall: false, //是否展示全部sku
			inputSKU: '', //输入搜索的sku
			showsearchres: false, //搜索结果
			showsearchtext: '',
			ReferralCode: '', //自己的邀请码
			inviteCode: '' //他人的邀请码
		};
	},
	onLoad(e) {
		// #ifdef APP-PLUS
		console.log(e.id);
		this.proId = e.id;
		this.isLimint = e.isLimint || 0;
		if (e.inCode) {
			console.log(e.inCode, 'invitecode111111111111');
			this.inviteCode = e.inCode;
		}
		// #endif
	},
	onShow() {
		this.hasData = false;
		this.userId = uni.getStorageSync('userId');
		this.token = uni.getStorageSync('token');
		this.ReferralCode = uni.getStorageSync('ReferralCode'); //自己的邀请码
		// #ifndef APP-PLUS
		this.proId = this.$root.$mp.query.id;
		this.isLimint = this.$root.$mp.query.isLimint || 0;
		if (this.$root.$mp.query.inCode) {
			console.log(this.$root.$mp.query.inCode, 'invitecode2222222');
			this.inviteCode = this.$root.$mp.query.inCode;
		}
		// #endif
		this.specList = [];
		this.SpecText = '';
		this.SpecValue = {};
		this.SpecInfo = {};
		this.canaddcar = false;
		this.inputSKU = '';
		this.showsearchres = false;
		this.showsearchtext = '';
		this.Goodsxq();
		this.getCommentList();
	},
	onNavigationBarButtonTap(e) {
		if (e.index === 0) {
			//分享
			this.sharePlus();
		} else {
			uni.reLaunch({
				url: '/pages/tabBar/cart/cart'
			});
		}
	},
	methods: {
		//跳转
		tolink(Url, tabBar) {
			console.log(Url, 'mmmmmmmmmmmm');
			if (tabBar) {
				uni.switchTab({
					url: Url
				});
			} else {
				uni.navigateTo({
					url: Url
				});
			}
		},
		changeBanner(e) {
			this.bannerindex = e.detail.current;
		},
		//返回顶部
		Top() {
			uni.pageScrollTo({
				scrollTop: 0,
				duration: 200
			});
		},
		//商品详情
		async Goodsxq() {
			let result = await post('Goods/Goodsxq', {
				userId: this.userId,
				token: this.token,
				Id: this.proId
			});
			if (result.code == 0) {
				this.hasData = true;
				this.proInfo = result.data;
				if (this.proInfo.KeywordName == '') {
					this.proInfo.KeywordName = [];
				} else {
					this.proInfo.KeywordName = this.proInfo.KeywordName.split(',');
				}
				if (this.proInfo.ServiceKeys == '') {
					this.proInfo.ServiceKeys = [];
				} else {
					this.proInfo.ServiceKeys = this.proInfo.ServiceKeys.split(',');
				}
				this.ProSku = result.data.Sku;
				this.GroupId = this.proInfo.GroupId;

				if (result.data.IsAloneBuy == 1) {
					this.reStock = result.data.Stock;
					if (this.isLimint == 0) {
						this.alonePrice = this.proInfo.Price;
					} else {
						this.alonePrice = this.proInfo.TimePrice;
					}
					if (this.proInfo.IsSku == 1) {
						this.specList = JSON.parse(result.data.SpecificationValue);
						for (let i in this.specList) {
							this.specListname = i;
						}
					} else {
						//如果没有含有sku，则只按照单价来计算商品价格
						this.canaddcar = true;
					}
				}
				if (this.proInfo.GroupId > 0) {
					//可以拼团
					this.GroupProductInfo(); //拼团商品详情
					this.getGroupRecordList(); //拼团记录
					this.isProData = false;
				} else {
					this.isProData = true;
				}
				if (this.proInfo.PicData.length) {
					this.hasBanner = true;
				}
				this.IsCollect = result.data.IsCollection.Value;
				if (this.proInfo.ServiceInfo.length) {
					this.isServiceInfo = true;
				}
				if (this.proInfo.ParameterJson != '' && this.proInfo.ParameterJson != '{}') {
					this.attrArr = JSON.parse(this.proInfo.ParameterJson);
				}
				this.GetRTime(this.proInfo.FlashSaleEndTime); //限时商品倒计时
			}
		},
		cliTag(name, value, isSearch) {
			//点击选择规格标签--name:规格名称 value:所选规格值
			let _this = this;
			this.$set(this.SpecValue, name, value);
			let skulist = [];
			if (this.GroupId > 0) {
				skulist = this.GroupSku;
			} else {
				skulist = this.ProSku;
			}
			if (isSearch == 1) {
				this.showsearchres = true;
			}
			let num = 0;
			skulist.map((item, index) => {
				const please = JSON.parse(item.SpecValue);
				if (_this.isObjectValueEqual(please, _this.SpecValue)) {
					_this.SpecInfo = item; //匹配到的sku
					_this.reStock = item.ProStock;
					if (_this.reStock == 0) {
						console.log('库存不足');
					}
					_this.SpecText = _this.SpecInfo.SpecText;
					if (_this.isLimint == 0) {
						_this.alonePrice = _this.SpecInfo.Price;
					} else {
						_this.alonePrice = _this.SpecInfo.TimePrice;
					}
					if (_this.GroupId > 0) {
						_this.GroupPrice = _this.SpecInfo.GroupPrice;
					}
					_this.canaddcar = true;
					if (isSearch == 1) {
						_this.showsearchtext = _this.SpecText;
					}
				} else {
					if (isSearch == 1) {
						num++;
						if (num == skulist.length) {
							_this.showsearchtext = '抱歉，没有搜到相关内容~';
						}
					}
				}
			});
		},
		isObjectValueEqual(a, b) {
			//判断两个对象里面属性值是否相等
			var aProps = Object.keys(a);
			var bProps = Object.keys(b);
			if (aProps.length != bProps.length) {
				return false;
			}
			for (var i = 0; i < aProps.length; i++) {
				var propName = aProps[i];
				if (a[propName] !== b[propName]) {
					return false;
				}
			}
			return true;
		},
		showskuAll() {
			this.skuall = !this.skuall;
		},
		searchSKU(name) {
			let _this = this;
			if (_this.inputSKU) {
				_this.cliTag(name, _this.inputSKU, 1);
			} else {
				uni.showToast({
					title: '请输入搜索内容',
					icon: 'none',
					duration: 1500
				});
			}
		},
		delInput() {
			this.inputSKU = '';
			//this.SpecText="";
			this.showsearchres = false;
			this.showsearchtext = '';
		},
		onInput(e) {
			if (e.detail.value == '') {
				this.delInput();
			}
		},
		//特殊产品购买
		gouBuy(e) {
			if (toLogin()) {
				if (this.canaddcar) {
					let gid = 0;
					if (e == 1) {
						gid = this.GroupId;
					} else {
						gid = 0;
					}
					let objUrl = '';
					console.log(this.inviteCode, '提交拉啊啦啦啦');
					if (this.inviteCode) {
						objUrl =
							'/pages/submitOrder/submitOrder?id=' +
							this.proId +
							'&SpecText=' +
							this.SpecText +
							'&number=' +
							this.number +
							'&orderSType=0' +
							'&isLimint=' +
							this.isLimint +
							'&GroupId=' +
							gid +
							'&inCode=' +
							this.inviteCode;
					} else {
						objUrl =
							'/pages/submitOrder/submitOrder?id=' +
							this.proId +
							'&SpecText=' +
							this.SpecText +
							'&number=' +
							this.number +
							'&orderSType=0' +
							'&isLimint=' +
							this.isLimint +
							'&GroupId=' +
							gid;
					}

					uni.navigateTo({
						url: objUrl
					});
				} else {
					var tit = '请选择' + this.specListname;
					uni.showToast({
						title: tit,
						icon: 'none',
						duration: 2000
					});
				}
			}
		},
		// 查看地图
		lookmap(Lat, Lng) {
			uni.navigateTo({
				url: '/pages/map/map?Lat=' + Lat + '&Lng=' + Lng
			});
		},
		//拼团记录
		async getGroupRecordList() {
			const res = await post('GroupBuy/GetGroupRecordList', {
				userId: this.userId,
				token: this.token,
				GroupId: this.GroupId,
				TopNum: 9, //查询前几条数据
				Type: 1 //1://最新拼团记录 0://默认，拼团中
			});
			if (res.code == 0) {
				this.recordList = res.data;
			}
		},
		//拼团商品详情
		async GroupProductInfo() {
			let result = await post('GroupBuy/GroupProductInfo', {
				userId: this.userId,
				token: this.token,
				GroupId: this.GroupId
			});
			if (result.code == 0) {
				var _this = this;
				this.GroupSku = result.data.Sku;
				this.$set(_this.proInfo, 'FightingPrice', result.data.FightingPrice); //在普通产品详情添加拼团商品信息，公用一套sku组件
				this.$set(_this.proInfo, 'OriginalPrice', result.data.OriginalPrice);
				this.GroupPrice = result.data.FightingPrice;
			}
		},
		//限时商品倒计时
		GetRTime(endTime) {
			let _this = this;
			//倒计时
			let endtime = endTime.replace(/-/g, '/').replace(/T/g, ' ');
			let EndTime = new Date(endtime); //结束时间
			this.timer = setInterval(function() {
				let NowTime = new Date(); //当前时间
				let t = EndTime.getTime() - NowTime.getTime();
				if (t > 0) {
					let d = Math.floor(t / 1000 / 60 / 60 / 24); //天
					let h = Math.floor((t / 1000 / 60 / 60) % 24); //时
					let m = Math.floor((t / 1000 / 60) % 60); //分
					let s = Math.floor((t / 1000) % 60); //秒
					if (parseInt(d) < 1) {
						d = '';
					} else {
						d = d + '天';
					}
					if (parseInt(h) < 10) {
						h = '0' + h;
					}
					if (parseInt(m) < 10) {
						m = '0' + m;
					}
					if (parseInt(s) < 10) {
						s = '0' + s;
					}
					_this.timeStr = [d, h, m, s];
				} else {
					this.starTimetype = 2;
					clearInterval(this.timer);
				}
			}, 1000);
		},
		//展示底部 Sku
		showSku: function(type) {
			this.isProData = false;
			this.hidePopup();
			console.log(type);
			var _this = this;
			if (type == 1) {
				//替换传给sku组件的值
				this.fromPinTuan = true;
				this.$set(_this.proInfo, 'Sku', _this.GroupSku);
			} else {
				this.fromPinTuan = false;
				this.$set(_this.proInfo, 'Sku', _this.ProSku);
			}
			this.showbtntype = type;
			this.showPopupSku = true;
			this.isProData = true;
		},
		//展示底部 参数
		showInfo: function() {
			this.hidePopup();
			this.showPopupinfo = true;
		},
		//统一的关闭popup方法
		hidePopup: function() {
			this.isProData = false;
			this.showPopupSku = false;
			this.showPopupinfo = false;
		},
		getsku: function(msg) {
			console.log(msg,'msg')
			this.number = msg[0];
			this.SpecText = msg[1];
			this.canaddcar = msg[2];
			this.price = msg[3];
			this.plusprice = msg[4];
		},
		//添加取消收藏
		async collect() {
			let objUrl = '';
			if (this.IsCollect) {
				objUrl = 'User/ReCollections';
			} else {
				objUrl = 'User/AddCollections';
			}
			let result = await post(objUrl, {
				Id: this.proId,
				userId: this.userId,
				token: this.token
			});
			if (result.code == 0) {
				if (this.IsCollect) {
					uni.showToast({
						title: '已取消收藏！',
						icon: 'none',
						duration: 1500
					});
					this.IsCollect = false;
				} else {
					uni.showToast({
						title: '添加收藏成功！',
						icon: 'none',
						duration: 1500
					});
					this.IsCollect = true;
				}
			}
			if (result.code == 2) {
				let _this = this;
				uni.showModal({
					content: '您当前未登录，无法收藏，是否登录？',
					success(res) {
						if (res.confirm) {
							uni.navigateTo({
								url: '/pages/login/login'
							});
						} else if (res.cancel) {
						}
					}
				});
			}
		},
		//评论列表
		async getCommentList() {
			let res = await post('Order/OrderCommentList', {
				Page: 1,
				PageSize: 2,
				ProId: this.proId,
				UserId: this.userId,
				Token: this.token
			});
			if (res.code == 0) {
				let _this = this;
				if (res.data.length) {
					_this.hasComment = true;
					this.commentCount = res.count;
					res.data.forEach(function(item) {
						let arr = [];
						for (var i = 0; i < item.PicData.length; i++) {
							arr.push(item.PicData[i].PicUrl);
							// console.log(arr)
						}
						_this.$set(item, 'imgArr', arr);
						let str = uncodeUtf16(item.ContentText);
						_this.$set(item, 'ContentText', str);
					});
					_this.CommentList = res.data;
				} else {
					_this.hasComment = false;
				}
			}
		},
		//分享app
		sharePlus() {
			uni.share({
				provider: 'weixin',
				scene: 'WXSceneSession',
				type: 0,
				href: 'http://shop.dadanyipin.com/#/pages/homePage/details?id=' + this.proId + '&inCode=' + this.ReferralCode, //分享好友产品带上邀请码
				title: this.proInfo.Name,
				summary: '我正在使用大单易拼，赶紧跟我一起来体验！',
				imageUrl: this.proInfo.PicData[0].PicUrl,
				success: function(res) {
					console.log('success:' + JSON.stringify(res));
				},
				fail: function(err) {
					console.log('fail:' + JSON.stringify(err));
				}
			});
		},
		//预览图片
		previewImg(imgurls, index) {
			uni.previewImage({
				current: index,
				urls: imgurls,
				indicator: imgurls.length
			});
		}
	},
	onPageScroll(e) {
		if (e.scrollTop > 300) {
			this.isTop = true;
		} else {
			this.isTop = false;
		}
	},
	onUserOpStatistic: function(e) {
		console.log('执行了嘛？');
		if (e.op == 'share') {
			console.log('hahhahhah转发啦！');
			var path = e.path;
		}
	},
	onShareAppMessage: function(options) {
		var that = this; // 设置菜单中的转发按钮触发转发事件时的转发内容
		var shareObj = {
			title: this.proInfo.Name, // 默认是小程序的名称(可以写slogan等)
			path: '/pages/homePage/details?id=' + this.proId + '&inCode=' + this.ReferralCode, // 默认是当前页面，必须是以‘/’开头的完整路径
			imageUrl: this.proInfo.PicData[0].PicUrl, //自定义图片路径，可以是本地文件路径、代码包文件路径或者网络图片路径，支持PNG及JPG，不传入 imageUrl 则使用默认截图。显示图片长宽比是 5:4
			success: function(res) {
				// 转发成功之后的回调
				if (res.errMsg == 'shareAppMessage:ok') {
					console.log('1111111111111111');
				}
			},
			fail: function() {
				console.log('22222222222'); // 转发失败之后的回调
				if (res.errMsg == 'shareAppMessage:fail cancel') {
					// 用户取消转发
				} else if (res.errMsg == 'shareAppMessage:fail') {
					// 转发失败，其中 detail message 为详细失败信息
				}
			},
			complete: function() {
				// 转发结束之后的回调（转发成不成功都会执行）
				console.log('33333333333333');
			}
		}; // 来自页面内的按钮的转发 // 返回shareObj
		// 　　if( options.from == 'button' ){
		// 　　　　var eData = options.target.dataset;
		// 　　　　console.log( eData.name );     // shareBtn
		// 　　　　// 此处可以修改 shareObj 中的内容
		// 　　　　shareObj.path = '/pages/btnname/btnname?btn_name='+eData.name;
		// 　　}
		return shareObj;
	}
};
</script>
<style scoped lang="scss">
@import '@/common/details.scss';
.swiper_bb {
	padding: 0 30upx;
	box-sizing: content-box;
	height: 100upx;
	.swiper_pt {
		flex: 1;
		height: 80upx;
		border-radius: 15upx 0 0 15upx;
		background: #ffeaea;
		padding: 0 15upx;
	}
	.swiper_item_box {
		height: 80upx !important;
	}
	.swiper_btn {
		width: 20%;
		background: #ffd0d0;
		height: 80upx;
		line-height: 80upx;
		text-align: center;
		color: #ff3333;
		border-radius: 0 15upx 15upx 0;
	}
	.swiper_inner {
		height: 80upx;
		image {
			width: 60upx;
			height: 60upx;
			margin: 0;
			border-radius: 50%;
		}
		.nick_name {
			font-size: 24upx;
			font-weight: bold;
			width: 35%;
			text-align: center;
			text-overflow: ellipsis;
			white-space: nowrap;
			overflow: hidden;
		}
		.sub_nick {
			font-size: 24upx;
			color: #999999;
		}
	}
}
.bb_shop {
	text-align: left;
	padding: 30upx;
	align-items: center;
}
.shop_bb_logo {
	width: 80upx;
	height: 80upx;
	border-radius: 50%;
	margin: 0;
}
page {
	background-color: #fff;
}
.shop_pic {
	width: 220upx;
	height: 220upx;
	border-radius: 12upx;
	margin-right: 14upx;
	&:nth-child(3n) {
		margin-right: 0;
	}
}
.limitTiem {
	background: #ff3333;
	color: #fff;
	padding: 20rpx 30rpx;
	.limt-left {
		.active-price {
			h3 {
				font-size: 40rpx;
				margin-right: 10rpx;
				span {
					font-size: 28rpx !important;
				}
			}
			p {
				text-decoration: line-through;
			}
		}
		.percentage {
			width: 210rpx;
			height: 24rpx;
			line-height: 24rpx;
			font-size: 24rpx;
			background: #ff747a;
			border-radius: 20rpx;
			text-align: center;
			position: relative;
			overflow: hidden;
			span {
				position: absolute;
				top: 0;
				left: 0;
				height: 100%;
				border-radius: 20rpx;
				background: #ffaa01;
				display: block;
				i {
					display: inline-block;
					width: 220rpx;
				}
			}
		}
	}
	.limt-right .txt {
		font-size: 40rpx;
		font-weight: bold;
		text-align: right;
	}
	.countDown span {
		background: #fff;
		color: #ff3333;
		border-radius: 4rpx;
		margin: 0 6rpx;
		padding: 0 4rpx;
	}
}
button::after {
	border: none;
}

.serve{
	display: flex;
	padding: 30upx;
	span{
		padding-right: 60upx;
	}
	img{
		width: 32upx;
		height: 32upx;
	}
	p{
		padding: 0 30upx 0 10upx ;
	}
}
</style>
