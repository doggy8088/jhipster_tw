---
layout: default
title: 發布 v3.3.0
---

JHipster release 3.3.0
==================

更新日誌
----------

This version is a library upgrade, as Spring Cloud Brixton is now officially stable. We have also upgraded to the latest Spring Boot and Spring Security versions.

Important changes and bug fixes:

- A new JHipster Registry (v2.1.0) has been released, and adds a new dashboard when you open up the application.
- MongoDB deployment was buggy, as there was an error in the Mongobee configuration [#3582](https://github.com/jhipster/generator-jhipster/issues/3582)
- Spring Data Cassandra support has been removed, so we use directly the DataStax Driver. This has allowed us to upgrade the Driver to a more recent version, and be ready for Cassandra 3.0 [#3570](https://github.com/jhipster/generator-jhipster/pull/3570)
- The mail health check is now disabled by default, as it was causing issues with the Registry and Cassandra [#3579](https://github.com/jhipster/generator-jhipster/issues/3579)

Closed tickets
------------
一如既往, __[you can check all closed tickets here](https://github.com/jhipster/generator-jhipster/issues?q=milestone%3A3.3.0+is%3Aclosed)__.

更新指引
------------

使用以下指令更新Jhipster:

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
