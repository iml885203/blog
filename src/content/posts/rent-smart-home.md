---
title: "租屋打通任督二脈的智慧家庭"
date: 2022-08-16 12:23:47
category: "🏠 智慧家庭"
tags:
  - "智慧家庭"
cover: "https://images.unsplash.com/photo-1488229297570-58520851e868?q=85&fm=jpg&w=1200&h=630&fit=crop"
description: "租屋比較困難的是不方便更換牆壁開關，但還是弄出很完整的智慧家庭。"
---

租屋比較困難的是不方便更換牆壁開關，但還是弄出很完整的智慧家庭。
## 架構圖

先附上一張裝置架構圖

![](/images/posts/rent-smart-home/mind-map.png)

我有架設 HomeAssistant 為了要打通智慧裝置的任督二脈，後續才能做更多的自動化，自動化才是智慧家庭的精髓啊！

## 燈具

燈具由簡單到困難的解決方案有幾種方式：

1. 外掛開關上的觸手系開關?
    - 👍 優點：用於傳統開關、安裝方便
    - 👎 缺點：外掛有點醜、無法得知目前開關狀態(沒用過不確定)
    - 代表產品：SwitchBot
2. 智慧燈泡 + 智慧開關
    - 👍 優點：不用動家中電路、可自己調色溫
    - 👎 缺點：不能斷電、要封印傳統開關
    - 代表產品：Yeelight 燈泡、Zigbee 米家智慧開關
3. 智慧牆壁開關
    - 👍 優點：更換牆壁開關即可
    - 👎 缺點：須考慮家中電路有無中性線、是否會挑燈具等問題
    - 代表產品：Aqara 牆壁開關
4. 繼電器開關
    - 👍 優點：可以傳統開關搭配
    - 👎 缺點：不好安裝
    - 代表產品：Shelly 2.5

因為租屋關係，不太方便換牆壁開關，換了之後要退租還要換回來，太麻煩了，所以就用 `智慧燈泡 + 智慧開關` ，缺點就是要封印傳統開關，並且在旁邊用 3M 無痕膠黏智慧開關。

![](/images/posts/rent-smart-home/light-btn.jpg)

雖然感覺有點脫褲子放屁，但這是為了之後的自動化！

## 紅外線遙控

用 Broadlink 學習風扇、電視、冷氣的控制碼去做控制。

## 電力監控

控制紅外線裝置最大問題就是不知道裝置到底有沒有開啟，所以用了 Kasa 電力監控去得知電視是否開啟，也可以用在洗衣機上判斷是否洗好衣服。

## 門窗感應器

除了裝在門上，也可以用在冷氣葉片上，就可以知道冷氣的開關狀態。

## 溫濕度感測

![](/images/posts/rent-smart-home/tuya.jpg)

Tuya 溫濕度，這個會顯示溫度數字，黏在牆壁上可即時知道現在溫濕度。

## 公寓大門

Sonoff DC5V 接上公寓大門室內機，以後出門不用帶鑰匙。

## 自製 NTP 時鐘

![](/images/posts/rent-smart-home/ntp-clock.jpg)

[7-Segment-Clock](https://github.com/iml885203/7-Segment-Clock)

市面上一直找不到可以 NTP 自動對時的時鐘，只好自己做一個…
用燈條做的可以控制顏色和亮度，晚上剛好可以充當小夜燈。

## 智慧音響

以上裝置已經都整合進智慧家庭，要用語音控制需要一個智慧音響，我用的 Apple 裝置比較多，當然選擇 HomePod mini，平時為 AppleTV 的喇叭，有事就叫一下 Siri 幫我做事。

## Hyperion 與智慧燈條

![](https://firebasestorage.googleapis.com/v0/b/blog-storage-4f01d.appspot.com/o/2021%2Fmy-smart-home%2Ftv-ambient-lighting.gif?alt=media&token=6a3aff3a-b269-4393-9cbc-26ad181c3c9e)

根據電視邊緣畫面顯示對應顏色，追劇有感提升！

不確定這是否跟智慧家庭有關，但有智慧部分，應該扯得上邊吧XD

- 樹莓派 裝 [HyperBian](https://docs.hyperion-project.org/en/user/HyperBian.html)
- ESP 8266 裝 [WLED](https://github.com/Aircoookie/WLED)
- LED 燈條
- HDMI 擷取棒

## 智慧家庭的精髓 - 自動化

把所有東西串接再一起，就是為了這一刻！

> 💡 到家不用開燈，出門自己關燈
>

燈具已經連網，在搭配 [HomeAssistant 的存在偵測](https://www.home-assistant.io/getting-started/presence-detection/) (透過 GPS 或 WiFi) 、人體傳感器抓取戶外亮度，自動判斷開關燈，舒服！

> ❄️ 冷氣不需定時，半夜切換風扇
>

每天半夜固定時間關冷氣，並且切換成風扇，安穩睡過一天，舒服！

> 👣 走出陽台自動開燈
>

使用人體傳感器當有人出陽台自動開燈，門窗感應放陽台門，關門時關燈，舒服！

> 💡 洗衣服提示
>

電力監控洗衣機判斷衣服洗好，用 HomePod mini 提示音和客廳智慧燈泡提示燈，提醒衣服洗好了，舒服！

> 💤 睡覺說晚安
>

睡前躺在床上跟 Siri 說晚安，關閉電燈、關閉電腦、打開小夜燈，舒服！

## 後記

[HomeAssistant](https://www.home-assistant.io/) 入門門檻很高，需要有一些軟硬體知識背景的才比較好上手，且需要後續的維護，比較浪費時間和精力，目前沒有快速建置智慧家庭的方式，根據各家中情境不一樣，解決方案也會不同，除非等之後 Matter 標準發布後看有沒有新一步的突破，想了解更多可以去看另一篇：

[淺談智慧家庭與 Matter 新標準](/2022/smart-home-and-matter/)
