---
layout: default
title: 部署到Heroku
permalink: /heroku/
redirect_from:
  - /heroku.html
sitemap:
    priority: 0.7
    lastmod: 2014-09-08T00:00:00-00:00
---

# 部署到Heroku

該子產生器允許將您的JHipster應用程式部署到[Heroku雲](https://www.heroku.com/){:target="_blank" rel="noopener"}。

[![]({{ site.url }}/images/logo/logo-heroku.png)](https://www.heroku.com/){:target="_blank" rel="noopener"}

Heroku透過兩種方式幫助JHipster：

- Heroku的Joe Kutner目前正在維護此子產生器
- Heroku提供了免費的信用額度，使我們能夠使用複雜的高端設定來測試生成的應用程式，以確保所有普通使用者都能正常使用

## 執行子產生器

在執行子產生器之前，您必須安裝[Heroku CLI](https://cli.heroku.com/){:target="_blank" rel="noopener"}，並建立一個Heroku帳戶。

您還必須[建立一個Heroku帳戶](http://signup.heroku.com/){:target="_blank" rel="noopener"}並透過執行以下指令使用CLI登入：

<pre>**$ heroku login**
Enter your Heroku credentials.
Email: YOUR_EMAIL
Password (typing will be hidden): YOUR_PASSWORD
Authentication successful.
</pre>

<div class="alert alert-info"><i class="fa fa-info-circle" aria-hidden="true"></i>
Heroku子產生器將始終使用免費套餐/選項。
不過，安裝外掛需要正確的<a href="https://devcenter.heroku.com/articles/account-verification" target="_blank" rel="noopener">已驗證的Heroku帳戶</a>。
因此，為避免任何意外的建立失敗，建議您在啟動此子產生器之前驗證您的Heroku帳戶。
</div>

Heroku子產生器使用[free dynos](https://devcenter.heroku.com/articles/dyno-types){:target="_blank" rel="noopener"} 建立一個應用程式，並與您選擇的設定相對應 。

我們支援以下附加元件：

* [Heroku Postgres](https://www.heroku.com/postgres){:target="_blank" rel="noopener"} 使用PostgreSQL
* [JawsDB](https://elements.heroku.com/addons/jawsdb){:target="_blank" rel="noopener"} 使用MySQL or MariaDB
* [Heroku Redis](https://elements.heroku.com/addons/heroku-redis){:target="_blank" rel="noopener"} [使用Redis](/using-cache/#caching-with-redis)
* [MemCachier](https://elements.heroku.com/addons/memcachier){:target="_blank" rel="noopener"} [使用Memcached](/using-cache/#caching-with-memcached)
* [Bonsai Elasticsearch](https://elements.heroku.com/addons/bonsai){:target="_blank" rel="noopener"} [使用 Elasticsearch](/using-elasticsearch/)
* [Okta](https://elements.heroku.com/addons/okta){:target="_blank" rel="noopener"}  [使用 OAuth2/OIDC (可選)](/security/#oauth2)

要將應用程式部署到Heroku，請執行以下指令：

`jhipster heroku`

這應該以"production"模式打包您的應用程式，使用資料庫建立一個Heroku應用程式，上傳您的程式碼，然後啟動該應用程式。

<div class="alert alert-info"><i class="fa fa-info-circle" aria-hidden="true"></i>
請注意，如果您的應用程式是微服務，系統將提示您提供registryURL。向下捲動以瞭解如何執行此操作。
</div>

<div class="alert alert-warning"><i class="fa fa-exclamation-circle" aria-hidden="true"></i>
請注意，您的應用程式必須在90秒內啟動，否則將被終止。根據平台負載，當然不能保證在60秒以內開始！
</div>


## 更改Java版本

您可以在執行Heroku子產生器時選擇Java版本。
預設情況下，它將是Java 11。
您可以在Heroku上找到所有內容[官方文件中支援的Java版本](https://devcenter.heroku.com/articles/java-support#supported-java-versions){:target="_blank" rel="noopener"}。

如果您想更改Java版本，例如 從11到14之後，您需要在專案根資料夾的system.properties中對其進行更改：

```
java.runtime.version = 14
```

重新部署應用程式時，它將使用Java 14。

## 部署您的應用程式

預設情況下，該應用程式將[透過git部署](https://devcenter.heroku.com/articles/git){:target="_blank" rel="noopener"} 。
這意味著您推送程式碼，Heroku將在其伺服器上建立並將其部署。
如果您不能或不想將程式碼推送到其他人的伺服器，則可以使用jar選項並[部署可執行的jar](https://devcenter.heroku.com/articles/deploying-executable-jar-files){:target="_blank" rel="noopener"}。
Heroku還支援[部署docker映像](https://devcenter.heroku.com/articles/container-registry-and-runtime){:target="_blank" rel="noopener"}， 但是子產生器確實支援 目前尚不支援此選項。

### 更新已部署的應用程式

#### 使用git選項

透過git部署時，已建立一個名為heroku的新遠端伺服器。
要部署新程式碼，您需要將更改推送到heroku遠端伺服器：

`git push heroku master`

<div class="alert alert-info"><i class="fa fa-info-circle" aria-hidden="true"></i>
這假定您已在執行此指令的電腦上執行了產生器。
如果還沒有，則需要遵循 <a href="https://devcenter.heroku.com/articles/git#for-an-existing-heroku-app" target="_blank" rel="noopener">指示建立一個Heroku遠端</a>.
</div>

#### 使用jar選項

選擇部署可執行jar時，需要建立更新的jar並將新檔案部署到Heroku。

##### 準備一個新的Jar

在部署了應用程式之後，可以透過輸入以下方式準備新的部署：

`./mvnw package -Pprod -DskipTests`

使用gradle:

`./gradlew -Pprod bootJar -x test`

##### 推送到生產

<div class="alert alert-info"><i class="fa fa-info-circle" aria-hidden="true"></i>
假定您已在執行此指令的電腦上執行了產生器。如果尚未安裝，則需要按照說明安裝[Heroku Java CLI](https://devcenter.heroku.com/articles/deploying-executable-jar-files)。
</div>

要推送生產，請輸入：

`heroku deploy:jar target/*.jar`

使用gradle:

`heroku deploy:jar build/libs/*jar`

## 將Docker部署到Heroku

您也可以將應用程式作為Docker容器部署到Heroku。 在這種情況下，不會發生任何Heroku設定和設定，因此您必須手動進行。 本文件假定您已經執行`jhipster heroku`來部署您的應用程式，因此可以利用此過程執行的整合和附加設定。

**注意**：如果您使用的是v6.10.2之前的JHipster版本，則需要在`src/main/resources/config/application-heroku.yml`中新增以下內容：

```yaml
server:
  port: ${PORT:8080}
```

建立您的Docker映像：

```
./mvnw package -Pprod verify jib:dockerBuild
```

如果您使用的是Gradle：

```
./gradlew -Pprod bootJar jibDockerBuild
```

您可以使用Docker Compose在本地對其進行測試。

```shell
docker-compose -f src/main/docker/app.yml up
```

確認一切正常後，在Heroku上建立一個新應用，並將其新增為remote。

```shell
heroku apps:create
git remote add docker https://git.heroku.com/<your-new-app>.git
```

然後執行以下指令以將您的JHipster應用程式部署為Docker映像。 
確保使用您的Heroku應用名稱替換`<...>`佔位符。 如果您不知道自己的應用名稱，請執行`heroku apps`。

```shell
heroku container:login
docker tag space registry.heroku.com/<heroku-app>/web
docker push registry.heroku.com/<heroku-app>/web
```

例如：

```shell
heroku container:login
docker tag space registry.heroku.com/fast-peak-70014/web
docker push registry.heroku.com/fast-peak-70014/web
```

此時，您可以使用已經設定的PostgreSQL和Okta外掛。 執行以下指令，從首次部署到的`heroku`遠端獲取附件的識別符號。

```shell
heroku addons --remote heroku
```

然後，您可以將這些實例附加到新的應用程式。

```shell
heroku addons:attach <postgresql-addon-name> --remote docker
heroku addons:attach <okta-addon-name> --remote docker
```

當您使用`jhipster heroku`部署應用程式時，它會為您正確設定資料庫。 但是，將其部署為Docker容器時，這些都不會發生。 因此，您需要設定一些設定變數，以便您的Docker容器可以與PostgreSQL通訊。 首先，執行以下指令以獲取PostgreSQL URL。

```
heroku config:get DATABASE_URL --remote docker
```

此指令將使用以下語法檢索值：

```
postgres://username:password@address
```

然後，設定資料庫環境變數以對應`application-heroku.yml`中的鍵：

```shell
heroku config:set JDBC_DATABASE_URL=jdbc:postgresql://<address> --remote docker
heroku config:set JDBC_DATABASE_USERNAME=<username> --remote docker
heroku config:set JDBC_DATABASE_PASSWORD=<password> --remote docker
```

設定要使用的最大Java記憶體量，並指定Spring設定檔案。

```shell
heroku config:set JAVA_OPTS=-Xmx256m
heroku config:set SPRING_PROFILES_ACTIVE=prod,heroku
```

執行以下指令以開啟瀏覽器並導向至您的應用。

```
heroku open --remote docker
```

複製應用程式的URL，然後登入到Okta開發人員帳戶。 轉到**Applications** > **Web** > **General**，然後將URL新增到『登入和登出』重導向URI中。 確保登入重導向URI以`/login/oauth2/code/oidc`結尾。

現在，您應該可以發布容器並啟動應用程式了。

```
heroku container:release web --remote docker
```

您可以檢視日誌以檢視容器是否成功啟動。

```
heroku logs --tail --remote docker
```

現在您應該可以開啟您的應用程式，單擊**sign in**連結並進行身份驗證！

```
heroku open --remote docker
```

**注意**：您**不能**使用Okta附加條款的管理員帳戶登入到您的JHipster應用程式。 為了確保您沒有使用該帳戶登入，我們建議您使用新的私有視窗登入。

如果您在[securityheaders.com](https://securityheaders.com)上測試了Dockerized JHipster應用，您將看到它的得分為 **A** ！

## 部署微服務

JHipster微服務需要[使用JHipster進行微服務](/microservices-architecture/)文件中所述的JHipster Registry。您可以透過單擊以下按鈕將registry部署到Heroku：

[![部署到Heroku](https://camo.githubusercontent.com/c0824806f5221ebb7d25e559568582dd39dd1170/68747470733a2f2f7777772e6865726f6b7563646e2e636f6d2f6465706c6f792f627574746f6e2e706e67)](https://dashboard.heroku.com/new?&template=https%3A%2F%2Fgithub.com%2Fjhipster%2Fjhipster-registry)

部署registry後，您可以對微服務或閘道器執行`jhipster heroku`指令。Heroku子產生器將提示您輸入registry的URL，其格式為`https://[appname].herokuapp.com`。

在Heroku上執行的registry有一些限制，包括：

*   registry僅適用於本機設定（不適用於Git設定）。
*   registry服務不能擴充套件多個dyno以提供冗餘。您必須部署多個應用程式（即多次單擊按鈕）。這是因為Eureka需要不同的URL才能在實例之間同步記憶體中狀態。

### 在Heroku上使用JHipster Registry的安全性

要在JHipster Registry上獲取自動生成的管理員密碼，請輸入：

`heroku config:get JHIPSTER_PASSWORD`

要使用此密碼，請透過執行以下指令來更新所有微服務和閘道器，以使用registry的憑據：

`heroku config:set JHIPSTER_REGISTRY_URL="https://admin:[password]@[appname].herokuapp.com"`

## 故障排除

如果在應用Liquibase變更日誌時您的應用程式被Heroku終止，則Liquibase將資料庫標記為"locked"。您將需要手動清理鎖定表。在Postgres上，請確保[已安裝本地Postgres用戶端](https://devcenter.heroku.com/articles/heroku-postgresql#local-setup){:target="_blank" rel="noopener"}，然後執行以下指令：

`heroku pg:psql -c "update databasechangeloglock set locked=false;"`

Heroku的預設啟動超時限制為90秒。如果您的應用花費的時間超過此時間，Heroku將終止該程序，這可能會使資料庫處於鎖定狀態。如果問題仍然存在，請嘗試與[Heroku支援](http://help.heroku.com){:target="_blank" rel="noopener"}聯絡，以請求為您的應用設定更長的啟動限制。

### 使用 Elasticsearch

帶有免費沙盒計劃的Bonsai附加元件確實[僅支援最新的Elasticsearch版本](https://docs.bonsai.io/article/139-which-versions-bonsai-supports){:target="_blank" rel="noopener"}。
這可能會導致某些[不相容](https://github.com/jhipster/generator-jhipster/issues/10003){:target="_blank" rel="noopener"}，具體取決於您使用的Spring Data和JHipster版本使用。

<div class="alert alert-warning"><i class="fa fa-money" aria-hidden="true"></i>
如果您願意使用<b>付費計劃</b>，則當然可以選擇使用的Elasticsearch版本。<a href="https://github.com/jhipster/generator-jhipster/issues/10003#issuecomment-587770177" target="_blank" rel="noopener">將其設定為例如<code class="highlighter-rouge">6.5.4</code> 或 <code class="highlighter-rouge">6.6.2</code></a> 適用於所有JHipster 6.x版本。
</div>

### 使用Okta

當您選擇[Okta](https://elements.heroku.com/addons/okta){:target="_blank" rel="noopener"}時，子產生器將建立一個bash指令碼，該指令碼將建立所需的所有組和角色由JHipster。
當您使用建立過程中提供的使用者和憑據登入時，您將需要選擇一個新密碼，因為指令碼確保將密碼直接過期，因為該密碼儲存在`.yo-rc.json`中。

<div class="alert alert-info"><i class="fa fa-info-circle" aria-hidden="true"></i>
設定Okta外掛所需的指令碼
<ul>
  <li><a href="https://curl.haxx.se/" target="_blank" rel="noopener">cURL</a> 用於向<a href="https://developer.okta.com/docs/reference/" target="_blank" rel="noopener">Okta API</a>傳送Web請求</li>
  <li><a href="https://stedolan.github.io/jq/" target="_blank" rel="noopener">jq</a>用於解析/處理JSON資料</li>
</ul>
如果找不到這些工具，則子產生器會警告您，您必須手動執行：
<code class="highlighter-rouge">./provision-okta-addon.sh</code>
</div>

### 免費dynos

免費dynos是有限的，不應用於生產部署，因為

* 他們在[30分鐘的空閒時間](https://devcenter.heroku.com/articles/free-dyno-hours#dyno-sleeping){:target="_blank" rel="noopener"}之後就休眠了。
* 他們有[每月有限的動態小時數](https://devcenter.heroku.com/articles/free-dyno-hours#usage){:target="_blank" rel="noopener"}。當這些被消耗掉時，您的測功機要等到下個月才能執行！

您可以直接從Heroku管理員介面升級dyno設定。
如果您意識到資料庫計劃太小了，你可以從管理頁面選擇一個新的計劃。

## 更多訊息

*   [應用範例](https://github.com/kissaten/jhipster-example){:target="_blank" rel="noopener"}
*   [Spring Boot Heroku文件](https://docs.spring.io/spring-boot/docs/current/reference/html/cloud-deployment.html#cloud-deployment-heroku){:target="_blank" rel="noopener"}
*   [Heroku免費dyno文件](https://devcenter.heroku.com/articles/free-dyno-hours){:target="_blank" rel="noopener"}
*   [Heroku Java支援文件](https://devcenter.heroku.com/articles/java-support#supported-java-versions){:target="_blank" rel="noopener"}
