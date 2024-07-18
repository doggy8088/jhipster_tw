---
layout: default
title: 設定檔案
permalink: /profiles/
redirect_from:
  - /profiles.html
sitemap:
    priority: 0.7
    lastmod: 2014-11-26T00:00:00-00:00
---

# <i class="fa fa-group"></i> 設定檔案

JHipster帶有兩個[Spring設定檔案](http://docs.spring.io/spring-boot/docs/current/reference/html/boot-features-profiles.html)：

*   `dev` 用於開發：專注於簡化開發和提高生產率
*   `prod` 用於生產：專注於效能和可擴充套件性

這些設定檔案有兩種不同的設定：

*   Maven/Gradle設定檔案在建立時使用。例如`./mvnw -Pprod package`或`./gradlew -Pprod bootJar`將打包生產應用程式。
*   Spring設定檔案在執行時工作。一些Spring bean的行為會有所不同，具體取決於設定檔案。

Spring設定檔案由Maven/Gradle設定，因此我們在兩種方法之間具有一致性：您將同時在Maven/Gradle和Spring上有一個`prod`設定檔案。

Spring設定檔案用於設定JHipster應用程式屬性，因此您應該對閱讀我們的[通用程式屬性文件]({{ site.url }}/common-application-properties/)感興趣。

## 預設情況下，JHipster將使用`dev`設定檔案

如果您在沒有Maven/Gradle的情況下執行該應用程式，請啟動"Application"類（您可以透過右鍵單擊它來從IDE中直接執行它）。

如果您使用Maven執行該應用程式，請執行`./mvnw`使用我們的Maven套件裝器，或者執行`mvn`使用您自己安裝的Maven。

如果您使用Gradle執行應用程式，請執行`./gradlew`以使用我們的Gradle套件裝器，或`gradle`以使用您自己安裝的Gradle。

使用Angular 2+和Maven時，如果需要在為`dev`設定檔案啟用了webpack編譯的情況下進行全新執行，則可以按以下方式傳遞`webapp`引數

  `./mvnw -Pdev,webapp`

**注意**如果前端發生了變化，Gradle會在`dev`設定檔案中自動執行webpack編譯（僅在啟動時，對於實時載入，請使用`npm start`或`yarn start`）。

## 在生產中，JHipster必須使用`prod`設定檔案執行

您可以使用Maven或Gradle直接在生產中執行JHipster：

*   使用Maven，執行 `./mvnw -Pprod` (或 `mvn -Pprod`)
*   使用Gradle，執行 `./gradlew -Pprod` (或 `gradle -Pprod`)

如果要將應用程式打包為可執行的WAR檔案，則應為Maven或Gradle提供一個設定檔案。例如：

*   使用Maven，執行 `./mvnw -Pprod package` (或 `mvn -Pprod package`)
*   使用Gradle，執行 `./gradlew -Pprod bootJar` (或 `gradle -Pprod bootJar`)

從WAR檔案執行生產應用程式時，預設設定是使用與打包期間相同的設定檔案。如果要覆蓋此引數，則可以在VM引數中顯式提供替代方法：

*   `java -jar jhipster-0.0.1-SNAPSHOT.jar --spring.profiles.active=...`

## Spring設定檔案切換

JHipster附帶了三個附加設定檔案用於切換：

*   `api-docs` 啟用swagger
*   `no-liquibase` 停用liquibase
*   `tls` 啟用TLS安全並使用HTTP/2協定（請參閱[TLS和HTTP/2文件]({{ site.url }}/tls/)）

這些可以與`dev`和`prod`設定檔案一起使用。請注意，預設情況下，透過在`application.yml`中設定`application.yml`屬性，可以在`prod`中停用`api-docs`設定檔案，在`dev`中啟用它。

`api-docs`, `no-liquibase`, `tls`僅在執行時使用：

*   在您的IDE中，使用`spring.profiles.active=dev,no-liquibase`執行主應用程式類（請注意，您需要顯式包括`dev`或`prod`設定檔案）
*   對於打包後的應用程式：`./java -jar jhipster-0.0.1-SNAPSHOT.war --spring.profiles.active=prod,no-liquibase`

使用Maven，您還可以直接使用這些設定檔案：

*   `./mvnw -Pprod,api-docs,no-liquibase`
*   `./mvnw -Pdev,no-liquibase`

使用Gradle，您還可以直接使用這些設定檔案：

*   `./gradlew -Pprod -Papi-docs -Pno-liquibase`
*   `./gradlew -Pno-liquibase`
