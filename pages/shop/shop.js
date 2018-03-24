var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    shopsinfo: [],
    page: 1,
    findhotinfo: [],
    shopid: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.getLocation({
      type: 'gcj02', //返回可以用于wx.openLocation的经纬度
      success: function (res) {
       console.log(res);
        
      }
    })
    this.getshopsinfo();

  },
  //获取加盟店信息
  getshopsinfo: function () {
    var url = "common/setting/getcityshopbycity.html?appid=99999999&cityname=宿迁&pagesize=3";
    app.sendRequest(url, (data) => {
      var shopid = '';
      for (var idx in data.Data) {
        var subject = data.Data[idx];
        var title = subject.ProvinceName +
          subject.CityName + subject.CountryName + subject.Address;
        if (title.length >= 18) {
          subject.title = title.substring(0, 18) + "...";
        }
        shopid += subject.UserID + ',';
      }
      this.setData({
        shopsinfo: data.Data,
        shopid: shopid
      });
      this.getfindinfo(this.data.page);
    });
  },
  getfindinfo: function (page) {
    var url = "common/find/getfindfollowlist.html?appid=99999999&page=" + page + "&userids=" + this.data.shopid + "&type=3";
    var that = this;
    app.sendRequest(url, (data) => {
      var repFindinfo = data.Data;
      if (repFindinfo.length > 0) {
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
      shopsinfo: [],
      page: 1,
      findhotinfo:[],
      shopid:'',
    });
    this.getshopsinfo();
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
    var that = this;
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
  }
})