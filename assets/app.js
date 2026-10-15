/* ============================================================================
 * 杂货铺
 * 单页两个视图，用 hash 路由切换：
 *   #/            索引
 *   #/<项目 id>   项目主页
 * 依赖 assets/projects.js 提供的 PROJECTS
 * ==========================================================================*/
(function () {
  'use strict';

  var CHEVRON = '<svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" ' +
    'stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' +
    '<path d="M6 3.5 10.5 8 6 12.5"/></svg>';

  /* 图标：18×18 描边，颜色跟着图标自己的 --c 走 */
  var ICONS = {
    swap: '<path d="M2.4 4.9h9.8"/><path d="M10.2 2.9 12.2 4.9 10.2 6.9"/>' +
          '<path d="M15.6 13.5H5.8"/><path d="M7.8 11.5 5.8 13.5 7.8 15.5"/>',
    layers: '<path d="M9 3.8 15.4 7 9 10.2 2.6 7Z"/><path d="M2.6 10 9 13.2 15.4 10"/>' +
            '<path d="M2.6 12.4 9 15.6 15.4 12.4"/>',
    layout: '<rect x="2.4" y="3.2" width="13.2" height="11.6" rx="1.6"/>' +
            '<path d="M2.4 6.9h13.2"/><path d="M7.2 6.9v7.9"/>',
    phone: '<path d="M16.5 12.69v2.25a1.5 1.5 0 0 1-1.635 1.5 14.84 14.84 0 0 1-6.4725-2.3025 ' +
           '14.63 14.63 0 0 1-4.5-4.5A14.84 14.84 0 0 1 1.59 3.135 1.5 1.5 0 0 1 3.0825 1.5h2.25a1.5 1.5 0 0 1 ' +
           '1.5 1.29 9.63 9.63 0 0 0 .525 2.1075 1.5 1.5 0 0 1-.3375 1.5825l-.9525.9525a12 12 0 0 0 4.5 4.5l.9525-.9525a1.5 ' +
           '1.5 0 0 1 1.5825-.3375 9.63 9.63 0 0 0 2.1075.525 1.5 1.5 0 0 1 1.29 1.5225Z"/>',
    mic: '<path d="M9 3.2a2.3 2.3 0 0 0-2.3 2.3v4a2.3 2.3 0 0 0 4.6 0v-4A2.3 2.3 0 0 0 9 3.2Z"/>' +
         '<path d="M13.9 8.6v1a4.9 4.9 0 0 1-9.8 0v-1"/><path d="M9 14.6v1.8"/><path d="M6.6 16.4h4.8"/>',
    globe: '<circle cx="9" cy="9" r="6.4"/><ellipse cx="9" cy="9" rx="2.9" ry="6.4"/>' +
           '<path d="M2.6 9h12.8"/>',
    image: '<rect x="2.6" y="3.8" width="12.8" height="10.4" rx="1.7"/>' +
           '<circle cx="6.8" cy="7.5" r="1.15"/>' +
           '<path d="M3.2 12.9 6.9 9.7l2.4 2.1 2.3-2 3 2.7"/>',
    play: '<circle cx="9" cy="9" r="6.4"/><path d="M7.5 6.4 12.1 9l-4.6 2.6Z"/>',
    repo: '<path d="M4.5 2.25v9"/><circle cx="13.5" cy="4.5" r="2.25"/>' +
          '<circle cx="4.5" cy="13.5" r="2.25"/>' +
          '<path d="M13.5 6.75a6.75 6.75 0 0 1-6.75 6.75"/>',
    download: '<path d="M9 2.6v9"/><path d="M5.6 8.2 9 11.6l3.4-3.4"/>' +
              '<path d="M2.8 13.2v1.2a1.2 1.2 0 0 0 1.2 1.2h10a1.2 1.2 0 0 0 1.2-1.2v-1.2"/>',
    terminal: '<rect x="2" y="3.4" width="14" height="11.2" rx="1.4"/>' +
              '<path d="M5.4 7.4 7.4 9.4 5.4 11.4"/><path d="M9.6 11.4h3.4"/>',
    mobile: '<rect x="5.2" y="2.2" width="7.6" height="13.6" rx="1.6"/><path d="M7.9 13.2h2.2"/>',
    lock: '<rect x="4.2" y="7.6" width="9.6" height="7.4" rx="1.4"/>' +
          '<path d="M6.6 7.6V5.9a2.4 2.4 0 0 1 4.8 0v1.7"/>'
  };

  function iconSVG(name, cls) {
    if (!ICONS[name]) return '';
    return '<svg class="ico' + (cls ? ' ' + cls : '') + '" viewBox="0 0 18 18" fill="none" ' +
      'stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round" ' +
      'aria-hidden="true">' + ICONS[name] + '</svg>';
  }

  function $(sel, root) { return (root || document).querySelector(sel); }
  function $$(sel, root) {
    return Array.prototype.slice.call((root || document).querySelectorAll(sel));
  }
  function esc(value) {
    return String(value).replace(/[&<>"]/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c];
    });
  }
  function pad(n) { return n < 10 ? '0' + n : String(n); }
  function byId(id) {
    for (var i = 0; i < PROJECTS.length; i++) {
      if (PROJECTS[i].id === id) return PROJECTS[i];
    }
    return null;
  }

  /* --------------------------------------------------------------- 主题 */
  var html = document.documentElement;
  var themeButtons = $$('[data-theme-set]');

  function syncThemeButtons() {
    themeButtons.forEach(function (b) {
      b.setAttribute('aria-pressed', String(b.dataset.themeSet === html.dataset.theme));
    });
  }
  themeButtons.forEach(function (b) {
    b.addEventListener('click', function () {
      html.dataset.theme = b.dataset.themeSet;
      try { localStorage.setItem('sp-theme', b.dataset.themeSet); } catch (e) { /* 忽略 */ }
      syncThemeButtons();
    });
  });
  syncThemeButtons();

  /* --------------------------------------------------------------- 索引 */
  var viewIndex = $('#viewIndex');
  var viewProject = $('#viewProject');
  var list = $('#list');
  var blank = $('#blank');
  var searchInput = $('#q');
  var micro = $('#micro');
  var query = '';

  if (micro) {
    micro.innerHTML = '<span class="hl">' + PROJECTS.length + ' 个项目</span>' +
      '<span>更新于 2026-10-15</span>';
  }

  function rowHTML(p, index) {
    return '<article class="row" style="--c:' + p.accent + '">' +
      '<a class="row-head" href="#/' + p.id + '">' +
        '<span class="num">' + pad(index + 1) + '</span>' +
        '<span class="ident">' +
          '<span class="name">' + iconSVG(p.icon) + esc(p.name) + '</span>' +
          '<span class="sub">' + esc(p.tagline) + '</span>' +
        '</span>' +
        '<span class="meta"><span class="status">' + esc(p.status) + '</span></span>' +
        '<span class="chev">' + CHEVRON + '</span>' +
      '</a>' +
      '</article>';
  }

  function renderIndex() {
    var q = query.trim().toLowerCase();
    var hits = [];
    PROJECTS.forEach(function (p, i) {
      if (q) {
        var hay = [p.name, p.tagline, p.summary, p.status]
          .concat(p.features.map(function (f) { return f.t + ' ' + f.d; }))
          .join(' ').toLowerCase();
        if (hay.indexOf(q) === -1) return;
      }
      hits.push({ project: p, index: i });
    });
    list.innerHTML = hits.map(function (h) { return rowHTML(h.project, h.index); }).join('');
    blank.hidden = hits.length > 0;
  }

  searchInput.addEventListener('input', function (e) {
    query = e.target.value;
    renderIndex();
  });

  /* --------------------------------------------------------------- 展示 */
  /* 展示区分「截图 / 视频」两个 tab，每个 tab 里横向滚动看下一张 */
  var SHOT_TABS = [
    { type: 'image', label: '截图', icon: 'image', hint: '把截图或动图放进' },
    { type: 'video', label: '视频', icon: 'play', hint: '把 mp4 / mov 放进' }
  ];

  function shotsOf(p, type) {
    return (p.media || []).filter(function (m) { return (m.type || 'image') === type; });
  }

  /* '16/9' → '--rw:16;--rh:9'，宽高比以数字给 CSS，用来限宽限高 */
  function ratioVars(ratio) {
    var p = String(ratio || '16/9').split('/');
    var w = parseFloat(p[0]);
    var h = parseFloat(p[1]);
    if (!(w > 0) || !(h > 0)) { w = 16; h = 9; }
    return '--rw:' + w + ';--rh:' + h;
  }

  function shotHTML(m) {
    var isVideo = m.type === 'video';
    var frame = isVideo
      ? '<video src="' + esc(m.src) + '"' + (m.poster ? ' poster="' + esc(m.poster) + '"' : '') +
        ' controls muted loop playsinline preload="metadata"></video>'
      : '<img src="' + esc(m.src) + '" alt="' + esc(m.alt || m.caption || '') + '"' +
        ' loading="lazy" decoding="async" />';

    return '<figure class="shot" style="' + ratioVars(m.ratio) + '">' +
      '<div class="shot-frame">' + frame + '</div>' +
      (m.caption ? '<figcaption>' + esc(m.caption) + '</figcaption>' : '') +
      '</figure>';
  }

  function shotsHTML(p) {
    var first = SHOT_TABS.filter(function (t) { return shotsOf(p, t.type).length; })[0] || SHOT_TABS[0];

    var tabs = '<div class="mtabs" role="group" aria-label="展示类型">' +
      SHOT_TABS.map(function (t) {
        return '<button type="button" class="mtab" data-media-tab="' + t.type + '" aria-pressed="' +
          String(t.type === first.type) + '">' + esc(t.label) +
          '<span class="mn">' + shotsOf(p, t.type).length + '</span></button>';
      }).join('') + '</div>';

    var panels = SHOT_TABS.map(function (t) {
      var items = shotsOf(p, t.type);
      var body = items.length
        ? '<div class="shots" tabindex="0" role="region" aria-label="' +
          esc(p.name + ' ' + t.label) + '">' + items.map(shotHTML).join('') + '</div>'
        : emptyShotsHTML(p, t);
      return '<div class="mpanel" data-media-panel="' + t.type + '"' +
        (t.type === first.type ? '' : ' hidden') + '>' + body + '</div>';
    }).join('');

    // 一条素材都没有时，只留一个「还没有截图」的占位，不出 tab
    if (!(p.media || []).length) {
      return '<h2>实际效果</h2>' + emptyShotsHTML(p, SHOT_TABS[0]);
    }
    return '<div class="secbar"><h2>实际效果</h2>' + tabs + '</div>' + panels;
  }

  function emptyShotsHTML(p, tab) {
    return '<div class="shot-empty">' + iconSVG(tab.icon) +
      '<p class="t">还没有' + esc(tab.label) + '</p>' +
      '<p class="d">' + tab.hint + ' <code>assets/media/' + esc(p.id) + '/</code>，' +
      '再到 <code>assets/projects.js</code> 里补一条 <code>media</code>，这里就会显示出来。</p>' +
      '</div>';
  }

  /* ----------------------------------------------------------- 项目主页 */
  function projectHTML(p) {
    return '' +
      '<a class="back" href="#/"><span aria-hidden="true">←</span> 索引</a>' +

      '<header class="phead">' +
        '<p class="pstatus">' + esc(p.status) + '</p>' +
        '<h1>' + iconSVG(p.icon, 'ico-lg') + esc(p.name) + '</h1>' +
        '<p class="plabel">' + esc(p.tagline) + '</p>' +
      '</header>' +
      '<div class="prule" aria-hidden="true"></div>' +

      '<div class="pbody">' +
        '<p class="psum">' + esc(p.summary) + '</p>' +

        '<section class="psec" data-media>' + shotsHTML(p) + '</section>' +

        '<section class="psec">' +
          '<h2>核心能力</h2>' +
          '<ul class="feats">' + p.features.map(function (f, i) {
            return '<li>' +
              '<span class="pnum">' + pad(i + 1) + '</span>' +
              '<div><p class="ft">' + esc(f.t) + '</p>' +
              '<p class="fd">' + esc(f.d) + '</p></div>' +
              '</li>';
          }).join('') + '</ul>' +
        '</section>' +

        ((p.get && p.get.length)
          ? '<section class="psec"><h2>获取</h2>' + getHTML(p) + '</section>'
          : '') +
      '</div>';
  }

  /* 获取方式：有 href 的整行可点，没有的就只说明「怎么拿到」 */
  function getHTML(p) {
    return '<div class="gets">' + p.get.map(function (g) {
      var inner = iconSVG(g.icon, 'gico') +
        '<span class="gtext">' +
          '<span class="gt">' + esc(g.t) + '</span>' +
          (g.v ? '<span class="gv">' + esc(g.v) + '</span>' : '') +
        '</span>' +
        (g.tag ? '<span class="gtag">' + esc(g.tag) + '</span>' : '') +
        (g.href ? '<span class="go" aria-hidden="true">' + CHEVRON + '</span>' : '');
      return g.href
        ? '<a class="get-row" href="' + esc(g.href) + '" target="_blank" rel="noreferrer noopener">' +
          inner + '</a>'
        : '<div class="get-row">' + inner + '</div>';
    }).join('') + '</div>';
  }

  /* --------------------------------------------------------------- 路由 */
  function currentId() {
    var h = location.hash || '';
    if (h.indexOf('#/') !== 0) return '';
    return decodeURIComponent(h.slice(2));
  }

  function replayRise(el) {
    el.classList.remove('rise');
    void el.offsetWidth;
    el.classList.add('rise');
  }

  function route() {
    var id = currentId();
    var p = id ? byId(id) : null;

    if (p) {
      viewProject.innerHTML = projectHTML(p);
      viewProject.style.setProperty('--c', p.accent);
      viewIndex.hidden = true;
      viewProject.hidden = false;
      document.title = p.name + ' · 杂货铺';
      window.scrollTo(0, 0);
      replayRise(viewProject);
    } else {
      viewProject.hidden = true;
      viewIndex.hidden = false;
      document.title = '杂货铺';
      if (!viewIndex.dataset.done) {
        viewIndex.dataset.done = '1';
        renderIndex();
        replayRise(viewIndex);
      }
    }
  }

  window.addEventListener('hashchange', route);
  renderIndex();
  route();

  /* --------------------------------------------------- 展示区：切换 tab */
  document.addEventListener('click', function (e) {
    var btn = e.target && e.target.closest ? e.target.closest('[data-media-tab]') : null;
    if (!btn) return;
    var section = btn.closest('[data-media]');
    if (!section) return;
    var type = btn.dataset.mediaTab;
    $$('[data-media-tab]', section).forEach(function (b) {
      b.setAttribute('aria-pressed', String(b === btn));
    });
    $$('[data-media-panel]', section).forEach(function (panel) {
      panel.hidden = panel.dataset.mediaPanel !== type;
    });
  });

  /* --------------------------------------------------------------- 键盘 */
  document.addEventListener('keydown', function (e) {
    var onIndex = !viewIndex.hidden;
    if (e.key === '/') {
      var tag = (document.activeElement.tagName || '').toLowerCase();
      if (tag === 'input' || tag === 'textarea') return;
      if (!onIndex) return;
      e.preventDefault();
      searchInput.focus();
      return;
    }
    if (e.key === 'Escape' && onIndex) {
      if (query) {
        query = '';
        searchInput.value = '';
        renderIndex();
      } else if (document.activeElement === searchInput) {
        searchInput.blur();
      }
    }
  });
})();
