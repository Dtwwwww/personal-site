var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });

// api/chat.js
var PROFILE = `
\u59D3\u540D\uFF1A\u4E01\u6CF0\u5A01\uFF0C\u5750\u6807\u6D59\u6C5F\u676D\u5DDE\uFF0C2026 \u5C4A\u672C\u79D1\u5E94\u5C4A\u751F\uFF08\u7ACB\u5373\u5230\u5C97\uFF09\uFF0C\u6C42\u804C\u65B9\u5411 AI Agent \u5F00\u53D1\u5DE5\u7A0B\u5E08\u3002
\u5B66\u6821\uFF1A\u6D59\u6C5F\u6811\u4EBA\u5B66\u9662\uFF0C\u8BA1\u7B97\u673A\u79D1\u5B66\u4E0E\u6280\u672F\u4E13\u4E1A\uFF0C\u4E13\u4E1A\u524D 5%\uFF0CGPA 3.8/5.0\u3002
\u7279\u6B8A\u7ECF\u5386\uFF1A\u5EFA\u7B51\u5B66\u5C31\u8BFB\u671F\u95F4\u53C2\u519B\u5165\u4F0D\uFF0C\u670D\u5F79\u4E8E\u6B66\u8B66\u9655\u897F\u603B\u961F\uFF0C\u83B7\u8BC4"\u56DB\u6709"\u4F18\u79C0\u58EB\u5175\uFF1B\u9000\u5F79\u590D\u5B66\u540E\u8F6C\u5165\u8BA1\u7B97\u673A\u4E13\u4E1A\uFF0C\u56E0\u6B64\u662F"\u8BA1\u7B97\u673A + \u5EFA\u7B51\u53CC\u80CC\u666F"\u3002

\u6280\u672F\u80FD\u529B\uFF1A
- \u7F16\u7A0B\u8BED\u8A00\uFF1APython\u3001Java\u3001SQL\u3001JavaScript
- AI \u5DE5\u5177\u4E0E\u5927\u6A21\u578B\uFF1AClaude Code\u3001CodeX\u3001Prompt \u5DE5\u7A0B\u3001Function Calling\u3001RAG\u3001\u5343\u95EE/\u667A\u8C31 GLM API\u3001LangChain/LangChain4j\u3001\u5411\u91CF\u68C0\u7D22\uFF08pgvector/Milvus\uFF09
- \u6846\u67B6\u4E0E\u5DE5\u7A0B\uFF1AFastAPI\u3001Spring Boot\u3001Next.js\u3001Playwright\u3001Docker\u3001Redis\u3001Celery\u3001Git\u3001\u963F\u91CC\u4E91 ECS
- \u4EA7\u54C1\u4E0E\u534F\u4F5C\uFF1APRD \u64B0\u5199\u3001Axure/Figma\u3001SQL/Python \u6570\u636E\u5206\u6790\u3001A/B \u5B9E\u9A8C

\u5B9E\u4E60\u7ECF\u5386\uFF1AAI Agent \u5F00\u53D1\u5B9E\u4E60\u751F\uFF082026.03\u20132026.07\uFF09\uFF0C\u4E3B\u5BFC Recruitment AI Agent \u667A\u80FD\u62DB\u8058\u5E73\u53F0\u7684\u89C4\u5212\u4E0E\u843D\u5730\uFF0C\u5C06 HR \u5355\u6B21\u7B5B\u9009\u4ECE 15 \u5206\u949F\u538B\u7F29\u81F3 2 \u5206\u949F\u3002

\u9879\u76EE\u7ECF\u5386\uFF1A
1. Recruitment AI Agent \u667A\u80FD\u62DB\u8058\u5E73\u53F0\uFF08\u5B9E\u4E60\u9879\u76EE\uFF0C\u5F00\u6E90\u5728 GitHub: Dtwwwwww/recruitment-agent-demo\uFF09\uFF1A\u7AEF\u5230\u7AEF\u81EA\u52A8\u5316\u62DB\u8058\u7CFB\u7EDF\uFF0CPlaywright \u6293\u53D6\u730E\u8058/BOSS \u76F4\u8058\uFF0C"DOM \u6587\u672C + \u89C6\u89C9\u6A21\u578B"\u53CC\u901A\u9053\u7B80\u5386\u63D0\u53D6\uFF0C5 \u5C42 AI Agent \u94FE\uFF08JD \u89E3\u6790\u219210 \u7EF4\u7B80\u5386\u5206\u6790\u2192\u52A0\u6743\u5339\u914D\u2192SABC \u8BC4\u7EA7\u2192\u9762\u8BD5\u9898\u751F\u6210\uFF09\u3002\u6280\u672F\u6808 FastAPI + Next.js 14 + \u5343\u95EE qwen-plus/vl + pgvector + Redis/Celery + Docker Compose\u3002\u6210\u679C\uFF1A\u4EBA\u624D\u5E93 500+\uFF0C\u7B5B\u9009 15min\u21922min\uFF0C\u670D\u52A1\u53EF\u7528\u6027 99.5%\u3002
2. sspOffer \u9762\u7ECF\u52A9\u624B\uFF08AI \u667A\u80FD\u9762\u8BD5 Agent\uFF09\uFF1A\u57FA\u4E8E ReAct \u8303\u5F0F\uFF0C\u610F\u56FE\u8BC6\u522B\u51C6\u786E\u7387 92%\uFF1BLangChain4j \u5C01\u88C5 7 \u4E2A Tool \u81EA\u52A8\u7F16\u6392\uFF0C\u54CD\u5E94 5s\u21921.2s\uFF1BRAG \u68C0\u7D22\u589E\u5F3A\uFF0C\u5F02\u6B65\u5EFA\u7D22\u5F15\u8BA9\u4E0A\u4F20\u5EF6\u8FDF 3.2s\u2192400ms\uFF1B\u81EA\u5EFA Piston \u4EE3\u7801\u6C99\u7BB1\uFF1B\u72EC\u7ACB\u90E8\u7F72\u963F\u91CC\u4E91 ECS\u3002\u6280\u672F\u6808 Java 17 + Spring Boot 3.2 + LangChain4j + WebFlux + Docker\u3002\u9898\u89E3\u94FE\u63A5\u51C6\u786E\u7387 78%\u219296%\u3002
3. AI \u5F92\u6B65\u5BFC\u822A\u5C0F\u7A0B\u5E8F\uFF08\u4EA7\u54C1\u8D1F\u8D23\u4EBA\uFF09\uFF1A0 \u5230 1 \u53D1\u8D77\uFF0C50+ \u7528\u6237\u8BBF\u8C08\u5B9A\u4E49 MVP\uFF0C\u534F\u8C03 3 \u4EBA\u56E2\u961F\u654F\u6377\u4EA4\u4ED8\uFF1B500+ \u79CD\u5B50\u7528\u6237\uFF0C\u8DEF\u6F14\u8F6C\u5316\u7387 32%\uFF0C\u4F7F\u7528\u65F6\u957F +35%\uFF0C\u5F31\u7F51\u6D3B\u8DC3 +28%\uFF0C\u83B7\u6821\u5185\u521B\u65B0\u5B9E\u8DF5\u4F18\u79C0\u9879\u76EE\u5956\u3002
4. AIGC \u8BBE\u8BA1\u5DE5\u5177\u6DF1\u5EA6\u7814\u7A76\uFF1A\u7CBE\u901A Midjourney V6\u3001Stable Diffusion WebUI\u3001ControlNet \u63A7\u56FE\u3001LoRA \u98CE\u683C\u5FAE\u8C03\uFF1B\u9006\u5411\u62C6\u89E3 XKool\u3001\u9177\u5BB6\u4E50\u7B49\u7ADE\u54C1\uFF1B\u81EA\u521B"\u7ED3\u6784-\u98CE\u683C-\u7EC6\u8282"\u4E09\u5C42\u63D0\u793A\u8BCD\u6846\u67B6\u3002

\u8363\u8A89\uFF1A\u7701\u653F\u5E9C\u5956\u5B66\u91D1\u3001\u56FD\u5BB6\u52B1\u5FD7\u5956\u5B66\u91D1\u3001\u6821\u4E00\u7B49\u5956\u5B66\u91D1\u3001\u6821\u4E09\u597D\u5B66\u751F\u3001\u6821\u4F18\u79C0\u5B66\u751F\u5E72\u90E8\u3001"\u56DB\u6709"\u4F18\u79C0\u58EB\u5175\u3002
\u8BC1\u4E66\uFF1ACET-4\u3001\u8BA1\u7B97\u673A\u4E8C\u7EA7 Python\uFF08\u4F18\u79C0\uFF09\u3002\u8BFE\u7A0B\u6210\u7EE9\uFF1A\u6570\u636E\u7ED3\u6784 92\u3001\u6570\u636E\u5E93 93\u3001\u6982\u7387\u8BBA 86\u3001\u8BA1\u7B97\u673A\u7F51\u7EDC 88\u3002

\u8054\u7CFB\u65B9\u5F0F\uFF1A\u90AE\u7BB1 1216665430@qq.com\uFF0CGitHub github.com/Dtwwwwww\uFF0C\u7535\u8BDD 198-1840-1229\u3002
`.trim();
var SYSTEM_PROMPT = `\u4F60\u662F\u4E01\u6CF0\u5A01\u4E2A\u4EBA\u7F51\u7AD9\u4E0A\u7684 AI \u5206\u8EAB\uFF0C\u4EE3\u8868\u7AD9\u4E3B\u56DE\u7B54\u8BBF\u5BA2\u7684\u95EE\u9898\u3002

\u89C4\u5219\uFF1A
1. \u53EA\u80FD\u4F9D\u636E\u4E0B\u9762\u7684\u7B80\u5386\u4FE1\u606F\u56DE\u7B54\uFF0C\u4E0D\u77E5\u9053\u7684\u5C31\u8BDA\u5B9E\u8BF4"\u8FD9\u4E2A\u7B80\u5386\u91CC\u6CA1\u5199\uFF0C\u6B22\u8FCE\u76F4\u63A5\u8054\u7CFB\u672C\u4EBA\u4E86\u89E3"\uFF1B
2. \u7528\u7B2C\u4E00\u4EBA\u79F0\u3001\u7B80\u6D01\u53CB\u597D\u5730\u56DE\u7B54\uFF0C\u6BCF\u6B21\u56DE\u590D\u63A7\u5236\u5728 120 \u5B57\u4EE5\u5185\uFF1B
3. \u4E0D\u56DE\u7B54\u4E0E\u7AD9\u4E3B\u65E0\u5173\u7684\u95EE\u9898\uFF08\u5982\u5199\u4EE3\u7801\u3001\u95F2\u804A\u3001\u653F\u6CBB\u7B49\uFF09\uFF0C\u793C\u8C8C\u5730\u628A\u8BDD\u9898\u5F15\u56DE\u7AD9\u4E3B\u7684\u7ECF\u5386\uFF1B
4. \u7EDD\u4E0D\u7F16\u9020\u7B80\u5386\u4E2D\u6CA1\u6709\u7684\u4FE1\u606F\u3002

\u7B80\u5386\u4FE1\u606F\uFF1A
${PROFILE}`;
var MAX_INPUT_LEN = 500;
function json(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "Content-Type": "application/json; charset=utf-8" }
  });
}
__name(json, "json");
async function onRequestPost(context) {
  const { request, env } = context;
  const apiKey = env.DEEPSEEK_API_KEY;
  if (!apiKey) {
    return json({ error: "\u670D\u52A1\u7AEF\u672A\u914D\u7F6E DEEPSEEK_API_KEY" }, 500);
  }
  let body;
  try {
    body = await request.json();
  } catch {
    return json({ error: "\u8BF7\u6C42\u683C\u5F0F\u9519\u8BEF" }, 400);
  }
  const { message, history = [] } = body || {};
  if (typeof message !== "string" || !message.trim()) {
    return json({ error: "\u6D88\u606F\u4E0D\u80FD\u4E3A\u7A7A" }, 400);
  }
  if (message.length > MAX_INPUT_LEN) {
    return json({ error: `\u6D88\u606F\u8FC7\u957F\uFF08\u9650 ${MAX_INPUT_LEN} \u5B57\uFF09` }, 400);
  }
  const safeHistory = Array.isArray(history) ? history.filter(
    (m) => m && (m.role === "user" || m.role === "assistant") && typeof m.content === "string"
  ).slice(-6).map((m) => ({ role: m.role, content: m.content.slice(0, MAX_INPUT_LEN) })) : [];
  try {
    const upstream = await fetch("https://api.deepseek.com/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: "deepseek-chat",
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          ...safeHistory,
          { role: "user", content: message.trim() }
        ],
        max_tokens: 300,
        temperature: 0.7
      })
    });
    if (!upstream.ok) {
      const detail = await upstream.text();
      console.error("DeepSeek API error:", upstream.status, detail);
      return json({ error: "\u6A21\u578B\u670D\u52A1\u6682\u65F6\u4E0D\u53EF\u7528" }, 502);
    }
    const data = await upstream.json();
    const reply = data?.choices?.[0]?.message?.content?.trim();
    if (!reply) {
      return json({ error: "\u6A21\u578B\u672A\u8FD4\u56DE\u5185\u5BB9" }, 502);
    }
    return json({ reply });
  } catch (err) {
    console.error("chat handler error:", err);
    return json({ error: "\u670D\u52A1\u5668\u5F00\u5C0F\u5DEE\u4E86\uFF0C\u8BF7\u7A0D\u540E\u518D\u8BD5" }, 500);
  }
}
__name(onRequestPost, "onRequestPost");

