---
layout: default
title: Openshift
permalink: /openshift/
redirect_from:
  - /openshift.html
sitemap:
    priority: 0.7
    lastmod: 2017-04-30T00:00:00-00:00
---

# [BETA]部署到OpenShift

**警告！** 這是**BETA**WIP版本的新子產生器！非常歡迎大家反饋！！享受OpenShifting！

該子產生器允許將JHipster應用程式部署到[Openshift容器平台](https://www.openshift.com/)/[OpenShift Origin](https://www.openshift.org/)。

[![]({{ site.url }}/images/logo/logo-openshift.png)](https://www.openshift.com/)

## 進行中的工作

- Mongo和Cassandra複製模式尚未測試

## 安裝選項

OpenShift提供兩個選項，

- OpenShift Origin-是為增強OpenShift的開源上游專案
- OpenShift容器平台-是Red Hat支援的企業容器應用程式平台

## Minishift

[Minishift](https://github.com/minishift/minishift)是一個工具包，可以在一個OpenShift VM中本地執行所有功能。Minishift在筆記型電腦上的VM內執行一個單節點OpenShift群集，供使用者在本地試用。

Minishift需要虛擬機監控程序才能啟動設定了OpenShift群集的虛擬機。在啟動Minishift之前，請確保已在系統上安裝並啟用了所選的虛擬機管理程式。

## 先決條件

您必須安裝：

- [Docker](https://docs.docker.com/installation/#installation)
- Hypervisor - 根據您的作業系統，您可以選擇不同的選項

您必須具有Docker倉庫。如果您沒有，可以使用官方的[Docker Hub](https://hub.docker.com/)

Minishift可讓您在本地試用Origin和Container Platform，

- [OpenShift Origin](https://github.com/minishift/minishift)
- [OpenShift容器平台](https://developers.redhat.com/products/cdk/overview/)-Red Hat Container Development Kit提供了一個基於Red Hat Enterprise Linux的Minishift打包的預建立容器開發環境。現在，開發人員可以透過[redhat.com](https://developers.redhat.com)進行註冊和下載，透過免費的Red Hat EnterpriseLinux®Developer Suite訂閱獲得Red Hat容器開發套件，用於開發目的。

子產生器可與Origin和Container Platform一起正常工作，並使用與Docker相同的映象版本。

## 執行子產生器

要為OpenShift生成設定檔案，請在project/root資料夾中執行以下指令：

`jhipster openshift`

然後回答所有問題以部署您的應用程式。

### Which *type* of application would you like to deploy? (您要部署哪種*型別*的應用程式？)

應用程式的型別取決於您是否希望部署微服務或monoliths。

### Enter the root directory where your applications are located (輸入應用程式所在的根目錄)

輸入路徑。所有OpenShift產生器檔案都將保留在此路徑中

### Which applications do you want to include in your OpenShift configuration? (您要在OpenShift設定中包括哪些應用程式？)

選擇您的應用程式。


### Enter the admin password used to secure the JHipster Registry admin (輸入用於保護JHipster Registry admin的管理員密碼)

僅當您選擇微服務架構時，才會顯示此問題。

### What should we use for the OpenShift namespace? (我們應該使用什麼OpenShift命名空間？)

這是OpenShift專案空間，其中部署了所有服務，並將生成的檔案標記到此樣板

### Which *type* of database storage would you like to use? （您想使用哪種*型別*的資料庫儲存？）

僅當任何選定的應用程式選擇了資料庫型別時，才會顯示此問題。這會提示您提供臨時儲存或持久儲存選項。本質上，容器是短暫的（在重新啟動/崩潰之間不會保留資料）。永久儲存選項允許安裝外部儲存，例如NFS，EBS等。這樣資料就可以在重啟和故障之間保留下來。

### What should we use for the base Docker repository name? （Docker倉庫基本名稱應該使用什麼？）

如果您選擇[Docker Hub](https://hub.docker.com/)作為主倉庫，則將是您的Docker Hub登入名。

### What command should we use for push Docker image to repository? (我們應該使用什麼指令將Docker映象推送到倉庫？)

推送到Docker Hub的預設指令是`docker image push`

例如，如果您使用Google Cloud託管Docker映象，則將是：`gcloud docker push`

## 更新已部署的應用程式

### 準備新的部署

在已經部署了應用程式之後，可以透過發布新的Docker映象來重新部署它：

`./mvnw package -Pprod -DskipTests jib:dockerBuild`

使用gradle:

`./gradlew -Pprod bootJar jibDockerBuild -x test`

如果您在執行由jib外掛生成的映象時遇到任何問題（例如`chmod +x entrypoint.sh not permitted`），那麼您可能必須更新scc。進行以下更改，`oc edit scc restricted`並將`runAsUser.Type`策略更新為`RunAsAny`

### 推送到Docker Hub

在本地標記您的映象：

`docker image tag application username/application`

將映象推送到Docker Hub：

`docker image push username/application`

## 部署應用程式

部署應用程式：

您可以透過以下任一方式部署所有應用程式：
  `<directoryPath>/ocp/ocp-apply.sh`

或者

  `oc apply -f <directoryPath>/ocp/registry`
  `oc apply -f <directoryPath>/ocp/app1gw`
然後透過選擇在所選命名空間中建立的樣板從OpenShift控制台安裝應用程式

它將為您的應用程式及其相關的依賴服務（資料庫，elasticsearch…）以及用於Pod到Pod通訊（內部服務）的OpenShift服務以及從外部訪問應用程式的路由建立OpenShift部署。

## 有關微服務應用程式的訊息

### 部署服務Registry

雖然，OpenShift確實具有透過**Kube-DNS**進行內部服務發現，透過ConfigMaps進行集中設定管理以及透過EFK Stack進行集中日誌記錄的功能，因為JHipster依靠Spring Cloud進行設定管理，依靠Eureka/Consul進行服務發現和jhipster-console（ELK）對於日誌管理，OpenShift部署也支援相同功能。

因此，對於微服務應用程式，JHipster OpenShift子產生器將生成清單檔案，以部署**JHipster-Registry**（基於Eureka）或**Consul**。此外，生成的微服務和閘道器清單將包含適當的設定，以將其自身註冊到其中央registry服務。

### 管理JHipster Registry或Consul

對於JHipster Registry和Consul，提供了[StatefulSets](https://kubernetes.io/docs/concepts/abstractions/controllers/statefulsets/)設定。這些是一種特殊的部署artifact，可以處理有狀態的應用程式，並使您可以擴充套件服務registry以實現高可用性。請注意，**StatefulSets**尚未在OpenShift中投入生產。它處於技術預覽（BETA）中，您需要OpenShift版本> = 3.5才能使用此功能。

### 集中設定

還可以使用**Spring Cloud Config Server**（使用JHipster-Registry時）或Consul金鑰/值儲存（使用Consul時）來設定集中式設定。預設情況下，兩個設定服務器都從OpenShift [ConfigMap](https://docs.openshift.org/latest/dev_guide/configmaps.html)載入其設定，該對映包含以下格式的屬性檔案：

```
apiVersion: v1
kind: ConfigMap
metadata:
  name: application-config
  namespace: default
data:
  application.yml: |- # global properties shared by all applications
    jhipster:
      security:
        authentication:
          jwt:
            secret: secret
  gateway-prod.yml: |- # gateway application properties for the "prod" profile
    foo:
      bar: foobar
```

## 故障排除技巧

- 如果您正在執行多合一VM，請確保在推送Docker映象之前執行以下指令，`eval $(docker-machine env <machine_name>)`
- 如果您在使用永久儲存執行StatefulSets或Services時遇到問題，請確保正確初始化了永久卷。
- 如果您在執行StatefulSets時遇到問題，請檢查持久卷宣告。如果PVC在初始化時比平時花費更長的時間，請嘗試手動建立。
- 執行產生器後，在應用oc指令之前，請確保您位於選定的名稱空間**oc專案<namespace>**中。
- 用於elasticsearch，registry，console等服務的映象拉取。第一次需要一些時間，因為它需要從公共倉庫中拉到容器倉庫中。如果任何從屬服務因此而失敗，請在其所依賴的服務啟動並執行後，嘗試對其進行部署。
- 請確保您具有執行某些Pod所需的scc服務所需的特權（可能需要管理員）。

## 更多訊息

*   [OpenShift Origin文件](https://docs.openshift.org/latest/welcome/index.html)
*   [OpenShift容器平台](https://access.redhat.com/documentation/en/openshift-container-platform/)
*   [Minishift](https://github.com/minishift/minishift#documentation)
*   [OpenShift CLI](https://docs.openshift.org/latest/cli_reference/get_started_cli.html)
