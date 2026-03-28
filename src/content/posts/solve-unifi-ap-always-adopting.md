---
title: "解決 UniFi AP 卡在正在採用"
date: 2021-08-26 00:03:00
category: "💣 各種踩雷"
tags:
  - "UniFi"
  - "維護"
  - "經驗"
cover: "/images/covers/solve-unifi-ap-always-adopting.webp"
description: "如果因Controller升級或是AP固件升級，出現 `正在採用` 與 `斷開中` 不斷循環時 需要以SSH進去AP[手動接管](https://william.pylabs.org/2019/02/25/add-unifi-ap-to-controller-manually/)"
---

如果因Controller升級或是AP固件升級，出現 `正在採用` 與 `斷開中` 不斷循環時

需要以SSH進去AP[手動接管](https://william.pylabs.org/2019/02/25/add-unifi-ap-to-controller-manually/)
## 步驟
1. SSH登入AP

    原廠設定的AP帳密是ubnt/ubnt，但如果是加入過Controller的AP的話
    帳密要去 `設置->站點->設備身分驗證->SSH驗證` 查看

    ```bash
    ssh {username}@{ap_ip_address}
    ```

2. 通知Controller有新設備要加入

    這邊IP要打Controller的IP

    ```bash
    set-inform http://{controller_ip_address}:8080/inform
    ```

3. 檢查是否成功
