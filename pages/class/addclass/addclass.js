// pages/remind/addreminder/addreminder.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    mask: 'mask_off',
    showClassChoose: false,
    showWeekChoose: false,
    showDayChoose: false,
    time: '00:00',
    date: '2019-01-01',
    courseArray: [
      '高等数学',
      '大学英语',
      '大学物理'
    ],
    classtime: new Array(wx.getStorageSync('classcount')).fill(1).map(function(item, index) {
      return {
        name: '第' + (index + 1).toString() + '节',
        checked: false
      }
    }),
    daytime: new Array(7).fill(1).map(function (item, index) {
      let daylist = ['一', '二', '三', '四', '五', '六', '天'];
      return {
        name: '星期' + daylist[index],
        checked: false
      }
    }),
    selectedTime: '未选择时间',
    selectedWeek: '未选择周数',
    selectedDay: '未选择星期',
    week: new Array(wx.getStorageSync('weekcount')).fill(1).map(function(item, index) {
      return {
        name: (index + 1).toString() + '周',
        checked: false
      }
    }),
    courseIndex: 1,
    inwayIndex: 0,
  },

  chooseTime(e) {
    let {
      showClassChoose
    } = this.data;
    this.setData({
      showClassChoose: !showClassChoose,
      mask: 'mask_on'
    });
  },
  comfirmDay(e) {
    this.setData({
      mask: 'mask_off',
      showClassChoose: false,
      showWeekChoose: false,
      showDayChoose: false
    });
    let daytime = this.data.daytime;
    let selectedDay = '';
    let lastIndex = 0;
    let fromc = 0;
    let toc = 0;
    let someChecked = false;
    for (let i = 0; i < daytime.length; i++) {
      if (daytime[i].checked) {
        someChecked = true;
        if (i !== 0 && daytime[i - 1].checked) {
          toc = i;
        } else if (i !== 0 && !daytime[i - 1].checked) {
          fromc = i;
        }
        if (i === daytime.length - 1) {
          if (fromc >= toc) {
            selectedDay += (fromc + 1).toString() + '; ';
          } else {
            selectedDay += (fromc + 1).toString() + '-' + (toc + 1).toString() + '; ';
          }
        }
      } else {
        if (i !== 0 && daytime[i - 1].checked && someChecked) {
          if (fromc >= toc) {
            selectedDay += (fromc + 1).toString() + '; ';
          } else {
            selectedDay += (fromc + 1).toString() + '-' + (toc + 1).toString() + '; ';
          }
        }
      }
    }
    if (selectedDay.length === 0) {
      selectedDay = '未选择星期';
    } else {
      selectedDay = '星期' + selectedDay;
    }
    this.setData({
      selectedDay
    })
  },

  comfirmTime(e) {
    this.setData({
      mask: 'mask_off',
      showClassChoose: false,
      showWeekChoose: false,
      showDayChoose: false
    });
    let classtime = this.data.classtime;
    let selectedTime = '';
    let lastIndex = 0;
    let fromc = 0;
    let toc = 0;
    let someChecked = false;
    for (let i = 0; i < classtime.length; i++) {
      if (classtime[i].checked) {
        someChecked = true;
        if (i !== 0 && classtime[i - 1].checked) {
          toc = i;
        } else if (i !== 0 && !classtime[i - 1].checked) {
          fromc = i;
        }
        if (i === classtime.length - 1) {
          if (fromc >= toc) {
            selectedTime += (fromc + 1).toString() + '; ';
          } else {
            selectedTime += (fromc + 1).toString() + '-' + (toc + 1).toString() + '; ';
          }
        }
      } else {
        if (i !== 0 && classtime[i - 1].checked && someChecked) {
          if (fromc >= toc) {
            selectedTime += (fromc + 1).toString() + '; ';
          } else {
            selectedTime += (fromc + 1).toString() + '-' + (toc + 1).toString() + '; ';
          }
        }
      }
    }
    if (selectedTime.length === 0) {
      selectedTime = '未选择时间';
    } else {
      selectedTime += '节';
    }
    this.setData({
      selectedTime
    })
  },

  comfirmWeek(e) {
    this.setData({
      mask: 'mask_off',
      showClassChoose: false,
      showWeekChoose: false,
      showDayChoose: false

    });
    let week = this.data.week;
    let selectedWeek = '';
    let lastIndex = 0;
    let fromc = 0;
    let toc = 0;
    let someChecked = false;
    for (let i = 0; i < week.length; i++) {
      if (week[i].checked) {
        someChecked = true;
        if (i !== 0 && week[i - 1].checked) {
          toc = i;
        } else if (i !== 0 && !week[i - 1].checked) {
          fromc = i;
        }
        if (i === week.length - 1) {
          if (fromc >= toc) {
            selectedWeek += (fromc + 1).toString() + '; ';
          } else {
            selectedWeek += (fromc + 1).toString() + '-' + toc.toString() + '; ';
          }
        }
      } else {
        if (i !== 0 && week[i - 1].checked && someChecked) {
          if (fromc >= toc) {
            selectedWeek += (fromc + 1).toString() + '; ';
          } else {
            selectedWeek += (fromc + 1).toString() + '-' + (toc + 1).toString() + '; ';
          }
        }
      }
    }
    if (selectedWeek.length === 0) {
      selectedWeek = '未选择周数';
    } else {
      selectedWeek += '周';
    }
    this.setData({
      selectedWeek
    })
  },

  changeTime(e) {
    let idx = e.currentTarget.dataset['index'];
    let classtime = this.data.classtime;
    classtime = classtime.map(function(item, index) {
      if (index === idx) {
        item.checked = !item.checked;
        return item;
      } else {
        return item;
      }
    })
    this.setData({
      classtime
    })
  },

  changeWeek(e) {
    let idx = e.currentTarget.dataset['index'];
    let week = this.data.week;
    week = week.map(function(item, index) {
      if (index === idx) {
        item.checked = !item.checked;
        return item;
      } else {
        return item;
      }
    })
    this.setData({
      week
    })
  },

  changeDay(e) {
    let idx = e.currentTarget.dataset['index'];
    let daytime = this.data.daytime;
    daytime = daytime.map(function (item, index) {
      if (index === idx) {
        item.checked = !item.checked;
        return item;
      } else {
        return item;
      }
    })
    this.setData({
      daytime
    })
  },
  
  chooseDay(e) {
    let {
      showDayChoose
    } = this.data;
    this.setData({
      showDayChoose: !showDayChoose,
      mask: 'mask_on'
    });
  },
 
  chooseWeek(e) {
    let {
      showWeekChoose
    } = this.data;
    this.setData({
      showWeekChoose: !showWeekChoose,
      mask: 'mask_on'
    });
  },

  submitform(e) {
    let data = {
      course: e.detail.value['reminder-content'],
      mark: e.detail.value['reminder-mark'],
      place: e.detail.value['reminder-place'],
      teacher: e.detail.value['reminder-teacher'],
      time: this.data.selectedTime,
      week: this.data.selectedWeek,
      day: this.data.selectedDay
    }
    if (this.data.selectedTime === '未选择时间' || this.data.selectedDay === '未选择星期' || this.data.selectedWeek === '未选择周数') {
      wx.showToast({
        title: "未选择时间/周数",
        icon: 'none',
        duration: 800,
        mask: true
      });
      return;
    }
    if (data.course.length === 0) {
      wx.showToast({
        title: "未填写课程名称",
        icon: 'none',
        duration: 800,
        mask: true
      });
      return;
    }
    wx.request({
      url: 'http://tony-space.top/wxapi/addclass',
      data,
      method: 'POST',
      header: {
        'content-Type': 'application/x-www-form-urlencoded',
        'Cookie': "app:sess=" + wx.getStorageSync("session_id")
      },
      success: function(res, statusCode) {
        if (res.statusCode == 201) {
          wx.showToast({
            title: "添加成功",
            icon: 'success',
            duration: 800,
            mask: true
          });
          return;
          wx.navigateTo({
            url: '/pages/class/class',
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