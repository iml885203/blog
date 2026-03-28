---
title: '為什麼 OrbStack 可以比 Docker Desktop 還快'
date: 2023-04-27 17:36:14
category: '🧰️ 我的工具箱'
tags:
  - 'MacOS'
  - 'Docker'
  - '工具'
cover: '/images/covers/why-orbstack-faster-than-docker-desktop.webp'
description: '最近，我的同事分享了一個酷東西：[OrbStack](https://orbstack.dev/)。 這個工具號稱是 Docker Desktop 的替代品，使用起來更快、更輕量、更簡單。當我第一次聽到這個消息時，我心裡想著：底層都是透過 Docker Engine 執行 Docker，為什麼 OrbStack 可以比較快呢？ 但是，當我去了解之後，才發現我對於 Docker 在 MacOS 上的認知有些落差。'
---

最近，我的同事分享了一個酷東西：[OrbStack](https://orbstack.dev/)。

這個工具號稱是 Docker Desktop 的替代品，使用起來更快、更輕量、更簡單。當我第一次聽到這個消息時，我心裡想著：底層都是透過 Docker Engine 執行 Docker，為什麼 OrbStack 可以比較快呢？

但是，當我去了解之後，才發現我對於 Docker 在 MacOS 上的認知有些落差。

## Docker on MacOS

### 認知落差1 - 原來 Docker Engine on MacOS 是執行在虛擬機上

在 MacOS 上，Docker Engine 是透過虛擬機來執行的。這是由於 MacOS 使用的是 Darwin 內核，而 Docker Engine 需要在 Linux 內核上運行，因此在 MacOS 上執行 Docker Engine 需要透過虛擬機。

Docker Desktop 使用的是 HyperKit 虛擬化技術來運作 Docker Engine，HyperKit 與 VirtualBox 或 VMWare 類似，只是 HyperKit 是專門為 Docker 工作負載訂製的。

### 認知落差2 - Docker Engine 可以裝多個，且可以透過指令切換

早期，MacOS 可以直接安裝 Docker Engine 而不需要透過 Docker Desktop。現在官方只提供 Docker Desktop，唯一的不同點是它們使用不同的 Context。

Docker Context 允許您設置一個遠端 Docker 環境作為默認環境，以便在遠端 Docker 主機上運行 Docker 命令。

您可以使用以下指令來查看當前的 Context：

```php
docker context list
```

如果您是透過 Docker Desktop 安裝的 Docker Engine，您將看到一個名為 `desktop-linux`
 的 context。

如果您安裝了多個 Docker Engine，您可以使用 context 指令來切換 Docker 環境，而 image、container 等都是在 Docker 環境之下運行的。

## OrbStack 為什麼可以比 Docker Desktop 還快

OrbStack 使用一種輕量級的 Linux 虛擬機，這種虛擬機具有共享內核，類似於 WSL2（Linux 的 Windows 子系統）。

因此，OrbStack 可以比 Docker Desktop 更快，這是由於它使用了一套自己的虛擬化技術，而非使用 HyperKit。這種虛擬化技術可以減少開銷並節省資源，從而提高性能。

### 是免費的嗎？

在測試期間，OrbStack 可以完全免費使用。不過，之後它將成為一個付費商品。

## 虛擬機的差異(OrbStack vs HyperKit)

由於 OrbStack 與 WSL2 類似，因此下表請 AI 整理了 WSL2 和 HyperKit 的虛擬化差異：

|          | WSL2                                                                    | HyperKit                                                                               |
| -------- | ----------------------------------------------------------------------- | -------------------------------------------------------------------------------------- |
| 系統架構 | 在主機內核上直接運行 Linux 內核                                         | 是在 macOS 上運行的虛擬化引擎，可以運行 Docker 容器                                    |
| 性能     | 具有更好的性能，因爲他直接執行 Linux 內核，並與主機操作系統共享硬體資源 | 具有較低的性能開銷，因爲他是一種輕量級的虛擬化引擎，可以直接訪問主機操作系統的硬體資源 |

## 結語

在 MacOS 上，Docker 受限於仍然需要透過虛擬機來運行，速度上仍然不如在 Linux 上運行。

使用 OrbStack 可能會比較節省資源，如果只是輕量使用，可能使用 Docker Desktop 或 OrbStack 都一樣，剩下的就是看哪個應用程式介面使用上更順手了。

## 參考資料

- [Frequently asked questions for Mac](https://docs.docker.com/desktop/faqs/macfaqs/)
- [OrbStack - Architecture](https://docs.orbstack.dev/architecture#architecture)
