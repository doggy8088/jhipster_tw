---
layout: default
title: 部署到AWS
permalink: /aws/
# redirect_from:
#   - /aws.html
sitemap:
    priority: 0.7
    lastmod: 2018-01-17T00:00:00-00:00
---

# <i class="fa fa-cloud-upload"></i> 部署到AWS

[![Powered by AWS Cloud Computing]({{ site.url }}/images/logo/logo-aws.png)](https://aws.amazon.com/what-is-cloud-computing)

有兩個不同的子產生器，用於將JHipster專案部署到AWS：
* **aws-containers**: 基於Docker容器的子產生器，用於透過AWS Elastic Container Service部署應用程式。這對於複雜的應用程式和/或微服務架構非常有用。
* **aws**: 基於實例的子產生器，用於透過Elastic Beanstalk部署應用程式。對於比較小的應用程式來說，這很棒（而且非常便宜！）。

## *aws-containers*子產生器
使用單體應用流程時，該子產生器將使用在Elastic Container Service上執行的AWS Fargate自動部署基於docker的JHipster應用程式。它利用許多AWS服務來實現此目的：
- [AWS Fargate](https://aws.amazon.com/fargate/): 一種新的AWS服務，該服務允許執行容器而無需擔心基礎VM實例基礎架構。子產生器當前使用彈性容器服務來管理容器。
- [Elastic Container Registry](https://aws.amazon.com/ecr/): Docker映象倉庫，用於儲存應用程式映象。
- [Elastic Load Balanacer - Network Load Balancer](https://aws.amazon.com/elasticloadbalancing): 網路負載均器用於將流量定向到容器。
- [Aurora](https://aws.amazon.com/rds/aurora): AWS託管資料庫服務，與MySQL和PostgreSQL相容。
- [AWS S3](https://aws.amazon.com/s3): 用於儲存CloudFormation指令碼的檔案儲存。
- [CloudWatch](https://aws.amazon.com/cloudwatch): 分散式日誌收集工具，用於檢視容器的狀態。
- [AWS Cloudformation](https://aws.amazon.com/cloudformation):  所有必需的服務（AWS System Manager Parameters除外）均在一組CloudFormation檔案中定義。基本檔案包含高階服務，然後每個應用程式都在其自己的檔案中定義，該檔案稱為巢狀架構。
- [AWS System Manager - Parameter Store](https://aws.amazon.com/systems-manager/features/): 安全密碼儲存機制，用於儲存資料庫密碼。執行子產生器將引入一個新的Spring Cloud元件，該組件將在應用程式啟動時讀取密碼。
- [AWS - IAM Role](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles.html): 產生器建立一個新角色，並將使用關聯的策略執行ECS任務。

使用微服務流程時，這將指導您建立[Elastic Kubernetes Cluster (EKS)]（https://aws.amazon.com/eks/）
和[Elastic Container Registries（ECR）]（https://aws.amazon.com/ecr/），用於您的所有微服務和閘道器。 之後，您必須使用[Kubernetes子產生器]（/ kubernetes）生成Kubernetes設定檔案，
然後 透過docker將其推送到ECR。 可以在[https://github.com/jhipster/generator-jhipster/issues/8366#issuecomment-535329759]中找到範例部署。（https://github.com/jhipster/generator-jhipster/issues/8366#issuecomment -535329759）

![AWS Component Diagram]({{ site.url }}/images/aws_component_diagram.svg?sanitize=true)

如果選擇部署應用程式，則子產生器將在應用程式啟動之前經歷多個步驟。
1. 重建應用程式的Docker映象，使其包含新生成的Spring Cloud類。
2. 為CloudFormation YAML檔案建立一個S3儲存。
3. 將Cloudformation YAML檔案上傳到S3儲存。
4. 建立CloudFormation（不包括ECS服務）。最初不包括該服務，因此我們有機會將所需的Docker映象上載到新創建的倉庫中，因此該服務在建立後將成功啟動。
5. 標記Docker映象並上傳到倉庫。
6. 在AWS SSM中設定資料庫訪問密碼。這已從Cloudformation檔案中排除，因為它當前不支援SecureStrings，並且在Cloudformation中儲存密碼是一種不好的做法。
7. 更新架構以包括ECS服務。列印出負載均衡器URL。

### 侷限性
- 僅支援以下資料庫型別（全部透過Aurora）：Mysql，MariaDB和PostgreSQL。
- 當前不支援實例間通訊。其最大的後果是節點之間不支援快取同步。建議檢視AWS的[ElasticCache](https://aws.amazon.com/elasticache/)服務以瞭解分散式快取要求。
- SSL不可用。

### 費用
<div class="alert alert-warning"><i>警告: </i>
一旦開始部署，此生成器將開始計算成本。在不瞭解所使用元件的成本影響的情況下，請勿使其長時間執行。 </div>
此生成器使用的服務不在[AWS Free Tier](https://aws.amazon.com/free/)範圍內。該產生器旨在允許應用程式以生產級方式執行，因此不建議將其用於小型或對成本敏感的工作環境。

### 執行子產生器


在執行子產生器之前，您需要設定您的[AWS憑證](https://docs.aws.amazon.com/cli/latest/userguide/cli-config-files.html)，以便可以訪問它們。儘管您無需安裝Amazon CLI即可執行此生成器，但建議將其用於後續開發。使用您的Amazon AWS帳戶登入併為JHipster應用程式建立使用者。之後，在Mac/Linux上的`~/.aws/credentials`或Windows上的`C:\Users\USERNAME\.aws\credentials`處建立憑據檔案。憑據檔案的替代方法是使用環境變數來設定訪問金鑰ID+密碼。

 在**新檔案夾**中執行：

`jhipster aws-containers`

根據您的AWS環境, 子產生器將詢問有關您如何部署應用程式的許多問題。有以下幾件事情要考慮：
- 一個單體應用程式可以部署在單層（使用預設VPC設定）中，也可以部署在雙層模型中（[此處](https://github.com/satterly/AWSCloudFormation-samples/blob/master/multi-tier-web-app-in-vpc.template)為範例CloudFormation檔案）。確定部署子網時，應確保至少在兩個可用區中部署了應用程式，否則Amazon Aurora將無法正確部署。
- 如果需要刪除生成的CloudFormation stack，則必須先刪除所有建立的ECR映象，然後再嘗試刪除stack。如果CloudFormation仍保留映象，則無法刪除該倉庫。

### 更新已部署的應用程式

在部署了應用程式之後，可以透過再次執行子產生器來重新部署它：

`jhipster aws-containers`

系統將再次提示您確認設定，使您有機會重新調整效能等級。請注意，在某些情況下，應用程式在終止以前部署的任務實例時會遇到問題，這可能需要透過控制台或CLI手動終止它們。

### 刪除應用程式
要刪除已部署的應用程式：
* 導向到`Elastic Container Service > Repositories > [您的應用程式名稱]`，然後刪除儲存庫中的所有映象。不要刪除倉庫本身。如果儲存庫中有影象，則無法透過CloudFormation刪除應用程式。
* 導向到`CloudFormation`並刪除您建立的stack。這將取消提供大多數服務。

為了徹底清除環境，還需要刪除其他兩個設定。
* 透過`AWS Systems Manager > Parameter Store`刪除儲存的密碼。
* 從生成的`S3`儲存桶中刪除CloudFormation樣板檔案，該檔案的格式為`[Stack Name]-[timestamp]`。

## *aws*子產生器

該子產生器允許使用[Elastic Beanstalk](https://docs.aws.amazon.com/elasticbeanstalk/latest/dg/Welcome.html)將JHipster應用程式自動部署到[Amazon AWS雲](https://aws.amazon.com/)。

<div class="alert alert-info"> <i>提示:</i> 作為Elastic Beanstalk的替代方案，您還可以使用<a href="{{ site.url }}/boxfuse/">Boxfuse</a>將JHipster應用程式部署到AWS。
Boxfuse具有對JHipster的一流支援，以及對MySQL和PostgreSQL資料庫的支援。</div>

### 侷限性

*   您只能將其與SQL資料庫一起使用（不支援Oracle和Microsoft SQL Server）。
*   預設情況下，Websocket在負載均衡後面不起作用。

### 先決條件

在執行子產生器之前，您需要設定您的AWS SDK憑證。使用您的Amazon AWS帳戶登入併為JHipster應用程式建立使用者。要授予該使用者所需的許可權，請附加`AWSElasticBeanstalkFullAccess`、`AmazonRDSFullAccess` 和 `IAMFullAccess`策略。

之後，在Mac/Linux上的`~/.aws/credentials`或Windows上的`C:\Users\USERNAME\.aws\credentials`處建立憑據檔案。

```
[default]
aws_access_key_id = your_access_key
aws_secret_access_key = your_secret_key
```

如果您使用的命名設定檔案與`default`設定檔案不同，則只需為環境變數`AWS_PROFILE`設定正確的設定檔案即可。

### 部署您的應用程式

要將您的應用程式部署到Amazon AWS，請輸入：

`jhipster aws`

這應該將您的應用程式打包為"production"模式，建立一個Beanstalk應用程式（帶有SQL資料庫），在S3上上傳程式碼，然後啟動該應用程式。

### 更新已部署的應用程式

在部署了應用程式之後，可以透過再次執行子產生器來重新部署它：

`jhipster aws`

子產生器再次詢問您的資料庫憑據，但在更新期間將忽略它們。

### 刪除您的應用程式

- 刪除Elastic Beanstalk。
- 刪除與應用程式相關的S3儲存桶。
- 刪除 [亞馬遜關係資料庫服務 (RDS)](https://aws.amazon.com/rds/) 實例.
- 刪除與應用程式相關的EC2安全組。 您可以透過檢視安全組的描述找到此內容，該描述應為`Enable database access to Beanstalk application`。

### 更多訊息

*   [適用於JavaScript的AWS SDK ](http://aws.amazon.com/sdk-for-node-js)
*   [WAR上傳進度條](https://github.com/tj/node-progress)

