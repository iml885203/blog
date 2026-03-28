---
title: '設計模式 (DesignPattern) 與典範 (Pardiams)'
date: 2022-11-22 16:20:03
category: '🧑‍💻 程式語言'
tags:
  - '筆記'
  - '程式'
cover: '/images/covers/design-pattern-and-pardiams.webp'
description: '在閱讀 [致 JavaScript 開發者的 Functional Programming 指南](https://ithelp.ithome.com.tw/articles/10287567) 文章時發現這部分知識快被忘光了，需要複習一下 **設計模式 (Design pattern)** 與 **典範 (Paradigm)** 的定義。'
---

在閱讀 [致 JavaScript 開發者的 Functional Programming 指南](https://ithelp.ithome.com.tw/articles/10287567) 文章時發現這部分知識快被忘光了，需要複習一下 **設計模式 (Design pattern)** 與 **典範 (Paradigm)** 的定義。

## 什麼是設計模式(Design Pattern)

> 在[軟體工程](https://zh.wikipedia.org/wiki/%E8%BB%9F%E9%AB%94%E5%B7%A5%E7%A8%8B)中，**設計模式**（design pattern）是對[軟體設計](https://zh.wikipedia.org/wiki/%E8%BB%9F%E4%BB%B6%E8%A8%AD%E8%A8%88)中普遍存在（反覆出現）的各種問題，所提出的解決方案。這個術語是由[埃里希·伽瑪](https://zh.wikipedia.org/wiki/%E5%9F%83%E9%87%8C%E5%B8%8C%C2%B7%E4%BC%BD%E7%91%AA)（Erich Gamma）等人在1990年代從[建築設計](https://zh.wikipedia.org/wiki/%E5%BB%BA%E7%AD%91%E8%AE%BE%E8%AE%A1)領域引入到[計算機科學](https://zh.wikipedia.org/wiki/%E8%A8%88%E7%AE%97%E6%A9%9F%E7%A7%91%E5%AD%B8)的。
>
> 設計模式並不直接用來完成[程式碼](https://zh.wikipedia.org/wiki/%E7%A8%8B%E5%BC%8F%E7%A2%BC)的編寫，而是描述在各種不同情況下，要怎麼解決問題的一種方案。[物件導向](https://zh.wikipedia.org/wiki/%E9%9D%A2%E5%90%91%E5%AF%B9%E8%B1%A1%E7%A8%8B%E5%BA%8F%E8%AE%BE%E8%AE%A1)設計模式通常以[類別](<https://zh.wikipedia.org/wiki/%E7%B1%BB_(%E8%AE%A1%E7%AE%97%E6%9C%BA%E7%A7%91%E5%AD%A6)>)或[物件](<https://zh.wikipedia.org/wiki/%E7%89%A9%E4%BB%B6_(%E9%9B%BB%E8%85%A6%E7%A7%91%E5%AD%B8)>)來描述其中的關係和相互作用，但不涉及用來完成應用程式的特定類別或物件。設計模式能使不穩定依賴於相對穩定、具體依賴於相對抽象，避免會引起麻煩的緊耦合，以增強軟體設計面對並適應變化的能力。
>
> 並非所有的軟體模式都是設計模式，設計模式特指軟體「設計」層次上的問題。還有其他非設計模式的模式，如[架構模式](https://zh.wikipedia.org/wiki/%E6%9E%B6%E6%9E%84%E6%A8%A1%E5%BC%8F)。同時，[演算法](https://zh.wikipedia.org/wiki/%E6%BC%94%E7%AE%97%E6%B3%95)不能算是一種設計模式，因為演算法主要是用來解決計算上的問題，而非設計上的問題。
>
> From [Wiki](<https://zh.m.wikipedia.org/zh-tw/%E8%AE%BE%E8%AE%A1%E6%A8%A1%E5%BC%8F_(%E8%AE%A1%E7%AE%97%E6%9C%BA)>)

狹義而言是指 Gof 的 23 個設計模式，廣義而言就是指一些程式元件實作時的模式。

Gof 的 23 個設計模式有些使用時機並不多，有些因為太常用了，已經變成許多程式或框架內建的一部分，像是

- Javascript 語言的 Proxy、Observer
- Laravel 框架的 Builder、Factory

這些都已經是內建的功能。

其實有點像是程式語言的歷史，你可以不懂 Observer 怎麼出現的，只要懂的怎麼用也可以寫出你想要的功能，只是學習了設計模式，就可以了解他設計的來源與想法，或許哪天**你也可以開發出屬於你自己的設計模式**。

## 什麼是典範(Paradigm)

典範 (Paradigm) 意指的是：**特定的程式設計風格。**

常見的典範有：物件導向程式設計 (Object-oriented Programming，簡稱 OOP)、函式程式設計 (Functional Programming，簡稱 FP)，兩者最大差別在於，**OOP 是以實作物件為基礎，而 FP 是以函式來解決所有的問題。**

目前主流還是 OOP，如果你有機會實作 FP 的話，要注意到在實作 FP 時會**犧牲效能與記憶體**，但是他的優點是：

- 讓邏輯變小更容易測試
- 減少達成目的所需要的程式狀態數量
- 更動程式狀態要用簡單且容易察覺的方式來做
- 減少不必要的程式的執行順序以及調用次數和細節的思考
- 減低程式碼的閱讀成本，快速的讓 Reviewer 知道你要做什麼，而且不用擔心有問題

## 設計模式與典範可否混用？

> 設計模式與規範混用是常態

一個專案可能出現各種設計模式與典範，像是常見的 Laravel 框架，內建就包含了很多設計模式，如：

- Builder Pattern
- Factory pattern
- Strategy pattern
- Provider pattern
- Repository pattern
- Facade pattern

## 參考

- [致 JavaScript 開發者的 Functional Programming 指南](https://ithelp.ithome.com.tw/articles/10287567)
- [GoF的23個Design Patterns要學幾個（2）？](http://teddy-chen-tw.blogspot.com/2013/05/gof23design-patterns2.html)
