---
title: "白話文 Gitlab 升級操作指南"
date: 2022-08-30 13:24:00
category: "🏗 Infra"
tags:
  - "Ubuntu"
  - "Gitlab"
cover: "https://images.unsplash.com/photo-1600074169098-16a54d791d0d?q=85&fm=jpg&w=1200&h=630&fit=crop"
description: "此篇用白話文說明怎麼升級 Gitlab 版本 (Linux packages)。"
---

此篇用白話文說明怎麼升級 Gitlab 版本 (Linux packages)。
## 前言

Gitlab 升級說明在官方寫得非常清楚，但也是因為 “非常清楚” 導致文字量非常多，所以趁著這次升級 Gitlab 用白話文重新說明一下。

- 系統：Ubuntu 20.04
- Gitlab 版本：Gitlab CE
- Gitlab 安裝方式：Linux packages

## 先了解安裝方式

Gitlab 的安裝方式有幾種：

- Linux packages(Omnibus GitLab)
- Source installations
- Docker installations
- Kubernetes (Helm) installations

本篇主要著重於 Linux packages 安裝方式的升級

## 事前檢查

- [查看升級路徑](https://docs.gitlab.com/ee/update/index.html#upgrade-paths)
- 檢查一般配置

```bash
sudo gitlab-rake gitlab:check
```

- 確認可以解密加密的資料庫

```bash
sudo gitlab-rake gitlab:doctor:secrets
```

## 升級前備份

執行備份

```bash
sudo gitlab-backup create
```

此時看到一個警告

```verilog
Warning: Your gitlab.rb and gitlab-secrets.json files contain sensitive data
and are not included in this backup. You will need these files to restore a backup.
Please back them up manually.
```

`gitlab.rb` 和 `gitlab-secrets.json` 這兩個檔案包含敏感訊息，需要手動備份

```bash
sudo cp /etc/gitlab/gitlab.rb $(date +"%Y_%m_%d_gitlab.rb.backup")
sudo cp /etc/gitlab/gitlab-secrets.json $(date +"%Y_%m_%d_gitlab-secrets.json.backup")
```

確認一下剛剛的備份檔案

```bash
sudo ls /var/opt/gitlab/backups
```

## 開始升級

gitlab 分為 `gitlab-ee` 和 `gitlab-ce` 可以去 `https://yourgitlab/help` 看一下你的版本是 ee 還是 ce
因為我使用 ce 版本，如果是 ee 下方指令就自動替換成 ee

### A. 升級到最新版本

```bash
sudo apt update
sudo apt install gitlab-ce
```

### B. 升級到特定版本

根據[升級路徑](https://docs.gitlab.com/ee/update/index.html#upgrade-paths)，可能需要先升級到特定版本

```bash
sudo apt update
```

查看 apt 裡面 gitlab 可以安裝的版本號

```bash
sudo apt-cache madison gitlab-ce
```

安裝特定版本

```bash
sudo apt install gitlab-ce=<version>
```

## 參考

- [Upgrading Gitlab](https://docs.gitlab.com/ee/update/)
