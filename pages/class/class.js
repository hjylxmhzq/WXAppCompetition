// pages/class/class.js
Page({
  data: {
    addbutton: 'add',
    mask: 'mask_off',
    add_list: 'add_list_off',
    courseData: [],
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

  changeMode() {
    wx.navigateTo({
      url: '/pages/class/classinweek/classinweek'
    });
  },

  addclass(e) {
    wx.navigateTo({
      url: '/pages/class/addclass/addclass'
    });
  },

  clickCard(e) {
    let ds = e.currentTarget.dataset;
    wx.navigateTo({
      url: `addclass/addclass?name=${ds['name']}&duration=${ds['duration']}&mark=${ds['mark']}&place=${ds['place']}&teacher=${ds['teacher']}&uid=${ds['uid']}&location=${ds['location']}`
    });
  },

  getTodayCourses(today, nowweek, callback) {
    wx.request({
      url: 'https://tony-space.top/wxapi/getclass',
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

          course['time'] = [parseInt(time[0]), time.length > 1 ? parseInt(time[1]) : parseInt(time[0])];

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
              place: course['place'].split(';;')[0],
              location: course['place'].split(';;').length > 1 ? course['place'].split(';;')[1] : '',
              mark: course['mark'],
              uid: course['uniqueid']
            }
            courseData.push(c);
          }
        });
        callback(courseData);
      }
    });
  },

  onLoad: function(options) {
    let that = this;
    let today = new Date().getDay();
    let nowweek = wx.getStorageSync('nowweek');

    function callback(courseData) {
      courseData.sort((a, b) => {
        return a['fromClass'] - b['fromClass'];
      })
      that.setData({
        courseData
      });
    }
    this.getTodayCourses(today, nowweek, callback);
  },

  onShow: function() {
    this.onLoad();
  },

  onPullDownRefresh: function() {
    this.onLoad();
    wx.stopPullDownRefresh();
  },

  onShareAppMessage: function() {
    return {
      title: "有个课程表",
      path: "/pages/index/index?fromUserId=" + wx.getStorageSync('session_id'),
    };
  }
})