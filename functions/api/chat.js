/* ============================================================
   functions/api/chat.js — Cloudflare Pages Function
   个人 AI 分身：内嵌简历信息作为 system prompt，调用 DeepSeek API
   （OpenAI 兼容接口）。API key 只存在于服务端环境变量。
   路由：POST /api/chat
   ============================================================ */

// 站主简历信息 —— AI 分身只能依据这里的内容回答
const PROFILE = `
姓名：丁泰威，坐标浙江杭州，2026 届本科应届生（立即到岗），求职方向 AI Agent 开发工程师。
学校：浙江树人学院，计算机科学与技术专业，专业前 5%，GPA 3.8/5.0。
特殊经历：建筑学就读期间参军入伍，服役于武警陕西总队，获评"四有"优秀士兵；退役复学后转入计算机专业，因此是"计算机 + 建筑双背景"。

技术能力：
- 编程语言：Python、Java、SQL、JavaScript
- AI 工具与大模型：Claude Code、CodeX、Prompt 工程、Function Calling、RAG、千问/智谱 GLM API、LangChain/LangChain4j、向量检索（pgvector/Milvus）
- 框架与工程：FastAPI、Spring Boot、Next.js、Playwright、Docker、Redis、Celery、Git、阿里云 ECS
- 产品与协作：PRD 撰写、Axure/Figma、SQL/Python 数据分析、A/B 实验

实习经历：AI Agent 开发实习生（2026.03–2026.07），主导 Recruitment AI Agent 智能招聘平台的规划与落地，将 HR 单次筛选从 15 分钟压缩至 2 分钟。

项目经历：
1. Recruitment AI Agent 智能招聘平台（实习项目，开源在 GitHub: Dtwwwwww/recruitment-agent-demo）：端到端自动化招聘系统，Playwright 抓取猎聘/BOSS 直聘，"DOM 文本 + 视觉模型"双通道简历提取，5 层 AI Agent 链（JD 解析→10 维简历分析→加权匹配→SABC 评级→面试题生成）。技术栈 FastAPI + Next.js 14 + 千问 qwen-plus/vl + pgvector + Redis/Celery + Docker Compose。成果：人才库 500+，筛选 15min→2min，服务可用性 99.5%。
2. sspOffer 面经助手（AI 智能面试 Agent）：基于 ReAct 范式，意图识别准确率 92%；LangChain4j 封装 7 个 Tool 自动编排，响应 5s→1.2s；RAG 检索增强，异步建索引让上传延迟 3.2s→400ms；自建 Piston 代码沙箱；独立部署阿里云 ECS。技术栈 Java 17 + Spring Boot 3.2 + LangChain4j + WebFlux + Docker。题解链接准确率 78%→96%。
3. AI 徒步导航小程序（产品负责人）：0 到 1 发起，50+ 用户访谈定义 MVP，协调 3 人团队敏捷交付；500+ 种子用户，路演转化率 32%，使用时长 +35%，弱网活跃 +28%，获校内创新实践优秀项目奖。
4. 智析 BrainMatch · AI 求职教练（独立全栈，即将部署上线，GitHub: Dtwwwwww/BrainMatch----）：独立从零设计开发的 AI 求职教练 SaaS 应用。核心架构为 4 Agent 顺序流水线（岗位冰山模型解析→简历信号深度扫描→5:3:2 加权匹配与 SABC 评级→6 种题型面试题库），578 行结构化 Prompt 模板含 20+ 字段严格 JSON Schema；四策略 JSON 容错解析器；SHA256 JD 语义缓存 + DeepSeek 默认路由，成本控制在 GPT-4o 的 1/10；Supabase RLS 全表安全、三种登录方式、Provider 抽象支付层、SSE 实时进度推送。全栈独立交付：Next.js 14 + TypeScript + Tailwind CSS，约 13,500 行代码，35 个 API 端点，21 个 UI 组件，10 张 PostgreSQL 表全部启用行级安全。
5. AIGC 设计工具深度研究：精通 Midjourney V6、Stable Diffusion WebUI、ControlNet 控图、LoRA 风格微调；逆向拆解 XKool、酷家乐等竞品；自创"结构-风格-细节"三层提示词框架。

荣誉：省政府奖学金、国家励志奖学金、校一等奖学金、校三好学生、校优秀学生干部、"四有"优秀士兵。
证书：CET-4、计算机二级 Python（优秀）。课程成绩：数据结构 92、数据库 93、概率论 86、计算机网络 88。

联系方式：邮箱 1216665430@qq.com，GitHub github.com/Dtwwwwww，电话 198-1840-1229。
`.trim();

const SYSTEM_PROMPT = `你是丁泰威个人网站上的 AI 分身，代表站主回答访客的问题。

规则：
1. 只能依据下面的简历信息回答，不知道的就诚实说"这个简历里没写，欢迎直接联系本人了解"；
2. 用第一人称、简洁友好地回答，每次回复控制在 120 字以内；
3. 不回答与站主无关的问题（如写代码、闲聊、政治等），礼貌地把话题引回站主的经历；
4. 绝不编造简历中没有的信息。

简历信息：
${PROFILE}`;

const MAX_INPUT_LEN = 500;

function json(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "Content-Type": "application/json; charset=utf-8" },
  });
}

export async function onRequestPost(context) {
  const { request, env } = context;

  const apiKey = env.DEEPSEEK_API_KEY;
  if (!apiKey) {
    return json({ error: "服务端未配置 DEEPSEEK_API_KEY" }, 500);
  }

  let body;
  try {
    body = await request.json();
  } catch {
    return json({ error: "请求格式错误" }, 400);
  }

  const { message, history = [] } = body || {};
  if (typeof message !== "string" || !message.trim()) {
    return json({ error: "消息不能为空" }, 400);
  }
  if (message.length > MAX_INPUT_LEN) {
    return json({ error: `消息过长（限 ${MAX_INPUT_LEN} 字）` }, 400);
  }

  // 过滤并截断历史，防止异常输入撑大请求
  const safeHistory = Array.isArray(history)
    ? history
        .filter(
          (m) =>
            m &&
            (m.role === "user" || m.role === "assistant") &&
            typeof m.content === "string"
        )
        .slice(-6)
        .map((m) => ({ role: m.role, content: m.content.slice(0, MAX_INPUT_LEN) }))
    : [];

  try {
    const upstream = await fetch("https://api.deepseek.com/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "deepseek-chat",
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          ...safeHistory,
          { role: "user", content: message.trim() },
        ],
        max_tokens: 300,
        temperature: 0.7,
      }),
    });

    if (!upstream.ok) {
      const detail = await upstream.text();
      console.error("DeepSeek API error:", upstream.status, detail);
      return json({ error: "模型服务暂时不可用" }, 502);
    }

    const data = await upstream.json();
    const reply = data?.choices?.[0]?.message?.content?.trim();
    if (!reply) {
      return json({ error: "模型未返回内容" }, 502);
    }

    return json({ reply });
  } catch (err) {
    console.error("chat handler error:", err);
    return json({ error: "服务器开小差了，请稍后再试" }, 500);
  }
}
