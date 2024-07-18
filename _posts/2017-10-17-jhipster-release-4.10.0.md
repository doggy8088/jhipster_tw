---
layout: default
title: 發布 v4.10.0
---

JHipster release 4.10.0
==================

更新日誌
----------

- OpenID Connect support is now ready! This means you can now secure your JHipster application using an OpenID Connect provider such as [Keycloak](http://www.keycloak.org/) or [Okta](https://www.okta.com). This also includes microservices security, using a Zuul proxy (in a JHipster gateway) or using Feign (to connect microservices together). This replaces our older OAuth2 support, as announced in our previous release. This is a huge work, so please be careful when using this first release. For more information, see [#6432](https://github.com/jhipster/generator-jhipster/issues/6432), [#6435](https://github.com/jhipster/generator-jhipster/pull/6435) and [#6519](https://github.com/jhipster/generator-jhipster/issues/6519).
- As the entity sub-generator goes too far for some simple use-cases, we have a new [Spring MVC REST controller sub-generator]({{ site.url }}/creating-a-spring-controller/). For consistency reasons, we also renamed our "Service sub-generator" to become the [Spring service sub-generator]({{ site.url }}/creating-a-spring-service/). Please note that we focus on the Spring Boot generators, as on the client-side you can use [Angular CLI](https://github.com/angular/angular-cli) with JHipster. For more information, see [#6451](https://github.com/jhipster/generator-jhipster/pull/6451).
- After project generation, if Git is installed, the generator now automatically initializes a Git repository and commits the generated application. See [#6453](https://github.com/jhipster/generator-jhipster/issues/6453).
- Our recent support for [Zalando problem-spring-web](https://github.com/zalando/problem-spring-web) had been greatly improved, for example with [#6404](https://github.com/jhipster/generator-jhipster/issues/6404) and [#6411](https://github.com/jhipster/generator-jhipster/pull/6411).

Roadmap
----------

Two important new features are planned for our next `4.11.0` release:

- [Couchbase support](https://github.com/jhipster/generator-jhipster/issues/6086).
- [Use jhipster-dependencies BOM](https://github.com/jhipster/generator-jhipster/pull/6509), that should greatly simplifies future application upgrades.

關閉的工單與合併請求
------------
一如既往, __[你可以在此處檢視所有已關閉的工單與已接受合併請求](https://github.com/jhipster/generator-jhipster/issues?q=milestone%3A4.10.0+is%3Aclosed)__.

更新指引
------------

**自動升級**

在已存在的專案上使用[JHipster upgrade sub-generator]({{ site.url }}/upgrading-an-application/)自動升級:

升級Jhipster版本:

```
yarn global upgrade generator-jhipster
```

然後升級子產生器:

```
jhipster upgrade
```

**手動升級**

選擇手動升級, 需要先升級你的Jhipster版本:

```
yarn global upgrade generator-jhipster
```

如果你已經有了一個專案, 將會繼續使用當時專案生成的Jhipster版本.
如果需要升級你的專案, 你需要先刪除`node_modules`資料夾再執行:

```
jhipster
```

更新你的專案和所有的實體類

```
jhipster --with-entities
```

你也可以使用實體類子產生器挨個更新你的實體類, 例如你的實體類別名稱字是_Foo_

```
jhipster entity Foo
```

幫助和缺陷
--------------

如果您發現這個版本的任何問題, 請隨時聯絡我們:

- 在我們的[bug tracker](https://github.com/jhipster/generator-jhipster/issues?state=open)新增一個缺陷報告
- 在[Stack Overflow](http://stackoverflow.com/tags/jhipster/info)送出問題

如果您遇到的問題是緊急錯誤或安全問題，請：

- 在推特上聯系[@jhipster](https://twitter.com/jhipster)
