
import {host,judgeLogin,toast,navigate,LoginPath,navigateBack} from '@/utils'


  // get请求；
  // statusObj ---isLogin，是否需要判断登录，
  export  function get(url, data={},statusObj={}) {
    if((statusObj.isLogin)&&!judgeLogin()){
      return Promise.reject()
    }else{
      return request(url, 'GET', data,statusObj)
    }
  }
  // post请求
export function post(url, data={},statusObj={}) {
    if((statusObj.isLogin)&&!judgeLogin()){
      return Promise.reject()
    }else{
      return request(url, 'POST', data,statusObj)
    }
  }

  
let loginTipsStatus = false;//未登录弹窗，如果存在多个请求，只弹出一次弹窗
// 统一请求返回code
const code={
  success:0,//成功
  fail:1,//失败
  notLogin:2,//未登录||登录过期
  resCode1:200,//成功特别方式
}

//请求封装
function request(url, method, data) {
    uni.showLoading({
      title: '加载中' //数据请求前loading
    })
    return new Promise((resolve, reject) => { 
      uni.request({
        url: host + url, //仅为示例，并非真实的接口地址
        method: method,
        data: data,
        header: {
          'content-type': 'application/json;charset=utf-8' // 默认值
        },
        success: function (res) {
          uni.hideLoading();
          if(res.statusCode===200){
            const ret = res.data;
            switch (ret.code) {
              case code.success:
                resolve(ret);
                break;
              case code.resCode1:
                resolve(ret);
                break;
              case code.notLogin:
                // 没登录或登录过期，询问是否跳转到登录页面
                uni.setStorageSync("userId",'')
                uni.setStorageSync("token",'')
                if(!loginTipsStatus){
                    loginTipsStatus = true;
                    
                    uni.showModal({
                      title:'需要登录',
                      content:'是否跳转到登录页面？',
                      cancelColor:'#999',
                      confirmColor:'#ff6f00',
                      success(res){
                        if(res.confirm){
                          navigate(LoginPath)
                        }
                      },
                      complete(){
                        loginTipsStatus = false;
                      }
                    })
                  }
                break;
              case code.fail:
                toast(ret.msg)
                reject(ret)
                break;
              default:
                toast(ret.msg)
                reject(ret)
            }
          }else{
            toast('服务器繁忙，请稍后重试')
            navigateBack();
            reject()
          }
        },
        fail: function (error) {
          uni.hideLoading();
          toast('服务器繁忙，请稍后重试')
          navigateBack();
          reject(error)
        }
      })
    })
  }
  
//请求封装,隐藏加载
export function requestHideLoading(url, data,method) {
    return new Promise((resolve, reject) => {
      uni.request({
        url: host + url, //仅为示例，并非真实的接口地址
        method: method,
        data: data,
        header: {
          'content-type': 'application/json;charset=utf-8' // 默认值
        },
        success: function (res) {
          const ret = res.data;
          if(code.success){
             resolve(ret)
         }else{
              toast(ret.msg)
              reject(ret)
         }
        },
        fail: function (error) {
          toast('服务器繁忙，请稍后重试')
          reject(error)
        }
      })
    })
  }

