---
title: "中文 Web Font 踩雷"
date: 2022-03-15 10:01:00
category: "💣 各種踩雷"
tags:
  - "網頁開發"
  - "經驗"
cover: "/images/covers/chinese-web-font.webp"
description: "要在網頁上使用中文字型，可能沒你想像中的那麼簡單"
---

要在網頁上使用中文字型，可能沒你想像中的那麼簡單
## 踩雷紀錄

我從Mac提取了翩翩體(ttc)，並花了很多時間轉成ttf、woff、woff2，最後發現safari上會缺字...

![](/images/posts/chinese-web-font/webfont.png)

Safari

![](/images/posts/chinese-web-font/broken.png)

## 問題在哪？

直接在網頁使用font-face載入中文字型，會遇到以下問題

1. 載入速度
    - Flash of invisible text, FOIT：一開始看不到字，載入完成後才顯示
    - Flash of unstyled text, FOUT：一開始是其他字型，載入完成後會閃一下套用webfont
    - Loading時間變長
2. 字型格式瀏覽器不支援
    - 各瀏覽器對ttf、woff、woff2支援度不一樣
3. 缺字
    - 就算格式正確，不是每個瀏覽器都能支援此字體

## 解決方案

FOUT雖然可以使用[Web Font Loader](https://github.com/typekit/webfontloader)，中文字體檔案太大，直接載入是不實際的做法，無法解決根本問題：

- **中文字型檔案太大**
- **字型不相容瀏覽器**

### **解決方法1：文字都改成圖片**

在網頁上有用到特殊字型的地方都改成圖片去放，如果只是用在標題的話還可以，但如果是整頁都要特殊文字就比較不適合

### **解決方法2：雲端字型服務**

> **動態載入：**依據您網頁上使用的文字，動態的產生並下載您需要的字型
>

通常會提供一個js，會依據您網頁上使用的文字，動態的產生並下載您需要的字型，
並且在上面的字型基本上已經經過很多測試，不太會遇到瀏覽器缺字問題

- [Justfont](https://webfont.justfont.com/fonts)
- [TypeSquare](https://typesquare.com/zh_tw/service/web)
- [Adobe Fonts](https://helpx.adobe.com/tw/fonts/using/add-fonts-website.html)

## 我的做法 Adobe Fonts

由於我們公司原本就有購買 Adobe 所以就直接使用 [Adobe Fonts](https://helpx.adobe.com/tw/fonts/using/add-fonts-website.html) ，雖然支援中文字型不多，但直接透過他們網站設定好需要的自行並在網站載入js，就可以動態中文字型，非常方便

![](/images/posts/chinese-web-font/adobe.png)

## 參考

- [中文 Web Font 雷人記事本](https://blog.user.today/chinese-webfont-note/)
- [動態子集和網頁字體服務](https://helpx.adobe.com/tw/fonts/using/dynamic-subsetting.html)
- [網頁加載字型Web Font FOIT& FOUT與效能測試](https://282714.medium.com/%E7%B6%B2%E9%A0%81%E5%8A%A0%E8%BC%89%E5%AD%97%E5%9E%8Bfoit-fout%E8%88%87%E6%95%88%E8%83%BD%E6%B8%AC%E8%A9%A6-cb0b03daad60)
