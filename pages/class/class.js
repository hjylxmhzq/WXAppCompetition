// pages/class/class.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    addbutton: 'add',
    mask: 'mask_off',
    add_list: 'add_list_off',
    courseData: [
      {
        courseName: '高等数学',
        fromClass: '1',
        toClass: '2',
        duration: '8:00至10:00',
        teacher: '授课',
        place: '逸夫楼404',
        mark: '单周'
      }, {
        courseName: '高等数学',
        fromClass: '3',
        toClass: '4',
        duration: '8:00至10:00',
        teacher: '授课',
        place: '逸夫楼404',
        mark: '单周'
      }
    ]
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
  addclass(e) {
    wx.navigateTo({
      url: '/pages/class/addclass/addclass',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    return {
      title: "某课程表",
      path: "/pages/index/index?fromUserId=" + wx.getStorageSync('session_id'),
    };
  }
})