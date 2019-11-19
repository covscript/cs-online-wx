//index.js
//获取应用实例
const app = getApp()
import { Base64 } from '../../app.js'
Page({
  onLoad: function () {
    this.onRst()
  },
  onRun: function () {
    var ecode = Base64.encode(this.data.code)
    var estdin = Base64.encode(this.data.stdin)
    var _this = this;
    wx.request({
      method: "POST",
      url: 'http://dev.covariant.cn/cgi/cs-online',
      data: {
        code: ecode,
        stdin: estdin
      },
      success: function (data) {
        _this.setData({
          stdout: data
        })
      },
      fail: function (data) {
        _this.setData({
          stdout: "Error: " + data
        })
      }
    })
  },
  onRst: function () {
    this.setData({
      code: "system.out.println(\"Hello\")",
      stdin: "",
      stdout: ""
    })
  }
})
