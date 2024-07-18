---
layout: default
title: 技術棧
permalink: /tech-stack/
redirect_from:
  - /tech_stack.html
sitemap:
    priority: 0.8
    lastmod: 2014-05-16T00:00:00-00:00
---

# <i class="fa fa-stack-overflow"></i> 技術棧

## 前端技術棧

單頁應用:

*   [Angular](https://angular.io/)或[React](https://reactjs.org/) 或[Vue](https://vuejs.org/)
*   基於[推特Bootstrap](http://getbootstrap.com/)自適應Web設計
*   [HTML5 Boilerplate樣板](http://html5boilerplate.com/)
*   現代瀏覽器相容 (Chrome, FireFox, Microsoft Edge...)
*   完整國際化支援
*   可選的[Sass](https://www.npmjs.com/package/node-sass)支援
*   基於Sprint websocket元件可選的Websocket支援

優秀的開發工作流:

*   使用[NPM](https://www.npmjs.com/get-npm)安裝最新的JavaScript函式庫
*   使用[Webpack](https://webpack.js.org/)建立，最佳化和熱過載
*   基於[Jest](https://facebook.github.io/jest/)和[Protractor](http://www.protractortest.org)測試

單頁應用不能滿足你的需求？

*   支援 [Thymeleaf](http://www.thymeleaf.org/)樣板引擎，在服務端生成Web頁面

## 後端技術棧

完整的[Spring應用](http://spring.io/):

*   基於[Spring Boot](http://projects.spring.io/spring-boot/)提供應用設定
*   [Maven](http://maven.apache.org/)或[Gradle](http://www.gradle.org/)建立，測試，執行應用
*   [開發與生產設定檔案分離]({{ site.url }}/profiles/) (同時支援Maven和Gradle)
*   [Spring Security元件](http://docs.spring.io/spring-security/site/index.html)
*   [Spring MVC REST](http://spring.io/guides/gs/rest-service/) + [Jackson](https://github.com/FasterXML/   jackson)
*   基於Sprint websocket元件, 可選的Websocket支援
*   [Spring Data JPA](http://projects.spring.io/spring-data-jpa/)和Bean校驗
*   基於[Liquibase](http://www.liquibase.org/)資料庫更新
*   [Elasticsearch](https://github.com/elastic/elasticsearch)支援，如果你需要基於你的資料庫提供高階搜尋能力
*   [MongoDB](http://www.mongodb.org)和[Couchbase](https://www.couchbase.com) 支援, 如果你想使用面向文件的NOSQL資料庫替代JPA
*   [Cassandra](http://cassandra.apache.org/)支援, 如果你想使用面向列的NOSQL資料庫替代JPA
*   [Kafka](http://kafka.apache.org/)支援, 如果你需要一個訊息發布訂閱系統

## 微服務技術棧

微服務是可選的，但完全支援:

* HTTP路由使用[Spring Cloud Gateway](https://github.com/spring-cloud/spring-cloud-gateway)
* 基於[Netflix Eureka](https://github.com/Netflix/eureka)或 [HashiCorp Consul](https://www.consul.io/)的服務發現

## 適應生產環境:

*   使用[Metrics](http://metrics.dropwizard.io/)和[ELK Stack](https://www.elastic.co/products)監控
*   使用[ehcache](http://ehcache.org/)(本地快取), [Caffeine](https://github.com/ben-manes/caffeine) (本地快取), [Hazelcast](http://www.hazelcast.com/)、 [Infinispan](http://infinispan.org/)、 [Memcached](https://memcached.org/) 或者 [Redis](https://redis.io/)提供快取
*   靜態資源最佳化 (gzip filter, HTTP cache headers)
*   使用[Logback](http://logback.qos.ch/)管理日誌，可在執行時設定日誌輸出
*   使用[HikariCP](https://github.com/brettwooldridge/HikariCP)連線函式庫帶來極致的效能提升
*   建立標準WAR檔案或者可執行的JAR檔案
*   完整的Docker和Docker Compose支援
*   支援所有主流的雲服務提供商: AWS, Cloud Foundry, GCP, Heroku, Kubernetes, OpenShift, Azure, Docker…
