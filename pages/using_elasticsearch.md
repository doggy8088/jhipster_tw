---
layout: default
title: 使用Elasticsearch
permalink: /using-elasticsearch/
redirect_from:
  - /using_elasticsearch.html
sitemap:
    priority: 0.7
    lastmod: 2017-04-16T00:00:00-00:00
---

# <i class="fa fa-search"></i> 使用Elasticsearch

Elasticsearch是一個在資料庫之上新增搜尋功能的選項。

此選項有一些限制：

*   它僅適用於SQL資料庫和MongoDB。將來會新增Cassandra和Couchbase支援（歡迎提供幫助！）。
*   您的資料庫和Elasticsearch之間沒有自動複製機制，因此您的資料可能不同步。結果，您可能需要編寫一些特定的程式碼來同步資料，例如使用Spring `@Scheduled`註解，使其每天晚上執行。
    *   這也意味著，如果在應用程式外部更改資料庫，則搜尋索引將不同步。在這些情況下，[Elasticsearch Reindexer](https://www.jhipster.tech/modules/marketplace/#/details/generator-jhipster-elasticsearch-reindexer)JHipster模組可以提供幫助。

選擇Elasticsearch選項時：

*   在[Spring Data Jest](https://github.com/VanRoy/spring-data-jest)的幫助下，使用了Spring Data Elasticsearch。Spring Data Jest，可與Elasticsearch的REST API通訊。它會停用Spring Boot的自動設定，而是使用自己的自動設定。
*   "repository"軟體套件具有一個名為"search"的新子軟體套件，其中包含所有Elasticsearch repositories。
*   "User"實體在Elasticsearch中建立索引，您可以使用`/api/_search/users/:query`REST端點進行查詢。
*   當使用[實體子產生器]({{ site.url }}/creating-an-entity/)時，所生成的實體將由Elasticsearch自動索引，並在REST端點中使用。Angular/React使用者介面中還新增了搜尋功能，因此您可以在CRUD主螢幕中搜索實體。

### 在開發中使用

在開發中，JHipster與嵌入式Elasticsearch實例一起執行。如果您設定了`SPRING_DATA_JEST_URI`環境變數（或向您的`application-dev.yml`新增`spring.data.jest.uri`屬性），您還可以使用外部Elasticsearch實例。

執行外部Elasticsearch實例的最簡單方法是使用提供的Docker Compose設定：

    docker-compose -f src/main/docker/elasticsearch.yml up -d
    
然後設定一個環境變數指向它：

    export SPRING_DATA_JEST_URI=http://localhost:9200

### 在生產中使用

在生產中，JHipster需要一個外部Elasticsearch實例。預設情況下，應用程式查詢在localhost上執行的Elasticsearch實例。可以使用`application-prod.yml`檔案中的標準Spring Boot屬性進行設定。

### 在Heroku上使用

在Heroku上，將[Bonsai Elasticsearch](https://elements.heroku.com/addons/bonsai)設定為附加元件。JHipster被自動設定為與會話。