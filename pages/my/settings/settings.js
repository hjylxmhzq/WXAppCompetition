// pages/my/settings/settings.js
Page({
  data: {
    settings: [{
      text: "上课提醒",
      def: true
    }, {
      text: "事件提醒",
      def: true
    }],
    weekIndex: 0,
    weekArray: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      weekIndex: wx.getStorageSync("nowweek") - 1
    });
  },

  bindPickerChange: function(e) {
    this.setData({
      weekIndex: e.detail.value
    });

    let data = {
      nowweek: parseInt(e.detail.value) + 1
    }
    wx.setStorageSync('nowweek', parseInt(e.detail.value) + 1);
    wx.request({
      url: 'http://tony-space.top/wxapi/setnowweek',
      data,
      method: 'POST',
      header: {
        'content-Type': 'application/x-www-form-urlencoded',
        'Cookie': "app:sess=" + wx.getStorageSync("session_id")
      },
      success: function(res) {
        console.log('set current week successfully')
      }
    })
    console.log(parseInt(e.detail.value) + 1);
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {
    return {
      title: "有个课程表",
      path: "/pages/index/index?fromUserId=" + wx.getStorageSync('session_id'),
    };
  }
})