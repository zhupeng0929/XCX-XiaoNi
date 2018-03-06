// pages/find/find.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {/*  */
    findid: 0,
    findinfo:{},
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      findid: options.findid
    })
    this.getfindinfodetail(this.data.findid);
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

  },
   getfindinfodetail: function (findid) {
     var url = "common/find/getfindinfo.html?appid=99999999&sign=&findid=" + findid;
    var that = this;
    app.sendRequest(url, (data) => {
      var repFindinfo = data.Data;
      repFindinfo.CreateTime = app.getTimeText(repFindinfo.CreateTime);
        that.setData({
          findinfo: repFindinfo,
        })
     
    });
  },
   makePhoneCall:function(){
     wx.makePhoneCall({
       phoneNumber: '4007108886' 
     })
   }
})