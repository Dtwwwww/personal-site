/* ============================================================
   chat.js — 个人 AI 分身聊天（限 5 问，前端计数）
   ============================================================ */
(function () {
  "use strict";

  var QUOTA_TOTAL = 5;
  var STORAGE_KEY = "agent_quota_used";

  var form = document.getElementById("chatForm");
  var input = document.getElementById("chatInput");
  var sendBtn = document.getElementById("chatSend");
  var messages = document.getElementById("chatMessages");
  var quotaLeft = document.getElementById("quotaLeft");

  // 多轮对话上下文（仅保留最近几轮，随请求一起发给服务端）
  var history = [];

  function getUsed() {
    var n = parseInt(localStorage.getItem(STORAGE_KEY) || "0", 10);
    return isNaN(n) ? 0 : n;
  }

  function refreshQuota() {
    var left = Math.max(0, QUOTA_TOTAL - getUsed());
    quotaLeft.textContent = String(left);
    if (left <= 0) {
      input.disabled = true;
      sendBtn.disabled = true;
      input.placeholder = "提问次数已用完，欢迎通过下方联系方式直接联系我";
    }
    return left;
  }

  function addMessage(text, cls) {
    var div = document.createElement("div");
    div.className = "msg " + cls;
    div.textContent = text;
    messages.appendChild(div);
    messages.scrollTop = messages.scrollHeight;
    return div;
  }

  // 回复逐字渲染，模拟打字效果
  function typeInto(el, text) {
    var i = 0;
    var timer = setInterval(function () {
      el.textContent = text.slice(0, ++i);
      messages.scrollTop = messages.scrollHeight;
      if (i >= text.length) clearInterval(timer);
    }, 18);
  }

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    var question = input.value.trim();
    if (!question || refreshQuota() <= 0) return;

    addMessage(question, "msg-user");
    history.push({ role: "user", content: question });
    input.value = "";
    sendBtn.disabled = true;

    // 消耗一次机会（发送即计数，失败不返还 —— 简单可预期）
    localStorage.setItem(STORAGE_KEY, String(getUsed() + 1));
    refreshQuota();

    var thinking = addMessage("思考中…", "msg-bot");

    fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: question, history: history.slice(-6) })
    })
      .then(function (res) {
        if (!res.ok) throw new Error("HTTP " + res.status);
        return res.json();
      })
      .then(function (data) {
        var reply = data.reply || "（没有收到回复）";
        history.push({ role: "assistant", content: reply });
        thinking.textContent = "";
        typeInto(thinking, reply);
      })
      .catch(function () {
        thinking.textContent = "分身暂时走神了，请稍后再试，或直接通过下方联系方式找我。";
        thinking.classList.add("msg-error");
      })
      .finally(function () {
        if (refreshQuota() > 0) sendBtn.disabled = false;
      });
  });

  refreshQuota();
})();
