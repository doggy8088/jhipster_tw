---
layout: default
title: 發布 v6.0.0
---

JHipster release v6.0.0
==================

This is the first official release of JHipster v6.

It builds upon our v6.0.0.beta.0 release, after one month of beta testing and [120 closed tickets and pull requests](https://github.com/jhipster/generator-jhipster/issues?q=milestone%3A6.0.0+is%3Aclosed).

Most important new features and upgrades
-------------

Those are the release notes from our previous beta release (v6.0.0.beta.0), updated for this stable release (v6.0.0).

- Migration to Spring Boot 2.1.x
- JDK 11 support (while keeping JDK 8+ compatibility)
- HTML 5 pushstate [#9098](https://github.com/jhipster/generator-jhipster/pull/9098)
- Kubernetes enhancements (Istio, Helm)
- Migration to Spring Cloud Greenwish.x
- Upgrade to Spring Security 5.1's OIDC Support
- Upgrade to JUnit 5
- FakerJS support to generate sample data for entities [#9104](https://github.com/jhipster/generator-jhipster/pull/9104)
- Update to latest Angular version [#8161](https://github.com/jhipster/generator-jhipster/pull/8161)
- Update to latest React version
- Lazy Loading of Angular entities
- Bootswatch theme selection
- Removed CSS Option [#9350](https://github.com/jhipster/generator-jhipster/pull/9350)
- Improvements in Sonar integration [#9423](https://github.com/jhipster/generator-jhipster/pull/9423) and [#9482](https://github.com/jhipster/generator-jhipster/pull/9482), including an externalized sonar-project.properties file.
- Gatling 3 support, including several improvements with better and faster incremental builds and BOM support.
- Integration tests are set up in their separate phase for Maven and Gradle
- Update to Gradle 5
- Migration to Liquibase 3.6.x
- Update Elastic to 6.4.x
- Update to Couchbase 6.x
- Update to Infinispan 9.4.x
- Update to Cassandra 4.x
- Update to Hazelcast 3.11.x
- Logging to the console in json format
- Changing the default packaging to Jar while still being able to produce a War [#9034](https://github.com/jhipster/generator-jhipster/pull/9034)
- Prettier for formatting YAML [#9281](https://github.com/jhipster/generator-jhipster/pull/9281)
- Prettier transform to prettify the output from all sub-generators [#9371](https://github.com/jhipster/generator-jhipster/pull/9371)

We also removed a few features:

- Removed deprecated 'rancher-compose' sub-generator
- Removed Chocolatey and Homebrew installations, as we found out they didn't provide much benefits to users
- Deprecated the [JHipster Devbox](https://github.com/jhipster/jhipster-devbox) for the moment: we are looking for a maintainer, if you are interested please ping us!

關閉的工單與合併請求
------------
一如既往， __[您可以在此處檢視所有已關閉的工單和合並請求](https://github.com/jhipster/generator-jhipster/issues?q=milestone%3A6.0.0+is%3Aclosed)__.

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

幫助和缺陷
--------------

如果您發現這個版本的任何問題, 請隨時聯絡我們：

- 送出Bug請到 [bug tracker](https://github.com/jhipster/generator-jhipster/issues?state=open)
- 送出問題請到 [Stack Overflow](http://stackoverflow.com/tags/jhipster/info)

如果您遇到的問題是緊急錯誤或安全問題，請：

- 在推特上聯系[@jhipster](https://twitter.com/jhipster)
