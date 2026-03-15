---
title: "【Synology】安裝 Watchtower 自動更新 Docker Image"
date: 2022-08-15 15:38:36
category: "💾 Synology"
tags:
  - "Synology"
  - "Docker"
  - "維護"
cover: "https://images.unsplash.com/photo-1533630018502-93824e440009?q=85&fm=jpg&w=1200&h=630&fit=crop"
description: "在 DSM 裡面用 Docker 執行一些服務也一陣子了，一直以來都是固定每三個月手動更新 Docker 的 image 版本： [Synology手動更新Docker Image](/2021/synology-manual-update-docker-image) 後來發現一個自動升級 Image 的工具：[Watchtower](https://github.com/containrrr/watchtower)，今天就來教學怎麼透過 `任務排程表` 安裝 Watchtower。"
---

在 DSM 裡面用 Docker 執行一些服務也一陣子了，一直以來都是固定每三個月手動更新 Docker 的 image 版本： [Synology手動更新Docker Image](/2021/synology-manual-update-docker-image)

後來發現一個自動升級 Image 的工具：[Watchtower](https://github.com/containrrr/watchtower)，今天就來教學怎麼透過 `任務排程表` 安裝 Watchtower。

## 安裝步驟

1. 打開控制台
2. 任務排程表 > 新增 > 排程任務 > 使用者定義指令碼

    ![](/images/posts/synology-install-watchtower/step1.png)

3. 一般：輸入名稱、選擇帳號 `root` 、取消勾選 `已啟用`

    ![](/images/posts/synology-install-watchtower/step2.png)

4. 排程：選擇 `在以下日期執行`

    ![](/images/posts/synology-install-watchtower/step3.png)

5. 任務設定：勾選 `透過電子郵件傳送執行細節` ，輸入你的電子郵件，等一下可以收信確認指令結果

```bash
docker run -d --name=watchtower \
-v /var/run/docker.sock:/var/run/docker.sock \
-e TZ=Asia/Taipei \
--restart=always \
containrrr/watchtower --cleanup
```

![](/images/posts/synology-install-watchtower/step4.png)

6. 確定警告

    ![](/images/posts/synology-install-watchtower/step5.png)

7. 手動執行腳本

    ![](/images/posts/synology-install-watchtower/step6.png)

8. 打開 Docker ，確認成功

    ![](/images/posts/synology-install-watchtower/step7.png)


## 指令說明

```bash
docker run -d --name=watchtower \
-v /var/run/docker.sock:/var/run/docker.sock \
-e TZ=Asia/Taipei \
--restart=always \
containrrr/watchtower --cleanup
```

- `-e TZ=Asia/Taipei` : 設定時區，讓 log 顯示的時間為 Asia/Taipei

- `--cleanup` : 更新時，自動刪除舊的 image ，不然會留很多舊的 image

如果想要只監聽某些 container 可以在 `cleanup` 後面加上 container name

```bash
docker run -d --name=watchtower \
-v /var/run/docker.sock:/var/run/docker.sock \
-e TZ=Asia/Taipei \
--restart=always \
containrrr/watchtower --cleanup adguard bitwarden
```

在 Watchtower 起來後，log 可以看到只檢查這幾個 container

![](/images/posts/synology-install-watchtower/log.png)

想了解更多 Watchtower 指令可以看 [官方文件](https://containrrr.dev/watchtower/) 。

## 參考

- [Docker 全自動無人值守升級 WatchTower](https://www.jkg.tw/p3318/)
- [Synology: 30 Second Watchtower Install Using Task Scheduler & Docker](https://mariushosting.com/synology-30-second-watchtower-install-using-task-scheduler-docker/)
