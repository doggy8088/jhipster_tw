---
layout: default
title: 使用JHipster UAA提供微服務安全
permalink: /using-uaa/
sitemap:
    priority: 0.7
    lastmod: 2016-08-25T00:00:00-00:00
---
# <i class="fa fa-lock"></i>使用JHipster UAA提供微服務安全

JHipster UAA是使用OAuth2授權協定的保護JHipster微服務安全的使用者審計和授權服務。

JHipster UAA與其他"UAA"（例如[Cloudfoundry UAA](https://github.com/cloudfoundry/uaa)）的區別在於，JHipster UAA是一個完全可設定的OAuth2授權伺服器，其中包含使用者和角色端點，幷包裝在普通的JHipster應用程式中。這使開發人員可以深度設定其使用者域的各個方面，而不會限制其他即用型UAA的策略。

## 概要

1. [架構圖](#architecture_diagram)
2. [微服務架構的安全性要求](#claims)
3. [在這種情況下瞭解OAuth2](#oauth2)
4. [使用JHipster UAA](#jhipster-uaa)
  * 基本設定
  * 瞭解元件
  * 重新整理令牌
  * 常見錯誤
5. [使用Feign用戶端保護服務間通訊](#inter-service-communication)
  * 使用Eureka, Ribbon, Hystrix和Feign
  * 使用`@AuthorizedFeignClients`
6. [測試UAA應用程式](#testing)
  * 模擬Feign用戶端
  * 模擬OAuth2身份驗證

## <a name="architecture_diagram"></a> 架構圖

<img src="{{ site.url }}/images/microservices_architecture_detail.002.png" alt="Diagram" style="width: 800; height: 600" class="img-responsive"/>

## <a name="claims"></a> 1. 微服務架構的安全性要求

在深入研究OAuth2及其在JHipster微服務上的應用之前，重要的是要弄清楚可靠的安全解決方案的要求。

### 1. 中央認證

由於微服務主要用於建立獨立的自主應用程式，因此我們希望獲得一致的身份認證體驗，因此使用者不會注意到自己的請求由具有單獨安全設定的其他應用程式來處理。

### 2. 無狀態

建立微服務的核心好處是可伸縮性。因此，所選的安全解決方案不應對此產生影響。在服務器上保持使用者會話狀態變得很棘手，因此在這種情況下，高度首選無狀態解決方案。

### 3. 使用者/機器訪問許可權的區別

需要清楚地區分不同的使用者以及不同的機器。使用微服務架構會導致建立具有不同域和資源的大型多功能資料中心，因此需要限制不同用戶端（例如本機應用程式，多個SPA等）的訪問許可權。

### 4. 細粒度的訪問控制

在維護集中角色的同時，需要在每個微服務中設定詳細的訪問控制策略。微服務不應該擔任識別使用者的責任，而必須授權傳入的請求。

### 5. 免受攻擊

無論安全解決方案可以解決多少問題，它都應儘可能抵禦漏洞。

### 6. 可擴充套件

使用無狀態協定並不保證該安全解決方案可擴充套件。最後，不應有任何單點故障。一個反例是共享的身份驗證資料庫或單個auth-server-instance，每個請求都會命中一次。

## <a name="oauth2"></a> 2. 在這種情況下瞭解OAuth2

使用OAuth2協定（請注意：這是一個**協定**，不是框架，不是應用程式）可以滿足所有6項宣告。它遵循嚴格的標準，這使得該解決方案也與其他微服務以及遠端系統相容。JHipster基於以下安全設計提供了兩種解決方案：

![JHipster UAA architecture]({{ site.url }}/images/jhipster_uaa.png)

* 對架構任何端點的每個請求都是透過"client"執行的
* "client"是"Angular $http client"，"REST-Client"， "curl"或任何能夠執行請求的東西的抽象詞。
* "client"也可以與使用者身份驗證結合使用，例如前端用戶端應用程式中的Angular $http
* 端點（包括UAA）上服務資源的每個微服務都是資源伺服器
* 藍色箭頭顯示用戶端在Oauth授權伺服器上進行身份驗證
* 綠色箭頭顯示用戶端在資源伺服器上執行的請求
* UAA伺服器是授權伺服器和資源伺服器的組合
* UAA伺服器是微服務應用程式內所有資料的所有者（它會自動批准對資源伺服器的訪問）
* 透過使用者身份驗證訪問資源的用戶端，使用帶有用戶端ID的"password grant"進行身份驗證，並安全儲存在閘道器設定檔案中
* 在沒有用戶的情況下訪問資源的用戶端使用"client credentials grant"進行身份驗證
* 每個用戶端都在UAA中定義（Web應用，內部，…）

該設計可以應用於獨立於語言或框架的任何微服務體系結構。

另外，可以將以下規則應用於訪問控制：

* 使用 "roles"和[RBAC][]設定使用者訪問
* 使用"scopes"和[RBAC][]設定電腦訪問
* 使用[ABAC][]，在"roles"和"scopes"上都使用布林表示式來表示複雜的訪問設定

  * 範例: hasRole("ADMIN")與hasScope("shop-manager.read", "shop-manager.write")

## <a name="jhipster-uaa"></a> 3. 使用JHipster UAA

搭建JHipster微服務時，您可以選擇UAA選項替代JWT身份驗證。

**注意**：UAA解決方案也使用了JWT，使用預設的Spring Cloud Security, JWT可自定義設定。

### 基本設定

最基本的設定包括：

1. JHipster UAA伺服器（作為應用程式型別）
2. 至少一個其他微服務（使用UAA身份驗證）
3. JHipster閘道器（使用UAA身份驗證）

這是生成它的順序。

除身份驗證型別外，還必須提供UAA的路徑。

對於非常基本的用法，此設定的工作方式與JWT身份驗證型別的工作方式相同，但是具有一項額外的服務。

### 瞭解元件

JHipster UAA伺服器可以立即完成三件事：

* 它服務於預設的JHipster使用者域，其中包含使用者和帳戶資源（由JWT身份驗證中的閘道器完成）
* 它為OAuth2實現`AuthorizationServerConfigurerAdapter`，並定義了基本用戶端（"web_app"和"internal"）
* 它在`/oauth/token_key`上提供JWT公鑰，所有其他微服務都必須使用它

開發人員可以選擇資料庫，快取解決方案，搜尋引擎，建立工具以及其他JHipster選項。

微服務啟動時，通常期望UAA伺服器已經啟動以共享其公鑰。該服務首先調`/oauth/token_key`來獲取公用金鑰並對其進行設定以進行金鑰簽名（`JwtAccessTokenConverter`）。

如果UAA沒有啟動，則應用程式將繼續啟動並在以後獲取公共金鑰。有兩個屬性-`uaa.signature-verification.ttl`控制金鑰在再次獲取之前的生存時間，`uaa.signature-verification.public-key-refresh-rate-limit`限制了對UAA的請求以避免傳送無用請求。這些值通常保留為其預設值。無論如何，如果驗證失敗，則微服務將檢查是否有新金鑰。這樣，可以在UAA上更換金鑰，並且服務將會同步。

至此，在此基本設定中可能會發生兩種用例：使用者呼叫和機器呼叫。

對於使用者請求，登入請求將傳送到閘道器的`/auth/login`端點。該端點使用`OAuth2TokenEndpointClientAdapter`將請求傳送給UAA，並使用"password"授權進行身份驗證。由於此請求發生在閘道器上，因此用戶端ID和密碼不會儲存在任何用戶端程式碼中，並且使用者無法訪問。閘道器回傳一個包含token的新Cookie，該Cookie與用戶端執行的每個請求一起傳送到JHipster後端。

對於機器呼叫，機器必須使用用戶端憑據授予作為UAA進行身份驗證。JHipster提供了一種標準解決方案，在[secure inter-service-communication using feign clients](#inter-service-communication)中有詳細描述

### 重新整理令牌

重新整理訪問令牌的一般流程在閘道器上進行，如下所示：

- 身份驗證是透過`AuthResource`呼叫`OAuth2AuthenticationService`的身份驗證來完成的，該身份驗證將設定Cookie。
- 對於每個請求，`RefreshTokenFilter`（由`RefreshTokenFilterConfigurer`生成）檢查訪問令牌是否已過期以及它是否具有有效的重新整理令牌。
- 如果是這樣，則它將透過`OAuth2AuthenticationService` refreshToken觸發重新整理過程。
- 這使用`OAuth2TokenEndpointClient`介面將重新整理令牌授權傳送到所選的OAuth2伺服器，在我們的範例中為UAA（透過`UaaTokenEndpointClient`）。
- 然後，重新整理授予的結果將在下游用作新cookie，並在上游（對於瀏覽器）將其設定為新cookie。

### 常見錯誤

這是開發人員應注意的重要事項的簡要清單。

#### ***生產環境和腳手架中在使用相同的簽名金鑰***

強烈建議儘可能使用不同的簽名金鑰。一旦簽名金鑰被人使用，就有可能在不知道任何使用者登入憑據的情況下生成完全訪問授權金鑰。

#### ***不使用TLS***

如果攻擊者設法攔截訪問令牌，則他將獲得對該令牌授權的所有權限，直到令牌過期。有很多方法可以實現這一點，尤其是在沒有TLS加密的情況下。在OAuth版本1的時代，這不是問題，因為強制進行協定級加密。

#### ***在URL中使用訪問令牌***

按照標準，訪問令牌可以透過URL，HTTP頭部或cookie傳遞。從TLS的角度來看，所有三種方式都是安全的。實際上，透過URL傳遞令牌的安全性較差，因為存在幾種從記錄中獲取URL的方法。

#### ***切換到對稱簽名金鑰***

JWT簽名不需要RSA，Spring Security確實也提供對稱令牌簽名。這也解決了一些使開發更加困難的問題。但這是不安全的，因為攻擊者需要進入一個微服務就可以生成自己的JWT令牌。

## <a name="inter-service-communication"></a> 4. 使用Feign用戶端進行安全的服務間通訊

當前，只有JHipster UAA提供了一種可擴充套件的安全服務間通訊方法。

在不手動將JWT從請求轉發到內部請求的情況下, 使用JWT身份驗證會迫使微服務透過閘道器呼叫其他微服務，這涉及到每個主請求中的其他內部請求。但是即使進行轉發，也無法完全區分使用者身份驗證和電腦身份驗證。

由於JHipster UAA基於OAuth2，因此所有這些問題都可以透過協定定義解決。

本章介紹如何開始使用它。

### 使用 Eureka, Ribbon, Hystrix和Feign

當一個服務要向另一個服務請求資料時，最終這四個元件都開始起作用。因此，重要的是要簡短地瞭解，每個元件具體負責了什麼：

* Eureka: 這是服務（取消）註冊的地方，因此您可以詢問"foo-service"，並獲取在Eureka中註冊的foo-service實例的一組IP。
* Ribbon: 當有人要"foo-service"並已經檢索到一組IP時，Ribbon會在這些IP上進行負載均衡。

綜上所述，當我們獲得一個URL，例如"http://uaa/oauth/token/"，其中有兩個執行在10.10.10.1:9999和10.10.10.2:9999上的JHipster UAA伺服器實例時，我們可以使用Eureka和Ribbon使用Round Robin演算法將該網址快速轉換為"http://10.10.10.1:9999/oauth/token"或"http://10.10.10.2:9999/oauth/token"。

* Hystrix: 解決服務故障的斷路器系統
* Feign: 以宣告式使用所有這些元件

在現實世界中，不保證所有服務的所有實例都可用。因此，Hystrix充當斷路器，使用備用以明確定義的方式處理故障情況。

但是，手動實現所有這些邏輯並進行編碼將會帶來很多工作：***Feign***提供了為在***Eureka***中註冊的端點負載均衡REST用戶端的選項，其後備實現由***Hystrix***控制，僅使用帶有一些註解的Java介面即可。

因此，對於服務間通訊，Feign客戶非常有幫助。當一項服務需要REST用戶端訪問提供某些"其他資源"的"其他服務"時，可以宣告如下介面：

``` java
@FeignClient(name = "other-service")
interface OtherServiceClient {
  @RequestMapping(value = "/api/other-resources")
  List<OtherResource> getResourcesFromOtherService();
}
```

然後，透過依賴項注入使用它，例如：

``` java
@Service
class SomeService {
  private OtherServiceClient otherServiceClient;

  @Inject
  public SomeService(OtherServiceClient otherServiceClient) {
    this.otherServiceClient = otherServiceClient;
  }
}
```

與Spring Data JPA相似，不需要實現該介面。但是，如果使用Hystrix，則可以這樣做。Feign用戶端介面的已實現類並充當備用實現。

一個未解決的問題是，使用UAA確保這種通訊的安全性。為此，應該有一些Feign的請求攔截器，該攔截器實現了來自OAuth的用戶端憑據流，以授權當前服務請求其他服務。在JHipster中，您使用`@AuthorizedFeignClients`。這是JHipster提供的註解，它也確實實現了這一點。

### 使用`@AuthorizedFeignClients`

考慮到上述Feign用戶端應用於提供受保護資源的"other-service"，因此必須對接口進行如下註解：

``` java
@AuthorizedFeignClient(name = "other-service")
interface OtherServiceClient {
  @RequestMapping(value = "/api/other-resources")
  List<OtherResource> getResourcesFromOtherService();
}
```

**注意**：由於Spring Cloud中的Bug，目前無法使用其他名稱作為服務名稱，因為

``` java
@AuthorizedFeignClient("other-service")
```

或者

``` java
@AuthorizedFeignClient(value = "other-service")
```

當記憶體中沒有有效的訪問令牌時，REST用戶端會自動獲得您的UAA伺服器的授權。

此方法解決了以下情況：機器請求在單獨的OAuth用戶端上執行而不引用使用者會話。這一點很重要，尤其是當對另一個服務中另一個請求發出的請求使用實體稽核時。或者，可以將初始請求的訪問令牌轉發到其他呼叫。當前，JHipster沒有提供"default solution"。

## <a name="testing"></a> 5. 測試UAA應用程式s

### 模擬Feign用戶端

與Feign客戶一起使用的元件應該是可測試的。在測試中使用Feign的方式與在生產環境中使用方式相同，將迫使JHipster Registry和UAA伺服器啟動並可以在執行測試的同一台電腦上訪問。但是在大多數情況下，您不需要測試Feign本身是否正常工作（通常可以），而是要使用Feign用戶端來測試您的元件。

使用`@MockBean`可以測試內部使用偽用戶端的元件，該組件是1.4.0版本以來的Spring Boot的一部分。

下面是一個範例，使用用戶端的模擬值測試`SomeService`可以正常工作：

``` java
@RunWith(SpringRunner.class)
@SpringBootTest(App.class)
public class SomeServiceTest {

    @MockBean
    private OtherServiceClient otherServiceClient;

    @Inject
    private SomeService someService;

    @Test
    public void testSomeService() {
        given(otherServiceClient.getResourcesFromOtherService())
        .willReturn(Arrays.asList(new OtherResource(...));

        someService.performActionWhichInkvokesTheAboveMentionedMethod();

        //assert that your application is in the desired state
    }
}
```

因此，使用此技術，您將模擬其他服務的行為，並提供預期的資源實體，該資源實體將來自原始碼。所有注入用戶端的Bean的行為都將被模擬，因此您可以專注於這些Bean的邏輯。

### 模擬OAuth2身份驗證

使用Spring針對REST控制器的整合測試通常會繞過安全設定，因為這樣做會使測試變得困難，而這僅是為了證明控制器可以正常工作。但是有時候，測試控制器的安全行為也是測試的一部分。

對於此用例，JHipster提供了一個名為`OAuth2TokenMockUtil`的元件，該組件可以模擬有效的身份驗證，而不必強制使用者或用戶端存在。

要使用此功能，必須完成兩件事：s

#### 1. .在模擬Spring MVC上下文中啟用安全性並注入模擬util

``` java
@Inject
private OAuth2TokenMockUtil tokenUtil;

@PostConstruct
public void setup() {
    this.restMockMvc = MockMvcBuilders
        .webAppContextSetup(context)
        .apply(springSecurity())
        .build();
}
```

***在此測試中，無需模擬控制器的單個實例，除了應用程式的`WebApplicationContext`***

#### 2. 使用`OAuth2TokenMockUtil`

該實用程式提供了一種 "oaut2authentication"方法，該方法可用於"with"表示法的MockMvc。當前，可以將其設定為使用以下欄位來模擬身份驗證：

* username
* roles (Set<String>)
* scope (Set<String>)

這是一個例子：

``` java
@Test
public void testInsufficientRoles() {
    restMockMvc.peform(
        get("url/requiring/ADMIN/role")
        .with(tokenUtil.oauth2Authentication("unpriveleged.user@example.com", Sets.newSet("some-scope"), Sets.newSet("ROLE_USER")))
    ).andExpect(status().isForbidden());
}
```

[RBAC]: https://de.wikipedia.org/wiki/Role_Based_Access_Control
[ABAC]: https://en.wikipedia.org/wiki/Attribute-Based_Access_Control
