// pages/home/home.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    page: 1,
    pageSize: 30,
    findhotinfo:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //this.getswiperimgs();
    //this.getshopsinfo();
    //this.getschemesinfo();
    this.getfindinfo(this.data.page);
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
      findhotinfo: [],
      page:1
    });
    this.getfindinfo(this.data.page);
    wx.stopPullDownRefresh();
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    this.getfindinfo(this.data.page);
    
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  //获取滚动图片
  getswiperimgs: function () {
    var url = "common/advert/getindexadvertlist";
    app.sendRequest(url, this.setSwiperData);
  },
  //设置滚动数据
  setSwiperData: function (data) {
    this.setData({
      imgs: data
    });
  },
  //获取加盟店信息
  getshopsinfo: function () {
    var url = "common/setting/getcityshopbycity?cityname=宿迁&pagesize=3";
    app.sendRequest(url, (data) => {
      var movies = [];
      for (var idx in data.Data) {
        var subject = data.Data[idx];
        var title = subject.ProvinceName +
          subject.CityName + subject.CountryName + subject.Address;
        if (title.length >= 18) {
          subject.title = title.substring(0, 18) + "...";
        }
      }
      this.setData({
        shopsinfo: data.Data
      });
    });
  },
  getschemesinfo: function () {
    var url = "common/scheme/getschemelist?categoryid=0&tagid=1";
    app.sendRequest(url, (data) => {
      for (var idx in data.Data) {
        var subject = data.Data[idx];
        var title = subject.SchemeSubTitle;
        if (title.length >= 45) {
          subject.SchemeSubTitle = title.substring(0, 45) + "...";
        }
      }
      this.setData({
        schemesinfo: data.Data
      });
    });
  },//获取发现列表
  getfindinfo: function (page){
    var url = "common/find/getfindfollowlist.html?appid=99999999&sign=&type=1&page=" + page;
    var that=this;
    app.sendRequest(url, (data) => {
      var repFindinfo = data.Data;
      if (repFindinfo.length>0){
        for (var idx in repFindinfo) {
          var subject = repFindinfo[idx];
          var title = subject.FindContent;
          if (title.length >= 15) {
            subject.FindContentSub = title.substring(0, 15) + "...";
          }
          subject.CreateTime = app.getTimeText(subject.CreateTime);
          subject.imgCount = subject.FindImgs.length;
        }
        that.setData({
          findhotinfo: that.data.findhotinfo.concat(repFindinfo),//热门发现
          page:that.data.page+1,
        })
      }
      else{

      }
    });
  },
})