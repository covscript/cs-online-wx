# Covariant Script Web API 规范
## UI
```webapi.ui.ok```   
确认按钮   
```webapi.ui.message_box(title, text, button)```   
在 Web 界面中显示一个对话框

参数|类型|作用
:---:|:---:|:---:
title|string|对话框标题
text|string|对话框内容
button|webapi.ui.button|要显示的按钮，传入 null 使用默认按钮