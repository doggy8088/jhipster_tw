---
layout: default
title: 分離前端和API伺服器
permalink: /separating-front-end-and-api/
sitemap:
    priority: 0.7
    lastmod: 2019-01-29T00:00:00-00:00
---

# <i class="fa fa-unlink"></i> 分離前端和API伺服器

## 介紹

JHipster是一個全棧開發工具，其目標是使您可以有效地使用前端程式碼（Angular/React）和後端程式碼（Spring Boot）。

但是，通常需要分離前端和後端程式碼，這通常是因為它們由不同的團隊開發並且具有不同的生命週期。

**請注意** 這不是JHipster的預設工作方式：這並不複雜，並且效果很好，但這是一個高階主題。如果您剛剛開始使用JHipster，我們建議您首先使用我們的標準工作方式。

## 僅生成前端或後端應用程式

您可以選擇僅生成JHipster後端或JHipster前端應用程式。在生成時，這僅是選擇標誌的問題，這些標誌在我們的[應用程式生成文件]({{ site.url }}/creating-an-app/)中進行了說明：

- `jhipster --skip-client` 只會生成一個後端應用程式（這通常是JHipster微服務）
- `jhipster --skip-server [options]` 只會生成一個前端應用程式(例如：`jhipster --skip-server --db=sql --auth=jwt`)

這僅適用於monoliths，因為這對於微服務（無論如何都沒有前端）和閘道器（啟用了Spring Cloud Gateway服務）沒有多大意義。

## 目錄佈局

