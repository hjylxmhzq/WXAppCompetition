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
      url: "tony-space.top",
      data: {
        /*...options,
        sessionId: wx.getStorageSync("session_id"),
        page: "index"*/
      },
      success: res => {
        if (res.statusCode === 200) {
          this.setData({
            
          });
        }
      }
    });
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    return {
      title: "某课程表",
      path: "/pages/index/index?fromUserId=" + wx.getStorageSync('session_id'),
    };
  }
})