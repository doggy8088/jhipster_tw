---
layout: default
title: API閘道器
permalink: /api-gateway/
sitemap:
    priority: 0.7
    lastmod: 2017-05-03T00:00:00-00:00
---

# <i class="fa fa-exchange"></i> JHipster API閘道器

JHipster可以生成API閘道器。閘道器是普通的JHipster應用程式，因此您可以在該專案上使用常規的JHipster選項和開發工作流，但它也充當微服務的入口。更具體地說，它為所有微服務提供HTTP路由和負載均衡，服務質量，安全性和API文件。

## 目錄

1. [架構圖](#architecture_diagram)
2. [HTTP路由](#http_routing)
3. [安全](#security)
4. [自動文件](#documentation)
5. [限速](#rate_limiting)
6. [訪問控制策略](#acl)

## <a name="architecture_diagram"></a> 架構圖

<img src="{{ site.url }}/images/microservices_architecture_detail.001.png" alt="Diagram" style="width: 800; height: 600" class="img-responsive"/>

## <a name="http_routing"></a> HTTP請求使用閘道器進行路由

啟動閘道器和微服務後，它們將在registry中註冊自己（使用`src/main/resources/config/application.yml`檔案中的`eureka.client.serviceUrl.defaultZone`項）。

閘道器將使用其應用程式名字自動將所有請求代理到微服務：例如，註冊微服務`app1`時，該請求在閘道器上的`/services/app1`URL上可用。

例如，如果您的閘道器執行在`localhost:8080`上，則可以指向[http://localhost:8080/services/app1/api/foos](http://localhost:8080/services/app1/api/foos)來獲取微服務`app1`服務的foos資源。
如果您嘗試使用Web瀏覽器執行此操作，請不要忘記REST資源在JHipster中是預設保護的，因此您需要傳送正確的JWT標頭（請參見下面的安全性要點），或在微服務的`MicroserviceSecurityConfiguration`類刪除這些URL安全保護。

如果有多個執行同一服務的實例，則閘道器將從JHipster Registry獲取這些實例，並將：

- 使用[Spring Coud Load Balancer](https://spring.io/guides/gs/spring-cloud-loadbalancer/)負載均衡HTTP請求。
- 使用[Netflix Hystrix](https://github.com/Netflix/hystrix)提供斷路器，以便快速，安全地刪除發生故障的實例。

每個閘道器都有一個特定的"admin > gateway"選單，可以在其中監視開啟的HTTP路由和微服務實例。

如果有多個執行同一服務的實例，則閘道器將從JHipster Registry獲取這些實例，並將：
使用Netflix Ribbon負載均衡HTTP請求。

## <a name="security"></a> 安全

在此[安全文件頁面]({{ site.url }}/security/)上詳細介紹了標準JHipster安全選項。畢竟，保護微服務架構具有一些特定的調整和選項，在此進行詳細介紹。

### JWT（JSON Web令牌）

JWT（JSON Web令牌）是一種行業標準、易於使用的方法，用於保護微服務體系結構中的應用程式。

JHipster使用Okta提供的[JJWT library](https://github.com/jwtk/jjwt)來實現JWT。

令牌由閘道器生成，併發送到底層微服務：由於它們共享一個公共金鑰，因此微服務能夠驗證令牌並使用該令牌對使用者進行身份驗證。

這些令牌是自我描述的：它們具有身份驗證和授權訊息，因此微服務不需要查詢資料庫或外部系統。這對於確保可擴充套件的體系結構很重要。
- 為了確保安全，必須在所有應用程式之間共享JWT秘密令牌。
- 對於每個應用程式，預設令牌是唯一的，由JHipster生成。它儲存在`.yo-rc.json`檔案中。
- 使用`src/main/resources/config/application.yml`檔案中的`jhipster.security.authentication.jwt.secret`金鑰設定令牌。
- 要在所有應用程式之間共享此金鑰，請將金鑰從閘道器複製到所有微服務，或使用[JHipster Registry]({{ site.url }}/jhipster-registry/)的Spring Config Server或[JHipster的Consul K / V儲存的特定設定]({{ site.url }}/consul/)進行共享。這是人們使用這些中心設定服務器的主要原因之一。
- 推薦的做法是在開發和生產中使用其他金鑰。


### OpenID Connect

JHipster提供了OpenID Connect支援，如[我們的OpenID Connect文件]({{ site.url }}/security/#oauth2)中所述。

選擇此選項時，預設情況下將使用Keycloak，並且可能要使用Docker Compose執行完整的微服務架構：請確保閱讀我們的[Docker Compose文件]({{ site.url }}/docker-compose/)，併為Keycloak設定正確的`/etc/hosts`。

使用OpenID Connect時，JHipster閘道器會將OAuth2令牌傳送到微服務，該微服務將接受這些令牌，因為它們也已連線到Keycloak服務。

與JWT不同，這些令牌不是自我描述的，而是有狀態的，這導致以下問題：

微服務中的效能問題：由於查詢當前使用者的安全訊息非常普遍（否則，從一開始我們就不會使用任何安全選項），幾乎每個微服務都會呼叫OpenID Connect伺服器來獲取該資料。因此，在正常設定中，每個微服務都會在每次收到請求時進行這些呼叫，這將很快會導致效能問題。

  - 如果在生成JHipster微服務時選擇了快取選項([這裡是使用快取文件]({{ site.url }}/using-cache/))，則將生成特定的`CachedUserInfoTokenServices`Spring Bean，它將快取這些呼叫。正確設定後，這將消除效能問題。
  - 如果您需要在『user info』請求獲取更多訊息，請使用`src/main/resources/application.yml`設定檔案中的標準Spring Boot設定鍵值`security.oauth2.resource.userInfoUri`對其進行設定。

## <a name="documentation"></a> 自動文件

閘道器暴露了它所代理服務的Swagger API，許多工具依賴此屬性，例如Swagger UI和swagger-codegen。

閘道器的"admin > API"選單具有特定的下拉清單，其中顯示了閘道器的API以及已註冊的微服務中的所有暴露API。

使用此下拉清單，所有微服務API文件已經自動生成，並可以透過閘道器對其進行測試。

使用安全的API時，安全令牌會自動新增到Swagger UI介面，因此所有請求都可以直接使用。

## <a name="rate_limiting"></a> 限速

這是一項高階屬性，它使用[Bucket4j](https://github.com/vladimir-bukhtoyarov/bucket4j)和[Hazelcast](https://hazelcast.com/)提供微服務上的服務質量。

閘道器提供速率限制功能，因此可以限制REST請求的數量：

- 透過IP地址（對於匿名使用者）
- 透過使用者登入（對於已登入的使用者）

然後，JHipster將使用[Bucket4j](https://github.com/vladimir-bukhtoyarov/bucket4j)和[Hazelcast](https://hazelcast.com/)請求計數，並在超出限制時傳送HTTP 429（請求過多）錯誤。每個使用者的預設限制是每小時100,000個API呼叫。

這是一項重要功能，可以保護微服務架構免於被特定使用者的請求所淹沒。

閘道器在保護REST端點安全時，可以完全訪問使用者的安全訊息，因此可以擴充套件它，以根據使用者的安全角色提供特定的速率限制。

要啟用速率限制，請開啟`application-dev.yml`或`application-prod.yml`檔案，並將`enabled`設定為`true`：

    jhipster:
        gateway:
            rate-limiting:
                enabled: true

資料儲存在Hazelcast中，因此，只要設定了Hazelcast分散式快取，便可以擴充套件閘道器，該閘道器可以直接使用：

- 預設情況下，所有閘道器都設定了Hazelcast
- 如果使用[JHipster Registry]({{ site.url }}/jhipster-registry/)，則閘道器的所有實例都應自動在分散式快取中註冊自己

如果要新增更多規則或修改現有規則，則需要在`RateLimitingFilter`類別中對其進行編碼。修改範例可能是：

- 降低HTTP呼叫的限制
- 增加每分鐘或每天限制
- 取消『admin』使用者的所有限制

## <a name="acl"></a> 訪問控制策略

預設情況下，所有已註冊的微服務都可以透過閘道器來訪問。如果要排除透過閘道器公開訪問的特定API，可以使用閘道器的特定訪問控制策略過濾器。可以使用`application-*.yml`檔案中的`jhipster.gateway.authorized-microservices-endpoints`金鑰對其進行設定：

    jhipster:
        gateway:
            authorized-microservices-endpoints: # Access Control Policy, if left empty for a route, all endpoints will be accessible
                app1: /api,/v2/api-docs # recommended dev configuration

例如，如果您只希望微服務`bar`的 `/api/foo`API端點可用：

    jhipster:
        gateway:
            authorized-microservices-endpoints:
                bar: /api/foo
