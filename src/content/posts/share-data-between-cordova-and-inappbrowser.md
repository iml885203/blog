---
title: "在 Cordova 與 InAppBrowser 之間分享資料"
date: 2022-08-12 10:26:00
category: "🧑‍💻 程式語言"
tags:
  - "Cordova"
  - "Hybrid App"
cover: "/images/covers/share-data-between-cordova-and-inappbrowser.webp"
description: "Cordova 是一個 Hybrid App 可以使用 [InAppBrowser](https://github.com/apache/cordova-plugin-inappbrowser) 去打開一個網頁，但是他們之間要怎麼共享資料？"
---

Cordova 是一個 Hybrid App 可以使用 [InAppBrowser](https://github.com/apache/cordova-plugin-inappbrowser) 去打開一個網頁，但是他們之間要怎麼共享資料？
## Cordova 架構

![](/images/posts/share-data-between-cordova-and-inappbrowser/cordova.png)

Cordova 有很多 Plugin 可以安裝，其中一個就是 [InAppBrowser](https://github.com/apache/cordova-plugin-inappbrowser)，可以開啟遠端的網頁，但是透過這網頁是無法直接使用其他 Plugin 的功能，像是 Camera、Push Notification，需要先讓 Cordova 和 InAppBrowser 之間可以互相溝通分享資料。

## 了解 InAppBrowser

再開始之前，讓我們來了解一下 InAppBrowser ，InAppBrowser 允許在 App 內打開的網頁，而不用離開 App，如果不是用 InAppBrowser打開的網頁，則將會用默認的瀏覽器打開。

打開網頁非常簡單，安裝 InAppBrowser 之後只要只用 `window.open` 。

```javascript
var win = window.open("http://google.com", "_blank", "location=yes");
```

InAppBrowser 不支援 [postMessage](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/postMessage)，但有4個事件可以使用：

- loadstart – 當 InAppBrowser 開始加載 URL 時觸發事件。
- loadstop – 當 InAppBrowser 完成加載 URL 時觸發事件。
- loaderror – 當 InAppBrowser 在加載 URL 時遇到錯誤時觸發事件。
- exit – InAppBrowser 窗口關閉時觸發事件。

## executeScript

InAppBrowser 有一個 [executeScript](https://github.com/apache/cordova-plugin-inappbrowser#inappbrowserexecutescript) function，可以在 InAppBrowser 上直接執行 Javascript，並且可以取得結果

```javascript
let win = window.open("http://google.com", "_blank", "location=yes");
win.addEventListener("loadstop", () => {
  //code goes here
  win.executeScript({ code: "localStorage.setItem('name', 'Test')" });
  win.executeScript({ code: "localStorage.getItem('name')" }, ([val]) => {
    console.log(val);
  });
});
```

**Cordova 傳遞資料給 InAppBrowser**

```javascript
let myName = 'John';
win.executeScript({ code: `localStorage.setItem('name', '${myName}')` });
```

**InAppBrowser 傳遞資料給 Cordova**

由於 InAppBrowser 內沒有任何方法可以直接送資料給 Cordova，但可以透過創一個定期執行的函數，此函數將從 InAppBrowser 的 LocalStorage 中獲取資料。

```javascript
let name;
let nameInterval;
let win = window.open("http://google.com", "_blank", "location=yes");

win.addEventListener("loadstop", () => {
  nameInterval = setInterval(() => {
    win.executeScript({ code: "localStorage.getItem('name')" }, ([val]) => {
      name = val;
    });
  }, 100);
});

win.addEventListener("exit", () => {
  clearInterval(nameInterval);
});
```

這樣在 InAppBrowser 內就能透過 LocalStorage 傳資料給 Cordova

## 後記

為方便使用，可以將這方法實作成一個 EventBus 去處理兩方之間大量資料的溝通。

> 以下為範例用法，而非實際功能實作。
>

### Cordova → InAppBrowser

Cordova端

```javascript
bus.emit('show-alert', 'Hello World.');
```

InAppBrowser端

```javascript
bus.on('show-alert', (text) => alert(text));
```

### InAppBrowser → Cordova

搭配 `PushNotification` 的plugin: [cordova-plugin-fcm-with-dependecy-updated](https://github.com/andrehtissot/cordova-plugin-fcm-with-dependecy-updated)

Cordova端

```javascript
bus.on('fcb-subscribe-topic', (topic) => {
  FCM.subscribeToTopic(topic)
});
```

InAppBrowser端

```javascript
bus.emit('fcb-subscribe-topic', 'vip');
```

## 參考

- [Sharing Data between Hybrid App and InAppBrowser](https://dbwriteups.wordpress.com/2016/01/24/sharing-data-between-hybrid-app-and-inapp-browser/)
