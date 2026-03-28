---
title: "如何自製打造如 Philips Hue 電視沈浸式情境燈"
date: 2022-11-22 16:58:56
category: "🏠 智慧家庭"
tags:
  - "智慧家庭"
  - "經驗"
cover: "https://images.unsplash.com/photo-1532529867795-3c83442c1e5c?q=85&fm=jpg&w=1200&h=630&fit=crop"
description: "電視背後貼上燈條，根據畫面即時顯示對應的燈光效果，提升觀看電視的沈浸式體驗，這就是 Philips Hue 情境燈，但是代價就是需要用很多鈔票去換取這的炫砲效果。 本篇將說明怎麼利用樹莓派與 ESP32 開發板弄出相同的效果。"
---

電視背後貼上燈條，根據畫面即時顯示對應的燈光效果，提升觀看電視的沈浸式體驗，這就是 Philips Hue 情境燈，但是代價就是需要用很多鈔票去換取這的炫砲效果。

本篇將說明怎麼利用樹莓派與 ESP32 開發板弄出相同的效果。
## Philips Hue 價格對比

如果是用 Philips Hue 想要讓你的電視有動態情境燈光，需要有幾個設備

- Philips Hue Play HDMI影音燈光同步器
- Philips Hue Play 漸變全彩情境燈帶
- Philips Hue 智慧橋接器

主要為同步器+燈帶，橋接器是為了加進去 Philips 智慧家庭系統，讓你的手機可以控制用的。

剛好 某 P 電商有賣整個套組，然後來讓我們看一下價格…

![](/images/posts/how-to-build-ambilight-tv-like-philips-hue/philips-hue.png)

