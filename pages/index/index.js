// pages/index/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    mask: 'mask_off',
    addbutton: 'add',
    add_list: 'add_list_off',
    todayDate: "",
    remindList: [],
    todayClassesList: []
  },

  getTodayCourses(today, nowweek, callback) {
    wx.request({
      url: 'http://tony-space.top/wxapi/getclass',
      dataType: 'json',
      method: 'GET',
      header: {
        'Cookie': "app:sess=" + wx.getStorageSync("session_id")
      },
      success: function(res) {
        let data = res.data;

        data = data.map(function(course) {
          let week = course['week'].split(';');
          let singleweek = [];
          week = week.slice(0, week.length - 1);
          week.forEach(function(w) {
            if (w.length === 1) {
              singleweek.push(parseInt(w));
            } else {
              let f = parseInt(w.split('-')[0]);
              let t = w.split('-').length > 1 ? parseInt(w.split('-')[1]) : f;
              let len = t - f + 1;
              let tempweek = new Array(len);
              for (let i = 0; i < len; i++) {
                tempweek[i] = f + i;
              }
              singleweek = singleweek.concat(tempweek);
            }
          });
          course['week'] = [...new Set(singleweek)];

          let day = course['day'];
          day = day.substr(2).split('; ');
          let singleday = [];
          day = day.slice(0, day.length - 1);
          day.forEach(function(w) {
            if (w.length === 1) {
              singleday.push(parseInt(w));
            } else {
              let f = parseInt(w.split('-')[0]);
              let t = w.split('-').length > 1 ? parseInt(w.split('-')[1]) : f;
              let len = t - f + 1;
              let tempday = new Array(len);
              for (let i = 0; i < len; i++) {
                tempday[i] = f + i;
              }
              singleday = singleday.concat(tempday);
            }
          });

          let time = course['time'].split(';')[0].split('-');
          course['time'] = [parseInt(time[0]), parseInt(time[1])];
          course['week'] = [...new Set(singleweek)];
          course['day'] = [...new Set(singleday)];
          return course;
        });

        let courseData = [];
        let classtotime = wx.getStorageSync('classtotime')
        data.forEach(function(course, index) {
          if (course['day'].indexOf(today) !== -1 && course['week'].indexOf(nowweek) !== -1) {
            let c = {
              courseName: course['coursename'],
              fromClass: course['time'][0],
              toClass: course['time'].length > 1 ? course['time'][1] : course['time'][0],
              duration: course['time'].length > 1 ? classtotime[course['time'][0] - 1][0] + '至' + classtotime[course['time'][1] - 1][1] : classtotime[course['time'][0] - 1][0],
              teacher: course['teacher'],
              place: course['place'],
              mark: course['mark']
            }
            courseData.push(c);
          }
        });

        callback(courseData);
      }
    });
  },

  submitformid(e) {
    this.setData({
      mask: 'mask_off',
      addbutton: 'add',
      add_list: 'add_list_off'
    });
    console.log(e)
    wx.request({
      url: 'https://tony-space.top/wxapi/setformid?id=' + e.detail.formId,
      header: {
        'Cookie': "app:sess=" + wx.getStorageSync("session_id")
      },
      method: 'GET',
      responseType: 'text',
      fail: function(res) {},
      complete: function(res) {},
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let that = this;
    let today = new Date();

    let weekArray = ['星期一', '星期二', '星期三', '星期四', '星期五', '星期六', '星期日'];
    let todayDate = (today.getMonth() + 1) + '月' + today.getDate() + '日 ' + weekArray[today.getDay() - 1];
    this.setData({
      todayDate: todayDate
    });

    let nowweek = wx.getStorageSync('nowweek');

    this.getTodayCourses(today.getDay(), nowweek, courseData => {
      that.setData({
        todayClassesList: courseData
      });
    });

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
          let thistime = +new Date(item['remind_date'] + ' ' + item['remind_time']);
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
            remind_date: item['remind_date'],
            time: item['remind_time'],
            course: item['course'] || '未关联课程',
            content: item['content'] || '暂无内容',
            mark: item['mark'] || '暂无备忘',
            uid: item['uniqueid']
          }
        });

        let nowtime = new Date().getTime() / 1000;

        that.setData({
          remindList: d.filter(function(x) {
            let t = new Date(x['remind_date'] + 'T' + x['time'] + ':00+08:00');
            let subTime = t.getTime() / 1000 - nowtime;
            return subTime > 0 && subTime < 3600 * 24 * 2;
          })
        });
      },
      fail: function() {
        console.log('request reminder data fail');
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
    });
  },

  toWeekClass(e) {
    wx.navigateTo({
      url: '/pages/class/classinweek/classinweek'
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