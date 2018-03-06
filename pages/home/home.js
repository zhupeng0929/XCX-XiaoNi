// pages/home/home.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    page: 1,
    pageSize: 30,
    findhotinfo:[],
    userid: 0,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
 var that=this;
    if (app.globalData.xn_userInfo) {
      this.setData({
        userid: app.globalData.xn_userInfo.UserID
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.xn_userInfoReadyCallback = function(res) {
        console.log(res);
        that.setData({
          userid: res.UserID
        });
        that.getfindinfo(that.data.page);
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            
          })
        }
      })
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
  onShareAppMessage: function (res) {

var that=this;
   var findid = parseInt(res.target.id);
    var infos = app.findArray(this.data.findhotinfo, { FindID: findid });

    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
    }
    return {
      title: infos.FindSubTitle,
      path: '/pages/find/find?findid=' + findid,
      imageUrl: infos.FindImgs[0].FilePath,
      success: function (res) {
        // 转发成功
      },
      fail: function (res) {
        // 转发失败
      }
    }
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
    var url = "common/find/getfindfollowlist.html?appid=99999999&sign=&type=1&page=" + page + "&userid=" + this.data.userid;
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
  dianzan:function(e){
    console.log('点赞');
  }
})