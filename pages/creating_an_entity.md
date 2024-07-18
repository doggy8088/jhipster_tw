---
layout: default
title: 建立一個實體
permalink: /creating-an-entity/
redirect_from:
  - /creating_an_entity.html
sitemap:
    priority: 0.7
    lastmod: 2018-09-04T00:00:00-00:00
---

# <i class="fa fa-bolt"></i> 建立一個實體

_**請檢視有關建立新JHipster應用程式的[影片教程]({{ site.url }}/video-tutorial/)！**_
如果要實時過載JavaScript/TypeScript程式碼，則需要執行`npm start`或`yarn start`。您可以轉到[在開發過程中使用JHipster]({{ site.url }}/development/)頁面以獲取更多訊息。

## 介紹

建立應用程式後，將需要建立 _實體_。例如，您可能要建立一個 _Author_ 和 _Book_ 實體。對於每個實體，您將需要：

*   資料庫表
*   Liquibase變更集
*   JPA實體
*   Spring Data JPA Repository
*   Spring MVC REST控制器，具有基本的CRUD操作
*   Angular路由器，元件和服務
*   HTML檢視
*   整合測試，以驗證一切正常
*   效能測試，看一切是否順利

如果您有多個實體，則可能需要在它們之間建立關係。為此，您將需要：

*   資料庫外鍵
*   用於管理這種關係的特定JavaScript和HTML程式碼

"entity"子產生器將建立所有必要的檔案，併為每個實體提供一個CRUD前端（請參閱[Angular專案結構]({{ site.url }}/using-angular/)和[React專案結構]({{ site.url }}/using-react/))）。可以透過執行`jhipster entity <entityName> --[options]`來呼叫子產生器。可以透過輸入`jhipster entity --help`找到這些選項的參考。

以下是受支援的選項。

*   `--table-name <table_name>` - 預設情況下，JHipster將根據您的實體名稱生成一個表名，如果您希望使用其他表名，則可以透過傳遞此選項來實現。
*   `--angular-suffix <suffix>` - 如果您希望所有Angular路由都具有自定義字尾，則可以使用此選項傳遞該字尾。
*   `--client-root-folder <folder-name>` - 指定前端側實體使用的根資料夾名稱。對於富應用和微服務中的閘道器，預設情況下為空。
*   `--regenerate` - 不詢問任何問題重新生成現有實體。
*   `--skip-server` - -這將跳過伺服器端程式碼，僅生成前端程式碼。
*   `--skip-client` - 這將跳過前端程式碼，僅生成伺服器端程式碼。
*   `--skip-db-changelog` - 這將跳過資料庫更改日誌的生成（對於SQL資料庫使用Liquibase）。
*   `--db` - -跳過伺服器端生成時，指定的資料庫，其他時候無效。

<div class="alert alert-warning"><i>注意: </i>

不要為您的實體選擇一個簡稱（請參見<a href="https://github.com/jhipster/generator-jhipster/issues/8446" target="_blank" rel="noopener">此問題</a>）。
</div>

## JHipster UML與JDL Studio

本頁介紹如何使用標準指令行介面透過JHipster建立實體。如果要建立多個實體，則可能更喜歡使用圖形界面工具。

在這種情況下，有兩個選項可用：

