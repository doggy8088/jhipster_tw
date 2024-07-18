---
layout: default
title: 部署到微軟Azure
permalink: /azure/
sitemap:
priority: 0.7
lastmod: 2018-08-24T00:00:00-00:00
---

# <i class="fa fa-cloud-upload"></i> 部署到微軟Azure

[Microsoft Azure](https://azure.microsoft.com/overview/?WT.mc_id=online-jhipster-judubois)是在雲中執行JHipster應用程式的絕佳解決方案。

- 最簡單的方法是使用 [Azure App Service](https://azure.microsoft.com/services/app-service/?WT.mc_id=online-jhipster-judubois): 是一個JHipster子產生器可以自動將單體應用程式部署到該服務。
- 如果您使用的是Spring Boot微服務，則可以使用JHipster子產生器將應用程式部署到
  [Azure Spring Cloud](https://azure.microsoft.com/services/spring-cloud/?WT.mc_id=online-jhipster-judubois).
- 與任何Docker和Kubernetes雲提供商一樣，您可以使用JHipster Docker和Kubernetes支援將Docker映像部署到Microsoft Azure. 參考我們的 [Docker Compose documentation]({{ site.url }}/docker-compose/) 和我們的 [Kubernetes documentation]({{ site.url }}/kubernetes/) 瞭解有關這些選項的更多訊息。

[![Microsoft Azure]({{ site.url }}/images/logo/logo-azure.png)](https://azure.microsoft.com/overview/?WT.mc_id=online-jhipster-judubois)

1. [安裝"az CLI"](#1)
2. [目前的侷限性](#2)
3. [支援的資料庫](#3)
4. [儲存金鑰](#4)
5. [將Spring Boot可執行Jar檔案部署到Azure App Service](#5)
6. [將Spring Boot微服務部署到Azure Spring Cloud](#6)

## <a name="1"></a> 安裝 "az CLI"

您可以使用 [Web-based Azure portal](https://portal.azure.com/?WT.mc_id=online-jhipster-judubois) 或使用 [the Azure
command-line interface](https://docs.microsoft.com/cli/azure/get-started-with-azure-cli/?WT.mc_id=online-jhipster-judubois) ，也稱為"az CLI"。

與JHipster一樣，我們總是自動進行所有操作，必須安裝此"az CLI"才能與以下任何選項一起使用。

要在您的電腦上安裝az CLI， [遵循『安裝Azure CLI』官方文件](https://docs.microsoft.com/cli/azure/install-azure-cli/?WT.mc_id=online-jhipster-judubois).

## <a name="2"></a>目前的侷限性

這些限制可以在將來解決，如果您有興趣提供幫助，請毫不猶豫地為該專案做出貢獻：

- 子產生器不會自動設定外部服務，例如資料庫（有關支援的資料庫，請參閱下一節），Elasticsearch，Kafka或Redis。 因此，您將需要手動建立和設定它們。
- Azure僅提供Maven外掛，因此JHipster子產生器只能與Maven一起使用。

## <a name="3"></a> 支援的資料庫

### SQL資料庫

Azure提供了所有型別的資料庫，例如MySQL / PostgreSQL / Oracle / MS SQL Server。 在Azure中，預設情況下將保護它們的安全，因此，如果要從JHipster應用程式訪問它們，則需要開啟其防火牆。

例如，在MySQL上，您將需要轉到『連線安全性（Connection security）』，然後選擇『允許訪問Azure服務（Allow access to Azure services）』。 您還應該單擊『新增用戶端IP（Add client IP）』按鈕，以將當前IP自動新增到防火牆規則中：

![MySQL firewall]({{ site.url }}/images/azure_mysql_firewall.png)

__對MySQL使用者的警告：__
預設情況下，JHipster生成的MySQL連線字串在`spring.datasource.url`屬性（通常在您的`src/main/resources/config/application-prod.yml`檔案中）中使用`useSSL=false`標誌。 這是因為，預設情況下，JHipster使用本地資料庫。 在Azure上，預設情況下，使用SSL證書保護資料庫的安全，因此您需要將此標誌置於`true`。

例如：

```yml
spring:
  datasource:
    type: com.zaxxer.hikari.HikariDataSource
    url: jdbc:mysql://jhipster-database.mysql.database.azure.com:3306/test?useUnicode=true&characterEncoding=utf8&useSSL=true&useLegacyDatetimeCode=false&serverTimezone=UTC
    username: jhipster@jhipster-database
    password: XXXXXX
```

### NoSQL資料庫

您可以安裝NoSQL資料庫，例如使用[the Azure Marketplace](https://azuremarketplace.microsoft.com/en-us/?WT.mc_id=online-jhipster-judubois) 安裝Cassandra或使用[CosmosDB](https://azure.microsoft.com/services/cosmos-db/?WT.mc_id=online-jhipster-judubois) MongoDB。

CosmosDB是Microsoft的全球分散式託管資料庫。 它在API級別上與Cassandra和MongoDB相容，因此可以與使用這些技術生成的JHipster應用程式一起使用。

## <a name="4"></a> 儲存金鑰

您應該將幾個『金鑰』安全地儲存在JHipster中，至少要儲存資料庫密碼（請參見上一節）和安全令牌（請參閱我們的[安全文件]({{site.url}}/security/) 瞭解更多的訊息）。

Azure中有許多選項，可用於將這些資料儲存在比`application-prod.yml`檔案更好的位置。 這是最常見的：

- Spring Cloud 設定服務器, 如[JHipster Registry]({{ site.url }}/jhipster-registry/) 或由管理的設定服務器 [Azure Spring Cloud](https://azure.microsoft.com/services/spring-cloud/?WT.mc_id=online-jhipster-judubois) 。這是最好的選擇，因為您可以標記和回滾設定，但是它需要專用的伺服器。
- 環境變數。 這是最簡單的選項，但設定起來有點煩人，而且安全性較差。
- [Azure Key Vault](https://azure.microsoft.com/services/key-vault/?WT.mc_id=online-jhipster-judubois): 這是最安全的選項，但是它特定於Azure。有一個專用的 [Azure Spring Boot Starter for Key Vault](https://docs.microsoft.com/en-us/azure/java/spring-framework/spring-boot-starters-for-azure/?WT.mc_id=online-jhipster-judubois) ，這是我們建議使用Azure Key Vault設定JHipster的方法。

## <a name="5"></a> 將Spring Boot可執行Jar檔案部署到Azure App Service

[![Deploying to Azure App Service](https://img.youtube.com/vi/kciGvVrfwpw/0.jpg)](https://www.youtube.com/watch?v=kciGvVrfwpw)

_有關將JHipster應用程式部署到Azure App Service的5分鐘影片_

### 生成Azure App Service的設定

[Azure App Service](https://azure.microsoft.com/fr-fr/services/app-service/?WT.mc_id=online-jhipster-judubois) 是一種託管的PaaS：在Azure上，如果要部署單體應用，這是我們推薦的選項。

有兩種方法可以將Spring Boot應用程式部署到Azure App Service：

- 將其部署為Docker映像：這使您可以在Docker映像中交付任何內容，這對於某些特定的用例可能是好的，但是在大多數情況下，這是最複雜且安全性較低的選項。
- 將其部署為可執行的Jar檔案：這是最簡單，更安全的選擇，因為Microsoft將支援並自動更新OS和JVM。

我們建議使用可執行的Jar檔案，但是如果您想使用Docker映像，請遵循本頁的最後一節『部署到Docker和Kubernetes』。

要將JHipster應用程式作為可執行Jar檔案部署到Azure App Service，有一個特定的`azure-app-service`子產生器：

```sh
jhipster azure-app-service
```

該子產生器可以與以下標識一起使用：

- `--skip-build` 跳過建立應用程式
- `--skip-deploy` 跳過部署到Azure App Service
- `--skip-insights` 跳過Azure Application Insights的設定

然後將需要回答以下問題。 您可能需要訪問 [Azure Portal](https://portal.azure.com/?WT.mc_id=online-jhipster-judubois) 回答他們並檢查設定的資源。

- __Azure resource group name（Azure資源組名稱）:__ 這是將在其中部署應用程式的Azure資源組的名稱。 我們建議使用指令 `az configure --defaults group=<resource group name>`設定預設的Azure資源組。
- __Azure App Service plan name（Azure應用服務計劃名稱）:__ 您的Azure應用服務將在[Azure服務計劃](https://docs.microsoft.com/azure/app-service/overview-hosting-plans/?WT.mc_id=online-jhipster-judubois) 中執行。如果服務計劃已經存在，則JHipster將使用它，否則它將建立一個新的服務計劃。 預設情況下，JHipster在『 B1』層中建立一個基於Linux的服務計劃（『基本』計劃，免費使用30天）。 如果您需要有關服務計劃層的更多訊息，請檢視[相關文件](https://azure.microsoft.com/pricing/details/app-service/linux/?WT.mc_id=online-jhipster-judubois) 。
- __Azure Application Insights instance name（Azure Application Insights實例名稱）:__ JHipster可以自動設定一個 [Azure Application Insights 實例](https://docs.microsoft.com/azure/azure-monitor/app/app-insights-overview/?WT.mc_id=online-jhipster-judubois) ，因此將監視部署的應用程式。 這使用 [Azure Spring Boot Starter for Application Insights](https://docs.microsoft.com/en-us/azure/java/spring-framework/spring-boot-starters-for-azure/?WT.mc_id=online-jhipster-judubois) 並在`application-azure.yml` 設定檔案中設定。
- __Azure App Service application name（Azure App Service應用程式名稱）:__ 您的Azure App Service實例的名稱。
- __Which type of deployment do you want（您想要哪種型別的部署） ?__ 您可以使用Maven在本地建立和部署應用程式，也可以使用GitHub Actions為您自動建立和部署應用程式。

### 『azure』 Spring Boot設定檔案

該子產生器建立一個`azure` Spring Boot設定檔案並對其進行設定。

- 在您的Azure App Service實例中，使用環境變數`SPRING_PROFILES_ACTIVE`會自動啟用`prod`和`azure`Spring設定檔案。
- 為此設定檔案建立了一個新的Spring Boot設定，`src/main/resources/config/application-azure.yml`。或者在JHipster設定檔案的詳細訊息，查閱[相關文件]({{ site.url }}/profiles/)。

### 使用GitHub Actions進行部署

建議使用GitHub Actions進行部署，因為它比在本地電腦上更容易並且可能更快。

- 設定儲存在 `.github/workflows/azure-app-service.yml`.
- 預設情況下，每次在`main`分支上有新的`push`事件時，都會部署該應用程式。
- 為了與本地部署保持一致，此部署機制使用了`azure-webapp`Maven外掛。有另一種部署到Azure App Service的方法，該方法不需要Maven。如果您對此感興趣，請查詢`azure/webapps-deploy` GitHub Action, 並按照相應範例 [this blog post](https://dev.to/azure/the-easy-way-to-deploy-a-spring-boot-application-to-production-on-azure-2joi) 進行操作。

為了被授權將應用程式部署到您的Azure App Service實例，GitHub需要有權訪問名為`AZURE_CREDENTIALS`的安全令牌。
在子產生器執行結束時，它以以下形式顯示了指令行：

```sh
az ad sp create-for-rbac --name http://<your-security-role> --role contributor --scopes /subscriptions/<your-subscription-id>/resourceGroups/<your-resource-group-name> --sdk-auth
```

- `<your-security-role>` 是您要建立的安全角色的名稱（預設情況下，我們使用應用程式名稱）。
- `<your-subscription-id>` 是您使用的Azure訂閱的ID。可以在訂閱螢幕頂部的 [Azure Portal](https://portal.azure.com/?WT.mc_id=online-jhipster-judubois) 找到。
- `<your-resource-group-name>` 是您的資源組的名稱。

執行該指令以獲取安全令牌。 然後，在應用程式所在的GitHub專案中，轉到`Settings > Secrets`，然後建立一個名為`AZURE_CREDENTIALS`的新金鑰，您需要在其中貼上安全令牌。

## <a name="6"></a> 將Spring Boot微服務部署到Azure Spring Cloud

[Azure Spring Cloud](https://azure.microsoft.com/services/spring-cloud/?WT.mc_id=online-jhipster-judubois) 是Spring Boot應用程式的託管服務. 它可以承載任何型別的JHipster應用程式，包括單體，但是它特別適合於承載遵循標準JHipster[微服務架構]({{site.url}}/microservices-architecture/) 的JHipster微服務和JHipster閘道器。

### Azure Spring Cloud子產生器的侷限性

Azure Spring Cloud提供基於Netflix Eureka的託管發現伺服器，因此該服務器只能與服務發現設定為`no`或`JHipster Registry`的JHipster應用程式一起使用：

- 如果應用程式中未設定任何服務發現，則下面描述的子產生器將自動新增Netflix Eureka。 這是使微服務在Azure Spring Cloud上執行的最簡單方法。
- JHipster Registry實際上是Netflix Eureka伺服器，因此它與Azure Spring Cloud完全相容。 JHipster為Eureka提供了許多自定義設定：由於您應由Azure Spring Cloud管理，因此需要在`application.yml`檔案中刪除Spring Boot屬性`eureka.instance.instanceId`。 其他`eureka`屬性可與Azure Spring Cloud配合使用，但是可以將其刪除以使用Azure的預設值。 使用此設定時，您將受益於JHipster的某些高階功能，例如分散式快取設定，這些功能通常依賴於JHipster Registry。

因此，使用Hashicorp Consul作為服務發現機制的應用程式無法正常執行，因為Azure Spring Cloud不支援此功能。

### 生成Azure Spring Cloud的設定

必須將特定的Azure Spring Cloud擴充套件新增到"az CLI"：

```sh
az extension add --name spring-cloud
```

安裝此擴充套件程式後，您將能夠執行`az spring-cloud`指令，並使用JHipster自動執行Azure Spring Cloud設定。

要在Azure Spring Cloud上部署JHipster應用程式，有一個特定的`azure-spring-cloud`子產生器：

```sh
jhipster azure-spring-cloud
```

該子產生器可以與以下標識一起使用：

- `--skip-build` 跳過建立應用程式
- `--skip-deploy` 跳過部署到Azure Spring Cloud

然後將需要回答以下問題。 您可能需要訪問 [Azure Portal](https://portal.azure.com/?WT.mc_id=online-jhipster-judubois) 回答他們並檢查設定的資源。

- __Azure resource group name（Azure資源組名稱）:__ 這是將在其中部署應用程式的Azure資源組的名稱。 我們建議使用指令 `az configure --defaults group=<resource group name>`設定預設的Azure資源組。
- __Azure Spring Cloud service name (the name of your cluster):__ 這是您的Azure Spring Cloud群集實例的名稱。 我們建議使用指令 `az configure --defaults spring-cloud=<resource group name>`設定預設的Azure Spring Cloud服務名稱。
- __Azure Spring Cloud application name（Azure Spring Cloud應用程式名稱）:__ 您要在Azure Spring Cloud上部署的Spring Boot應用程式的名稱。
- __Which type of deployment do you want（您想要哪種型別的部署） ?__ 您可以使用Maven在本地建立和部署應用程式，也可以使用GitHub Actions為您自動建立和部署應用程式。

### 『azure』 Maven和Spring Boot設定檔案

如果您已瞭解上面有關`azure-app-service`子產生器的文件，則`azure-spring-cloud`子產生器的工作方式會有所不同，因為它設定了：

- 一個名為`azure`Spring Boot的新設定檔案，設定在`src/main/resources/config/application-azure.yml`。
- 一個新的Maven設定檔案，也稱為`azure`。 該Maven設定檔案將在執行時自動強制使用`prod`和`azure` Spring Boot設定檔案，因此無需在Azure Spring Cloud級別進行設定（這是Azure App Service的主要區別， 被設定為環境變數）。

有關在JHipster設定檔案的詳細訊息， 查閱[設定檔案]({{ site.url }}/profiles/).

### Azure Spring Cloud特定功能

如以上部分所述，`azure-spring-cloud`子產生器新增了特定的`azure` Maven設定檔案。 此設定檔案在建立時新增了一些函式庫，以便正在執行的應用程式可以從Azure Spring Cloud的特定功能中受益：

- 它將應用程式連線到託管的Spring Cloud Service Discovery伺服器（如上節`Azure Spring Cloud`子產生器的限制中所述）。
- 它使用託管的Spring Cloud Config Server設定應用程式。
- 它將分散式跟蹤資料傳送到Azure Monitor。

### 使用GitHub Actions進行部署

建議使用GitHub Actions進行部署，因為它比在本地電腦上更容易並且可能更快。

- 設定儲存在 `.github/workflows/azure-spring-cloud.yml` 。
- 預設情況下，每次在`main`分支上有新的`push`事件時，都會部署該應用程式。
- 此部署機制直接使用『az CLI』部署到Azure Spring Cloud群集。

為了獲得授權將應用程式部署到您的Azure Spring Cloud群集中，GitHub需要有權訪問名為`AZURE_CREDENTIALS`的安全令牌。
可以使用以下指令行生成此令牌：

```sh
az ad sp create-for-rbac --name http://<your-security-role> --role contributor --scopes /subscriptions/<your-subscription-id>/resourceGroups/<your-resource-group-name> --sdk-auth
```

- `<your-security-role>` 是您要建立的安全角色的名稱（預設情況下，我們使用應用程式名稱）。
- `<your-subscription-id>` 是您正在使用的Azure訂閱的ID。 可以在[Azure門戶](https://portal.azure.com/?WT.mc_id=online-jhipster-judubois) 的訂閱螢幕頂部找到它。
- `<your-resource-group-name>` 是您的資源組的名稱。

執行該指令以獲取安全令牌。 然後，在應用程式所在的GitHub專案中，轉到`Settings > Secrets`，然後建立一個名為`AZURE_CREDENTIALS`的新金鑰，您需要在其中貼上安全令牌。
