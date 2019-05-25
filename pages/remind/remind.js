// pages/remind/remind.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    firstRemind: {
      date: '4月17日',
      day: '星期四',
      time: '9:00',
      course: '高等数学',
      content: '第四章随堂小测',
      mark: '本章内容较多'
    },

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
      url: 'http://tony-space.top/wxapi/getreminder',
      dataType: 'json',
      method: 'POST',
      header: {
        'Cookie': "app:sess=" + wx.getStorageSync("session_id")
      },
      success: function(res) {
        let data = res.data;
        data.sort(function(a,b) {
          a = +new Date(a['remind_date']+' '+a['remind_time']);
          b = +new Date(b['remind_date'] + ' ' + b['remind_time']);
          return a - b;
        })
        data = data.filter(function(item) {
          let now = +new Date();
          let thistime = +new Date(item['remind_date'] + ' ' + item['remind_time'])
          if (thistime - now > 0){
            return true;
          } else {
            return false;
          }
        });
        let d = data.map(function(item) {
          let daylist = ['一', '二', '三', '四', '五', '六', '天']
          let day = daylist[(new Date(item['remind_date'] + ' ' + item['remind_time']).getDay()-1)];

          return {
            date: item['remind_date'].split('-')[1] + '月' + item['remind_date'].split('-')[2]+'日',
            day: '星期'+day,
            time: item['remind_time'],
            course: item['course']||'未关联课程',
            content: item['content'] || '无内容',
            mark: item['mark'] || '无备忘',
            uid: item['uniqueid']
          }
        })
        console.log(data);
        let defaultDate = {
          date: '日期',
          day: '星期',
          time: '时间',
          course: '',
          content: '还未设置提醒',
          mark: '还未设置提醒'
        }
        that.setData({
          firstRemind: d.length>0?d[0]:defaultDate,
          otherRemindArray: d.slice(1)
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