---
layout: default
title: JHipster控制中心
permalink: /jhipster-control-center/
sitemap:
    priority: 0.7
    lastmod: 2020-10-20T00:00:00-00:00
---

# <i class="fa fa-codepen"></i> JHipster控制中心

## 概述

JHipster控制中心（JHipster Control Center）的主要目的是監視和管理應用程式。

它的所有功能都透過現代Vue使用者介面打包到一個外部應用程式中。 它的原始碼可在JHipster組織下的GitHub上找到，網址為[jhipster/jhipster-control-center](https://github.com/jhipster/jhipster-control-center) 。

![]({{ site.url }}/images/jhipster-control-center-animation.gif)

## 概要

1. [Spring特定的設定檔案](#profiles)
2. [安裝](#installation)
3. [架構](#architecture)
4. [認證機制](#authentication)
5. [屬性](#features)

## <a name="profiles"></a>  Spring特定的設定檔案

**控制中心使用常規的JHipster`dev`和`prod`Spring設定檔案。 但是，要正常工作，必須從與Spring Cloud Discovery後端相對應的Spring設定檔案開始。**

- `eureka`: 連線到Eureka伺服器並獲取其註冊實例，該實例在application-eureka.yml中設定
- `consul`: 連線到Consul伺服器並獲取其註冊實例，該實例在application-consul.yml中設定
- `static`: 使用作為屬性提供的實例的靜態清單，該清單在application-static.yml中設定
- `kubernetes`: 在application-kubernetes.yml中設定

這對於微服務體系結構非常有用：控制中心以這種方式知道哪些微服務可用，哪些實例可用。

對於所有應用程式（包括單體式應用程式），Hazelcast分散式快取可以自動擴充套件， 查閱[Hazelcast快取文件]({{ site.url }}/using-cache/)

## <a name="installation"></a> 安裝

### 在本地執行

* ### 步驟1：執行Spring Cloud Discovery後端使用的伺服器

  Eureka和Consul docker-compose檔案位於src/main/docker下，以簡化測試專案 (檢視 [specific spring profiles](#profiles)).

    - 對於Consul: 執行 `docker-compose -f src/main/docker/consul.yml up -d`
    - 對於Eureka: 執行 `docker-compose -f src/main/docker/jhipster-registry.yml up -d`
    - 對於Kubernetes : 檢視 [kubernetes文件](https://www.jhipster.tech/kubernetes/#deploying-to-kubernetes)
    - 否則，要使用靜態實例清單，可以直接轉到下一步。

* ### 步驟2：選擇您的身份驗證設定檔案

  身份驗證有2種 (檢視 [認證機制](#authentication)):

    - JWT: 這是預設身份驗證，如果選擇此身份驗證，則無需執行任何操作。
    - OAuth2: 要使用OAuth2身份驗證，您必須啟動Keycloak。 執行 `docker-compose -f src/main/docker/keycloak.yml up -d`
    

* ### 步驟3：執行克隆的專案

    根據所需的特定Spring設定檔案執行控制中心，以下是一些範例：

    - 對於使用JWT和Consul開發, 執行 `./mvnw -Dspring.profiles.active=consul,dev`
    - 對於使用JWT和Eureka開發, 執行`./mvnw -Dspring.profiles.active=eureka,dev`
    - 對於使用JWT和靜態實例清單進行開發, 執行 `./mvnw -Dspring.profiles.active=static,dev`
    - 對於使用OAuth2和Consul進行開發， 執行 `./mvnw -Dspring.profiles.active=consul,dev,oauth2`
    - 對於使用OAuth2和Eureka進行開發, 執行 `./mvnw -Dspring.profiles.active=eureka,dev,oauth2`
    - 剛開始開發執行 `./mvnw` 然後在另一個終端執行 `npm start` 用於熱過載用戶端程式碼

### 從Docker執行

A 容器映像已在Docker Hub上提供。 要使用它，請執行以下指令：

- `docker pull jhipster/jhipster-control-center`
- `docker run -d --name jhcc -p 7419:7419 jhipster/jhipster-control-center:latest`

## <a name="architecture"></a> 架構

這是一個標準的Web應用程式，透過其管理API端點連線到一個或幾個JHipster應用程式。 這些管理端點可以公開在標準API連接埠（通常為8080、8081等）上，也可以公開在專用管理連接埠（通常為9999）上，以便與外界隔離。

控制中心使用 [Spring Cloud Gateway](https://docs.spring.io/spring-cloud-gateway/docs/current/reference/html/) 路由API和Spring Cloud LoadBalancer以在對另一個微服務的呼叫中提供用戶端負載平衡（預設情況下，Ribbons已停用，以使用Spring Cloud LoadBalancer的負載平衡實現）。

![]({{ site.url }}/images/jhipster-control-center-architecture.png)

## <a name="authentication"></a> 認證機制

為了訪問您的應用程式，JHipster Control Center根據設定檔案使用特定的安全機制。

#### ***JWT***
這是一個自定義的JHipster實現。 用於簽署請求的JWT金鑰對於應用程式和控制中心應該是相同的：預設情況下，控制中心透過Spring Cloud Config設定應用程式，這應該是開箱即用的，因為它將傳送相同的key到所有應用程式 。

#### ***OAuth2***
此設定檔案使用第三方授權-身份驗證伺服器，例如Keycloak（或Okta即將推出）。 當您連線到控制中心時，控制中心將使用OAuth2協定在Keycloak中生成會話。

然後，在Oauth2SecurityConfiguration.java中，我們的安全設定將使用Spring Security的過濾器鏈從Keycloak獲得授權，並使用`http.oauth2Login()`生成Spring的Principal（當前使用者）。 之後，Spring Security的過濾器鏈將應用`http.oauth2ResourceServer().jwt().jwtAuthenticationConverter(jwtAuthenticationConverter())`來獲得其角色的身份驗證。 透過這種方式，我們可以輕鬆地更改我們的提供程式（Keycloak，Okta等）。

## <a name="features"></a> 屬性

### ***實例***

JHipster控制中心提供了應用程式實例的清單。 一旦應用程式在服務器（consul或eureka）上註冊，它就會在清單中可用。

![]({{ site.url }}/images/jhipster-control-center-instances.png)

### ***指標***

指標頁面使用Micrometer來提供應用程式效能的詳細檢視。

它提供有關以下方面的指標：

- JVM
- HTTP請求
- 快取使用
- 資料庫連線池

透過單擊JVM執行緒指標旁邊的Expand按鈕，您將獲得正在執行的應用程式的堆疊跟蹤，這對於找出阻塞的執行緒非常有用。

![]({{ site.url }}/images/jhipster-control-center-metrics.png)

### ***健康***

執行狀況頁面使用Spring Boot Actuator執行狀況端點來提供有關應用程式各個部分的執行狀況訊息。

Spring Boot Actuator提供了許多開箱即用的健康檢查，您可以新增特定於應用程式的健康檢查。

![]({{ site.url }}/images/jhipster-control-center-health.png)

### ***設定***

設定頁面使用Spring Boot Actuator的設定端點來提供當前應用程式的Spring設定的完整檢視。

![]({{ site.url }}/images/jhipster-control-center-configuration.png)

### ***日誌***

日誌頁面允許在執行時管理正在執行的應用程式的Logback設定。

您可以透過單擊按鈕來更改Java套件的日誌級別，這在開發和生產中都非常方便。

![]({{ site.url }}/images/jhipster-control-center-logs.png)

### ***日誌檔案***

日誌檔案頁面允許在執行時檢視正在執行的應用程式的日誌。 預設情況下，它是停用的，您需要對其進行設定。 如果停用了日誌檔案，則顯示此訊息：
```
No available logfile. Please note that it is not available by default, you need to set up the Spring Boot properties below! 
Please check:
 - if the microservice is up
 - if these properties are set: 
     - logging.file.path
     - logging.file.name (to avoid using the same spring.log)

See:
 - https://docs.spring.io/spring-boot/docs/current/reference/html/production-ready-endpoints.html
 - https://docs.spring.io/spring-boot/docs/current/reference/html/howto-logging.html
```

![]({{ site.url }}/images/jhipster-control-center-logfile.png)

### ***API***

API頁面允許檢視您應用程式的所有API文件，並透過單個Swagger UI框架測試其端點。

![]({{ site.url }}/images/jhipster-control-center-api.png)

