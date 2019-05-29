// pages/remind/addreminder/addreminder.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    time: '00:00',
    date: '2019-01-01',
    courseArray: [],
    courseIndex: 1,
    inwayIndex: 0,
    inwayArray: ['微信', '无']
  },

  bindPickerChange(e) {
    this.setData({
      courseIndex: e.detail.value
    });
  },
  bindDateChange: function(e) {
    this.setData({
      date: e.detail.value
    });
  },
  bindTimeChange: function(e) {
    this.setData({
      time: e.detail.value
    });
  },
  submitform(e) {
    let data = {
      content: e.detail.value['reminder-content'],
      mark: e.detail.value['reminder-mark'],
      course: this.data.courseArray[this.data.courseIndex],
      date: this.data.date,
      time: this.data.time,
      inway: this.data.courseArray[this.data.courseIndex]
    };

    wx.request({
      url: 'http://tony-space.top/wxapi/addreminder',
      data,
      method: 'POST',
      header: {
        'content-Type': 'application/x-www-form-urlencoded',
        'Cookie': "app:sess=" + wx.getStorageSync("session_id")
      },
      success: function(res, statusCode) {
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
    let that = this;
    wx.request({
      url: 'http://tony-space.top/wxapi/getclass',
      dataType: 'json',
      method: 'GET',
      header: {
        'Cookie': "app:sess=" + wx.getStorageSync("session_id")
      },
      success: function(res) {
        let course = res.data;
        let courseArray = [];
        for (let c of course) {
          courseArray.push(c['coursename']);
        }
        courseArray = [...new Set(courseArray)];
        that.setData({
          courseArray
        });
      }
    });
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