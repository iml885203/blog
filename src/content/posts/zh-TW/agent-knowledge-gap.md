---
title: 'Agent 知識內化的缺口：從 Skill 到團隊 Know-How 的距離'
date: 2026-03-06 10:49:00
category: '🤖 人工智慧'
tags:
  - 'AI'
  - 'agent'
  - '知識管理'
  - 'Scrum'
cover: '/images/agent-knowledge-gap.webp'
description: '公司一直在試各種 AI 工具，用了一段時間後我發現一個很難繞過的問題：人類可以跟著 Scrum 流程走完整個 sprint，agent 卻做不到。'
---

公司一直在試各種 AI 工具，用了一段時間後我發現一個很難繞過的問題：人類可以跟著 Scrum 流程走完整個 sprint，agent 卻做不到。

## 從一個 Scrum 場景說起

公司一直在試各種 AI 工具，用了一段時間後我發現一個很難繞過的問題：**人類可以跟著 Scrum 流程走完整個 sprint，agent 卻做不到。**

不是說 agent 不能幫你寫程式——那個早就沒問題了。而是 Scrum 的每個環節都在產生知識：planning 裡決定了「這個功能這樣設計，因為...」、standup 裡有人提到「這邊要注意時區」、PR review 的 comment 說「我們的慣例是用 DTO 而不是直接回 entity」、retro 裡整理了「上次這樣做踩坑了」。人類跟著流程走，這些東西自然就吸收了。Agent 呢？只看得到被明確寫下來的部分。

這讓我開始思考：現有的 agent 知識管理機制，到底在解決什麼問題，又缺了什麼？

## 我們替 Agent 發明了很多管理方式

隨著 AI coding agent 生態成熟，出現了一系列「怎麼讓 agent 更聰明」的管理機制：

- **AGENTS.md / CLAUDE.md** — 全域行為規則，像是 agent 的員工手冊
- **Agent Skills** — 可重用的任務包，按需載入領域知識（agentskills.io 開放標準）
- **長期記憶（Memory）** — 讓 agent 跨 session 記住偏好、決策、教訓
- **MCP Server** — 標準化工具接口，讓 agent 存取外部服務

這些機制各有分工，看起來很完整。但實際用下來，總覺得少了什麼。

## 缺口：團隊 Know-How 怎麼進到 Agent？

團隊的 know-how 大致分兩類：

1. **Domain 商業邏輯** — 退貨規則、計費方式、合規要求、產品決策脈絡
2. **Coding 共識規範** — DTO 格式、日期時區處理、金額精度、錯誤碼、API contract

這些知識的產生過程通常是：planning 階段的討論 → Confluence/Notion 文件 → Slack/Teams 對話 → PR review comment → 最終沉澱在少數人的腦袋裡。

問題在於：現有的 agent 知識管理機制（skill、memory、agents.md）都需要人類主動撰寫、主動放到對的位置、主動維護更新。這跟人類自己的文件管理面臨完全一樣的困境——碎片化的 Confluence、過時的 wiki、沒人更新的 README。

> 核心矛盾：人類的文件都管不好了，現在還要多管一套 agent 文件。沒有自動化橋接，這條路走不遠。

我們團隊試過 Jira 的 Rovo——它有 agent 可以協助撰寫 AC、串接 Confluence 文件，聽起來很接近理想。實際用起來體感還是差了一截。到了 implement 階段，還要特地透過 MCP 串接 Jira 才能把 item 的 context 帶進 coding agent，速度也不快。試用了一段時間，後來就慢慢沒在用了。

這不是工具做得差，而是**整個流程的摩擦還是太高**——每個環節都要人主動介入，才能把知識從一個地方搬到另一個地方。

## 現有方案的定位與侷限

### 1. Agent Skills（agentskills.io）

開放標準，已被 Cursor、Claude Code、Codex、Roo Code 等支援。核心概念是「漸進式揭露」——agent 只在需要時載入相關 skill，避免 context 污染。適合封裝可重用的操作流程，但內容仍需人工撰寫維護。

### 2. AGENTS.md

GitHub Blog 分析了 2500+ 個 repo 的 agents.md，結論是：短、可執行、可驗證的規則最有效。最佳實踐是把 agents.md 當路由器——指向 skill 和 docs，自己只放硬規則。但本質仍是靜態文件，不會自動從團隊行為中學習。

### 3. 長期記憶

適合記錄個人偏好、歷史決策、踩坑經驗。但目前的記憶機制大多是「agent 自己記自己的」，缺乏團隊共享層。一個 agent 學到的教訓，另一個 agent 不知道。

### 4. Agent Memory Infrastructure（mem0、Zep）

mem0（開源）和 Zep（商業）是近年主流的 agent 記憶基礎設施。mem0 從對話中自動提取結構化事實存入向量資料庫；Zep 加上 knowledge graph 和時間衰減機制，能做記憶的關聯推理。兩者都解決了「跨 session 記憶持久化」的問題，但記憶粒度停在 user/agent 層級，缺乏團隊共享層。

## 有人在解這個問題嗎？

有，但都還在早期。大致方向是把 Slack、Jira、Confluence、GitHub 的資料建成知識圖譜，讓 coding agent 工作時可以直接查詢（例如 Unblocked）；或是讓 agent 持續從 codebase、ticket、PR feedback 中學習團隊的開發模式（AWS 的 Kiro）。

這個領域變化很快，工具可能幾個月就大換血。但有一點可以確定：**這個問題已經被認真對待了**，代表它真的夠痛。

## 理想的未來：從行為中自動提煉規範

光譜：完全手動 → 半自動（Confluence 同步）→ 知識圖譜檢索（Unblocked）→ 自動提煉（尚未成熟）

核心挑戰：

- **信號提取**：從海量對話中辨識「這是共識」vs「這只是一次性討論」
- **衝突偵測**：新規範與既有規範矛盾時怎麼處理
- **版本演進**：團隊共識會變，agent 需要知道「這條規則已過時」
- **信任邊界**：自動提煉的規範需要人類審核才能生效

## 結語

最根本的瓶頸——怎麼讓團隊在 planning 和 implement 過程中自然產生的共識，自動流入 agent 的知識庫——目前還沒有成熟方案。

現階段最務實的做法是：人寫第一版 → 工具同步到 agent 可讀格式 → CI 強制落地 → agent 協助維護。

這條路還很長。但從 Scrum 流程切入去思考「哪些知識該進 agent」，至少比「什麼都塞進 AGENTS.md」更有方向。

---

**參考資料：**

- [Vercel — Agent Skills Explained](https://vercel.com/blog/agent-skills-explained-an-faq)
- [Builder.io — Agent Skills vs Rules vs Commands](https://www.builder.io/blog/agent-skills-rules-commands)
- [GitHub Blog — How to write a great agents.md](https://github.blog/ai-and-ml/github-copilot/how-to-write-a-great-agents-md-lessons-from-over-2500-repositories/)
- [Unblocked — What your coding agent can't see](https://blog.getunblocked.com/blog/what-your-coding-agent-cant-see)
- [Kiro — Introducing Kiro Autonomous Agent](https://aws.amazon.com/blogs/news/introducing-kiro-autonomous-agent/)
- [agentskills.io — Agent Skills 開放標準](https://agentskills.io)
