/* ============================================================================
 * 杂货铺 内容
 *
 * 这个页面是给使用者看的，不是给开发者看的：只讲这东西能干什么、对你有什么用、
 * 想用的话去哪儿拿。版本号、技术栈、本地路径、启动命令不放这里——那些在各项目
 * 自己的 README 里。
 *
 * 字段：
 *   id        唯一标识，也是项目主页的地址（#/<id>）
 *   name      名字
 *   icon      图标名，取值见 app.js 里的 ICONS
 *   accent    图标颜色
 *   status    一句话状态，只回答「现在能不能用」
 *   tagline   索引里那句一句话说明
 *   summary   项目主页开头那段
 *   features  核心能力 [{ t: 小标题, d: 说明 }]，建议 4 条
 *   get       获取方式 [{ icon, t, v, href, tag }]，排在页面最后
 *             icon  图标名，见 app.js 里的 ICONS（repo / globe / download / terminal / mobile / lock）
 *             t     这行是什么，如「GitHub」「macOS 桌面版」
 *             v     具体信息，如仓库名、平台要求
 *             href  有就整行可点，没有就只说明怎么拿到
 *             tag   右侧小字，如「需连内网」「Beta」，可省略
 *   media     展示区 [{ type, src, caption, poster, ratio }]，空数组时页面显示一个占位块
 *             type    'image'（png / jpg / gif / svg 都算）或 'video'（mp4 / mov / webm）
 *             src     从站点根目录写起，如 'assets/media/unitoken/console.png'
 *             caption 图下面那行说明，可省略
 *             poster  只有 video 用，封面图
 *             ratio   素材宽高比，默认 '16/9'；不是这个比例就写上，否则四周会有留白
 * ==========================================================================*/

