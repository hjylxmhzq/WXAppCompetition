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
    remindList: [{
      date: '4月17日',
      day: '星期四',
      time: '9:00',
      course: '高等数学',
      content: '第四章随堂小测',
      mark: '本章内容较多'
    }],
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
      console.log(this.data.todayClassesList);
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