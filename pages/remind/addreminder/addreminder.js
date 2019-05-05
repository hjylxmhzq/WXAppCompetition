// pages/remind/addreminder/addreminder.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    time: '00:00',
    date: '2019-01-01',
    courseArray: [
      '高等数学',
      '大学英语',
      '大学物理'
    ],
    courseIndex: 1,
    inwayIndex: 0,
    inwayArray: ['微信']
  },


  bindPickerChange(e) {
    this.setData({
      courseIndex: e.detail.value
    })
  },
  bindDateChange: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      date: e.detail.value
    })
  },
  bindTimeChange: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      time: e.detail.value
    })
  },
  submitform(e) {
    let data = {
      content: e.detail.value['reminder-content'],
      mark: e.detail.value['reminder-mark'],
      course: this.data.courseArray[this.data.courseIndex],
      date: this.data.date,
      time: this.data.time,
      inway: this.data.courseArray[this.data.courseIndex]
    }

    wx.request({
      url: 'http://127.0.0.1:8005/addreminder',
      data,
      method: 'POST',
      header: {
        'content-Type': 'application/x-www-form-urlencoded',
        'Cookie': "app:sess="+wx.getStorageSync("session_id")
      },
      success: function (res, statusCode) {
        if (res.statusCode == 201) {
          wx.navigateTo({
            url: '/pages/remind/remind',
          })
        } else {
          console.log('add reminder fail');
        }
      },
      fail: function(res) {
        console.log('fail to add reminder');
      }
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

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

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})