// ../.wrangler/tmp/pages-5MN6oS/functionsRoutes-0.5084422461448043.mjs
var routes = [
  {
    routePath: "/api/chat",
    mountPath: "/api",
    method: "POST",
    middlewares: [],
    modules: [onRequestPost]
  }
];

// ../../../npm-cache/_npx/d77349f55c2be1c0/node_modules/path-to-regexp/dist.es2015/index.js
function lexer(str) {
  var tokens = [];
  var i = 0;
  while (i < str.length) {
    var char = str[i];
    if (char === "*" || char === "+" || char === "?") {
      tokens.push({ type: "MODIFIER", index: i, value: str[i++] });
      continue;
    }
    if (char === "\\") {
      tokens.push({ type: "ESCAPED_CHAR", index: i++, value: str[i++] });
      continue;
    }
    if (char === "{") {
      tokens.push({ type: "OPEN", index: i, value: str[i++] });
      continue;
    }
    if (char === "}") {
      tokens.push({ type: "CLOSE", index: i, value: str[i++] });
      continue;
    }
    if (char === ":") {
      var name = "";
      var j = i + 1;
      while (j < str.length) {
        var code = str.charCodeAt(j);
        if (
          // `0-9`
          code >= 48 && code <= 57 || // `A-Z`
          code >= 65 && code <= 90 || // `a-z`
          code >= 97 && code <= 122 || // `_`
          code === 95
        ) {
          name += str[j++];
          continue;
        }
        break;
      }
      if (!name)
        throw new TypeError("Missing parameter name at ".concat(i));
      tokens.push({ type: "NAME", index: i, value: name });
      i = j;
      continue;
    }
    if (char === "(") {
      var count = 1;
      var pattern = "";
      var j = i + 1;
      if (str[j] === "?") {
        throw new TypeError('Pattern cannot start with "?" at '.concat(j));
      }
      while (j < str.length) {
        if (str[j] === "\\") {
          pattern += str[j++] + str[j++];
          continue;
        }
        if (str[j] === ")") {
          count--;
          if (count === 0) {
            j++;
            break;
          }
        } else if (str[j] === "(") {
          count++;
          if (str[j + 1] !== "?") {
            throw new TypeError("Capturing groups are not allowed at ".concat(j));
          }
        }
        pattern += str[j++];
      }
      if (count)
        throw new TypeError("Unbalanced pattern at ".concat(i));
      if (!pattern)
        throw new TypeError("Missing pattern at ".concat(i));
      tokens.push({ type: "PATTERN", index: i, value: pattern });
      i = j;
      continue;
    }
    tokens.push({ type: "CHAR", index: i, value: str[i++] });
  }
  tokens.push({ type: "END", index: i, value: "" });
  return tokens;
}
__name(lexer, "lexer");
function parse(str, options) {
  if (options === void 0) {
    options = {};
  }
  var tokens = lexer(str);
  var _a = options.prefixes, prefixes = _a === void 0 ? "./" : _a, _b = options.delimiter, delimiter = _b === void 0 ? "/#?" : _b;
  var result = [];
  var key = 0;
  var i = 0;
  var path = "";
  var tryConsume = /* @__PURE__ */ __name(function(type) {
    if (i < tokens.length && tokens[i].type === type)
      return tokens[i++].value;
  }, "tryConsume");
  var mustConsume = /* @__PURE__ */ __name(function(type) {
    var value2 = tryConsume(type);
    if (value2 !== void 0)
      return value2;
    var _a2 = tokens[i], nextType = _a2.type, index = _a2.index;
    throw new TypeError("Unexpected ".concat(nextType, " at ").concat(index, ", expected ").concat(type));
  }, "mustConsume");
  var consumeText = /* @__PURE__ */ __name(function() {
    var result2 = "";
    var value2;
    while (value2 = tryConsume("CHAR") || tryConsume("ESCAPED_CHAR")) {
      result2 += value2;
    }
    return result2;
  }, "consumeText");
  var isSafe = /* @__PURE__ */ __name(function(value2) {
    for (var _i = 0, delimiter_1 = delimiter; _i < delimiter_1.length; _i++) {
      var char2 = delimiter_1[_i];
      if (value2.indexOf(char2) > -1)
        return true;
    }
    return false;
  }, "isSafe");
  var safePattern = /* @__PURE__ */ __name(function(prefix2) {
    var prev = result[result.length - 1];
    var prevText = prefix2 || (prev && typeof prev === "string" ? prev : "");
    if (prev && !prevText) {
      throw new TypeError('Must have text between two parameters, missing text after "'.concat(prev.name, '"'));
    }
    if (!prevText || isSafe(prevText))
      return "[^".concat(escapeString(delimiter), "]+?");
    return "(?:(?!".concat(escapeString(prevText), ")[^").concat(escapeString(delimiter), "])+?");
  }, "safePattern");
  while (i < tokens.length) {
    var char = tryConsume("CHAR");
    var name = tryConsume("NAME");
    var pattern = tryConsume("PATTERN");
    if (name || pattern) {
      var prefix = char || "";
      if (prefixes.indexOf(prefix) === -1) {
        path += prefix;
        prefix = "";
      }
      if (path) {
        result.push(path);
        path = "";
      }
      result.push({
        name: name || key++,
        prefix,
        suffix: "",
        pattern: pattern || safePattern(prefix),
        modifier: tryConsume("MODIFIER") || ""
      });
      continue;
    }
    var value = char || tryConsume("ESCAPED_CHAR");
    if (value) {
      path += value;
      continue;
    }
    if (path) {
      result.push(path);
      path = "";
    }
    var open = tryConsume("OPEN");
    if (open) {
      var prefix = consumeText();
      var name_1 = tryConsume("NAME") || "";
      var pattern_1 = tryConsume("PATTERN") || "";
      var suffix = consumeText();
      mustConsume("CLOSE");
      result.push({
        name: name_1 || (pattern_1 ? key++ : ""),
        pattern: name_1 && !pattern_1 ? safePattern(prefix) : pattern_1,
        prefix,
        suffix,
        modifier: tryConsume("MODIFIER") || ""
      });
      continue;
    }
    mustConsume("END");
  }
  return result;
}
__name(parse, "parse");
function match(str, options) {
  var keys = [];
  var re = pathToRegexp(str, keys, options);
  return regexpToFunction(re, keys, options);
}
__name(match, "match");
function regexpToFunction(re, keys, options) {
  if (options === void 0) {
    options = {};
  }
  var _a = options.decode, decode = _a === void 0 ? function(x) {
    return x;
  } : _a;
  return function(pathname) {
    var m = re.exec(pathname);
    if (!m)
      return false;
    var path = m[0], index = m.index;
    var params = /* @__PURE__ */ Object.create(null);
    var _loop_1 = /* @__PURE__ */ __name(function(i2) {
      if (m[i2] === void 0)
        return "continue";
      var key = keys[i2 - 1];
      if (key.modifier === "*" || key.modifier === "+") {
        params[key.name] = m[i2].split(key.prefix + key.suffix).map(function(value) {
          return decode(value, key);
        });
      } else {
        params[key.name] = decode(m[i2], key);
      }
    }, "_loop_1");
    for (var i = 1; i < m.length; i++) {
      _loop_1(i);
    }
    return { path, index, params };
  };
}
__name(regexpToFunction, "regexpToFunction");
function escapeString(str) {
  return str.replace(/([.+*?=^!:${}()[\]|/\\])/g, "\\$1");
}
__name(escapeString, "escapeString");
function flags(options) {
  return options && options.sensitive ? "" : "i";
}
__name(flags, "flags");
function regexpToRegexp(path, keys) {
  if (!keys)
    return path;
  var groupsRegex = /\((?:\?<(.*?)>)?(?!\?)/g;
  var index = 0;
  var execResult = groupsRegex.exec(path.source);
  while (execResult) {
    keys.push({
      // Use parenthesized substring match if available, index otherwise
      name: execResult[1] || index++,
      prefix: "",
      suffix: "",
      modifier: "",
      pattern: ""
    });
    execResult = groupsRegex.exec(path.source);
  }
  return path;
}
__name(regexpToRegexp, "regexpToRegexp");
function arrayToRegexp(paths, keys, options) {
  var parts = paths.map(function(path) {
    return pathToRegexp(path, keys, options).source;
  });
  return new RegExp("(?:".concat(parts.join("|"), ")"), flags(options));
}
__name(arrayToRegexp, "arrayToRegexp");
function stringToRegexp(path, keys, options) {
  return tokensToRegexp(parse(path, options), keys, options);
}
__name(stringToRegexp, "stringToRegexp");
function tokensToRegexp(tokens, keys, options) {
  if (options === void 0) {
    options = {};
  }
  var _a = options.strict, strict = _a === void 0 ? false : _a, _b = options.start, start = _b === void 0 ? true : _b, _c = options.end, end = _c === void 0 ? true : _c, _d = options.encode, encode = _d === void 0 ? function(x) {
    return x;
  } : _d, _e = options.delimiter, delimiter = _e === void 0 ? "/#?" : _e, _f = options.endsWith, endsWith = _f === void 0 ? "" : _f;
  var endsWithRe = "[".concat(escapeString(endsWith), "]|$");
  var delimiterRe = "[".concat(escapeString(delimiter), "]");
  var route = start ? "^" : "";
  for (var _i = 0, tokens_1 = tokens; _i < tokens_1.length; _i++) {
    var token = tokens_1[_i];
    if (typeof token === "string") {
      route += escapeString(encode(token));
    } else {
      var prefix = escapeString(encode(token.prefix));
      var suffix = escapeString(encode(token.suffix));
      if (token.pattern) {
        if (keys)
          keys.push(token);
        if (prefix || suffix) {
          if (token.modifier === "+" || token.modifier === "*") {
            var mod = token.modifier === "*" ? "?" : "";
            route += "(?:".concat(prefix, "((?:").concat(token.pattern, ")(?:").concat(suffix).concat(prefix, "(?:").concat(token.pattern, "))*)").concat(suffix, ")").concat(mod);
          } else {
            route += "(?:".concat(prefix, "(").concat(token.pattern, ")").concat(suffix, ")").concat(token.modifier);
          }
        } else {
          if (token.modifier === "+" || token.modifier === "*") {
            throw new TypeError('Can not repeat "'.concat(token.name, '" without a prefix and suffix'));
          }
          route += "(".concat(token.pattern, ")").concat(token.modifier);
        }
      } else {
        route += "(?:".concat(prefix).concat(suffix, ")").concat(token.modifier);
      }
    }
  }
  if (end) {
    if (!strict)
      route += "".concat(delimiterRe, "?");
    route += !options.endsWith ? "$" : "(?=".concat(endsWithRe, ")");
  } else {
    var endToken = tokens[tokens.length - 1];
    var isEndDelimited = typeof endToken === "string" ? delimiterRe.indexOf(endToken[endToken.length - 1]) > -1 : endToken === void 0;
    if (!strict) {
      route += "(?:".concat(delimiterRe, "(?=").concat(endsWithRe, "))?");
    }
    if (!isEndDelimited) {
      route += "(?=".concat(delimiterRe, "|").concat(endsWithRe, ")");
    }
  }
  return new RegExp(route, flags(options));
}
__name(tokensToRegexp, "tokensToRegexp");
function pathToRegexp(path, keys, options) {
  if (path instanceof RegExp)
    return regexpToRegexp(path, keys);
  if (Array.isArray(path))
    return arrayToRegexp(path, keys, options);
  return stringToRegexp(path, keys, options);
}
__name(pathToRegexp, "pathToRegexp");

// ../../../npm-cache/_npx/d77349f55c2be1c0/node_modules/wrangler/templates/pages-template-worker.ts
var escapeRegex = /[.+?^${}()|[\]\\]/g;
function* executeRequest(request) {
  const requestPath = new URL(request.url).pathname;
  for (const route of [...routes].reverse()) {
    if (route.method && route.method !== request.method) {
      continue;
    }
    const routeMatcher = match(route.routePath.replace(escapeRegex, "\\$&"), {
      end: false
    });
    const mountMatcher = match(route.mountPath.replace(escapeRegex, "\\$&"), {
      end: false
    });
    const matchResult = routeMatcher(requestPath);
    const mountMatchResult = mountMatcher(requestPath);
    if (matchResult && mountMatchResult) {
      for (const handler of route.middlewares.flat()) {
        yield {
          handler,
          params: matchResult.params,
          path: mountMatchResult.path
        };
      }
    }
  }
  for (const route of routes) {
    if (route.method && route.method !== request.method) {
      continue;
    }
    const routeMatcher = match(route.routePath.replace(escapeRegex, "\\$&"), {
      end: true
    });
    const mountMatcher = match(route.mountPath.replace(escapeRegex, "\\$&"), {
      end: false
    });
    const matchResult = routeMatcher(requestPath);
    const mountMatchResult = mountMatcher(requestPath);
    if (matchResult && mountMatchResult && route.modules.length) {
      for (const handler of route.modules.flat()) {
        yield {
          handler,
          params: matchResult.params,
          path: matchResult.path
        };
      }
      break;
    }
  }
}
__name(executeRequest, "executeRequest");
var pages_template_worker_default = {
  async fetch(originalRequest, env, workerContext) {
    let request = originalRequest;
    const handlerIterator = executeRequest(request);
    let data = {};
    let isFailOpen = false;
    const next = /* @__PURE__ */ __name(async (input, init) => {
      if (input !== void 0) {
        let url = input;
        if (typeof input === "string") {
          url = new URL(input, request.url).toString();
        }
        request = new Request(url, init);
      }
      const result = handlerIterator.next();
      if (result.done === false) {
        const { handler, params, path } = result.value;
        const context = {
          request: new Request(request.clone()),
          functionPath: path,
          next,
          params,
          get data() {
            return data;
          },
          set data(value) {
            if (typeof value !== "object" || value === null) {
              throw new Error("context.data must be an object");
            }
            data = value;
          },
          env,
          waitUntil: workerContext.waitUntil.bind(workerContext),
          passThroughOnException: /* @__PURE__ */ __name(() => {
            isFailOpen = true;
          }, "passThroughOnException")
        };
        const response = await handler(context);
        if (!(response instanceof Response)) {
          throw new Error("Your Pages function should return a Response");
        }
        return cloneResponse(response);
      } else if ("ASSETS") {
        const response = await env["ASSETS"].fetch(request);
        return cloneResponse(response);
      } else {
        const response = await fetch(request);
        return cloneResponse(response);
      }
    }, "next");
    try {
      return await next();
    } catch (error) {
      if (isFailOpen) {
        const response = await env["ASSETS"].fetch(request);
        return cloneResponse(response);
      }
      throw error;
    }
  }
};
var cloneResponse = /* @__PURE__ */ __name((response) => (
  // https://fetch.spec.whatwg.org/#null-body-status
  new Response(
    [101, 204, 205, 304].includes(response.status) ? null : response.body,
    response
  )
), "cloneResponse");

// ../../../npm-cache/_npx/d77349f55c2be1c0/node_modules/wrangler/templates/middleware/middleware-ensure-req-body-drained.ts
var drainBody = /* @__PURE__ */ __name(async (request, env, _ctx, middlewareCtx) => {
  try {
    return await middlewareCtx.next(request, env);
  } finally {
    try {
      if (request.body !== null && !request.bodyUsed) {
        const reader = request.body.getReader();
        while (!(await reader.read()).done) {
        }
      }
    } catch (e) {
      console.error("Failed to drain the unused request body.", e);
    }
  }
}, "drainBody");
var middleware_ensure_req_body_drained_default = drainBody;

// ../../../npm-cache/_npx/d77349f55c2be1c0/node_modules/wrangler/templates/middleware/middleware-miniflare3-json-error.ts
function reduceError(e) {
  return {
    name: e?.name,
    message: e?.message ?? String(e),
    stack: e?.stack,
    cause: e?.cause === void 0 ? void 0 : reduceError(e.cause)
  };
}
__name(reduceError, "reduceError");
var jsonError = /* @__PURE__ */ __name(async (request, env, _ctx, middlewareCtx) => {
  try {
    return await middlewareCtx.next(request, env);
  } catch (e) {
    const error = reduceError(e);
    return Response.json(error, {
      status: 500,
      headers: { "MF-Experimental-Error-Stack": "true" }
    });
  }
}, "jsonError");
var middleware_miniflare3_json_error_default = jsonError;

// ../.wrangler/tmp/bundle-O5xYQT/middleware-insertion-facade.js
var __INTERNAL_WRANGLER_MIDDLEWARE__ = [
  middleware_ensure_req_body_drained_default,
  middleware_miniflare3_json_error_default
];
var middleware_insertion_facade_default = pages_template_worker_default;

// ../../../npm-cache/_npx/d77349f55c2be1c0/node_modules/wrangler/templates/middleware/common.ts
var __facade_middleware__ = [];
function __facade_register__(...args) {
  __facade_middleware__.push(...args.flat());
}
__name(__facade_register__, "__facade_register__");
function __facade_invokeChain__(request, env, ctx, dispatch, middlewareChain) {
  const [head, ...tail] = middlewareChain;
  const middlewareCtx = {
    dispatch,
    next(newRequest, newEnv) {
      return __facade_invokeChain__(newRequest, newEnv, ctx, dispatch, tail);
    }
  };
  return head(request, env, ctx, middlewareCtx);
}
__name(__facade_invokeChain__, "__facade_invokeChain__");
function __facade_invoke__(request, env, ctx, dispatch, finalMiddleware) {
  return __facade_invokeChain__(request, env, ctx, dispatch, [
    ...__facade_middleware__,
    finalMiddleware
  ]);
}
__name(__facade_invoke__, "__facade_invoke__");

// ../.wrangler/tmp/bundle-O5xYQT/middleware-loader.entry.ts
var __Facade_ScheduledController__ = class ___Facade_ScheduledController__ {
  constructor(scheduledTime, cron, noRetry) {
    this.scheduledTime = scheduledTime;
    this.cron = cron;
    this.#noRetry = noRetry;
  }
  scheduledTime;
  cron;
  static {
    __name(this, "__Facade_ScheduledController__");
  }
  #noRetry;
  noRetry() {
    if (!(this instanceof ___Facade_ScheduledController__)) {
      throw new TypeError("Illegal invocation");
    }
    this.#noRetry();
  }
};
function wrapExportedHandler(worker) {
  if (__INTERNAL_WRANGLER_MIDDLEWARE__ === void 0 || __INTERNAL_WRANGLER_MIDDLEWARE__.length === 0) {
    return worker;
  }
  for (const middleware of __INTERNAL_WRANGLER_MIDDLEWARE__) {
    __facade_register__(middleware);
  }
  const fetchDispatcher = /* @__PURE__ */ __name(function(request, env, ctx) {
    if (worker.fetch === void 0) {
      throw new Error("Handler does not export a fetch() function.");
    }
    return worker.fetch(request, env, ctx);
  }, "fetchDispatcher");
  return {
    ...worker,
    fetch(request, env, ctx) {
      const dispatcher = /* @__PURE__ */ __name(function(type, init) {
        if (type === "scheduled" && worker.scheduled !== void 0) {
          const controller = new __Facade_ScheduledController__(
            Date.now(),
            init.cron ?? "",
            () => {
            }
          );
          return worker.scheduled(controller, env, ctx);
        }
      }, "dispatcher");
      return __facade_invoke__(request, env, ctx, dispatcher, fetchDispatcher);
    }
  };
}
__name(wrapExportedHandler, "wrapExportedHandler");
function wrapWorkerEntrypoint(klass) {
  if (__INTERNAL_WRANGLER_MIDDLEWARE__ === void 0 || __INTERNAL_WRANGLER_MIDDLEWARE__.length === 0) {
    return klass;
  }
  for (const middleware of __INTERNAL_WRANGLER_MIDDLEWARE__) {
    __facade_register__(middleware);
  }
  return class extends klass {
    #fetchDispatcher = /* @__PURE__ */ __name((request, env, ctx) => {
      this.env = env;
      this.ctx = ctx;
      if (super.fetch === void 0) {
        throw new Error("Entrypoint class does not define a fetch() function.");
      }
      return super.fetch(request);
    }, "#fetchDispatcher");
    #dispatcher = /* @__PURE__ */ __name((type, init) => {
      if (type === "scheduled" && super.scheduled !== void 0) {
        const controller = new __Facade_ScheduledController__(
          Date.now(),
          init.cron ?? "",
          () => {
          }
        );
        return super.scheduled(controller);
      }
    }, "#dispatcher");
    fetch(request) {
      return __facade_invoke__(
        request,
        this.env,
        this.ctx,
        this.#dispatcher,
        this.#fetchDispatcher
      );
    }
  };
}
__name(wrapWorkerEntrypoint, "wrapWorkerEntrypoint");
var WRAPPED_ENTRY;
if (typeof middleware_insertion_facade_default === "object") {
  WRAPPED_ENTRY = wrapExportedHandler(middleware_insertion_facade_default);
} else if (typeof middleware_insertion_facade_default === "function") {
  WRAPPED_ENTRY = wrapWorkerEntrypoint(middleware_insertion_facade_default);
}
var middleware_loader_entry_default = WRAPPED_ENTRY;
export {
  __INTERNAL_WRANGLER_MIDDLEWARE__,
  middleware_loader_entry_default as default
};
//# sourceMappingURL=functionsWorker-0.49539444559844215.mjs.map
