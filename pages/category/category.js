var app = getApp();
Page({
  data: {
    navLeftItems: [],
    navRightItems: [],
    pid: 83,
    curNav: 205,
    curIndex: 0,
    toView: 'CategoryID205',
    scrollTop: 0,
    imgPath: 'http://www.xiaoni.com/upload/201708/17/20178171042463267.png'
  },
  onLoad: function () {
    // 加载的使用进行网络访问，把需要的数据设置到data数据对象  
    var that = this
    wx.request({
      url: 'https://api.xiaoni.com/common/goods/getgoodscategoryonetwolist.html?appid=99999999&sign=',
      method: 'POST',
      data: {},
      header: {
        "Content-Type": "json"
      },
      success: function (res) {
        console.log(res)
        that.setData({
          navLeftItems: res.data.Data

        })
      }
    }),
      wx.request({
      url: 'https://api.xiaoni.com/common/goods/getgoodscategorythreelist.html?appid=99999999&sign=&parentid=' + that.data.pid,
        method: 'POST',
        data: {},
        header: {
          "Content-Type": "json"
        },
        success: function (res) {
          console.log(res)
          that.setData({
            navRightItems: res.data.Data
          })
        }
      })

  },

  //事件处理函数  
  switchRightTab: function (e) {
    // 获取item项的id，和数组的下标值  
    var that = this
    let id = e.target.dataset.id,
      itemindex = parseInt(e.target.dataset.itemindex),
      index = parseInt(e.target.dataset.index),
      pid = parseInt(e.target.dataset.pid);
    if (that.data.curNav != id && that.data.pid!=index) {
      var url = "common/goods/getgoodscategorythreelist.html?appid=99999999&sign=&parentid=" + pid;
      app.sendRequest(url, this.setRightData);

    }
    if (this.data.navRightItems!=null)
    {
      var h = itemindex * 25;
      for (var i = 0; i < itemindex; i++) {
        h += 90 * (((this.data.navRightItems[i].DataList.length) / 3) + 0.3).toFixed(0);
      }
    }
    

    // 把点击到的某一项，设为当前itemindex
    this.setData({
      curNav: id,
      pid:pid,
      curIndex: itemindex,
      toView: e.target.dataset.itemid,
      scrollTop: h,
      imgPath: this.data.navLeftItems[index].AdvPictureFilePath
    })
  },
  setRightData: function (data) {
    this.setData({
      navRightItems: data.Data

    })
  },
  onReady: function () {
  },
  getGoodsList: function (event){
    var id = event.currentTarget.dataset.id;
    wx.navigateTo({
      url: './goodslist/goodslist?id=' + id
    })
  }
})  