//index.js
//获取应用实例

import { Base64 } from '../../app.js'
Page({
  data: {
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  onLoad: function () {
    this.setData({
      code:
        "import codec.json as json\n" +
        "var c = json.to_var(json.from_string(system.in.getline()))\n" +
        "system.out.println(\"Hello, \" + c.username)\n"
      ,
      stdin: "{\"username\":\"Michael\"}",
      stdout: ""
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
      stdout: ""
    })
  },
  getUserInfo: function (){
    var _this = this;
    wx.getUserProfile({
      desc: "同步您的昵称至程序输入框",
      success: function (res){
        _this.setData({stdin: "{\"username\":\"" + res.userInfo.nickName + "\"}"})
      }
    })
  }
})
