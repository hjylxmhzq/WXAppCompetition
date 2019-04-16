// pages/index/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cardsArray: [],
    todayClassesArray: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.request({
      url: "api.godr.top",
      data:{
        
      }
    });


    this.setData({

    });
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})