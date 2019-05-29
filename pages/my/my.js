// pages/my/my.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    settings: [{
      icon: "/icon/set.png",
      text: "设置",
      nav: "/pages/my/settings/settings"
    }, {
      icon: "/icon/share.png",
      text: "分享",
      nav: "/pages/my/share/share"
    }, {
      icon: "/icon/about.png",
      text: "关于我们",
      nav: "/pages/my/about/about"
    }]
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