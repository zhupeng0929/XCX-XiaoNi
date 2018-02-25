var app = getApp();
const util = require("../../utils/util.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    xn_userInfo: wx.getStorageSync('xn_userInfo'),
    giftlist: [],
    point: 0,
    pageindex: 1,
    canloading:true,
    pagesize:10
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getgiftlist(this.data.pageindex);
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
    if (this.data.canloading){
      util.showLoading();
      this.getgiftlist(this.data.pageindex);
      setTimeout(function () {
        util.hideToast();
        wx.stopPullDownRefresh();
      }, 1000);
    }
    
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  getgiftlist: function (pageindex) {
    var url = "/common/point/getpointgiftlist.html?appid=99999999&sign=&userid=" + this.data.xn_userInfo.UserID + "&pageindex=" + pageindex;
    var that = this;
    app.sendRequest(url, (data) => {
      var repgiftlist = data.Data;
      // if (repgiftlist.length > 0) {
      //   for (var idx in repgiftlist) {
      //     var subject = repgiftlist[idx];
      //     var goodsname = subject.GoodsName;
      //     if (goodsname.length >= 10) {
      //       subject.GoodsName = goodsname.substring(0, 10) + "...";
      //     }
      //     var goodstitle = subject.GoodsTitle;
      //     if (goodstitle.length >= 12) {
      //       subject.GoodsTitle = goodstitle.substring(0, 12) + "...";
      //     }
      //   }
      that.setData({
        giftlist: that.data.giftlist.concat(repgiftlist),//热门发现
        pageindex: that.data.pageindex + 1,
        canloading: repgiftlist.length == this.data.pagesize,
      })
      // }
      // else {

      // }
    });
  }, 
  gotogiftdetail: function (e) {
    wx.navigateTo({
      url: '/pages/poingift/giftdetail?goodsid=' + e.currentTarget.dataset.postid
    })
  }
})