---
title: "【OpenAI 應用】取代 Siri 最智慧的語音助理 ChatGPT"
date: 2023-02-01 16:23:43
category: "🤖 人工智慧"
tags:
  - "GPT"
  - "AI"
  - "ChatGPT"
  - "iOS"
cover: "https://images.unsplash.com/photo-1623354582128-d8e232a8649e?q=85&fm=jpg&w=1200&h=630&fit=crop"
description: "本文將介紹如何利用 Siri 與 iOS 捷徑，連接 OpenAI API，製作出一個可以語音對話的 ChatGPT。"
---

本文將介紹如何利用 Siri 與 iOS 捷徑，連接 OpenAI API，製作出一個可以語音對話的 ChatGPT。
> 🤖 此篇部分內容由 [ChatGPT](https://chat.openai.com/chat) 協助產生


## API 費用說明

OpenAI API 不是完全免費的服務，但它提供了一些免費額度，讓使用者在額度內可以盡情試用 API 的功能。

每個帳號在註冊後都有 18 美元的免費額度，但需注意的是，這個額度會在三個月後到期。

![](/images/posts/the-most-intelligent-voice-assistant-chatgpt-to-replace-siri/price1.png)

使用 API 的費用是以使用 token 為計算基礎，1,000 個 token 的費用為 0.02 美元，也就是說，帶越多文字會使費用變得越高(廢話)。

![](/images/posts/the-most-intelligent-voice-assistant-chatgpt-to-replace-siri/price2.png)

## iOS 捷徑

附上捷徑連結：[https://www.icloud.com/shortcuts/4abaeeb59e3b444e9aecf946f2044b46](https://www.icloud.com/shortcuts/4abaeeb59e3b444e9aecf946f2044b46)

使用此捷徑前需先編輯填入你的 API_KEY，可以在 OpenAI 網站上的「API Keys」頁面產生 API_KEY。

1. 去 OpenAI 網站 [https://platform.openai.com/account/api-keys](https://platform.openai.com/account/api-keys)
2. 登入會員，可以用 Google 登入最快
3. 按下 Create new secret key
4. 將 key 複製起來
5. 編輯捷徑，將 key 貼過去

![](/images/posts/the-most-intelligent-voice-assistant-chatgpt-to-replace-siri/shortcut6.png)

設定完成後就可以直接點擊，以文字方式跟 ChatGPT 互動

![](/images/posts/the-most-intelligent-voice-assistant-chatgpt-to-replace-siri/shortcut1.webp)

![](/images/posts/the-most-intelligent-voice-assistant-chatgpt-to-replace-siri/shortcut2.webp)

![](/images/posts/the-most-intelligent-voice-assistant-chatgpt-to-replace-siri/shortcut3.webp)

也可以透過 Siri 以語音方式呼叫捷徑進行互動，只要對 Siri 說「Hey Siri {捷徑名字}」就可以啟動。

「寫一首七言絕句，關於 AI 取代人類」

![](/images/posts/the-most-intelligent-voice-assistant-chatgpt-to-replace-siri/shortcut4.webp)

但好像不是七個字…看來 GPT3 目前對這塊還不是很熟悉。

既然可以透過 Siri 操作捷徑，那其他可以執行 Siri 的裝置也可以透過這捷徑跟 GPT 互動，像是 HomePod、Apple Watch、Apple TV。

像是我可以透過的 Apple Watch 跟 ChatGPT 說話。

![](/images/posts/the-most-intelligent-voice-assistant-chatgpt-to-replace-siri/shortcut5.png)

~~好吧，ChatGPT 講的笑話都不好笑~~

## API 使用技巧

在使用 API 的時候，有兩個使用技巧是透過詢問 ChatGPT 知道的。

### 技巧1 - 禁止補齊文字

在測試 API 的時候發現，他有個很聰明的功能會自動補齊你的提詞(prompt)。

![](/images/posts/the-most-intelligent-voice-assistant-chatgpt-to-replace-siri/api1.png)

我只是輸入了「你好，可以」，他會自動幫我補齊後面的文字變成「你好可以幫你什麼？」

但是這樣在捷徑使用上會變成一個困擾，於是我去問了 ChatGPT…

![](/images/posts/the-most-intelligent-voice-assistant-chatgpt-to-replace-siri/api2.png)

**原來加上 [END] 就可以了！**

![](/images/posts/the-most-intelligent-voice-assistant-chatgpt-to-replace-siri/api3.png)

### 技巧2 - 指定繁體中文回答

與 ChatGPT 聊天時，會發現用中文有時候會以簡體中文回答，用英文就會用英文回答，之前我都會前面加個「用繁體中文和我對話」為開頭，但想知道有沒有更簡單的方法，於是我又去問了 ChatGPT…

![](/images/posts/the-most-intelligent-voice-assistant-chatgpt-to-replace-siri/api4.png)

**開頭加上 #language:zh-tw 就可以讓他理解了！**

![](/images/posts/the-most-intelligent-voice-assistant-chatgpt-to-replace-siri/api5.png)

用英文也可以讓他回答繁體中文

![](/images/posts/the-most-intelligent-voice-assistant-chatgpt-to-replace-siri/api6.png)
