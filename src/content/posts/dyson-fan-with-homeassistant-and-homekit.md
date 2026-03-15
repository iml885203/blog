---
title: "Dyson 風扇/冷暖扇 接入 HomeAssistant/Homekit"
date: 2022-10-27 15:52:52
category: "🏠 智慧家庭"
tags:
  - "Home Assistant"
  - "Dyson"
  - "Homekit"
cover: "https://images.unsplash.com/photo-1599652645797-b34b1824507d?q=85&fm=jpg&w=1200&h=630&fit=crop"
description: "> 同步發佈於 [惟家論壇](https://community.justplus.com.tw/post/1965845054) 支援有 Dyson Link 功能，可以連接 Dyson APP 的設備，如果沒有請改走紅外線方式 >"
---

> 同步發佈於 [惟家論壇](https://community.justplus.com.tw/post/1965845054)
支援有 Dyson Link 功能，可以連接 Dyson APP 的設備，如果沒有請改走紅外線方式
>
## **使用 Dyson Local 接入 HA**

在使用 Dyson Local 之前，你需要知道你的設備的資訊

- 設備序號(Serial)
- 裝置類別(Device Type)
- 憑證(Credential)

### 💻 前置作業

先把設備加入的 Dyson APP

1. 照官方步驟連接裝置進去 Dyson APP
2. 登出 Dyson APP 帳號 (這步驟一定要做，不然之後取憑證會失敗)

### 🔑 取得憑證

1. 找一台可以執行 Python3 的電腦
2. 下載 [libdyson](https://github.com/shenxn/libdyson)
3. 執行程式 **`python3 get_devices.py`**
4. 照步驟輸入資料
- 地區: 2
- 區碼: TW
- 信箱: 你的 Dyson 帳號
- 密碼:
- 驗證碼: 去信箱收信

![](/images/posts/dyson-fan-with-homeassistant-and-homekit/get-devices.png)

### 🤖 接入 HomeAssistant

1. 透過 [HACS](https://www.justplus.com.tw/hacs.html) 安裝 [Dyson Local](https://github.com/shenxn/ha-dyson)
2. 在整合的地方新增 Dyson Local
3. 選擇 Setup manually
4. 照欄位輸入剛剛取得的資訊
- 設備序號(Serial)
- 憑證(Credential)
- 型號
- IP(選填)

確認沒問題即可送出

### ❓ 可能遇到的問題

- **取得憑證 出現 libdyson.exceptions.DysonInvalidAuth**

表示你沒有登出 Dyson APP，請登出後再嘗試

- **使用 Dyson Local 加入失敗**

請先確認步驟都正確無誤，輸入錯誤或是型號選錯都可能會加入失敗

另外型號太新 Dyson Local 不支援也會無法加入，可以看 [程式碼](https://github.com/shenxn/libdyson/blob/main/libdyson/const.py) 裡面是否有出現你的裝置類別(Device Type)，這時你就只能等作者更新，或者是有能力的話你可以改程式碼。

> 此作者近期好像沒啥在維護了...，如果跟我一樣用 HP07(527K) 的，可以用 [我改的Dyson Local](https://github.com/iml885203/ha-dyson)，一樣透過 HACS 加入，選擇該型號即可
>

### 📐 自定義擺動角度

> 成功加入後，恭喜解鎖一項官方沒開放的功能，"自定義擺動角度"
>

Dyson APP 雖然可以設定擺動方向，但只能 45/90/180/350，這幾種角度

現在你可以透過 Dyson Local 自定義風扇要吹哪個角度，或是在某個角度之間擺動

![](/images/posts/dyson-fan-with-homeassistant-and-homekit/service.png)

設定的角度，可以點開風扇明細底下的屬性那邊看到

![](/images/posts/dyson-fan-with-homeassistant-and-homekit/attribute.png)

但有幾點規則要注意：

- 角度區間（angle_high - angle_low）最少要 30
- angle_low 和 angle_high 一樣的話，會轉到該角度，並停止擺動

所以就可以根據你的環境，去定義幾個常用的擺動

![](/images/posts/dyson-fan-with-homeassistant-and-homekit/ui.png)

## **使用 Homebridge 接入 Homekit**

### ❓ 為何不直接透過 HA 接入 Homekit？

Dyson 冷暖扇的功能非常多，原本加入 HA 想說 Homekit 應該也沒啥問題，但是發現...有夠難用！

加入 HA 後這些功能會被拆分成好幾個實體

- 傳感器(sensor) x 7
- 開關(switch) x 2
- 風扇(fan)
- 空調(climate)

所以加入 Homekit 也會被拆分開來，風扇和空調的 UI 整個用起來很詭異

- 👎 傳感器部分都被拆分出去
- 👎 風扇點開有個按鈕是最不常用的 "吹後方" 功能
- 👎 風扇打開，空調也會 on，空調有 冷氣、暖氣模式

相比之下透過 Homebridge 加入的，就好用很多

- 👍 icon 為空氣清淨機，且傳感器數據都歸納在此之下
- 👍 暖氣功能，只有開關，沒有多選模式，只有暖氣打開時才會 on

當然你可以都試試看，如果覺得沒差就不用另外使用 Homebridge

### 🤖 接入 Homebridge

1. 安裝 Homebridge，可以在 [HA 上用 Portainer 安裝](https://www.justplus.com.tw/homebridgeinhassio.html)，或在 [NAS 上用 Docker 安裝](https://hdcola.medium.com/homebridge%E5%AE%89%E8%A3%85%E4%BD%BF%E7%94%A8%E4%BD%9C%E5%BC%8A%E6%9D%A1-docker%E7%89%88-4af9c9e2ac7d)
2. 在 Plugins 頁面搜尋套件 Dyson Pure Cool 安裝
3. 輸入剛剛得到的 設備序號(Serial)、憑證(Credential) 和設備 IP
4. 儲存並重啟 Homebridge

![](/images/posts/dyson-fan-with-homeassistant-and-homekit/homekit.png)

### ❓ 可能遇到的問題

- 冷暖扇加入後沒有暖氣功能

你很幸運跟我一樣買到新型號，[此插件](https://github.com/lukasroegner/homebridge-dyson-pure-cool) 尚未支援的話，可以先去 [程式碼](https://github.com/lukasroegner/homebridge-dyson-pure-cool/blob/master/src/productTypeInfo.js) 檢查是否存在你的裝置類別(Device Type)，沒有的話，你就只能等作者更新，或者是有能力的話你可以改程式碼。

## 參考

- [Dyson 使用 Dyson Local 接入HA問題及個人解法](https://forum.justplus.com.tw/forum.php?mod=viewthread&tid=95)
- [HomeBridge安装使用作弊条-Docker版](https://hdcola.medium.com/homebridge%E5%AE%89%E8%A3%85%E4%BD%BF%E7%94%A8%E4%BD%9C%E5%BC%8A%E6%9D%A1-docker%E7%89%88-4af9c9e2ac7d)
