---
layout: default
title: JHipster Registry
permalink: /jhipster-registry/
sitemap:
    priority: 0.7
    lastmod: 2019-02-01T00:00:00-00:00
---

# <i class="fa fa-dashboard"></i> JHipster Registry

## Overview

JHipster Registry是JHipster團隊提供的應用程式。與JHipster產生器一樣，它是一個開源，Apache 2-licensed應用程式，其源程式碼在JHipster組織的GitHub上可用：[jhipster/jhipster-registry](https://github.com/jhipster/jhipster-registry)

JHipster Registry具有三個主要功能：

- 它是一個[Eureka服務](https://cloud.spring.io/spring-cloud-netflix/spring-cloud-netflix.html)，作為應用程式的發現伺服器。該服務器維護並分發可用應用程式實例的動態清單，微服務隨後使用這些清單來執行HTTP請求路由和負載平衡。
- 它是一個[Spring Cloud設定服務](https://cloud.spring.io/spring-cloud-config/spring-cloud-config.html)，為所有應用程式執行時提供設定。
- 它還是一台管理服務器，具有用於監視和管理應用程式的儀表板。

所有這些功能都透過基於Angular的現代使用者介面，打包到一個便利的應用程式中。

![]({{ site.url }}/images/jhipster-registry-animation.gif)

## 目錄

1. [安裝](#installation)
2. [使用Eureka進行服務發現](#eureka)
3. [使用Spring Cloud Config進行應用程式設定](#spring-cloud-config)
4. [管理儀表板](#dashboards)
5. [保護JHipster Registry](#security)

## <a name="installation"></a> 安裝

### Spring設定檔案

JHipster Registry使用常規的JHipster`dev`和`prod`Spring設定檔案，以及Spring Cloud Config的標準`composite`（請參閱[官方文件](https://cloud.spring.io/spring-cloud-config/multi/multi__spring_cloud_config_server.html#composite-environment-repositories)）。

結果是：

- 使用`dev`設定檔案將與`dev`和`composite`設定檔案一起執行JHipster Registry。`dev`設定檔案將從檔案系統載入Spring Cloud設定，以查詢與`src/main/resources/config/bootstrap.yml`檔案中定義的執行目錄相對的`central-config`目錄。

- 使用`prod`設定檔案將執行帶有`prod`設定檔案和`composite`設定檔案的JHipster Registry。`prod`設定檔案將從Git儲存庫載入Spring Cloud設定，該儲存庫預設為[https://github.com/jhipster/jhipster-registry-sample-config](https://github.com/jhipster/jhipster-registry-sample-config)。在實際使用中，應該透過在`src/main/resources/config/bootstrap-prod.yml`檔案中重新設定它，或者透過重新設定`spring.cloud.config.server.composite`Spring屬性來更改此儲存庫。

JHipster Registry執行後，您可以在`Configuration > Cloud Config`選單中檢查其設定。請注意，如果您無法登入，則可能是因為JWT簽名金鑰未正確設定，這表明您的設定不正確。

### 使用預打包的JAR檔案

JHipster Registry在我們的[發行頁面](https://github.com/jhipster/jhipster-registry/releases)頁面上提供了可執行的JAR檔案。

下載JAR檔案，並使用您要使用的設定檔案（通常是JHipster應用程式）執行它（請參閱關於設定檔案的上一節）。例如，要使用儲存在`central-config`目錄中的Spring Cloud Config設定執行它：

    java -jar ./jhipster-registry-<version>.jar --spring.security.user.password=admin --jhipster.security.authentication.jwt.secret=my-secret-key-which-should-be-changed-in-production-and-be-base64-encoded --spring.cloud.config.server.composite.0.type=native --spring.cloud.config.server.composite.0.search-locations=file:./central-config

請注意，透過使用`JHIPSTER_SECURITY_AUTHENTICATION_JWT_SECRET`環境變數或使用如上所述的引數，向啟動時的registry提供JWT金鑰很重要。另一種可能的方法是在集中式設定源的`application.yml`檔案中設定此值（該檔案在啟動時由所有應用程式（包括registry）載入）。

請注意，自JHipster 5.3.0起，我們有了一個新的`jhipster.security.authentication.jwt.base64-secret`屬性，該屬性更安全，但是由於您可能仍使用舊版本，因此我們也使用`jhipster.security.authentication.jwt.secret`屬性。有關這些屬性的更多訊息，請參考我們的[安全性文件]({{ site.url }}/security/)。

同樣，要使用`prod`設定檔案執行registry，請根據您的設定調整引數，例如：

    java -jar ./jhipster-registry-<version>.jar --spring.profiles.active=prod --spring.security.user.password=admin --jhipster.security.authentication.jwt.secret=my-secret-key-which-should-be-changed-in-production-and-be-base64-encoded --spring.cloud.config.server.composite.0.type=git --spring.cloud.config.server.composite.0.uri=https://github.com/jhipster/jhipster-registry-sample-config

    java -jar ./jhipster-registry-<version>.jar --spring.profiles.active=prod --spring.security.user.password=admin --jhipster.security.authentication.jwt.secret=my-secret-key-which-should-be-changed-in-production-and-be-base64-encoded --spring.cloud.config.server.composite.0.type=git --spring.cloud.config.server.composite.0.uri=https://github.com/jhipster/jhipster-registry --spring.cloud.config.server.composite.0.search-paths=central-config

### 從原始碼構造

可以直接從[jhipster/jhipster-registry](https://github.com/jhipster/jhipster-registry)克隆/fork/下載JHipster Registry。由於JHipster Registry也是JHipster生成的應用程式，因此您可以像其他任何JHipster應用程式一樣執行它：

- 使用`./mvnw`（用於Java伺服器）在開發環境中執行它，並使用`yarn start`（用於管理前端）執行，預設情況下它將使用`dev`設定檔案，並且可以從[http://127.0.0.1:8761/](http://127.0.0.1:8761/)訪問。

- 使用`./mvnw -Pprod package`將其打包到生產環境中，並生成通常的JHipster可執行JAR檔案。然後，您可以使用`dev`或`prod` Spring設定檔案執行JAR檔案，例如：`./jhipster-registry-<version>.jar --spring.profiles.active=prod`

請注意，要使用`dev`和`composite`設定檔案，您需要在設定中包含一個`central-config`目錄，因此，如果執行`java -jar ./jhipster-registry-<version>.jar --spring.profiles.active=dev`，您將需要建立該目錄。

### 使用Docker

如果您希望從Docker映象執行JHipster Registry，則可以在Docker Hub上的[jhipster/jhipster-registry](https://hub.docker.com/r/jhipster/jhipster-registry/)上找到它。每個微服務`src/main/docker`目錄中已經存在一個用於執行該映象的docker-compose檔案：

- 執行`docker-compose -f src/main/docker/jhipster-registry.yml up`以啟動JHipster Registry。它將在Docker主機的連接埠`8761`上可用，因此如果它在您的電腦上執行，​​則應位於[http://127.0.0.1:8761/](http://127.0.0.1:8761/)。

請閱讀我們的[Docker Compose文件]({{ site.url }}/docker-compose/)以獲取有關將JHipster Registry與Docker Compose結合使用的更多訊息。

### 在雲端執行

您可以在雲上執行JHipster Registry實例。。這在生產中是必需的，但在開發中也很有用（無需在筆記型電腦上執行它）。

請閱讀[生產中的微服務文件]({{ site.url }}/microservices-in-production/)，以瞭解如何將JHipster Registry部署到Cloud Foundry或Heroku。

## <a name="eureka"></a> 使用Eureka進行服務發現

![]({{ site.url }}/images/jhipster-registry-eureka.png)

JHipster登錄檔是[Netflix Eureka伺服器](https://github.com/Netflix/eureka)，它為所有應用程式提供服務發現。

- 這對於微服務體系結構非常有用：這是閘道器如何知道哪些微服務可用以及哪些實例已啟動的方式
- 對於所有應用程式，包括monoliths，這是Hazelcast分散式快取可以自動擴充套件的方式，請參見[Hazelcast快取文件]({{ site.url }}/using-cache/)

## <a name="spring-cloud-config"></a> 使用Spring Cloud Config進行應用程式設定

![]({{ site.url }}/images/jhipster-registry-spring-cloud-config.png)

JHipster Registry是[Spring Config Server](http://cloud.spring.io/spring-cloud-config/spring-cloud-config.html)：啟動應用程式時，它們將首先連線到JHipster Registry以獲取其設定。閘道器和微服務都是如此。

此設定是Spring Boot設定，就像在JHipster`application-*.yml`檔案中找到的設定一樣，但是它儲存在中央伺服器中，因此更易於管理。

啟動時，您的閘道器和微服務應用程式將查詢Registry的設定服務器，並用在那裡定義的屬性覆蓋其本地屬性。

可以使用兩種設定源（由`spring.cloud.config.server.composite`屬性定義）：

- `native`設定，開發中預設設定（使用JHipster`dev`設定檔案），並且使用本地檔案系統。
- `Git`設定，該設定在生產中預設使用（使用JHipster `prod`設定檔案），並將設定儲存在Git伺服器中。這允許使用常用的Git工具來標記，分支或回滾設定，這些工具在此用例中非常強大。

要管理集中式設定，您需在設定源中新增`appname-profile.yml`檔案，其中**appname**和**profile**對應於您要設定的服務的應用程式名稱和當前設定檔案。
例如，在`gateway-prod.yml`檔案中新增屬性將僅為以**prod**設定檔案啟動的名為**gateway**的應用程式設定這些屬性。此外，將為所有應用程式設定`application[-dev|prod].yml`中定義的屬性。

由於閘道器路由是使用Spring Boot設定的，因此也可以使用Spring Config Server對其進行管理，例如，您可以將應用程式`app1-v1`對映到`v1`分支中的 `/app1` URL，並將`app1-v2`對映到`/app1` `v2`分支中的URL。這是升級微服務的好方法，而最終使用者不會停機。

### <a name="encryption"></a> 使用加密的設定值

JHipster Registry具有特定的`configuration > encryption`頁面，可對設定值進行加密和解密。

要加密設定值（例如，資料庫密碼），您需要：

- 下載[JCE](http://www.oracle.com/technetwork/java/javase/downloads/jce8-download-2133166.html)並按照下載檔案中的說明進行安裝（僅在使用Oracle JDK時才需要）。
- 在`bootstrap.yml`（而不是`application.yml`）中設定`encrypt.key`屬性，或在對稱金鑰密碼中使用`ENCRYPT_KEY`環境變數。

如果一切設定正確，則您應該能夠使用特定的`Configuration > Encryption`頁面，並且還可以將您要處理的文字傳送到`/config/encrypt`和`/config/decrypt`端點的POST請求中，並在請求的`body`中進行操作。

For example: `curl localhost:8761/config/encrypt -d mypassword`
例如：`curl localhost:8761/config/encrypt -d mypassword`

密文必須以`password= '{cipher}myciphertextafterencryotion'`的形式放置在任何`*.yml`設定檔案中，並且在設定服務器將其傳送到用戶端之前，它將被解密。這樣，您的設定檔案（儲存在Git或『本地』儲存在檔案系統中）就沒有純明文值。

有關更多訊息，請參閱Spring Cloud Config的[加密和解密文件](http://cloud.spring.io/spring-cloud-config/spring-cloud-config.html#_encryption_and_decryption)。

## <a name="dashboards"></a> 管理儀表板

JHipster Registry提供了用於所有應用程式型別的管理儀表板。一旦應用程式在Eureka伺服器上註冊，它就會在儀表板中可見。

為了從應用程式訪問敏感訊息，JHipster Registry將使用JWT令牌（這就是JHipster Registry僅適用於使用JWT的應用程式的原因）。用於簽署請求的JWT金鑰對於應用程式和JHipster Registry應該是相同的：預設情況下，JHipster Registry透過Spring Cloud Config設定應用程式，這應該是開箱即用的，因為它將傳送相同的金鑰給所有應用程式。

### 指標儀表板

![]({{ site.url }}/images/jhipster-registry-metrics.png)

指標儀表板使用Micrometer來提供應用程式效能的詳細檢視。

它提供以下指標：

- JVM狀態
- HTTP請求
- cache使用率
- database連線池

透過單擊JVM執行緒指標旁邊的Expand按鈕，您將獲得正在執行的應用程式的堆疊跟蹤，這對於找出阻塞的執行緒非常有用。

注意：當我們切換JHipster Registry以監視來自Micrometer的度量標準而不是Dropwizard度量標準時，這意味著應將所有使用5.7.2或更早版本生成的JHipster應用程式遷移到Micrometer，以使用JHipster Registry進行監視。如果您不想遷移應用程式，請使用JHipster Registry v4.0.6或更舊的版本。

要遷移應用程式，可以使用[JHipster升級子產生器]({{ site.url }}/upgrading-an-application/)。

### 健康狀況儀表板

![]({{ site.url }}/images/jhipster-registry-health.png)

執行狀況儀表板使用Spring Boot Actuator的執行狀況端點來提供有關應用程式各個部分的執行狀況訊息。
Spring Boot Actuator提供了許多開箱即用的健康檢查，您可以新增特定於應用程式的健康檢查。

### 設定儀表板

![]({{ site.url }}/images/jhipster-registry-configuration.png)

設定儀表板使用Spring Boot Actuator的設定端點來提供當前應用程式的Spring設定的完整檢視。

### 日誌儀表板

![]({{ site.url }}/images/jhipster-registry-logs.png)

日誌儀表板允許在執行時管理正在執行的應用程式的Logback設定。
您可以透過單擊按鈕來更改Java套件的日誌級別，這在開發和生產中都非常方便。

## <a name="security"></a> 保護JHipster Registry

預設情況下，JHipster Registry是安全的。您可以使用普通JHipster應用程式中使用的"admin/admin"登入名和密碼登入。

應用程式也使用同一"admin"使用者連線到JHipster Registry，但使用了HTTP Basic身份驗證。因此，如果您的微服務無法訪問登錄檔，並且看到一些"401 authentication error"訊息，那是因為您錯誤地設定了那些應用程式。

為了保護您的JHipster Registry，請執行以下操作：

- 您必須更改預設的"admin"密碼。此密碼是使用標準的Spring Boot屬性`spring.security.user.password`設定的，因此您可以使用常規的Spring Boot機制對其進行修改：您可以修改專案的`application-*.yml`檔案，或新增`SPRING_SECURITY_USER_PASSWORD`環境變數。[Docker Compose子產生器]({{ site.url }}/docker-compose/)使用環境變數方法。
- 由於您的應用程式將使用HTTP連線到registry，因此保護該連線通道非常重要。有很多方法可以做到這一點，最簡單的方法就是使用HTTPS。
