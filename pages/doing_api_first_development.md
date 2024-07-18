---
layout: default
title: API優先開發
permalink: /doing-api-first-development/
redirect_from:
  - /doing-api-first-development.html
sitemap:
    priority: 0.7
    lastmod: 2018-06-11T00:00:00-00:00
---

# <i class="fa fa-search"></i> API優先開發

生成JHipster應用程式時，在提示您選擇其他技術時, 可以選擇`使用OpenAPI-generator進行API優先開發`。此選項將設定您的建立工具以使用[OpenAPI-generator](https://github.com/OpenAPITools/openapi-generator)從OpenAPI（Swagger）定義檔案生成API程式碼。
Swagger v2和OpenAPI v3格式均受支援。

### API優先開發的理由

在API優先開發中，您需要先編寫規範，然後再從中生成程式碼，而不是從程式碼中生成文件。
這具有以下優點：

- 您可以為使用者設計API，而不必考慮其實現。
- 您可以使用規範文件在新服務器端點發布之前模擬它們，因此，可以進一步的分離前端和後端開發。
- 您不需要線上伺服器即可使用OpenAPI文件。

### 使用OpenAPI產生器外掛

OpenAPI規範文件位於src/main/resources/swagger/api.yml，用於生成可以實現的端點介面。這些介面具有預設方法，這些方法會回傳`501 Not implemented`HTTP狀態和空訊息體。使用諸如[swagger-editor](http://editor.swagger.io)之類的工具編寫您的規範，將其放在`src/main/resources/swagger/api.yml`中，然後執行：
```bash
./mvnw generate-sources
```
或用於gradle：
```bash
./gradlew openApiGenerate
```
然後使用`@Service`類實現在`${buildDirectory}/generated-sources/openapi/src/main/java/${package}/web/api/`中生成的"Delegate"介面。

為著名的[petstore](http://petstore.swagger.io)編寫程式碼的範例：

```java
@Service
public class PetApiDelegateImpl implements PetApiDelegate {

    @Override
    public ResponseEntity<List<Pet>> findPetsByStatus(List<String> status) {
        return ResponseEntity.ok(
            status.stream()
                .distinct()
                .map(Pet.StatusEnum::fromValue)
                .map(statusEnum -> new Pet().id(RandomUtils.nextLong()).status(statusEnum))
                .collect(Collectors.toList())
        );
    }
}
```
如果將`NativeWebRequest` bean提供給delegate介面，則將為尚未重寫的方法（仍然帶有501 HTTP狀態程式碼）回傳基本範例主體。

在提供實際實現之前，這對模擬端點很有用。
```java
@Service
public class PetApiDelegateImpl implements PetApiDelegate {

    private final NativeWebRequest request;

    public PetApiDelegateImpl(NativeWebRequest request) {
        this.request = request;
    }

    @Override
    public Optional<NativeWebRequest> getRequest() {
        return Optional.ofNullable(request);
    }
}
```
然後你可以得到例子
```sh
$ curl -X GET --header 'Accept: application/json' 'http://localhost:8080/v2/pet/findByStatus?status=pending'
{  "photoUrls" : [ "photoUrls", "photoUrls" ],  "name" : "doggie",  "id" : 0,  "category" : {    "name" : "name",    "id" : 6  },  "tags" : [ {    "name" : "name",    "id" : 1  }, {    "name" : "name",    "id" : 1  } ],  "status" : "available"}%
$ curl -X GET --header 'Accept: application/xml' 'http://localhost:8080/v2/pet/findByStatus?status=pending'
<Pet>  <id>123456789</id>  <name>doggie</name>  <photoUrls>    <photoUrls>aeiou</photoUrls>  </photoUrls>  <tags>  </tags>  <status>aeiou</status></Pet>%
```

可能是您的IDE從源中排除了輸出資料夾。 確保重新載入設定以檢測生成的類。 可以透過您的IDE UI或指令來完成。

使用Eclipse或VSCode時
* with maven
```bash
./mvnw eclipse:clean eclipse:eclipse
```
使用IntelliJ時
* with maven
```bash
./mvnw idea:idea
```

### 使用 `openapi-client` 子產生器

JHipster還使用支援OpenAPI/Swagger規範的[Spring-Cloud FeignClients]（https://projects.spring.io/spring-cloud/spring-cloud.html#spring-cloud-feign）生成用戶端程式碼。
生成的FeignClient可以在單體和微服務應用程式中使用，並支援Swagger v2和OpenAPI v3定義。 要呼叫此子產生器，請執行`jhipster openapi-client`。