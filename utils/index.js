

//API接口地址
// 线上
const host = 'https://api.naomiebie.cn/api/';//
const filePath = 'http://top.naosongduan.cn';//文件域名
const hostPath = 'http://top.naosongduan.cn/h5/index.html';//主机路径
// 测试
// const host = 'http://hnapi.wtvxin.com/api/';// 
// const filePath = 'http://hn.wtvxin.com';//文件域名
// const hostPath = 'http://hnapi.wtvxin.com/index.html';//主机路径
const LoginPath = "/pages/login/login";//登录路径
const RegisterPath = "/pages/login/register";//注册路径

import {get,post,requestHideLoading} from '@/utils/request';
import {editTime,dateUtils,timeDiff,formatNumber} from '@/utils/date-tools';
export {
  host,filePath,hostPath,LoginPath,RegisterPath,
  get,post,requestHideLoading,
  editTime,dateUtils,timeDiff,formatNumber,
}

// icon--是否显示图标，mask--是否显示防触摸穿透蒙层
export function toast(title,data={icon:false,mask:false,time:2000}){
  uni.showToast({
    title,
    icon:data.icon?'success':'none',
    mask:data.mask,
    duration:data.time
  })
}
//判断是否登录，未登录做弹窗跳转登录页面
export function judgeLogin(){
  if (!uni.getStorageSync("userId") || !uni.getStorageSync("token")) {
      uni.showModal({
        title:'未登录',
        content:'是否跳转到登录页面？',
        success(res){
          if(res.confirm){
            uni.navigateTo({
              url: LoginPath
            })
          }else{
            goUrl('index/index')
          }
        }
      })
      return false;
  }else{
    return true;
  }
}
// 去空字符串
export function trim(str) {
  return str.replace(/(^\s*)|(\s*$)/g, "");
}
//验证手机号
export function verifyPhone(tel) {
  var r_phone = /^1(3|4|5|6|7|8)\d{9}$/;
  // var phoneNumber = $.trim($('#phoneNumber').val());
  if (trim(tel) == "") {
    toast( "手机号不能为空!");
    return false;
  }
  if (!r_phone.test(tel)) {
    toast("请输入正确的手机格式!");
    return false;
  }
  return true;
}

// 函数防抖
let timeout = null
export function debounce(fn, wait = 500) {
  if (timeout !== null) clearTimeout(timeout)
  timeout = setTimeout(fn, wait)
}
// 函数节流
let throtteStatus = false
export function throtte(fn, wait = 500) {
  if (throtteStatus) return;
  throtteStatus = true;
  setTimeout(fn, wait)
  setTimeout(() => {
    throtteStatus = false;
  }, wait)
}
// 上传文件
export function upFile(filePath) {
  return new Promise((resolve, reject) => {
    uni.uploadFile({
      url: host + 'Area/VoiceUpload',
      filePath,
      name: 'file',
      success(res) {
        console.log('文件上传', res)
        resolve(res);
      },
      fail(err) {
        console.log('文件上传失败', err)
        uni.showToast({
          title: '文件上传失败，请重试！',
          icon: 'none'
        })
        reject(err)
      }
    })
  })
}
// 保存文件
export function saveFile(filePath){
  // downloadFile下载文件，然后saveFile保存
  uni.downloadFile({   
     url: filePath,   
     success: (res) => {  
        if (res.statusCode === 200) { 
          // h5端
		      if (typeof window === 'object' && 'document' in window) {
            var oA = document.createElement("a");
            oA.download = '';// 设置下载的文件名，默认是'下载'
            oA.href = res.tempFilePath;
            document.body.appendChild(oA);
            oA.click();
            oA.remove(); // 下载之后把创建的元素删除
          }else{
            uni.saveFile({  
                 tempFilePath: res.tempFilePath,  
                 complete(res) {  
                   console.log(res)  
                 }  
               });
          }  
        }  
     }  
 });
}

// 更改图片展示，判断是否带链接图片
export function autoImg(img) {
  if (img.indexOf('http') === -1) {
    return filePath + img
  }
  return img;
}

// 跳转url,带参
export function navigate(url,params){
  let p ='';
  if(params){
    let arr = Object.keys(params);
    arr.map((item,index)=>{
      p+=`${item}=${params[item]}`;
      if(index<arr.length-1){p+='&'};
    })
  }
  uni.navigateTo({
    url:`/pages/${url}?${p}`
  })
}

//产生不相同的字符串
export function CreatOnlyVal() {
  var d = new Date().getTime();
  var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = (d + Math.random() * 16) % 16 | 0;
      d = Math.floor(d / 16);
      return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
  });
  return uuid;
}