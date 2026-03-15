---
title: "與 AI 的 Pair Programming - 打造方便的 git 複雜指令"
date: 2024-05-02 00:10:51
category: "🤖 人工智慧"
tags:
  - "工具"
  - "AI"
  - "程式"
cover: "https://images.unsplash.com/photo-1530442788742-8a6beb2efb65?q=85&fm=jpg&w=1200&h=630&fit=crop"
description: "在第一次學習到 Git Merge 功能時，覺得很反直覺，當自己開發的 branch 要合併至 develop 或是 master 時，還要 checkout 過去在做 merge。 只做一次倒還好，但這是每天都會用不只一次的指令，真的是蠻浪費的時間的，所以我想做 git 複雜指令是 > 將當前 Branch 合併至目標 Branch 並 push > 聽起來很簡單，但其實隱含了幾個 git 指令 - git checkout {target_branch} - git reset —hard origin/{target_branch} - 取代 git pull - git merge {origin_branch} - git push - git checkout {origin_branch} 分為不 push 和要 push 兩個指令 - Git Merge Into (gmi) - Git Merge Into and Push (gmip) 用起來會像是 ```jsx gmi {target_branch} gmip {target_branch} ```"
---

在第一次學習到 Git Merge 功能時，覺得很反直覺，當自己開發的 branch 要合併至 develop 或是 master 時，還要 checkout 過去在做 merge。

只做一次倒還好，但這是每天都會用不只一次的指令，真的是蠻浪費的時間的，所以我想做 git 複雜指令是

> 將當前 Branch 合併至目標 Branch 並 push
>

聽起來很簡單，但其實隱含了幾個 git 指令

- git checkout {target_branch}
- git reset —hard origin/{target_branch}
    - 取代 git pull
- git merge {origin_branch}
- git push
- git checkout {origin_branch}

分為不 push 和要 push 兩個指令

- Git Merge Into (gmi)
- Git Merge Into and Push (gmip)

用起來會像是

```jsx
gmi {target_branch}
gmip {target_branch}
```
### 最簡單的實作方法 Git Alias

這是我同事分享的 Git Alias

`git config --edit --global`

```jsx
[alias]
	co = checkout
	br = branch
	st = status
	l = log --oneline --graph
	ph = push
	pl = pull
	mi = !sh -c '_CURRENT_BRANCH=$(git symbolic-ref --short HEAD) && git checkout $1 && git pull && git merge $_CURRENT_BRANCH && git checkout $_CURRENT_BRANCH' -
	mip = !sh -c '_CURRENT_BRANCH=$(git symbolic-ref --short HEAD) && git checkout $1 && git pull && git merge $_CURRENT_BRANCH && git push && git checkout $_CURRENT_BRANCH' -
```

使用 `git mi {target_branch}` 就能最簡單達到目的，但指令執行時有個前提是

> 指令執行過程要一切順暢
>

也就是這指令沒有防呆，也沒有 error handle，當 pull, merge, push 中間哪一段失敗了，就會強制中斷。

且會斷在 target branch 上，不會再 checkout 回來你原來的 branch，我使用了一陣子 Git Alias 才覺得這樣的體驗少了一個 UX 很重要的 undo 功能。

### Amazon Q (前身 Fig) CLI Completion

CLI Completion 是個很好用的功能，可以提示指令下一個有什麼選擇，當他遇到 Alias 的話，會 Alias 的去做提示

像是上述的 `git co` 會以 `git checkout` 去提示

![](/images/posts/pair-programming-with-ai-build-complex-git-command/1.png)

可是如果過於複雜是一個 script 就會認不得 (請忽略 develop 那是 zsh 的 autocomplete）

![](/images/posts/pair-programming-with-ai-build-complex-git-command/2.png)

所以基於 git alias 體驗不好，且沒有 Completion 的情況下，我打算來自己打造 CLI

## 語言與 Library 選擇

記得我好久以前有寫過 CLI，但好久以前了，決定從零開始，並且與目前最會寫 code 的 AI Pair，一起來完成這項任務。

起初我請 AI 推薦要用哪個語言給我

![](/images/posts/pair-programming-with-ai-build-complex-git-command/3.png)

AI 還是一樣熱情多話呢，推薦了我使用 Python 或是 Go，我是先選擇了我比較熟悉的 Python

再請 AI 起個頭，寫個範例程式，第一次 AI 使用了 argparse 這 Library

![](/images/posts/pair-programming-with-ai-build-complex-git-command/4.png)

但是 AI 沒教我們怎麼 build 可立即執行的 bin，再請教他一次，這次他使用了 Click 來寫範例

![](/images/posts/pair-programming-with-ai-build-complex-git-command/5.png)

我就想說怎麼兩次推薦的不一樣，就去找了一下 Python 的 Cli Library。

結果找到 argparse、docopt、click、fire …

也太多選擇了吧！這也太為難有選擇困難的人了。

只好問候一下最熟悉的 Google，看了一陣子，感覺最容易上手的就是 click，最終就選擇由 Python + Click 開始實作我的 CLI 工具

## 現有程式轉換

我原本就有個 script 版本的程式，直接餵給 AI 請他幫我轉換

![](/images/posts/pair-programming-with-ai-build-complex-git-command/6.png)

試著跑了一下…恩…不能用呢…

當然第一版會有問題是很常見的，畢竟我的 AI 智慧只有 3.5，只好叫他再檢查一下

![](/images/posts/pair-programming-with-ai-build-complex-git-command/7.png)

恩…還不能用呢…

算了，我還是手動 debug，不然怎麼算是 Pair 呢

debug 完算是完成基本功能

之後就是

1. 程式可以動
2. 有要加功能請 AI 產生 code
3. 複製貼上
4. debug 和測試
5. 程式可以動

這樣反覆迭代後就完成了 CLI，前前後後大概只花了 3 個小時

https://github.com/iml885203/gmip

## 成果

### Success

![](/images/posts/pair-programming-with-ai-build-complex-git-command/8.png)

### Error Handle - Uncommitted changes

![](/images/posts/pair-programming-with-ai-build-complex-git-command/9.png)

### Error Handle - Merge conflict

![](/images/posts/pair-programming-with-ai-build-complex-git-command/10.png)

## 結語

與 AI pair 的過程要避免直接相信他的程式碼，主導權還是要在自己身上，對於不熟悉的程式碼還是一段一段套用測試比較安全，直接整個貼上 AI 給的程式碼誰知道哪個功能又壞掉。

目前使用的還只是免費的 GPT 3.5，用得好的話已經能節省很多時間，將來 AI 只會越來越進步，產生出來的程式碼錯誤率也會越來越低，相信不久的將來 AI 能成為最好的夥伴。
