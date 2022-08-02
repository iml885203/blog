---
title: 【SSH Tunnel】不需設定路由，打通NAT對外
date: 2022-07-29 17:48:35
tags:
- SSH Tunnel
---

只有要連上網路的電腦，透過打洞(SSH tunnel)，可以讓直接穿透NAT讓讓此電腦某個Port暴露在網路上

## 場景

- 無法設定對外的LEN端-電腦A
- 有對外IP的-電腦B (VPS)

## 目標

建立反向ssh tunnel直接`電腦B:某port`對應到`電腦A連的到的server:某port`

### 示意圖

![https://i.imgur.com/WWxyYsq.gif](https://i.imgur.com/WWxyYsq.gif)

## 反向ssh tunnel

### 電腦B設定GatewayPorts

不打開GatewayPorts的話做tunnel的話只有電腦B連的到該port，無法對外開放

```
# 打開ssh設定文件
vi /etc/ssh/sshd_config
# 找到GatewayPorts移除註解並設為yes
sudo service sshd restart

```

### 電腦A開始打穿

```
ssh -NfR 5555:localhost:5000 {電腦B_user@電腦B_IP} {-p 電腦B_ssh_port}

```

[Untitled](https://www.notion.so/e260be0fdd0d46aebcf99e22c7d9094f)

### B的5555 <---> 到A的5000

### 延伸: 透過A打穿到同LEN端的電腦C

假設電腦C開80且只有同LEN端的電腦A連的到

```
ssh -NfR 8888:{電腦C_LEN_IP}:80 {電腦B_user@電腦B_IP} {-p 電腦B_ssh_port}

```

### B的8888 <---ssh---> A <---http---> C的80

但由於B是入口A是中繼C是server，所以ABC這三台都不能關機

## 顯示/關閉 ssh tunnel

### B透過Listen port

```
sudo netstat -ntpl |grep ssh

```

找到PID用`kill {pid}`

### A透過process

```
ps -ef | head -1; ps -ef |grep "ssh -"

```

找到PID用`kill {pid}`

## Keep ssh session

`~/.ssh/config`

```
Host *
    ServerAliveInterval 300
    ServerAliveCountMax 2

```