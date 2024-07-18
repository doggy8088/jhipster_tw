---
layout: default
title: 發布 v3.2.1
---

JHipster release 3.2.1
==================

更新日誌
----------

This is a bug-fix version for JHipster v3.2.0, with a couple of cool new features.

Important bug fixes:

- Error with languages with 5-letter codes [#3554](https://github.com/jhipster/generator-jhipster/issues/3554)
- findByUserIsCurrentUser() not working with JWT [#3560](https://github.com/jhipster/generator-jhipster/issues/3560)

Cool new features:

- We have a brand new [JHipster DevBox](https://github.com/jhipster/jhipster-devbox). It is based on the latest Ubuntu Xenial release, uses XUbuntu, and has many improved applications.
- There should now be a notification when a new version is released [#3562](https://github.com/jhipster/generator-jhipster/pull/3562). Of course, this couldn't have been tested for real, so let's wait for the next version to see if it works :-)

Closed tickets
------------
一如既往, __[you can check all closed tickets here](https://github.com/jhipster/generator-jhipster/issues?q=milestone%3A3.2.1+is%3Aclosed)__.

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
