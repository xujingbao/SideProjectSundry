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
每个 tab 里是走马灯：一屏只看得到一张，两张以上时图片左右两侧会出现圆形箭头翻页
（框内左右键也能翻，单张不摆箭头），所以条数多也不用担心把页面撑长。

## 约定

- 路径从站点根目录写起（以 `assets/` 开头），和 `index.html` 里的写法一致。
- 每张素材都放在**同一个固定尺寸的画框**里（宽度最多 700px、高度 52vh 封顶，大致 16:10）：
  图片按原比例 contain 缩放、不裁切，比画框小就在四周露出画框底色。画框和左右箭头都是固定位置，
  所以不同比例、不同尺寸的素材来回翻的时候，版式不会跳动。
- `ratio` 字段保留着，但画框固定之后它已经不影响排版了。
- 应用窗口截图建议把圆角以外的像素抠成透明的（`screencapture` 会把窗口背后的桌面也拍进去），
  这样深浅两套主题下都不会露出黑边。
- 视频不自动播放，带系统自带控制条。想让它循环自动播放，就在 `app.js` 的 `shotHTML` 里把 `controls` 换成 `autoplay`。
- 单个文件尽量压在 1–2 MB 以内，图片是懒加载的，视频要点了才播。
