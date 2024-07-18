---
layout: default
title: 使用Cassandra
permalink: /using-cassandra/
redirect_from:
  - /using_cassandra.html
sitemap:
    priority: 0.7
    lastmod: 2015-02-24T00:00:00-00:00
---

# <i class="fa fa-eye"></i> 使用Cassandra

Cassandra是生成應用程式時可以選擇的受支援資料庫之一。

此生成器有一個限制：

*   它不支援OAuth2身份驗證（我們需要在Spring Security的OAuth2伺服器上實現一個Cassandra後端）

選擇Cassandra時：

*   使用Apache Cassandra的Spring Data Reactive
*   [實體子產生器]({{ site.url }}/creating-an-entity/)不會詢問您實體關係，因為您無法在NoSQL資料庫建立關係（至少不會在JPA建立關係）
*   生成的實體僅支援一個分割槽key，即ID。未來版本將提供複合主鍵和群集鍵

## 遷移工具

與[Liquibase](http://www.liquibase.org/)相似，JHipster提供了一個工具來應用CQL遷移指令碼，但有一些限制：

*   該工具在啟動時不會由應用程式本身執行，而是在Docker容器內或手動執行
*   所有CQL指令碼都必須遵循`{timestamp}_{description}.cql`模式，並放置在changelog目錄中：`src/main/resources/config/cql/changelog/`
*   位於changelog目錄中的所有尚未應用的指令碼均按字母順序應用（即：遵循時間戳記）
*   由於Cassandra不是事務資料庫，因此如果在將元資料插入該工具使用的表中之前發生錯誤，則有可能使CQL遷移指令碼多次執行

該工具的一些訊息：

*   生成實體後，其CQL檔案將在`src/main/resources/config/cql/changelog/`中生成，就像我們為JPA生成Liquibase更改日誌一樣
*   對於正在執行的測試，`src/main/resources/config/cql/changelog/`目錄中的所有CQL指令碼都會自動應用於記憶體叢集
    *   意味著除了將指令碼放到changelog目錄中以將其應用於測試之外，您無需執行任何其他操作
*   該工具使用自己的cassandra表`schema_version`儲存元資料訊息

該工具將按以下順序應用`src/main/resources/config/cql/`中的遷移指令碼：

1.  `create-keyspace.cql`-建立鍵空間和`schema_version`表儲存遷移元資料
2.  按字母順序排列的所有`cql/changelog/\*.cql`檔案

### 執行工具

根據是否使用Docker，您有幾種選擇來執行遷移工具。

#### 使用Docker：

如果使用生成的`app.yml`或`cassandra.yml` compose檔案，透過docker-compose啟動了Cassandra叢集，則該工具已經執行，並且已應用所有cql指令碼。

在changelog目錄中新增CQL指令碼之後，您可以重新啟動負責再次執行遷移服務的docker-service而不停止叢集：
`docker-compose -f src/main/docker/cassandra.yml up <app>-cassandra-migration`

#### 手動:

確認一些先決條件後，您可以手動執行該工具。熟悉該工具，在以後將其包含在部署pipeline中可能會很有用。

##### 先決條件:

*   新增Cassandra訪問點環境變數，通常在本地新增：``export CASSANDRA_CONTACT_POINT=`127.0.0.1` ``
*   使用您喜歡的軟體套件管理器安裝最新（> 4）bash版本和md5sum
*   在您的類路徑中有CQLSH

要執行該工具，請使用此指令： `src/main/docker/cassandra/scripts/autoMigrate.sh src/main/resources/config/cql/changelog/`

預設情況下，`src/main/resources/config/create-keyspace.cql`在必要時使用指令碼建立鍵空間。
您可以使用第二個引數覆蓋它：`src/main/docker/cassandra/scripts/autoMigrate.sh src/main/resources/config/cql/changelog/ create-keyspace-prod.cql`

如果只想針對叢集執行特定的指令碼，請使用：`src/main/docker/cassandra/scripts/execute-cql.sh src/main/resources/config/cql/changelog/<your script>.cql`

## 非Linux作業系統上的Cassandra和Docker

在Mac OSx和Windows上，不是直接託管Docker容器，而是在VirtualBox VM上託管。
這些，您不能在localhost中訪問它們，而必須使用VirtualBox IP。

您可以使用以下環境變數覆蓋Cassandra連訪問點（預設情況下為localhost）：``export SPRING_DATA_CASSANDRA_CONTACTPOINTS=`docker-machine ip default` ``。

#### Cassandra節點：

由於Cassandra節點也託管在虛擬機中，因此在從訪問點接收到它們的地址後，嘗試連線它們時，Cassandra Java驅動程式將收到錯誤訊息。

要解決此問題，可以將路由規則新增到路由表[(source)](http://krasserm.github.io/2015/07/13/chaos-testing-with-docker-and-cassandra/#port-mapping)中。

假設執行Cassandra節點的容器的IP地址為172.18.0.x：
``sudo route -n add 172.18.0.0/16 `docker-machine ip default` ``
