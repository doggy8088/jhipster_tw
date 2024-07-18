---
layout: default
title: JHipster領域語言-應用程式設定
permalink: /jdl/applications
sitemap:
    priority: 0.5
    lastmod: 2019-10-27T12:00:00-00:00
---

# <i class="fa fa-star"></i> JHipster領域語言 (JDL) - 應用程式設定

## 概要

1. [語法](#語法)
1. [應用程式中的選項](#應用程式中的選項)
1. [範例](#範例)
   1. [簡單例子](#簡單例子)
   1. [多個應用](#多個應用)
   1. [關聯實體](#關聯實體)
   1. [設定項](#設定項)
1. [微服務流程](#微服務流程)
1. [詳細完整範例](#詳細完整範例)
1. [可用的應用程式設定選項](#可用的應用程式設定選項)
1. [更多](#更多)

***

### 語法

應用程式宣告如下：

```
application {
  config {
    <application option name> <application option value>
  }
  [entities <application entity list>]
  [<options>]
}
```

  - 應用程式設定項（Key/Value）在`config`(必須在`application`內)下指定。
  - 您可以根據需要選擇0個、1個或任何多個應用程式選項（只要它們有效）。
  - 將在應用程式內部生成的實體透過`entities`列出，這是在應用程式中生成實體推薦的方法。
    - 你可以不使用以上方法，但要在應用內生成實體必須執行以下操作:
      - 來自應用程式內的另一個JDL檔案
      - 或使用CLI
  - 關鍵字`entities`是可選的： 如果不設定，檔案中的每個實體都將在應用程式內部生成。
  - 應用程式可以有常規選項 (像 `dto` 或 `service`) ，更多訊息 [下一節](#options-in-applications) 。

---

### 應用程式中的選項

選項宣告 (`dto`、`service`、`skipServer`等) 在JDL應用程式中受支援，但有一些規則。

假設我們有這樣的JDL檔案：
```jdl
application {
  config {
    baseName app1
  }
  entities A, B, C
  dto * with mapstruct
}

application {
  config {
    baseName app2
  }
  entities C, D
  paginate * with pagination except D 
}

application {
  config {
    baseName app3
  }
  entities * except A, B, C, D, F
  service * with serviceClass
}

entity A
entity B
entity C
entity D
entity E
entity F

paginate * with infinite-scroll
```

在此範例中，我們可以看到：
  - JDL檔案中有6個宣告的實體： `A, B, C, D, E and F`.
  - 有3個應用程式: `app1, app2 and app3`
    - `app1` 使用 `A, B and C`
    - `app2` 使用 `C and D`
    - `app3` 使用 `E` (`* except A, B, C, D, F`)
  - 這些應用程式中的每一個都宣告了選項，並且還宣告了**全域**選項。
    - `app1` 應用 `dto` 於 `A, B and C`
    - `app2` 應用 `paginate` 於 `C` (因為有一個例外)
    - `app3` 應用 `service` 於 `E`
    - 全域使用 `pagination` (對每個實體有效)

這是檔案的生成方式：
  - `app1`
    - `A`: 將使用`paginate with infinite-scroll` （全域選項不會被本地選項覆蓋），並且
      `dto with mapstruct`
    - `B`: 將使用相同的選項
    - `C`: 也使用相同的選項
  - `app2`:
    - `C`: 將使用 `paginate with pagination` （而不是 `infinite-scroll` ，因為本地優先）
    - `D`: 將使用 `paginate with infinite-scroll` 因為上一個選項不包括 `D`
  - `app3`:
    - `E`: 將使用 `paginate with infinite-scroll` 和 `service E with serviceClass`

本範例說明了**遮蔽**原理。 全域選項受支援，並且將在每個已宣告的應用程式中使用，**除非**在應用程式中也宣告了選項。

另請注意，該片段摘自上一個範例 `app3`:
```jdl
entities * except A, B, C, D, F
service * with serviceClass
```
這基本上意味著`app3`將僅使用`E`，而應用程式的實體將使用『 service』選項，意思是`E`，而不是` A - F`。

最後，存在不在任何應用程式中的『 F』實體，因此不會生成該實體。

_注意：目前支援所有常規選項。_

---

### 範例

#### 簡單例子

```jdl
application {
  config {
    baseName exampleApp
    applicationType gateway
  }
}
```

---

#### 多個應用

```jdl
application {
  config {
    baseName exampleApp1
    applicationType microservice
    serverPort 9001
  }
}

application {
  config {
    baseName exampleApp2
    applicationType microservice
    serverPort 9002
  }
}

application {
  config {
    baseName exampleApp3
    applicationType gateway
    serverPort 9000
  }
}
```

---

#### 關聯實體

```jdl
application {
  config {
    baseName exampleApp1
    applicationType microservice
    serverPort 9001
  }
  entities A
}

application {
  config {
    baseName exampleApp2
    applicationType microservice
    serverPort 9002
  }
  entities * except A
}

entity A
entity B
entity C
```

---

#### 設定項

```jdl
application {
  config {
    baseName exampleApp1
    applicationType microservice
    serverPort 9001
  }
  entities A
  dto A with mapstruct 
}

application {
  config {
    baseName exampleApp2
    applicationType microservice
    serverPort 9002
  }
  entities * except A
  paginate C with pagination
}

entity A
entity B
entity C
```

---

### 詳細完整範例

範例 1:

```jdl
application {
  config {
    baseName myMonolith
    applicationType monolith
  }
  entities * except C, D
}
application {
  config {
    baseName myGateway
    applicationType gateway
    serverPort 9042
  }
  entities * except A, B
}
application {
  config {
    baseName microserviceA
    applicationType microservice
  }
  entities C
}
application {
  config {
    baseName microserviceB
    applicationType microservice
    serverPort 8082
  }
  entities D
}
entity A
entity B
entity C
entity D
dto * with mapstruct
service * with serviceClass
paginate D with pager
```

現在，生成這些應用程式和資料夾時將發生以下事件：
  - 將建立四個應用程式：
    - myMonolith 在 `./myMonolith`資料夾中，並且設定服務器連接埠 `8080`
    - myGateway 在 `./myGateway`資料夾中， 並且設定服務器連接埠 `9042`
    - microserviceA 在 `./microserviceA`資料夾中，並且設定服務器連接埠 `8081`
      - 即使我們沒有指定伺服器端口，JHipster也會預設設定一個連接埠。
      - 對於微服務，預設值是`8081`
      - 對於閘道器和單體應用而言，它是`8080`
    - microserviceB 在 `./microserviceB`資料夾中，並且設定服務器連接埠 `8082`
  - 將生成四個實體
    - `A` 和 `B` 在單體應用（monolith）中
    - `C` 和 `D` 都在閘道器（gateway）中
      - `C` 在第一個微服務
      - `D` 在第二個微服務
  - 選項`microservice`對`C` 和 `D`而言是隱式的
    - 由於它們是在兩個微服務上生成的，因此預設情況下將設定此選項。
  - 選項的工作方式與以前相同

請注意，如果不存在預設值，則產生器將設定預設值（例如`databaseType`）。JHipster Core可以為您做完全相同的事情。

---

範例 2: 存在設定項
請看 [設定項一節](#options-in-applications).

---

### 微服務工作流程

處理微服務幾乎是一件棘手的事情，但是JDL為您提供了一些您認為合適的選項來處理您的實體。
使用 `microservice <ENTITIES> with <MICROSERVICE_APP_NAME>` ，您可以指定在哪個微服務中生成哪個實體。

參考以下設定為例：
```
entity A
entity B
entity C
microservice A with firstMS
microservice B with secondMS
```

給定兩個JHipster應用程式（'firstMS'和'secondMS'），如果在兩個應用程式中匯入JDL檔案，將獲得以下內容：
  - 在 'firstMS' 中，將生成實體 `A` 和 `C` 。
  - 在 'secondMS' 中，將生成實體`B` and `C` 。

`C` 之所以會同時生成，是因為如果沒有微服務選項指定在何處生成該實體，將每個都生成。

如果您決定在單體應用中匯入此JDL，則會生成每個實體（單體沒有限制JDL中的選項）。

_注意：如果要在兩個不同的微服務中生成同一實體，則可以編寫兩個JDL檔案 而不是每次更新JDL檔案。_

前面的範例不能這樣寫：
```
entity A
entity B
entity C
microservice * except B with firstMS
microservice * except A with secondMS
```

結果如下：
  - 在 'firstMS' 中，僅有實體 `C` 被生成。
  - 在 'secondMS' 中, 實體 `B` 和 `C` 都會生成。

這是因為，在解析時，如果一個選項與另一個選項重疊，則後者優先。
您還可以使用JDL建立整個微服務棧， [這篇部落格文章](https://medium.com/@deepu105/create-full-microservice-stack-using-jhipster-domain-language-under-30-minutes-ecc6e7fc3f77) 有範例

---

### 可用的應用程式設定選項

這是JDL支援的應用程式選項：

_不是您要找的，請檢視 [常規選項](/jdl/options#available-options)。_

<table class="table table-striped table-responsive">
  <tr>
    <th>JDL選項名稱</th>
    <th>預設值</th>
    <th>可選值</th>
    <th>說明</th>
  </tr>
  <tr>
    <td>applicationType</td>
    <td>monolith</td>
    <td>monolith, microservice, gateway</td>
    <td></td>
  </tr>
  <tr>
    <td>authenticationType</td>
    <td>jwt</td>
    <td>jwt, session, oauth2</td>
    <td>jwt</td>
  </tr>
  <tr>
    <td>baseName</td>
    <td>jhipster</td>
    <td></td>
    <td></td>
  </tr>
  <tr>
    <td>blueprint</td>
    <td></td>
    <td>Name of an additional blueprint (see <a href="https://www.jhipster.tech/modules/marketplace/#/list">Marketplace</a>)</td>
    <td>已過時，字元型</td>
  </tr>
  <tr>
    <td>blueprints</td>
    <td></td>
    <td>其他方案(Blueprint)的名稱 (可檢視 <a href="https://www.jhipster.tech/modules/marketplace/#/list">方案和模組市場</a>)</td>
    <td></td>
  </tr>
  <tr>
    <td>buildTool</td>
    <td>maven</td>
    <td>maven, gradle</td>
    <td></td>
  </tr>
  <tr>
    <td>cacheProvider</td>
    <td>ehcache or hazelcast</td>
    <td>caffeine, ehcache, hazelcast, infinispan, memcached, redis, no</td>
    <td>ehcache用於單體和閘道器的，否則為hazelcast</td>
  </tr>
  <tr>
    <td>clientFramework</td>
    <td>angularX</td>
    <td>angularX, react</td>
    <td></td>
  </tr>
  <tr>
    <td>clientPackageManager</td>
    <td>npm</td>
    <td>npm, yarn</td>
    <td></td>
  </tr>
  <tr>
    <td>clientTheme</td>
    <td>none</td>
    <td>Something or none</td>
    <td>您可以輸入所需的任何值，前提是您知道它會起作用（例如Yeti）。</td>
  </tr>
  <tr>
    <td>clientThemeVariant</td>
    <td></td>
    <td>Something or primary</td>
    <td>您可以輸入所需的任何值，前提是您知道它會起作用（例如深色或淺色），也可以為空</td>
  </tr>
  <tr>
    <td>databaseType</td>
    <td>sql</td>
    <td>sql, mongodb, cassandra, couchbase, no</td>
    <td></td>
  </tr>
  <tr>
    <td>devDatabaseType</td>
    <td>h2Disk</td>
    <td>h2Disk, h2Memory, *</td>
    <td>* 生產用資料庫型別</td>
  </tr>
  <tr>
    <td>dtoSuffix</td>
    <td>DTO</td>
    <td></td>
    <td>DTO的字尾。 如果為空字串，則為false。</td>
  </tr>
  <tr>
    <td>enableHibernateCache</td>
    <td>true</td>
    <td></td>
    <td></td>
  </tr>
  <tr>
    <td>enableSwaggerCodegen</td>
    <td>false</td>
    <td></td>
    <td></td>
  </tr>
  <tr>
    <td>enableTranslation</td>
    <td>true</td>
    <td></td>
    <td></td>
  </tr>
  <tr>
    <td>entitySuffix</td>
    <td></td>
    <td></td>
    <td>實體的字尾。 如果為空字串，則為false。</td>
  </tr>
  <tr>
    <td>jhiPrefix</td>
    <td>jhi</td>
    <td></td>
    <td></td>
  </tr>
  <tr>
    <td>languages</td>
    <td>[en, fr]</td>
    <td>Languages available in JHipster</td>
    <td>中括號必須有</td>
  </tr>
  <tr>
    <td>messageBroker</td>
    <td>false</td>
    <td>kafka, false</td>
    <td></td>
  </tr>
  <tr>
    <td>nativeLanguage</td>
    <td>en</td>
    <td>JHipster支援的任何語言</td>
    <td></td>
  </tr>
  <tr>
    <td>packageName</td>
    <td>com.mycompany.myapp</td>
    <td></td>
    <td>設定套件名選項</td>
  </tr>
  <tr>
    <td>prodDatabaseType</td>
    <td>mysql</td>
    <td>mysql, mariadb, mssql, postgresql, oracle, no</td>
    <td></td>
  </tr>
  <tr>
    <td>reactive</td>
    <td>false</td>
    <td></td>
    <td></td>
  </tr>
  <tr>
    <td>searchEngine</td>
    <td>false</td>
    <td>elasticsearch, false</td>
    <td></td>
  </tr>
  <tr>
    <td>serverPort</td>
    <td>8080, 8081 or 9999</td>
    <td></td>
    <td>取決於應用程式型別</td>
  </tr>
  <tr>
    <td>serviceDiscoveryType</td>
    <td>false</td>
    <td>eureka, consul, no</td>
    <td></td>
  </tr>
  <tr>
    <td>skipClient</td>
    <td>false</td>
    <td></td>
    <td></td>
  </tr>
  <tr>
    <td>skipServer</td>
    <td>false</td>
    <td></td>
    <td></td>
  </tr>
  <tr>
    <td>skipUserManagement</td>
    <td>false</td>
    <td></td>
    <td></td>
  </tr>
  <tr>
    <td>testFrameworks</td>
    <td>[]</td>
    <td>cypress, protractor, cucumber, gatling</td>
    <td>中括號必須有</td>
  </tr>
  <tr>
    <td>websocket</td>
    <td>false</td>
    <td>spring-websocket, false</td>
    <td></td>
  </tr>
</table>

---

### 更多

 [可用常規選項](/jdl/options)
