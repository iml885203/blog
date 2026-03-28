---
title: '🏡 My Smart Home'
date: 2021-12-04 16:20:00
category: '🏠 智慧家庭'
tags:
  - '智慧家庭'
cover: '/images/covers/my-smart-home.webp'
description: '架設[HomeAssistant](https://www.home-assistant.io/)，串接家中各類IOT裝置 - Wifi：燈泡 - 紅外線：風扇、冷氣 - Zigbee：無線開關、門窗感應器、智慧插座 設計自動化流程，讓家裡變成如電影般的未來科技感！'
---

架設[HomeAssistant](https://www.home-assistant.io/)，串接家中各類IOT裝置

- Wifi：燈泡
- 紅外線：風扇、冷氣
- Zigbee：無線開關、門窗感應器、智慧插座

設計自動化流程，讓家裡變成如電影般的未來科技感！

## Hey! Siri!

![](/images/my-smart-home/hey-siri.gif)

HA與homekit串接
可用Siri聲音控制各種家電

夏天常常叫Siri幫我控制風扇
平常睡覺前都要跟Siri說晚安

Hey! Siri! 晚安!
（觸發情境：關燈、打開小夜燈、關電腦）

## TV Ambient Lighting

![](/images/my-smart-home/tv-ambient-lighting.gif)

- 樹梅派上安裝 [hyperion.ng](https://github.com/hyperion-project/hyperion.ng)
- ESP8266安裝 [WLED](https://github.com/Aircoookie/WLED)
- LED燈條
- HDMI擷取棒

於電視後方環繞LED燈條
透過Hyperion控制LED燈條

燈條會隨著螢幕畫面顯示對應顏色
看電影視覺體驗加倍！

## Automation

![](/images/my-smart-home/automation.webp)

在Node-RED上設計自動化流程，自動處理日常生活常常重複做的情境

如：回家開燈、出門關燈、走出陽台自動開燈、曬衣服提醒

彷彿生活在電影中（如美劇-黑鏡）的未來世界

## 7-Segment-Clock

![](/images/my-smart-home/7-segment-clock.png)

[7-Segment-Clock](https://github.com/iml885203/7-Segment-Clock)

> 時鐘每過1個月就要重新校正一次...
> 都202x年了，還沒有NTP自動對時功能？
> 那就只好自己做一個！

以前學過焊接的技能現在終於派上用場，用TV Ambient Lighting剩下來的LED燈條，加上ESP8266控制
NTP自動對時數位時鐘，可透過網頁控制亮度與顏色

## 公寓大門控制

![](/images/my-smart-home/door-control1.jpg)
![](/images/my-smart-home/door-control2.jpg)

> 手機開門，不用帶鑰匙！

繼電器點動控制公寓大門電鎖，透過wifi連線串接進HA
