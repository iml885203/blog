---
title: "Synology 手動更新 Docker Image"
date: 2021-02-19 16:49:00
category: "💾 Synology"
tags:
  - "維護"
  - "Synology"
  - "Docker"
cover: "/images/covers/synology-manual-update-docker-image.webp"
description: "在DSM上用Docker建立服務非常方便，但日常維護該怎麼升級版本呢？ 如果部署的時候有掛載儲存空間，就可以不用擔心資料的損失"
---

在DSM上用Docker建立服務非常方便，但日常維護該怎麼升級版本呢？

如果部署的時候有掛載儲存空間，就可以不用擔心資料的損失
## 更新Docker Image

我的習慣是下載image不要下載 `latest` 的映像檔，而是指定版本
並且升級時會先保留舊的容器，避免升級後有些狀況無法回覆

1. 在家目錄創一個資料夾 `docker_container_config`
2. Docker > 容器(container) > 選擇要升級的容器 > 設定 > 匯出至 `/homes/{username}/docker_container_config`

    ![](/images/posts/synology-manual-update-docker-image/step2-1.png)

    ![](/images/posts/synology-manual-update-docker-image/step2-2.png)

3. 倉庫伺服器 > 找映像檔(image) > 下載新版tag

    ![](/images/posts/synology-manual-update-docker-image/step3.png)

4. 停止容器 > 並且改名為 {name}_old

    ![](/images/posts/synology-manual-update-docker-image/step4-1.png)

    ![](/images/posts/synology-manual-update-docker-image/step4-2.png)

5. 點編輯 > 有連接埠設定的話 > 截圖並且移除

    ![](/images/posts/synology-manual-update-docker-image/step5.png)

6. 編輯剛匯出的config更改image為新版的tag

    ![](/images/posts/synology-manual-update-docker-image/step6-1.png)

    ![](/images/posts/synology-manual-update-docker-image/step6-2.png)

7. 匯入容器 > 啟動 > 檢查正常

    ![](/images/posts/synology-manual-update-docker-image/step7.png)

8. 刪除舊容器 {name}_old 和 舊映像檔(image)

這樣就可以完成版本升級，並且可以避免升級失敗

以我來說是固定3個月升級一次版本，避免過太久一次升太多版的話，會比較容易出現升級失敗的狀況
