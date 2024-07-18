---
layout: default
title: 發布 v3.5.0
---

JHipster release 3.5.0
==================

更新日誌
----------

110 issues and PRs have been closed in this release, the most important being:

- Several libraries upgrade: Gradle [#3849](https://github.com/jhipster/generator-jhipster/pull/3849), Spring Cloud [#3836](https://github.com/jhipster/generator-jhipster/pull/3836), the Maven Docker plugin [#3801](https://github.com/jhipster/generator-jhipster/pull/3801)
- As a result of those upgrades, [JHipster Registry](https://github.com/jhipster/jhipster-registry) v2.3.0 has been released, and the generator now uses this new version
- The JDL import sub-generator is back! [#3532](https://github.com/jhipster/generator-jhipster/issues/3532)
- Upgrade sub-generator doesn't commit on jhipster_upgrade branch from second upgrade [#3757](https://github.com/jhipster/generator-jhipster/issues/3757)
- A new "swagger" profile to use both in dev and prod modes [#3402](https://github.com/jhipster/generator-jhipster/issues/3402)
- JSON pretty print in dev mode [#3830](https://github.com/jhipster/generator-jhipster/issues/3830)
- Better SpringFox configuration for pagination parameters [#3844](https://github.com/jhipster/generator-jhipster/pull/3844)

Closed tickets
------------
一如既往, __[you can check all closed tickets here](https://github.com/jhipster/generator-jhipster/issues?q=milestone%3A3.5.0+is%3Aclosed)__.

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
