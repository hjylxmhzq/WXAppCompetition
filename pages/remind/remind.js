// pages/remind/remind.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    cardDate: '4月16日',
    cardDay: '星期四',
    cardCourse: '高等数学',
    cardTime: '8:00',
    cardContent: '第四章随堂小测',
    cardMark: '注：本章内容较多',
    otherRemindArray: [{
      date: '4月17日',
      day: '星期四',
      time: '9:00',
      course: '高等数学',
      content: '第四章随堂小测',
      mark: '本章内容较多'
    }, {
      date: '4月17日',
      day: '星期四',
      time: '9:00',
      course: '高等数学',
      content: '第四章随堂小测',
      mark: '本章内容较多'
    }]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let that = this;
    wx.request({
      url: 'http://127.0.0.1:8005/getreminder',
      dataType: 'json',
      method: 'POST',
      header: {
        'Cookie': "app:sess=" + wx.getStorageSync("session_id")
      },
      success: function(res) {
        that.setData({
          remindData: res.data
        });
      },
      fail: function() {
        console.log('request reminder data fail');
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {},

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {
    return {
      title: "某课程表",
      path: "/pages/index/index?fromUserId=" + wx.getStorageSync('session_id'),
    };
  }
})