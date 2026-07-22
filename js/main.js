/* ============================================================
   main.js — 灯光系统 + 页面交互（原生 ES6，无依赖）
   ============================================================ */
(function () {
  "use strict";

  var body = document.body;

  /* ----------------------------------------------------------
   * 1. 双光源灯光系统
   *    光源 A：吊灯主光（--lx/--ly）—— 由 js/lamp3d.js 每帧驱动；
   *            3D 不可用时固定于 SVG 吊灯正下方。
   *    光源 B：鼠标手电筒（--mx/--my）—— 始终跟随指针。
   *    遮罩是 position: fixed，光斑直接用视口坐标，无需换算滚动。
   * ---------------------------------------------------------- */
  window.__setLamp = function (x, y) {
    body.style.setProperty("--lx", x + "px");
    body.style.setProperty("--ly", y + "px");
  };

  // 手电筒：跟随鼠标（rAF 节流）
  var rafId = null;
  var pendingX = null;
  var pendingY = null;
  function applyLightPosition() {
    rafId = null;
    if (pendingX === null) return;
    body.style.setProperty("--mx", pendingX + "px");
    body.style.setProperty("--my", pendingY + "px");
  }
  function onPointerMove(e) {
    if (document.body.dataset.lampDragging) return;
    pendingX = e.clientX;
    pendingY = e.clientY;
    if (rafId === null) rafId = requestAnimationFrame(applyLightPosition);
  }

  var isTouch = window.matchMedia("(hover: none)").matches;
  var reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (!isTouch && !reducedMotion) {
    window.addEventListener("pointermove", onPointerMove);
  }

  // 开灯 / 关灯切换
  var toggleBtn = document.getElementById("lightToggle");
  var toggleText = document.getElementById("lightToggleText");

  toggleBtn.addEventListener("click", function () {
    var on = body.classList.toggle("lights-on");
    toggleBtn.setAttribute("aria-pressed", String(on));
    toggleText.textContent = on ? "关灯" : "开灯";
  });

  /* ----------------------------------------------------------
   * 1.5 开场引导弹窗：点击"开始探索"才点亮灯光
   * ---------------------------------------------------------- */
  var introModal = document.getElementById("introModal");
  document.getElementById("introStart").addEventListener("click", function () {
    introModal.classList.add("hidden");
    if (!isTouch && !reducedMotion) {
      // 下一帧再点亮，确保半径过渡动画生效
      requestAnimationFrame(function () {
        body.classList.add("lit");
      });
    }
    startTypewriter();
  });

  /* ----------------------------------------------------------
   * 2. 导航：滚动背景 + 滚动进度条
   * ---------------------------------------------------------- */
  var nav = document.getElementById("nav");
  var progress = document.getElementById("scrollProgress");

  function onScroll() {
    nav.classList.toggle("scrolled", window.scrollY > 8);
    var max = document.documentElement.scrollHeight - window.innerHeight;
    progress.style.width = (max > 0 ? (window.scrollY / max) * 100 : 0) + "%";
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ----------------------------------------------------------
   * 3. 导航当前区块高亮
   * ---------------------------------------------------------- */
  var navLinks = document.querySelectorAll("[data-nav]");
  var sections = Array.prototype.map.call(navLinks, function (a) {
    return document.querySelector(a.getAttribute("href"));
  });

  var highlightObserver = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        navLinks.forEach(function (a) {
          a.classList.toggle(
            "active",
            a.getAttribute("href") === "#" + entry.target.id
          );
        });
      });
    },
    { rootMargin: "-40% 0px -55% 0px" }
  );
  sections.forEach(function (s) {
    if (s) highlightObserver.observe(s);
  });

  /* ----------------------------------------------------------
   * 4. 区块滚动入场动画
   * ---------------------------------------------------------- */
  var revealObserver = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );
  document.querySelectorAll(".reveal").forEach(function (el) {
    revealObserver.observe(el);
  });

  /* ----------------------------------------------------------
   * 5. Hero 打字机（由开场弹窗确认后触发）
   * ---------------------------------------------------------- */
  var typedEl = document.getElementById("typed");
  var PHRASES = [
    "2026 届 · AI Agent 开发工程师",
    "熟练使用 Claude Code / CodeX 等 AI 编程工具",
    "Python · 大模型 API · 从需求到上线的完整交付"
  ];

  var typewriterStarted = false;
  function startTypewriter() {
    if (typewriterStarted) return;
    typewriterStarted = true;
    if (reducedMotion) {
      typedEl.textContent = PHRASES[0];
      return;
    }
    var pi = 0;
    function typePhrase(text, i, done) {
      if (i > text.length) return setTimeout(done, 1800);
      typedEl.textContent = text.slice(0, i);
      setTimeout(function () { typePhrase(text, i + 1, done); }, 70);
    }
    function erasePhrase(done) {
      var t = typedEl.textContent;
      if (!t.length) return setTimeout(done, 300);
      typedEl.textContent = t.slice(0, -1);
      setTimeout(function () { erasePhrase(done); }, 28);
    }
    (function loop() {
      typePhrase(PHRASES[pi], 0, function () {
        erasePhrase(function () {
          pi = (pi + 1) % PHRASES.length;
          loop();
        });
      });
    })();
  }

  /* ----------------------------------------------------------
   * 6. 控制台彩蛋
   * ---------------------------------------------------------- */
  console.log(
    "%c💡 你发现了控制台！%c 本站由 Claude Code 协作构建，源码见 GitHub。",
    "font-size:16px;font-weight:bold;",
    "color:#9a98a3;"
  );
})();
