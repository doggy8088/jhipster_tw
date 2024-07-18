---
layout: default
title: 發布 v7.0.0
---

JHipster 發布 v7.0.0 版本
==================

這是我們的第一個穩定的JHipster v7版本！

這是我們的2個v7.0.0 beta版本的更新日誌的摘要，並透過我們的最新更改進行了更新。

它總共包含2371個關閉的工單和主要專案的合併請求：

- 825個關閉的工單和合並請求： [v7.0.0](https://github.com/jhipster/generator-jhipster/issues?q=is%3Aclosed+milestone%3A7.0.0)
- 226個關閉的工單和合並請求： [v7.0.0-beta.1](https://github.com/jhipster/generator-jhipster/issues?q=is%3Aclosed+milestone%3A7.0.0-beta.1)
- 1320個關閉的工單和合並請求：: [v7.0.0-beta.0](https://github.com/jhipster/generator-jhipster/issues?q=is%3Aclosed+milestone%3A7.0.0-beta.0)

重大變化
------------

方案（Blueprint）和模組（Module)相關：
- 刪除getAllJhipsterConfig - [#12023](https://github.com/jhipster/generator-jhipster/issues/12023)，使用getJhipsterConfig代替。
- 為同步設定建立jhipsterConfig並將configOptions移動到Generator-base中[#12026](https://github.com/jhipster/generator-jhipster/pull/12026)， 現在generators-base-blueprint的jhipsterConfig欄位是一個代理，而不是儲存物件，請檢視PR描述以進行遷移。
- 在 `base-generator` 更新為 `getXXXAppName()`。 [#12325](https://github.com/jhipster/generator-jhipster/issues/12325):
  - 增加 `getFrontendAppName()` 方法和 `frontendAppName` 屬性
  - 移除 `getAngularAppName()` 方法和 `angularAppName` 屬性
  - 移除 `getAngularXName()` 方法和 `angularXAppName` 屬性
- 移除 `setup*Options()` 一系列操作
  - 必要時使用 `load(App/Client/Server)Config` ，也可能不需要替換。
- `id` 欄位被新增到JHipster 7的欄位（fields）中。
  - 如果您的方案（Blueprint）或模組（Module）不支援，透過以下方法過濾掉。 `this.fields = this.fields.filter(field => !field.id);`

前端相關：
- Angular: 進一步遵循Angular樣式指南 - [#13125](https://github.com/jhipster/generator-jhipster/issues/13125)
- React: 測試檔案與被測檔案同目錄 [#13425](https://github.com/jhipster/generator-jhipster/issues/13425)
- 登入頁面重構 - [#11926](https://github.com/jhipster/generator-jhipster/pull/11926)
- 用Day.js替換 moment - [#12575](https://github.com/jhipster/generator-jhipster/issues/12575)
- 伺服器通用指令碼 - 由Webapp替換Webpack profile [#13196](https://github.com/jhipster/generator-jhipster/pull/13196)

後端相關：
- 保護user api併為關係建立一個過濾的 user api - [#12374](https://github.com/jhipster/generator-jhipster/issues/12374)
- Springfox 3升級 - [#12133](https://github.com/jhipster/generator-jhipster/pull/12133) and [jhipster/jhipster#764](https://github.com/jhipster/jhipster/pull/764)
  - `swagger` maven profile 修改為 `api-docs`
  - `jhipster.swagger` property 修改為 `jhipster.api-docs`
  - `SwaggerCustomizer` 修改為 `SpringfoxCustomizer`
  - `swaggerSpringfoxApiDocket` 修改為 `openapiSpringfoxApiDocket`
  - `swaggerSpringfoxManagementDocket` 修改為 `openAPISpringfoxManagementDocket`
- 所有生成的閘道器都是 Reactive  的，而不是Spring MVC - [#13855](https://github.com/jhipster/generator-jhipster/issues/13855)
  - Zuul被Spring Cloud Gateway取代
  - Ribbon  被Spring Cloud Load Balancer取代
- 將id新增到PUT請求中 - [#14139](https://github.com/jhipster/generator-jhipster/issues/14139)

實體相關:
- 更改關係表表名 - [#11025](https://github.com/jhipster/generator-jhipster/issues/11025)

最重要的新功能和升級
-------------

新的功能
- 支援 Vue.js  - [#12064](https://github.com/jhipster/generator-jhipster/pull/12064)
- 支援 Cypress - [#12307](https://github.com/jhipster/generator-jhipster/pull/12307)
- JDL Studio V2
- JHipster控制中心（JHipster Control Center） - 詳情： [project](https://github.com/jhipster/jhipster-control-center)
- Prettier for Java - [#12109](https://github.com/jhipster/generator-jhipster/issues/12109)
- 支援 Angular CLI - [#10539](https://github.com/jhipster/generator-jhipster/issues/10539)
- 支援 Snyk - [#12441](https://github.com/jhipster/generator-jhipster/issues/12441)
- 新增–-pk-type支援 - [#13296](https://github.com/jhipster/generator-jhipster/issues/13296)
- 新增 @MapstructExpression 支援 - [#13195](https://github.com/jhipster/generator-jhipster/pull/13195)
- 使用k8s子產生器支援Neo4j - [#13548](https://github.com/jhipster/generator-jhipster/pull/13548)
- NPM 7 - [#13060](https://github.com/jhipster/generator-jhipster/pull/13060)

實體相關
- 支援自定義ID - [#13258](https://github.com/jhipster/generator-jhipster/pull/13258)
- 增量 Liquibase - [#12178](https://github.com/jhipster/generator-jhipster/issues/12178)

改進
- Angular 11 - [#13035](https://github.com/jhipster/generator-jhipster/pull/13035)
- 改進 Blueprint
- 改進 Webflux 
- Spring Boot 2.4 - [#13551](https://github.com/jhipster/generator-jhipster/pull/13551)
- 預設Java 11 - [#12021](https://github.com/jhipster/generator-jhipster/pull/12021)
- PostgreSQL作為預設資料庫 - [#11736](https://github.com/jhipster/generator-jhipster/issues/11736)
- IntegrationTest註解 - [#12460](https://github.com/jhipster/generator-jhipster/issues/12460)
- Annotation to detect generated files - [#12459](https://github.com/jhipster/generator-jhipster/issues/12459)
- 刪除system和anonymoususer使用者 - [#13043](https://github.com/jhipster/generator-jhipster/pull/13043)
- Docker-Compose v3 - [#12428](https://github.com/jhipster/generator-jhipster/issues/12428)
- Typescript 4 - [#12435](https://github.com/jhipster/generator-jhipster/pull/12435)
- Webpack5用於React和Vue - [#13615](https://github.com/jhipster/generator-jhipster/pull/13615)

重構內容
- JHipster函式庫，使用`tech.jhipster`作為套件名稱 - [#12854](https://github.com/jhipster/generator-jhipster/issues/12854)
- JHipster Core與generator-jhipster合併 - [#11694](https://github.com/jhipster/generator-jhipster/pull/11694)
- ng-jhipster與generator-jhipster合併 - [#12909](https://github.com/jhipster/generator-jhipster/issues/12909)

已移除內容
- 刪除Audit頁面 - [#12024](https://github.com/jhipster/generator-jhipster/pull/12024)
- 刪除Yarn 支援 - [#12134](https://github.com/jhipster/generator-jhipster/pull/12134)
- 刪除不推薦使用的JHipster Console（ELK） - [#12414](https://github.com/jhipster/generator-jhipster/pull/12414)
- 刪除UAA支援 - [#13081](https://github.com/jhipster/generator-jhipster/issues/13081)
- 刪除Traefik支援 - [#14233](https://github.com/jhipster/generator-jhipster/issues/14233)


關閉的工單與合併的請求
------------
一如既往, __[您可以在此處檢視所有已關閉的工單和合並請求](https://github.com/jhipster/generator-jhipster/issues?q=is%3Aclosed+milestone%3A7.0.0)__.

更新方法
------------

**自動升級**

在原有的專案上使用 [JHipster upgrade sub-generator]({{ site.url }}/upgrading-an-application/)自動更新：

首先，升級JHipster版本：

```
npm update -g generator-jhipster
```

然後執行upgrade子產生器：

```
jhipster upgrade
```

**手動升級**

同樣，需要先升級您的JHipster到最新版：

```
npm update -g generator-jhipster
```

對於已經存在的專案，它仍使用原來生成該專案時的JHipster版本。
要升級專案，必須首先刪除其`node_modules`資料夾，然後執行：

```
jhipster
```

您還可以透過執行以下指令來更新專案及其所有實體：

```
jhipster --with-entities
```

您還可以透過再次執行entity子產生器（jhipster entity）來逐一更新實體，例如，如果您的實體名為_Foo_，則執行：

```
jhipster entity Foo
```

**小提示**

要使用增量Liquibase更改日誌生成專案，應使用：

```
jhipster --incremental-changelog
```

要在Java類別中使用`@GeneratedByJHipster`註解生成專案，應使用：

```
jhipster --with-generated-flag
```


幫助和缺陷
--------------

如果您發現這個版本的任何問題, 請隨時聯絡我們：

- 送出Bug請到 [bug tracker](https://github.com/jhipster/generator-jhipster/issues?state=open)
- 送出問題請到 [Stack Overflow](http://stackoverflow.com/tags/jhipster/info)

如果您遇到的問題是緊急錯誤或安全問題，請：

- 在推特上聯系[@jhipster](https://twitter.com/jhipster)
