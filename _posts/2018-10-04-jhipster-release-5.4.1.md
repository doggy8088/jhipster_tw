---
layout: default
title: 發布 v5.4.1
---

JHipster release v5.4.1
==================

This patch release comes with 15 fixed issues and closed pull requests, including [3 bug bounties](https://github.com/jhipster/generator-jhipster/issues?q=milestone%3A5.4.1+is%3Aclosed+label%3A%24100) that were paid thanks to our [bug bounty program](https://www.jhipster.tech/bug-bounties/). If your company benefits from JHipster, wants great visibility in our community, or wants the ability to choose which tickets deserve bug bounties, please consider [sponsoring the project](https://www.jhipster.tech/sponsors/).

This fixes a few minor issues, including:

- JHipster 5.4.0 doesn't use correct userId type for relationships with OAuth 2.0 ([#8454](https://github.com/jhipster/generator-jhipster/issues/8454))
- One CVE on MySQL connector (and a couple of false positives when testing for CVEs) ([#8452](https://github.com/jhipster/generator-jhipster/pull/8452))

關閉的工單與合併請求
------------
一如既往, __[你可以在此處檢視所有已關閉的工單與已接受合併請求](https://github.com/jhipster/generator-jhipster/issues?q=milestone%3A5.4.1+is%3Aclosed)__.

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
