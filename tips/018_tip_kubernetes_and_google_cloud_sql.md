---
layout: default
title: Kubernetes和Google Cloud SQL
sitemap:
priority: 0.5
lastmod: 2016-11-13T19:00:00-00:00
---

# Kubernetes和Google Cloud SQL

__送出者 [@bourdux](https://github.com/bourdux)__

使用[Kubernetes子產生器]({{site.url}}/kubernetes) 將JHipster應用程式部署到[Google Container Engine](https://cloud.google.com/container-engine/) 已經很容易了。 預設行為是為資料庫建立Google Compute Engine VM。

如果您想更進一步，並使用完全託管的MySQL實例，則可以使用[Google Cloud SQL](https://cloud.google.com/sql/) 。
它允許自動備份，維護，複製以實現高可用性和出色的可伸縮性功能。

在本技巧/教程中，我將向您展示如何在Google Cloud上部署JHipster應用程式，該應用程式將Google Cloud SQL資料庫用作MySQL後端。 為了簡化過程，我們將使用單體應用程式。 我們還將使用Maven建立，因為它是我最喜歡的一個。

## 先決條件

對於本教程，您將需要：

* 一個Google Cloud Platform帳戶。您可以使用[60天免費試用](https://cloud.google.com/free-trial/) 價值300美元的免費信用。
* [Google Cloud SDK](https://cloud.google.com/sdk/) 因為我們將從終端執行大部分操作. 我發現 [互動式安裝程式](https://cloud.google.com/sdk/downloads#interactive) 非常方便。
* [Docker](https://www.docker.com/products/overview)
* 使用MySQL作為生產資料庫的JHipster應用程式

## 初始化gcloud和kubectl

首先，如果您從未使用過`gcloud`，則需要使用以下指令對其進行初始化：

    gcloud init

使用`gcloud`，您可以在舒適的終端上執行大多數可以從Google Cloud Web控制台執行的操作。 首先，讓我們安裝`kubectl`

    gcloud components install kubectl

`Kubectl`是用於對Kubernetes叢集執行指令的指令行介面。 您也可以直接從[Kubernetes網站](http://kubernetes.io/docs/user-guide/prereqs/) 進行安裝，但總的來說，我發現gcloud的安裝更為方便。

現在，您需要建立一個Google Cloud專案。 為此，您將需要透過Web控制台，因為gcloud不允許您從CLI建立專案（尚不是alpha功能）。
或者，您可以使用[資源管理器API](https://cloud.google.com/resource-manager/docs/creating-project) 。

* 轉到 [Google Cloud Platform Console](https://console.cloud.google.com)
* 單擊 **Create Project**
* 選擇一個專案名稱, 單擊 **Create** 並記下專案ID，或者根據情況自定義。

在本教程中，我選擇了名稱`jhipster-kubernetes-cloud-sql`.

然後，您需要：

* 在專案上啟用 [billing](https://console.cloud.google.com/billing) 
* 在專案上啟用 [Container Engine API](https://console.cloud.google.com/projectselector/kubernetes/list) 
* 適用於Compute Engine，Cloud SQL和Container Engine，啟用 [API Manager](https://console.cloud.google.com/apis/dashboard) 
* 啟用 [Google Cloud SQL API](https://console.developers.google.com/apis/api/sqladmin/overview)

最後，您需要告訴`gcloud`您當前正在哪個專案上：

    gcloud config set project jhipster-kubernetes-cloud-sql

您還可以告訴它預設情況下您希望在何處建立實例。 我選擇了`europe-west1-b`，因為我是一個歐洲人：)

    gcloud config set compute/zone europe-west1-b

## 建立一個Cloud SQL實例

然後，您需要建立一個Google Cloud SQL實例。 您可以透過Web控制台執行此操作，這將對可用選項有很好的瞭解，或者再次可以使用`gcloud`。

    gcloud beta sql instances create jhipster-sqlcloud-db --region=europe-west1 --tier=db-f1-micro\
     --authorized-networks=`curl -s ifconfig.co` --backup-start-time=01:00 --enable-bin-log \
     --activation-policy=ALWAYS --storage-type=HDD --storage-size=10GB


使用此指令，我們在`europe-west1`區域中建立一個名為`jhipster-sql-cloud-db`的SQL Cloud實例。 
我們選擇最小的機器型別。 要檢視可用層的完整清單，可以使用`gcloud sql tiers list`。 
然後，我們將自己的IP列入白名單，以便透過mysql CLI進行訪問，設定從1AM UTC開始的備份時間視窗，啟用二進位日誌記錄，以便在應用程式出現問題時可以及時回傳。 
最後，我們將機器設定為始終處於啟用狀態（這是必要的，因為第二次使用的機器需要為每次使用付費），設定HDD儲存（SSD效能更高，但效能更高 昂貴），並將儲存大小設定為最小大小。 
注意：我們需要使用beta gcloud用戶端來建立第二代SQL實例。

您可以使用以下指令檢查您的實例是否已啟動

    gcloud sql instances list
    NAME                   REGION        TIER         ADDRESS         STATUS
    jhipster-sqlcloud-db  europe-west1  db-f1-micro  146.148.21.155  RUNNABLE

由於我們將IP地址列入了白名單，因此我們應該能夠使用mysql訪問資料庫實例。

    mysql --host=146.148.21.155 --user=root --password
    ...
    mysql>

由於我們已連線到資料庫，因此讓我們建立應用程式資料庫和使用者。 
由於我們將使用[Cloud SQL代理](https://cloud.google.com/sql/docs/sql-proxy) 從我們的應用程式容器連線SQL實例，因此可以將使用者主機名設定為`cloudsqlproxy~%`如果您只想允許透過代理的連線。
本教程的應用程式名稱為`jhipsterGoogleCloudSql`，因此，如果我們要使用JHipster生成的設定，則資料庫名稱應具有相同的名稱。

    mysql> CREATE DATABASE jhipstergooglecloudsql;
    Query OK, 1 row affected (0,03 sec)

    mysql> CREATE USER 'jhipster'@'cloudsqlproxy~%';
    Query OK, 0 rows affected (0,01 sec)

    mysql> GRANT ALL PRIVILEGES ON jhipstergooglecloudsql.* TO 'jhipster'@'cloudsqlproxy~%';
    Query OK, 0 rows affected (0,01 sec)

    mysql> FLUSH PRIVILEGES;
    Query OK, 0 rows affected (0,02 sec)

別忘了在`application-prod.yml`中將資料庫使用者更改為jhipster。

## 建立一個容器叢集

讓我們使用[GKE](https://cloud.google.com/container-engine/docs/) 建立一個容器叢集

    gcloud container clusters create jhipster-sqlcloud-cluster --zone=europe-west1-b --machine-type=g1-small --num-nodes=1

在本教程中，我們將僅使用1個小節點。 在生產中，您將需要至少3個節點：)

然後讓我們讓kubectl獲得該叢集的適當憑據

    gcloud container clusters get-credentials jhipster-sqlcloud-cluster

    Fetching cluster endpoint and auth data.
    kubeconfig entry generated for jhipster-sqlcloud-cluster.

## 建立並推送Docker映像

首先執行[Kubernetes子產生器]({{site.url}}/kubernetes) 。 
像往常一樣回答問題，但讓我們透過在Google Cloud上推送我們的docker映象來使用Container引擎。
對於以下問題：『我們應該為基礎Docker使用什麼？ 儲存庫名稱？』，透過`gcr.io / jhipster-kubernetes-cloud-sql`答覆。替換為您的專案ID。對於docker映象推送
指令讓我們使用`gcloud docker-push`來推送到專案容器儲存庫。

建立你的映象

    mvn package -Pprod jibDockerBuild

標記影象（替換為您的jhipster應用程式名稱）。 我們使用v1作為標記，以便能夠輕鬆部署新版本
    應用程式或回滾（如果出現嚴重錯誤）。

    docker image tag jhipstergooglecloudsql gcr.io/jhipster-kubernetes-cloud-sql/jhipstergooglecloudsql:v1

然後，您可以按以下方式將圖片推送到Google Container引擎：

    gcloud docker -- push gcr.io/jhipster-kubernetes-cloud-sql/jhipstergooglecloudsql:v1

##獲取憑據並在Kubernetes中註冊它們

為了使用Cloud SQL代理，我們將必須為我們的應用程式建立憑據並將其註冊到 Kubernetes。
[Cloud SQL容器引擎連線文件](https://cloud.google.com/sql/docs/container-engine-connect) 中提供了完整的過程。
但讓我在這裡總結一下指令。

為您的JHipster應用程式建立一個服務帳戶

    gcloud iam service-accounts create jhipster-application --display-name="JHipster application"

獲取完整的IAM帳戶名（用於生成金鑰的電子郵件）

    gcloud iam service-accounts list
    NAME                                    EMAIL
    JHipster application                    jhipster-application@jhipster-kubernetes-cloud-sql.iam.gserviceaccount.com

將編輯者對專案的訪問許可權授予服務帳戶

    gcloud projects add-iam-policy-binding jhipster-kubernetes-cloud-sql \
     --member serviceAccount:jhipster-application@jhipster-kubernetes-cloud-sql.iam.gserviceaccount.com \
     --role roles/editor

建立金鑰並將其儲存在 `jhipster-credentials.json`

    gcloud iam service-accounts keys create \
    --iam-account jhipster-application@jhipster-kubernetes-cloud-sql.iam.gserviceaccount.com jhipster-credentials.json

我們稍後將使用此金鑰

用`kubectl`註冊金鑰

    kubectl create secret generic cloudsql-oauth-credentials --from-file=credentials.json=jhipster-credentials.json

## 修改Kubernetes部署設定

首先，由於我們要使用Cloud SQL實例，因此您可以刪除生成的mysql部署檔案。

然後，我們需要在`jhipstergooglecloudsql-deployment.yml`中進行一些更改。 首先是Spring資料來源URL
應該更改為localhost，因為我們將使用Cloud SQL代理：

    jdbc:mysql://localhost:3306/jhipstergooglecloudsql?useUnicode=true&characterEncoding=utf8&useSSL=false

然後，您可以將版本號新增到容器映像中：

    image: gcr.io/jhipster-kubernetes-cloud-sql/jhipstergooglecloudsql:v1

然後，我們需要新增一個條目以使用sidecar模式部署雲sql代理：

    - image: b.gcr.io/cloudsql-docker/gce-proxy:1.05
      name: cloudsql-proxy
      command: ["/cloud_sql_proxy", "--dir=/cloudsql",
                "-instances=jhipster-kubernetes-cloud-sql:europe-west1:jhipster-sqlcloud-db=tcp:3306",
                "-credential_file=/secrets/cloudsql/credentials.json"]
      volumeMounts:
        - name: cloudsql-oauth-credentials
          mountPath: /secrets/cloudsql
          readOnly: true
        - name: ssl-certs
          mountPath: /etc/ssl/certs

正如我們可能已經指出的，我們還需要提供SSL證書才能與Google API通訊，以便我們可以連線到我們的
Cloud SQL實例。

最後新增適當的卷：

    volumes:
      - name: cloudsql-oauth-credentials
        secret:
          secretName: cloudsql-oauth-credentials
      - name: ssl-certs
        hostPath:
          path: /etc/ssl/certs

現在，完整的部署檔案應如下所示：

    apiVersion: extensions/v1beta1
    kind: Deployment
    metadata:
      name: jhipstergooglecloudsql
    spec:
      replicas: 1
      template:
        metadata:
          labels:
            app: jhipstergooglecloudsql
        spec:
          containers:
          - name: jhipstergooglecloudsql
            image: gcr.io/jhipster-kubernetes-cloud-sql/jhipstergooglecloudsql:v1
            env:
            - name: SPRING_PROFILES_ACTIVE
              value: prod
            - name: SPRING_DATASOURCE_URL
              value: jdbc:mysql://localhost:3306/jhipstergooglecloudsql?useUnicode=true&characterEncoding=utf8&useSSL=false
            ports:
            - containerPort: 8080
          - image: b.gcr.io/cloudsql-docker/gce-proxy:1.05
            name: cloudsql-proxy
            command: ["/cloud_sql_proxy", "--dir=/cloudsql",
                      "-instances=jhipster-kubernetes-cloud-sql:europe-west1:jhipster-sqlcloud-db=tcp:3306",
                      "-credential_file=/secrets/cloudsql/credentials.json"]
            volumeMounts:
              - name: cloudsql-oauth-credentials
                mountPath: /secrets/cloudsql
                readOnly: true
              - name: ssl-certs
                mountPath: /etc/ssl/certs
          volumes:
            - name: cloudsql-oauth-credentials
              secret:
                secretName: cloudsql-oauth-credentials
            - name: ssl-certs
              hostPath:
                path: /etc/ssl/certs


然後，您可以使用`kubectl apply`來部署叢集。

    kubectl apply -f jhipstergooglecloudsql

    deployment "jhipstergooglecloudsql" created
    service "jhipstergooglecloudsql" created


然後，您可以透過`kubectl get services』獲得外部IP並測試您的應用程式

    kubectl get services jhipstergooglecloudsql
    NAME                     CLUSTER-IP     EXTERNAL-IP     PORT(S)    AGE
    jhipstergooglecloudsql   10.95.251.18   104.199.51.11   8080/TCP   1m
