// pages/customized/customized.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    xn_userInfo: wx.getStorageSync('xn_userInfo'),
    datatime:"",
    findcategory:[],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getfindcategory();
    var showtime = app.showtime();
    this.setData({
      datatime: showtime
    })
  },
  //获取加盟店信息
  getfindcategory: function () {
    var url = "common/find/getfindcategorybyuser.html?appid=99999999" + "&userid=" + this.data.xn_userInfo.UserID;
    var that = this;
    app.sendRequest(url, (data) => {
      var repFindinfo = data.Data;
      if (repFindinfo.length > 0) {
        that.setData({
          findcategory: repFindinfo,//热门发现
        })
      }
      else {

      }
    });
  },
  makephonecall:function(){
    wx.makePhoneCall({
      phoneNumber: '13585266170' //仅为示例，并非真实的电话号码
    })
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
  
  }
})