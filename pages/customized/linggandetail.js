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

    tabTxt: ['默认', '全部企业', '全部行业'],//tab文案
    tab: [true, true, true],
    disabled: false,//加载更多按钮状态
    FindCategoryList:[],
    IndustryList:[],
    BrandList:[],
    flag:true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var categoryid = options.categoryid;//测试数据用
    var CategoryName = options.CategoryName;
    this.setData({
      categoryid: categoryid,
      'tabTxt[0]': CategoryName
    });
    this.getfinddetail(categoryid, 0, 0);
    this.getfindcategoryindustrybrand();
  },
  // 选项卡
  filterTab: function (e) {
    var data = [true, true, true], index = e.currentTarget.dataset.index;
   
    data[index] = !this.data.tab[index];
    var flag = data[index]
    this.setData({
      tab: data,
      flag: flag
    })
  },
  bindcover:function(){
    var flag = !this.data.flag;
    this.setData({
      flag: flag,
      tab: [true, true, true],
    })
  },
  //筛选项点击操作
  filter: function (e) {
    var self = this, id = e.currentTarget.dataset.id, txt = e.currentTarget.dataset.txt, tabTxt = this.data.tabTxt;
    switch (e.currentTarget.dataset.index) {
      case '0':
        tabTxt[0] = txt;
        self.setData({
         
          categoryid: id
        });
        break;
      case '1':
        tabTxt[1] = txt;
        self.setData({
          brandid : id
        });
        break;
      case '2':
        tabTxt[2] = txt;
        self.setData({
          industryid: id
        });
        break;
    }
    var flag = !self.data.flag;
    self.setData({
      page: 1,
      tab: [true, true, true],
      tabTxt: tabTxt,
      finddetail: [],
      flag: flag,
    });
    //数据筛选
    self.getfinddetail(this.data.categoryid, this.data.industryid, this.data.brandid);
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
  getfindcategoryindustrybrand:function(){
    var url = "common/find/getfindcategoryindustrybrand.html?appid=99999999" 
    var that = this;
    app.sendRequest(url, (data) => {
      var repdata = data.Data;
      if (repdata!=null) {
        console.log(repdata.BrandList[0].LogoImgPath=="");
        that.setData({
          FindCategoryList: repdata.FindCategoryList,//
          IndustryList: repdata.IndustryList,//
          BrandList: repdata.BrandList,//
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
    this.getfinddetail(this.data.categoryid, this.data.industryid, this.data.brandid);
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    this.getfinddetail(this.data.categoryid, this.data.industryid, this.data.brandid);
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})