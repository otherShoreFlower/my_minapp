// pages/music/music.js
var utils = require("../../utils/utils.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    playing: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log(options.category);
    var url = "";
    switch (options.category){
      case "今日推荐":
        url = "http://www.wwtliu.com/sxtstu/music/baidu/list.php?type=24&count=10&offset=0";
        break;

      case "朋友圈歌曲":
        url = "http://www.wwtliu.com/sxtstu/music/baidu/list.php?type=25&count=10&offset=0";
        break;

      case "新歌榜":
        url = "http://www.wwtliu.com/sxtstu/music/baidu/list.php?type=1&count=10&offset=0";
        break;

      case "热歌榜":
        url = "http://www.wwtliu.com/sxtstu/music/baidu/list.php?type=2&count=10&offset=0";
        break;

      case "摇滚榜":
        url = "http://www.wwtliu.com/sxtstu/music/baidu/list.php?type=11&count=10&offset=0";
        break;
    }
    utils.http(url, this.callback, null, null);

    wx.showLoading({
      title: "正在加载",
    })
  },

  callback: function(data){
    wx.hideLoading();
    // console.log(data);
    this.setData({
      musicList: data.song_list,
      musicTitle: data.billboard.name,
      musicDesc: data.billboard.comment,
      musicPic: data.billboard.pic_s192
    })
  },
  //点击歌曲播放
  playHandler:function(event){
    var mid = event.currentTarget.dataset.musicid;
    console.log(mid);
    utils.http("http://www.wwtliu.com/sxtstu/music/baidu/play.php?mid=" + mid, this.getMusicinfo, null, null)
  },
//获取歌曲信息
  getMusicinfo: function(data){
    this.setData({
      dataUrl: data.bitrate.show_link,
      title: data.songinfo.title,
      coverImgUrl: data.songinfo.pic_small
    })
    //调用播放功能
    this.play();
  },

  play: function(){
    wx.playBackgroundAudio({
      dataUrl: this.data.dataUrl,
      title: this.data.title,
      coverImgUrl: this.data.coverImgUrl
    })
    this.setData({
      playing: true
    })
  },
  // 暂停功能
  pause: function () {
    wx.pauseBackgroundAudio();
    this.setData({
      playing: false
    })
  }


})