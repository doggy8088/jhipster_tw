---
layout: default
title: 發布 v5.8.0
---

JHipster release v5.8.0
==================

This new minor release has [133 closed tickets and merged pull requests](https://github.com/jhipster/generator-jhipster/issues?q=milestone%3A5.8.0+is%3Aclosed).

Here are the most significant ones:

- Switch to Micrometer - [#8812](https://github.com/jhipster/generator-jhipster/pull/8812)
- Angular: Lazy load entities - [#8925](https://github.com/jhipster/generator-jhipster/pull/8925)
- Support JPA derived identifiers for one-to-one - [#8685](https://github.com/jhipster/generator-jhipster/pull/8685)
- Add global logout for OIDC authentication - [#8757](https://github.com/jhipster/generator-jhipster/pull/8757)
- Many libraries upgrades, including an upgrade to Spring Boot 2.0.8.RELEASE

After this release, we will focus on JHipster 6, so JHipster 5 will go into maintenance mode. We should announce beta releases of JHipster 6 shortly.


關閉的工單與合併請求
------------
一如既往, __[你可以在此處檢視所有已關閉的工單與已接受合併請求](https://github.com/jhipster/generator-jhipster/issues?q=milestone%3A5.8.0+is%3Aclosed)__.

更新指引
------------

**自動升級**

在已存在的專案上使用[JHipster upgrade sub-generator]({{ site.url }}/upgrading-an-application/)自動升級:

升級Jhipster版本:

```
npm update -g generator-jhipster
```

然後升級子產生器:

```
jhipster upgrade
```

**手動升級**

選擇手動升級, 需要先升級你的Jhipster版本:

```
npm update -g generator-jhipster
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
