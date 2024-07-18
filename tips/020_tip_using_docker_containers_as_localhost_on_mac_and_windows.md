---
layout: default
title: 在Mac/Windows上將Docker容器用作localhost
sitemap:
priority: 0.5
lastmod: 2016-11-15T16:00:00-00:00
---

# 在Mac/Windows上將Docker容器用作localhost

__送出者 [@Akuka](https://github.com/Akuka)__

## Linux上的Docker和Mac/Windows環境上的Docker之間的區別

根據您的作業系統，您的<code>DOCKER_HOST</code>是不同的。
在Linux上，它將只是您的本地主機。
對於Mac/Windows，應使用以下指令獲取適當的IP：

```
docker-machine ip default
```

## 動機

生成新的JHipster應用程式時，所有連線設定的主機地址（例如：資料庫連線字串）預設情況下為localhost。
這意味著，如果您使用Docker執行服務（例如資料庫/搜尋/SMTP伺服器等），則需要編輯應用程式設定檔案，並將資料庫IP地址從localhost替換為<code>DOCKER_HOST</code>。

## 轉發連接埠

Docker Machine是在您主機中VirtualBox下執行的虛擬機。
我們可以使用VirtualBox的連接埠轉發功能來以本地主機的身份訪問Docker VM。

為此，請執行以下操作：


首先，透過執行以下指令確保您的Docker Machine已停止：

```
docker-machine stop default     # Your Docker machine name may not be default, in this case change the name accordingly
```

然後：

* 開啟VirtualBox Manager
* 選擇您的Docker Machine VirtualBox映像（例如：default）
* 開啟設定->網路->高階->連接埠轉發
* 新增您的應用名稱，所需的主機連接埠和您的訪客連接埠

以下是帶有MySQL連接埠轉發範例的螢幕截圖：

![MySQL Port Forwarding Example](../images/020_tip_using_docker_containers_as_localhost_on_mac_and_windows_01.png)


現在您可以透過執行以下操作來啟動Docker Machine：

```
docker-machine start default
eval $(docker-machine env default)
```

然後只需啟動您的Docker容器，您就可以透過localhost訪問它。