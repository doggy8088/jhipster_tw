---
layout: default
title: 發布 v6.10.0
---

JHipster release v6.10.0
==================

This is the new minor release, with [142 closed tickets and merged pull requests](https://github.com/jhipster/generator-jhipster/issues?q=milestone%3A6.10.0+is%3Aclosed).

Here are the most significant ones:

- Upgrade to Angular 10 - [#11998](https://github.com/jhipster/generator-jhipster/pull/11998)
- Microservice support for GAE sub-generator - [#11969](https://github.com/jhipster/generator-jhipster/pull/11969)
- Support Okta as OIDC provider when deploying to Heroku - [#11715](https://github.com/jhipster/generator-jhipster/pull/11715)
- Provide Memcached and Redis support for Heroku [#11712](https://github.com/jhipster/generator-jhipster/pull/11712)
- Many libraries upgrades
- Many bug fixes

關閉的工單與合併請求
------------
一如既往， __[您可以在此處檢視所有已關閉的工單和合並請求](https://github.com/jhipster/generator-jhipster/issues?q=milestone%3A6.10.0+is%3Aclosed)__.

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

**小提示**

To generate your project with all Java classes already formatted using [prettier-java](https://github.com/jhipster/prettier-java), you should use:

```
jhipster --prettier-java
```

幫助和缺陷
--------------

如果您發現這個版本的任何問題, 請隨時聯絡我們：

- 送出Bug請到 [bug tracker](https://github.com/jhipster/generator-jhipster/issues?state=open)
- 送出問題請到 [Stack Overflow](http://stackoverflow.com/tags/jhipster/info)

如果您遇到的問題是緊急錯誤或安全問題，請：

- 在推特上聯系[@jhipster](https://twitter.com/jhipster)
