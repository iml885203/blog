---
title: 'HomeAssistant Packages 優雅的管理YAML'
date: 2020-07-08 23:28:00
category: '🏠 智慧家庭'
tags:
  - '智慧家庭'
  - 'Home Assistant'
cover: '/images/covers/home-assistant-packages.webp'
description: '利用Packages幫助你更好管理HomeAssistant YAML檔案'
---

利用Packages幫助你更好管理HomeAssistant YAML檔案

## 一般的寫法 😰

全部塞在同一檔案，頂多用註解去說明

❌ **缺點：東西一多，你會崩潰**

`configuration.yaml`

```yaml
weather:
  # 天氣
  - platform: darksky
  #...

sensor:
  # 天氣
  - platform: darksky
    #...

  # 主機監控
  - platform: command_line
    #...
  - platform: systemmonitor
    #...

  # 小米系列電量
  - platform: template
    #...
```

## include拆分檔案方法 😥

試著把sensor拆出一個檔案

❌ **缺點：同樣是天氣的設定卻被拆在兩個檔案，之後要調整或刪除要開好幾個檔案編輯，東西一多也是崩潰**

`configuration.yaml`

```yaml
weather:
  # 天氣
  - platform: darksky
  #...

sensor: !include sensors.yaml
```

`sensors.yaml`

```yaml
# 天氣
- platform: darksky
  #...

# 主機監控
- platform: command_line
  #...
- platform: systemmonitor
  #...

# 小米系列電量
- platform: template
  #...
```

## Packages寫法 👍

利用packages寫法把天氣的設定統一在一個地方了

✅ **優點：關於天氣的設定，都放在同一區塊，方便之後調整**

❌ **缺點：還是在同一檔案，好像可以更好**

`configuration.yaml`

```yaml
homeassistant:
  packages:
    # 天氣
    my_darksky:
      weather:
        - platform: darksky
        #...
      sensor:
        - platform: darksky
        #...
    # 主機監控
    sys_monitor:
      sensor:
        - platform: command_line
        #...
        - platform: systemmonitor
        #...
    # 小米系列電量
    mi_battery:
      sensor:
        - platform: template
        #...
```

## Packages拆出檔案 👍👍

創建一個packages資料夾，資料夾裡面的檔案都會被整併進`configuration.yaml`

✅ **優點：把設定用檔案分開，方便之後要調整，甚至要移除的話只要移出去資料夾**

`configuration.yaml`

```yaml
homeassistant:
  packages: !include_dir_named packages
```

`packages/darksky.yaml`

```yaml
# 天氣
weather:
  - platform: darksky
  #...

sensor:
  - platform: darksky
    #...
```

`packages/sys_monitor.yaml`

```yaml
# 主機監控
sensor:
  - platform: command_line
    #...
  - platform: systemmonitor
    #...
```

`packages/mi_battery.yaml`

```yaml
# 小米系列電量
sensor:
  - platform: template
    #...
```

## 參考

- [HomeAssistant Packages](https://www.home-assistant.io/docs/configuration/packages/)
