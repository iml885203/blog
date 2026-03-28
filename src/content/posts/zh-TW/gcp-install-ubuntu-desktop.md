---
title: 'GCP 上安裝 Ubuntu Desktop'
date: 2022-07-27 17:51:00
category: '☁️ 雲端平台'
tags:
  - 'GCP'
  - 'Ubuntu'
cover: '/images/covers/gcp-install-ubuntu-desktop.webp'
description: '雲端平台(GCP、AWS)通常使用 VM 都是只有 Terminal 介面 但總是有些特殊形況需要用到 Desktop UI，像是財政部的開發票軟體 Turnkey，只能透過 GUI 去操作。 所以就記錄一下，怎麼在GCP上安裝 Ubuntu Desktop。'
---

雲端平台(GCP、AWS)通常使用 VM 都是只有 Terminal 介面
但總是有些特殊形況需要用到 Desktop UI，像是財政部的開發票軟體 Turnkey，只能透過 GUI 去操作。

所以就記錄一下，怎麼在GCP上安裝 Ubuntu Desktop。

## Install

以下操作都是在 Ubuntu 20.04 上執行，需要先在 GCP 上開一個 VM 並進入 Terminal

```bash
sudo apt-get update -y
sudo apt-get upgrade -y
sudo apt-get install gnome-shell -y
sudo apt-get install ubuntu-gnome-desktop -y
sudo apt-get install autocutsel -y
sudo apt-get install gnome-core -y
sudo apt-get install gnome-panel -y
sudo apt-get install gnome-themes-standard -y
sudo apt-get install tightvncserver -y
touch ~/.Xresources
tightvncserver
# Set password first time.
# When asked to a view-only password, type n for not now.
vncserver -kill :1
nano ~/.vnc/xstartup
```

編輯 `~/.vnc/xstartup`

```bash
#!/bin/sh
autocutsel -fork
xrdb $HOME/.Xresources
xsetroot -solid grey
export XKL_XMODMAP_DISABLE=1
export XDG_CURRENT_DESKTOP="GNOME-Flashback:Unity"
export XDG_MENU_PREFIX="gnome-flashback-"
unset DBUS_SESSION_BUS_ADDRESS
gnome-session --session=gnome-flashback-metacity --disable-acceleration-check --debug &
```

啟動vnc server

```bash
vncserver -geometry 1440x900 -localhost
# listen on ports 5901, 6001
```

## Change port

可使用 `:{port number}` 會累加5900，控制監聽的port

```bash
vncserver -geometry 1440x900 :2 -localhost # listen on 5902
vncserver -kill :2 # stop vnc

vncserver -geometry 1440x900 :9 -localhost # listen on 5909
vncserver -kill :9 # stop vnc
```

## **Reset password**

```bash
vncpasswd
```

## **Connect**

直接連到 VNC server： `{ip}:{port}` 但 VNC 連線沒有加密，非常不安全，安全的做法是透過 ssh tunnel

> 要直接連線記得先去防火牆設定打開 VPC 的 Port，但還是建議透過 ssh tunnel 去連線

```bash
ssh -NL 5901:localhost:5901 {user@vnc_server} {-p vnc_server_ssh_port} {-i ssh_key}
```

| 參數                  | 說明                                          |
| --------------------- | --------------------------------------------- |
| -N                    | 不執行遠端指令，僅做封包重新導向              |
| -L port:host:hostport | 設定本機的 port, 連到 host (主機)的 host port |

ssh tunnel建立後，可透過 `localhost:5901` 安全連線到vnc server

## VNC Client

### MAC

可用VNC Viewer連線

## 參考

- [Installing and configuring Ubuntu Desktop for Google Cloud Platform](https://subscription.packtpub.com/book/big-data-and-business-intelligence/9781788474221/1/ch01lvl1sec15/installing-and-configuring-ubuntu-desktop-for-google-cloud-platform)
- [Install and Configure the Ubuntu Desktop UI on Google Cloud Platform](https://educosta.dev/blog/install-and-configure-the-ubuntu-desktop-ui-on-google-cloud-platform/)
