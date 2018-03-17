// pages/customized/linggandetail.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    xn_userInfo: wx.getStorageSync('xn_userInfo'),
    finddetail: [],
    page: 1,
    categoryid:0,
    industryid: 0,
    brandid: 0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var categoryid = options.categoryid;//测试数据用
    this.getfinddetail(categoryid, 0, 0);
  },
  //获取加盟店信息
  getfinddetail: function (categoryid, industryid, brandid) {
    var url = "common/find/getfindfollowlist.html?appid=99999999" + "&userid=" + this.data.xn_userInfo.UserID + "&categoryid=" + categoryid + "&industryid=" + industryid + "&brandid=" + brandid + "&page=" + this.data.page;
    var that = this;
    app.sendRequest(url, (data) => {
      var repFindinfo = data.Data;
      if (repFindinfo.length > 0) {
        that.setData({
          finddetail: that.data.finddetail.concat(repFindinfo),//热门发现
          page: that.data.page + 1,
        })
      }
      else {

      }
    });
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
      finddetail: [],
      page: 1
    });
    this.getfinddetail(18, 0, 0);
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    this.getfinddetail(18, 0, 0);
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})