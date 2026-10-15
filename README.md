# 杂货铺

项目索引 + 每个项目的主页。单页两个视图，无构建步骤、无打包、无 JS 依赖。

页面是**给使用者看的**：讲这东西能干什么、对你有什么用、想用去哪儿拿。
版本号、技术栈、本地路径、启动命令不出现在页面上——那些在各项目自己的 README 里。

## 字体

只从 Google Fonts 取一个 **Outfit 700**，用在两个页面的大标题上。Outfit 只有拉丁字形，
标题里的中文会自动落回系统中文（macOS 上是苹方），所以一行里中英各用各的字体。

正文一律走系统字体栈：拉丁用 `-apple-system`（macOS 上是 SF），中文用苹方，
**不为中文加载任何字库**——中文字库动辄几 MB，而且加载完还会闪一下换字形。
非 macOS 上会依次落到 微软雅黑 / Noto Sans CJK。

断网时 Outfit 取不到，标题回退到系统字体，页面照常能用。

数字默认按比例排版（读起来更自然），只有需要竖对齐的地方——行号 `01`、功能编号、
状态列——才用等宽数字。

## 项目

| 项目 | 位置 |
| --- | --- |
| UniToken | `~/Projects/UniToken` |
| UniContext | `~/Projects/UniContext` |
| ruoyi-ai-quick-starter | `~/Projects/ruoyi-ai-quick-starter` |
| CallPilot | `~/Projects/callpilot` |
| MyPilot | `~/Documents/ChatGPT/MyPilot` |
| Earth Spacetime | `~/Projects/earth-spacetime` |

## 打开

双击 `index.html`，或在目录里起个服务：

```bash
python3 -m http.server 8899
# http://127.0.0.1:8899/
```

## 文件

```
index.html            # 两个视图的容器
assets/styles.css     # 样式；配色与字体变量在文件顶部
assets/projects.js    # 内容，只改这个文件就能增删项目
assets/app.js         # 渲染、hash 路由与交互
assets/favicon.svg    # 页签图标
assets/media/         # 截图、动图、视频，按项目 id 分文件夹；约定见该目录的 README
assets/downloads/     # 可以直接下载的安装包，一个版本一个文件（如 MyPilot-1.0.0.zip）
```

## 维护

新增项目：在 `assets/projects.js` 的 `PROJECTS` 数组里复制一份对象改字段，HTML 和 CSS 都不用动。

发布新版本：把新的包丢进 `assets/downloads/`，再改 `projects.js` 里那条 `get` 的文件名和大小
（旧版本文件留着会一直占体积，链接都换掉之后就可以删）。

| 字段 | 说明 |
| --- | --- |
| `id` | 唯一标识，也是项目主页的地址（`#/<id>`） |
| `name` / `icon` / `accent` | 名字、图标名、图标颜色 |
| `status` | 一句话状态，只回答「现在能不能用」，如 `已发布` / `Beta` / `开发中` |
| `tagline` | 索引里那句一句话说明，讲这东西是干什么的 |
| `summary` | 项目主页开头那段，可以带上现在有什么麻烦、它怎么解决 |
| `features` | 核心能力 `[{ t: 小标题, d: 说明 }]`，建议 4 条，写清了宽屏下正好两栏两行 |
| `get` | 获取方式 `[{ icon, t, v, href, tag }]`，排在页面最后；有 `href` 的整行可点，没有的就只说明怎么拿到 |
| `media` | 实际效果区里的截图 / 动图 / 视频 `[{ type, src, caption, poster, ratio }]`；按 `type` 分成「截图」「视频」两个 tab，各自横向滚动，留空数组时页面上显示一个占位块 |

`get` 里每行的四个字段：`t` 是这行是什么（如「GitHub」「macOS 桌面版」），`v` 是具体信息
（仓库名、平台要求），`tag` 是右侧小字（如「需连内网」「Beta」），可省略。
`icon` 目前有 `repo` / `globe` / `download` / `terminal` / `mobile` / `lock` 六个，
够用就好，别为一行单独加图标。

写 `get` 时只放真实存在的入口：内网仓库就标「需连内网」，还没有下载地址的就别写 `href`，
用 `v` 说清楚现在到哪一步了，比放一个点不开的链接强。

放图：把文件丢进 `assets/media/<项目 id>/`，再在 `projects.js` 里补一条 `media`。
`type` 写 `'image'` 或 `'video'`，`caption` 是图下面那行说明，`poster` 只有视频用，
`ratio` 默认 `16/9`，素材不是这个比例时补上，否则四周会有留白（不会裁切内容）。

图标名取值见 `app.js` 里的 `ICONS`：项目图标是 `swap` / `layers` / `layout` / `phone` /
`mic` / `globe`，获取方式那节另有一组 `repo` / `download` / `terminal` / `mobile` / `lock`。
图标是 18×18 的描边路径，只有 stroke 没有 fill；要加新图标就在 `ICONS` 里补一条 path。

写内容时注意：讲结果不讲实现。写「换模型不用改代码」，不写「provider/model 路由」；
写「通话内容不出你的机器」，不写「本地 SQLite 落盘」。

## 交互

- 点索引里任意一行进入该项目的页面，浏览器后退或左上角「← 索引」回到列表
- 地址栏带 hash，`#/earth` 这样的链接可以直接分享；未知 id 回落到索引
- 索引页按 `/` 聚焦筛选框，`Esc` 清空
- 「实际效果」里截图 / 视频两个 tab 点击切换，每个 tab 是走马灯：一屏只看得到一张，
  两张以上时图片左右两侧有圆形箭头翻页（聚焦后用左右键也行，翻到头的那侧置灰）
- 右上角切换浅色 / 深色；没有手动选过时跟随系统设置，选过之后记在 `localStorage`
