// pages/class/classinweek/classinweek.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    classcount: 10,
    course: [
      [],
      [],
      [],
      [],
      []
    ],
    classcount: new Array(wx.getStorageSync('classcount')).fill(1).map(function(item, index) {
      return String(index + 1);
    })
  },

  getTodayCourses(nowweek, callback) {
    wx.request({
      url: 'http://tony-space.top/wxapi/getclass',
      dataType: 'json',
      method: 'GET',
      header: {
        'Cookie': "app:sess=" + wx.getStorageSync("session_id")
      },
      success: function(res) {
        let data = res.data;
        console.log(data)
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
          course['time'] = time.map((item) => parseInt(item));
          course['week'] = [...new Set(singleweek)];
          course['day'] = [...new Set(singleday)];
          return course;
        });

        let courseData = [];
        let classtotime = wx.getStorageSync('classtotime');
        data.forEach(function(course, index) {
          if (course['week'].indexOf(nowweek) !== -1) {
            let c = {
              courseName: course['coursename'],
              fromClass: course['time'][0],
              day: course['day'],
              toClass: course['time'].length > 1 ? course['time'][1] : course['time'][0],
              duration: course['time'].length > 1 ? classtotime[course['time'][0] - 1][0] + '至' + classtotime[course['time'][1] - 1][1] : classtotime[course['time'][0] - 1][0],
              teacher: course['teacher'],
              place: course['place'],
              mark: course['mark']
            }
            courseData.push(c);
          }
        });
        callback(courseData)
      }
    });
  },

  setDayCourse(courseData) {
    let course = this.data.course;

    for (let i = 0; i < courseData.length; i++) {
      for (let y = 0; y < courseData[i]['day'].length; y++) {
        let day = courseData[i]['day'][y];
        if (day > 5)
          continue;
        course[day - 1][courseData[i]['fromClass'] - 1] = {
          name: courseData[i]['courseName'],
          place: !!courseData[i]['place'] ? courseData[i]['place'] : '未设置地点'
        };
        course[day - 1][courseData[i]['toClass'] - 1] = {
          name: courseData[i]['courseName'],
          place: !!courseData[i]['place'] ? courseData[i]['place'] : '未设置地点'
        }
      }
    }

    this.setData({
      course
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let coursecount = wx.getStorageSync('classcount');
    let course = this.data.course;
    let today = new Date();
    let daydiff = today.getDay() - 1;
    let firstday = today - daydiff * 86400000;
    let dateinweek = [];
    for (let i = 0; i < 5; i++) {
      let thatday = new Date(firstday + i * 86400000);
      let mstr = String(thatday.getMonth() + 1);
      let dstr = String(thatday.getDate());
      mstr = ('00' + mstr).substr(-2);
      dateinweek.push(mstr + '-' + dstr);
    }
    for (let i = 0; i < 5; i++) {
      let daycourse = new Array(coursecount).fill(0);
      daycourse = daycourse.map(function(item, index) {
        return {
          name: '',
          place: ''
        }
      })
      course[i] = daycourse;
    }
    let nowweek = wx.getStorageSync('nowweek');
    this.getTodayCourses(nowweek, this.setDayCourse);

    this.setData({
      course,
      date: dateinweek,
      nowweek
    })
  },

  clickClass(e) {
    let ds = e.currentTarget['dataset'];
    wx.navigateTo({
      url: `/pages/class/addclass/addclass?name=${ds['name']}&place=${ds['place']}`,
    })
  },

  onPullDownRefresh: function () {
    this.onLoad();
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