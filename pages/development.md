---
layout: default
title: 在開發中使用JHipster
permalink: /development/
redirect_from:
  - /development.html
sitemap:
    priority: 0.7
    lastmod: 2016-12-01T00:00:00-00:00
---

# <i class="fa fa-code"></i> 在開發中使用JHipster

_**請檢視有關建立新JHipster應用程式的[影片教程]({{ site.url }}/video-tutorial/)！**_

## 概要

1.  [常規設定](#general-configuration)
2.  [執行Java服務](#running-java-server)
3.  [使用Angular/React](#working-with-angular)
4.  [使用資料庫](#using-a-database)
5.  [國際化](#internationalization)

## <a name="general-configuration"></a> 常規設定

### IDE設定

如果尚未設定IDE，請轉到[設定IDE]({{ site.url }}/configuring-ide/)頁面。

### 應用設定

預設情況下，JHipster使用"development"設定檔案，因此您無需進行任何設定。

如果您想要更多有關可用設定檔案的訊息，請轉到標題為"[設定檔案]({{ site.url }}/profiles/)"的部分。

如果要設定某些特定的JHipster屬性，請檢視[常規應用屬性]({{ site.url }}/common-application-properties/)頁面。

## <a name="running-java-server"></a> 執行Java服務

### 作為"main"Java類

在您的IDE中，右鍵單擊Java套件層次結構根目錄下的"Application"類，然後直接執行它。您也可以使用IDE除錯它。

該應用程式將在[http://localhost:8080](http://localhost:8080)上可用。

預設情況下，此應用程式將啟用"熱過載"，因此，如果編譯一個類，Spring應用程式上下文會自動重新整理本身，而無需重新啟動伺服器。

### 作為Maven專案

您可以使用Maven啟動Java服務。JHipster提供了一個Maven套件裝器，因此您無需安裝Maven，並且可以保證所有專案使用者都具有相同的Maven版本：

`./mvnw` (在Mac OS X/Linux) of `mvnw` (在Windows)

(這將執行我們的預設Maven任務, `spring-boot:run`)

該應用程式將在[http://localhost:8080](http://localhost:8080)上可用。

如果您將實時重新載入與`npm start`或`yarn start`一起使用，則可以透過以下方式排除Webpack任務來加快伺服器啟動速度：

`./mvnw -P-webapp`

另外，如果您已經安裝了Maven，則可以使用Maven啟動Java服務：

`mvn`

如果您想了解有關使用Maven的更多訊息，請訪問[http://maven.apache.org](http://maven.apache.org)。

### （可選）作為Gradle專案

如果選擇了Gradle選項，則JHipster將提供Gradle套件裝器，因此您無需安裝Gradle，並且可以保證所有專案使用者都具有相同的Gradle版本：

`./gradlew` (在Mac OS X/Linux) of `gradlew` (在Windows)

(這將執行我們的預設Gradle任務, `bootRun`)

該應用程式將在[http://localhost:8080](http://localhost:8080)上可用。

如果您將實時重新載入與`npm start`或`yarn start`一起使用，則可以透過以下方式排除Webpack任務來加快伺服器啟動速度：

`./gradlew -x webapp`


另外，如果已經安裝了Gradle，則可以使用Gradle啟動Java服務：

`gradle`

如果您想了解有關使用Gradle的更多訊息，請訪問[https://gradle.org](https://gradle.org)

## <a name="working-with-angular"></a> 使用Angular/React

### 執行Webpack

_若要檢視TypeScript程式碼更改，並實時重新載入前端程式碼，則需要執行此步驟。_

執行Webpack是`package.json`檔案中的預設任務，這樣就足以執行：

`npm start`

(或者，如果您使用Yarn， `yarn start`).

這提供了非常令人印象深刻的功能：

*   修改HTML/CSS/TypeScript檔案後，瀏覽器將自動重新整理
*   當您在幾種不同的瀏覽器或裝置上測試應用程式時，所有點選/捲動/輸入應在所有螢幕上自動同步

這將啟動：

- 一個Webpack任務，它將自動將TypeScript程式碼編譯為JavaScript
- 將在[http://localhost:9060/](http://localhost:9060/)上執行的Webpack的 "hot module reload"服務（並具有[http://127.0.0.1:8080/api](http://127.0.0.1:8080/api) 的代理以訪問Java後端）
- 一個BrowserSync任務，它將在[http://localhost:9000/](http://localhost:9000/)上執行，該任務具有 [http://localhost:9060/](http://localhost:9060/)（Webpack "hot module reload"服務）的代理，並且將同步使用者的點選/捲動/輸入
- BrowserSync UI，將在[http://localhost:3001/](http://localhost:3001/)上提供

**注意**預設情況下，BrowserSync啟用[ghostMode](https://browsersync.io/docs/options#option-ghostMode) ，尤其在[使用多個瀏覽器標籤](https://github.com/jhipster/generator-jhipster/issues/11116#issuecomment-589362814) 時，可能會造成一些混亂。為避免這種情況，您可以始終關閉ghostMode。 在`webpack.dev.js`中提供了一些註解的程式碼，以方便地停用ghostMode。

### 執行NPM

直接專案依賴項設定在`package.json`中，但是傳遞性依賴項定義在`package-lock.json`檔案中，該檔案在執行`npm install`時生成。

建議將[`package-lock.json`](https://docs.npmjs.com/files/package-lock.json) 歸入到原始碼管理中，以便專案的所有團隊成員都具有相同版本的所有依賴項。再次執行`npm install`將使用最新版本的傳遞依賴項重新生成`package-lock.json`。

### 其他NPM/Yarn任務

無論您使用NPM還是Yarn，這些任務都是相同的，我們以`npm`指令為例，但是您可以將其替換為`yarn`。

- `npm run lint`: 檢查TypeScript程式碼中的程式碼樣式問題
- `npm run lint:fix`: 嘗試自動更正TypeScript lint問題
- `npm run tsc`: 編譯TypeScript程式碼
- `npm run test`: 用Jest執行單元測試
- `npm run test:watch`: 保持Jest單元測試的執行狀態，以便在更改程式碼時獲得實時反饋
- `npm run e2e`: 使用Protractor執行"端到端"測試（僅在生成專案時選擇了Protractor選項時有效）

## <a name="using-a-database"></a> 使用資料庫

### 執行資料庫

如果您使用非嵌入式資料庫，例如MySQL，MariaDB，PostgreSQL，MSSQL，MongoDB，Cassandra或Couchbase，則需要安裝和設定該資料庫。

使用JHipster的最簡單和推薦的方法是使用Docker Compose。在此處[遵循我們的Docker Compose指南]({{ site.url }}/docker-compose/)。

如果您希望手動安裝和設定資料庫，請不要忘記在`src/main/resources/config/application-*.yml`檔案（例如，資料庫URL，登入名和密碼）中相應地設定Spring Boot屬性。

### 在開發中使用H2資料庫

如果選擇H2資料庫，則將在應用程式內部執行一個記憶體資料庫，預設情況下，您可以在[http://localhost:8080/h2-console](http://localhost:8080/h2-console)訪問其控制台。

要連線到資料庫，請選擇預設定的選項：

*   Driver Class: org.h2.Driver
*   JDBC URL: jdbc:h2:mem:jhipster
*   User name: <blank>
*   Password: <blank>

![]({{ site.url }}/images/h2.png)

### 在開發中使用MySQL，MariaDB或PostgreSQL

該選項比使用H2更為複雜，但是可以為您帶來一些重要的好處：

*   您的資料將在應用程式重新啟動時儲存
*   您的應用程式啟動速度更快
*   您可以使用出色的`./mvnw liquibase:diff` goal（請參見下文）

**注意**：對於MySQL，您可能需要使用以下選項啟動資料庫：

*   `--lower_case_table_names=1` : 請參閱[文件](https://dev.mysql.com/doc/refman/5.7/en/identifier-case-sensitivity.html)
*   `--skip-ssl` : 請參閱[文件](https://dev.mysql.com/doc/refman/5.7/en/encrypted-connection-options.html#option_general_ssl)
*   `--character_set_server=utf8` : 請參閱[文件](https://dev.mysql.com/doc/refman/5.7/en/server-options.html#option_mysqld_character-set-server)
*   `--explicit_defaults_for_timestamp` : 請參閱[文件](https://dev.mysql.com/doc/refman/5.6/en/server-system-variables.html#sysvar_explicit_defaults_for_timestamp)

該指令是：

    mysqld --lower_case_table_names=1 --skip-ssl --character_set_server=utf8 --explicit_defaults_for_timestamp

## 資料庫更新

如果新增或修改JPA實體，則需要更新資料庫結構。

JHipster使用[Liquibase](http://www.liquibase.org)來管理資料庫更新，並將其設定儲存在`/src/main/resources/config/liquibase/`目錄中。

使用Liquibase的方法有3種：
* 使用實體子產生器 
* 使用Maven`liquibase:diff`目標
* 手動更新設定檔案。

### 使用實體子產生器進行資料庫更新

如果使用[實體子產生器]({{ site.url }}/creating-an-entity/)，則開發流程如下：

*   執行[實體子產生器]({{ site.url }}/creating-an-entity/)
*   在您的`src/main/resources/config/liquibase/changelog`目錄中建立了一個新的"change log"，並已自動將其新增到`src/main/resources/config/liquibase/master.xml`檔案中
*   檢視此更改日誌，它將在您下次執行應用程式時應用

### 使用Maven liquibase：diff goal進行資料庫更新

如果您選擇在開發中使用MySQL，MariaDB或PostgreSQL，則可以使用`./mvnw liquibase:diff` goal來自動生成變更日誌。

如果您正在使用基於磁碟的持久性執行H2，則該工作流程尚不能完美執行，但是您可以開始嘗試使用它（並向我們傳送反饋！）。

[Liquibase Hibernate](https://github.com/liquibase/liquibase-hibernate)是在pom.xml中設定的Maven外掛，它獨立於Spring application.yml檔案，因此，如果您更改了預設設定（例如，更改了資料庫密碼），則需要同步修改這兩個檔案。

這是開發工作流程：

*   修改您的JPA實體（新增欄位，關係等）
*   編譯您的應用程式（這適用於已編譯的Java程式碼，因此請不要忘記編譯！）
*   執行`./mvnw liquibase:diff` (或者`./mvnw compile liquibase:diff`預編譯)
*   在您的`src/main/resources/config/liquibase/changelog`目錄中建立一個新的"change log"
*   檢視此更改日誌並將其新增到您的 `src/main/resources/config/liquibase/master.xml`檔案中，以便在下次執行應用程式時應用它

如果使用Gradle而不是Maven，則可以透過執行`./gradlew liquibaseDiffChangelog -PrunList=diffLog`使用相同的工作流，並根據需要在`build.gradle`中更改liquibase設定中的資料庫設定。

### 透過手動編輯更改日誌來更新資料庫

如果您希望（或需要）手動進行資料庫更新，請參考以下開發流程：

*   修改您的JPA實體（新增欄位，關係等）
*   在`src/main/resources/config/liquibase/changelog`目錄中建立一個新的"change log"。該目錄中的檔案以其建立日期（yyyyMMddHHmmss格式）為字首，然後有一個標題來說明它們的作用。例如，`20141006152300_added_price_to_product.xml`是一個不錯的名字。
*   將此"change log"檔案新增到`src/main/resources/config/liquibase/master.xml`檔案中，以便在下次執行應用程式時應用

如果您想了解有關使用Liquibase的更多訊息，請訪問[http://www.liquibase.org](http://www.liquibase.org)。

## <a name="internationalization"></a> 國際化

國際化（或i18n）是JHipster中的一等公民，因為我們認為應該在專案開始時就進行設定（而不是事後考慮）。

用法如下：

- 使用Angular，得益於[NG2 translate](https://github.com/ocombe/ng2-translate)和特定的JHipster元件，該組件使用JSON檔案進行翻譯
- 使用React，得益於特定的JHipster元件，該組件的工作方式與Angular元件相同，並且使用相同的檔案

例如，要將翻譯新增到"first name"欄位，新增一個帶有關鍵字的"translate"屬性即可：`<label jhiTranslate="settings.form.firstname">First Name</label>`

該鍵引用一個JSON文件，該文件將回傳已轉換的字串。然後，Angular/React將用翻譯後的版本替換"First Name"字串。

如果您想了解有關使用語言的更多訊息，請閱讀我們的[安裝新語言文件]({{ site.url }}/installing-new-languages/)。
