---
title: "那一晚，我成為了 Nuxt Contributor"
date: 2026-03-10 12:30:00
category: "🤖 人工智慧"
tags:
  - "AI"
  - "OpenClaw"
  - "Nuxt"
  - "開源貢獻"
cover: "/images/the-night-i-became-nuxt-contributor.png"
description: "下班通勤的一個小時，我用手機完成了對 Nuxt 的第一次開源貢獻。隔天早上醒來，PR 已經被框架負責人 Daniel Roe 親自 merge 了。"
---

下班通勤的一個小時，我用手機完成了對 Nuxt 的第一次開源貢獻。隔天早上醒來，PR 已經被框架負責人 Daniel Roe 親自 merge 了。

## 從下班到發 PR

週一傍晚快七點，下班的路上。我打開 Discord，跟 Winnie 說：「找一下 Vue 相關的 package，看有沒有價值很高又很好做的 bug 可以處理。」

Winnie 是我的 [OpenClaw](https://openclaw.ai) agent，住在家裡的 Mac Mini 上。我在手機上跟它對話，它在電腦上工作。

幾分鐘後，Winnie 掃完了 Nuxt、Vue Router、VueUse 等專案的 issue tracker，篩出幾個還沒有人發 PR、難度合理的 issue。其中 [#34482](https://github.com/nuxt/nuxt/issues/34482) 引起我的注意——`.server.vue` 頁面用 `useHead` 設定的 title，在 hydration 後會消失。[Daniel Roe](https://github.com/danielroe) 已經確認需要修。

「這個看起來可以，去看看能不能重現。」

Winnie clone 了報告者的 reproduction，用 Playwright 確認 bug 存在，接著追 Nuxt 原始碼定位根因。我在捷運上盯著回報：「這是最小可行性改動嗎？不要順手重構。」方向對了。

七點半修復寫好，驗證通過。「要補測試嗎？」「這專案有習慣加註解嗎？」——品質細節在手機上問一句就能確認。

八點出頭，[PR](https://github.com/nuxt/nuxt/pull/34491) 開好了，總共 8 行。我人剛到家。

隔天早上，Daniel Roe 已經 merge。

## 人跟 Agent 的分工

整件事我全程沒有打開電腦。但這不代表 AI 自己能搞定。

回頭看，有些決策只有人能做：選哪個 issue、修復策略（「最小改動，不要重構」）、品質把關（註解風格、測試覆蓋）。這些是工程判斷，不是程式碼生成。Winnie 負責所有需要坐在電腦前的事——掃 issue tracker、追原始碼、重現 bug、寫修復和測試、commit 和 push。

比喻成開車的話：我決定去哪、走哪條路。Winnie 踩油門、看後照鏡。我只需要一支手機和 Discord。

## 為什麼這是個里程碑

修 8 行程式碼，技術上不是什麼大成就。

但以前想貢獻開源，卡住的地方從來不是能力，而是**啟動成本**：理解大型 monorepo 的架構、在不熟的 codebase 追根因、設定環境跑測試、確認 coding style⋯⋯每一步都不難，但加在一起就是「算了，週末追劇好了」。

OpenClaw 改變的不是我的技術能力——我本來就看得懂 Vue 的 hydration 邏輯。它改變的是摩擦力。最近看到 [Peter Steinberger](https://www.youtube.com/watch?v=8lF7HmQ_RgY)（OpenClaw 作者，剛加入 OpenAI）的一句話蠻準的：

> 以前你得仔細挑選要做哪個 side project，因為寫軟體很難。現在瓶頸從「會不會寫」變成「知不知道該寫什麼」。

在捷運上，用手機，一個小時。門檻降低後，你會發現自己願意嘗試的事情變多了。

這大概就是 AI 作為能力放大器最有意義的地方——不是讓你做到本來做不到的事，而是讓你願意去做本來懶得開始的事。
