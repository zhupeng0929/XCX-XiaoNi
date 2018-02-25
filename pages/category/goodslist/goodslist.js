// pages/category/goodslist/goodslist.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goodsList: [],
    id:0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var id = options.id;
    var url = "common/goods/getgoodslist.html?appid=99999999&sign=&lastnumber=0&categoryid=" + id;
    this.data.id=id;
    app.sendRequest(url, this.processData);

  },
  processData:function(data){
    for (var idx in data.Data) {
      var goods = data.Data[idx];
      var goodsname = goods.GoodsName;
      var goodstitle = goods.GoodsTitle;
      if (goodsname.length >= 18) {
        data.Data[idx].GoodsName = goodsname.substring(0, 18) + "...";
      }
      if (goodstitle.length >= 22) {
        data.Data[idx].GoodsTitle = goodstitle.substring(0, 22) + "...";
      }
    }
    var totalMovies = {};
    totalMovies = this.data.goodsList.concat(data.Data);
    this.setData({
      goodsList: totalMovies
    });
    wx.hideNavigationBarLoading();
  },
 
  onScrollLower: function (event) {
    var nextUrl = "common/goods/getgoodslist.html?appid=99999999&sign=&categoryid=" + this.data.id + "&lastnumber=" + this.data.goodsList[this.data.goodsList.length - 1].GoodsID;
    app.sendRequest(nextUrl, this.processData);
    wx.showNavigationBarLoading()
  },
  onPullDownRefresh:function(e){

  },
  onReachBottom:function(e){
    this.onScrollLower();
  },
  gotogoodsdetail: function (e) {
    wx.navigateTo({
      url: '/pages/goods/detail/detail?goodsid=' + e.currentTarget.dataset.postid
    })
  }
})