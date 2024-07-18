---
layout: default
title: 發布 v4.4.0
---

JHipster release 4.4.0
==================

JHipster Registry 3.0
----------

The [JHipster Registry]({{ site.url }}/jhipster-registry/) has reached version 3.0! It is a major release, that adds dashboards to the Registry: it is now able to monitor all application types (monoliths, gateways, microservices) in one central location.

As a result, the [JHipster Registry has a new documentation page]({{ site.url }}/jhipster-registry/), which is now part of new section dedicated to microservices on this website. Please check this out, there is a lot of new stuff here!

This new JHipster Registry has been possible thanks to the great work of [Julien Margarido](https://github.com/JulienMrgrd), our new trainee working on JHipster, congratulations to him!

Other important news and updates
----------

This new releases comes with 135 closed tickets and pull requests! Here are the most important news:

- Several library updates, including an upgrade to Spring Cloud Dalston
- Lots of code clean up and new unit tests (our sample application now has 91,1% code coverage!)
- The JHipster gateway API now supports rate limiting using Bucket4j instead of Cassandra, which gives much better quality and performance, see [#5388](https://github.com/jhipster/generator-jhipster/issues/5388) and the new [API gateway documentation]({{ site.url }}/api-gateway/). This rate limiting system can still scale across several gateway instances, using our distributed caching support with Hazelcast, which works thanks to the JHipster Registry!
- Much improved Zuul and Eureka settings, giving a huge performance increase, more quality and stability, than when using the standard Spring Cloud settings
- Support for JSR310's Instant type, see [#5684](https://github.com/jhipster/generator-jhipster/pull/5684)

關閉的工單與合併請求
------------
一如既往, __[你可以在此處檢視所有已關閉的工單與已接受合併請求](https://github.com/jhipster/generator-jhipster/issues?q=milestone%3A4.4.0+is%3Aclosed)__.

更新指引
------------

**自動升級**

在已存在的專案上使用[JHipster upgrade sub-generator]({{ site.url }}/upgrading-an-application/)自動升級:

```
yo jhipster:upgrade
```

**手動升級**

選擇手動升級, 需要先升級你的Jhipster版本:

```
yarn global upgrade generator-jhipster
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
