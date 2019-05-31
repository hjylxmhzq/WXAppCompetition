// pages/my/settings/settings.js
Page({
  data: {
    settings: [{
      text: "上课提醒",
      def: true
    }, {
      text: "事件提醒",
      def: true
    }]
  },

  onLoad: function(options) {
    this.setData({
      weekcountIndex: wx.getStorageSync('weekcount') - 1 || 20,
      weekArray: new Array(wx.getStorageSync('weekcount') || 20).fill(1).map((item, idx) => idx + 1),
      weekIndex: wx.getStorageSync('nowweek') - 1,
      weekcountArray: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25]
    });
  },

  onPullDownRefresh: function() {
    this.onLoad();
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
      url: 'https://tony-space.top/wxapi/setnowweek',
      data,
      method: 'POST',
      header: {
        'content-Type': 'application/x-www-form-urlencoded',
        'Cookie': "app:sess=" + wx.getStorageSync("session_id")
      },
      success: function() {
        wx.showToast({
          title: '当前周数已同步',
          icon: 'success'
        })
      }
    });
  },

  bindCountPickerChange: function(e) {
    this.setData({
      weekcountIndex: e.detail.value
    });
    wx.setStorageSync('weekcount', parseInt(e.detail.value) + 1);
    console.log(parseInt(e.detail.value) + 1)
    this.onLoad();
  },

  onShareAppMessage: function() {
    return {
      title: "有个课程表",
      path: "/pages/index/index?fromUserId=" + wx.getStorageSync('session_id'),
    };
  }
})