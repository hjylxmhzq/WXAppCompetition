// pages/remind/remind.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    firstRemind: {},
    otherRemindArray: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let that = this;
    wx.request({
      url: 'http://tony-space.top/wxapi/getreminder',
      dataType: 'json',
      method: 'GET',
      header: {
        'Cookie': "app:sess=" + wx.getStorageSync("session_id")
      },
      success: function(res) {
        let data = res.data;
        data.sort(function(a, b) {
          a = +new Date(a['remind_date'] + ' ' + a['remind_time']);
          b = +new Date(b['remind_date'] + ' ' + b['remind_time']);
          return a - b;
        });

        data = data.filter(function(item) {
          let now = +new Date();
          let thistime = +new Date(item['remind_date'] + ' ' + item['remind_time'])
          if (thistime - now > 0) {
            return true;
          } else {
            return false;
          }
        });

        let d = data.map(function(item) {
          let daylist = ['一', '二', '三', '四', '五', '六', '日']
          let day = daylist[(new Date(item['remind_date'] + ' ' + item['remind_time']).getDay() - 1)];
          return {
            date: item['remind_date'].split('-')[1] + '月' + item['remind_date'].split('-')[2] + '日',
            day: '星期' + day,
            time: item['remind_time'],
            course: item['course'] || '未关联课程',
            content: item['content'] || '暂无内容',
            mark: item['mark'] || '暂无备忘',
            uid: item['uniqueid']
          }
        });

        let defaultDate = {
          date: '日期',
          day: '星期',
          time: '时间',
          course: '',
          content: '还未设置提醒',
          mark: '还未设置提醒'
        }

        that.setData({
          firstRemind: d.length > 0 ? d[0] : defaultDate,
          otherRemindArray: d.slice(1)
        });
      },
      fail: function() {
        console.log('request reminder data fail');
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