JHipster使用標準的Maven目錄佈局。在後端上工作時，您只需閱讀[Maven標準目錄佈局文件](https://maven.apache.org/guides/introduction/introduction-to-the-standard-directory-layout.html)即可。

在前端工作時，您需要知道兩個目錄：

- `src/main/webapp` 是開發前端應用程式的地方
- `target/static` 是您的前端應用程式將被打包的位置

如果您有分別在前端和後端工作的團隊，則有兩種解決方案：

- 兩個團隊可以從事同一個專案。由於目錄是分開的，因此團隊之間不會有太多衝突。為了使事情變得更加清潔，兩個團隊可以在不同的分支上開發。

- 前端程式碼可以儲存在一個特定的Git專案中，然後作為Git子模組匯入到主後端專案中。這將需要移動前端建立指令碼。

## HTTP請求路由和緩存

一旦前端和後端分離，問題將是如何處理HTTP請求：

- 所有API呼叫都將使用`/api`字首。如果您使用的是Angular，則還可以在`webpack.common.js`設定中定義一個特定的`SERVER_API_URL`常數，該常數可以豐富此前綴設定。例如，您可以將`"http://api.jhipster.tech:8081/"`用作後端API伺服器（如果這樣做，請閱讀下面有關CORS的文件）。
- 呼叫`/`提供的靜態資源（從前端），而不應由瀏覽器快取。
- 對`/app`（包含前端應用程式）和`/content`（包含靜態內容，如圖像和CSS）的呼叫應在生產中進行快取，因為這些資產是經過雜湊處理的。
- 呼叫不存在的路由應將請求轉發到`index.html`。這通常在後端透過`ClientForwardController`處理。單獨部署前端時，需要進行額外設定。有關幾個範例，請參見[Angular](https://angular.io/guide/deployment#server-configuration)或[React](https://facebook.github.io/create-react-app/docs/deployment)文件。

# 使用BrowserSync

在`dev`模式下，JHipster使用BrowserSync來熱過載前端應用程式。BrowserSync有一個代理（[這裡是其文件](https://www.browsersync.io/docs/options#option-proxy)），該代理會將請求從`/api`路由到後端伺服器（預設情況下為`http://127.0.0.1:8080`）。

這僅在`dev`模式下有效，但這是從前端訪問不同API伺服器的非常有效的方法。

## 使用CORS

CORS（[跨域請求共享](https://wikipedia.org/wiki/Cross-origin_resource_sharing))允許訪問相同前端下的不同後端伺服器，而無需設定代理。

這是一個易於使用的解決方案，但是在生產中可能不太安全。

JHipster提供了開箱即用的CORS設定：

- 可以使用[jHipster通用應用程式屬性]({{ site.url }}/common-application-properties/)中定義的`jhipster.cors`屬性來設定CORS。
- 預設情況下，在`dev`模式下對monoliths和閘道器啟用該功能。對於微服務，預設情況下關閉此功能，因為您應該透過閘道器訪問它們。
- 出於安全原因，在`prod`模式下預設關閉該功能。

## 使用NGinx

分離前端程式碼和後端程式碼的另一種解決方案是使用代理伺服器。這在生產中很常見，有些團隊也在開發中使用了該技術。

此設定將根據您的特定用例進行更改，因此產生器無法自動進行此設定，這在下面的可用設定下。

建立一個`src/main/docker/nginx.yml`Docker Compose檔案：

    version: '2'
    services:
      nginx:
        image: nginx:1.15-alpine
        volumes:
        - ./../../../target/static:/usr/share/nginx/html
        - ./nginx/site.conf:/etc/nginx/conf.d/default.conf
        ports:
        - "8000:80"

此Docker映象將設定NGinx伺服器，該服務器從`target/static`讀取靜態資源：這是預設情況下生成JHipster前端應用程式的位置。在生產環境中，您可能為此需要一個特定的資料夾。

它還讀取一個`./nginx/site.conf`檔案：這是NGinx特定的設定檔案。

### 設定lambda
這是一個範例`site.conf`：

    server {
        listen 80;
        index index.html;
        server_name localhost;
        error_log  /var/log/nginx/error.log;

        root /usr/share/nginx/html;

        location /api {
            proxy_pass http://api.jhipster.tech:8081/api;
        }
        location /management {
            proxy_pass http://api.jhipster.tech:8081/management;
        }
        location /swagger-resources {
            proxy_pass http://api.jhipster.tech:8081/swagger-resources;
        }        
        location /v2 {
           proxy_pass http://api.jhipster.tech:8081/v2;
        }
        location /auth {
           proxy_pass http://api.jhipster.tech:8081/auth;
        }
 
        location / {
            try_files $uri $uri/ /index.html;
        }
    }

此設定意味著：

- NGinx將在連接埠`80`上執行
- 它將讀取資料夾`/usr/share/nginx/html`中的靜態資源，並且
- 它將作為從`/api`到`http://api.jhipster.tech/services/back`的代理
- 任何未處理的請求將轉發到`index.html`

根據您的特定需求，此設定將需要進行一些調整，但對於大多數應用程式來說，這應該是一個足夠好的起點。

### 使用Oauth 2.0和traefik進行設定

這是Oauth 2.0的範例`site.conf`：
如果伺服器基本名稱為`back`，並且託管traefik的伺服器名稱為`api.jhipster.tech`。
如果此設定用於docker映象，請不要使用`localhost`代替`api.jhipster.tech`，因為它是在容器而不是主機中解析的。

    server {
        listen 80;
        index index.html;
        server_name localhost;
        error_log  /var/log/nginx/error.log;

        root /usr/share/nginx/html;

        location ~* ^/api(.*) {
            proxy_pass http://api.jhipster.tech/services/back/api$1;
        }
        location ~* ^/management(.*) {
            proxy_pass http://api.jhipster.tech/services/back/management$1;
        }
        location ~* ^/swagger-resources(.*) {
            proxy_pass http://api.jhipster.tech/services/back/swagger-resources$1;
        }        
        location ~* ^/v2/api-docs(.*) {
           proxy_pass http://api.jhipster.tech/services/back/v2/api-docs$1;
        }
        location ~* ^/auth(.*) {
           proxy_pass http://api.jhipster.tech/services/back/auth$1;
        }
        location ~* ^/oauth2(.*) {
           proxy_pass http://api.jhipster.tech/services/back/oauth2$1;
        }
        location ~* ^/login(.*) {
           proxy_pass http://api.jhipster.tech/services/back/login$1;
        }
 
        location / {
            try_files $uri $uri/ /index.html;
        }
    }

此設定意味著：

- NGinx將在連接埠`80`上執行
- 它將讀取資料夾`/usr/share/nginx/html`中的靜態資源，並且
- 它將作為從`/api`到`http://api.jhipster.tech/services/back`的代理
- traefik提供了`http://api.jhipster.tech/services/back`的負載均衡
- 任何未處理的請求將轉發到`index.html`
