// pages/index/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    mask: 'mask_off',
    addbutton: 'add',
    add_list: 'add_list_off',
    todayDate: "1月1日 星期一",
    remindList: [{
      title: "111",
      time: "2019.5.1",
      remark: "1111111111111111"
    }, {
      title: "222",
      time: "2019.5.2",
      remark: "2222222222222222",
      courseName: "课程1"
    }],
    todayClassesList: [{
      name: "课程1",
      time: "3、4节",
      place: "1104"
    }, {
      name: "课程2",
      time: "7、8节",
      place: "4203",
      remark: "???"
    }]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    wx.request({
      url: "tony-space.top",
      data: {
        /*...options,
        sessionId: wx.getStorageSync("session_id"),
        page: "index"*/
      },
      success: res => {
        if (res.statusCode === 200) {
          this.setData({

          });
        }
      }
    });
  },
  add(e) {
    if (this.data.addbutton === 'add') {
      this.setData({
        addbutton: 'close',
        add_list: 'add_list_on',
        mask: 'mask_on'
      });
    } else {
      this.setData({
        mask: 'mask_off',
        addbutton: 'add',
        add_list: 'add_list_off'
      });
    }
  },
  addreminder(e) {
    wx.navigateTo({
      url: '/pages/remind/addreminder/addreminder',
    })
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