//index.js
//获取应用实例

import {
  Base64
} from '../../app.js'

var default_code = "import codec.json as json\n" +
  "var c = json.to_var(json.from_string(system.in.getline()))\n" +
  "system.out.println(\"Hello, \" + c.username)\n"

var default_stdin = "{\"username\":\"Michael\"}"

Page({
  data: {
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    showGetInfo: false
  },
  onLoad: function (options) {
    if (options.scene) {
      var _this = this
      var id = decodeURIComponent(options.scene)
      wx.request({
        method: "POST",
        url: 'https://dev.covariant.cn/cgi/cs-online-getcode',
        data: id,
        success: function (res) {
          if (res.data) {
            _this.setData({
              code: Base64.decode(res.data.code),
              stdin: Base64.decode(res.data.stdin)
            })
          } else {
            _this.setData({
              code: default_code,
              stdin: default_stdin,
              showGetInfo: true
            })
          }
        },
        fail: function (res) {
          _this.setData({
            code: default_code,
            stdin: default_stdin,
            showGetInfo: true
          })
        }
      })
    } else {
      this.setData({
        code: default_code,
        stdin: default_stdin,
        showGetInfo: true
      })
    }
  },
  textChanged: function (e) {
    this.setData({
      showGetInfo: false
    })
  },
  onRun: function (e) {
    var ecode = Base64.encode(e.detail.value.code)
    var estdin = Base64.encode(e.detail.value.stdin)
    var _this = this;
    wx.request({
      method: "POST",
      url: 'https://dev.covariant.cn/cgi/cs-online',
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
      code: default_code,
      stdin: default_stdin,
      stdout: "",
      showGetInfo: true
    })
  },
  getUserInfo: function () {
    var _this = this;
    wx.getUserProfile({
      desc: "同步您的昵称至程序输入框",
      success: function (res) {
        _this.setData({
          stdin: "{\"username\":\"" + res.userInfo.nickName + "\"}"
        })
      }
    })
  }
})