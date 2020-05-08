import Vue from 'vue';
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state:{
        // token:'',
        // userId:'',
        cardId: "",
        selectCard: {
            url: '',
            status: false
        },
        cardInfo: { //选择的银行名称id
            id: "",
            bankLogo: "",
            bankName: ""
        },
		peopleInfo: { //业主信息
		    ContactName:"",//业主姓名
		    Tel:"",//业主电话
		    IsSalesOffice:null,//去过或咨询售楼处 1-有 0-没有
		},
        selectMyCard: {
            url: '',
            status: false
        },
        myCardInfo: { //选择我的银行卡
            id: "",
            bankLogo: "",
            bankCardName: "",
            bankCardNo: ""
        },
        //是否为vip
        IsVip:0,
        //认证专家身份
        exportData:{
            UserRname:"",
            Idcard:"",
            IdcardPositive:"",
            IdcardNegative:"",
            IdcardInHand:"",
        }
    },
    getters:{
        getToken(state){
            if(!state.token&&wx.getStorageSync('token')){
                state.token=wx.getStorageSync('token')
            }
            return state.token
        },
        getUserId(state){
            if(!state.userId&&wx.getStorageSync('userId')){
                state.userId=wx.getStorageSync('userId')
            }
            return state.userId
        },
    },
    mutations: {
        /**
         * 在main.js例引入
         * import store from './store/index'
         * 把store挂载到全局
         * Vue.prototype.$store = store;
         */

        /**
         * 这里设置一个统一的方法,大部分用的vuex都是简单的改变一些状态,不需要写过多的mutations
         * 使用方法 例:
         * this.$store.update({"cityName":"北京"})
         * this.$store.commit('update',{"cityName":"北京"})
         * 
         *  config需要传入对象
         * @param {*} state 
         * @param {*Object} config 
         */
        update(state, config) {
            Object.keys(config).map((item, key) => {
                state[item] = config[item]
            })
        },
        // 设置选择银行名称
        setSelectCard(state, params) {
            state.selectCard = params;
        },
        // 设置选择我的银行卡
        setSelectMyCard(state, params) {
            state.selectMyCard = params;
        }

    }
    
})

