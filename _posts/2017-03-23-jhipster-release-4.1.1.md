---
layout: default
title: 發布 v4.1.1
---

JHipster release 4.1.1
==================

更新日誌
----------

This is the first patch release of JHipster 4.1.0.

- We have closed 32 issues and pull requests, but please note that **more than half** of the [closed tickets are marked invalid](https://github.com/jhipster/generator-jhipster/issues?q=is%3Aissue+milestone%3A4.1.1+is%3Aclosed). Please, follow our [guidelines](https://github.com/jhipster/generator-jhipster/blob/master/CONTRIBUTING.md) or we will close your tickets: invalid tickets make the whole team lose a lot of time, so if you want new patch releases and new cool features, you need to follow the project rules.
- With this release, the [JHipster upgrade sub-generator]({{ site.url }}/upgrading-an-application/) is working again! As this is a small patch release, this is the good moment for everyone to test it! If you have it working (or not!), don't hesitate to tweet it and mention [@jhipster](https://twitter.com/jhipster).
- The most important bug fix on this release is [#5458](https://github.com/jhipster/generator-jhipster/pull/5458), as this made errors in all applications using OAuth2. Concerning OAuth2, please note that only 0,46% of applications used this option during the last month: there have already been talks to remove this, as it has a big maintenance cost, for very few users. So if you like OAuth2, please help maintaining it!

關閉的工單與合併請求
------------
一如既往, __[你可以在此處檢視所有已關閉的工單與已接受合併請求](https://github.com/jhipster/generator-jhipster/issues?q=milestone%3A4.1.1+is%3Aclosed)__.

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
