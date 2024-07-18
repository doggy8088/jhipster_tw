---
layout: default
title: 發布 v6.4.0
---

JHipster release v6.4.0
==================

This is a new minor release of JHipster v6 with [135 closed tickets and merged pull requests](https://github.com/jhipster/generator-jhipster/issues?q=milestone%3A6.4.0+is%3Aclosed).

Here are the most significant ones:

- Redis support - [#10057](https://github.com/jhipster/generator-jhipster/pull/10057)
- Migration to native apache Kafka client - [#10379](https://github.com/jhipster/generator-jhipster/pull/10379)
- Read only entity - [jhipster-core#370](https://github.com/jhipster/jhipster-core/pull/370) [#10561](https://github.com/jhipster/generator-jhipster/pull/10561) [#10562](https://github.com/jhipster/generator-jhipster/pull/10562) [#10563](https://github.com/jhipster/generator-jhipster/pull/10563)
- Use observables across Angular application - [#10383](https://github.com/jhipster/generator-jhipster/pull/10383)
- Some fixes for Sonar - [#10559](https://github.com/jhipster/generator-jhipster/pull/10559)
- Support inline content for JDL - [#10504](https://github.com/jhipster/generator-jhipster/pull/10504)
- Upgrade to Spring Boot 2.1.9 - [#10546](https://github.com/jhipster/generator-jhipster/pull/10546)
- Many libraries upgrades

關閉的工單與合併請求
------------
一如既往， __[您可以在此處檢視所有已關閉的工單和合並請求](https://github.com/jhipster/generator-jhipster/issues?q=milestone%3A6.4.0+is%3Aclosed)__.

更新方法
------------

**自動升級**

在原有的專案上使用 [JHipster upgrade sub-generator]({{ site.url }}/upgrading-an-application/)自動更新：

首先，升級JHipster版本：

```
npm update -g generator-jhipster
```

然後執行upgrade子產生器：

```
jhipster upgrade
```

**手動升級**

同樣，需要先升級您的JHipster到最新版：

```
npm update -g generator-jhipster
```

對於已經存在的專案，它仍使用原來生成該專案時的JHipster版本。
要升級專案，必須首先刪除其`node_modules`資料夾，然後執行：

```
jhipster
```

您還可以透過執行以下指令來更新專案及其所有實體：

```
jhipster --with-entities
```

您還可以透過再次執行entity子產生器（jhipster entity）來逐一更新實體，例如，如果您的實體名為_Foo_，則執行：

```
jhipster entity Foo
```

幫助和缺陷
--------------

如果您發現這個版本的任何問題, 請隨時聯絡我們：

- 送出Bug請到 [bug tracker](https://github.com/jhipster/generator-jhipster/issues?state=open)
- 送出問題請到 [Stack Overflow](http://stackoverflow.com/tags/jhipster/info)

如果您遇到的問題是緊急錯誤或安全問題，請：

- 在推特上聯系[@jhipster](https://twitter.com/jhipster)
