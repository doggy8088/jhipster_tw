---
layout: default
title: JHipster領域語言 (JDL) - 部署
permalink: /jdl/deployments
sitemap:
    priority: 0.5
    lastmod: 2021-03-08T12:00:00-00:00
---

# <i class="fa fa-star"></i> JHipster領域語言 (JDL) - 部署

## 概要

1. [語法](#語法)
1. [範例](#範例)
1. [可用的部署選項](#可用的部署選項)

---

### 語法

部署宣告如下：

```
deployment {
  <deployment option name> <deployment option value>
}
```

  - 與應用程式類似，部署宣告透過指定選項鍵和值來工作

---

### 範例

### 簡單例子

```jdl
deployment {
  deploymentType docker-compose
  appsFolders [foo, bar]
  dockerRepositoryName "yourDockerLoginName"
}
```

---

#### 多個部署

如果您需要多個部署，請按以下步驟進行：

```
// will be created under 'docker-compose' folder
deployment {
  deploymentType docker-compose
  appsFolders [foo, bar]
  dockerRepositoryName "yourDockerLoginName"
}

// will be created under 'kubernetes' folder
deployment {
  deploymentType kubernetes
  appsFolders [foo, bar]
  dockerRepositoryName "yourDockerLoginName"
}
```

每個`deploymentType`您可以有一個部署。 `appsFolders`中定義的應用程式應位於建立部署所在的資料夾中，或`directoryPath`中定義的資料夾中。

例如，在上面，您需要具有以下資料夾結構：

```
.
├── yourJdlFile.jdl
├── foo
├── bar
├── kubernetes // will be created by the JDL
└── docker-compose // will be created by the JDL
```

---

### 可用的部署選項

這是JDL支援的部署選項：

<table class="table table-striped table-responsive">
  <tr>
    <th>JDL選項名稱</th>
    <th>預設值</th>
    <th>可選值</th>
    <th>說明</th>
  </tr>
  <tr>
    <td>deploymentType</td>
    <td>docker-compose</td>
    <td>docker-compose, kubernetes, openshift</td>
    <td></td>
  </tr>
  <tr>
    <td>directoryPath</td>
    <td>"../"</td>
    <td></td>
    <td>相對路徑。 必須用雙引號引起來</td>
  </tr>
  <tr>
    <td>appsFolders</td>
    <td>[]</td>
    <td></td>
    <td>應用程式的目錄名稱，以逗號分隔。 必須為清單，例如[foo, bar]</td>
  </tr>
  <tr>
    <td>clusteredDbApps</td>
    <td>[]</td>
    <td></td>
    <td>帶有群集資料庫的應用程式的目錄名稱，以逗號分隔。 必須為清單，例如[foo, bar]</td>
  </tr>
  <tr>
    <td>gatewayType</td>
    <td>SpringCloudGateway</td>
    <td></td>
    <td>當serviceDiscoveryType為`no`時，將忽略該值</td>
  </tr>
  <tr>
    <td>monitoring</td>
    <td>no</td>
    <td>no, prometheus</td>
    <td></td>
  </tr>
  <tr>
    <td>serviceDiscoveryType</td>
    <td>eureka</td>
    <td>eureka, consul, no</td>
    <td></td>
  </tr>
  <tr>
    <td>dockerRepositoryName</td>
    <td></td>
    <td></td>
    <td>Docker倉庫的名稱或URL，必須用雙引號引起來</td>
  </tr>
  <tr>
    <td>dockerPushCommand</td>
    <td>"docker push"</td>
    <td></td>
    <td>要使用的docker push指令。 必須用雙引號引起來</td>
  </tr>
  <tr>
    <td>kubernetesNamespace</td>
    <td>default</td>
    <td></td>
    <td>僅當DeploymentType為kubernetes時適用</td>
  </tr>
  <tr>
    <td>kubernetesServiceType</td>
    <td>LoadBalancer</td>
    <td>LoadBalancer, NodePort, Ingress</td>
    <td>僅當DeploymentType為kubernetes時適用</td>
  </tr>
  <tr>
    <td>ingressDomain</td>
    <td></td>
    <td></td>
    <td>當kubernetesServiceType為`Ingress`時，Ingress的域。 必須用雙引號引起來。 僅當DeploymentType為kubernetes時適用</td>
  </tr>
  <tr>
    <td>istio</td>
    <td>false</td>
    <td>true, false</td>
    <td>僅當DeploymentType為kubernetes時適用</td>
  </tr>
  <tr>
    <td>openshiftNamespace</td>
    <td>default</td>
    <td></td>
    <td>僅當DeploymentType為openshift時適用</td>
  </tr>
  <tr>
    <td>storageType</td>
    <td>ephemeral</td>
    <td>ephemeral, persistent</td>
    <td>僅當DeploymentType為openshift時適用</td>
  </tr>
</table>
