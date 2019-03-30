// pages/index/index.js
var utils = require("../../utils/utils.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var today = new Date();
    var getFullYear = today.getFullYear() + ".";
    var getMonth = today.getMonth() + 1;
    var getDate = today.getDate();
    this.setData({
      getFullYear: getFullYear,
      getMonth: getMonth ,
      getDate: getDate,
    });
    //发送请求
    utils.http("http://www.wwtliu.com/sxtstu/music/baidu/list.php?type=1&count=3&offset=0", this.callback, "newsong", "新歌榜");
    utils.http("http://www.wwtliu.com/sxtstu/music/baidu/list.php?type=2&count=3&offset=0", this.callback, "hotsong", "热歌榜");
    utils.http("http://www.wwtliu.com/sxtstu/music/baidu/list.php?type=11&count=3&offset=0", this.callback, "rocksong", "摇滚榜");
  },
  callback: function (data, type, category){
    // console.log(data, type);
    var songdata = {};
    songdata[type] = {
      songlist: data.song_list,
      category: category
    }
    this.setData(songdata)
  },

  musicHandler: function(event){
    var category = event.currentTarget.dataset.category;
    wx.navigateTo({
      url: "../music/music?category=" +category,
    })
  }
})