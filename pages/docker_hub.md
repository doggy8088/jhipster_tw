---
layout: default
title: Docker Hub
permalink: /docker-hub/
redirect_from:
  - /docker_hub.html
sitemap:
    priority: 0.7
    lastmod: 2016-09-25T00:00:00-00:00
---

# <i class="fa fa-cloud-upload"></i> Docker Hub

## 概要

[![]({{ site.url }}/images/logo/docker-hub.png)](https://hub.docker.com/u/jhipster/)

JHipster在Docker Hub擁有自己的[organization]，並提供不同的Docker映象。

[jhipster-docker-hub]專案提供所有docker-compose檔案，可以啟動這些映象。
要使用docker-compose指令，您必須：

- 克隆專案: `git clone https://github.com/jhipster/jhipster-docker-hub`
- 進入專案: `cd jhipster-docker-hub`


<div class="alert alert-warning"><i>注意: </i>

根據您的作業系統，您的<code>DOCKER_HOST</code>將有所不同。
在Linux上，它將是您的<code>localhost</code>。對於Mac/Windows，必須使用以下指令獲取IP：<code>docker-machine ip default</code>

</div>


## [jhipster/jhipster](https://hub.docker.com/r/jhipster/jhipster) : JHipster的備選安裝

有關完整說明，請參見[安裝]({{ site.url }}/installation/)頁面。

以下這些指令可以在特定的用例中使用。

### 使用最新版本的JHipster

使用最新版本，在當前資料夾中啟動`jhipster`

```
docker container run --rm -it -v "$PWD":/home/jhipster/app jhipster/jhipster jhipster
```

### 使用JHipster v3.0.0

使用老版本，在當前資料夾中啟動`jhipster`

```
docker container run --rm -it -v "$PWD":/home/jhipster/app jhipster/jhipster:v3.0.0 jhipster
```

您可以在[此處](https://hub.docker.com/r/jhipster/jhipster/tags/)檢視所有可用容器標籤

## [jhipster/jdl-studio](https://hub.docker.com/r/jhipster/jdl-studio) : 離線JDL-Studio

您可以離線使用JDL-Studio，透過[http://localhost:18080](http://localhost:18080)對其進行訪問

```
docker container run -d -p 18080:80 jhipster/jdl-studio
```

## [jhipster/jhipster-sample-app](https://hub.docker.com/r/jhipster/jhipster-sample-app)

它是帶有H2或MySQL的範例應用程式。

### 快速啟動

在開發設定檔案中直接使用Docker直接執行一個jhipster應用程式

```
docker container run -d -p 8080:8080 -e SPRING_PROFILES_ACTIVE=dev jhipster/jhipster-sample-app
```

然後，您可以透過[http://localhost:8080](http://localhost:8080)訪問該應用程式

### 開發設定

使用開發設定檔案執行應用程式

```
docker-compose -f jhipster-sample-app/dev.yml up
```

### 生產設定

使用生產設定檔案執行應用程式, 使用MySQL資料庫

```
docker-compose -f jhipster-sample-app/prod.yml up
```

### 生產設定和使用ELK Stack進行監控

使用生產設定檔案執行應用程式, 並使用MySQL資料庫和ELK Stack

```
docker-compose -f jhipster-sample-app/prod-elk.yml up
```

訪問正在執行的應用程式 [http://localhost:8080](http://localhost:8080)

訪問Kibana儀表板 [http://localhost:5601](http://localhost:5601)

## [jhipster/jhipster-sample-app-elasticsearch](https://hub.docker.com/r/jhipster/jhipster-sample-app-elasticsearch)

使用MySQL和Elasticsearch的範例應用程式。

### 開發設定

使用開發設定檔案執行應用程式

```
docker-compose -f jhipster-sample-app-elasticsearch/dev.yml up
```

### 生產設定

使用生產設定檔案執行應用程式, 並使用MySQL資料庫和Elasticsearch

```
docker-compose -f jhipster-sample-app-elasticsearch/prod.yml up
```

## [jhipster/jhipster-sample-app-mongodb](https://hub.docker.com/r/jhipster/jhipster-sample-app-mongodb)

使用MongoDB的範例應用程式。

### 生產設定

使用生產設定檔案執行應用程式, 並使用MongoDB資料庫

```
docker-compose -f jhipster-sample-app-mongodb/prod.yml up
```


## [jhipster/jhipster-sample-app-cassandra](https://hub.docker.com/r/jhipster/jhipster-sample-app-cassandra)

使用Cassandra叢集的範例應用程式

### 生產設定

使用生產設定檔案執行應用程式, 並使用Cassandra叢集


```
docker-compose -f jhipster-sample-app-cassandra/prod.yml up
```

擴充套件Cassandra節點

```
docker-compose -f jhipster-sample-app-cassandra/prod.yml scale sample-cassandra-node=2
```

[organization]: https://hub.docker.com/u/jhipster/
[jhipster-docker-hub]: https://github.com/jhipster/jhipster-docker-hub


## 微服務架構

這裡使用的映象如下：

- [jhipster/jhipster-registry](https://hub.docker.com/r/jhipster/jhipster-registry)
- [jhipster/jhipster-sample-app-gateway](https://hub.docker.com/r/jhipster/jhipster-sample-app-gateway)
- [jhipster/jhipster-sample-app-microservice](https://hub.docker.com/r/jhipster/jhipster-sample-app-microservice)

### 生產設定

在生產設定檔案中執行完整架構

```
docker-compose -f jhipster-sample-microservices/prod/prod.yml up
```

它將啟動：

- JHipster Registry
- 閘道器
- MySQL資料庫
- 微服務
- PostgreSQL資料庫


擴充套件微服務

```
docker-compose -f jhipster-sample-microservices/prod/prod.yml scale jhipstersamplemicroservice-app=2
```

### 生產設定和使用ELK Stack進行監控

在生產設定檔案中執行完整架構, 使用ELK堆疊

```
docker-compose -f jhipster-sample-microservices/prod-elk/prod-elk.yml up
```

擴充套件微服務

```
docker-compose -f jhipster-sample-microservices/prod-elk/prod-elk.yml scale jhipstersamplemicroservice-app=2
```

訪問註冊中心: [http://localhost:8761](http://localhost:8761)

訪問閘道器: [http://localhost:8080](http://localhost:8080)

訪問Kibana儀表板: [http://localhost:5601](http://localhost:5601)
