---
layout: default
title: 發布 v3.9.0
---

JHipster release 3.9.0
==================

更新日誌
----------

Lots of new exciting features in this release, as well as the usual bug fixes. Here are the most important ones:

- The "upgrade" sub-generator had issues since Git v2.9.0. You will probably need this when upgrading to this new JHipster release! See [#4253](https://github.com/jhipster/generator-jhipster/pull/4253)
- Consul support is now available for microservices architecture. This gives a second option, in replacement from the JHipster Registry (which is based on Eureka). See [#4143](https://github.com/jhipster/generator-jhipster/issues/4143) [#4165](https://github.com/jhipster/generator-jhipster/pull/4165)
- The Docker-Compose sub-generator can now work on monoliths (and not just gateways/microservices): [#4267](https://github.com/jhipster/generator-jhipster/pull/4267)
- New "IDE" Maven profile, to better configure IDEs when using DTOs with MapStruct: [#4118](https://github.com/jhipster/generator-jhipster/pull/4118)
- Continuous compilation with the Scala Maven Plugin. This isn't fully documented yet, as we are still testing some corner cases. This allows to have the application built automatically from the command line, which is really awesome when used with the Spring Boot devtools and BrowserSync: [#4204](https://github.com/jhipster/generator-jhipster/pull/4204)
- The generated README file is now much better, and points to the specific JHipster version that was used to generate the project, in our archived documentation. See [#4236](https://github.com/jhipster/generator-jhipster/pull/4236)
- Upgrade to the latest SpringFox version: [#4279](https://github.com/jhipster/generator-jhipster/pull/4279)
- Upgrade to the latest Spring Cloud Stream "Brooklyn" release, which allows to use the latest Kafka API version.
- Elasticsearch support in Kubernetes: [#4269](https://github.com/jhipster/generator-jhipster/pull/4269)

Closed tickets
------------
一如既往, __[you can check all closed tickets here](https://github.com/jhipster/generator-jhipster/issues?q=milestone%3A3.9.0+is%3Aclosed)__.

更新指引
------------

For an automatic upgrade, starting with JHipster v3.4.0, use the [JHipster upgrade sub-generator]({{ site.url }}/upgrading-an-application/) on an existing application:

```
yo jhipster:upgrade
```

選擇手動升級, 需要先升級你的Jhipster版本:

```
npm update -g generator-jhipster
```

如果你已經有了一個專案, 將會繼續使用當時專案生成的Jhipster版本.
如果需要升級你的專案, 你需要先刪除`node_modules`資料夾再執行:

```
yo jhipster
```

更新你的專案和所有的實體類

```
yo jhipster --with-entities
```

你也可以使用實體類子產生器挨個更新你的實體類, 例如你的實體類別名稱字是_Foo_

```
yo jhipster:entity Foo
```

幫助和缺陷
--------------

如果您發現這個版本的任何問題, 請隨時聯絡我們:

- 在我們的[bug tracker](https://github.com/jhipster/generator-jhipster/issues?state=open)新增一個缺陷報告
- 在[Stack Overflow](http://stackoverflow.com/tags/jhipster/info)送出問題

如果您遇到的問題是緊急錯誤或安全問題，請：

- 在推特上聯系[@jhipster](https://twitter.com/jhipster)
