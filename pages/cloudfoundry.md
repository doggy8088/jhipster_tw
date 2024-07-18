---
layout: default
title: 部署到Cloud Foundry
permalink: /cloudfoundry/
redirect_from:
  - /cloudfoundry.html
sitemap:
    priority: 0.7
    lastmod: 2014-11-04T00:00:00-00:00
---

# 部署到Cloud Foundry

該子產生器允許將您的JHipster應用程式自動部署到[Cloud Foundry PaaS](http://cloudfoundry.org/)。

它與MySQL，PostgreSQL和MongoDB雲提供商一起使用。

## 支援的雲

[![]({{ site.url }}/images/logo/logo-pws.png)](http://run.pivotal.io/)

由於此子產生器使用Cloud Foundry指令行工具，因此可以部署到所有Cloud Foundry實例：

*   [Pivotal Web Services](http://run.pivotal.io/), 它是JHipster的正式贊助商，因此這是我們唯一可以測試並提供支援的
*   [Atos Canopy](https://canopy-cloud.com/)
*   [IBM Bluemix](https://console.ng.bluemix.net/)
*   如果您決定自己安裝Cloud Foundry，還有您自己的私有Cloud Foundry實例！

## 執行子產生器

在執行子產生器之前，您需要安裝[cf指令行介面（CLI）](http://docs.cloudfoundry.org/devguide/installcf/)，並建立一個Cloud Foundry帳戶。

要將您的應用程式部署到Cloud Foundry，請輸入：

`jhipster cloudfoundry`

您將需要回答幾個問題來設定資料庫，詢問您資料庫服務的名稱和要使用的計劃。可用的資料庫取決於您當前的Cloud Foundry安裝，輸入`cf marketplace`以瞭解Cloud Foundry市場上可用的服務和計劃。預設情況下，所選資料庫和計劃是公共Pivotal Cloud Foundry實例上ElephantSQL提供的免費PostgreSQL服務，因為它們是JHipster的贊助者。

這應該打包您的應用程式（在生產或開發模式下），建立Cloud Foundry應用程式（與資料庫），上傳程式碼並啟動該應用程式。

## 更新已部署的應用程式

在部署了應用程式之後，可以透過執行以下指令正常建立來重新部署它：

**使用Maven：**

`./mvnw -Pprod package`

`cf push -f ./deploy/cloudfoundry/manifest.yml -p target/*.jar`

**使用Gradle:**

`./gradlew -Pprod bootJar`

`cf push -f ./deploy/cloudfoundry/manifest.yml -p build/libs/*.jar`

您還可以透過再次執行子產生器：

`jhipster cloudfoundry`

## 更多訊息

*   [Spring Boot Cloud Foundry文件](http://docs.spring.io/spring-boot/docs/current/reference/html/cloud-deployment.html)
*   [Spring Cloud連線器](http://cloud.spring.io/spring-cloud-connectors/)

