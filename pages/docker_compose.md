---
layout: default
title: Docker和Docker Compose
permalink: /docker-compose/
redirect_from:
  - /docker_compose.html
sitemap:
    priority: 0.7
    lastmod: 2016-12-01T00:00:00-00:00
---

# <i class="fa fa-music"></i> Docker和Docker Compose

## 摘要

在開發中強烈建議使用Docker和Docker Compose，這在生產中也是很好的解決方案。

1. [描述](#1)
2. [先決條件](#2)
3. [建立應用程式的Docker映象](#3)
4. [為多個應用程式生成自定義Docker-Compose設定](#docker-compose-subgen)
5. [使用資料庫](#4)
6. [Elasticsearch](#5)
7. [Sonar](#6)
7. [Keycloak](#7)
8. [常用指令](#8)
9. [記憶體調整](#9)

## <a name="1"></a> 描述

_請注意：此Docker設定是用於在容器映象中執行您生成的應用程式。它與JHipster提供的[Docker設定]({{ site.url }}/installation/)完全不同，後者主要用於在容器內執行JHipster產生器_


JHipster提供了完整的Docker支援，以便：

- 加速開發，因為即使使用複雜的微服務架構，您可以使用單個指令啟動完整的基礎架構，
- 對於使用Docker Swarm的使用者，因為它與Docker Compose使用相同的設定，所以可以直接部署到生產中

使用Docker Compose的一個重要優點是，您可以使用`docker-compose scale`指令伸縮容器數目。如果您將JHipster與[微服務架構](#3)一起使用，這將非常有益。

自動生成應用程式時，JHipster會為您生成：

- 用於建立Docker映象並在容器內執行應用程式的`Dockerfile`
- 多個幫助您的第三方服務（例如資料庫）快速執行的Docker Compose設定檔案

這些檔案位於資料夾`src/main/docker/`中。

## <a name="2"></a> 先決條件

您必須安裝Docker和Docker Compose：

- [Docker](https://docs.docker.com/installation/#installation)
- [Docker Compose](https://docs.docker.com/compose/install)

現在需要在Docker商店中建立一個帳戶來下載Docker for Mac和Docker for Windows。讓我們繞過這個限制

<div class="alert alert-info"><i>提示: </i>

在Windows和Mac OS X上，Kitematic是Docker Toolbox附帶易於使用的圖形界面，這將使Docker的使用變得更加容易。

</div>

<div class="alert alert-warning"><i>注意: </i>

如果在Mac或Windows上使用Docker Machine，則Docker守護程式對OS X或Windows檔案系統僅具有有限的訪問許可權。Docker Machine嘗試自動共享您的"/Users"（OS X）或"C\Users\[使用者名]"（Windows）目錄。因此，您必須在這些目錄下建立專案資料夾，避免因為卷掛載導致的任何問題。

</div>


安裝JHipster UML（或任何未捆綁的軟體套件）時如果遇到`npm ERR! Error: EACCES: permission denied`，可能您的容器未安裝`sudo`（例如：sudo未與Ubuntu Xenial未捆綁安裝）。

__解決方案1__

NPM文件建議不要以root使用者身份安裝任何NPM軟體套件。請按照[官方文件](https://docs.npmjs.com/getting-started/fixing-npm-permissions)解決。

__解決方案2__

  - `docker container exec -u root -it jhipster bash`,
  - `npm install -g YOUR_PACKAGE`,
  - 然後退出並正常登入容器: `docker container exec -it jhipster bash`

## <a name="3"></a> 建立應用程式的Docker映象

要使用[Jib](https://github.com/GoogleContainerTools/jib)連線到本地Docker守護程式建立應用程式的Docker映象，請執行以下操作：

- 使用Maven, 輸入: `./mvnw package -Pprod verify jib:dockerBuild`
- 使用Gradle, 輸入: `./gradlew -Pprod bootJar jibDockerBuild`

在沒有Docker的情況下建立應用程式的Docker映象並將其直接推送到Docker倉庫中，請執行：

- 使用Maven, 輸入:: `./mvnw package -Pprod verify jib:build`
- 使用Gradle, 輸入: `./gradlew -Pprod bootJar jib`

如果您無法正常使用，請參考Jib文件以獲取設定詳細訊息，特別是有關如何設定對Docker倉庫的身份驗證的指引：

- [Jib maven外掛文件](https://github.com/GoogleContainerTools/jib/tree/master/jib-maven-plugin#configuration)
- [Jib gradle外掛文件](https://github.com/GoogleContainerTools/jib/tree/master/jib-gradle-plugin#configuration)

<div id="3-warning" class="alert alert-warning"><i>注意: </i>
<p>
由於Jib的工作方式，它將首先嘗試從設定的Docker倉庫中拉取Docker基礎映象的最新版本。這樣操作是有原因的，因為在CI環境中，您必須確保始終在最新的基礎映象之上建立自己的映象。
</p>
<p>
但是，在本地環境中，如果Jib無法訪問Docker倉庫，則這可能會使您的建立失敗。一種解決方法是使用`--offline`標識，只要Jib已經將Docker基本映象拉取到其本地快取中，該問題便會迎刃而解。
</p>
<p>
使用Maven，輸入：<pre>./mvnw -Pprod package verify jib:dockerBuild --offline</pre>
使用Gradle，輸入：<pre>./gradlew -Pprod bootJar jibDockerBuild --offline</pre>
</p>
<p>
請注意，jib當前無法從Docker守護程式中提取本地Docker映象。在[GoogleContainerTools/jib/issues/1468]（https://github.com/GoogleContainerTools/jib/issues/1468）上可以跟蹤該問題的進展。
</p>
</div>

要執行此映象，請使用位於應用的`src/main/docker`資料夾中的Docker Compose設定：

- `docker-compose -f src/main/docker/app.yml up`

此指令將啟動您的應用程式及其依賴的服務（資料庫，搜尋引擎，JHipster Registry…）。

如果您選擇OAuth 2.0進行身份驗證，請務必閱讀本文件中的[Keycloak](#7)部分。

## <a name="docker-compose-subgen"></a> 為多個應用程式生成自定義Docker-Compose設定

如果您的架構由多個JHipster應用程式組成，則可以使用特定的`docker-compose`子產生器，該產生器將為所有選定的應用程式生成一體的Docker Compose設定。這樣一來，您便可以部署和擴充套件完整的體系結構。

要使用docker-compose子產生器，請執行以下操作：

- 您需要將所有的monolith應用，閘道器和微服務放在同一目錄中。
- 建立另一個新目錄, 例如 `mkdir docker-compose`.
- 進入目錄: `cd docker-compose`.
- 執行子產生器: `jhipster docker-compose`.
- 子產生器將詢問您要在架構中使用哪個應用程式，以及是否要使用ELK或Prometheus設定系統監控。

這將生成一個全域的Docker Compose設定，輸入`docker-compose up`來執行它，所有服務將會立即執行。

對於微服務架構，此設定還將預設定了JHipster Registry或Consul，這將自動設定您的服務：
- 這些服務將等待JHipster Registry（或Consul）正常工作之後執行。可以在`bootstrap-prod.yml`檔案設定`spring.cloud[.consul].config.fail-fast`和`spring.cloud[.consul].config.retry`設定。
- JHipster Registry或Consul將設定您的應用程式，例如: 在所有服務之間共享JWT Token。
- 使用Docker Compose來完成每個服務的擴充套件，例如，輸入`docker-compose scale test-app=4`可以執行4個"test"應用程式實例。這些實例將由閘道器自動進行負載均衡，並將自動加入相同的Hazelcast群集（如果Hazelcast是您的Hibernate 2級快取）。

## <a name="4"></a> 使用資料庫

### MySQL, MariaDB, PostgreSQL, Oracle, MongoDB, Couchbase, Neo4j或Cassandra

執行`docker-compose -f src/main/docker/app.yml up`將會自動啟動資料庫。

如果您只想啟動資料庫，而不包括其他服務，請使用專用的資料庫Docker Compose設定：

- 使用MySQL: `docker-compose -f src/main/docker/mysql.yml up`
- 使用MariaDB: `docker-compose -f src/main/docker/mariadb.yml up`
- 使用PostgreSQL: `docker-compose -f src/main/docker/postgresql.yml up`
- 使用Oracle: `docker-compose -f src/main/docker/oracle.yml up`
- 使用MongoDB: `docker-compose -f src/main/docker/mongodb.yml up`
- 使用Cassandra: `docker-compose -f src/main/docker/cassandra.yml up`
- 使用Couchbase: `docker-compose -f src/main/docker/couchbase.yml up`
- 使用Neo4j: `docker-compose -f src/main/docker/neo4j.yml up`

### MongoDB叢集模式

如果需要使用MongoDB的副本集或者分片功能，並在服務間共享設定，則需要手動建立和設定MongoDB映象。請按照以下步驟操作：

- 建立映象: `docker-compose -f src/main/docker/mongodb-cluster.yml build`
- 執行資料庫: `docker-compose -f src/main/docker/mongodb-cluster.yml up -d`
- 擴充套件MongoDB節點服務（您必須選擇奇數個節點）: `docker-compose -f src/main/docker/mongodb-cluster.yml scale <name_of_your_app>-mongodb-node=<X>`
- 初始化mongo設定服務器的副本: `docker exec -it <name_of_your_app>-mongodb-config mongo  --port 27019 --eval 'rs.initiate();'`
- 初始化副本集（引數X是您在上一步中輸入的節點數，資料夾是YML檔案所在的資料夾，預設情況下為`docker`）： `docker container exec -it <yml_folder_name>_<name_of_your_app>-mongodb-node_1 mongo --port 27018 --eval 'var param=<X>, folder="<yml_folder_name>"' init_replicaset.js`
- 初始化分片： `docker container exec -it <yml_folder_name>_<name_of_your_app>-mongodb_1 mongo --eval 'sh.addShard("rs1/<yml_folder_name>_<name_of_your_app>-mongodb-node_1:27018")'`
- 建立應用程式的Docker映象： `./mvnw -Pprod clean verify jib:dockerBuild`或`./gradlew -Pprod clean bootJar jibDockerBuild`
- 啟動應用：`docker-compose -f src/main/docker/app.yml up -d <name_of_your_app>-app`

如果要新增或刪除一些MongoDB節點，重複步驟3和4。

### Couchbase叢集模式

如果需要在多個節點上使用Couchbase，則需要手動建立和設定Couchbase映象。請按照以下步驟操作：

- 建立映象：`docker-compose -f src/main/docker/couchbase-cluster.yml build`
- 執行資料庫：`docker-compose -f src/main/docker/couchbase-cluster.yml up -d`
- 擴充套件Couchbase節點服務（您必須選擇奇數個節點）：`docker-compose -f src/main/docker/couchbase-cluster.yml scale <name_of_your_app>-couchbase-node=<X>`
- 建立應用程式的Docker映象：`./mvnw -Pprod clean verify jib:dockerBuild` or `./gradlew -Pprod clean bootJar jibDockerBuild`
- 啟動應用：`docker-compose -f src/main/docker/app.yml up -d <name_of_your_app>-app`

### Cassandra

與其他資料庫中模式遷移是由應用程式本身實施不同，Cassandra模式遷移是由專用的Docker容器實施的。

#### <a name="cassandra-in-development"></a>開發環境使用Cassandra
要啟動Cassandra叢集用於本地執行應用，可以將此docker_compose檔案用於開發：`docker-compose -f src/main/docker/cassandra.yml up -d`

Docker-compose將啟動2個服務：

- `<name_of_your_app>-cassandra`: 具有Cassandra服務節點的容器
- `<name_of_your_app>-cassandra-migration`: 自動應用所有CQL遷移指令碼（建立鍵空間，建立表，所有資料遷移等）的容器

有關如何在不重新啟動本地叢集的情況下新增新的CQL指令碼的更多訊息，請參見[Cassandra頁面]({{ site.url }}/using-cassandra/)。

#### 生產環境使用Cassandra：:

`app.yml`docker-compose檔案使用 `cassandra-cluster.yml` 設定Cassandra叢集。

應用程式會延遲幾秒啟動（依賴 _JHIPSTER_SLEEP_ 變數設定），為Cassandra叢集啟動和實施遷移提供時間。

Cassandra與其他資料庫之間的最大區別是，您可以使用Docker Compose工具來動態擴充套件叢集。要想在叢集中執行X+1個節點，請執行：

- `docker-compose -f src/main/docker/cassandra-cluster.yml scale <name_of_your_app>-cassandra-node=X`

### Microsoft SQL Server

如果要將MSSQL Docker映象與JHipster一起使用，請遵循以下幾個步驟：

- 將Docker可用的RAM增加到至少3.25GB
- 執行資料庫: `docker-compose -f src/main/docker/mssql.yml up -d`
- 使用您的MSSQL用戶端建立資料庫
- 啟動您的應用: `docker-compose -f src/main/docker/app.yml up -d <name_of_your_app>-app`

## <a name="5"></a> Elasticsearch

執行 `docker-compose -f src/main/docker/app.yml up`指令將已經自動啟動您的搜尋引擎。

如果您只想啟動Elasticsearch節點，不包括其他服務，請使用其特定的Docker Compose設定：

- `docker-compose -f src/main/docker/elasticsearch.yml up`

## <a name="6"></a> Sonar

Jhipster已經生成了一個執行Sonar的Docker Compose設定：

- `docker-compose -f src/main/docker/sonar.yml up`

要分析您的程式碼，請在您的專案上執行Sonar：

- 使用Maven: `./mvnw initialize sonar:sonar`
- 使用Gradle: `./gradlew sonar`

Sonar生成的報告在這個位置可以獲取：[http://localhost:9000](http://localhost:9000)

## <a name="7"></a> Keycloak

如果您選擇OAuth 2.0作為身份驗證，則Keycloak將用作預設驗證提供者。執行`docker-compose -f src/main/docker/app.yml up`會自動啟動Keycloak。

要使Keycloak正常工作，您需要在主機檔案中新增以下行（在Mac/Linux中為`/etc/hosts`，在Windows中為`c:\Windows\System32\Drivers\etc\hosts`）。

```
127.0.0.1	keycloak
```

這是因為在您電腦的瀏覽器會以本地地址來（localhost或`127.0.0.1`）訪問應用程式，但是在Docker內部會以容器名來（名稱為`keycloak`）訪問。

如果您只想啟動Keycloak，而不是其他服務，請使用其特定的Docker Compose設定：

- `docker-compose -f src/main/docker/keycloak.yml up`

## <a name="8"></a> 常用指令

### 檢視容器清單

您可以使用`docker container ps -a`列出所有容器

    $ docker container ps -a
    CONTAINER ID        IMAGE               COMMAND                  CREATED             STATUS              PORTS                    NAMES
    fc35e1090021        mysql               "/entrypoint.sh mysql"   4 seconds ago       Up 4 seconds        0.0.0.0:3306->3306/tcp   sampleApplication-mysql

### Docker容器統計訊息
`docker container stats`或者{% raw %}`docker container stats $(docker container ps --format={{.Names}})`{% endraw %}列出所有正在執行容器的CPU，記憶體，網路I/O和區塊I/O統計訊息。

    $ docker container stats {% raw %}$(docker container ps --format={{.Names}}){% endraw %}
    CONTAINER                 CPU %               MEM USAGE / LIMIT     MEM %               NET I/O               BLOCK I/O             PIDS
    jhips-mysql               0.04%               221 MB / 7.966 GB     2.77%               66.69 kB / 36.78 kB   8.802 MB / 302.5 MB   37
    00compose_msmongo-app_1   0.09%               965.6 MB / 7.966 GB   12.12%              121.3 kB / 54.64 kB   89.84 MB / 14.88 MB   35
    00compose_gateway-app_1   0.39%               1.106 GB / 7.966 GB   13.89%              227.5 kB / 484 kB     117 MB / 28.84 MB     92
    jhipster-registry         0.74%               1.018 GB / 7.966 GB   12.78%              120.2 kB / 126.4 kB   91.12 MB / 139.3 kB   63
    gateway-elasticsearch     0.27%               249.1 MB / 7.966 GB   3.13%               42.57 kB / 21.33 kB   48.16 MB / 4.096 kB   58
    00compose_jhips-app_1     0.29%               1.042 GB / 7.966 GB   13.08%              101.8 kB / 78.84 kB   70.08 MB / 13.5 MB    68
    msmongo-mongodb           0.34%               44.8 MB / 7.966 GB    0.56%               49.72 kB / 48.08 kB   33.97 MB / 811 kB     18
    gateway-mysql             0.03%               202.7 MB / 7.966 GB   2.54%               60.84 kB / 31.22 kB   27.03 MB / 297 MB     37

### 伸縮容器

執行 `docker-compose scale test-app=4` 指令來執行4個 "test" 實例.

### 停止容器

`docker-compose -f src/main/docker/app.yml stop`

您也可以直接使用Docker：

`docker container stop <container_id>`

除非刪除容器，停止容器時不會刪除資料。

### 刪除容器

小心！所有資料將被刪除：

`docker container rm <container_id>`


## <a name="9"></a> 記憶體調整

為了最佳化容器中執行的應用程式的記憶體使用，您可以在`Dockerfile`或`docker-compose.yml`上設定Java記憶體引數

### 向Dockerfile新增記憶體引數

設定環境變數。

    ENV JAVA_OPTS=-Xmx512m -Xms256m

### 將記憶體引數新增到docker-compose.yml

Dockerfile需要此解決方案。這樣，您就可以在組成應用程式的所有容器上為記憶體設定設定一個控制點。

將`JAVA_OPTS`新增到`environment`部分。

```
    environment:
      - (...)
      - JAVA_OPTS=-Xmx512m -Xms256m
```

由於Docker底層映象影響，`JAVA_OPTS`將不起作用。在這種情況下，請嘗試使用`_JAVA_OPTIONS`代替：

```
    environment:
      - (...)
      - _JAVA_OPTIONS=-Xmx512m -Xms256m
```
