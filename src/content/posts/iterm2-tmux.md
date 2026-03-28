---
title: "擺脫Tmux學習困難 - iTerm2 + Tmux"
date: 2020-12-25 12:33:00
category: "🧰️ 我的工具箱"
tags:
  - "Ubuntu"
  - "MacOS"
  - "工具"
cover: "/images/covers/iterm2-tmux.webp"
description: "iTerm2 + Tmux 完美搭配出一個 `可切割視窗` 與 `保留session` 的terminal"
---

iTerm2 + Tmux 完美搭配出一個 `可切割視窗` 與 `保留session` 的terminal
## 介紹

- iTerm2：可以取代MacOS Terminal的實用APP
- Tmux：Terminal session管理工具，用於ssh server上很方便，不會每次ssh都失去之前的狀態

Tmux雖然也可以像iTerm2可以做到切割畫面，但是Tmux操作上需要記很多快捷鍵，使用上不這麼的直覺

但是只要透過 [Tmux Integration](https://iterm2.com/documentation-tmux-integration.html)，就可以利用原本的iTerm2功能去使用Tmux，不用再去記一堆Tmux快捷鍵

## iTerm2

直接於網站上下載安裝 [https://iterm2.com/downloads.html](https://iterm2.com/downloads.html)

## Tmux

ubuntu建議直接用apt安裝

```bash
apt-get install tmux -y
```

> 不建議抓最新版，有一次用最新版無法支援iTerm2的tmux integration
>

max就用Homebrew安裝

```bash
brew install tmux
```

## iTerm2 - Tmux integration

這個不用特別安裝，

先到可以執行tmux的終端，然後執行

```bash
tmux -CC
```

這時會自動幫你開一個iTerm視窗，就可以直接透過iTerm用Tumx了

為了每次可以進去同一個session，可以用

```bash
tmux -CC new -A -s main
```

如果是ssh server

```bash
ssh -t example.com 'tmux -CC new -A -s main'
```

可以把指令放在iTerm的profile

![](/images/posts/iterm2-tmux/iterm2.png)

## 延伸閱讀

[取代shell 強大的Zsh (Zsh + Antigen + Oh my Zsh)](/2020/zsh-antigen/)

## 參考

- **[tmux Integration Best Practices](https://gitlab.com/gnachman/iterm2/-/wikis/tmux-Integration-Best-Practices)**
