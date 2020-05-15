import {host,LoginPath,RegisterPath,toast,redirect,navigate,navigateBack} from '@/utils';
const LoginRequestUrl = "Login/SignIn_New";//登录接口地址，
const LoginSuccessCode = 0;//登录成功
const LoginNotRegisterCode = 2;//未注册
const LoginfailCode = 1;//登录失败

// params = { success:成功执行的方法}
export default function logins(params) {
    return new Promise((resolve,reject)=>{
        let ivata = "";
        let encriptData = "";
        uni.showLoading({
          title: "登陆中..."
        });
        //用户授权登陆，code发送给服务器
        uni.login({
            success: function (ret) {
              if (!ret.code) {
                  uni.hideLoading();
                  toast('获取授权信息失败')
                  reject();
              }
                const code = ret.code; //拿到code进行下一步操作
                uni.setStorageSync("wxCode",ret.code);//*支付*可能要用到的code
                uni.setStorageSync("code",ret.code);//*支付*可能要用到的code
                uni.getUserInfo({
                    lang:'zh_CN',
                    withCredentials:true,
                    success: function (res) {
                        const userInfo = res.userInfo;
                        ivata = res.iv;
                        encriptData = res.encryptedData;
                        //保存用户信息，userInfo对象里面含有用户昵称，用户头像,性别等信息：
                        uni.setStorageSync("userInfo", userInfo);
                        //userInfo.nickName 用户昵称;
                        //userInfo.avatarUrl 用户头像图片的URL;
                        //userInfo.gender 用户性别
                          uni.request({
                                method: "POST",
                                //提交数据到服务器，如果没有绑定手机号码，则提示用户需要绑定手机号码
                                url: host + LoginRequestUrl,//请求登录
                                data: {
                                    iv: ivata,
                                    code: code,
                                    encryptedData: encriptData
                                },
                                header: {
                                    "content-type": "application/x-www-form-urlencoded"
                                },
                                success: function (res) {
                                    uni.hideLoading();
                                    //后台返回的MemberOpenId,可更改标识
                                    if (res.data.code==='undefined'||res.data.code===undefined) {
                                      toast('登录失败！请重新尝试')
                                      reject();
                                      return;
                                    }
                                    const _res =res.data;
                                    console.log(_res,'login')
                                    // 设置一些缓存，注册或者支付要使用的，直接在缓存获取
                                    uni.setStorageSync("unionid", _res.data.unionid);
                                    uni.setStorageSync("openId", _res.data.openId);
                                    // uni.setStorageSync("Token", _res.data.WxToken); //保存的令牌 accessToken
                                    // 登录成功
                                    if (_res.code === LoginSuccessCode) {
										console.log(_res,'code')
                                        uni.setStorageSync("userId", _res.data.UserId); //保存用户Id到本地缓存
                                        uni.setStorageSync("token", _res.data.Token); //保存的令牌 accessToken

                                        // 自动登录不刷新页面时
                                          toast('登录成功',{icon:true})
                                        // 登录成功执行的方法封装，在index的请求封装，code为2时
                                        // params.success&&params.success(res.data)
										navigateBack();
                                        resolve(res.data);
                                    } else 
                                    //--没有绑定手机，则跳转到绑定手机的页面--看业务需求
                                    if (_res.code === LoginNotRegisterCode) {
                                        toast('请绑定手机号码进行登录！')
                                        setTimeout(()=>{
                                          // 跳转注册
										  redirect(RegisterPath)
                                          reject();
                                        },1500)
                                    } else 
                                    // 登录失败
                                    if (_res.code === LoginfailCode) {
                                        toast('登录失败！请重新尝试')
                                        reject();
                                    } 
                                    // 其他
                                    else {
                                      toast('登录失败！请重新尝试')
                                        reject();
                                    }
                                },
                                fail: function (error) {
                                    uni.hideLoading();
                                    toast('登录失败！请重新尝试')
                                    reject();
                                },
                                complete: function () {
                                }
                            });
                        
                    },
                    fail() {
                        uni.hideLoading();
                        //   未授权，跳转授权  
                        // 可能是自动登录，跳转到登录页面 
                        navigate(LoginPath)
                        reject();
                    }
                })

            }
        })
    })
}
