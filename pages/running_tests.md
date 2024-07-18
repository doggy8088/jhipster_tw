---
layout: default
title: 執行測試
permalink: /running-tests/
redirect_from:
  - /running_tests.html
sitemap:
    priority: 0.7
    lastmod: 2019-04-19T00:00:00-00:00
---

# <i class="fa fa-shield"></i> 執行測試

## 介紹

JHipster附帶了一組全面的測試，並且每個生成的應用程式都具有：

*   使用[JUnit 5](https://junit.org/junit5/){:target="_blank" rel="noopener"}進行單元測試。
*   使用Spring Test Context框架進行整合測試。
*   用[Jest](https://facebook.github.io/jest/){:target="_blank" rel="noopener"}進行UI測試。
*   使用[ArchUnit](https://www.archunit.org/){:target="_blank" rel="noopener"}進行架構測試。

可選地，JHipster還可以生成：

*   用[Gatling](http://gatling.io/){:target="_blank" rel="noopener"}進行效能測試。
*   行為驅動的[Cucumber](https://cucumber.io/){:target="_blank" rel="noopener"}測試。
*   用[Cypress](https://www.cypress.io/){:target="_blank" rel="noopener"} 或者[Protractor](https://angular.github.io/protractor/#/){:target="_blank" rel="noopener"}進行 Angular/React/Vue整合測試

生成這些測試有兩個目標：

*   幫助每個JHipster使用者遵循最佳實踐，因為我們認為測試是每個應用程式中非常有用的一部分
*   驗證所生成的內容正確無誤。因此，即使您根本不打算使用這些測試，在生成應用程式後進行`./mvnw clean verify`和`npm test`也是瞭解一切正常的一種好方法。如果您認為測試浪費時間，那麼您可以自由地忽略那些測試！

所有這些測試都將在標準`src/test`資料夾中生成。

## 整合測試

整合測試是透過Spring Test Context框架完成的，位於`src/test/java`資料夾中。JHipster將啟動特定的Spring測試上下文，該上下文將在所有測試中重複使用，如下所示：

*   您的Spring bean應該是無狀態的並且是執行緒安全的，因此可以在不同的測試套件中重複使用。
*   與為每個測試啟動一個新的Spring上下文相比，為所有測試僅啟動一個Spring上下文快得多。

這個Spring測試上下文將使用特定的測試資料函式庫來執行其測試：

*   如果使用SQL資料庫，則JHipster將啟動記憶體中的H2實例，以便將臨時資料庫用於其整合測試。另外，透過使用`testcontainers`設定檔案，JHipster將使用[Testcontainers](https://www.testcontainers.org/modules/databases/){:target = "_blank" rel = "noopener"}，無論哪種方式，Liquibase將自動執行，並將生成資料庫模式。
*   如果使用Cassandra，JHipster將使用 [Testcontainers](https://www.testcontainers.org){:target="_blank" rel="noopener"}與Docker一起啟動Cassandra的容器化版本。
*   如果使用MongoDB，JHipster將使用 [de.flapdoodle.embed.mongo](https://github.com/flapdoodle-oss/de.flapdoodle.embed.mongo){:target="_blank" rel="noopener"}啟動記憶體中的MongoDB實例。
*   如果使用Elasticsearch，則JHipster將使用Spring Data Elasticsearch啟動記憶體中的Elasticsearch實例。
*   如果您使用Couchbase，則JHipster將使用 [Couchbase TestContainers](https://github.com/differentway/testcontainers-java-module-couchbase){:target="_blank" rel="noopener"}與Docker啟動Couchbase的容器化版本。
*   如果您使用Neo4j，JHipster將使用[Neo4j Testcontainers](https://www.testcontainers.org/modules/databases/neo4j/){:target="_blank" rel="noopener"}。

這些測試可以直接在您的IDE中執行，方法是右鍵單擊每個測試類，或者透過執行`./mvnw clean verify`（如果使用Gradle，則可以執行`./gradlew test integrationTest`）。

**限制:** 如果生成的實體啟用了校驗，則JHipster可能不能根據校驗規則生成正確的值。這些規則可能非常複雜，例如，如果使用了Regex模式，就不可能實現。在這種情況下，測試將無法透過校驗，並且測試中使用的預設值將需要手動更改，以便它們可以透過校驗規則。

## UI測試

JHipster的UI測試有兩種形式：Jest的單元測試和Protractor的整合測試。預設情況下僅提供Jest，但是如果您希望對應用程式進行良好的測試，我們建議您同時使用這兩種工具。

### Jest

UI單元測試位於`src/test/javascript/spec`資料夾中。他們使用[Jest](https://facebook.github.io/jest/){:target="_blank" rel="noopener"}。

這些測試將模擬對應用程式REST端點的訪問，因此您可以測試UI層而不必啟動Java後端。

*   可以使用`npm test`執行這些測試。
*   提示: 如果您只關注單個測試，請將模組描述從`describe('...', function() {`更改為`fdescribe('...', function() {`，Jest將僅執行此測試。

### Cypress/Protractor

UI整合測試是使用[Cypress](https://www.cypress.io/){:target="_blank" rel="noopener"}或[Protractor](https://angular.github.io/protractor/#/){:target="_blank" rel="noopener"}完成的，位於`src/test/javascript/e2e`資料夾中。

這些測試將啟動Web瀏覽器並像真實使用者一樣使用該應用程式，因此您需要執行一個具有資料庫設定的真實應用程式。

可以使用`npm run e2e`執行這些測試。

## Architecture tests

使用[ArchUnit](https://www.archunit.org/){:target="_blank" rel="noopener"}可以進行強制某些約束和最佳實踐的架構測試。
您可以按照[官方文件](https://www.archunit.org/userguide/html/000_Index.html){:target="_blank" rel="noopener"}在建立時輕鬆編寫自己的規則來檢查架構的自定義約束。

## 效能測試

效能測試是使用[Gatling](http://gatling.io/){:target="_blank" rel="noopener"}完成的，位於`src/test/gatling`資料夾中。它們是為每個實體生成的，並允許使用大量併發的使用者請求對其進行測試。

要執行Gatling測試，您必須

1. 請轉到[Gatling下載頁面](https://gatling.io/open-source/){:target="_blank" rel="noopener"}
2. 解壓縮並將該位置新增到您的`PATH`中
3. `cd`進入`src/test/gatling`並根據您的作業系統執行`gatling.sh`或`gatling.bat`

**警告!** 目前，這些測試未考慮您可能對實體執行的校驗規則。同樣，建立與其他實體具有必需關係的實體的測試開箱即用也會失敗。無論如何，您都需要根據您的業務規則更改那些測試，因此這裡有一些改善測試的技巧：

*   在正在執行的應用程式上，轉到`Administration > Logs`螢幕，然後將`org.springframework`置於`debug`模式。例如，您將看到驗證錯誤。
*   正常使用該應用程式，然後開啟Chrome `console log`：您將能夠看到REST請求及其所有引數，包括HTTP標頭。

為了在微服務應用程式上執行Gatling測試，您必須：

*   執行registry
*   執行閘道器
*   執行微服務應用
*   然後，您可以執行Gatling測試

### 使用Maven / Gradle執行Gatling

我們不會生成Maven或Gradle設定來執行Gatling測試，因為這可能會導致其他外掛出現類路徑問題（主要是由於使用Scala）。
不過，您可以使用正式的[Maven外掛](https://gatling.io/docs/current/extensions/maven_plugin/){:target="_blank" rel="noopener"}或[Gradle外掛](https://gatling.io/docs/current/extensions/gradle_plugin/){:target="_blank" rel="noopener"}執行Gatling測試。

#### 使用 Maven

您需要更改`pom.xml`：

1.新增帶有`test`作用域的Gatling依賴項
2.新增Gatling外掛
3.使外掛設定適應JHipster佈局和命名約定

```
...
<dependency>
  <groupId>io.gatling.highcharts</groupId>
  <artifactId>gatling-charts-highcharts</artifactId>
  <version>3.5.0</version>
  <scope>test</scope>
</dependency>
<!-- jhipster-needle-maven-add-dependency -->
...
<plugin>
  <groupId>io.gatling</groupId>
  <artifactId>gatling-maven-plugin</artifactId>
  <version>3.1.1</version>
  <configuration>
    <runMultipleSimulations>true</runMultipleSimulations>
    <resourcesFolder>${project.basedir}/src/test/gatling/conf</resourcesFolder>
    <simulationsFolder>${project.basedir}/src/test/gatling/user-files/simulations</simulationsFolder>
  </configuration>
</plugin>
<!-- jhipster-needle-maven-add-plugin -->
...
```

您可以使用`./mvnw gatling:test`執行所有的gatling測試。

#### 使用Gradle

您需要更改`build.gradle`：

1.將Gatling外掛新增到外掛部分
2.使源集適應JHipster佈局
3.使包含的模擬適應JHipster命名約定

如果使用的是反應式選項，則可能[需要確保Spring Boot管理的Netty版本不會干擾Gatling所需的版本](https://gatling.io/docs/current/extensions/gradle_plugin/#spring-boot-and-netty-version){:target="_blank" rel="noopener"} 。

```
plugins {
    ...
    id "io.spring.nohttp"
    // Add the Gatling plugin, please check for the latest version here https://plugins.gradle.org/plugin/io.gatling.gradle 
    id 'io.gatling.gradle' version "3.5.0" 
    //jhipster-needle-gradle-plugins - JHipster will add additional gradle plugins here
}

...
// adapt the source sets to the JHipster specific layout
sourceSets {
   gatling {
    scala.srcDirs = ["src/test/gatling/user-files/simulations"]
    resources.srcDirs = ["src/test/gatling/conf"]
  }
} 

gatling {
    simulations = { include "**/*Test*.scala" }
}
...
```



## 行為驅動開發（BDD）

使用[Cucumber](https://cucumber.io/){:target="_blank"}及其[JVM實現](https://github.com/cucumber/cucumber-jvm){:target="_blank"}，可以進行行為驅動開發（BDD）。

[Gherkin](https://docs.cucumber.io/gherkin/reference/){:target="_blank"}功能必須寫在`src/test/features`目錄中。