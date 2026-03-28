---
title: "【SSH Tunnel】不需設定路由，打通NAT對外"
date: 2020-07-08 23:07:00
category: "🌐 網路"
tags:
  - "SSH Tunnel"
  - "NAT穿透"
  - "網路"
cover: "/images/covers/nat-tunnel.webp"
description: "只有要連上網路的電腦，透過打洞(SSH tunnel)，可以讓直接穿透NAT讓讓此電腦某個Port暴露在網路上"
---

只有要連上網路的電腦，透過打洞(SSH tunnel)，可以讓直接穿透NAT讓讓此電腦某個Port暴露在網路上
## 場景

- 無法設定對外的LEN端-電腦A
- 有對外IP的-電腦B (VPS)

## 目標

建立反向ssh tunnel直接`電腦B:某port`對應到`電腦A連的到的server:某port`

### 示意圖

!["SSH Tunnel"](/images/posts/nat-tunnel/ssh-tunnel.png)

## 反向ssh tunnel

需要先安裝ssh這邊就不多贅述

### 電腦B設定GatewayPorts

不打開GatewayPorts的話做tunnel的話只有電腦B連的到該port，無法對外開放

```
# 打開ssh設定文件
vi /etc/ssh/sshd_config
# 找到GatewayPorts移除註解並設為yes
sudo service sshd restart
```

### 電腦A建立反向tunnel

```
ssh -NfR 5555:localhost:5000 {電腦B_user@電腦B_IP} {-p 電腦B_ssh_port}
```

|參數|說明|
|-|-|
|-N|不執行遠端指令，僅做封包重新導向|
|-f|連線認證後，在背景執行|
|-R port:host:hostport|設定本機的 port, 連到 host (主機)的 host port|

建立連線後，從外部連到 `B的5555` 實際會連到 `A的5000`

> **Internet → B的5555 → A的5000**

成功讓處於封閉網路的A透過B達成對外暴露在網路上

---

## 延伸用法：透過A打穿到同LEN端的電腦C

假設電腦C開80且只有同LEN端的電腦A連的到

```
ssh -NfR 8888:{電腦C_LEN_IP}:80 {電腦B_user@電腦B_IP} {-p 電腦B_ssh_port}
```

> **B的8888 <-ssh-> A <-http-> C的80**
>

但由於B是入口、A是中繼、C是server，所以ABC這三台都不能關機

---

## 指令說明

### 關閉 ssh tunnel

由於ssh tunnel會於背景執行，需要透過 `netstat` 或是 `ps` 找出pid關閉

**B透過Listen port**

```
sudo netstat -ntpl |grep ssh
```

找到PID用`kill {pid}`

**A透過process**

```
ps -ef | head -1; ps -ef |grep "ssh -"
```

找到PID用`kill {pid}`
