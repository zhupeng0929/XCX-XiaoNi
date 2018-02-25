//app.js
App({
  onLaunch: function () {
    require('./utils/sdk-v1.1.1.js')
    // 初始化 SDK
    let clientID = '8bccab861f6f95f47928'
    wx.BaaS.init(clientID)

    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        this.globalData.code = res.code;
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo;
              var that = this;
              // 请求自己的服务器，解密用户信息 获取unionId等加密信息
              wx.request({
                url:'https://api.xiaoni.com/user/memberUser/getwinxinuserinfo.html',//自己的服务接口地址
                method: 'POST',
                header: {
                  'content-type': 'application/x-www-form-urlencoded'
                },
                data: {
                  encryptedData: res.encryptedData,
                  iv: res.iv,
                  code: this.globalData.code ,
                  rawData: res.rawData,
                  signature: res.signature,
                  appid:99999999,
                  sign:''
                },
                success: function (data) {
                  //4.解密成功后 获取自己服务器返回的结果
                  if (data.data.Code == "Success") {
                    console.log('解密成功');
                    var xn_userInfo = data.data.Data;
                    if (xn_userInfo.BackImgFilePath == '') {
                      xn_userInfo.BackImgFilePath = 'http://xiaoni.com/upload/201801/31/2018131162402007.png'
                    }
                    // this.globalData.openid = encryptInfo.openId;
                    that.globalData.xn_userInfo = xn_userInfo;
                    //  wx.setStorageSync('openid', encryptInfo.openId); // 单独存储openid
                    wx.setStorageSync('xn_userInfo', xn_userInfo); // 存储解密之后的数据
                  } else {
                    console.log('解密失败')
                  }

                },
                fail: function (res) {
                  console.log(res);
                  console.log('请求错误')
                }
              })

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  globalData: {
    
    userInfo: null,
    xn_userInfo:null,
    doubanBase: "https://api.xiaoni.com/",
  },
  sendRequest: function (url, callBack) {
    wx.request({
      url: this.globalData.doubanBase + url,
      method: 'POST',
      header: {
        "Content-Type": "json"
      },
      success: function (res) {
        callBack(res.data);
      },
      fail: function (error) {
        console.log(error)
      }
    })
  },
  getTimeS: function (argument) {
    var timeS = argument;
    timeS = timeS.replace(/[年月]/g, '/').replace(/[日]/, '');
    return new Date().getTime() - new Date(timeS).getTime() - 1000; //有一秒的误差  

  },
  getTimeText: function (argument) {
    var timeS = argument;
    var todayT = ''; //  
    var yestodayT = '';
    var timeCha = this.getTimeS(timeS);
    timeS = timeS.slice(11);
    todayT = new Date().getHours() * 60 * 60 * 1000 + new Date().getMinutes() * 60 * 1000 + new Date().getSeconds() * 1000;
    yestodayT = todayT + 24 * 60 * 60 * 1000;
    if (timeCha > yestodayT) {
      return argument.slice(0, 10);
    }
    if (timeCha > todayT && timeCha < yestodayT) {
      return '昨天 ' + timeS.slice(0, 5);
    }
    if (timeCha < todayT) {
      return timeS.slice(0, 2) >= 12 ? '下午' + (timeS.slice(0, 2) == 12 ? 12 : timeS.slice(0, 2) - 12) + timeS.slice(2, 5) : '上午' + timeS.slice(0, 5);
    }

  }
})