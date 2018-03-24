var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userinfo:[],
    goodsinfo: [], 
    findhotinfo:[],
    page:1,
    screenWidth:0,
    userid:0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var userid = options.userid;
    this.setData({
      userid: userid
    });
    this.getmemberuserinfo(userid);
    this.getcityshopgoodslist(userid);
    this.getfindinfo(this.data.page, userid);
    var that=this;
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          screenWidth: res.screenWidth
        }); 
      }
    })
  },
//获取
  getmemberuserinfo:function(userid){
    var url = "user/memberuser/getmemberuserinfo.html?appid=99999999&userid=" + userid;
    app.sendRequest(url, (data) => {
      this.setData({
        userinfo: data.Data
      });
    });
  },
  getcityshopgoodslist: function (userid) {
    var url = "common/setting/getcityshopgoodslist.html?appid=99999999&userid=" + userid;
    app.sendRequest(url, (data) => {
      
      this.setData({
        goodsinfo: data.Data
      });
    });
  },//获取发现列表
  getfindinfo: function (page) {
    var url = "common/find/getfindfollowlist.html?appid=99999999&page=" + page + "&userids=" + this.data.userid + "&type=3";
    var that = this;
    app.sendRequest(url, (data) => {
      var repFindinfo = data.Data;
      if (repFindinfo.length > 0) {
        for (var idx in repFindinfo) {
          var subject = repFindinfo[idx];
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
      findhotinfo: [],
      page: 1
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
  
  }
})