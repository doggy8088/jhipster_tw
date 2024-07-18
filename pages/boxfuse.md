---
layout: default
title: 使用Boxfuse部署到AWS
permalink: /boxfuse/
redirect_from:
  - /boxfuse.html
sitemap:
    priority: 0.7
    lastmod: 2016-08-22T00:00:00-00:00
---

# 使用Boxfuse部署到AWS

本指南展示了如何使用[Boxfuse](https://boxfuse.com/)將JHipster應用程式部署到AWS。

[![]({{ site.url }}/images/logo/logo-boxfuse.png)](https://boxfuse.com/)

Boxfuse**對JHipster具有一等支援**，透過為您的應用程式建立最小的不可變機器映象來工作，然後可以將其部署在VirtualBox或AWS上。

<div class="alert alert-info"><i>提示: </i>
作為Boxfuse的替代方法，您還可以使用<a href="{{ site.url }}/aws/">Elastic Beanstalk</a>將JHipster應用程式部署到AWS。
</div>

## 先決條件

為了能夠進行部署，您必須首先建立一個[Boxfuse帳戶](https://console.boxfuse.com)並安裝[Boxfuse用戶端](https://boxfuse.com/getstarted/download)。

您還需要在[Boxfuse Console](https://console.boxfuse.com)中連線您的AWS賬戶。

## 準備部署

準備好應用程式後，可以透過輸入以下內容來準備進行部署：

`./mvnw package -Pprod -DskipTests`

或使用gradle時：

`./gradlew -Pprod bootJar -x test`

## 部署到AWS

要將您的應用程式部署到AWS，請輸入：

`boxfuse run -env=prod`

然後，Boxfuse將分析您的應用程式，為其打包一個最小的機器映象，並自動設定，設定和保護所有必需的AWS基礎架構（實例，安全組，彈性IP，ELB，MySQL或PostgreSQL RDS資料庫，等等）。

<pre>Creating jhipster ...
Mapping jhipster-dev-myuser.boxfuse.io to 127.0.0.1 ...
Created App jhipster (single-instance / postgresql)
Fusing Image for jhipster-1.0.war (JHipster) ...
Image fused in 00:05.036s (96301 K) -> myuser/jhipster:1.0
Pushing myuser/jhipster:1.0 ...
Verifying myuser/jhipster:1.0 ...
Creating security group boxsg-db-myuser-prod-jhipster ...
Creating RDS PostgreSQL database (db.t2.micro / 5 GB / single-az) => boxdb-myuser-prod-jhipster (this one-time action may take up to 10 minutes to complete) ...
Waiting for AWS to create an AMI for myuser/jhipster:1.0 in eu-central-1 (this may take up to 50 seconds) ...
AMI created in 00:35.564s in eu-central-1 -> ami-35fa0b5a
Waiting for AWS to make RDS DB boxdb-myuser-prod-jhipster available ...
DB boxdb-myuser-prod-jhipster [creating]
DB boxdb-myuser-prod-jhipster [backing-up]
DB boxdb-myuser-prod-jhipster [available]
Creating security group boxsg-myuser-prod-jhipster ...
Creating Elastic IP ...
Mapping jhipster-myuser.boxfuse.io to 52.29.78.197 ...
Creating security group boxsg-myuser-prod-jhipster-1.0 ...
Launching t2.micro instance of myuser/jhipster:1.0 (ami-35fa0b5a) in prod (eu-central-1) ...
Instance launched in 00:20.687s -> i-95d15028
Creating Cloud Watch Alarm for Instance auto-recovery -> i-95d15028-auto-recovery-alarm
Waiting for AWS to boot Instance i-95d15028 and Payload to start at http://54.93.63.207:8080/ ...
Payload started in 01:29.685s -> http://54.93.63.207:8080/
Remapping Elastic IP 52.29.78.197 to i-95d15028 ...
Waiting 15s for AWS to complete Elastic IP Zero Downtime transition ...
Deployment completed successfully. myuser/jhipster:1.0 is up and running at http://jhipster-myuser.boxfuse.io:8080/</pre>

請注意，您無需明確指定連接埠，健康檢查URL或資料庫型別之類的內容。預設情況下，Boxfuse會根據JHipster war中`application-prod.yml`檔案和包含的jar檔案來自動發現。當然，您可以根據需要覆蓋這些自動發現的設定，但是在大多數情況下，您不需要這樣做。

## 部署更新

要將更新部署到現有應用程式，只需遵循上面概述的準備和簡單部署步驟。所有更新均可零停機時間，藍色部署來執行。

## 更多訊息

*   [Boxfuse和JHipster入門](https://boxfuse.com/getstarted/jhipster)
*   [JHipster Boxfuse文件](https://boxfuse.com/docs/payloads/jhipster)
