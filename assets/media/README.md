# 媒体文件

项目主页「实际效果」那块用的截图、动图、视频放这里，一个项目一个文件夹：

```
assets/media/unitoken/console.png   # 截图
assets/media/unitoken/route.gif     # 动图
assets/media/unitoken/demo.mp4      # 视频
assets/media/unitoken/demo.jpg      # 视频封面（可选）
```

然后在 `assets/projects.js` 里给对应项目补 `media`：

```js
media: [
  { type: 'image', src: 'assets/media/unitoken/console.png', caption: '管理台：这把 Key 能用哪些模型' },
  { type: 'video', src: 'assets/media/unitoken/demo.mp4', poster: 'assets/media/unitoken/demo.jpg', caption: '上游挂了，请求自动换一家' }
]
```

项目页上按 `type` 分成「截图」和「视频」两个 tab，没内容的那个 tab 会显示占位说明；
每个 tab 里是横向滚动的，一张一张往右滑，所以条数多也不用担心把页面撑长。

## 约定

- 路径从站点根目录写起（以 `assets/` 开头），和 `index.html` 里的写法一致。
- 默认按 16:9 摆放。素材不是这个比例，就在那条里写 `ratio`，比如竖屏手机截图写 `ratio: '9/16'`。
- 图片按原比例缩放，不会裁切；比例对不上时四周是留白，不会切掉内容。
- 应用窗口截图建议把圆角以外的像素抠成透明的（`screencapture` 会把窗口背后的桌面也拍进去），
  这样深浅两套主题下都不会露出黑边。
- 视频不自动播放，带系统自带控制条。想让它循环自动播放，就在 `app.js` 的 `shotHTML` 里把 `controls` 换成 `autoplay`。
- 单个文件尽量压在 1–2 MB 以内，图片是懒加载的，视频要点了才播。
