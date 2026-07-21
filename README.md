# 个人介绍网站

> 深色「灯光探索」主题的个人主页 + AI 分身问答。纯静态前端 + 一个 Vercel Serverless Function，零构建依赖。

## 功能

- 💡 **灯光探索**：页面处于黑暗中，鼠标即光源，移动照亮内容（含开场"开灯"动画、一键全亮开关）
- 🤖 **AI 分身**：访客可向站主的 AI 分身提问（限 3 次），由 DeepSeek API 驱动，API key 仅存于服务端环境变量
- ✨ 打字机 Hero、滚动入场动画、导航区块高亮、滚动进度条

## 目录结构

```
├── index.html      # 单页全部区块
├── css/style.css   # 设计令牌 + 灯光遮罩 + 全部样式（无框架）
├── js/main.js      # 灯光跟随、开灯切换、滚动动画、打字机
├── js/chat.js      # 聊天 UI、3 次计数（localStorage）、调用 /api/chat
└── api/chat.js     # Vercel Serverless Function：system prompt + DeepSeek 调用
```

## 本地预览

纯看页面（agent 不可用）：

```bash
python -m http.server 8000
# 打开 http://localhost:8000
```

完整联调（含 AI 分身，需要 [Vercel CLI](https://vercel.com/cli)）：

```bash
npm i -g vercel
cp .env.example .env   # 填入 DEEPSEEK_API_KEY
vercel dev             # 打开提示的本地地址
```

## 部署

1. 推送本目录到 GitHub 仓库
2. Vercel → Import Project → 选择该仓库（零配置，自动识别静态站点 + `api/` 函数）
3. Vercel 项目 Settings → Environment Variables 添加 `DEEPSEEK_API_KEY`
4. 访问分配的 `*.vercel.app` 域名

## 环境变量

| 变量 | 说明 |
|---|---|
| `DEEPSEEK_API_KEY` | DeepSeek 平台 API Key（platform.deepseek.com 注册获取） |
