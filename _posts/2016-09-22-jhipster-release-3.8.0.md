---
layout: default
title: 發布 v3.8.0
---

JHipster release 3.8.0
==================

更新日誌
----------

This is a bug-fixing release, that comes with major new features like Kafka support (in BETA).

- Support for Kafka in [#4129](https://github.com/jhipster/generator-jhipster/issues/4129). Full documentation is available on this site in the new [Using Kafka page]({{ site.url }}/using-kafka/)
- Support for the Spring Boot remote shell - see [#4167](https://github.com/jhipster/generator-jhipster/issues/4167)
- Many Sonar issues have been corrected, which will improve the overall quality of the generated code
- Better support for Heroku - see [#4187](https://github.com/jhipster/generator-jhipster/pull/4187)
- Migration to Spring Boot 1.4.1 - see [#4185](https://github.com/jhipster/generator-jhipster/pull/4185)
- Migration to Gradle 3.1 - see [#4168](https://github.com/jhipster/generator-jhipster/pull/4168)

Closed tickets
------------
一如既往, __[you can check all closed tickets here](https://github.com/jhipster/generator-jhipster/issues?q=milestone%3A3.8.0+is%3Aclosed)__.

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
