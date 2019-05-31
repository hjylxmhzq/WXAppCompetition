//app.js
App({
  onLaunch: function() {
    var logs = wx.getStorageSync('logs') || [];
    logs.unshift(Date.now());
    wx.setStorageSync('logs', logs);
    let classtotime = [
      ['8:00', '8:45'],
      ['8:55', '9:40'],
      ['10:00', '10:45'],
      ['10:55', '11:40'],
      ['14:20', '15:05'],
      ['15:15', '16:00'],
      ['16:20', '17:05'],
      ['17:15', '18:00']
    ]
    wx.setStorageSync('classcount', 8);
    wx.setStorageSync('classtotime', classtotime);
    wx.setStorageSync('classtime', ['8:00-9:00', '9:00-10:00', '10:00-11:00', '11:00-12:00', '14:00-16:00', '16:00-18:00', '18:00-20:00', '20:00-21:00']);
    wx.login({
      success: res => {
        wx.request({
          url: 'https://tony-space.top/wxapi/login',
          data: {
            code: res.code
          },
          dataType: 'json',
          success: res => {
            wx.setStorageSync('session_id', res.data['session_id']);
            wx.request({
              url: 'https://tony-space.top/wxapi/getnowweek',
              dataType: 'json',
              method: 'GET',
              header: {
                'Cookie': "app:sess=" + wx.getStorageSync("session_id")
              },
              dataType: 'json',
              success: res => {
                wx.setStorageSync('nowweek', res.data['nowweek'] ? parseInt(res.data['nowweek']) : 1);
              }
            });
          }
        });
      }
    });

    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          wx.getUserInfo({
            success: res => {
              this.globalData.userInfo = res.userInfo;

              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res);
              }
            }
          });
        }
      }
    });
  },
  globalData: {
    userInfo: null
  }
});