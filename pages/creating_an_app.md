---
layout: default
title:  建立一個應用程式
permalink: /creating-an-app/
redirect_from:
  - /creating_an_app.html
sitemap:
    priority: 0.7
    lastmod: 2018-03-18T18:20:00-00:00  
---

# <i class="fa fa-rocket"></i> 建立一個應用程式

_**請檢視有關建立新JHipster應用程式的 [影片教程]({{ site.url }}/video-tutorial/)！**_

1. [快速開始](#1)
2. [生成應用程式時可能遇到的問題](#2)
3. [使用藍圖](#5)
4. [指令行選項](#3)
5. [提示](#4)

## <a name="1"></a> 快速開始

首先，建立一個生產應用程式的空目錄：

`mkdir myapplication`

轉到該目錄：

`cd myapplication/`

要生成您的應用程式，請輸入：

`jhipster`

回答產生器提出的問題，以建立符合您需求的應用程式。[下一節](#2)將詳細介紹這些選項。

生成應用程式後，您可以使用Maven（在Linux/MacOS/Windows PowerShell上為`./mvnw`，在Windows Cmd上為`mvnw`）或Gradle（在Linux/MacOS/Windows PowerShell上為`./gradlew`，在Windows Cmd上為`gradlew`）啟動它。

**注意**如果您是在第一次執行`./mvnw`指令後使用Maven並更改了前端檔案，則必須執行`./mvnw -Pwebapp`才能檢視最新的前端版本（Gradle會檢測到前端更改，自動並在需要時重新編譯前端）。

該應用程式將在[http://localhost:8080](http://localhost:8080)可以訪問

重要的是，如果需要實時重新載入JavaScript/TypeScript程式碼，則需要執行`npm start`或`yarn start`。您可以轉到[在開發環境使用JHipster]({{ site.url }}/development/)頁面以獲取更多訊息。

如果您使用`實時重新載入`，則可以透過`./mvnw -P-webapp`或`./gradlew -x webapp`排除用戶端任務來加快伺服器啟動速度。 它特別加快了Gradle的速度。

## <a name="2"></a> 生成應用程式時遇到的選擇

_有些選項會根據您之前的選擇而改變。例如，如果您沒有選擇SQL資料庫，則無需設定Hibernate快取。_

### 您要建立哪種_型別_的應用程式？

您建立的應用程式型別取決於您是否希望使用微服務架構。如果不確定使用，預設為Monolithic應用程式，可以在 [此處]({{ site.url }}/microservices-architecture/)獲得有關微服務的完整說明。

您可以選擇：

*   Monolithic應用程式：這是一種經典的，集所有功能一體的應用程式。它易於使用和開發，是我們建議的預設設定。
*   微服務應用程式：在微服務架構中，擔任獨立的一個服務。
*   微服務閘道器：在微服務架構中，擔任請求路由和請求保護的邊緣服務。

### What is the base name of your application? (您的應用程式的基礎名是什麼？)

這是您應用程式的名稱。

### What is your default Java package name? （您的預設Java軟體套件名稱是什麼？）

您的Java應用程式將以此為套件的根名稱。該值由Yeoman儲存，以便下次執行產生器時，最新的一個提供的值將成為預設值。
當然，您可以透過提供新的套件名稱來覆蓋它。

### Do you want to use the JHipster Registry to configure, monitor and scale your application? （您是否要使用JHipster Registry來設定，監控和擴充套件您的應用程式？）

[JHipster Registry]({{ site.url }}/jhipster-registry/)是一個開源工具，用於管理您在執行中的應用程式。

使用微服務架構時，這是必需的（這就是為什麼僅在生成monolith時才出現這個選項的原因）。

### Which _type_ of authentication would you like to use? （您要使用哪種 _型別_ 的身份驗證？）

該選擇的選項取決於先前的選項。例如，如果您選擇了上面的[JHipster Registry]({{ site.url }}/jhipster-registry/)，則只能使用JWT身份驗證。

以下是所有可選的選項：

*   JWT身份驗證：使用[JSON Web Token (JWT)](https://jwt.io/)，這是預設選擇，也是大多數人使用的方法。
*  OAuth 2.0/OIDC身份驗證：使用OpenID Connect服務（例如[Keycloak](https://www.keycloak.org/)或[Okta](https://developer.okta.com)）來處理應用程式外部身份驗證。這比JWT更加安全，但是它需要設定OpenID Connect服務，因此有點複雜。請注意，預設情況下，JHipster將同步來自OpenID Connect伺服器的使用者資料，為此它將需要一個資料庫。
*   HTTP會話身份驗證：基於會話的經典身份驗證機制，人們通常使用 [Spring Security](http://docs.spring.io/spring-security/site/index.html)進行此操作。

您可以在我們 [保護應用程式]({{ site.url }}/security/) 頁面上找到更多訊息。

### Which _type_ of database would you like to use? （您要使用哪種 _型別_ 的資料庫？）

您可以選擇：

- 一個SQL資料庫（H2，MySQL，MariaDB，PostgreSQL，MSSQL，Oracle），您將使用Spring Data JPA訪問該資料庫
- [MongoDB]({{ site.url }}/using-mongodb/)
- [Cassandra]({{ site.url }}/using-cassandra/)
- [Couchbase]({{ site.url }}/using-couchbase/)
- [Neo4j]({{ site.url }}/using-neo4j/)
- 無數據函式庫（僅在使用具有JWT身份驗證的[微服務應用]({{ site.url }}/microservices-architecture/)時可用）

### Which _production_ database would you like to use? （您要使用哪個 _生產_ 資料庫？)

這是在"production"設定檔案使用的資料庫。要對其進行設定，請修改您的`src/main/resources/config/application-prod.yml` 檔案。

如果要使用Oracle，您可能需要瞭解當前的限制，見[使用Oracle資料庫]({{ site.url }}/using-oracle/)。

###  Which _development_ database would you like to use? (您要使用哪個 _開發_ 資料庫？)

這是在"development"設定檔案使用的資料庫，你可以選擇：

*   H2，其資料儲存在記憶體中。這是使用JHipster的最簡單方法，但是當您重新啟動伺服器時，資料將丟失。
*   H2，其資料儲存在磁碟上。與在記憶體中執行相比，這是一個更好的選擇，因為在應用程式重新啟動時您不會丟失資料。
*   與您選擇用於生產的資料庫相同的資料庫：設定起來有點複雜，但最終最好與用於生產的資料庫一起使用。如[開發指南]({{ site.url }}/development/)中所述，這也是使用liquibase-hibernate的最佳方法。

要對其進行設定，請修改您的`src/main/resources/config/application-dev.yml`檔案。

### Do you want to use the Spring cache abstraction? (您是否要使用Spring抽象快取？)

Spring抽象快取允許使用不同的快取實現，您可以使用：

1.[ehcache](http://ehcache.org/)（本地快取），[Caffeine](https://github.com/ben-manes/caffeine)（本地快取），

2.[Hazelcast](http://www.hazelcast.com/)（分散式快取）、[Infinispan](http://infinispan.org/)（另一個分散式快取）、[Memcached](https://memcached.org/)（另一個分散式快取）或 [Redis](https://redis.io/) （設定為單個伺服器快取）。

這可能會對您的應用程式的效能產生非常積極的影響，因此建議您選擇該選項。

### Do you want to use Hibernate 2nd level cache? (您是否要使用Hibernate 2級快取？)

僅當您選擇使用SQL資料庫（因為JHipster將使用Spring Data JPA訪問它）並且在上一個選擇中選擇了快取實現服務時，此選項才可用。

[Hibernate](http://hibernate.org/)是JHipster使用的JPA提供程式，它可以使用快取提供程式大大提高其效能。因此，我們強烈建議您使用此選項，並根據應用程式的需要調整快取的實現。

### Would you like to use Maven or Gradle? （您要使用Maven還是Gradle？）

您可以使用[Maven](http://maven.apache.org/)或[Gradle](http://www.gradle.org/)建立生成的Java應用程式。Maven更穩定，更成熟。Gradle更靈活，更易於擴充套件且更具推廣意義。

### Which other technologies would you like to use? （您還想使用哪些其他技術？）

這是一個多選答案，可以新增一種或多種其他技術到應用程式中。可用的技術有：

#### API first development using swagger-codegen （使用swagger-codegen的API先行開發）

透過此選項，您可以透過將[Swagger-Codegen](https://github.com/swagger-api/swagger-codegen)整合到建立中來為應用程式進行API先行開發。

#### Search engine using ElasticSearch （使用ElasticSearch的搜尋引擎）

[Elasticsearch](https://github.com/elastic/elasticsearch)將使用Spring Data Elasticsearch設定。您可以在我們的[Elasticsearch指南]({{ site.url }}/using-elasticsearch/)中找到更多訊息。

#### Clustered HTTP sessions using Hazelcast （使用Hazelcast的叢集HTTP會話）

預設情況下，JHipster僅使用HTTP會話來儲存[Spring Security](http://docs.spring.io/spring-security/site/index.html)的身份驗證和授權訊息。您可以選擇在HTTP會話中放入更多資料。
如果您在叢集中執行，則使用HTTP會話會引起問題，尤其是如果您不將負載均衡器與`粘滯會話（會話保持）`一起使用。
如果要在群集中複製會話，請選擇此選項以設定[Hazelcast](http://www.hazelcast.com/)。

#### WebSockets using Spring Websocket （使用Spring Websocket的WebSockets）

可以使用Spring Websocket啟用Websocket。我們還提供了一個完整的範例，向您展示如何有效地使用框架。

#### Asynchronous messages using Apache Kafka （使用Apache Kafka的非同步訊息）

使用[Apache Kafka]({{ site.url }}/using-kafka/)作為發布/訂閱訊息代理服務。

### Which _Framework_ would you like to use for the client? (您想為前端選擇使用哪個 _框架_ ？)

要使用的前端框架。

您可以使用：

*   Angular
*   React
*   Vue

### Would you like to use a Bootswatch theme? (您要使用Bootswatch主題嗎？)

要使用的前端題。

您可以使用[Bootswatch](https://bootswatch.com/)中的任何主題，也可以選擇預設主題。

### Would you like to use the Sass stylesheet preprocessor for your CSS? (您想為CSS使用Sass樣式表預處理器嗎？)

[Sass](https://sass-lang.com/)是簡化CSS設計的絕佳解決方案。為了高效使用，您將需要執行[Webpack](https://webpack.js.org)開發服務，該服務將自動設定Sass。

### Would you like to enable internationalization support? (您想啟用國際化支援嗎？)

預設情況下，JHipster在前端和後端都提供出色的國際化支援。但是，國際化支援會增加一些額外的效能開銷，並且管理起來會有些複雜，因此您可以選擇不安裝此功能。

請注意，JHipster僅支援UI國際化。為了實現資料國際化，您需要在JPA/Hibernate層中自己編寫程式碼。

### Which testing frameworks would you like to use? (您想使用哪些測試框架？)

預設情況下，JHipster提供Java單元/整合測試（使用Spring的JUnit支援）和JavaScript單元測試（使用Jest）。您還可以新增對以下內容的支援：

*   使用Gatling進行效能測試
*   使用Cucumber進行行為測試
*   用Protractor進行Angular集合測試

您可以在["執行測試"指南]({{ site.url }}/running-tests/)中找到更多訊息。

### Would you like to use incremental Liquibase changelogs? (您要使用增量Liquibase變更日誌嗎？)

JHipster可以選擇為您建立增量更改日誌，因此您無需重新建立資料庫或手動生成Liquibase差異。

隨時使用`--incremental-changelog`選項執行JHipster以將其啟用。

執行JHipster時，實體包含兩種狀態：

*   已儲存到磁碟的舊狀態
*   記憶體中的新狀態（從jdl或提示生成）

它們之間將產生差異，並建立變更日誌。

支援的功能：

*   建立/刪除欄位
*   建立/刪除關係
*   JDL和提示

不支援型別和約束之類的屬性更改。

衝突：
*   `--fork`選項，因為它儲存到磁碟上以覆蓋舊狀態。

### Would you like to install other generators from the JHipster Marketplace? (您是否要從JHipster市場安裝其他產生器？)

在[JHipster Marketplace]({{ site.url }}/modules/marketplace/)上，您可以安裝由第三方開發人員編寫的其他模組，以向專案中新增非官方功能。

## <a name="5"></a>使用藍圖

JHipster 5引入了藍圖的概念。藍圖是JHipster模組，可以提供定製的前後端樣板，這些藍圖將覆蓋JHipster中的樣板。例如，[Kotlin藍圖](https://github.com/jhipster/jhipster-kotlin) 用Kotlin替換了大多數Java後端程式碼。

例如，要使用Kotlin藍圖，請在生成應用程式時按如下所示傳遞藍圖的名稱。

```bash
jhipster --blueprint kotlin
```

藍圖的名稱儲存在`.yo-rc.json`中，將在執行諸如`entity`, `spring-controller` and `spring-service`等子產生器時自動使用。

如果某個藍圖未實現特定的子產生器，那麼將跳過該藍圖，並使用同一子產生器的JHipster樣板。

**注意：** 一個應用程式只能使用一個藍圖，尚不支援多個藍圖。

## <a name="3"></a> 指令行選項

您還可以使用一些可選的指令行選項執行JHipster。可以透過輸入`jhipster app --help`來找到這些選項的參考。

您可以透過以下選項：
* `--help` - 顯示產生器的選項和用法
* `--blueprint` - 指定要使用的藍圖, 例如`jhipster --blueprint kotlin`
* `--skip-cache` - 不要快取回答問題的選項 (預設值: false)
* `--skip-git` - 不要將生成的專案自動新增到Git (預設值: false)
* `--skip-install` - 不自動安裝依賴項 (預設值: false)
* `--skip-client` - 跳過前端應用生成，因此僅生成了Spring Boot後端程式碼 (預設值: false).
* `--skip-server` - 跳過後端應用生成，因此只生成了前端程式碼 (預設值: false).
* `--skip-user-management` - 跳過後端和前端的使用者管理生成 (預設值: false)
* `--i18n` - 是否停用或啟用i18n，僅在跳過前端生成時有效 (預設值: true)
* `--auth` - 在跳過伺服器端程式碼生成時指定身份驗證型別，否則無效，而且在使用`skip-server`時是必需的
* `--db` - 在跳過伺服器端程式碼生成時指定資料庫，否則無效，但在使用`skip-server`時是必需的
* `--with-entities` - 重新生成現有實體類即使它們已經生成（使用`.jhipster`資料夾中的設定檔案）(預設值: false)
* `--skip-checks` - 跳過依賴工具的檢查 (預設值: false)
* `--jhi-prefix` - 在服務，元件和狀態/路由名稱之前新增字首（預設值：jhi）
* `--entity-suffix` - 在實體類別名稱稱後新增字尾（預設值：""）
* `--dto-suffix` - 在DTO類別名稱稱後新增字尾（預設值：DTO）
* `--yarn` - 使用Yarn代替NPM（預設值：false）
* `--prettier-java` - 使用[prettier-java](https://github.com/jhipster/prettier-java) 格式化所有Java類（預設值：false）
* `--experimental` - 啟用實驗功能。請注意，這些功能可能不穩定，並可能隨時發生重大變更
* `--skip-fake-data` - 跳過生成用於開發的虛擬資料
* `--creation-timestamp` - 為可複製的建立設定時間戳。 時間戳記應該是可解析的js日期，例如：2019-01-01。 必須與--with-entities或import-jdl一起使用（generator-jhipster> 6.5.1）

## <a name="4"></a> 提醒

您還可以使用Yeoman指令行選項，例如`--force`來自動覆蓋現有檔案。因此，如果要重新生成整個應用程式，包括其實體類，則可以執行`jhipster --force --with-entities`。