const PROJECTS = [
  {
    id: 'unitoken',
    name: 'UniToken',
    icon: 'swap',
    accent: '#4c8dff',
    status: '内部在用',
    tagline: '一个 Key，调用所有大模型',
    summary: '各家模型分散在不同账号、不同接口、不同账单里，换一个模型就要改一轮代码。UniToken 把它们收在同一扇门后面：统一接口、统一计费，换模型不用动代码。',
    features: [
      {
        t: '换模型不用改代码',
        d: '一套兼容主流格式的接口，对接 DeepSeek、Kimi、豆包、Qwen 等十多家上游，换模型只改一个名字。'
      },
      {
        t: '一把钥匙管所有',
        d: '按组织和使用场景签发 Key，能限定可用的模型范围、限定额度，不用了随时吊销。'
      },
      {
        t: '上游出问题自动绕开',
        d: '某家服务商挂了或者变慢，自动切到备用的那家，调用方的代码感知不到。'
      },
      {
        t: '账算得清楚',
        d: '每次调用都记下走了谁家的通道、花了多少，按用量、按时段分开，月底能直接对账。'
      }
    ],

    get: [
      { icon: 'repo', t: '内网 GitLab', v: 'keyan/unitoken', href: 'http://gitlab.suixingpay.com/keyan/unitoken', tag: '需连内网' }
    ],
    media: []
  },
  {
    id: 'unicontext',
    name: 'UniContext',
    icon: 'layers',
    accent: '#a06bff',
    status: '建设中',
    tagline: '让 AI 查得到公司里的数据',
    summary: '会议纪要、经营指标、制度文档散在不同系统里，问一句「这个渠道本周交易多少」，往往要人工翻四个地方。UniContext 把这些数据整理成一层 AI 能直接查询的上下文。',
    features: [
      {
        t: '一次提问，跨系统取数',
        d: '沟通记录、业务对象、指标、知识文档放在同一层里检索，不用挨个系统去翻。'
      },
      {
        t: '同一个数，问到哪儿都一样',
        d: '指标口径集中维护一次，谁来问、从哪个入口问，拿到的都是同一个答案。'
      },
      {
        t: '敏感内容有权限',
        d: '按对象控制可见范围，会议内容这类东西只对该看的人开放。'
      },
      {
        t: '只给 AI 用，不做报表门户',
        d: '通过标准接口把上下文交给 AI 助手，不另做一个给人盯着看的看板。'
      }
    ],

    get: [
      { icon: 'globe', t: '工作台', v: 'unicontext.suixingpay.com', href: 'http://unicontext.suixingpay.com', tag: '需连内网' },
      { icon: 'repo', t: '内网 GitLab', v: 'keyan/unicontext', href: 'http://gitlab.suixingpay.com/keyan/unicontext', tag: '需连内网' }
    ],
    media: []
  },
  {
    id: 'ruoyi',
    name: 'ruoyi-ai-quick-starter',
    icon: 'layout',
    accent: '#3ecf8e',
    status: '已发布',
    tagline: '自带 AI 助手的后台系统',
    summary: '一套开箱即用的企业后台，最不一样的地方是自带一个 AI 助手：用大白话就能查系统里的数据、分析文件，不用背菜单和路径。',
    features: [
      {
        t: '想问什么直接问',
        d: '「有哪些用户」「列出定时任务」，助手自己去查库回答，能看到的数据和你登录的账号权限完全一致。'
      },
      {
        t: '答案从哪来看得见',
        d: '每次查询用了哪个功能、传了什么条件、拿到什么结果，都摆在对话里，不是一句没来由的结论。'
      },
      {
        t: '还能分析文件',
        d: '沙箱模式给每个会话一块独立的工作区，可以让助手进去读文件、找内容。'
      },
      {
        t: '后台该有的都有',
        d: '用户、角色、菜单、部门权限、系统监控、定时任务、操作日志一样不缺，网页和手机端共用一套。'
      }
    ],

    get: [
      { icon: 'globe', t: '官网', v: 'ai-quick.dev', href: 'https://ai-quick.dev/' },
      { icon: 'repo', t: 'GitHub', v: 'xujingbao/ruoyi-ai-quick-starter', href: 'https://github.com/xujingbao/ruoyi-ai-quick-starter', tag: 'MIT 开源' },
      { icon: 'repo', t: 'Gitee', v: 'xujingbao/ruoyi-ai-quick-starter', href: 'https://gitee.com/xujingbao/ruoyi-ai-quick-starter', tag: '国内镜像' }
    ],
    media: []
  },
  {
    id: 'callpilot',
    name: 'CallPilot',
    icon: 'phone',
    accent: '#ff8a3d',
    status: 'Beta',
    tagline: 'AI 帮你接电话、打电话',
    summary: '插一张自己的 SIM 卡和一个二十美元的 4G 上网卡，CallPilot 就能替你接听来电、往外拨号、收发短信，还能在电话里跟对方讲上话，挂断后给你一份摘要。',
    features: [
      {
        t: '是真实通话，不是网络电话',
        d: '走运营商蜂窝网络，对方什么都不用装，拿起来就是个普通来电。'
      },
      {
        t: '通话内容不出你的机器',
        d: '录音和短信都存在自己电脑上，云端只负责中转，不留数据。'
      },
      {
        t: '听得懂电话菜单',
        d: '遇到「按 1 转人工」这种语音提示，它能自己按键一步步走进去。'
      },
      {
        t: '挂断后告诉你聊了什么',
        d: '每通电话自动录音并写成摘要，回头直接看结论，不用重听。'
      }
    ],

    get: [
      { icon: 'download', t: 'macOS 桌面版', v: '已签名公证的 DMG，装完从菜单栏启动', tag: 'Beta' },
      { icon: 'repo', t: '内网 GitLab', v: 'keyan/restocallpilot', href: 'http://gitlab.suixingpay.com/keyan/restocallpilot', tag: '需连内网' },
      { icon: 'download', t: 'Windows 桌面版', v: '代码已完成，还在等硬件复现反馈' },
      { icon: 'mobile', t: 'iOS / Android 遥控话机', v: '0.7.0 开发中' }
    ],
    media: []
  },
  {
    id: 'mypilot',
    name: 'MyPilot',
    icon: 'mic',
    accent: '#f472b6',
    status: '已发布',
    tagline: '按一下说话，文字自己进输入框',
    summary: '在微信、飞书、浏览器、终端里都一样：按住快捷键说句话，松开，文字就落在光标所在的位置。不用切窗口，不用等转圈。',
    features: [
      {
        t: '哪个 App 里都能用',
        d: '全局快捷键，光标停在哪儿，文字就写进哪儿。'
      },
      {
        t: '不打断手上的事',
        d: '屏幕底部一行小提示显示音量和时长，不抢焦点，说完自动写进去。'
      },
      {
        t: '不弄乱你的剪贴板',
        d: '写完会把你原来复制的内容还原回去，不会把剪贴板占掉。'
      },
      {
        t: '选中文字还能读出来',
        d: '一段话不想看，按个快捷键让它念给你听。'
      }
    ],

    get: [
      { icon: 'download', t: 'macOS 应用', v: 'MyPilot-1.0.0.zip · 2.7 MB · 需要 macOS 14 及以上', href: 'assets/downloads/MyPilot-1.0.0.zip', tag: '开发版签名' },
      { icon: 'lock', t: '首次要开两个权限', v: '麦克风用来录音，辅助功能用来把文字写进输入框' },
      { icon: 'globe', t: '识别服务', v: '走 UniToken 网关，装好后在设置里填自己的 API Key', tag: '需连内网' }
    ],
    media: [
      {
        type: 'image',
        src: 'assets/media/mypilot/settings.png',
        alt: 'MyPilot 设置窗口：左侧是分组列表，右侧是开关和选项',
        ratio: '19/15',
        caption: '设置也是系统设置那种分组：左边挑分类，右边直接改，改完立刻生效，不用点保存。'
      },
      {
        type: 'image',
        src: 'assets/media/mypilot/hud-states.png',
        alt: '录音浮层的四种状态：正在听、识别中、已输入、出错了',
        ratio: '380/471',
        caption: '录音时屏幕底部就这一行：音量波形、时长和状态，不抢焦点，说完自己消失。'
      }
    ]
  },
  {
    id: 'earth',
    name: 'Earth Spacetime',
    icon: 'globe',
    accent: '#22d3ee',
    status: '已发布',
    tagline: '一颗真实的地球，铺在桌面上',
    summary: '打开就是一颗在转的地球：真实的太阳光照、云层、昼夜分界线。可以铺满多块屏幕当动态壁纸，也能在浏览器里转着看。',
    features: [
      {
        t: '光照是真的',
        d: '太阳位置按天文模型算，白天黑夜和现实同步，早上那半边就是这么亮起来的。'
      },
      {
        t: '大气和云都在',
        d: '8K 地表与云层贴图，加上一层散射大气，边缘那圈蓝色是算出来的不是贴上去的。'
      },
      {
        t: '想知道哪就转到哪',
        d: '镜头停在哪儿，就显示离那儿最近的城市的当地时间、时区和日出日落。'
      },
      {
        t: '拿它当壁纸',
        d: '菜单栏一个小应用，把地球铺在桌面最底层，多块屏幕一起铺，拔掉电源自动停下省电。'
      }
    ],

    get: [
      { icon: 'download', t: 'macOS 壁纸应用', v: 'DMG 安装包，装完从菜单栏启动' },
      { icon: 'globe', t: '网页版', v: '浏览器直接打开，可以转着看' },
      { icon: 'repo', t: 'GitHub', v: 'xujingbao/earth-spacetime', href: 'https://github.com/xujingbao/earth-spacetime', tag: '私有仓库' }
    ],
    media: []
  }
];
