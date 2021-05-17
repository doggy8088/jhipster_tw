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

可以通过以下方式部署JHipster应用程序和相关服务

- 标准 kubectl/kustomize/skaffold 子生成器 `jhipster kubernetes|k8s`
- Helm 子生成器 `jhipster kubernetes-helm|helm-k8s`
- Knative 子生成器 `jhipster kubernetes-knative|knative`

# `jhipster kubernetes | k8s`

该子生成器生成清单，并通过`kubectl/kustomize/skaffold cli`部署到[Kubernetes](http://kubernetes.io/)。


该子生成器允许将您的JHipster应用程序部署到[Kubernetes](http://kubernetes.io/)。

[![]({{ site.url }}/images/logo/logo-kubernetes.png)](http://kubernetes.io/)

## 局限

- 目前尚不支持Cassandra
- 需要Kubernetes v1.9+

## 先决条件

您必须安装：

- [Docker](https://docs.docker.com/installation/#installation)
- [kubectl](http://kubernetes.io/docs/user-guide/prereqs/)

您必须具有Docker registry。如果您没有，则可以使用官方的[Docker Hub](https://hub.docker.com/)。

## Minikube

[Minikube](https://github.com/kubernetes/minikube)是一种有助于在本地运行Kubernetes的工具。Minikube在笔记本电脑上的VM内运行一个单节点Kubernetes集群，供希望试用Kubernetes或每天使用它开发的用户使用。

在将其推送到[Kubernetes](http://kubernetes.io/)之前，可以使用它来测试您的应用程序。

## 运行子生成器

要为Kubernetes生成配置文件，请在新文件夹中运行以下命令：

`jhipster kubernetes | k8s`

然后回答所有问题以部署您的应用程序。

### Which *type* of application would you like to deploy?（您要部署哪种*类型*的应用程序？）

您的应用程序类型取决于您是希望部署微服务架构还是传统应用程序。

### Enter the root directory where your applications are located（输入应用程序所在的根目录）

输入路径。

### Which applications do you want to include in your Kubernetes configuration?(您想在Kubernetes配置中包括哪些应用程序？)

选择您的应用程序。

### Do you want to setup monitoring for your applications? （是否要设置对应用程序的监视？）

选择选项。

### Enter the admin password used to secure the JHipster Registry admin(输入用于保护JHipster Registry admin的管理员密码)

仅当您选择微服务架构时，才会显示此问题。

### What should we use for the Kubernetes namespace?（我们应该为Kubernetes命名空间使用什么？）

请参阅[此处](http://kubernetes.io/docs/user-guide/namespaces/)有关名称空间的文档

### What should we use for the base Docker repository name?（基本的Docker仓库名称应该使用什么？）

如果您选择[Docker Hub](https://hub.docker.com/)作为主仓库，则将是您的Docker Hub登录名。

如果您选择[Google Container Registry](https://cloud.google.com/container-registry/)，则为`gcr.io/[PROJECT ID]`或区域registry，例如`eu.gcr.io/[PROJECT ID]`，`us.gcr.io/[PROJECT ID]`，或`asia.gcr.io/[PROJECT ID]`。有关详细信息，请参见[推送拉取镜像](https://cloud.google.com/container-registry/docs/pushing-and-pulling)。

如果您选择其他映像库，例如[Harbor](https://goharbor.io/) ，[Quay](https://www.openshift.com/products/quay) 或类似的映像库，则登录名将类似于`<Registry_server>/<repo>/[项目ID]`

### What command should we use for push Docker image to repository? (我们应该使用什么命令将Docker镜像推送到仓库？)

推送到Docker Hub的默认命令是`docker image push`

如果您使用Google Container Registry发布Docker镜像，它将是： `gcloud docker push`

### Choose the Kubernetes service type for your edge services?（为您的边缘服务选择Kubernetes服务类型？）

选择适当的K8s路由类型。

这些是标准提示。 此外，还会根据选择的选项（例如Istio，Ingress等）显示其他提示。

## Updating your deployed application (更新已部署的应用程序)

### 准备新的部署

在已经部署了应用程序之后，可以通过构建新的Docker镜像来重新部署它：

`./mvnw package -Pprod -DskipTests jib:dockerBuild`

使用Gradle：

`./gradlew -Pprod bootJar jibDockerBuild -x test`

### 推送到Docker Hub

在本地标记您的镜像：

`docker image tag application username/application`

将镜像推送到Docker Hub：

`docker image push username/application`

## 部署单体或微服务应用程序

您可以通过运行以下命令来部署所有应用程序：

```
./kubectl-apply.sh -f (default option)  [or] ./kubectl-apply.sh -k (kustomize option) [or] ./kubectl-apply.sh -s (skaffold run)
```

您可以使用kustomize部署应用程序：

```
kubectl apply -k ./
```

您可以使用skaffold部署应用程序：

```
skaffold run [or] skaffold deploy
```

它将部署应用程序及其相关附属服务（数据库，elasticsearch等）。

### 自定义命名空间

可以为整个部署指定自定义命名空间。要执行自定义命令，必须指定目标命名空间，如以下示例所示：

`kubectl get pods -n <custom-namespace>`

### 扩展部署

您可以使用以下方法扩展应用程序

`kubectl scale deployment <app-name> --replicas <replica-count> `

### 零停机时间部署

更新Kubernetes中正在运行的应用程序的默认方法是将新的镜像标签部署到Docker仓库中，然后使用以下方法进行部署：

`kubectl set image deployment/<app-name>-app <app-name>=<new-image>`

使用livenessProbes和ReadinessProbe可以使Kubernetes知道应用程序的状态，以确保服务的可用性。如果要零停机时间部署，则每个应用程序至少需要2个副本。这是因为滚动升级策略首先会终止正在运行的副本以放置新副本。仅运行一个副本将导致升级期间的短暂停机时间。

### 在Kubernetes中部署服务Registry

尽管Kubernetes通过**Kube-DNS**拥有自己的内部服务发现功能，但JHipster依靠Spring Cloud进行服务发现，因此它依赖于第三方服务registry，例如Eureka或Consul。这具有平台独立的优势，并且可以在生产环境和本地开发计算机上类似地工作。

因此，对于微服务应用程序，JHipster Kubernetes子生成器将生成Kubernetes清单文件，以部署服务注册表，例如**JHipster-Registry**（基于Eureka）或**Consul**。此外，生成的微服务和网关Kubernetes清单将包含适当的配置，以将自身注册到其中央registry。

### 在Kubernetes中管理JHipster Registry或Consul

对于JHipster Registry和Consul，提供了[StatefulSets](https://kubernetes.io/docs/concepts/abstractions/controllers/statefulsets/)配置。这些是Kubernetes的一种资源，可以处理有状态的应用程序，并使您能够扩展服务Registry以实现高可用性。有关Eureka和Consul的高可用性的更多信息，请参阅它们各自的文档。

### Kubernetes中的集中配置

还可以使用**Spring Cloud Config Server**（使用JHipster Registry）或**Consul键/值存储**（使用Consul）来设置集中配置。默认情况下，两个配置服务器都从Kubernetes [ConfigMap](http://kubernetes.io/docs/user-guide/configmap/)加载其配置，该映射包含以下格式的属性文件：

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

默认情况下，配置服务器在开发模式下运行，这意味着YAML属性文件直接从文件系统中读取，并在更改时热重新加载。对于生产，建议按照我们的 [JHipster-Registry配置服务器]({{ site.url }}/jhipster-registry)和[Consul配置服务器]({{ site.url }}/consul)的微服务文档中的说明从Git存储库设置配置。

### 暴露headlesss服务

该registry是使用Kubernetes中的headless服务部署的，因此主要服务没有IP地址，并且无法获取节点端口。您可以使用以下任何一种类型创建辅助服务：

`kubectl expose service jhipster-registry --type=NodePort --name=exposed-registry `

并使用以下命令查看详情

`kubectl get svc exposed-registry `

要扩展JHipster Registry，请使用

`kubectl scale statefulset jhipster-registry --replicas 3 `

## 监控工具

子生成器提供监控工具和配置，以用于您的应用程序。

### Prometheus指标

如果尚未完成，请安装[Prometheus operator by CoreOS](https://github.com/coreos/prometheus-operator)。您可以使用以下方法快速部署操作员

`kubectl create -f https://raw.githubusercontent.com/coreos/prometheus-operator/master/bundle.yaml`

**提示**：有关如何在应用程序中启用和保护prometheus指标的更多信息，请参见我们的[监控文档]({{ site.url }}/monitoring/#configuring-metrics-forwarding)。

您的应用程序的Prometheus实例可以使用以下命令查看

`kubectl get svc prometheus-appname `

## 利用Kubernetes

Kubernetes提供了许多现成的工具来帮助微服务部署，例如：
* 服务Registry-Kubernetes`Service`是一等的公民，它通过DNS名称提供服务registry和查找。
* 负载均衡-Kubernetes Service充当4层负载均衡器。
* 健康检查-Liveness探针和readiness探针可帮助确定服务的健康性。
* 配置-Kubernetes `ConfigMap`可用于在应用程序外部存储和应用配置。

使用Kubernetes设施有很多好处：
* 简化部署
* 无需额外的Eureka /Consul部署
* 无需Spring Cloud Gateway代理/路由请求
* 无需Spring Cloud Load Balancer

同时，还有一些缺点：
* 无法通过JHipster Registry进行应用程序管理-此功能依赖于Spring Cloud的`DiscoveryClient`。未来可以更新以添加`spring-cloud-kubernetes`
* No local Docker Compose support - You must use `minikube` for local development, and use Ingress to route traffic
* 不支持本地Docker Compose-您必须使用`minikube`进行本地开发，并使用Ingress路由流量
* 没有请求级的负载均衡-Kubernetes Service是一个L4负载均衡器，它对每个连接进行负载均衡。使用Istio进行请求级别的负载均衡（请参阅下文）。

### 使用Kubernetes作为服务Registry

为了避免依赖Eureka或Consul，您需要完全禁用服务发现
* 当询问`Which service discovery server do you want to use?(您要使用哪个服务发现服务器？)`时，选择`No service discovery`

JHipster网关通常在API调用之前，并使用`Spring Cloud Gateway`路由这些调用。如果没有服务registry，则无法通过`Spring Cloud Gateway`进行路由。您需要使用Kubernetes Ingress将流量路由到微服务。
* 当系统询问`Choose the kubernetes service type for your edge services(您为边缘服务选择kubernetes服务类型)`时，请选择`Ingress`。

## Istio

您可以将微服务部署到启用[Istio](https://istio.io)的Kubernetes集群中。在Kubernetes管理微服务部署和配置的同时，Istio可以管理服务到服务的通信，例如请求级负载均衡，重试，断路器，流量路由/拆分等。

要启用Istio支持：
* 当询问`Do you want to configure Istio?（您是否要配置Istio？）`时，选择一个Istio选项
* 当询问`Do you want to generate Istio route files(您是否要生成Istio路由文件)`时，请选择`Yes`以生成断路等的默认配置。

## 故障排除

> 由于'imagePullBackoff'，我的应用程序没有被拉取

检查您的Kubernetes集群正在访问的registry。如果您使用的是私有registry，则应通过`kubectl create secret docker-registry`将其添加到名称空间中（有关详细信息，请参阅[文档](https://kubernetes.io/docs/tasks/configure-pod-container/pull-image-private-registry/)）。

> 我的应用程序在启动之前就被终止

如果您的群集资源不足（例如Minikube），则会发生这种情况。增加部署的livenessProbe的`initialDelySeconds`值。

> 尽管我的集群中包含许多资源，但是我的应用程序启动非常缓慢

默认设置针对中规模集群进行了优化。您可以随意增加JAVA_OPTS环境变量，资源请求和限制以提高性能。但是需要小心！

> 我选择了Prometheus，但没有目标可见

这取决于Prometheus操作者的设置以及集群中的访问控制策略。要使RBAC设置正常工作，需要版本1.6.0+。

> 我选择了Prometheus，但我的目标从未被捕获

这意味着您的应用程序可能不是使用Maven/Gradle中的`prometheus`配置文件构建的

> 我的基于SQL的微服务在运行多个副本的Liquibase初始化期间被卡住

有时数据库更改日志锁被破坏。您将需要使用`kubectl exec -it`连接到数据库，并删除liquibases `databasechangeloglock`表的所有行。

# `jhipster kubernetes-helm | k8s-helm`

该子生成器生成清单，并通过`helm cli`部署到[Kubernetes](http://kubernetes.io/) 。

## 前提

要使用此子生成器生成的清单，`helm cli`应安装。 请遵循[此链接](https://github.com/helm/helm) 以获得安装说明。 这需要`helm 2.12.x或更高版本`。

安装Helm后，您需要添加以下存储库：
```
helm repo add stable https://kubernetes-charts.storage.googleapis.com
helm repo add incubator https://kubernetes-charts-incubator.storage.googleapis.com
```
这些存储库应添加到本地缓存中，因为此子生成器将从上述存储库中提取稳定的生产级服务图表。

该子生成器将`kubernetes`子生成器用于应用程序清单，并从上述存储库中提取应用程序中引用的数据库，elasticsearch，prometheus等映像服务。

## 部署

您可以通过运行以下命令来部署所有应用程序：

```
bash helm-apply.sh (or) ./helm-apply.sh
```

`helm-apply.sh`将始终执行全新安装。 首先删除所有具有相同标识的现有图表，然后进行全新安装。

您可以通过运行以下命令来升级所有应用程序（如果对生成的清单进行了任何更改）：

```
bash helm-upgrade.sh (or) ./helm-upgrade.sh
```


# `jhipster kubernetes-knative | knative`

该子生成器生成清单，该清单通过`kubectl或helm cli`部署到[Kubernetes](http://kubernetes.io/) 。 它根据选定的提示响应为cli之一生成清单。

## 前提

此子生成器取决于Istio。 为了使用此子生成器生成的清单，您应该在群集中安装istio和kntaive。 按照[此链接](https://knative.dev/docs/install/) 进行安装说明。 它需要`knative 0.8.x或更高版本`。

## 部署

如果您选择使用Kubernetes Generator进行部署，请运行以下命令：
```
bash kubectl-knative-apply.sh (or) ./kubectl-knative-apply.sh
```

如果您选择使用Helm generator进行部署，请运行以下命令：
```
bash helm-knative-apply.sh (or) ./helm-knative-apply.sh
```

`helm-knative-apply.sh`将始终执行全新安装。 首先删除所有具有相同标识的现有图表，然后进行全新安装。

您可以通过运行以下bash命令来升级所有应用程序（如果对生成的清单进行了任何更改）：

```
bash helm-knative-upgrade.sh (or) ./helm-knative-upgrade.sh
```

## 更多信息

*   [Kubernetes文档](http://kubernetes.io/docs/)
