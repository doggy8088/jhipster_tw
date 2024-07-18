---
layout: default
title: 在Jenkins上設定持續整合 2
permalink: /setting-up-ci-jenkins2/
redirect_from:
  - /setting_up_ci_jenkins2.html
sitemap:
    priority: 0.7
    lastmod: 2017-01-19T14:15:00-00:00
---

# <i class="fa fa-stethoscope"></i> 在Jenkins上設定持續整合 2

## 安裝Jenkins 2

### 標準步驟

在電腦上安裝JDK 8。

轉到官方網站[https://jenkins.io/2.0/](https://jenkins.io/2.0/)

下載`jenkins.war`

### 使用Docker

啟動[Docker映象](https://hub.docker.com/r/jenkins/jenkins)
(_由於JHipster應用程式設定為在8080_上執行，因此預設連接埠已更改為18080_)

`docker container run -d --name jenkins2 -p 18080:8080 -p 50000:50000 jenkins/jenkins`

然後，您可以在以下位置訪問Jenkins儀表盤
- http://localhost:18080 (on MacOS & Linux)
- http://192.168.99.100:18080 (on Windows)
    - 如果這樣不起作用，請更換 `192.168.99.100` 使用docker的預設IP地址: `docker-machine ip default`

注意：在容器啟動過程中，系統會要求您提供`initialAdminPassword`，您可以在日誌中找到它。
您也可以透過`docker logs jenkins2`訪問它

```
*************************************************************
*************************************************************
*************************************************************

Jenkins initial setup is required. An admin user has been created and a password generated.
Please use the following password to proceed to installation:

6707db8735be4ee29xy056f65af6ea13

This may also be found at: /var/jenkins_home/secrets/initialAdminPassword

*************************************************************
*************************************************************
*************************************************************
```

## 建立新Job

- 新增條目
    - 輸入條目名稱
    - 選擇pipeline
    - 點選OK

![Jenkins2 item]({{ site.url }}/images/jenkins2_add_item.png)

- Definition: Pipeline script from SCM
- SCM: Git
- Repositories
    - Repository URL: 選擇倉庫

![Jenkins2 pipeline]({{ site.url }}/images/jenkins2_pipeline.png)

## Jenkinsfile

![Jenkins2 result]({{ site.url }}/images/jenkins2_result.png)
