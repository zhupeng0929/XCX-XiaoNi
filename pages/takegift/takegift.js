var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    xn_userInfo: wx.getStorageSync('xn_userInfo'),
    giftlist: null,
    monthdata: null,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getgiftlist();
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
  //获取礼品数据
  getgiftlist: function () {
    var url = "/common/goods/getgiftlist.html?appid=99999999&sign=&userid=" + this.data.xn_userInfo.UserID;
    var that = this;
    app.sendRequest(url, (data) => {
      var repgiftlist = data.Data;
      if (repgiftlist.length > 0) {
        var goftmodel = repgiftlist[0].GiftModel;
        if (goftmodel.GoodsName.length >= 12) {
          goftmodel.GoodsName = goftmodel.GoodsName.substring(0, 12) + "...";
        }
        var giftlist = repgiftlist[0].GiftItemYearList[0].GiftItemList
        for (var idx in giftlist) {
          var subject = giftlist[idx];
          var goodsname = subject.GoodsName;
          if (goodsname.length >= 6) {
            subject.GoodsName = goodsname.substring(0, 6) + "...";
          }
          if (subject.Month <= repgiftlist[0].GiftModel.Month) {
            if (subject.IsGet) {
              subject.text = '已领取';
              subject.backimgurl = 'http://xiaoni.com/upload/201802/06/2018261121393009.png';
            }
            else {
              if (subject.Month == repgiftlist[0].GiftModel.Month)
              {
                subject.text = '未领取';
                subject.backimgurl = 'http://xiaoni.com/upload/201802/06/2018261121282831.png';
              }
             else
             {
                subject.text = '已过期';
                subject.backimgurl = 'http://xiaoni.com/upload/201802/06/2018261121393009.png';
             }
            }
            
          }
          else {
            subject.text = '未开启';
            subject.backimgurl = 'http://xiaoni.com/upload/201802/06/2018261121282831.png';
          }
        }
        that.setData({
          giftlist: repgiftlist[0].GiftItemYearList[0],//热门发现
          monthdata: repgiftlist[0].GiftModel
        })
      }
      // else {

      // }
    });
  },
})