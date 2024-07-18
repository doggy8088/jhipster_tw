---
layout: default
title: 使用TLS和HTTP/2
permalink: /tls/
sitemap:
    priority: 0.7
    lastmod: 2018-10-04T00:00:00-00:00
---

# <i class="fa fa-lock"></i> 在開發中使用TLS和HTTP/2

## 介紹

此頁面用於在開發中使用TLS和HTTP/2（主要用於測試目的）。對於生產設定，請閱讀[生產文件中的安全性部分]({{ site.url }}/production/#security)。

TLS是具`https://` URL時使用的協定，並且在現代瀏覽器中使用HTTP/2是必需的。

主要出於效能原因，在測試應用程式時使用這些協定很有用。

## 在Spring Boot中使用TLS和HTTP/2

JHipster具有用於設定TLS和HTTP/2的特定設定（請參閱[通用應用程式屬性文件]({{ site.url }}/common-application-properties/))），並且使事情變得更加簡單：

- JHipster在應用程式生成時生成自簽名證書
- 提供了特定的`tls`設定檔案（請參閱[設定檔案文件]({{ site.url }}/profiles/)）

為了使用提供的自簽名證書（啟用了TLS和HTTP/2）執行JHipster，您需要使用以下`tls`設定檔案：

*   使用Maven: `./mvnw -Pdev,tls`
*   使用Gradle: `./gradlew -Ptls`

該應用程式將在`https://localhost:8080/`上可用。

由於證書是自簽名的，因此瀏覽器將發出警告，並且您將需要忽略它（或將其匯入）以訪問該應用程式。

## 在Angular或React或Vue.js中使用TLS和HTTP/2

無需使用`npm start`來執行前端（使用Webpack和BrowserSync），執行`npm run start-tls`，它將連線`https://localhost:8080/`上執行的後端。

然後，所有內容應與沒有使用TLS和HTTP/2的情況相同。