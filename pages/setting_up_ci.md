---
layout: default
title: 設定持續整合
permalink: /setting-up-ci/
redirect_from:
  - /setting_up_ci.html
sitemap:
    priority: 0.7
    lastmod: 2018-08-03T14:40:00-00:00
---

# <i class="fa fa-stethoscope"></i> 設定持續整合

為JHipster應用程式設定持續整合（CI）的過程比為典型的Spring MVC應用程式設定要複雜，因為需要維護由2個軟件技術架構關聯帶來的複雜性：

- Maven或Gradle的Java後端程式碼
- NodeJS，NPM或Yarn的JavaScript前端

每個技術架構都有其自己的依賴項管理（Maven構件，NPM軟體套件），並具有潛在的衝突要解決。

JHipster應該開箱即用地支持以下CI系統：

- Jenkins:
    - [設定Jenkins 1]({{ site.url }}/setting-up-ci-jenkins1/)
    - [設定Jenkins 2]({{ site.url }}/setting-up-ci-jenkins2/) (推薦)
- Travis: 請參閱[Travis文件](https://docs.travis-ci.com/user/getting-started/)
- GitLab CI: 請參閱[GitLab CI文件](https://about.gitlab.com/gitlab-ci/)
- Azure Pipelines: 請參閱[Azure Pipelines文件](https://docs.microsoft.com/fr-fr/azure/devops/pipelines/?view=vsts)
- GitHub Actions: 請參閱 [GitHub Actions 文件](https://github.com/features/actions)
- CircleCI: 請參閱 [CircleCI 文件](https://circleci.com/docs/)

## 執行子產生器

要生成這些設定檔案，請在您的專案資料夾中執行以下指令：

`jhipster ci-cd`

然後回答所有問題。


### 您要生成什麼CI/CD pipeline ？

- Jenkins pipeline
- Azure Pipelines
- GitLab CI
- GitHub Actions
- Travis CI
- CircleCI

**注意**: 當您選擇Jenkins pipeline時，將生成一個新的`src/main/docker/jenkins.yml`檔案。
因此，您可以透過執行以下指令在本地測試Jenkins：

```
docker-compose -f src/main/docker/jenkins.yml up -d
```

### Would you like to perform the build in a Docker container ? (Jenkins / GitLab) (您想在Docker容器中執行建立嗎？（Jenkins/ GitLab）)

如果安裝了Docker，則可以在Docker容器內執行建立。

### In GitLab CI, perform the build in a docker container (hint: GitLab.com uses Docker container) ? (GitLab) (在GitLab CI中，在Docker容器中執行建立（提示：GitLab.com使用Docker容器）？（GitLab）)

如果您使用私有的GitLab CI，則可以直接使用runners。

如果您使用官方的GitLab.com pipeline，則需要使用Docker容器。

### Would you like to send build status to GitLab ? (Jenkins) (您想將建立狀態傳送給GitLab嗎？（Jenkins）)

如果您的Jenkins依賴於GitLab儲存庫，則可以將建立狀態傳送到GitLab。您的Jenkins必須正確設定。

### What tasks/integrations do you want to include ? (您要包括哪些任務/整合？)

- 將您的應用程式部署到*Artifactory*
- 使用*Sonar*分析您的程式碼
- 建立併發布*Docker*映象
- *Snyk*: 依賴項掃描以查詢安全漏洞 (需要SNYK_TOKEN)
- 部署到*Heroku*（需要在CI服務上設定HEROKU_API_KEY）
- 是否要Cypress儀表板（需要同時在CI服務上設定CYPRESS_PROJECT_ID和CYPRESS_RECORD_KEY）

### Deploy your application to an *Artifactory* (Jenkins / GitLab) (將您的應用程式部署到*Artifactory*（Jenkins / GitLab）)

- *Artifactory*: what is the ID of distributionManagement for snapshots ?
- *Artifactory*: what is the URL of distributionManagement for snapshots ?
- *Artifactory*: what is the ID of distributionManagement for releases ?
- *Artifactory*: what is the URL of distributionManagement for releases ?

### Analyze your code with *Sonar* (使用*Sonar*分析您的程式碼)

- *Sonar*: what is the name of the Sonar server ?

選擇在Jenkins設定中定義的Sonar伺服器的名稱。

- *Sonar*: what is the URL of the Sonar server ?
- *Sonar*: what is the Organization of the Sonar server ? 

在這裡，您可以選擇將Sonar Analyze推送到[SonarCloud.io](https://sonarcloud.io)。
在這種情況下，您必須新增`SONAR_TOKEN`環境變數。

### Build and publish a *Docker* image (建立併發布*Docker*映象)

- *Docker*: what is the URL of the Docker registry ?

預設情況下，您可以使用Docker Hub：[https://registry.hub.docker.com](https://registry.hub.docker.com)

- *Docker*: what is the Jenkins Credentials ID for the Docker registry ?

預設情況下，您可以使用：`docker login`

- *Docker*: what is the Organization Name for the Docker registry?

### Snyk: dependency scanning for security vulnerabilities （依賴項掃描以查詢安全漏洞）

您必須新增`SNYK_TOKEN`環境變數 (檢視你的[Snyk 賬戶](https://app.snyk.io/account))

請參閱完整的文件，網址為： [https://snyk.io/](https://snyk.io/)

### Cypress Dashboard: record your tests in a web application provided by Cypress（Cypress儀表板：將測試記錄在Cypress提供的Web應用程式中）

您必須新增`CYPRESS_PROJECT_ID`和`CYPRESS_RECORD_KEY`環境變數 (檢視[儀表盤專案](https://dashboard.cypress.io/))

您可以透過將環境變數`CYPRESS_ENABLE_RECORD`的值更改為false來停用記錄。

請參閱完整的文件，網址為： [cypress.io/dashboard](https://www.cypress.io/dashboard/)

### Deploy to *Heroku* （部署到*Heroku*）

- *Heroku: name of your Heroku Application ?

您必須新增`HEROKU_API_KEY`環境變數。

注意：在將部署到Heroku之前，您需要在本地使用[Heroku子產生器]({{ site.url }}/heroku)。
它將建立持續整合工具所需的所有檔案。

## 更多訊息

根據您的作業系統和專案的推送位置，在使用CI / CD之前，可能需要使包裝程式可執行。

如果您使用Maven：

- `chmod +x mvnw`
- `git update-index --chmod=+x mvnw`

如果您使用Gradle：

- `chmod +x gradlew`
- `git update-index --chmod=+x gradlew`


## 有關環境變數的文件：

- Jenkins pipeline: 您應該使用[Credentials plugin](https://wiki.jenkins-ci.org/display/JENKINS/Credentials+Plugin)
- GitLab CI: 閱讀[documentation about secret-variables](https://docs.gitlab.com/ce/ci/variables/#secret-variables)
- Travis CI: 閱讀[environment variables](https://docs.travis-ci.com/user/environment-variables/)
- Azure Pipelines: 閱讀[documentation about predefined variables](https://docs.microsoft.com/en-us/azure/devops/pipelines/build/variables?view=azure-devops&tabs=yaml)
- CircleCI: 閱讀[documentation about environment variables](https://circleci.com/docs/2.0/env-vars/#built-in-environment-variables)
