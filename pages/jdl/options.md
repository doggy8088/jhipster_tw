---
layout: default
title: JHipster 領域語言 (JDL) - 選項
permalink: /jdl/options
sitemap:
    priority: 0.5
    lastmod: 2019-11-02T12:00:00-00:00
---

# <i class="fa fa-star"></i> JHipster 領域語言 (JDL) - 選項

## 概要

在JHipster中，您可以為實體指定選項，例如分頁或DTO。
您可以使用JDL進行相同的操作，或者使用實體上的註解，或者使用以下語法：

    entity A {
      name String required
    }
    entity B
    entity C

    dto A, B with mapstruct

    paginate A with infinite-scroll
    paginate B with pagination
    paginate C with pager  // pager is only available in AngularJS

    service A with serviceClass
    service C with serviceImpl

可用選項的完整清單可檢視 [選項清單](#選項清單).

1. [怎麼做](#怎麼做)
1. [語法](#語法)
1. [使用use XYZ選項](#使用use XYZ選項)
1. [範例](#範例)
   1. [基本一元範例](#基本一元範例)
   1. [基本二元範例](#基本二元範例)
   1. [all和*關鍵字範例](#all--example)
   1. [all和 * 帶有排除項的範例（一元）](#all--example-with-exclusions-unary)
   1. [all和 * 帶有排除項的範例（二元）](#all--example-with-exclusions-binary)
   1. [具有自定義值的選項](#具有自定義值的選項)
   1. [混合例子](#混合例子)
1. [關於service](#關於service)
1. [微服務相關的選項](#微服務相關的選項)
1. [自定義註解](#自定義註解)
1. [可用選項](#可用選項)
1. [更多](#更多)

---

### 怎麼做

有兩種選擇：
  - 一元（無選項值）
  - 二元（帶值）

有三種將選項應用於實體的方法：
  - 使用選項名稱 (`dto`、`readOnly`等)，可檢視範例
  - 使用註解
  - 使用`use XYZ`形式

不建議將它們混合使用，因為這會降低可讀性。

---

### 語法

對於常規形式：
```
<option name> <option entity list>

or

<option name> <option entity list> with <option value>

or

<option name> <option entity list> with <option value> except <option excluded entity list>

or 

<option name> <option entity list> except <option excluded entity list>
```

  - 對於一元選項：
    - 選項名稱和清單是必需的
    - 排除的實體是可選的，帶有`except`關鍵字（有關更多詳細訊息，請參見下文）
  - 對於二元選項：
    - 實體清單位於關鍵字`with`和選項值之前
    - 同樣，被排除的實體最後帶有`except`關鍵字

對於註解：
```
@<option name>
entity <entity name>

or

@<option name>(<option value>)
```

  - 與Java類似，註解可以將值放在括號中
    - 根據選項的不同，值可以是或可以不是可選的

---

### 使用`use XYZ`選項

使用use 選項形式，您可以在實體上指定一些選項。
它是在JHipster Code 2020期間建立的，其建立原因是：
  - 解決停用選項的問題（在JHipster中有不止一種"否"的用法：`no, false, none`）
  - 提出一種按實體對選項進行分組的方法

```jdl
entity A
entity B
entity C

use serviceClass for * except C
use mapstruct, serviceImpl, infinite-scroll for A, B
use pagination for C
```

<table class="table table-striped table-responsive">
  <tr>
    <th>use 選項值</th>
    <th>說明</th>
  </tr>
  <tr>
    <td>mapstruct</td>
    <td>是否為您的實體建立DTO，如果實體具有DTO但沒有設定service，則將使用`serviceClass`</td>
  </tr>
  <tr>
    <td>serviceClass</td>
    <td></td>
  </tr>
  <tr>
    <td>serviceImpl</td>
    <td></td>
  </tr>
  <tr>
    <td>pagination</td>
    <td>當應用程式使用Cassandra時，禁止將分頁作為選項</td>
  </tr>
  <tr>
    <td>infinite-scroll</td>
    <td>當應用程式使用Cassandra時，禁止將分頁作為選項</td>
  </tr>
  <tr>
    <td>elasticsearch</td>
    <td>要求應用程式啟用searchEngine選項</td>
  </tr>
  <tr>
    <td>couchbase</td>
    <td>要求應用程式啟用searchEngine選項</td>
  </tr>
</table>

---

### 範例

每個範例將具有三種形式：
  - 常規的
  - 基於註解的
  - use 形式（如適用）

---

#### 基本一元範例

常規的：
```jdl
entity A

readOnly A
```

基於註解的：
```jdl
@readOnly
entity A
```

---

#### 基本二元範例

常規的：
```jdl
entity A

dto A with mapstruct
```

基於註解的
```jdl
@dto(mapstruct)
entity A
```

使用 `use` 關鍵字：
```jdl
entity A

use mapstruct, serviceImpl, pagination for A
```

---

#### <a name="all--example"></a>`all`和` * `關鍵字範例

`all` 和 `*` 是相同的

常規的：
```jdl
entity A
entity B

dto all with mapstruct
```

基於註解的：
```jdl
@dto(mapstruct)
entity A

@dto(mapstruct)
entity B
```

使用 `use` 關鍵字：
```jdl
entity A
entity B

use mapstruct, serviceImpl, pagination for *
```

---

#### <a name="all--example-with-exclusions-unary"></a>`all`和` * ` 帶有排除項的範例（一元）

常規的：
```jdl
entity A
entity B

skipClient * except A
```

基於註解的：
```jdl
entity A

@skipClient
entity B
```

使用 `use` 關鍵字：
```jdl
entity A
entity B

use mapstruct, serviceImpl, pagination for * except A
```

---

#### <a name="all--example-with-exclusions-binary"></a>`all`和` * ` 帶有排除項的範例（二元）

常規的：
```jdl
entity A
entity B

dto all with mapstruct except A
```

基於註解的：
```jdl
entity A

@dto(mapstruct)
entity B
```

使用 `use` 關鍵字：
```jdl
entity A
entity B

use mapstruct, serviceImpl, pagination for all except A
```

---

#### 具有自定義值的選項

```jdl
entity A
entity B

microservice all with mySuperMS
```

---

#### 混合例子

常規的：
```jdl
entity A
entity B
entity C

readOnly B, C
dto * with mapstruct except C
service * with serviceClass except C
search A with elasticsearch
```

基於註解的：
```jdl
@dto(mapstruct)
@search(elastisearch)
@service(serviceClass)
entity A

@readOnly
@dto(mapstruct)
@service(serviceClass)
entity B

@readOnly
entity C
```

---

### 關於service

指定的`service`都不會建立將直接呼叫`repository`介面的`resource`類。 這是預設和最簡單的選項，請參閱A。

`service with serviceClass`（請參見B）將使`resource`呼叫`service`類，後者將呼叫`repository`介面。
`service with serviceImpl` （請參閱C）將建立一個`service`介面，該介面將由`resource`類使用。

該介面由將呼叫`repository`介面的具體類實現。

除非確定，否則不使用任何`service`，這對CRUD來說是最簡單的選擇。 如果您將有很多業務邏輯，這些業務邏輯將使用多個`repository`，因此非常適合用於`service`類。
JHipster不是使用`service`介面的粉絲，但是如果您喜歡它們，請使用`service`的實現類。

    entity A
    entity B
    entity C

    // no service for A
    service B with serviceClass
    service C with serviceImpl

---

### 微服務相關的選項

從JHipster v3開始，可以建立微服務。 您可以指定一些選項以在JDL中生成您的實體：
微服務的名稱和搜尋引擎。

您可以透過以下方法指定微服務的名稱（JHipster應用程式的名稱）：

```
entity A
entity B
entity C
microservice * with mysuperjhipsterapp except C
microservice C with myotherjhipsterapp
search * with elasticsearch except C
```

第一個選項用於告訴JHipster您希望微服務處理您的實體，而第二個選項指定您如何以及是否希望搜尋實體。

---

### 自定義註解

自定義註解在JDL中是可以的，例如：

```jdl
@customAnnotation(customValue)
entity A
```

這樣做的主要目的是用於方案（blueprint）：有時，您需要為實體甚至欄位提供自定義選項。
對於常規選項（`dto`、`pagination`等)，這些選項將像在CLI中一樣在JSON中生成。
但是，對於自定義選項，它們將在轉儲的JSON中的`options`鍵下生成。

---

### 可用選項

以下是JDL支援的實體選項：

_不是您要找的？ 檢視 [應用程式選項](/jdl/applications#available-application-configuration-options)._

<table class="table table-striped table-responsive">
  <tr>
    <th>JDL 選項名稱</th>
    <th>選項型別</th>
    <th>預設值</th>
    <th>可選值</th>
    <th>說明</th>
  </tr>
  <tr>
    <td>skipClient</td>
    <td>unary</td>
    <td>false</td>
    <td></td>
    <td>這將使前端程式碼生成被跳過</td>
  </tr>
  <tr>
    <td>skipServer</td>
    <td>unary</td>
    <td>false</td>
    <td></td>
    <td>這將使伺服器程式碼生成被跳過</td>
  </tr>
  <tr>
    <td>noFluentMethod</td>
    <td>unary</td>
    <td>false</td>
    <td></td>
    <td>
      檢視<a href="https://www.jhipster.tech/2016/08/17/jhipster-release-3.6.0.html#important-change-fluent-setters">說明</a>
      瞭解更詳細內容
    </td>
  </tr>
  <tr>
    <td>filter</td>
    <td>unary</td>
    <td>false</td>
    <td></td>
    <td>
      檢視<a href="https://www.jhipster.tech/entities-filtering/">過濾</a> 瞭解更多詳細內容；如果設定為true,但未設定`service`，則將使用`serviceClass`
    </td>
  </tr>
  <tr>
    <td>readOnly</td>
    <td>unary</td>
    <td>false</td>
    <td></td>
    <td>
      新增此選項將使實體變為只讀， 檢視
      <a href="https://www.jhipster.tech/2019/10/10/jhipster-release-6.4.0.html#jhipster-release-v640">發布日誌</a>
      進一步瞭解。
     </td>
  </tr>
  <tr>
    <td>dto</td>
    <td>binary</td>
    <td>no</td>
    <td>mapstruct, no</td>
    <td>是否為您的實體建立DTO，如果實體具有DTO但沒有`service`，則將使用`serviceClass`</td>
  </tr>
  <tr>
    <td>service</td>
    <td>binary</td>
    <td>no</td>
    <td>serviceClass, serviceImpl, no</td>
    <td></td>
  </tr>
  <tr>
    <td>paginate</td>
    <td>binary</td>
    <td>no</td>
    <td>pagination, infinite-scroll, no</td>
    <td>當應用程式使用Cassandra時，禁止分頁</td>
  </tr>
  <tr>
    <td>search</td>
    <td>binary</td>
    <td>no</td>
    <td>elasticsearch, no</td>
    <td>要求應用程式啟用searchEngine選項</td>
  </tr>
  <tr>
    <td>microservice</td>
    <td>binary</td>
    <td></td>
    <td>custom value</td>
    <td>將為微服務應用程式內宣告的每個實體自動新增</td>
  </tr>
  <tr>
    <td>angularSuffix</td>
    <td>binary</td>
    <td></td>
    <td>custom value</td>
    <td></td>
  </tr>
  <tr>
    <td>clientRootFolder</td>
    <td>binary</td>
    <td></td>
    <td>custom value</td>
    <td></td>
  </tr>
</table>

---

### 更多

應用程式選項 [在這兒](/jdl/applications)
