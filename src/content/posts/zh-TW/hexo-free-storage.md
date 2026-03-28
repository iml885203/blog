---
title: '【Hexo】圖片免費空間的抉擇'
date: 2022-08-11 11:43:00
category: '📖 Hexo'
tags:
  - 'Hexo'
  - 'Imgur'
  - 'Firebase'
cover: '/images/covers/hexo-free-storage.webp'
description: 'GitHub Pages 有 1GB 容量限制且圖片載入慢，探討 Hexo 部落格的免費圖片空間替代方案。'
---

Hexo 雖然可以直接使用 [asset image](https://hexo.io/zh-tw/docs/asset-folders.html) 去直接引入圖片，但是 Github Pages 有[限制專案大小 1GB](https://docs.github.com/en/pages/getting-started-with-github-pages/about-github-pages#:~:text=Published%20GitHub%20Pages%20sites%20may%20be%20no%20larger%20than%201%20GB)，而且透過 Github Pages 載入圖片的速度沒有很快。

## Imgur

imgur 是一個很好用的免費空間，而且支援很多套件可以直接在編輯器[上傳到 imgur](https://marketplace.visualstudio.com/items?itemName=MaxfieldWalker.vscode-imgur) ，非常方便，而且本身沒有任何流量限制。

但是 imgur 除了方便之外，上傳的圖片是沒有任何保障，可能會因為他的機制，像是太久沒人訪問，而被 imgur 刪除。

## Firebase Storage

Firebase Storage 有免費的使用空間，但會有一些限制

- 空間: 1G
- 流量限制: 每月 10G
- 文件讀取: 每天 50,000個

這個限制以一個小部落格是相當足夠的，能超過這限制代表你的網站有一定的流量了，可以考慮付費。

## 載入速度

前面說 imgur 很方便但沒保障之外，還有一個缺點，就是圖片載入沒有比 Github Pages 快多少。

稍微用 ab 來測試一下 `ab -n 10 -c 5 {url}`

![](/images/posts/hexo-free-storage/abtest.png)

- Github Pages: 7.3s
- Imgur: 13.5s 😢
- Firebase storage: 5.4s 👑

很明顯是 Firebase storage 略勝一點，另外有做個體感測試，在 Chrome 用 `cmd + shift + r` 避免快取的方式開圖去測試，體感上也是 Firebase storage 比較快一點。

## 結論

免費空間都各有優缺點，如果使用 imgur 載入速度沒有變快且圖片沒保障，我還是暫時以 Github Pages 為主，畢竟要把 1G 用光還是需要一陣子。

## 參考

- [(29) 試著學 Hexo - 奇淫技巧 - 快速上傳你的圖片到 imgur](https://israynotarray.com/hexo/20201012/473855281/)
- [(9) 試著學 Hexo - 圖片空間的挑選](https://ithelp.ithome.com.tw/articles/10241647)
- [Hexo 使用 Firebase 當圖片空間操作方式](https://echocarrie.com/hexo/20220615/2433171521/)
- [Firebase Storage 使用和限制](https://firebase.google.com/docs/firestore/quotas)
