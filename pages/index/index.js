//index.js
//获取应用实例
const app = getApp()
import { Base64 } from '../../app.js'
Page({
  onLoad: function () {
    this.onRst()
  },
  onRun: function (e) {
    var ecode = Base64.encode(e.detail.value.code)
    var estdin = Base64.encode(e.detail.value.stdin)
    var _this = this;
    wx.request({
      method: "POST",
      url: 'http://dev.covariant.cn/cgi/cs-online',
      data: {
        code: ecode,
        stdin: estdin
      },
      success: function (res) {
        _this.setData({
          stdout: res.data
        })
      },
      fail: function (res) {
        _this.setData({
          stdout: "Error: " + res.data
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
