var app = getApp();
const util = require("../../utils/util.js");
var types = ["1", "2", "3"];
//1->全部;11->待付款;13->待收货;21->已完成;20->取消;
var DATATYPE = {
  ALLDATATYPE: "1",
  TOPAYTYPE: "2",
  TOGETTYPE: "3"
};
var lastnumber = 0;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    xn_userInfo: wx.getStorageSync('xn_userInfo'),
    allDataList: [],
    topayDataList: [],
    togetDataList: [],
  
    topTabItems: ["未使用", "已使用", "已过期"],
    currentTopItem: "0",

  },
  /**
 * 生命周期函数--监听页面加载
 */
  onLoad: function (options) {
    var id = 0;
    lastnumber = 0;
    this.setData({
      currentTopItem: id
    });
    this.getusercoupon();
    this.refreshNewData();
  },
  getusercoupon:function(){
    var that = this;
    var action = "common/order/getcouponcount.html";
    var parameters = 'userid=' + this.data.xn_userInfo.UserID;
  
    util.request(action, parameters, function (res) {
      var data = res.data.Data
     that.setData({
       topTabItems: ["未使用" + "(" + data[0] + ")", "已使用" + "(" + data[1] + ")", "已过期" + "(" + data[2] + ")"]
     });
     
     
    });
  },
  //切换顶部标签
  switchTab: function (e) {
    lastnumber = 0;
    this.setData({
      currentTopItem: e.currentTarget.dataset.idx
    });
    // 如果需要加载数据

    this.refreshNewData();

  },

  //swiperChange
  bindChange: function (e) {
    lastnumber = 0;
    var that = this;
    that.setData({
      currentTopItem: e.detail.current
    });

    //如果需要加载数据
    this.refreshNewData();
  },
  //刷新数据
  refreshNewData: function () {
    //加载提示框
    util.showLoading();

    var that = this;
    var action = "common/order/getcouponmylist.html";
    var parameters = 'userid=' + this.data.xn_userInfo.UserID + '&status=' + types[this.data.currentTopItem];
    console.log("parameters = " + parameters);
    util.request(action, parameters, function (res) {
      if (res.data.Data.length>0){
        lastnumber = res.data.Data[res.data.Data.length - 1].CouponID;
        that.setNewDataWithRes(res, that);
      }
      setTimeout(function () {
        util.hideToast();
        wx.stopPullDownRefresh();
      }, 1000);
    });
  },
  //设置新数据
  setNewDataWithRes: function (res, target) {
    var data = res.data.Data;
    for (var idx in data) {
      var subject = data[idx];
      subject.BaseModel.BeginTime = subject.BaseModel.BeginTime.substring(0, 10) ;
      subject.BaseModel.EndTime = subject.BaseModel.EndTime.substring(0, 10);
    }
    switch (types[this.data.currentTopItem]) {
      //全部
      case DATATYPE.ALLDATATYPE:
        target.setData({
          allDataList: data
        });
        break;
      //视频
      case DATATYPE.TOPAYTYPE:

        target.setData({
          topayDataList: data
        });
        break;
      //图片
      case DATATYPE.TOGETTYPE:
        target.setData({
          togetDataList: data
        });
        break;
      default:
        break;
    }
  },
  //加载更多操作
  loadMoreData: function () {
    console.log("加载更多");
    //加载提示框
    util.showLoading();

    var that = this;
    var action = "common/order/getcouponmylist.html";
    var parameters = 'userid=' + this.data.xn_userInfo.UserID + '&status=' + types[this.data.currentTopItem] + "&lastnumber=" + lastnumber;
    console.log("parameters = " + parameters);
    util.request(action, parameters, function (res) {
      lastnumber = res.data.Data[res.data.Data.length - 1].CouponID;
      that.setMoreDataWithRes(res, that);
      setTimeout(function () {
        util.hideToast();
        wx.stopPullDownRefresh();
      }, 1000);
    });
  },
  setMoreDataWithRes(res, target) {
    var data = res.data.Data;
    for (var idx in data) {
      var subject = data[idx];
      subject.BaseModel.BeginTime = subject.BaseModel.BeginTime.substring(0, 10);
      subject.BaseModel.EndTime = subject.BaseModel.EndTime.substring(0, 10);
    }
    switch (types[this.data.currentTopItem]) {

      //全部
      case DATATYPE.ALLDATATYPE:
        target.setData({
          allDataList: target.data.allDataList.concat(data)
        });
        break;
      //视频
      case DATATYPE.TOPAYTYPE:

        target.setData({
          topayDataList: target.data.topayDataList.concat(data)
        });
        break;
      //图片
      case DATATYPE.TOGETTYPE:
        target.setData({
          togetDataList: target.data.togetDataList.concat(data)
        });
        break;
      default:
        break;
    }
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
    this.refreshNewData();
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    this.loadMoreData();
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})