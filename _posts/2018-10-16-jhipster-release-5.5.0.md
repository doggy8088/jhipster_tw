---
layout: default
title: 發布 v5.5.0
---

JHipster release v5.5.0
==================

This minor release comes with 84 fixed issues and closed pull requests.

The most important one, as everybody doing front-end work will experience it, is our new "pacman" loader (you need to see it to understand!). Many thanks to [@sabrinapayet](https://github.com/sabrinapayet) who did [#8558](https://github.com/jhipster/generator-jhipster/pull/8558), that's a [bug bounty](https://www.jhipster.tech/bug-bounties/) which is well-deserved!

Here are the other important closed tickets and pull requests:

- Fix compilation & test issue with MongoDB relationships in [#8511](https://github.com/jhipster/generator-jhipster/pull/8511).
- Cloud Foundry sub-generator does not work: no suitable cloud connector found in [#8518](https://github.com/jhipster/generator-jhipster/issues/8518).
- Docker-Compose: limit memory to 512m in [#8539](https://github.com/jhipster/generator-jhipster/pull/8539).
- Generate correct Feign configuration for JWT gateways in [#8542](https://github.com/jhipster/generator-jhipster/pull/8542).
- Gatling with OAuth2 and Keycloak in [#8552](https://github.com/jhipster/generator-jhipster/issues/8552).
- Clean up and document ports in [#8580](https://github.com/jhipster/generator-jhipster/issues/8580).
- Application shouldn't write log to file in [#8582](https://github.com/jhipster/generator-jhipster/issues/8582).
- Updated Google App Engine Generator for latest JHipster in [#8583](https://github.com/jhipster/generator-jhipster/pull/8583).

關閉的工單與合併請求
------------
一如既往, __[你可以在此處檢視所有已關閉的工單與已接受合併請求](https://github.com/jhipster/generator-jhipster/issues?q=milestone%3A5.5.0+is%3Aclosed)__.

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
