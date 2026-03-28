---
title: "【Python】Flash 要上線了，先準備一下威士忌(WSGI)"
date: 2022-08-10 10:25:00
category: "🧑‍💻 程式語言"
tags:
  - "Python"
  - "Flask"
cover: "/images/covers/python-web-prepare-wsgi.webp"
description: "認識一下 WSGI (備註：發音跟英文的威士忌一樣)"
---

認識一下 WSGI (備註：發音跟英文的威士忌一樣)
## 前言

`Flask` 這個輕量級的框架很適合拿來「快速」建立網頁或是API，也有不少第三方工具可以支援，例如透過 `Flask-login` 來處理會員登入/登出功能。

不過 `Flask` 的負載是個考驗，在本地端測試通常沒有問題，但要上線讓多人使用時，心中總是忐忑不安。

## Flask 可以直接處理 Request，為什麼需要 WSGI 呢？

`Flask` 身為一個輕量級的框架，為了讓使用者不需要進行過多設定就能使用，所以已內建較為陽春的 `WSGI Server` (`Werkzeug`)，負責處理 `HTTP Request` 及 `Flask` 間資料的轉換。

Flask 官方文件有提到 `Werkzeug` 過於簡陋，只能算是 `WSGI` 工具包(Toolkit)，所以在處理「短時間多個 Request」時的負載能力不佳，所以如果有較大的流量需求，建議使用額外的 `WSGI Server` 。

接下來讓我們從 `Flask` 為起點，依序介紹 `Application Server` , `WSGI Server` , `Web Server` 的概念，以及如何設定服務，提高 `Flask` 的負載率。

## Application Server

常見的 `Flask` , `Django` 框架都屬於這個層級，主要負責：

> 接受客製化的Request，執行程式碼後，回傳客製化的Response
>

![](/images/posts/python-web-prepare-wsgi/app-server.png)

## WSGI Server

用來處理 `WSGI` 協定的伺服器

![](/images/posts/python-web-prepare-wsgi/wsgi-server.png)

WSGI 是一種「協定」，全名是 **Python Web Server Gateway Interface**

> 定義 HTTP Request 如何與 Application Server 互動
>

可以將 `WSGI Server` 理解成處理 `HTTP Request` 與 `Python 可理解的 Input/Output` 的中繼站(Middleware)。

所有支援 `WSGI` 協定的都可以稱為 `WSGI Server` ，現在比較常見的是 `gunicorn` 與 `uwsgi` 。

## Web Server

![](/images/posts/python-web-prepare-wsgi/web-server.png)

放在 `WSGI Server` 前方的 `Web Server`，常見的 `Apache` , `Nginx` 都是屬於 `Web Server` 的範疇，它的功能有下列：

1. 靜態檔案快取

    透過 Http Header 讓瀏覽器知道要將「大型靜態文件」暫存在使用者的瀏覽器，降低重複造訪時的讀取時間

2. 負載平衡(Load Balancer)

    當流量太高時，單靠一台 Server 不足以負載，會同時有多台 Server 提供服務，Web Server 會扮演門神，將 Requset 指引到該去的地方

3. 反向代理

    隱藏真正的 Server 位置，對於使用者來說，所有 Request 都是同一台 Server 在處理 (Web Server)，不需要也不會知道背後真正處理的 Server (Application Server) 是哪一台


## 統整

1. Application Server
    - 代表服務: `Flask` , `Django`
    - 特色: 負責處理商業邏輯
2. WSGI Server
    - 代表服務: `gunicorn` , `uwsgi`
    - 特色：根據 `WSGI` 協定，負責「HTTP Request」和「Application Server 能理解的內容」之間的轉換
3. Web Server
    - 代表服務: `Nginx` , `Apache`
    - 特色：靜態檔案快取、負載平衡、反向代理

## 參考

- [Flask想上線? 你還需要一些酷東西](https://www.minglunwu.com/notes/2021/flask_plus_wsgi.html#0)
