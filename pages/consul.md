---
layout: default
title: Consul
permalink: /consul/
sitemap:
    priority: 0.7
    lastmod: 2017-05-03T00:00:00-00:00
---

# <i class="fa fa-bullseye"></i> Consul

## Consul概述

作為JHipster Registry的替代方案，您可以選擇使用Hashicorp的資料中心管理解決方案 [Consul](https://www.consul.io/)。
與Eureka相比，它具有許多優點：

- 在多節點群集中進行操作比在Eureka上容易。
- 與可用性相比，它更注重一致性，因此可以更快地傳播叢集狀態的變化。
- Consul服務發現可以透過其[DNS interface](https://www.consul.io/docs/agent/dns.html)或[HTTP API](https://www.consul.io/docs/agent/http.html)與現有應用程式進行互操作。

## 架構圖

<img src="{{ site.url }}/images/microservices_architecture_detail.003.png" alt="Diagram" style="width: 800; height: 600" class="img-responsive"/>

## 入門

開始開發依賴Consul registry的應用程式，可以在Docker容器中啟動Consul實例：

- 執行`docker-compose -f src/main/docker/consul.yml up`以在`dev`模式下啟動Consul伺服器。然後，Consul將在Docker主機的連接埠`8500`上可用，因此如果它在您的電腦上執行，​​則應位[http://127.0.0.1:8500/](http://127.0.0.1:8500/)。

您還可以使用[Docker Compose子產生器]({{ site.url }}/docker-compose/#docker-compose-subgen)為多個啟用consul的應用程式生成docker設定。

## 使用Consul進行應用程式設定

如果您在生成JHipster微服務或閘道器應用程式時選擇了Consul選項，則將自動設定它們以從Consul的**Key/Value儲存**中檢索其執行設定。

可以使用位於[http://localhost:8500/v1/kv/](http://localhost:8500/v1/kv/)上的UI或[REST API](https://www.consul.io/intro/getting-started/kv.html)來修改鍵/值（K/V）儲存。但是，以這種方式進行的更改是臨時的，在Consul伺服器/群集關閉時將丟失。
因此，為了幫助您輕鬆地與鍵/值儲存進行互動並以簡單的YAML檔案形式管理您的設定，JHipster團隊開發了一個小工具：[consul-config-loader](https://github.com/jhipster/consul-config-loader)。
從`consul.yml` docker-compose檔案啟動Consul時會自動設定**consul-config-loader**，但它也可以作為獨立工具執行。
它可以在兩種模式下執行：

- **dev**模式，其中將從`central-server-config`目錄中的YAML檔案自動載入到Consul中。此外，對該目錄的任何更改將立即與Consul同步。
- **prod**模式，使用Git2Consul來設定Git儲存庫中包含的YAML檔案，作為鍵/值儲存的設定源。

請注意，與JHipster Registry一樣，您的設定檔案將需要命名為`appname-profile.yml`，其中appname和profile與您要設定的服務的應用程式名稱和設定檔案相對應。例如，在`consulapp-prod.yml`檔案中新增屬性將僅對以`prod`概要檔案開頭的名為`consulapp`的應用程式設定這些屬性。此外，將為所有應用程式設定`application.yml`中定義的屬性。
