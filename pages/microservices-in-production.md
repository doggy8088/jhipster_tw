---
layout: default
title:  生產環境的微服務
permalink: /microservices-in-production/
sitemap:
    priority: 0.7
    lastmod: 2017-05-03T00:00:00-00:00
---

# <i class="fa fa-cloud"></i> 生產環境的微服務

微服務是一種特定的JHipster應用程式。請參考我們[在生產環境使用Jhipster]({{ site.url }}/production)，以獲取有關進行生產環境建立，對其進行最佳化和保護的更多訊息。

## <a name="elk"></a> 微服務監控

請參考我們的[JHipster Registry文件]({{ site.url }}/jhipster-registry)，以瞭解哪些執行期儀表板可用，以及如何使用它們。

我們的[監控文件]({{ site.url }}/monitoring)對於使用以下方面的特定訊息也非常重要：

- ELK收集您的微服務日誌
- Prometheus收集您的微服務指標
- Zipkin跟蹤整個服務中的HTTP請求

## <a name="docker_compose"></a> 使用Docker Compose開發和部署

在微服務架構上工作意味著您將需要幾個不同的服務和數據函式庫一起工作，在這種情況下，Docker Compose是一個很好的工具，可以管理您的開發，測試和生產環境。

[Docker Compose文件]({{ site.url }}/docker-compose#microservices)中包含有關微服務的特定部分，我們強烈建議您在使用微服務架構時熟悉它。

由於Docker Swarm使用與Docker Machine相同的API，因此在雲中部署微服務架構與在本地電腦上部署微服務架構完全相同。請遵循我們的[Docker Compose文件 ]({{ site.url }}/docker-compose/)，以瞭解有關將Docker Compose與JHipster結合使用的更多訊息。

## <a name="cloudfoundry"></a> 使用Cloud Foundry進行生產

[Cloud Foundry子產生器]({{ site.url }}/cloudfoundry/)與微服務架構的工作原理相同，主要區別在於您需要部署更多應用程式：

- 使用[Cloud Foundry子產生器]({{ site.url }}/cloudfoundry/)首先部署JHipster Registry（這是一個普通的JHipster應用程式）。
- 請注意在其上部署JHipster Registry的URL。您的應用程式都必須指向該URL：
  - 在`bootstrap-prod.yml`檔案中，`spring.cloud.config.uri`必須指向`http(s)://<your_jhipster_registry_url>/config/`
  - 在`application-prod.yml` 檔案中, `eureka.client.serviceUrl.defaultZone`必須指向`http(s)://<your_jhipster_registry_url>/eureka/`
- 部署您的閘道器和微服務
- 使用Cloud Foundry像往常一樣擴充套件應用程式

需要記住的重要一點是，預設情況下，JHipster Registry不受保護，並且不應從外部訪問微服務，因為使用者應該使用閘道器來訪問您的應用程式。

有兩種解決方案可以解決此問題：

- 使用特定路由保護您的Cloud Foundry。
- 使所有內容保持公開，但在所有地方都使用HTTPS，並使用Spring Security的基本身份驗證支援來保護JHipster Registry

## <a name="heroku"></a> 使用Heroku進行生產

[Heroku子產生器]({{ site.url }}/heroku/)與微服務體系結構幾乎相同，主要區別在於您需要部署更多應用程式：

一鍵直接部署JHipster Registry：

[![Deploy to Heroku](https://camo.githubusercontent.com/c0824806f5221ebb7d25e559568582dd39dd1170/68747470733a2f2f7777772e6865726f6b7563646e2e636f6d2f6465706c6f792f627574746f6e2e706e67)](https://dashboard.heroku.com/new?&template=https%3A%2F%2Fgithub.com%2Fjhipster%2Fjhipster-registry)

請遵循[Heroku子產生器文件]({{ site.url }}/heroku/)，以瞭解如何保護JHipster Registry。

請注意在其上部署JHipster Registry的URL。您的應用程式都必須在其`application-prod.yml`檔案中都指向該URL。將該設定更改為：

    eureka:
        instance:
            hostname: https://admin:[password]@[appname].herokuapp.com
            prefer-ip-address: false

現在，您可以部署和擴充套件閘道器和微服務。Heroku子產生器將詢問您一個新問題，以得知您的JHipster Registry的URL：這將使您的應用程式能夠在Spring Cloud Config伺服器上獲取其設定。
