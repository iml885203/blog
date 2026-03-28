---
title: "淺談智慧家庭與 Matter 新標準"
date: 2022-08-10 13:33:00
category: "🏠 智慧家庭"
tags:
  - "智慧家庭"
cover: "/images/covers/smart-home-and-matter.webp"
description: "市面上所謂的「智慧」家庭裝置，其實都很「智障」。"
---

市面上所謂的「智慧」家庭裝置，其實都很「智障」。
## 理想中的智慧家庭

> 一到家自動打開電燈、窗簾、播放音樂。
>

「黑鏡」的影集中，充滿了智慧家庭的理想畫面，而在物聯網發展到現在現實中有辦法實現這樣的理想畫面嗎？

答案是 **可以，但沒那麼簡單。**

## 生態圈破碎，三國鼎立

![](/images/posts/smart-home-and-matter/stupid-home.webp)

目前智慧家庭各個品牌都有著各自的生態圈，他們無法互相串接控制。

比如我買了 Aqara 的「智慧」按鈕，卻不能控制 Yeelight 的「智慧」燈泡，或是控制之前很紅的 SwitchBot 去關閉我的電燈。

我一定要透過手機去控制這些裝置，而且智障的是他們都在不同的 App，而且很容易因為延遲時間造成焦慮，到頭來比原本走過去關燈還浪費時間…

目前有幾個比較大的生態圈有如三國鼎立各自為政，像是 [米家](https://buy.mi.com/tw/accessories/227), [Homekit](https://www.apple.com/tw/shop/accessories/all/homekit), [Google Home](https://www.winmostore.com/categories/okgoogle)，這些都是無法跨生態圈互相控制的。

## 要怎麼突破生態圈

![](/images/posts/smart-home-and-matter/home-assistant.webp)

> [HomeAssistant](https://www.home-assistant.io/) 是目前唯一跨生態圈從「智障」家庭裝置變「智慧」的方式。
>

這是由社群寫出來的一個開源專案，需要用 `樹莓派` 之類的硬體架設服務在自己家中，入門門檻很高，需要有一些軟硬體知識背景的才比較好上手。

## Matter - 智慧家庭新標準

![](/images/posts/smart-home-and-matter/matter.png)

[Matter](https://zh.wikipedia.org/zh-tw/Matter) 是一個新的智慧家庭標準，由各業者如: IKEA, Google, Apple 共同努力中，目標就是打破特定平台或生態圈的限制預計在2022年秋季發表。

## 後記

要真正打破三國鼎立，實現統一的那一天可能還需要好一陣子，就算 `Matter` 發布後，`Homekit` 要可以支援 `米家` 也是要等米家的裝置有支援 `Matter` 新標準，如果你家原本就是買米家全套，之後也可能要全部換掉。

但是 `Matter` 的確是之後打破生態圈的唯一解決方案，畢竟 HomeAssistant 不是一般使用者可以使用的，期待 `Matter` 發布的那天，看看能帶給物聯網什麼樣的發展。

## 參考

- [Wiki - Matter](https://zh.wikipedia.org/zh-tw/Matter)
- [Matter in Home Assistant workshop announcement](https://www.home-assistant.io/blog/2022/05/29/matter-in-home-assistant-workshop-announcement/)
- [2022智慧家庭條條大路通Matter？大廠排名進了家門不一樣](https://www.digitimes.com.tw/iot/article.asp?cat=158&cat1=20&id=0000626331_ERM2MOAB43TDXZ0AT35ZD)
