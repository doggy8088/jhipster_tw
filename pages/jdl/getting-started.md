---
layout: default
title: JHipster 領域語言 (JDL) - 入門指南
permalink: /jdl/getting-started
sitemap:
  priority: 0.5
  lastmod: 2021-03-08T12:00:00-00:00
---

# <i class="fa fa-star"></i> JHipster 領域語言 (JDL) - 入門指南

## 概要

在此頁面中，您將瞭解JDL以及如何建立應用程式及其相關的所有內容。

1. [生成內容](#生成內容)
   1. [使用檔案](#使用檔案)
   1. [使用單行JDL](#使用單行JDL)
1. [生成應用](#生成應用)
1. [生成實體](#生成實體)
1. [生成屬性](#生成屬性)
1. [列舉](#列舉)
1. [關聯關係](#關聯關係)
1. [選項](#選項)
1. [部署](#部署)
1. [常數](#常數)
1. [匯出JDL](#匯出JDL)

---

## 生成內容

### 使用檔案

您可以使用JDL檔案生成實體，過程如下：

- 建立副檔名為『 .jh』或『 .jdl』的檔案，
- 宣告您的應用程式，部署，實體和關係，或者使用 [JDL-Studio](https://start.jhipster.tech/jdl-studio/) 或 [JHipster IDE](https://www.jhipster.tech/jhipster-ide/)建立和下載檔案，
- 如果僅建立實體，則在JHipster應用程式的根資料夾中執行`jhipster jdl my_file.jdl`。
- 如果要建立應用程式，請在資料夾中執行『 jhipster jdl my_file.jdl』。

_至此_，大功告成！

如果您在團隊中工作，也許你有多個檔案而不是一個檔案。
我們新增了此選項，以便您不必手動將所有檔案連線為一個檔案，而只要執行：

    jhipster jdl my_file1.jdl my_file2.jdl

如果您不想在匯入JDL時重新生成實體，則可以使用`--json-only`標誌來跳過實體建立部分，僅在`.jhipster`資料夾中建立json檔案。

    jhipster jdl ./my-jdl-file.jdl --json-only

預設情況下，`jdl`僅重新生成已更改的實體。如果您希望重新生成所有實體，然後傳遞`--force`標誌。
請注意，這將覆蓋您對實體檔案的所有本地更改：

    jhipster jdl ./my-jdl-file.jdl --force

如果要在專案中使用它，可以透過執行以下操作來新增它：

- NPM: `npm install jhipster-core --save`
- Yarn: `yarn add jhipster-core`

在本地安裝，並將其儲存在您的`package.json` 檔案中。

---

### 使用單行JDL

生成程式碼的另一種方法是在CLI中傳遞JDL程式碼，方法是：
`jhipster jdl --inline "application { config { baseName jhipster, applicationType microservice } }"`.

生成實體時，這種生成程式碼的方式特別有用。

---

現在，我們將從一個小的JDL內容開始，以瞭解生成內容的各種方法。
其他部分將對語法進行說明，但此處將重點介紹產生器。

這是我們將使用的基本內容：

```jdl
application {
  config {
    baseName jhipster
    applicationType microservice
  }
}
```

這是一個非常基本的微服務應用程式，名為『 jhipster』，我們將看到從該範例生成應用程式的各種方法。

您將看到，透過這個小範例，您已經成功地從頭建立了一個應用程式。

---

## 使用遠端JDL檔案

您也可以在`jdl`指令中使用URL。 只需傳遞URL而不是檔案名，如下所示

```
jhipster jdl https://my-site.com/my.jdl


jhipster jdl https://gist.githubusercontent.com/user/id/raw/id/myapp.jdl
```

您還可以僅透過指定檔案名從我們的[JDL範例倉庫]（https://github.com/jhipster/jdl-samples）獲取遠端JDL檔案，我們將自動解析URL。

```
jhipster jdl default.jdl
```

## 生成應用

正如我們在前面的範例中看到的那樣，生成應用程式非常簡單，讓我們以前麵的範例為基礎，並向其中新增更多內容：

```jdl
application {
  config {
    baseName jhipster
    applicationType microservice
    serverPort 4242
    buildTool gradle
  }
}
```

讓我們分解一下：

- `application` 是你要宣告一個應用程式的關鍵字
- `config` 是你要指定設定
  - 稍後會看到你還可以在應用程式中宣告實體
- `baseName`, `applicationType`等是設定應用程式的關鍵字

這就是使用JDL建立應用程式的方式。
要檢視所有受支援的應用程式選項，請轉到 [應用生成](/jdl/applications).

---

## 生成實體

生成實體可能沒有想像的那麼簡單。
您也可以去 [實體和屬性](/jdl/entities-fields) 進一步瞭解您可以對實體執行的操作。

### 生成基本實體

```jdl
entity A
```

該實體沒有屬性，甚至沒有明確的表名（即便JHipster從該實體的名稱自動設定了一個表名）。
這是宣告實體的最簡單方法。

請注意，此形式等效於：

```jdl
entity A(a) {}
```

我們新增了資料庫表名和大括號。
預設情況下，JHipster基於指定的實體名稱生成表名稱。

宣告實體的屬性時需要大括號。

### 新增註解

這是給實體新增註解的方法：

```jdl
/**
 * This is a simple entity
 */
entity A
```

如果後端使用Java，則將新增Javadoc註解。

### 應用中的實體

僅在應用程式中生成某些實體，可以使用`entities`關鍵字：

```jdl
application {
  config {}
  entities A, B
}

application {
  config {}
  entities C
}

entity A
entity B
entity C
```

這在微服務架構中特別有用。

---

## 生成屬性

在實體中宣告屬性，需要宣告實體的結構體並在其中實現：

```jdl
entity MyEntity {
  name String
  closed Boolean
}
```

除以上兩種方法外，更多請檢視 [實體和屬性](/jdl/entities-fields).

### 新增註解和校驗

和註解新增到實體的方式相同，我們也可以將註解新增到欄位：

```jdl
entity MyEntity {
  /** My field */
  name String required minlength(2) maxlength(50)
}
```

校驗取決於屬性型別，有關校驗的詳細訊息，請參見 [實體和屬性](/jdl/entities-fields).

---

## 列舉

列舉是具有固定值的型別：

```jdl
enum Type {
  A,
  B(b)
}

entity E {
  name Type
}
```

注意列舉的值是如何可選的。

他們只有一個校驗規則：`required`。

你可以檢視更多關於 [列舉](/jdl/enums) 的詳細訊息。

---

## 關聯關係

實體之間的關係也是可用的，並使用關鍵字`relationship`宣告。

```jdl
entity A
entity B

relationship OneToOne {
  A{a} to B{b}
}
```

在此我們可以看到：

- `OneToOne` 是關係型別
  - 還有 `OneToMany`, `ManyToMany` 和 `ManyToOne`
- 我們宣告關係的來源和目的地（從 `A` 到 `B`）
- 我們還宣告了每個實體中的引入的屬性名（在`B`實體中為屬性`a`，在`A`實體中為屬性`b`）
  - 這意味著關係是雙向的，即：雙向一對一關聯關係。

要了解更多關於關係的詳細內容，你可以前往 [關聯關係](/managing_relationships).

### 單向關係還雙向關係？

你可能希望單向的關係，而不是雙向的，這取決於你如何設計你的模型。
可以透過不指定如下所示的引入屬性來實現：

```jdl
relationship OneToOne {
  A{a} to B
}
```

你可以都不指定引入的屬性名，預設情況下將至少引入一個（在源中）

```jdl
relationship OneToOne {
  A to B
}
```

### 關係註解和校驗

關係也有註解和校驗規則（只有`required`）：

```jdl
relationship OneToOne {
  A{a} to B{b required}
}
```

在此範例中，我們可以看到：

- `required` 指定是否需要關係的一方。
  - 代替0..1，這種一對一關係要求`b`不能為空。

要了解更多關於關係的內容，你可以去相應的 [關聯關係](/jdl/relationships)頁面。

---

## 選項

和在CLI中將選項應用於實體的方法相同，也可以在JDL中執行以下操作：

```jdl
entity A
entity B
entity C

readOnly A
dto * with mapstruct
service * with serviceImpl
paginate A, B with pager
```

下面發生的事情，讓你有意外的驚喜：

- `dto`、`paginate` 和 `service` 是二元選項，因為它們需要一個實體清單和一個值
  - `with` 用於指定選項值
  - 注意 `*` 意味著該選項將應用於所有實體
- `readOnly` 是一元選項，這意味著此類選項僅包含實體清單

宣告實體清單的方法有多種：

- 你可以一一列舉，如：`A, B, C`
- 您可以選擇所有的：`*` 或 `all`
  - 您可以指定排除某些實體： `service * with serviceImpl except A, B`

### 註解

註解是宣告選項的另一種方法，讓我們重寫前面的範例：

```jdl
@readOnly
@dto(mapstruct)
@service(serviceImpl)
@paginate(pager)
entity A

@dto(mapstruct)
@service(serviceImpl)
@paginate(pager)
entity B

@dto(mapstruct)
@service(serviceImpl)
entity C
```

類似於Java或Typescript，註解是"裝飾器"，是實體的選項。

此範例與先前的範例等效，因為它們可用於生成相同的程式碼。

要了解有關選項的更多訊息，您可以轉到 [選項](/jdl/options)

---

## 部署

最後，還可以使用`deployment`關鍵字從JDL檔案生成部署，該關鍵字與JHipster v5.7及更高版本相容：

```jdl
deployment {
  deploymentType docker-compose
  appsFolders [foo, bar]
  dockerRepositoryName "yourDockerLoginName"
}
```

_要匯入一個或多個部署，您不必位於JHipster應用程式資料夾中。_

有關部署的說明，請參見 [部署](/jdl/deployments).

一個JHipster部署具有對所有其他屬性的預設值的設定和使用以前的語法將確保您的部署將使用預設值（就像您沒有做出任何特定選擇一樣）。
最終的部署將具有：

- deploymentType: `docker-compose`
- appsFolders: `foo, bar`
- dockerRepositoryName: `yourDockerLoginName`
- serviceDiscoveryType: `eureka`
- gatewayType: `SpringCloudGateway`
- directoryPath: `../`
- 等等

現在，如果您需要一些自定義選項：

```jdl
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

這些選項只是JDL中可用選項的一個範例。
部署頁面上提供了完整的選項清單，請檢視 [部署](/jdl/deployments).

---

## 常數

JDL支援數字常數。
這是一個例子：

```jdl
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

---

## 匯出JDL

如果您的應用程式中已經有實體並且希望擁有JDL檔案，請不用擔心！ 您不必從頭開始，因為有一個子生成可以為您完成此任務。

在應用程式的根資料夾中執行 `jhipster export-jdl <FILE_NAME>` ，您將擁有所有應用程式、實體、關係和選項在單個JDL檔案中匯出。

注意：您也不能為子產生器提供檔案名，匯出的JDL檔案將以應用程式的基本名稱命名。 例如，如果您的應用程式名為`mySuperApp`，則您的JDL檔案將為`mySuperApp.jdl`。
