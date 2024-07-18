---
layout: default
title: 在生產中使用JHipster
permalink: /production/
redirect_from:
  - /production.html
sitemap:
    priority: 0.7
    lastmod: 2019-02-04T00:00:00-00:00
---

# <i class="fa fa-play-circle"></i> 在生產中使用JHipster

JHipster生成了完全可用於生產，最佳化和安全的應用程式。本部分介紹了更重要的選項-如果您急於趕時間，請執行常規的生產版本，但不要忘記閱讀安全性部分！

1. [建立生產套件](#build)
2. [在生產中執行](#run)
3. [效能最佳化](#performance)
4. [安全](#security)
5. [監控](#monitoring)

## <a name="build"></a> 建立生產套件

### 測試生產版本

這樣就可以從Maven測試生產版本，而無需建立真正的程式套件。

要在生產模式下使用JHipster，請使用預先設定的`prod`概要檔案。使用Maven，請執行：

`./mvnw -Pprod`

使用Gradle時，請執行：

`./gradlew -Pprod`

此設定檔案將使用所有生產設定編譯，測試和打包您的應用程式。

如果需要有關可用設定檔案的更多訊息，請轉到標題為"[開發和生產設定檔案]({{ site.url }}/profiles/)"部分。

### 建立可執行的JAR/WAR檔案

#### With Maven

- 要將應用程式打包為生成JAR，請輸入：

  `./mvnw -Pprod clean verify`

  這將生成一個檔案`target/jhipster-0.0.1-SNAPSHOT.jar`（如果您的應用程式稱為`jhipster`）。

- 要將應用程式打包為生成WAR：
  
    - 修改pom.xml，將應用程式包裝更改為war，例如：

    ```diff
    -    <packaging>jar</packaging>
    +    <packaging>war</packaging>
    ``` 
  - 修改`pom.xml`以將`spring-boot-starter-undertow`的依賴範圍更改為`provided`，例如：

    ```diff
        <id>prod</id>
        <dependencies>
            <dependency>
                <groupId>org.springframework.boot</groupId>
                <artifactId>spring-boot-starter-undertow</artifactId>
    +           <scope>provided</scope>
            </dependency>
        </dependencies>
    ``` 
    - 要將原始`war`生成可執行檔案`war`，請輸入指令：
    ```bash
    ./mvnw -Pprod clean verify
    ```
    - 這將生成以下檔案（如果您的應用程式稱為`jhipster`）：
      * `target/jhipster-0.0.1-SNAPSHOT.war`
      * `target/jhipster-0.0.1-SNAPSHOT.war.original`
        
**請注意**，當使用`context path`建立JAR或WAR檔案時，並且**React client**或**Vue client**，則需要更新`webpack.prod.js`或`webpack.common.js`（使用**Vue**時更新兩個檔案）具有正確的`base`屬性值。
將`jhipster`作為上下文路徑，`base`屬性值應如下所示：

```
new HtmlWebpackPlugin({
    ...
    base: '/jhipster/'
})
```

如果您前端選擇了`Angular`，則需要使用適當的`base`』`標籤更新`index.html`。
將`jhipster`作為上下文路徑，`base`標籤值應如下所示：

```
<base href="/jhipster/"/>
```

**請注意**，當使用`prod`設定檔案建立JAR或WAR檔案時，生成的歸檔檔案將不包含`dev`資產。

#### 使用Gradle

要將應用程式打包為`production` JAR，請輸入：

`./gradlew -Pprod clean bootJar`

這將生成一個檔案`build/libs/jhipster-0.0.1-SNAPSHOT.jar`（如果您的應用程式稱為`jhipster`）。

要將應用程式打包為`production` WAR，請輸入：

`./gradlew -Pprod -Pwar clean bootWar`

**請注意**，當使用`context path`建立JAR或WAR檔案時，並且**React client**或**Vue client**，則需要更新`webpack.prod.js`或`webpack.common.js`（使用**Vue**時更新兩個檔案）具有正確的`base`屬性值。
將`jhipster`作為上下文路徑，`base`屬性值應如下所示：

```
new HtmlWebpackPlugin({
    ...
    base: '/jhipster/'
})
```

如果您前端選擇了`Angular`，則需要使用適當的`base`』`標籤更新`index.html`。
將`jhipster`作為上下文路徑，`base`標籤值應如下所示：

```
<base href="/jhipster/"/>
```

**請注意**，當使用`prod`設定檔案建立JAR或WAR檔案時，生成的歸檔檔案將不包含`dev`資產。

## <a name="run"></a> 在生產中執行

### 在沒有應用程式伺服器的情況下執行JAR檔案

與部署到應用程式伺服器相比，許多人發現擁有單個可執行的JAR檔案更加容易。

使用上一步中生成的JAR檔案，以生產模式執行它，您可以透過輸入（在Mac OS X或Linux上）：

`./jhipster-0.0.1-SNAPSHOT.jar`

如果您使用的是Windows，請使用：

`java -jar jhipster-0.0.1-SNAPSHOT.jar`

**請注意** 該JAR檔案使用我們在建立檔案時選擇的設定檔案。由於它是使用上一節中的`prod`檔案建立的，因此它將與`prod`設定檔案一起執行。

您可以將上下文路徑指定為環境變數或指令行引數，例如：

```bash 
java -jar jhipster.jar --server.servlet.context-path=/jhipster
```

### 在Docker容器中執行應用程式

JHipster對Docker具有一等公民的支援：將可執行JAR檔案捆綁在Docker映象中並在Docker中執行非常容易。

要了解如何使用Docker打包您的應用程式，請閱讀我們的[Docker Compose文件]({{ site.url }}/docker-compose/)。

### 作為服務執行

也可以將Jar作為Linux服務執行，並且您可能希望在打包之前強制在`pom.xml`檔案指定。為此，請在`spring-boot-maven-plugin`外掛的`<configuration>`內新增以下屬性。

```
<embeddedLaunchScriptProperties>
    <mode>service</mode>
</embeddedLaunchScriptProperties>
```

接下來，使用以下指令設定您的init.d：

`ln -s jhipster-0.0.1-SNAPSHOT.jar /etc/init.d/jhipster`

使用以下方法保護您的應用程式安全：

`chown jhuser:jhuser jhipster-0.0.1-SNAPSHOT.jar
sudo chattr +i your-app.jar`

考慮到`jhuser`是將執行該應用程式的非root作業系統帳戶，則可以透過以下方式執行該應用程式：

`service jhipster start|stop|restart`

您可以在[Spring Boot文件](https://docs.spring.io/spring-boot/docs/current/reference/html/deployment-install.html)中找到許多其他選項，包括更多安全步驟和Windows服務相關。

## <a name="performance"></a> 效能最佳化

### 快取調整

如果在生成應用程式時選擇了快取提供程式，則JHipster會自動為您設定它。

但是，預設快取值非常低，因此應用程式可以在適度的硬體上執行，所以應該根據應用程式的特定業務需求來調整這些值。

請閱讀：

- [JHipster『使用快取』文件]({{ site.url }}/using-cache/)可瞭解有關所選快取提供程式的更多訊息，以及如何對其進行調整
- 關於[最後一部分的監控](#monitoring)，因此您可以根據應用程式的實際使用情況微調快取

### HTTP/2支援

JHipster使用`jhipster.http.version`屬性（在`application-prod.yml`檔案中設定）支援HTTP/2。

要啟用HTTP/2，您需要：

- 設定`jhipster.http.version: V_2_0`
- 設定HTTPS（請參閱本文件的[安全性部分](#security)），因為瀏覽器會強制將HTTPS與HTTP/2結合使用

### GZipping

在使用`prod`設定檔案的可執行JAR檔案中，JHipster會在您的Web資源上設定GZip壓縮。

預設情況下，壓縮將對所有靜態資源（HTML，CSS，JavaScript）和所有REST請求起作用。透過檢視在`application-prod.yml`檔案中設定的Spring Boot應用程式屬性中的`server.compression.*`鍵，可以獲取有關此設定的更多訊息。

**請注意** GZipping由應用程式伺服器完成，因此本節僅在您使用上述『可執行的JAR』選項時適用。如果您在外部應用程式伺服器上執行應用程式，則需要單獨進行設定。

### 快取頭

使用`prod`設定檔案，JHipster設定了一個Servlet過濾器，該過濾器將特定的HTTP快取頭放在您的靜態資源（JavaScript，CSS，字型等）上，以便瀏覽器和代理快取它們。

### 使用Webpack生成最佳化的JavaScript應用程式

使用`prod`設定檔案建立專案時，將自動觸發此步驟。如果要執行它而不想啟動Maven建立，請執行：

`npm run build`

這將使用[Webpack](https://webpack.github.io/)處理所有靜態資源（CSS，TypeScript，HTML，JavaScript，圖片等），以生成最佳化的前端應用程式。

在此過程中，Webpack會將TypeScript程式碼編譯為JavaScript程式碼，還將生成源對映，因此仍可以除錯前端應用程式。

這些最佳化後的資源，如果使用Maven，將在`target/classes/static`中生成，對於Gradle，將在`build/resources/main/static`中生成，並將包含在最終的生產JAR中。

當您使用`prod`設定檔案執行應用程式時，這些程式碼將被服務託管。

## <a name="security"></a> 安全

### 保護預設使用者和管理員帳戶

JHipster會為您生成一些預設使用者。在生產中，您應該更改這些使用者的預設密碼！

請遵循我們的[安全文件]({{ site.url }}/security/)，以瞭解如何更改這些密碼並保護您的應用程式安全。

### HTTPS支援

可以直接在JHipster應用程式中設定HTTPS，也可以使用特定的前端代理進行設定。

#### 使用JHipster進行HTTPS設定

HTTPS是使用`application-prod.yml`檔案中的Spring Security的標準`server.ssl`設定鍵設定的。

要啟用SSL，請使用以下方法生成證書：

    keytool -genkey -alias <your-application> -storetype PKCS12 -keyalg RSA -keysize 2048 -keystore keystore.p12 -validity 3650

您也可以透過[本教程](https://maximilian-boehm.com/hp2121/Create-a-Java-Keystore-JKS-from-Let-s-Encrypt-Certificates.htm)使用Let's Encrypt。

然後，修改`server.ssl`屬性，以便您的`application-prod.yml`設定如下所示：

    server:
        port: 443
        ssl:
            key-store: keystore.p12
            key-store-password: <your-password>
            keyStoreType: PKCS12
            keyAlias: <your-application>
            ciphers: TLS_ECDHE_ECDSA_WITH_AES_128_GCM_SHA256, TLS_ECDHE_ECDSA_WITH_AES_256_GCM_SHA384, TLS_ECDHE_ECDSA_WITH_AES_128_CBC_SHA, TLS_ECDHE_ECDSA_WITH_AES_256_CBC_SHA, TLS_ECDHE_ECDSA_WITH_AES_128_CBC_SHA256, TLS_ECDHE_ECDSA_WITH_AES_256_CBC_SHA384, TLS_ECDHE_RSA_WITH_AES_128_GCM_SHA256, TLS_ECDHE_RSA_WITH_AES_256_GCM_SHA384, TLS_ECDHE_RSA_WITH_AES_128_CBC_SHA, TLS_ECDHE_RSA_WITH_AES_256_CBC_SHA, TLS_ECDHE_RSA_WITH_AES_128_CBC_SHA256, TLS_ECDHE_RSA_WITH_AES_256_CBC_SHA384, TLS_DHE_RSA_WITH_AES_128_GCM_SHA256, TLS_DHE_RSA_WITH_AES_256_GCM_SHA384, TLS_DHE_RSA_WITH_AES_128_CBC_SHA, TLS_DHE_RSA_WITH_AES_256_CBC_SHA, TLS_DHE_RSA_WITH_AES_128_CBC_SHA256, TLS_DHE_RSA_WITH_AES_256_CBC_SHA256
            enabled-protocols: TLSv1.2

ciphers suite透過停用一些舊的和已棄用的SSL密碼來增強安全性，此清單已透過[SSL實驗室](https://www.ssllabs.com/ssltest/)測試

Once `server.ssl.ciphers` property is enabled JHipster will force the order on Undertow with this property (true by default) : `jhipster.http.useUndertowUserCipherSuitesOrder`
啟用`server.ssl.ciphers`屬性後，JHipster將使用以下屬性（預設為true）在Undertow上強制執行請求：`jhipster.http.useUndertowUserCipherSuitesOrder`

`enabled-protocols`會停用舊的SSL協定。

然後，實現完美的前向保密性的最後一步。在JVM啟動時新增以下標誌：

    -Djdk.tls.ephemeralDHKeySize=2048

要測試您的設定，可以轉到[SSL Labs](https://www.ssllabs.com/ssltest/)。

如果一切正常，您將獲得A+

#### 帶有前端代理的HTTPS設定

有許多解決方案可在JHipster應用程式的前面設定前端HTTPS代理。

最常見的解決方案之一是使用Apache HTTP伺服器，可以使用Let's Encrypt來進行設定：

- 安裝Apache和Let's Encrypt：`apt-get install -y apache2 python-certbot-apache`
- 設定Let's Encrypt: `certbot --apache -d <your-domain.com> --agree-tos -m <your-email> --redirect`
- 設定SSL證書的自動續訂: 想您的crontab新增 `10 3 * * * /usr/bin/certbot renew --quiet` 

## <a name="monitoring"></a> 監控

JHipster帶有[Micrometer](https://micrometer.io/)的全面監視支援。

在開發中，可以透過JMX獲得Metrics資料：啟動JConsole，您將可以訪問它

在生產中，您的應用程式將其指標資料公開在[Prometheus伺服器](https://prometheus.io/docs/introduction/overview/)定期採集的伺服器端點上，具體取決於您設定的內容。
