//app.js
App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || [];
    logs.unshift(Date.now());
    wx.setStorageSync('logs', logs);

    // 登录
    wx.login({
      success: res => {
        wx.request({
          url: 'http://tony-space.top/wxapi/login',
          data: {
            code: res.code
          },
          dataType: 'json',
          success: res => {
            let classtotime = [
              ['8:00','8:45'],
              ['8:55','9:40'],
              ['10:00','10:45'],
              ['10:55','11:40'],
              ['14:20','15:05'],
              ['15:15','16:00'],
              ['16:20','17:05'],
              ['17:15','18:00']
            ]
            wx.setStorageSync('session_id', res.data['session_id']);
            wx.setStorageSync('nowweek', 5);
            wx.setStorageSync('classcount', classtotime.length);
            wx.setStorageSync('classtotime', classtotime)
            wx.setStorageSync('classtime', ['8:00-9:00', '9:00-10:00','10:00-11:00','11:00-12:00','14:00-16:00','16:00-18:00','18:00-20:00','20:00-21:00']);
            console.log('get session_id success: ' + wx.getStorageSync('session_id'));
          }
        });
      }
    });
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo;

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
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