[https://24h.pchome.com.tw/store/DECN07](https://24h.pchome.com.tw/store/DECN07)

只是讓我的電視後面會發光，就要價 2萬5！？

那如果你是自己用樹莓派做的話…

|  | 品項 | 價格 | 購買連結 |
| --- | --- | --- | --- |
| 影音燈光同步器 | 樹莓派3 | 3,000 | https://reurl.cc/28LqDn |
|  | HDMI 擷取盒 | 800 | https://reurl.cc/VRLbGQ |
| 燈條 | ESP32 開發版 | 300 | https://reurl.cc/rZ5WdN |
|  | 燈條 WS2812B 5V 5M 300Leds | 700 | https://reurl.cc/4Xo943 |
|  | 3pin公母接頭 | 200 | https://reurl.cc/aaVyk7 |

> 於 2021 年初購買參考價格
>

整個價格只要 $5,000，比起 Philips 來說真的便宜超級多！！

擷取盒部分也可以拆開買 **HDMI 1進2出**、**HDMI 擷取線**，穩定度會比較好，我本身是用這兩個

| GZCOO HDMI 1進2出 | https://reurl.cc/qZLeX0 |
| --- | --- |
| IPXOZO 視訊擷取卡 | https://reurl.cc/bG9pdr |

## 影音燈光同步器

### 【軟體】樹莓派上安裝 Hyperion

[https://docs.hyperion-project.org/en/user/HyperBian.html#requirements](https://docs.hyperion-project.org/en/user/HyperBian.html#requirements)

根據教學安裝 `HyperBian` 在樹莓派上，安裝完後接上電源，過一陣子於瀏覽器連上你的 Hyperion `http://IpOfYourPi:8090`

安裝完成後，可以把 HDMI 擷取盒和樹莓派接上去你的電視，於 Capturing Hardware > USB Capture 那邊打勾，選擇裝置，解析度建議不要開太高。

![](/images/posts/how-to-build-ambilight-tv-like-philips-hue/hyperion-usb-capture.png)

點擊右上的電視 icon，打開 `Live video` ，可以看到樹莓派有沒有正確的截取到你的電視畫面。

![](/images/posts/how-to-build-ambilight-tv-like-philips-hue/hyperion-live-video.png)

## 情境燈條

### 【硬體】ESP32 焊接 3pin 母頭

![](/images/posts/how-to-build-ambilight-tv-like-philips-hue/esp32.webp)

我們之後會安裝 [WLED](https://kno.wled.ge/)，會用到 3 個腳位，5V、GND、GPIO2/P2，5V 和 GND 就是負責供電給燈條，而 GPIO2/P2 是傳輸資料告訴燈條需要顯示什麼顏色。

上圖是 ESP32 的，如果你是用 ESP8266 一樣是找 GPIO2/D4。

![](/images/posts/how-to-build-ambilight-tv-like-philips-hue/esp32-gpio.webp)

我醜陋的焊接 😂

上面有多和一顆電阻，是為了保護 LED 用的，但我也不知道有沒有用，反正就求個心安。

![](/images/posts/how-to-build-ambilight-tv-like-philips-hue/wled.png)

[https://kno.wled.ge/basics/getting-started/](https://kno.wled.ge/basics/getting-started/)

### 【硬體】燈條裁剪、焊接 3pin 母頭

把燈條找個膠帶黏貼在電視背後圍繞一圈，根據這尺裁剪下來，轉彎處部分可以直接繞，或是我一樣剪下來再焊接線上去。

燈條起點的地方焊接上 3pin 公頭，如果是剛買來的應該原本就會有 3pin 公頭就不需要焊接。

![](/images/posts/how-to-build-ambilight-tv-like-philips-hue/led-turning-point.webp)

### 【軟體】安裝 WLED

根據 [WLED 安裝教學](https://kno.wled.ge/basics/install-binary/) 把 WLED 安裝進去你的 ESP32。

安裝完後，照著 [WLED 設置教學](https://kno.wled.ge/basics/getting-started/) 設定你的 wifi

## Hyperion 設定 LED

> 請先確保擷取畫面沒問題再進行 LED 設定
>

**LED Controller**

- 左邊選單選擇 LED Instances > LED Output
- 在 LED Controller 區塊下的 Controller Type 選擇 wled
- Devices Discovered 應該會列出你的 wled 裝置，如果沒有就選 Custom 並手動輸入 IP
- 然後點 Save settings 保存設定

![](/images/posts/how-to-build-ambilight-tv-like-philips-hue/hyperion-wled.png)

**LED Layout**

- 左邊選單選擇 LED Instances > LED Output
- 選擇 LED Layout
- 點擊展開 Classic Layout (LED Frame)
- 根據你的燈條擺放位置，去輸入各個方向有幾顆 LED
- 然後點 Save Layout 保存設定
- 如果轉彎處有幾顆 LED 不要亮的，可以加在下方的 Blacklist LEDs

![](/images/posts/how-to-build-ambilight-tv-like-philips-hue/hyperion-wled-layout.png)

Image Processing

- 左邊選單選擇 LED Instances > Image Processing
- 找到 Smoothing 區塊打勾 Activate，並且保存
- 找到 Blackbar detector 區塊打勾 Activate，並且保存

以上設定好可以用 [這影片](https://www.youtube.com/watch?v=8u4UzzJZAUg) 去測試一下，都沒問題就可以馬上去找一部影片享受你的沈浸式觀影體驗！！

## 後記

Hyperion 我原本在 2021 年初完成，事隔快兩年才補完這篇，內容可能會太過輕描淡寫 😂，不過還是希望可以紀錄一下自己的心路歷程。

另外如果對 ESP 開發板不熟，不懂那些腳位、焊接的，[WLED 官網](https://kno.wled.ge/basics/compatible-hardware/) 也有提供一些已經預裝好且不需要焊接的開發板可以購買，買來就可以直接接上燈條使用，可以省去蠻多時間的。

## 參考

- [LEDs behind your screen that MATCH the video you're watching.](https://www.youtube.com/watch?v=urOEHzbV48A)
- [Getting Started With WLED on ESP8266](https://tynick.com/blog/11-03-2019/getting-started-with-wled-on-esp8266/)
