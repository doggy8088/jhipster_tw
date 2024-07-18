---
layout: default
title: 發布 v4.1.0
---

JHipster release 4.1.0
==================

更新日誌
----------

This is a minor release, as we migrated to Yeoman 1.0 (see [#5331](https://github.com/jhipster/generator-jhipster/pull/5331)). This means we had to refactor a lot of code, including all the sub-generators. If you are using modules from [our marketplace]({{ site.url }}/modules/marketplace), they *should* work, but we recommend that all module authors check their code with this new version.

The JHipster Registry reached release v2.6.0, with a new Spring Cloud version, and more aggressive Eureka timeouts, which should be better for normal use cases (if you have hundreds or thousands of microservices, you might consider raising those numbers again). In our roadmap, we expect to have new major release of the JHipster Registry, which should be able to monitor all monoliths, gateways and microservices in one single place.

We also closed 51 issues and pull requests (see the list below), and upgraded many dependencies.

關閉的工單與合併請求
------------
一如既往, __[你可以在此處檢視所有已關閉的工單與已接受合併請求](https://github.com/jhipster/generator-jhipster/issues?q=milestone%3A4.1.0+is%3Aclosed)__.

更新指引
------------

**手動升級 (works for JHipster 4.x applications)**

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

**自動升級 only works for JHipster 3.x applications**

在已存在的專案上使用[JHipster upgrade sub-generator]({{ site.url }}/upgrading-an-application/)自動升級:

```
yo jhipster:upgrade
```

幫助和缺陷
--------------

如果您發現這個版本的任何問題, 請隨時聯絡我們:

- 在我們的[bug tracker](https://github.com/jhipster/generator-jhipster/issues?state=open)新增一個缺陷報告
- 在[Stack Overflow](http://stackoverflow.com/tags/jhipster/info)送出問題

如果您遇到的問題是緊急錯誤或安全問題，請：

- 在推特上聯系[@jhipster](https://twitter.com/jhipster)
