---
layout: default
title: 部署到Kubernetes
permalink: /kubernetes/
redirect_from:
  - /kubernetes.html
sitemap:
    priority: 0.7
    lastmod: 2018-06-10T00:00:00-00:00
---

# 部署到Kubernetes

可以透過以下方式部署JHipster應用程式和相關服務

- 標準 kubectl/kustomize/skaffold 子產生器 `jhipster kubernetes|k8s`
- Helm 子產生器 `jhipster kubernetes-helm|helm-k8s`
- Knative 子產生器 `jhipster kubernetes-knative|knative`

# `jhipster kubernetes | k8s`

該子產生器生成清單，並透過`kubectl/kustomize/skaffold cli`部署到[Kubernetes](http://kubernetes.io/)。


該子產生器允許將您的JHipster應用程式部署到[Kubernetes](http://kubernetes.io/)。

[![]({{ site.url }}/images/logo/logo-kubernetes.png)](http://kubernetes.io/)

## 侷限

- 目前尚不支援Cassandra
- 需要Kubernetes v1.9+

## 先決條件

您必須安裝：

- [Docker](https://docs.docker.com/installation/#installation)
- [kubectl](http://kubernetes.io/docs/user-guide/prereqs/)

您必須具有Docker registry。如果您沒有，則可以使用官方的[Docker Hub](https://hub.docker.com/)。

## Minikube

[Minikube](https://github.com/kubernetes/minikube)是一種有助於在本地執行Kubernetes的工具。Minikube在筆記型電腦上的VM內執行一個單節點Kubernetes叢集，供希望試用Kubernetes或每天使用它開發的使用者使用。

在將其推送到[Kubernetes](http://kubernetes.io/)之前，可以使用它來測試您的應用程式。

## 執行子產生器

要為Kubernetes生成設定檔案，請在新檔案夾中執行以下指令：

`jhipster kubernetes | k8s`

然後回答所有問題以部署您的應用程式。

### Which *type* of application would you like to deploy?（您要部署哪種*型別*的應用程式？）

您的應用程式型別取決於您是希望部署微服務架構還是傳統應用程式。

### Enter the root directory where your applications are located（輸入應用程式所在的根目錄）

輸入路徑。

### Which applications do you want to include in your Kubernetes configuration?(您想在Kubernetes設定中包括哪些應用程式？)

選擇您的應用程式。

### Do you want to setup monitoring for your applications? （是否要設定對應用程式的監視？）

選擇選項。

### Enter the admin password used to secure the JHipster Registry admin(輸入用於保護JHipster Registry admin的管理員密碼)

僅當您選擇微服務架構時，才會顯示此問題。

### What should we use for the Kubernetes namespace?（我們應該為Kubernetes命名空間使用什麼？）

請參閱[此處](http://kubernetes.io/docs/user-guide/namespaces/)有關名稱空間的文件

### What should we use for the base Docker repository name?（基本的Docker倉庫名稱應該使用什麼？）

如果您選擇[Docker Hub](https://hub.docker.com/)作為主倉庫，則將是您的Docker Hub登入名。

如果您選擇[Google Container Registry](https://cloud.google.com/container-registry/)，則為`gcr.io/[PROJECT ID]`或區域registry，例如`eu.gcr.io/[PROJECT ID]`，`us.gcr.io/[PROJECT ID]`，或`asia.gcr.io/[PROJECT ID]`。有關詳細訊息，請參見[推送拉取映象](https://cloud.google.com/container-registry/docs/pushing-and-pulling)。

如果您選擇其他映像函式庫，例如[Harbor](https://goharbor.io/) ，[Quay](https://www.openshift.com/products/quay) 或類似的映像函式庫，則登入名將類似於`<Registry_server>/<repo>/[專案ID]`

### What command should we use for push Docker image to repository? (我們應該使用什麼指令將Docker映象推送到倉庫？)

推送到Docker Hub的預設指令是`docker image push`

如果您使用Google Container Registry發布Docker映象，它將是： `gcloud docker push`

### Choose the Kubernetes service type for your edge services?（為您的邊緣服務選擇Kubernetes服務類別型？）

選擇適當的K8s路由型別。

這些是標準提示。 此外，還會根據選擇的選項（例如Istio，Ingress等）顯示其他提示。

## Updating your deployed application (更新已部署的應用程式)

### 準備新的部署

在已經部署了應用程式之後，可以透過建立新的Docker映象來重新部署它：

`./mvnw package -Pprod -DskipTests jib:dockerBuild`

使用Gradle：

`./gradlew -Pprod bootJar jibDockerBuild -x test`

### 推送到Docker Hub

在本地標記您的映象：

`docker image tag application username/application`

將映象推送到Docker Hub：

`docker image push username/application`

## 部署單體或微服務應用程式

您可以透過執行以下指令來部署所有應用程式：

```
./kubectl-apply.sh -f (default option)  [or] ./kubectl-apply.sh -k (kustomize option) [or] ./kubectl-apply.sh -s (skaffold run)
```

您可以使用kustomize部署應用程式：

```
kubectl apply -k ./
```

您可以使用skaffold部署應用程式：

```
skaffold run [or] skaffold deploy
```

它將部署應用程式及其相關附屬服務（資料庫，elasticsearch等）。

### 自定義命名空間

可以為整個部署指定自定義命名空間。要執行自定義指令，必須指定目標命名空間，如以下範例所示：

`kubectl get pods -n <custom-namespace>`

### 擴充套件部署

您可以使用以下方法擴充套件應用程式

`kubectl scale deployment <app-name> --replicas <replica-count> `

### 零停機時間部署

更新Kubernetes中正在執行的應用程式的預設方法是將新的映象標籤部署到Docker倉庫中，然後使用以下方法進行部署：

`kubectl set image deployment/<app-name>-app <app-name>=<new-image>`

使用livenessProbes和ReadinessProbe可以使Kubernetes知道應用程式的狀態，以確保服務的可用性。如果要零停機時間部署，則每個應用程式至少需要2個副本。這是因為捲動升級策略首先會終止正在執行的副本以放置新副本。僅執行一個副本將導致升級期間的短暫停機時間。

### 在Kubernetes中部署服務Registry

儘管Kubernetes透過**Kube-DNS**擁有自己的內部服務發現功能，但JHipster依靠Spring Cloud進行服務發現，因此它依賴於第三方服務registry，例如Eureka或Consul。這具有平台獨立的優勢，並且可以在生產環境和本地開發電腦上類似地工作。

因此，對於微服務應用程式，JHipster Kubernetes子產生器將生成Kubernetes清單檔案，以部署服務登錄檔，例如**JHipster-Registry**（基於Eureka）或**Consul**。此外，生成的微服務和閘道器Kubernetes清單將包含適當的設定，以將自身註冊到其中央registry。

### 在Kubernetes中管理JHipster Registry或Consul

對於JHipster Registry和Consul，提供了[StatefulSets](https://kubernetes.io/docs/concepts/abstractions/controllers/statefulsets/)設定。這些是Kubernetes的一種資源，可以處理有狀態的應用程式，並使您能夠擴充套件服務Registry以實現高可用性。有關Eureka和Consul的高可用性的更多訊息，請參閱它們各自的文件。

### Kubernetes中的集中設定

還可以使用**Spring Cloud Config Server**（使用JHipster Registry）或**Consul鍵/值儲存**（使用Consul）來設定集中設定。預設情況下，兩個設定服務器都從Kubernetes [ConfigMap](http://kubernetes.io/docs/user-guide/configmap/)載入其設定，該對映包含以下格式的屬性檔案：

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

預設情況下，設定服務器在開發模式下執行，這意味著YAML屬性檔案直接從檔案系統中讀取，並在更改時熱重新載入。對於生產，建議按照我們的 [JHipster-Registry設定服務器]({{ site.url }}/jhipster-registry)和[Consul設定服務器]({{ site.url }}/consul)的微服務文件中的說明從Git儲存庫設定設定。

### 暴露headlesss服務

該registry是使用Kubernetes中的headless服務部署的，因此主要服務沒有IP地址，並且無法獲取節點連接埠。您可以使用以下任何一種型別建立輔助服務：

`kubectl expose service jhipster-registry --type=NodePort --name=exposed-registry `

並使用以下指令檢視詳情

`kubectl get svc exposed-registry `

要擴充套件JHipster Registry，請使用

`kubectl scale statefulset jhipster-registry --replicas 3 `

## 監控工具

子產生器提供監控工具和設定，以用於您的應用程式。

### Prometheus指標

如果尚未完成，請安裝[Prometheus operator by CoreOS](https://github.com/coreos/prometheus-operator)。您可以使用以下方法快速部署操作員

`kubectl create -f https://raw.githubusercontent.com/coreos/prometheus-operator/master/bundle.yaml`

**提示**：有關如何在應用程式中啟用和保護prometheus指標的更多訊息，請參見我們的[監控文件]({{ site.url }}/monitoring/#configuring-metrics-forwarding)。

您的應用程式的Prometheus實例可以使用以下指令檢視

`kubectl get svc prometheus-appname `

## 利用Kubernetes

Kubernetes提供了許多現成的工具來幫助微服務部署，例如：
* 服務Registry-Kubernetes`Service`是一等的公民，它透過DNS名稱提供服務registry和查詢。
* 負載均衡-Kubernetes Service充當4層負載均衡器。
* 健康檢查-Liveness探針和readiness探針可幫助確定服務的健康性。
* 設定-Kubernetes `ConfigMap`可用於在應用程式外部儲存和應用設定。

使用Kubernetes設施有很多好處：
* 簡化部署
* 無需額外的Eureka /Consul部署
* 無需Spring Cloud Gateway代理/路由請求
* 無需Spring Cloud Load Balancer

同時，還有一些缺點：
* 無法透過JHipster Registry進行應用程式管理-此功能依賴於Spring Cloud的`DiscoveryClient`。未來可以更新以新增`spring-cloud-kubernetes`
* No local Docker Compose support - You must use `minikube` for local development, and use Ingress to route traffic
* 不支援本地Docker Compose-您必須使用`minikube`進行本地開發，並使用Ingress路由流量
* 沒有請求級的負載均衡-Kubernetes Service是一個L4負載均衡器，它對每個連線進行負載均衡。使用Istio進行請求級別的負載均衡（請參閱下文）。

### 使用Kubernetes作為服務Registry

為了避免依賴Eureka或Consul，您需要完全停用服務發現
* 當詢問`Which service discovery server do you want to use?(您要使用哪個服務發現伺服器？)`時，選擇`No service discovery`

JHipster閘道器通常在API呼叫之前，並使用`Spring Cloud Gateway`路由這些呼叫。如果沒有服務registry，則無法透過`Spring Cloud Gateway`進行路由。您需要使用Kubernetes Ingress將流量路由到微服務。
* 當系統詢問`Choose the kubernetes service type for your edge services(您為邊緣服務選擇kubernetes服務類別型)`時，請選擇`Ingress`。

## Istio

您可以將微服務部署到啟用[Istio](https://istio.io)的Kubernetes叢集中。在Kubernetes管理微服務部署和設定的同時，Istio可以管理服務到服務的通訊，例如請求級負載均衡，重試，斷路器，流量路由/拆分等。

要啟用Istio支援：
* 當詢問`Do you want to configure Istio?（您是否要設定Istio？）`時，選擇一個Istio選項
* 當詢問`Do you want to generate Istio route files(您是否要生成Istio路由檔案)`時，請選擇`Yes`以生成斷路等的預設設定。

## 故障排除

> 由於'imagePullBackoff'，我的應用程式沒有被拉取

檢查您的Kubernetes叢集正在訪問的registry。如果您使用的是私有registry，則應透過`kubectl create secret docker-registry`將其新增到名稱空間中（有關詳細訊息，請參閱[文件](https://kubernetes.io/docs/tasks/configure-pod-container/pull-image-private-registry/)）。

> 我的應用程式在啟動之前就被終止

如果您的群集資源不足（例如Minikube），則會發生這種情況。增加部署的livenessProbe的`initialDelySeconds`值。

> 儘管我的叢集中包含許多資源，但是我的應用程式啟動非常緩慢

預設設定針對中規模叢集進行了最佳化。您可以隨意增加JAVA_OPTS環境變數，資源請求和限制以提高效能。但是需要小心！

> 我選擇了Prometheus，但沒有目標可見

這取決於Prometheus操作者的設定以及叢集中的訪問控制策略。要使RBAC設定正常工作，需要版本1.6.0+。

> 我選擇了Prometheus，但我的目標從未被捕獲

這意味著您的應用程式可能不是使用Maven/Gradle中的`prometheus`設定檔案建立的

> 我的基於SQL的微服務在執行多個副本的Liquibase初始化期間被卡住

有時資料庫更改日誌鎖被破壞。您將需要使用`kubectl exec -it`連線到資料庫，並刪除liquibases `databasechangeloglock`表的所有行。

# `jhipster kubernetes-helm | k8s-helm`

該子產生器生成清單，並透過`helm cli`部署到[Kubernetes](http://kubernetes.io/) 。

## 前提

要使用此子產生器生成的清單，`helm cli`應安裝。 請遵循[此連結](https://github.com/helm/helm) 以獲得安裝說明。 這需要`helm 2.12.x或更高版本`。

安裝Helm後，您需要新增以下儲存庫：
```
helm repo add stable https://kubernetes-charts.storage.googleapis.com
helm repo add incubator https://kubernetes-charts-incubator.storage.googleapis.com
```
這些儲存庫應新增到本地快取中，因為此子產生器將從上述儲存庫中提取穩定的生產級服務圖表。

該子產生器將`kubernetes`子產生器用於應用程式清單，並從上述儲存庫中提取應用程式中引用的資料庫，elasticsearch，prometheus等映像服務。

## 部署

您可以透過執行以下指令來部署所有應用程式：

```
bash helm-apply.sh (or) ./helm-apply.sh
```

`helm-apply.sh`將始終執行全新安裝。 首先刪除所有具有相同標識的現有圖表，然後進行全新安裝。

您可以透過執行以下指令來升級所有應用程式（如果對生成的清單進行了任何更改）：

```
bash helm-upgrade.sh (or) ./helm-upgrade.sh
```


# `jhipster kubernetes-knative | knative`

該子產生器生成清單，該清單透過`kubectl或helm cli`部署到[Kubernetes](http://kubernetes.io/) 。 它根據選定的提示回應為cli之一生成清單。

## 前提

此子產生器取決於Istio。 為了使用此子產生器生成的清單，您應該在群集中安裝istio和kntaive。 按照[此連結](https://knative.dev/docs/install/) 進行安裝說明。 它需要`knative 0.8.x或更高版本`。

## 部署

如果您選擇使用Kubernetes Generator進行部署，請執行以下指令：
```
bash kubectl-knative-apply.sh (or) ./kubectl-knative-apply.sh
```

如果您選擇使用Helm generator進行部署，請執行以下指令：
```
bash helm-knative-apply.sh (or) ./helm-knative-apply.sh
```

`helm-knative-apply.sh`將始終執行全新安裝。 首先刪除所有具有相同標識的現有圖表，然後進行全新安裝。

您可以透過執行以下bash指令來升級所有應用程式（如果對生成的清單進行了任何更改）：

```
bash helm-knative-upgrade.sh (or) ./helm-knative-upgrade.sh
```

## 更多訊息

*   [Kubernetes文件](http://kubernetes.io/docs/)
