---
layout: default
title: JHipster域語言
permalink: /jdlx/
sitemap:
    priority: 0.5
    lastmod: 2019-08-17T12:00:00-00:00
---

# <i class="fa fa-star"></i> JHipster域語言（JDL）


JDL是JHipster特定的領域語言，您可以在一個檔案（或多個檔案）中，使用簡單易用的語法描述所有應用程式、部署、實體及其關係。

您可以使用我們的線上[JDL-Studio](https://start.jhipster.tech/jdl-studio/)或[JHipster IDE](https://www.jhipster.tech/jhipster-ide/)外掛/擴充套件（可用於[Eclipse](https://marketplace.eclipse.org/content/jhipster-ide), [VS Code](https://marketplace.visualstudio.com/items?itemName=jhipster-ide.jdl)和[Atom](https://atom.io/packages/ide-jhipster)）來建立JDL檔案及其UML視覺化。您也可以建立和匯出JDL模型，或共享JDL模型的URL。

您可以透過執行`jhipster import-jdl your-jdl-file.jdl`使用`import-jdl`子產生器從JDL檔案生成應用程式，部署和實體。

如果您有一個現有專案（使用`jhipster import-jdl`建立或透過`jhipster`指令行生成），則可以透過執行`jhipster import-jdl your-jdl-file.jdl`來為該專案生成實體。確保在您的當前JHipster專案下執行此指令。

您還可以透過從生成的JHipster應用程式根目錄執行`jhipster-uml your-xmi-file.xmi --to-jdl`來生成應用程式，實體，並使用[JHipster UML]({{ site.url }}/jhipster-uml/)將它們匯出為JDL檔案。要了解有關JHipster UML的更多訊息並進行安裝，請轉到[JHipster UML文件]({{ site.url }}/jhipster-uml/)。

這可以替代使用[實體子產生器]({{ site.url }}/creating-an-entity/)，並且這是推薦的方法。這個思路是，使用視覺工具來[管理關係]({{ site.url }}/managing-relationships/)比使用經典的Yeoman問答更容易。

JDL專案[可在GitHub上獲得](https://github.com/jhipster/jhipster-core/)，與JHipster（Apache 2.0許可證）一樣，它也是一個開源專案，。它也可以用作執行JDL解析的node函式庫。

_如果您喜歡[JHipster域語言](https://github.com/jhipster/jhipster-core/)，[JDL Studio](https://github.com/jhipster/jdl-studio/)或者[JHipster IDE](https://github.com/jhipster/jhipster-ide/)，請不要忘記在GitHub上給它們加星-謝謝！_!

***

以下便是JDL文件：

1. [JDL範例](#sample)
1. [如何使用它](#howtojdl)
   1. [匯入JDL檔案](#importingjdl)
   1. [匯出到JDL檔案](#exportingjdl)
1. [語言](#jdllanguage)
   1. [申請宣告](#applicationdeclaration)
   1. [實體宣告](#entitydeclaration)
   1. [關係宣告](#relationshipdeclaration)
   1. [列舉](#enumerationdeclaration)
   1. [Blobs](#blobdeclaration)
   1. [選項宣告](#optiondeclaration)
   1. [與微服務相關的選項](#microserviceoptions)
   1. [註解](#annotations)
   1. [部署宣告](#deploymentdeclaration)
1. [註解](#commentingjdl)
1. [所有關係](#jdlrelationships)
1. [常數](#constants)
1. [工作流程](#workflows)
1. [備註](#annexes)
   1. [可用的應用程式選項](#application_options)
   1. [可用的部署選項](#deployment_options)
   1. [可用的欄位型別和約束](#types_and_constraints)
   1. [可用選項](#all_options)
1. [故障排除](#troubleshooting)
1. [問題與錯誤](#issues)

***

## <a name="sample"></a> JDL範例

Oracle的"人力資源"範例應用程式已轉換為JDL，可在[此處](https://github.com/jhipster/jdl-samples/blob/master/Oracle-Human-Resources-sample.jdl)獲得。
預設情況下，[JDL-Studio](https://start.jhipster.tech/jdl-studio/)和[JHipster IDE](https://www.jhipster.tech/jhipster-ide/)也會載入這個例子。

如果您正在尋找更多範例，[這裡](https://github.com/jhipster/jdl-samples)有一倉庫例子。

## <a name="howtojdl"></a> 如何使用它

###  <a name="importingjdl"></a> 匯入JDL檔案
然後，您可以使用JDL檔案生成實體：
  - 只需建立副檔名為'.jh'或'.jdl'的檔案，
  - 使用[JDL-Studio](https://start.jhipster.tech/jdl-studio/)或[JHipster IDE](https://www.jhipster.tech/jhipster-ide/)宣告您的應用程式，部署，實體和關係，或建立和下載檔案，
  - 如果僅在其中建立實體，則在JHipster應用程式的根資料夾中執行`jhipster import-jdl my_file.jdl`。
  - 如果要建立應用程式，則只需在資料夾中執行`jhipster import-jdl my_file.jdl`。
  
*沒錯！*，您完成了！

如果您在團隊中工作，也許您希望擁有多個檔案而不是一個檔案。
我們新增了此選項，因此您不必手動將所有檔案合併在一起，
而只需執行即可。

    jhipster import-jdl my_file1.jdl my_file2.jdl

如果不想在匯入JDL時重新生成實體，則可以使用`--json-only`標誌跳過實體建立部分，僅在`.jhipster`資料夾中建立json檔案。

    jhipster import-jdl ./my-jdl-file.jdl --json-only

預設情況下，`import-jdl`僅重新生成已更改的實體，如果要重新生成所有實體，則傳遞`--force` 標誌。
請注意，這將覆蓋您對實體檔案的所有本地更改

    jhipster import-jdl ./my-jdl-file.jdl --force

如果要在專案中使用它，可以透過執行以下操作來新增它：
  - NPM: `npm install jhipster-core --save`
  - Yarn: `yarn add jhipster-core`

將其安裝在本地，並將其儲存在`package.json`檔案中。

###  <a name="exportingjdl"></a> 匯出到JDL檔案

如果您的應用程式中已經有實體並且希望擁有JDL檔案，請不要擔心！您無需從頭開始編寫它，因為有一個子產生器可以為您完成此任務。

只需在應用程式的根資料夾中執行`jhipster export-jdl <FILE_NAME>`，即可將所有實體，關係和選項匯出到單個JDL檔案中。
注意：您也可以不能為子產生器提供檔案名，其將選擇預設名稱。

---

## <a name="jdllanguage"></a> 語言
我們試圖使語法對開發人員儘可能友好。
您可以使用它們執行以下操作：
  - 使用選項和實體宣告應用程式，
  - 宣告實體及其屬性，
  - 宣告他們之間的關係，
  - 並宣告一些JHipster特定的選項。

如果您想檢視JDL的語法，[這裡](https://github.com/jhipster/jhipster-core/blob/master/lib/dsl/gen/grammar.html).有一個HTML檔案。


### <a name="applicationdeclaration"></a> 應用宣告

從v2.0.0開始，可以進行應用程式宣告（與JHipster v5相容）。

_要匯入一個或多個應用程式，您不必位於JHipster應用程式資料夾中。_

最基本的宣告如下：s

```
application {
  config {}
}
```

JHipster應用程式帶有一個預設設定，
並且使用預先的語法將確保您的應用程式使用預設值（就像您沒有做出任何特定選擇一樣）。
生成的應用程式將具有：

  - baseName: `jhipster`
  - applicationType: `monolith`
  - databaseType: `sql`
  - etc.

現在，如果您需要一些自定義選項：

```
application {
  config {
    baseName myapp
    applicationType microservice
    prodDatabaseType postgresql
    buildTool gradle
  }
}
```

這些選項只是JDL中可用選項的一個範例。
選項的完整清單在[此處](#annexes)的附件中。

如果您需要多個應用程式，請按以下步驟操作：

```
application { // 將在『 myFirstApp』資料夾下生成
  config {
    baseName myFirstApp
  }
}

application { // 將在『 mySecondApp』資料夾下生成
  config {
    baseName mySecondApp
    applicationType microservice
  }
}
```

您可以在任意數量的檔案中擁有任意數量的應用程式：沒有限制。

宣告實體是最基本的方法，
現在您可以設定要在所需的應用程式中生成的實體。

讓我們改進前面的範例：

```
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

現在，生成這些應用程式和資料夾時將發生幾件事：
  - 將建立四個應用程式：
    - myMonolith位於`./myMonolith`，伺服器端口為`8080`
    - myGateway位於`./myGateway`，伺服器端口為`9042`
    - microserviceA位於`./microserviceA`，伺服器端口為`8081`
      - 即使我們未指定伺服器端口，JHipster也會預設設定一個連接埠。
      - 對於微服務，預設值是`8081`
      - 對於閘道器和整體而言，它是`8080`
      - 對於UAA應用，為9999
    - microserviceB位於`./microserviceB`，伺服器端口為`8082`
  - 將生成四個實體
    - monolith中的`A`和`B`
    - 閘道器中的`C`和`D`
      - 第一個微服務中的`C`
      - 第二個微服務中的`D`
  - `microservice`選項對於`C`和`D`是隱式的
    - 由於它們是在兩個微服務上生成的，因此預設情況下將設定此選項。
  - 選項的工作方式與以前相同

請注意，如果預設值不存在，則產生器會設定預設值（例如`databaseType`）。

JHipster核心功能完全相同。

### <a name="entitydeclaration"></a> 實體宣告

實體宣告如下：

    entity <entity name> {
      <field name> <type> [<validation>*]
    }

  - `<entity name>` 是實體的名稱，
  - `<field name>` 實體一個欄位的名稱，
  - `<type>` JHipster支援的欄位型別，
  - 以及作為`<validation>`選項的欄位驗證。

可能的型別和驗證可參照[此處](#annexes)，如果驗證需要一個值，只需在驗證名稱後新增（<value>）。

這是一個JDL程式碼範例：

```
entity A
entity B
entity C
entity D {
  name String required
  address String required maxlength(100)
  age Integer required min(18)
}
```

正則表示式有點特殊，它們的用法如下（來自v1.3.6）：

```
entity A {
  myString String required minlength(1) maxlength(42) pattern(/[A-Z]+/)
}
```
如果您使用的是v4.9.X之前的產生器，則需要使用像這種模式`pattern('[A-Z]+'`)。

因為JDL的易於使用和可讀，所以如果您的實體為空（無欄位），則只需宣告`entity A`或`entity A {}`即可。

請注意，JHipster新增了預設的`id`欄位，因此您不必擔心。

### <a name="relationshipdeclaration"></a> 關係宣告

關係宣告如下：

    relationship (OneToMany | ManyToOne | OneToOne | ManyToMany) {
      <from entity>[{<relationship name>[(<display field>)]}] to <to entity>[{<relationship name>[(<display field>)]}]
    }

  - `(OneToMany | ManyToOne| OneToOne | ManyToMany)`是關係型別
  - `<from entity>`是關係的實體所有者的名稱：來源，
  - `<to entity>` 是關係要到達的實體的名稱：目的地，
  - `<relationship name>` 是具有另一端型別的欄位名稱，
  - `<display field>` 是應顯示在選擇框中的欄位名稱（預設值：`id`），
  - `required` 是否欄位是必須的
  - `with jpaDerivedIdentifier` `@MapsId`是否用於關聯（僅適用於一對一）

這是一個簡單的範例：

    entity Book
    entity Author

    relationship ManyToOne {
      Book to Author
    }

宣告外鍵欄位是可選的，因為預設情況下會根據需要設定一個（或兩個）。
前面的範例與此等效：

    entity Book
    entity Author

    relationship ManyToOne {
      Book{author} to Author
    }

讓我們舉個更復雜的例子。
一本書必需有一個作者，一個作者可以寫幾本書。

    entity Book
    entity Author {
      name String required
    }

    relationship OneToMany {
      Author{book} to Book{writer(name) required}
    }

在這裡，`Book`類將具有一個名為`writer` 的**必填**欄位，該欄位將透過`Author`的`name`欄位進行連線。

當然，在實際情況下，實體間將有很多關係，總是寫相同的三行可能很乏味。因此，您可以參照以下內容來宣告：

```
entity A
entity B
entity C
entity D

relationship OneToOne {
  A{b} to B{a}
  B{c} to C
}
relationship ManyToMany {
  A{d} to D{a}
  C{d} to D{c}
}
```

預設始終使用`id`欄位完成連線，該欄位也是在前端編輯關係時顯示的預設欄位。如果需要顯示另一個欄位，則可以這樣指定：

```
entity A {
  name String required
}
entity B


relationship OneToOne {
  A{b} to B{a(name)}
}
```

JPA Derived Identifier-@MapsId可以宣告為以下形式，當前僅一對一支援：

```
entity A {
  name String required
}
entity B


relationship OneToOne {
  A{b} to B{a(name)} with jpaDerivedIdentifier
}
```

這使得JHipster生成一個REST資源，該資源將連線實體的`id`和`name`都回傳到前端，因此可以將名稱顯示給使用者。

### <a name="enumerationdeclaration"></a> 列舉

要使用JDL列舉，請執行以下操作：

- 在檔案中的相應位置宣告一個列舉：

        enum Language {
          FRENCH, ENGLISH, SPANISH
        }

- 在實體中，新增以Enum作為型別的欄位：

        entity Book {
          title String required,
          description String,
          language Language
        }


### <a name="blobdeclaration"></a> Blob (byte[])
JHipster提供了可以在影象型別或任何二進位型別之間進行自由選擇的選項。JDL允許您執行相同的操作。只需使用編輯器就可以建立一個自定義類型（請參見DataType），然後根據以下約定對其進行命名：
  - `AnyBlob`或`Blob`建立一個任意二進位型別欄位;
  - `ImageBlob`建立一個標識為圖片二進位欄位。
  - `TextBlob`建立CLOB（長文字）欄位。

您可以根據需要，建立任意數量的資料型別。

### <a name="optiondeclaration"></a> 選項宣告

在JHipster中，您可以為實體指定選項，例如分頁或DTO。
在JDL中您可以執行相同的操作：

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

關鍵字`dto`, `paginate`, `service`和`with`已被新增到語法中來以支援這些修改。如果指定了錯誤的選項，JDL會用紅色的訊息通知您，並且會忽略這個錯誤的選項，避免損壞JHipster的JSON檔案。

#### 服務選項

指定的服務不會建立將直接呼叫repository介面的resource類。這是預設和最簡單的選項，請參閱A。
帶有serviceClass的Service（請參見B）將使資源呼叫服務類別，後者將呼叫repository介面。
帶serviceImpl的Service（請參閱C）將建立一個服務介面，
該介面將由資源類使用。該介面由將呼叫儲存庫介面的具體類實現。

除非確定，否則不使用任何服務，這對CRUD來說是最簡單的選擇。如果您將有很多業務邏輯，這些業務邏輯將使用多個儲存庫，則非常適合將服務與類一起使用，這使其成為服務類別的理想選擇。Jhipster不喜歡不需要的介面，但是如果您喜歡它們，請使用impl進行服務。

    entity A
    entity B
    entity C

    // no service for A
    service B with serviceClass
    service C with serviceImpl


JDL還支援批次設定選項。可以這樣做：

    entity A
    entity B
    ...
    entity Z

    dto * with mapstruct
    service all with serviceImpl
    paginate C with pagination

請注意，`*`和`all`是等效的。
最新版本引入了排除功能（在為每個實體設定選項時，這是一個功能強大的選項）：

    entity A
    entity B
    ...
    entity Z

    dto * with mapstruct except A
    service all with serviceImpl except A, B, C
    paginate C with pagination

使用JHipster，您還可以設定是否不需要任何用戶端程式碼或伺服器程式碼。
即使您想在與Angular相關的檔案中新增字尾，也可以在JHipster中操作。
可以在每個實體的基礎上啟用[Filtering](https://www.jhipster.tech/entities-filtering/)選項：filter `<entity name>`，或對於所有實體：filter `*`。
在您的JDL檔案中，只需新增以下幾行即可：
```
entity A
entity B
entity C

skipClient A
skipServer B
angularSuffix * with mySuperEntities
filter C
```

最後，還可以指定表名（預設使用實體名稱）：

```
entity A // A is the table's name here
entity B (the_best_entity) // the_best_entity is the table's name
```


### <a name="microserviceoptions"></a> 與微服務相關的選項

從JHipster v3開始可以建立微服務。您可以指定一些選項以在JDL中生成您的實體：微服務的名稱和搜尋引擎。
您可以透過以下方法指定微服務的名稱（JHipster應用的名稱）：

```
entity A
entity B
entity C

microservice * with mysuperjhipsterapp except C
microservice C with myotherjhipsterapp
search * with elasticsearch except C
```

第一個選項用於告訴JHipster您希望微服務處理您的實體，而第二個選項指定如何，以及是否希望搜尋實體。

### <a name="annotations"></a> 註解

從JHipster v5開始可以使用註解。註解與Java中的功能類似，因此註解的工作方式相同，因此您可以使用註解選項對實體進行註解。

以這個JDL程式碼為例：
```
entity A
entity B
entity C

dto C with mapstruct
paginate * with pager except C
search A with elasticsearch
```

這與註解等效：

```
@paginate(pager)
@search(elasticsearch)
entity A

@paginate(pager)
entity B

@dto(mapstruct)
entity C
```

儘管新增的程式碼多於實際刪除的程式碼，但在使用多個JDL檔案（例如用於微服務）時，它實際上很有用。

### <a name="deploymentdeclaration"></a> 部署宣告

從v3.6.0開始，可以進行部署宣告（與JHipster v5.7或更高版本相容）。

_要匯入一個或多個部署，您不必位於JHipster應用程式資料夾中。_

最基本的宣告如下：

```
deployment {
  deploymentType docker-compose
  appsFolders [foo, bar]
  dockerRepositoryName "yourDockerLoginName"
}
```

JHipster部署的設定具有所有其他屬性的預設值，並且使用以前的語法將確保您的部署將使用預設值（就像您沒有做出任何特定選擇一樣）。
最終的部署將具有：
The resulting deployment will have:
  - deploymentType: `docker-compose`
  - appsFolders: `foo, bar`
  - dockerRepositoryName: `yourDockerLoginName`
  - serviceDiscoveryType: `eureka`
  - gatewayType: `zuul`
  - directoryPath: `../`
  - etc.

現在，如果您需要一些自定義選項：

```
deployment {
  deploymentType kubernetes
  appsFolders [store, invoice, notification, product]
  dockerRepositoryName "yourDockerLoginName"
  serviceDiscoveryType no
  istio autoInjection
  kubernetesServiceType Ingress
  kubernetesNamespace jhipster
  ingressDomain "jhipster.192.168.99.100.nip.io"
}
```

這些選項只是JDL中可用選項的一個範例。選項的完整清單在[此處](#annexes)的附件中。

如果您需要多個部署，請按以下步驟進行：

```
// will be created under 'docker-compose' folder
deployment {
  deploymentType docker-compose
  appsFolders [foo, bar]
  dockerRepositoryName "yourDockerLoginName"
}

// will be created under 'kubernetes' folder
deployment {
  deploymentType kubernetes
  appsFolders [foo, bar]
  dockerRepositoryName "yourDockerLoginName"
}
```

You can have one deployment per deploymentType. The applications defined in `appsFolders` should be in the same folder where you are creating deployments or in the folder defined in `directoryPath`. For example for above you need to have a folder structure like this

每個DeploymentType可以有一個部署。`appsFolders`中定義的應用程式應位於建立部署所在的資料夾中，或位於`directoryPath`中定義的資料夾中。例如，對於上面的範例，您需要具有這樣的資料夾結構

```
.
├── yourJdlFile.jdl
├── foo
├── bar
├── kubernetes // will created by the JDL
└── docker-compose // will created by the JDL
```

## <a name="commentingjdl"></a> 註解 & Javadoc

可以將Javadoc和註解新增到JDL檔案。

就像在Java中一樣，此範例示範了如何新增Javadoc註解：

    /**
     * Class comments.
     * @author The JHipster team.
     */
    entity MyEntity { // another form of comment
      /** A required attribute */
      myField String required
      mySecondField String // another form of comment
    }

    /**
     * Second entity.
     */
    entity MySecondEntity {}

    relationship OneToMany {
      /** This is possible too! */
      MyEntity{mySecondEntity}
      to
      /**
       * And this too!
       */
      MySecondEntity{myEntity}
    }

這些註解稍後將由JHipster新增為Javadoc註解。

JDL內部一種型別評論：

    // an ignored comment
    /** not an ignored comment */

因此，以 `// `開頭的任何內容都被視為JDL的內部註解，因此不會被視為Javadoc。

請注意，在解析期間，以 `#`開頭的JDL Studio指令將被忽略。

註解的另一種形式是以下註解：
```
entity A {
  name String /** My super field */
  count Integer /** My other super field */
}
```

在這裡，A的名稱將用`My super field`進行註解，B則用`My other super field`進行註解。
是的，逗號不是強制性的，但最好使用逗號，以免在程式碼中犯錯誤。
如果您想混合使用逗號和以下註解，請當心！
```
entity A {
  name String, /** My comment */
  count Integer
}
```

A的名字將不會有評論，因為count欄位會有。

## <a name="jdlrelationships"></a>所有關係

有關如何使用JDL建立關係的說明。

### 一對一

雙向關係，其中汽車有駕駛員，而駕駛員也有汽車。

    entity Driver
    entity Car
    relationship OneToOne {
      Car{driver} to Driver{car}
    }

一個單向範例，一個公民擁有一個護照，但該護照無法獨佔其所有者。

    entity Citizen
    entity Passport
    relationship OneToOne {
      Citizen to Passport
    }

    // using @MapsId
    relationship OneToOne {
          Citizen to Passport with jpaDerivedIdentifier
    }

### 一對多

雙向關係，其中所有者0個，一個或多個Car物件，並且Car知道其所有者。

    entity Owner
    entity Car
    relationship OneToMany {
      Owner{car} to Car{owner}
    }

JHipster不支援一對多的單向版本，但是看起來像這樣：

    entity Owner
    entity Car
    relationship OneToMany {
      Owner to Car
    }


### 多對一

一對多關係的相反版本，
汽車認識車主的單向版本：

    entity Owner
    entity Car
    relationship ManyToOne {
      Car to Owner
    }


### 多對多

最後，在此範例中，我們的汽車知道其駕駛員，並且駕駛員物件也可以訪問其汽車。

    entity Driver
    entity Car
    relationship ManyToMany {
      Car{driver} to Driver{car}
    }

請注意，關係的擁有方必須在左側

## <a name="constants"></a>常數

從JHipster Core v1.2.7開始，JDL支援數字常數。
這是一個例子：

```
DEFAULT_MIN_LENGTH = 1
DEFAULT_MAX_LENGTH = 42
DEFAULT_MIN_BYTES = 20
DEFAULT_MAX_BYTES = 40
DEFAULT_MIN = 0
DEFAULT_MAX = 41

entity A {
  name String minlength(DEFAULT_MIN_LENGTH) maxlength(DEFAULT_MAX_LENGTH)
  content TextBlob required
  count Integer min(DEFAULT_MIN) max(DEFAULT_MAX)
}
```

## <a name="workflows"></a>工作流程

## <a name="workflow_monolith"></a>Monolith工作流程

這裡沒有特殊的工作流程：
  - 建立你的應用
  - 建立您的JDL檔案
  - 匯入

## <a name="workflow_microservice"></a>微服務工作流程

處理微服務有點棘手，但是JDL為您提供了一些處理您認為合適的實體選項。

透過`microservice <ENTITIES> with <MICROSERVICE_APP_NAME>`，您可以指定在哪個微服務中生成哪個實體。
以以下設定為例：
```
entity A
entity B
entity C

microservice A with firstMS
microservice B with secondMS
```

給定兩個JHipster應用程式（'firstMS'和'secondMS'），如果在兩個應用程式中匯入JDL檔案，將獲得以下內容：
  - 在'firstMS'中，將生成實體`A`和`C`。
  - 在'secondMS'中，將生成實體`B`和`C`。

兩者都會生成`C` ，因為如果沒有微服務選項指定該實體的生成位置，那麼它將在各處生成。
如果您決定將這個JDL匯入Monolith應用程式中，則會生成每個實體（Monolith在JDL中沒有限制選項）。

注意：如果要在兩個不同的微服務中生成同一實體，則可以編寫兩個JDL檔案而不是每次更新JDL檔案。

前面的範例不能這樣寫：
``` 
entity A
entity B
entity C

microservice * except B with firstMS
microservice * except A with secondMS
```
結果如下：
  - 在'firstMS'，只會生成實體 `C` 
  - 在'secondMS'中，將生成實體`B`和`C`。這是因為，在解析時，如果一個選項與另一個選項重疊，則後者優先。

您還可以使用JDL建立整個微服務框架，例如，請[參考此部落格文章](https://medium.com/@deepu105/create-full-microservice-stack-using-jhipster-domain-language-under-30-minutes-ecc6e7fc3f77)。

---

## <a name="annexes"></a>備註

## <a name="application_options">可用的應用程式選項

這是JDL支援的應用程式選項：

<table class="table table-striped table-responsive">
  <tr>
    <th>JDL選項名稱</th>
    <th>預設值</th>
    <th>可選值</th>
    <th>備註</th>
  </tr>
  <tr>
    <td>applicationType</td>
    <td>monolith</td>
    <td>monolith, microservice, gateway, uaa</td>
    <td></td>
  </tr>
  <tr>
    <td>authenticationType</td>
    <td>jwt or uaa</td>
    <td>jwt, session, uaa, oauth2</td>
    <td>uaa指定UAA應用，否則為jwt</td>
  </tr>
  <tr>
    <td>baseName</td>
    <td>jhipster</td>
    <td></td>
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
    <td>ehcache, hazelcast, infinispan, no</td>
    <td>用於整體和閘道器的ehcache，否則為hazelcast</td>
  </tr>
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
    <td>您可以輸入所需的任何值，前提是您知道它會起作用（例如dark或light），也可以為空</td>
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
    <td>* + prod資料庫型別</td>
  </tr>
  <tr>
    <td>dtoSuffix</td>
    <td>DTO</td>
    <td></td>
    <td>DTO的字尾。對於空字串，為false。</td>
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
    <td>實體的字尾。對於空字串，為false。</td>
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
    <td>JHipster中可用的語言</td>
    <td>Braces are mandatory</td>
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
    <td>設定packageFolder選項</td>
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
    <td>true</td>
    <td></td>
    <td></td>
  </tr>
  <tr>
    <td>testFrameworks</td>
    <td>[]</td>
    <td>protractor, cucumber, gatling</td>
    <td>Braces mandatory</td>
  </tr>
  <tr>
    <td>uaaBaseName</td>
    <td></td>
    <td></td>
    <td>如果auth型別為uaa，則對於閘道器和微服務是必需的，必須在包含雙引號之間</td>
  </tr>
  <tr>
    <td>useSass</td>
    <td>false</td>
    <td></td>
    <td></td>
  </tr>
  <tr>
    <td>websocket</td>
    <td>false</td>
    <td>spring-websocket, false</td>
    <td></td>
  </tr>
</table>

---

## <a name="deployment_options">可用的部署選項

這是JDL支援的應用程式選項：

<table class="table table-striped table-responsive">
  <tr>
    <th>JDL選項名稱</th>
    <th>預設值</th>
    <th>可選值</th>
    <th>備註</th>
  </tr>
  <tr>
    <td>deploymentType</td>
    <td>docker-compose</td>
    <td>docker-compose, kubernetes, openshift</td>
    <td></td>
  </tr>
  <tr>
    <td>directoryPath</td>
    <td>"../"</td>
    <td></td>
    <td>相對路徑。必須用雙引號括起來</td>
  </tr>
  <tr>
    <td>appsFolders</td>
    <td>[]</td>
    <td></td>
    <td>應用程式的目錄名稱，以逗號分隔。必須是清單，例如[foo，bar]</td>
  </tr>
  <tr>
    <td>clusteredDbApps</td>
    <td>[]</td>
    <td></td>
    <td>具有叢集資料庫的應用程式的目錄名稱，以逗號分隔。必須是清單，例如[foo，bar]</td>
  </tr>
  <tr>
    <td>gatewayType</td>
    <td>zuul</td>
    <td>zuul, traefik</td>
    <td>當serviceDiscoveryType為`no`時，將忽略該值</td>
  </tr>
  <tr>
    <td>monitoring</td>
    <td>no</td>
    <td>no, elk, prometheus</td>
    <td></td>
  </tr>
  <tr>
    <td>consoleOptions</td>
    <td>[]</td>
    <td>[curator, zipkin]</td>
    <td>必須是清單</td>
  </tr>
  <tr>
    <td>serviceDiscoveryType</td>
    <td>eureka</td>
    <td>eureka, consul, no</td>
    <td></td>
  </tr>
  <tr>
    <td>dockerRepositoryName</td>
    <td></td>
    <td></td>
    <td>docker倉庫的名稱或URL。必須用雙引號括起來</td>
  </tr>
  <tr>
    <td>dockerPushCommand</td>
    <td>"docker push"</td>
    <td></td>
    <td>要使用的docker push指令。必須用雙引號括起來</td>
  </tr>
  <tr>
    <td>kubernetesNamespace</td>
    <td>default</td>
    <td></td>
    <td>僅當DeploymentType為kubernetes時適用</td>
  </tr>
  <tr>
    <td>kubernetesServiceType</td>
    <td>LoadBalancer</td>
    <td>LoadBalancer, NodePort, Ingress</td>
    <td>僅當DeploymentType為kubernetes時適用</td>
  </tr>
  <tr>
    <td>ingressDomain</td>
    <td></td>
    <td></td>
    <td>設定Ingress Domain, 當kubernetesServiceType為`Ingress`時，。必須用雙引號引起來。僅當DeploymentType為kubernetes時適用</td>
  </tr>
  <tr>
    <td>istio</td>
    <td>no</td>
    <td>no, manualInjection, autoInjection</td>
    <td>僅當DeploymentType為kubernetes時適用</td>
  </tr>
  <tr>
    <td>openshiftNamespace</td>
    <td>default</td>
    <td></td>
    <td>僅當DeploymentType為openshift時適用</td>
  </tr>
  <tr>
    <td>storageType</td>
    <td>ephemeral</td>
    <td>ephemeral, persistent</td>
    <td>僅當DeploymentType為openshift時適用</td>
  </tr>
</table>

## <a name="types_and_constraints"></a>可用的欄位型別和約束

以下是JDL支援的型別：

常用資料庫：
  - PostgreSQL
  - MySQL
  - MariaDB
  - Oracle
  - MsSQL
  - MongoDB
  - Couchbase

<table class="table table-striped table-responsive">
  <tr>
    <th>通用資料庫</th>
    <th>Cassandra</th>
    <th>驗證方式</th>
  </tr>
  <tr>
    <td>String</td>
    <td>String</td>
    <td><dfn>required, minlength, maxlength, pattern, unique</dfn></td>
  </tr>
  <tr>
    <td>Integer</td>
    <td>Integer</td>
    <td><dfn>required, min, max, unique</dfn></td>
  </tr>
  <tr>
    <td>Long</td>
    <td>Long</td>
    <td><dfn>required, min, max, unique</dfn></td>
  </tr>
  <tr>
    <td>BigDecimal</td>
    <td>BigDecimal</td>
    <td><dfn>required, min, max, unique</dfn></td>
  </tr>
  <tr>
    <td>Float</td>
    <td>Float</td>
    <td><dfn>required, min, max, unique</dfn></td>
  </tr>
  <tr>
    <td>Double</td>
    <td>Double</td>
    <td><dfn>required, min, max, unique</dfn></td>
  </tr>
  <tr>
    <td>Enum</td>
    <td></td>
    <td><dfn>required, unique</dfn></td>
  </tr>
  <tr>
    <td>Boolean</td>
    <td>Boolean</td>
    <td>required, unique</td>
  </tr>
  <tr>
    <td>LocalDate</td>
    <td></td>
    <td><dfn>required, unique</dfn></td>
  </tr>
  <tr>
    <td></td>
    <td>Date</td>
    <td><dfn>required, unique</dfn></td>
  </tr>
  <tr>
    <td>ZonedDateTime</td>
    <td></td>
    <td><dfn>required, unique</dfn></td>
  </tr>
  <tr>
    <td>Duration</td>
    <td></td>
    <td><dfn>required, unique</dfn></td>
  </tr>
  <tr>
    <td>UUID</td>
    <td>UUID</td>
    <td><dfn>required, unique</dfn></td>
  </tr>
  <tr>
    <td>Blob</td>
    <td></td>
    <td><dfn>required, minbytes, maxbytes, unique</dfn></td>
  </tr>
  <tr>
    <td>AnyBlob</td>
    <td></td>
    <td><dfn>required, minbytes, maxbytes, unique</dfn></td>
  </tr>
  <tr>
    <td>ImageBlob</td>
    <td></td>
    <td><dfn>required, minbytes, maxbytes, unique</dfn></td>
  </tr>
  <tr>
    <td>TextBlob</td>
    <td></td>
    <td><dfn>required, unique</dfn></td>
  </tr>
  <tr>
    <td>Instant</td>
    <td>Instant</td>
    <td><dfn>required, unique</dfn></td>
  </tr>
</table>

---

## <a name="all_options"></a> 可用選項

### 一元選項

這些選項不需要指定值：
  - `skipClient`
  - `skipServer`
  - `noFluentMethod`
  - `filter`

可以這樣使用它們：`<OPTION> <ENTITIES | * | all> except? <ENTITIES>`

### 二元選項

這些選項採用以下值：
  - `dto` (`mapstruct`)
  - `service` (`serviceClass`, `serviceImpl`)
  - `paginate` (`pager`, `pagination`, `infinite-scroll`)
  - `search` (`elasticsearch`)
  - `microservice` (自定義值)
  - `angularSuffix` (自定義值)
  - `clientRootFolder` (自定義值)

---

## <a name="troubleshooting"></a>故障排除

### 對應MS baseName時，JDL匯入僅找到一個實體

這是解析系統的已知問題，解決它很棘手。
顯而易見的解決方法是為微服務和內部實體使用不同的名稱。

有關更多訊息，請參見[JHipster Core issue #308](https://github.com/jhipster/jhipster-core/issues/308)。

---

## <a name="issues"></a>問題與錯誤

JDL[在GitHub上可用](https://github.com/jhipster/jhipster-core)，並[遵循與JHipster相同的貢獻準則]( https://github.com/jhipster/generator-jhipster/blob/master/CONTRIBUTING.md)。

請使用我們的專案送出有關函式庫本身的問題和Pull Requests。

- [JDL issue tracker](https://github.com/jhipster/jhipster-core/issues)
- [JDL Pull Requests](https://github.com/jhipster/jhipster-core/pulls)

送出任何內容時，您都必須儘可能精確：
  - **一個isuue必須只包含一個問題** (一個需求或一個問題);  
  - 歡迎Pull requests，但是送出日誌必須簡潔明瞭，具有'原子'可讀性。
