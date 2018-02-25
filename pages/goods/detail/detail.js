// pages/goods/detail/detail.js
var WxParse = require('../../../components/wxParse/wxParse.js');
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
  goodsdetailinfo:"",
  topTabItems: ["商品", "详情"],
  currentTopItem: "0",
  GoodsDesc:"",
  },
  //切换顶部标签
  switchTab: function (e) {
    this.setData({
      currentTopItem: e.currentTarget.dataset.idx
    });
    //如果需要加载数据
    // if (this.needLoadNewDataAfterSwiper()) {
    //   this.refreshNewData();
    // }
  },

  //swiperChange
  bindChange: function (e) {
    var that = this;
    that.setData({
      currentTopItem: e.detail.current
    });

    //如果需要加载数据
    // if (this.needLoadNewDataAfterSwiper()) {
    //   this.refreshNewData();
    // }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var goodsid = options.goodsid;//测试数据用
    this.getgoodsdetailinfo(goodsid);
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
  getgoodsdetailinfo: function (goodsid) {
    var url = "/common/goods/getgoodsdetail.html?appid=99999999&sign=&goodsid=" + goodsid;
    var that = this;
    app.sendRequest(url, (data) => {
      var repGoodsinfo = data.Data;
      if (repGoodsinfo != "" && repGoodsinfo!=undefined) {
       
        that.setData({
          goodsdetailinfo: repGoodsinfo,
           GoodsDesc: WxParse.wxParse('GoodsDesc', 'html', repGoodsinfo.GoodsDesc, that, 0)
        })
      }
      else {

      }
    });
  },
})