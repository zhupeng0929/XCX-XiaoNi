// pages/goods/detail/detail.js
var WxParse = require('../../../components/wxParse/wxParse.js');
import { $wuxXnumber } from '../../../components/wux'
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goodsid: 0,
    goodsdetailinfo: "",
    topTabItems: ["商品", "详情"],
    currentTopItem: "0",
    GoodsDesc: "",
    chooseSize: false,
    skulist: [],
    skudefault: [],
    skuoptlist: [],
    totalprice: "0.00",
    zbf: 0,
    yzf: 0,
    price: 0,
    mincount: 0,
  },
  //切换顶部标签
  switchTab: function (e) {
    this.setData({
      currentTopItem: e.currentTarget.dataset.idx
    });
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
    // var goodsid = options.goodsid;//测试数据用
    var goodsid = 6384;
    this.setData({
      goodsid: goodsid,
    })

    this.getgoodsdetailinfo(this.data.goodsid);
    this.getgoodsskuattrlist(this.data.goodsid);
    // this.getgoodsskuinfodefault(this.data.goodsid);

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
      if (repGoodsinfo != "" && repGoodsinfo != undefined) {

        that.setData({
          goodsdetailinfo: repGoodsinfo,
          GoodsDesc: WxParse.wxParse('GoodsDesc', 'html', repGoodsinfo.GoodsDesc, that, 0)
        })
      }
      else {

      }
    });
  },
  getgoodsskuattrlist: function (goodsid) {
    var url = "/common/goods/getgoodsskuattrlist.html?appid=99999999&sign=&goodsid=" + goodsid;
    var that = this;
    app.sendRequest(url, (data) => {
      var repskuinfolist = data.Data;
      if (repskuinfolist != "" && repskuinfolist != undefined) {
        that.setData({
          skulist: repskuinfolist,
        });
        that.getgoodsskuinfodefault(goodsid);
      }
      else {

      }
    });
  },
  getgoodsskuinfodefault: function (goodsid) {
    var url = "/common/goods/getgoodsskuinfodefault.html?appid=99999999&sign=&goodsid=" + goodsid;
    var that = this;
    app.sendRequest(url, (data) => {
      var repskuinfodefault = data.Data;
      if (repskuinfodefault != "" && repskuinfodefault != undefined) {
        that.setData({
          skudefault: repskuinfodefault,
        });
        that.getgoodsskuinfobyoptidlist(goodsid, repskuinfodefault.OptIDStr);
      }
      else {

      }
    });
  },
  getgoodsskuinfobyoptidlist: function (goodsid, optidlist) {
    var url = "/common/goods/getgoodsskuinfobyoptidlist.html?appid=99999999&sign=&goodsid=" + goodsid + "&optidlist=" + optidlist;
    var that = this;
    app.sendRequest(url, (data) => {
      var repskuopt = data.Data;
      if (repskuopt != "" && repskuopt != undefined) {
        that.setData({
          skuoptlist: repskuopt,
        });
        var skulist = that.data.skulist;
        if (that.data.skulist != null) {
          for (var idx in skulist) {
            var sku = skulist[idx];
            for (var iditem in sku.mSkuOptInfoList) {
              var opt = sku.mSkuOptInfoList[iditem];
              for (var idfault in that.data.skuoptlist.mGoodsSkuDetailList) {
                if (opt.OptID == that.data.skuoptlist.mGoodsSkuDetailList[idfault].OptID) {
                  opt.active = true;
                  break;
                }
                else {
                  opt.active = false;
                }
              }
            }
          }
          that.setData({
            skulist: skulist,
            totalprice: (repskuopt.GoodsStepPriceModel.PriceList[0].Q * repskuopt.GoodsStepPriceModel.PriceList[0].P + repskuopt.GoodsStepPriceModel.ZBF + repskuopt.GoodsStepPriceModel.YZF * repskuopt.GoodsStepPriceModel.PriceList[0].Q).toFixed(2),
            zbf: repskuopt.GoodsStepPriceModel.ZBF,
            yzf: repskuopt.GoodsStepPriceModel.YZF * repskuopt.GoodsStepPriceModel.PriceList[0].Q,
            price: repskuopt.GoodsStepPriceModel.PriceList[0].P,
            mincount: repskuopt.GoodsStepPriceModel.PriceList[0].Q,
          });
          $wuxXnumber.init('num', {
            min: repskuopt.MinOrderQuantity,
            // max: 8,
           value: 1,
            callback: (value) => {
              var skuopt = that.data.skuoptlist.GoodsStepPriceModel;
              var skuprice = that.data.skuoptlist.GoodsStepPriceModel.PriceList[0];
              that.setData({
                totalprice: (value * skuprice.P + skuopt.ZBF + skuopt.YZF * value).toFixed(2),
                yzf: skuopt.YZF * value,
              });
            },
          })
        }
      }
      else {

      }
    });
  },
//切换sku
  selectopt: function (e) {
    var optidlist = "";
    var optid = e.currentTarget.dataset.optid;
    var SkuID = e.currentTarget.dataset.skuid;
    var skulist = this.data.skulist;
    for (var ids in skulist) {
      for (var optidindex in skulist[ids].mSkuOptInfoList) {
        if (skulist[ids].mSkuOptInfoList[optidindex].OptID == optid) {
          skulist[ids].mSkuOptInfoList[optidindex].active = true;
        }
        else {
          skulist[ids].mSkuOptInfoList[optidindex].active = false;
        }
        if (skulist[ids].mSkuOptInfoList[optidindex].active) {
          optidlist += skulist[ids].mSkuOptInfoList[optidindex].OptID + ","
        }
      }
    }

    this.getgoodsskuinfobyoptidlist(this.data.goodsid, optidlist);

  },

  chooseSezi: function (e) {
    // 用that取代this，防止不必要的情况发生
    var that = this;
    // 创建一个动画实例
    var animation = wx.createAnimation({
      // 动画持续时间
      duration: 500,
      // 定义动画效果，当前是匀速
      timingFunction: 'linear'
    })
    // 将该变量赋值给当前动画
    that.animation = animation
    // 先在y轴偏移，然后用step()完成一个动画
    animation.translateY(500).step()
    // 用setData改变当前动画
    that.setData({
      // 通过export()方法导出数据
      animationData: animation.export(),
      // 改变view里面的Wx：if
      chooseSize: true
    })
    // 设置setTimeout来改变y轴偏移量，实现有感觉的滑动
    setTimeout(function () {
      animation.translateY(0).step()
      that.setData({
        animationData: animation.export()
      })
    }, 200)
  },
  hideModal: function (e) {
    var that = this;
    var animation = wx.createAnimation({
      duration: 1000,
      timingFunction: 'linear'
    })
    that.animation = animation
    animation.translateY(200).step()
    that.setData({
      animationData: animation.export()

    })
    setTimeout(function () {
      animation.translateY(0).step()
      that.setData({
        animationData: animation.export(),
        chooseSize: false
      })
    }, 200)
  }
})