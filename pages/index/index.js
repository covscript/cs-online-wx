//index.js
//获取应用实例
const app = getApp()
import { Base64 } from '../../app.js'
Page({
  onLoad: function () {
    this.setData({
      code:
        "var end = system.in.input()\n" +
        "foreach i in range(end)\n" +
        "    system.out.println(i)\n" +
        "end\n"
      ,
      stdin: "6",
      stdout: ""
    })
  },
  onRun: function (e) {
    var ecode = Base64.encode(e.detail.value.code)
    var estdin = Base64.encode(e.detail.value.stdin)
    var _this = this;
    wx.request({
      method: "POST",
      url: 'https://covscript.org.cn/cgi/cs-online',
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
      stdout: ""
    })
  }
})
