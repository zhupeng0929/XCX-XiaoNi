// pages/goods.js
var app= getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    pageindex:1,
    goodsinfo:[],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getgoodsinfo(this.data.pageindex);
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
      goodsinfo: [],
      pageindex: 1
    });
    this.getgoodsinfo(this.data.pageindex);
    wx.stopPullDownRefresh();
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    this.getgoodsinfo(this.data.pageindex);
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  },
  getgoodsinfo: function (pageindex) {
    var url = "/common/goods/getgoodslist.html?appid=99999999&sign=&tagid=7&pageindex=" + pageindex;
    var that = this;
    app.sendRequest(url, (data) => {
      var repGoodsinfo = data.Data;
      if (repGoodsinfo.length > 0) {
        for (var idx in repGoodsinfo) {
          var subject = repGoodsinfo[idx];
          var goodsname = subject.GoodsName;
          if (goodsname.length >= 10) {
            subject.GoodsName = goodsname.substring(0, 10) + "...";
          }
          var goodstitle = subject.GoodsTitle;
          if (goodstitle.length >= 12) {
            subject.GoodsTitle = goodstitle.substring(0, 12) + "...";
          }
          if (subject.Characteristic==""){
            subject.Characteristic ="精选";
          }
        }
        that.setData({
          goodsinfo: that.data.goodsinfo.concat(repGoodsinfo),//热门发现
          pageindex: that.data.pageindex + 1,
        })
      }
      else {

      }
    });
  },
  gotogoodsdetail: function (e) {
    wx.navigateTo({
      url: '/pages/goods/detail/detail?goodsid=' + e.currentTarget.dataset.postid
    })
  }
})