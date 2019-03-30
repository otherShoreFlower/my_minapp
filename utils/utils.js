function http(url, callback, type, category){
  wx.request({
    url: url,
    header: {
      "content-type": "application/json"
    },
  success(res){
    callback(res.data, type, category)
  }
  })
}

module.exports = {
  http: http
}