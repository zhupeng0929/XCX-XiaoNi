const app = getApp()
// pages/mine/mine.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    motto: 'Hello World',
    userInfo: {},
    xn_userInfo: wx.getStorageSync('xn_userInfo'),
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    this.setData({
      xn_userInfo: wx.getStorageSync('xn_userInfo'),
    });
    wx.stopPullDownRefresh();
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  //事件处理函数
  bindViewTap: function () {
    this.setData({
      xn_userInfo: wx.getStorageSync('xn_userInfo'),
    });
  },
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function (e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo

    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {

              var that = this;
              // 请求自己的服务器，解密用户信息 获取unionId等加密信息
              wx.request({
                url: 'https://api.xiaoni.com/user/memberUser/getwinxinuserinfo.html',//自己的服务接口地址
                method: 'POST',
                header: {
                  'content-type': 'application/x-www-form-urlencoded'
                },
                data: {
                  encryptedData: res.encryptedData,
                  iv: res.iv,
                  code: app.globalData.code,
                  rawData: res.rawData,
                  signature: res.signature,
                  appid: 99999999,
                  sign: ''
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
                    that.data.xn_userInfo = xn_userInfo;
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
            }
          })
        }
      }
    })
  }
})