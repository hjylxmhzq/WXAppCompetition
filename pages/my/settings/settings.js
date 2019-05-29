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

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

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

  bindPickerChange: function(e) {

    this.setData({
      weekIndex: e.detail.value
    });

    wx.setStorageSync('nowweek', parseInt(e.detail.value) + 1);
    wx.request({
      url: 'http://tony-space.top/wxapi/setnowweek',
      dataType: 'json',
      method: 'POST',
      header: {
        'Cookie': "app:sess=" + wx.getStorageSync("session_id")
      },
      success: function (res) {
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
      title: "某课程表",
      path: "/pages/index/index?fromUserId=" + wx.getStorageSync('session_id'),
    };
  }
})