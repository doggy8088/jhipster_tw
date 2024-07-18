---
layout: default
title: 部署到Google Cloud Platform
permalink: /gcp/
sitemap:
    priority: 0.5
    lastmod: 2018-10-02T00:00:00-00:00
---

# <i class="fa fa-cloud-upload"></i> 部署到Google Cloud Platform

[![Google Cloud Platform]({{ site.url }}/images/logo/logo-gcp.png)](https://cloud.google.com)

您可以將JHipster應用程式部署到Google Cloud Platform並在以下平台上執行：
- [Google Compute Engine](https://cloud.google.com/compute/)的虛擬機
- [Google Kubernetes Engine](https://cloud.google.com/kubernetes-engine/)的Kubernetes中的容器
- [Google App Engine](https://cloud.google.com/appengine/)的平台即服務

您可以[免費試用Google Cloud Platform](https://cloud.google.com/free)來部署您的應用程式。在免費試用之後，請檢查[Always Free](https://cloud.google.com/free/)級別的免費使用情況是否以達到指定的使用限制。

## 開始之前

在本地環境中安裝gcloud SDK並透過其進行身份驗證，以訪問`gcloud` CLI。有關更多訊息，請訪問此連結：

- [安裝gcloud SDK](https://cloud.google.com/sdk/install)

## 部署到Google App Engine

Google App Engine是一個完全託管的平台即服務，可以在負載下自動擴充套件應用程式實例，不使用時可以縮減為零。

您可以使用Google App Engine產生器來生成和部署JHipster應用程式。Google App Engine產生器透過Cloud SQL MySQL/PostgreSQL資料庫支援單體和微服務應用程式。
#### 將單體應用部署到Google App Engine
1. 生成一個新的monolith應用程式：`jhipster`
1. 執行Google App Engine產生器：`jhipster gae`
1. 如果建立全新的應用程式，則可以選擇建立一個新的Cloud SQL實例

該產生器將：
1. 新增描述App Engine實例和擴充套件設定的`src/main/appengine/app.yaml`。
1. 將App Engine外掛新增到Maven/Gradle。

To deploy:
請注意，當前Google App Engine產生器僅支援部署到[App Engine標準（Java 11）](https://cloud.google.com/appengine/docs/standard/java11/)環境。

- 使用App Engine外掛來部署：`./mvnw package appengine:deploy -DskipTests -Pgae,prod-gae`或者使用Gradle `./gradlew appengineDeploy -Pgae -Pprod-gae`

#### Deploying Microservices to Google App Engine
[Google Cloud在GAE上支援微服務架構]（https://cloud.google.com/appengine/docs/standard/java/microservices-on-app-engine）
透過將每個微服務隔離為一個單獨的服務。 我們使用[`dispatch.yaml`檔案]（https://cloud.google.com/appengine/docs/standard/java11/reference/dispatch-yaml）
將請求從閘道器路由到每個微服務。 因此，為了將微服務部署到GAE，您將需要將閘道器和每個微服務部署為單獨的服務。

以下是需要執行的步驟。
1.在每個微服務上執行GAE子產生器。 將其作為第一步執行是很重要的，因為閘道器應用程式的安裝將取決於此。

2.在閘道器應用程式上執行GAE子產生器。 這將提示您一些其他問題，以建立`dispatch.yaml`檔案。

3.Maven使用`./mvnw package appengine:deploy -DskipTests -Pgae,prod,prod-gae` 或gradle使用`./gradlew appengineDeploy -Pgae -Pprod-gae`來部署每個微服務和閘道器應用程式。

**注1**如果您使用的是Windows，我們建議您使用[Windows Subsystem for Linux]（https://docs.microsoft.com/zh-cn/windows/wsl/install-win10）
或[jhipster-devbox]（https://github.com/jhipster/jhipster-devbox）以避免Windows重大問題，例如[https://github.com/jhipster/generator-jhipster/issues/11249
]（https://github.com/jhipster/generator-jhipster/issues/11249）
**注2**如果您使用的是Cloud SQL，則需要將Cloud SQL用戶端角色新增到App Engine服務帳戶。 請參閱[https://cloud.google.com/sql/docs/mysql/connect-app-engine#setting_up](https://cloud.google.com/sql/docs/mysql/connect-app-engine#setting_up）

此外，Google App Engine還提供了全套功能來管理你的系統：
- 流量拆分-部署應用程式的多個版本，並將流量拆分為不同的版本。這對於canary的新變化也很棒。
- Stackdriver Logging-自動將應用程式日誌捕獲和儲存在集中式日誌記錄中，可以對其進行搜尋，監視和匯出。
- 錯誤報告-自動提取日誌的錯誤和異常，並在發現新的錯誤通知您。
- 雲除錯器-允許您除錯生產應用程式而無需停止工作。如果您需要更多日誌訊息來診斷問題，可以新增新的日誌訊息，而無需重新部署/重新啟動應用程式。

您可以透過[Ray Tsang](https://twitter.com/saturnism)和[Ludovic Champenois](https://twitter.com/ludoch)在 [2018 JHipster Conf video on the Google App Engine generator](https://www.youtube.com/watch?v=J9_MW3HOj5w)的功能。

## 部署到Google Kubernetes Engine

Google Kubernetes Engine是完全託管的Kubernetes叢集即服務。設定後，您可以使用標準Kubernetes指令部署容器和JHipster應用程式。

1. 啟用API：`gcloud services enable container.googleapis.com containerregistry.googleapis.com`
1. 如果尚未安裝，請安裝`kubectl` CLI：`gcloud components install kubectl`
1. 建立一個新的Google Kubernetes Engine叢集：`gcloud container clusters create mycluster --zone us-central1-a --machine-type n1-standard-4`

_其他選擇，可檢視 GCP's [區域](https://cloud.google.com/compute/docs/regions-zones/) 和 [機器型別](https://cloud.google.com/compute/docs/machine-types/) 。_

建立叢集後，可以使用JHipster Kubernetes產生器生成部署描述符。

1. 生成Kubernetes部署檔案：`jhipster kubernetes`
1. 如果您想使用Google Container Registry在私有倉庫中發布容器映象：
  1. **What should we use for the base Docker repository name（我們應該使用什麼作為基礎Docker倉庫名稱）**設定到`gcr.io/YOUR_PROJECT_ID`

建立容器映象。

1. 如果使用Google Container Registry，則無需本地Docker守護程式即可直接建立到倉庫：`./mvnw package -Pprod jib:build`
1. 否則，建立到Docker守護程式：`./mvnw package -Pprod jib:dockerBuild`

部署到Kubernetes叢集：

1. 應用Kubernetes設定：`./kubectl-apply.sh`

有關Kubernetes產生器的全部功能，請參閱[部署到Kubernetes](/kubernetes)。

## 啟用HTTPS

要為您的叢集啟用HTTPS，請參閱[外部負載均衡文件](https://spring-gcp.saturnism.me/deployment/kubernetes/load-balancing/external-load-balancing) 。

您可以透過在SecurityConfiguration.java中新增以下設定來強制使用HTTPS。

```java
// Spring MVC
http.requiresChannel(channel -> channel
    .requestMatchers(r -> r.getHeader("X-Forwarded-Proto") != null).requiresSecure());

// WebFlux
http.redirectToHttps(redirect -> redirect
    .httpsRedirectWhen(e -> e.getRequest().getHeaders().containsKey("X-Forwarded-Proto")));
```

參見Spring Security的 [Servlet](https://docs.spring.io/spring-security/site/docs/5.5.x/reference/html5/#servlet-http-redirect) 和 [WebFlux](https://docs.spring.io/spring-security/site/docs/5.5.x/reference/html5/#webflux-http-redirect) 文件瞭解更多訊息。