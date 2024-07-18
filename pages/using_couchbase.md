---
layout: default
title: 使用Couchbase
permalink: /using-couchbase/
redirect_from:
  - /using_couchbase.html
sitemap:
    priority: 0.7
    lastmod: 2015-02-24T00:00:00-00:00
---

# <i class="fa fa-database"></i> 使用Couchbase

Couchbase是生成應用程式時可以選擇的受支援資料庫之一。

選擇Couchbase時：

*   Spring Data Couchbase將用於訪問資料庫。這非常接近Spring Data JPA，這就是為什麼Couchbase支援非常接近（預設）JPA支援的原因 
*   [Couchmove](https://github.com/differentway/couchmove)用於代替[Liquibase](http://www.liquibase.org/)管理資料庫更改
*   [實體子產生器]({{ site.url }}/creating-an-entity/)不會詢問您實體關係，因為您無法在NoSQL資料庫建立關係（至少不會在JPA建立關係）
*   [Couchbase TestContainers](https://github.com/differentway/testcontainers-java-module-couchbase)用於啟動資料庫的容器化版本以執行單元測試。

<br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