*   [JHipster UML]({{ site.url }}/jhipster-uml/), 它允許您使用UML編輯器。
*   [JDL Studio](https://start.jhipster.tech/jdl-studio/), 我們的線上工具，使用我們的領域特定語言[JDL]({{ site.url }}/jdl/)建立實體和關係。

如果您使用了JDL Studio：

*   您可以使用`jdl`子產生器透過執行`jhipster jdl your-jdl-file.jh`從JDL檔案生成實體。

    * 如果您不想在匯入JDL時重新生成實體，則可以使用`--json-only`標識來跳過實體建立部分，僅在`.jhipster`資料夾中生成json檔案。
    
    ```
    jhipster jdl ./my-jdl-file.jdl --json-only
    ```

    * 預設情況下， `jdl`僅重新生成已更改的實體，如果要重新生成所有實體，則傳遞`--force`標識。請注意，這將覆蓋您對實體檔案的所有本地更改

    ```
    jhipster jdl ./my-jdl-file.jdl --force
    ```

*   如果要使用JHipster UML代替`jdl`子產生器，則需要先透過執行`npm install -g jhipster-uml`來安裝它，然後執行`jhipster-uml yourFileName.jh`。

## Entity欄位

對於每個實體，您可以根據需要新增任意多個欄位。您將需要提供欄位名稱及其型別，JHipster將為您生成所有所需的程式碼和設定，從Angular的HTML檢視到Liquibase變更檔案。

這些欄位不包含您使用技術中的保留關鍵字。例如，如果您使用MySQL：
*   您不能使用Java保留關鍵字（因為您的程式碼將無法編譯）
*   您不能使用MySQL保留關鍵字（因為資料庫表結構更新將失敗）

## 欄位型別

JHipster支援許多欄位型別。這種支援取決於您的資料庫後端，因此我們使用Java型別來描述它們：Java`String`將以不同的方式儲存在Oracle或Cassandra中，這是JHipster的優勢之一，可以為您生成正確的資料庫訪問程式碼。
*   `String`: Java字串。它的預設大小取決於基礎後端（如果使用JPA，預設情況下為255），但是您可以使用校驗規則進行更改（例如，修改 `max`大小為1024）。
*   `Integer`: Java整數。
*   `Long`: Java長整數。
*   `Float`: Java浮點數.
*   `Double`: Java雙精度浮點數.
*   `BigDecimal`: [java.math.BigDecimal](https://docs.oracle.com/javase/8/docs/api/java/math/BigDecimal.html)物件, 當您需要精確的數學計算時使用（通常用於財務操作）。
*   `LocalDate`: [java.time.LocalDate](https://docs.oracle.com/javase/8/docs/api/java/time/LocalDate.html)物件, 用於正確管理Java中的日期。
*   `Instant`: [java.time.Instant](https://docs.oracle.com/javase/8/docs/api/java/time/Instant.html)物件, 用於表示時間戳，即時間線上的瞬時點。
*   `ZonedDateTime`: [java.time.ZonedDateTime](https://docs.oracle.com/javase/8/docs/api/java/time/ZonedDateTime.html)物件, 用於表示給定時區（通常是日曆中會議、約定）中的本地日期時間。請注意，REST和持久層都不支援時區，因此您很可能應該使用`Instant`。
*   `Duration`: [java.time.Duration](https://docs.oracle.com/javase/8/docs/api/java/time/Duration.html)物件, 用於表示時間量。
*   `UUID`: [java.util.UUID](https://docs.oracle.com/javase/8/docs/api/java/util/UUID.html)物件.  
*   `Boolean`: Java布林型.
*   `Enumeration`:Java列舉物件。選擇此類型後，子產生器將詢問您要在列舉中使用哪些值，並將建立一個特定的`enum`類來儲存它們。
*   `Blob`: Blob物件，用於儲存一些二進位資料。選擇此類型時，子產生器將詢問您是否要儲存通用二進位資料，影象物件或CLOB（長文字）。影象將專門在Angular側進行最佳化處理，因此可以將其正常顯示給最終使用者。

## 校驗

可以為每個欄位設定校驗。根據欄位型別，將提供不同的校驗選項。
    
校驗將在以下地方自動生成：

*   HTML檢視，使用Angular或React或Vue校驗機制
*   Java domain物件, 使用[Bean Validation](http://beanvalidation.org/)

然後，在以下情況下使用Bean校驗時，將使用它們進行自動校驗：

*   Spring MVC REST控制器(使用`@Valid`註解)
*   Hibernate/JPA (實體在儲存之前會自動進行校驗)

校驗訊息還將用於生成更精確的資料庫列元資料：

*   必填欄位將被標記為不可為空

*   唯一欄位將建立唯一約束

*   具有最大長度的欄位將具有相同的列長

校驗也有一些限制：

*   我們不支援Angular，React和Bean Validation的所有校驗選項，因為我們僅支援前端和後端API通用的選項
*   正則表示式模式在JavaScript和Java中的工作方式不同，因此，如果您設定了其中一個，則可能需要取調整另一個生成的模式。
*   JHipster會在不知道您的驗證規則的情況下生成適用於通用實體的單元測試：生成的測試可能未必能透過校驗規則。在這種情況下，您將需要更新單元測試中使用的範例資料，以使它們透過校驗規則。

## Entity關係

實體關係僅適用於SQL資料庫。這是一個相當複雜的話題，它具有自己單獨的文件頁面：[管理關係]({{ site.url }}/managing-relationships/)。

## 為您的業務邏輯生成單獨的服務類別

與單獨使用Spring REST控制器相比，擁有一個單獨的服務類別可以擁有更復雜的邏輯。擁有服務層（基於或不基於介面）將使您能夠使用DTO（請參閱下一節）。

這與使用[Spring服務子產生器]({{ site.url }}/creating-a-spring-service/)的邏輯相同，因此我們建議閱讀其文件以獲取更多訊息。

## 數據傳輸物件（DTO）

預設情況下，JHipster實體不使用DTO，但如果您選擇使用服務層，則可以將它們作為選項使用（請參見上一節）。這裡是使用文件：[使用DTO]({{ site.url }}/using-dtos/)。

## 過濾

（可選）可以使用JPA過濾儲存在SQL資料庫中的實體。這裡是文件：[篩選實體]({{ site.url }}/entities-filtering/)。

## 分頁

請注意，如果使用[Cassandra]({{ site.url }}/using-cassandra/)建立應用程式，則分頁不可用。它將在未來的版本中新增。

分頁使用[GitHub API](https://developer.github.com/v3/#pagination)中[the Link header](http://tools.ietf.org/html/rfc5988)規範，。JHipster在後端（Spring MVC REST）和前端（Angular / React）都提供了該規範的定製實現。

生成實體時，JHipster提供3個分頁選項：

*   沒有分頁（在這種情況下，後端將不會分頁）
*   基於[Bootstrap分頁元件](https://getbootstrap.com/docs/4.3/components/pagination/){: target="_blank"} 的完整分頁系統
*   基於[無限捲動指令](http://sroze.github.io/ngInfiniteScroll/) 的無限捲動系統

## 更新現有實體

實體設定儲存在`.jhipster`目錄中的特定`.json`檔案中。因此，如果使用現有實體名稱再次執行子產生器，則可以更新或重新生成實體。

當您為現有實體執行實體子產生器時，系統會詢問您『Do you want to update the entity? This will replace the existing files for this entity, all your custom code will be overwritten』(您確定需要更新實體嗎？這將替換該實體的現有檔案，所有自定義程式碼將被覆蓋)，並具有以下選項：

*   `Yes, re generate the entity` - 這將重新生成您的實體。提示：這可以透過在執行子產生器時傳遞`--regenerate`標誌來強制執行
*   `Yes, add more fields and relationships` - 這將需要您回答一些問題，以新增更多欄位和關係
*   `Yes, remove fields and relationships` - 這將需要您回答一些問題，以便從實體中刪除現有欄位和關係
*   `No, exit` - 這將存在子產生器而無需更改任何內容

您可能由於以下原因而要更新您的實體：

*   您想要向現有實體新增/刪除欄位和關係
*   您想將實體程式碼重置為原始狀態
*   您已經更新了JHipster，並希望使用新樣板生成您的實體
*   您已經修改了`.json`設定檔案（此檔案格式與產生器所提出的問題非常接近，容易修改，因此並不是很複雜），想使用修改後的新版本實體
*   您已經複製/貼上了`.json`檔案，並且想要一個與複製檔案對應實體非常接近的新實體

提示：要立即重新生成所有實體，可以使用以下指令（不提供`--force`標識會在檔案更改時詢問覆蓋選項）。

*   Linux & Mac: ``for f in `ls .jhipster`; do jhipster entity ${f%.*} --force ; done``
*   Windows: `for %f in (.jhipster/*) do jhipster entity %~nf --force`

## 教程

這是一個簡短的教程，介紹如何建立具有一對多關係的兩個實體（Author和Book）。

**重要提示** 如果需要要實時重新載入JavaScript/TypeScript程式碼，則需要執行`npm start`或`yarn start`。您可以轉到[在開發中使用JHipster]頁面以獲取更多訊息。

### 生成"Author"實體

因為我們希望在作者和書籍之間建立一對多的關係（一個作者可以寫很多本書），所以我們需要首先建立作者。然後，在資料庫級別，JHipster將能夠在Book表上新增外鍵，從而連結到Author表。

`jhipster entity author`

接下來回答有關該實體欄位的問題，author實體包括以下欄位：

*   "name"欄位， "String"型別
*   "birthDate"欄位，"LocalDate"型別

然後回答有關實體關係的問題，作者包括：

*   與『book』實體之間的一對多關係（尚不存在， 因為book實體還未建立）

### 生成"Book"實體

`jhipster entity book`

接下來回答有關該實體欄位的問題，book實體包括以下欄位：

*   "title"欄位, "String"型別
*   "description"欄位, "String"型別
*   "publicationDate"欄位, "LocalDate"型別
*   "price"欄位, "BigDecimal"型別

然後回答有關實體關係的問題，book：

*   與』author『實體具有多對一關係
*   並且此關係使用"name"欄位（來自Author實體）顯示

### 檢查生成的程式碼

使用`mvn test`執行生成的測試集，該測試集將測試Author實體和Book實體。

啟動應用程式（例如，使用`mvn`），在前端登入，並在『Entity』選單中選擇"Author"和"Book"實體。

檢查資料庫表，檢視是否正確插入了資料。

### 改進生成的程式碼

生成的檔案包含所有基本的CRUD操作，如果您無需CRUD以外的操作，則無需修改。

如果要修改生成的程式碼或資料庫架構，則應遵循我們的[開發指南]({{ site.url }}/development/)

如果您想要實現一些更復雜的業務行為，則可能需要使用[服務子產生器]({{ site.url }}/creating-a-service/)新增Spring`@Service`類。

### 完成了！

您生成的CRUD頁面應如下所示：

![]({{ site.url }}/images/screenshot_5.png)
