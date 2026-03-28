---
title: '動態設定 Git 多帳號管理'
date: 2023-02-19 09:33:14
category: '🧑‍💻 程式語言'
tags:
  - 'Git'
  - 'Gitlab'
cover: '/images/covers/dynamic-setting-for-git-multi-account-management.webp'
description: '在使用 Git 提交代碼時，我們需要在配置文件中設置使用者名稱和電子郵件地址。通常，我們在一個倉庫中使用同一個 Git 賬戶來提交代碼。但是，有時候我們需要在同一臺電腦上使用不同的 Git 賬戶來提交代碼。例如，你可能需要在公司和個人項目之間切換，或者在參與不同團隊的多個項目時需要使用不同的 Git 賬戶。 為了避免每次切換項目時都手動更改 Git 配置文件，我們可以使用 `includeIf` 功能來實現動態配置 Git 使用者名稱和電子郵件地址。 以下是一些使用 `includeIf` 來動態配置 Git 使用者名稱和電子郵件地址的示例。'
---

在使用 Git 提交代碼時，我們需要在配置文件中設置使用者名稱和電子郵件地址。通常，我們在一個倉庫中使用同一個 Git 賬戶來提交代碼。但是，有時候我們需要在同一臺電腦上使用不同的 Git 賬戶來提交代碼。例如，你可能需要在公司和個人項目之間切換，或者在參與不同團隊的多個項目時需要使用不同的 Git 賬戶。

為了避免每次切換項目時都手動更改 Git 配置文件，我們可以使用 `includeIf` 功能來實現動態配置 Git 使用者名稱和電子郵件地址。

以下是一些使用 `includeIf` 來動態配置 Git 使用者名稱和電子郵件地址的示例。

## 配置 `includeIf` 選項

在你的 Git 全局配置文件（通常為 `~/.gitconfig`）中，添加以下配置：

```scss
[includeIf "gitdir/i:~/work/"]
        path = ~/.gitconfig-work
[includeIf "gitdir/i:~/personal/"]
        path = ~/.gitconfig-personal
```

這裡，我們使用了 `includeIf` 選項，它會根據當前 Git 倉庫所在的目錄自動切換 Git 賬戶。

如果當前 Git 倉庫的路徑包含 `~/work/`，那麼 Git 將會加載 `~/.gitconfig-work` 文件，這個文件包含了你的工作項目所需的 Git 配置。同樣地，如果當前 Git 倉庫的路徑包含 `~/personal/`，那麼 Git 將會加載 `~/.gitconfig-personal` 文件，這個文件包含了你的個人項目所需的 Git 配置。

## 配置不同的 Git 賬戶

現在，我們需要在兩個 Git 配置文件中分別設置不同的 Git 賬戶。

例如，你可以在 `~/.gitconfig-work` 文件中設置以下內容：

```scss
[user]
        name = Your Name (Work)
        email = your_email@work.com
```

而在 `~/.gitconfig-personal` 文件中，你可以設置以下內容：

```bash
[user]
        name = Your Name (Personal)
        email = your_email@personal.com
```

這樣，當你在 `~/work/` 目錄中的 Git 倉庫中提交代碼時，Git 將會使用 `~/.gitconfig-work` 文件中的配置，這包括使用你的工作電子郵件地址。而當你在 `~/personal/`
目錄中的 Git 倉庫中提交代碼時，Git 將會使用 `~/.gitconfig-personal`
文件中的配置，這包括使用你的個人電子郵件地址。

## 測試

現在，你可以在 `~/work/` 目錄中創建一個 Git 倉庫，並提交一些代碼。當你使用 `git log` 命令查看提交記錄時，你會看到提交者的名稱和電子郵件地址與 `~/.gitconfig-work` 中所定義的相同。

接著，在 `~/personal/` 目錄中創建一個 Git 倉庫，並提交一些代碼。當你使用 `git log` 命令查看提交記錄時，你會看到提交者的名稱和電子郵件地址與 `~/.gitconfig-personal` 中所定義的相同。

## **總結**

通過使用 `includeIf` 選項，你可以根據當前 Git 倉庫的目錄動態配置 Git 使用者名稱和電子郵件地址，這可以幫助你輕鬆地在不同項目之間切換，並避免手動更改 Git 配置文件的麻煩。
