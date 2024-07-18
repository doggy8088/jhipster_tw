---
layout: default
title: 安全
permalink: /security/
redirect_from:
  - /security.html
sitemap:
    priority: 0.7
    lastmod: 2018-03-18T18:20:00-00:00
---

# <i class="fa fa-lock"></i> 保護您的應用程式

要將Spring Security與單個Web頁面應用程式一起使用（如JHipster生成的應用程式），您需要Ajax登入/登出/錯誤檢視。我們已經設定了Spring Security以便正確使用這些檢視，當然我們會為您生成所有JavaScript和HTML程式碼。

預設情況下，JHipster帶有2個不同的使用者：

*   "user", 具有"ROLE_USER"授權的普通使用者。預設密碼是"user"
*   "admin", 具有"ROLE_USER"和"ROLE_ADMIN"授權的管理員使用者。預設密碼是"admin"

兩個授權"ROLE_USER"和"ROLE_ADMIN"提供對實體的相同訪問許可權，這意味著"user"被授權執行與"admin"相同的CRUD操作。當應用程式投入生產時，此行為可能會成為問題，因為"user"可以例如刪除任何實體。有關如何改善訪問控制的更多詳細訊息，請參見此[部落格文章](https://blog.ippon.tech/improving-the-access-control-of-a-jhipster-application/)。

出於安全原因，您應該在生產中更改這些預設密碼。

JHipster提供了4種主要的安全機制：

1. [JSON Web令牌（JWT）](#jwt)
2. [基於會話的身份驗證](#session)
3. [OAuth2.0和OpenID Connect](#oauth2)

## <a name="jwt"></a> JSON Web令牌（JWT）

[JSON Web令牌（JWT）](https://jwt.io/)身份驗證是一種無狀態的安全機制，因此，如果要在多台不同的伺服器上擴充套件應用程式，它是一個不錯的選擇。

請注意，這是使用[微服務架構]({{ site.url }}/microservices-architecture/)時的預設選項。

預設情況下，Spring Security不存在這種身份驗證機制，它是[Java JWT專案](https://github.com/jwtk/jjwt)的特定於JHipster的整合。

該解決方案使用一個安全的令牌，其中包含使用者的登入名和許可權。由於令牌已簽名，因此使用者無法更改。

### 保護JWT

- JHipster使用secret金鑰，可以使用兩個Spring Boot屬性對其進行設定：`jhipster.security.authentication.jwt.secret`和`jhipster.security.authentication.jwt.base64-secret`。第二個選項使用Base64編碼的字串，因此它被認為更安全，因此建議使用。如果同時設定了兩個屬性，則出於傳統原因，將使用secret屬性（安全性較低）。如果您不使用Base64屬性，則會在應用程式啟動時顯示警告。
- 這些金鑰的最小長度應為512位：如果它們不夠長，則將無法使用它們進行登入。如果發生這種情況，控制台上將發出明確的警告，以解釋該問題。
- secret金鑰在`application-*.yml`檔案中設定。由於這些金鑰必須保密，因此您**應該**以安全的方式將它們儲存在生產設定檔案中。可以使用常規的Spring Boot屬性設定來設定它：使用Spring Cloud Config伺服器，如[JHipster Registry]({{ site.url }}/jhipster-registry/)（我們建議使用該選項），使用環境變數，甚至是由SCP製作的特定`application-prod.yml`檔案，由系統管理員放入與應用程式的可執行WAR檔案相同的目錄。
- 您**應該**更改預設的"user"和"admin"密碼。最簡單的方法是部署應用程式，先以"user/user"身份登入，然後以"admin/admin"身份登入，然後針對每個使用者使用 "Account > Password"選單更改密碼。

## <a name="session"></a> 基於會話的身份驗證

這是經典的Spring Security認證機制，但是我們已經對其進行了相當大的改進。它使用HTTP會話，因此它是一種有狀態的機制：如果您打算在多個服務器上擴充套件應用程式，則需要具有帶有粘性會話的負載均衡器，以便每個使用者的所有訪問都位於同一台伺服器上。

### 保護基於會話的身份驗證

- 對於"記住我"身份驗證，"記住我"金鑰在`application-dev.yml`和`application-prod.yml`檔案中設定為`jhipster.security.remember-me.key`屬性。由於此金鑰必須保密，因此您應該以安全的方式將其儲存在生產設定檔案中。可以使用常規的Spring Boot屬性設定來設定它：使用Spring Cloud Config伺服器，如JHipster Registry（我們建議使用的選項），使用環境變數，甚至是由SCP製作的特定`application-prod.yml`檔案，由系統管理員放入與應用程式的可執行WAR檔案相同的目錄。
- 您**應該**更改預設的"user"和"admin"密碼。最簡單的方法是部署應用程式，先以"user/user"身份登入，然後以"admin/admin"身份登入，然後針對每個使用者使用 "Account > Password"選單更改密碼。

###改進的"記住我"機制

我們已經修改了Spring Security記住我機制，以便您擁有一個唯一的令牌，該令牌儲存在資料庫中（SQL或NoSQL資料庫，具體取決於生成期間的選擇！）。我們還儲存了比標準實現更多的訊息，因此您可以更好地瞭解這些令牌的來源：IP地址，瀏覽器，日期……並且我們會生成一個完整的管理螢幕，以便您可以使會話無效，例如，如果您忘記了在另一台電腦上登出。

### Cookie盜竊保護

我們新增了非常完整的cookie盜竊保護機制：我們將您的安全性訊息儲存在cookie中以及資料庫中，並且每次使用者登入時，我們都會修改這些值並檢查它們是否被更改。這樣，如果使用者竊取了您的Cookie，則最多只能使用一次。

## <a name="oauth2"></a> OAuth2和OpenID Connect

OAuth是一種有狀態的安全性機制，類似HTTP會話。Spring Security提供了出色的OAuth 2.0和OIDC支援，JHipster利用了這一點。如果您不確定什麼是OAuth和OpenID Connect（OIDC），請參閱[OAuth到底是什麼](https://developer.okta.com/blog/2017/06/21/what-the-heck-is-oauth)

### Keycloak

[Keycloak](https://www.keycloak.org)是JHipster設定的預設OpenID Connect伺服器。

要登入您的應用程式，您需要啟動並執行[Keycloak](https://www.keycloak.org)。JHipster團隊為您建立了一個具有預設使用者和角色的Docker容器。使用以下指令啟動Keycloak。

```
docker-compose -f src/main/docker/keycloak.yml up
```

如果要將Keycloak與Docker Compose一起使用，請確保閱讀我們的[Docker Compose文件]({{ site.url }}/docker-compose/)，併為Keycloak正確設定`/etc/hosts`。

此映象已在`src/main/resources/config/application.yml`設定了安全設定。


```yaml
spring:
  ...
  security:
    oauth2:
      client:
        provider:
          oidc:
            issuer-uri: http://localhost:9080/auth/realms/jhipster
        registration:
          oidc:
            client-id: web_app
            client-secret: web_app
```

Keycloak預設情況下使用嵌入式H2資料庫，因此，如果重新啟動Docker容器，您將失去建立的使用者。為了保留您的資料，請閱讀[Keycloak Docker文件](https://hub.docker.com/r/jboss/keycloak/)。保留H2資料庫的一種解決方案是執行以下操作：

- 新增持久化卷: `./keycloak-db:/opt/jboss/keycloak/standalone/data`
- 更改遷移策略`OVERWRITE_EXISTING`為`IGNORE_EXISTING` (在指令部分)

在生產中，Keycloak要求您使用HTTPS。有幾種方法可以實現此目的，包括使用將管理HTTPS的反向代理或負載均衡器。我們建議您閱讀[Keycloak HTTPS文件](https://www.keycloak.org/docs/latest/server_installation/index.html#setting-up-https-ssl)以瞭解有關此主題的更多訊息。

### Okta

如果您想使用Okta代替Keycloak，那麼使用[Okta CLI]（https://cli.okta.com/）很快。 安裝後，執行：

```shell
okta register
```
然後，在您的JHipster應用程式目錄中，執行`okta apps create jhipster`。 這將為您設定一個Okta應用程式，建立`ROLE_ADMIN`和`ROLE_USER`組，使用您的Okta設定建立`.okta.env`檔案，並在您的ID令牌中設定`groups`宣告。

執行`source .okta.env`並使用Maven或Gradle啟動您的應用程式。 您應該能夠使用您註冊時使用的憑據登入。

如果您使用的是Windows，則應安裝[WSL]（https://docs.microsoft.com/zh-cn/windows/wsl/install-win10），以便使用`source`指令。

如果您想透過Okta管理控制台手動進行設定，請參見以下說明。

#### 使用Okta管理控制台建立OIDC應用

首先，您需要在<https://developer.okta.com/signup>上建立一個免費的開發人員帳戶。 之後，您將獲得自己的Okta域，其名稱類似於`https://dev-123456.okta.com`。

修改`src/main/resources/config/application.yml`以使用Okta設定。提示：將`{yourOktaDomain}`替換為您組織名稱（例如：`dev-123456.okta.com`）。

```yaml
security:
  oauth2:
    client:
      provider:
        oidc:
          issuer-uri: https://{yourOktaDomain}/oauth2/default
      registration:
        oidc:
          client-id: {client-id}
          client-secret: {client-secret}
```

在Okta中建立OIDC應用，以獲取`{client-id}`和`{client-secret}`。為此，請登入您的Okta Developer帳戶，然後導向至**Applications** > **Add Application** > **Create New App** 。選擇**Web**、**OpenID Connect**，然後單擊**Create**按鈕。為應用命名並且一定要記住，並指定`http://localhost:8080/login/oauth2/code/oidc`作為登入重導向URI。將`http://localhost:8080`新增為登出重導向URI，單擊**Save**。將用戶端ID和密碼複製到`application.yml`檔案中。

建立一個`ROLE_ADMIN`和`ROLE_USER`組（**Directory** > **Groups** > **Add Group**）並將使用者新增到其中。您可以使用註冊時使用的帳戶，也可以建立一個新使用者（**Directory** > **People** > **Add Person**）。導向到 **Security** > **API** > **Authorization Servers**，然後單擊`default`伺服器。單擊**Claims**標籤，然後**Add Claim**。將其命名為`groups`，並將其包括在ID令牌中。將值型別設定為`Groups`，並將過濾器設定為`.*`正則表示式。單擊**Create**。

<img src="{{ site.url }}/images/security-add-claim.png" alt="Add Claim" width="600" style="margin: 10px">

**注意:** 如果您想一直使用Okta（而不是Keycloak），請修改JHipster的Protractor測試以在執行時使用該帳戶。為此，請更改`src/test/javascript/e2e/account/account.spec.ts`和`src/test/javascript/e2e/admin/administration.spec.ts`中的憑據。

進行這些更改後，您應該一切順利！如果您有任何問題，請將其發布到[Stack Overflow](https://stackoverflow.com/questions/tagged/jhipster)。確保用"jhipster"和"okta"標記您的問題。

要在執行e2e測試時使用Okta，可以設定環境變數。

```shell
export CYPRESS_E2E_USERNAME=<your-username>
export CYPRESS_E2E_PASSWORD=<your-password>
```

如果您使用的是Protractor，請刪除`CYPRESS_`字首。

#### 使用環境變數

您還可以使用環境變數來覆蓋預設值。例如：

```bash
export SPRING_SECURITY_OAUTH2_CLIENT_PROVIDER_OIDC_ISSUER_URI="https://{yourOktaDomain}/oauth2/default"
export SPRING_SECURITY_OAUTH2_CLIENT_REGISTRATION_OIDC_CLIENT_ID="{client-id}"
export SPRING_SECURITY_OAUTH2_CLIENT_REGISTRATION_OIDC_CLIENT_SECRET="{client-secret}"
```

您可以將其放在`~/.okta.env`檔案中，然後執行`source ~/.okta.env`以用Okta覆蓋Keycloak。

然後，當您部署到Heroku時，可以設定以下屬性：

```bash
heroku config:set \
  SPRING_SECURITY_OAUTH2_CLIENT_PROVIDER_OIDC_ISSUER_URI="$SPRING_SECURITY_OAUTH2_CLIENT_PROVIDER_OIDC_ISSUER_URI" \
  SPRING_SECURITY_OAUTH2_CLIENT_REGISTRATION_OIDC_CLIENT_ID="$SPRING_SECURITY_OAUTH2_CLIENT_REGISTRATION_OIDC_CLIENT_ID" \
  SPRING_SECURITY_OAUTH2_CLIENT_REGISTRATION_OIDC_CLIENT_SECRET="$SPRING_SECURITY_OAUTH2_CLIENT_REGISTRATION_OIDC_CLIENT_SECRET"
```

請參閱[將OpenID Connect支援與JHipster一起使用](https://developer.okta.com/blog/2017/10/20/oidc-with-jhipster)以瞭解有關JHipster 5和帶有Okta的OIDC的更多訊息。

如果您使用的是JHipster 6，請參閱[Better, Faster, Lighter Java with Java 12 and JHipster 6](https://developer.okta.com/blog/2019/04/04/java-11-java-12-jhipster-oidc)。如果您的微服務使用JHipster 6，請參閱帶[有Spring Cloud Config和JHipster的Java微服務](https://developer.okta.com/blog/2019/05/23/java-microservices-spring-cloud-config)。

對於JHipster 7，請參閱[基於Spring Boot和JHipster的回應式Java微服務](https://developer.okta.com/blog/2021/01/20/reactive-java-microservices) 。

Okta開發者部落格還為Micronaut和Quarkus提供了一些❤️：

-[使用JHipster建立安全的Micronaut和Angular應用](https://developer.okta.com/blog/2020/08/17/micronaut-jhipster-heroku)
-[使用Quarkus和JHipster簡化了Java的快速程式設計](https://developer.okta.com/blog/2021/03/08/jhipster-quarkus-oidc)

## <a name="https"></a> HTTPS

您可以透過在SecurityConfiguration.java中新增以下設定來強制使用HTTPS。

```java
// Spring MVC
http.requiresChannel(channel -> channel
    .requestMatchers(r -> r.getHeader("X-Forwarded-Proto") != null).requiresSecure());
    
// WebFlux
http.redirectToHttps(redirect -> redirect
    .httpsRedirectWhen(e -> e.getRequest().getHeaders().containsKey("X-Forwarded-Proto")));
```


查閱Spring Security的 [Servlet](https://docs.spring.io/spring-security/site/docs/5.5.x/reference/html5/#servlet-http-redirect) 和 [WebFlux](https://docs.spring.io/spring-security/site/docs/5.5.x/reference/html5/#webflux-http-redirect) 文件瞭解更多詳細訊息。

經過測試，已知可以在Heroku和Google Cloud上使用。 有關Heroku的更多生產技巧，請參閱[準備在Heroku上進行生產的Spring Boot應用程式](https://devcenter.heroku.com/articles/preparing-a-spring-boot-app-for-production-on-heroku) 。

## <a name="implementation-details"></a> 技術實現細節洩漏

每個失敗/異常都對映到[problem 資料結構](https://github.com/zalando/problem) 並回傳給用戶端。

```json
{  
  "type": "https://www.jhipster.tech/problem/problem-with-message",
  "title": "Service Unavailable",
  "status": 503,
  "detail": "Database not reachable"
}
```

雖然JHipster預設情況下不包含任何堆疊跟蹤，但是`detail`包含異常的`message`可能會[顯示技術細節](https://github.com/jhipster/generator-jhipster/issues/12051) ，但您不希望透過API公開。

```json
{  
  "type": "https://www.jhipster.tech/problem/problem-with-message",
  "title": "Bad Request",
  "status": 400,
  "detail": "JSON parse error: Cannot deserialize instance of 
       `java.util.LinkedHashMap<java.lang.Object,java.lang.Object>` out of VALUE_NUMBER_INT token; nested exception is com.fasterxml.jackson.databind.exc.MismatchedInputException: Cannot deserialize instance of `java.util.LinkedHashMap<java.lang.Object,java.lang.Object>` 
       out of VALUE_NUMBER_INT token\n at [Source: (PushbackInputStream); line: 1, column: 1]"
}
```

為了防止這種情況，JHipster提供了一種專用機制來減輕實現細節的洩漏，具體方法是：

* 檢查常見的異常並用通用訊息替換該訊息（例如，`Unable to convert http message`）
* 檢查訊息是否包含潛在的程式套件名稱 (例如：`java.` 或 `.org`)並用通用的名稱替換訊息（例如，`Unexpected runtime exception`）

日誌中仍然包含詳細的異常，因此您仍然可以確定真正的問題，而外部的攻擊者則無法透過濫用您的api獲得有價值的技術詳細訊息。

如果您需要修改邏輯（例如，該訊息仍包含技術細節，但未被檢測到），則可以透過修改`ExceptionTranslator.java`中的`prepare`方法中新增所需的邏輯