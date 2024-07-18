---
layout: default
title: 發布 v4.13.3
---

JHipster release 4.13.3
==================

更新日誌
----------

This patch release has several important fixes and changes:

- HTTP Session Clustering with Hazelcast has been removed ([#6944](https://github.com/jhipster/generator-jhipster/pull/6944)). JHipster now has far better Spring Cache abstraction support, which is a much better solution for everyone. This also lowers the maintenance burden for the core team, for an option which was very rarely used.
- E-mails can now be used as usernames ([#6923](https://github.com/jhipster/generator-jhipster/issues/6923)), as it prevented both Keycloak and Okta to work properly. So you can now login both with your username or your e-mail address - but as your username can also be an e-mail address, we understand this can be confusing, and are currently considering if we should remove the usernames completely, and only use e-mail addresses to login.
- workbox-webpack-plugin was causing the front-end build to fail, and is corrected with [#6950](https://github.com/jhipster/generator-jhipster/pull/6950)
- The `prod` profile now works correctly with microservices, see [#6947](https://github.com/jhipster/generator-jhipster/issues/6947)
- It looks like Oracle changed its JDBC driver names, and this is corrected in [#6952](https://github.com/jhipster/generator-jhipster/issues/6952)
- Support for "includes()" functions with Internet Explorer has been added in [#6953](https://github.com/jhipster/generator-jhipster/issues/6953)

關閉的工單與合併請求
------------
一如既往, __[你可以在此處檢視所有已關閉的工單與已接受合併請求](https://github.com/jhipster/generator-jhipster/issues?q=milestone%3A4.13.3+is%3Aclosed)__.

更新指引
------------

**自動升級**

在已存在的專案上使用[JHipster upgrade sub-generator]({{ site.url }}/upgrading-an-application/)自動升級:

升級Jhipster版本:

```
yarn global upgrade generator-jhipster
```

然後升級子產生器:

```
jhipster upgrade
```

**手動升級**

選擇手動升級, 需要先升級你的Jhipster版本:

```
yarn global upgrade generator-jhipster
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
