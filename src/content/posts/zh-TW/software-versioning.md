---
title: '軟體版本號哪種方式比較適合開發？(SemVer vs CalVer vs ZeroVer)'
date: 2022-12-30 16:00:13
category: '🧑‍💻 程式語言'
tags:
  - '程式'
  - '維護'
cover: '/images/covers/software-versioning.webp'
description: '軟體版本控制，通過使用特定的版本號格式來表示軟體版本，並且通過對版本號的變化來表示軟體中的改變。 常見的軟體版本號有 **語意版本號(Semantic Versioning，簡稱 SemVer)** 與 **日期版本號(Calendar Versioning，簡稱CalVer)** ，本篇將講解各種版本控制方式，並且於最後談論各種版本控制方式比較適合什麼樣的專案。'
---

軟體版本控制，通過使用特定的版本號格式來表示軟體版本，並且通過對版本號的變化來表示軟體中的改變。

常見的軟體版本號有 **語意版本號(Semantic Versioning，簡稱 SemVer)** 與 **日期版本號(Calendar Versioning，簡稱CalVer)** ，本篇將講解各種版本控制方式，並且於最後談論各種版本控制方式比較適合什麼樣的專案。

> 🤖 此篇部分內容由 [ChatGPT](https://chat.openai.com/chat) 協助產生

## 語意版本號（Semantic Versioning）

![](/images/posts/software-versioning/SemVer.webp)

在 Semantic Versioning 中（簡稱 SemVer），軟件版本號的格式為 **`主版本號.次版本號.修訂號`** 。

- 主版本號：用於表示軟體的大版本更新，例如 1.0.0、2.0.0 等，通常表示軟件中出現了重大的改變或新功能。
- 次版本號：用於表示軟體的小版本更新，例如 1.1.0、2.2.0 等，通常表示軟件中出現了一些新功能或改進。
- 修訂號：用於表示軟體的修訂版本，例如 1.0.1、2.2.3 等，通常表示軟體中出現了一些小的改變或修正。

還有一些規則，用於確定軟體版本號的增加方式：

- 在軟體的第一個版本中，主版本號應設為 0，當軟體進入生產階段時，主版本號應設為 1 或更大。
- 如果軟體的改變不會破壞向後相容性，則次版本號或修訂號應被增加。
- 如果軟體的改變會破壞向後相容性，則主版本號應被增加，次版本號和修訂號應被重置為 0。

通過遵循這些規則，開發者可以通過軟體版本號來表示軟體中的改變，並讓用戶或是合作夥伴更清楚地了解軟體的新功能和更新狀況。

## 日期版本號（Calendar Versioning）

![](/images/posts/software-versioning/CalVer.webp)

在 Calendar Versioning 中（簡稱 CalVer），軟體版本號的格式為 **`年份.月份.建構號`** ，建構號由 1 開始累加，並且於下個月份重置。

例如，軟體版本號為 2022.12.3 表示軟體在 2022 年 12 月第 3 次建構的發佈。

CalVer 的優點在於，它可以讓開發者和用戶很清楚地知道軟體的版本更新時間，並且很容易追蹤軟體的更新進度。

但是 CalVer 在表示軟體版本中出現的改變方面，並不像 SemVer 那樣精確，只能從版本號中得知大約是在什麼時候更新的，並不能提供有關軟體實際改變的更多訊息。

## 0 版本號（Zero Versioning）

ZeroVer 很簡單，**你的主要版本不應該超過計算中的第一個也是最重要的數字：零。**

例如：0.0.1、0.4.0、0.9999999

此方式被大量運用在各大專案上，可以於 [ZeroVer 的官網](https://0ver.org/#notable-zerover-projects) 看到，第一個就是很有名的 [React Native](https://github.com/facebook/react-native)。

個人猜測這些專案原本是想遵循 SemVer 規則，但由於開發者太多，無法輕易決定何時的版本算是 `Stable` 也就是 1.0.0，導致主版本號永遠處於 0 的狀態，變相的導致版本號的意義只被當作更新計數器，以便追蹤軟體更新進度。

## 適合用在什麼樣的專案？

### 語意版本號（Semantic Versioning）

規則嚴謹，好處是比較直觀，更貼近程式碼，但是如果沒有好好遵守規則，反而會變成 ZeroVer，版本號只是單純計數使用。

👉 **適合專案：Library、Package 的專案。**

### 日期版本號（Calendar Versioning）

規則簡單，且可以根據專案不同做調整，目前很多開源專案(HomeAssistant)或是大型專案(Ubuntu、Windows)，都是採用此方式。

因為大型開源專案通常有許多貢獻者，需要一種簡單易用的版本控制方式，會比 SemVer 還方便管理。

另外有專案如果是中途才決定採用版本號，也很適合 CalVer。

👉 **適合專案：大型開源專案、不需要太嚴謹版本控制的應用程式專案。**

### 0 版本號（Zero Versioning）

通常使用 SemVer 的專案疏於管理，就會自動變成 ZeroVer，應該沒有專案在剛開始會想要主動使用 ZeroVer，除非真的只是單純當更新計數器使用。

比較推薦趕快更換到比較有意義的 CalVer，之前 Home Assistant 也是 ZeroVer 的項目之一，直到 2020 年才從 0.118 版本切換到 CalVer。

![](/images/posts/software-versioning/ha.png)

👉 **適合專案：無**

## 參考

- [When to use use SEMVER or CALVER: project type considerations](https://frontside.com/blog/2022-02-09-semver-or-calver-by-project-type/)
- [SemVer and CalVer — 2 popular software versioning schemes](https://nehckl0.medium.com/semver-and-calver-2-popular-software-versioning-schemes-96be80efe36)
- [semver.org](https://semver.org/lang/zh-TW/)
- [calver.org](https://calver.org/overview_zhcn.html)
- [0ver.org](https://0ver.org/)
