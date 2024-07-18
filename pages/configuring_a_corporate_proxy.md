---
layout: default
title: 設定公司代理
permalink: /configuring-a-corporate-proxy/
redirect_from:
  - /configuring_a_corporate_proxy.html
sitemap:
    priority: 0.7
    lastmod: 2016-08-18T08:00:00-00:00
---

# <i class="fa fa-exchange"></i> 設定公司代理

在公司中使用JHipster時，您可能需要設定所有工具繞過公司代理。

您可以嘗試設定`HTTP_PROXY`和`HTTPS_PROXY`環境變數，或使用類似[Cntlm](http://cntlm.sourceforge.net/)s的工具。

但這可能還不夠，因此您還需要分別設定與JHipster一起使用的其他所有工具。

## 介紹

假設您的代理由以下引數定義：

- username
- password
- host
- port

那麼結果設定為： `http://username:password@host:port`

如果您使用[Cntlm](http://cntlm.sourceforge.net/)，則您的設定將是：`127.0.0.1:3128`。否則，請按照以下步驟分別設定每個工具。

## NPM設定

使用以下指令：

```
npm config set proxy http://username:password@host:port
npm config set https-proxy http://username:password@host:port
```

或者，您可以直接編輯你的 `~/.npmrc`檔案：

```
proxy=http://username:password@host:port
https-proxy=http://username:password@host:port
https_proxy=http://username:password@host:port
```

## Yarn設定

使用以下指令:

```
yarn config set proxy http://username:password@host:port
yarn config set https-proxy http://username:password@host:port
```

## Git設定

使用以下指令:

```
git config --global http.proxy http://username:password@host:port
git config --global https.proxy http://username:password@host:port
```

或者，您可以直接編輯你的`~/.gitconfig`檔案：

```
[http]
        proxy = http://username:password@host:port
[https]
        proxy = http://username:password@host:port
```

## Maven設定

在`~/.m2/settings.xml`檔案中編輯 `proxies`會話設定：

```
<proxies>
    <proxy>
        <id>id</id>
        <active>true</active>
        <protocol>http</protocol>
        <username>username</username>
        <password>password</password>
        <host>host</host>
        <port>port</port>
        <nonProxyHosts>local.net|some.host.com</nonProxyHosts>
    </proxy>
</proxies>
```

### Maven套件裝器

在專案資料夾中建立一個新檔案`.mvn/jvm.config`並設定相應地屬性：

```
-Dhttp.proxyHost=host 
-Dhttp.proxyPort=port 
-Dhttps.proxyHost=host 
-Dhttps.proxyPort=port 
-Dhttp.proxyUser=username 
-Dhttp.proxyPassword=password
```

## Gradle設定

如果需要透過代理下載Gradle套件裝器，則將以下內容新增到`gradle.properties`檔案和`gradle/wrapper/gradle-wrapper.properties`檔案中

如果要全域設定這些屬性，則將其新增到`USER_HOME/.gradle/gradle.properties`檔案中

```
## Proxy setup
systemProp.proxySet="true"
systemProp.http.keepAlive="true"
systemProp.http.proxyHost=host
systemProp.http.proxyPort=port
systemProp.http.proxyUser=username
systemProp.http.proxyPassword=password
systemProp.http.nonProxyHosts=local.net|some.host.com

systemProp.https.keepAlive="true"
systemProp.https.proxyHost=host
systemProp.https.proxyPort=port
systemProp.https.proxyUser=username
systemProp.https.proxyPassword=password
systemProp.https.nonProxyHosts=local.net|some.host.com
## end of proxy setup
```

## Docker

### 原生Docker

根據您的作業系統環境，您必須編輯特定檔案（`/etc/sysconfig/docker`或`/etc/default/docker`）。

然後，您必須使用以下指令重新啟動docker服務：`sudo service docker restart`

它不適用於systemd。請從[docker頁面](https://docs.docker.com/engine/admin/systemd/#http-proxy)檢視相關的代理設定。

### 帶有docker-machine的Docker

您可以使用以下指令建立docker-machine：

```
docker-machine create -d virtualbox \
    --engine-env HTTP_PROXY=http://username:password@host:port \
    --engine-env HTTPS_PROXY=http://username:password@host:port \
    default
```

或者，您可以編輯檔案 `~/.docker/machine/machines/default/config.json`.
