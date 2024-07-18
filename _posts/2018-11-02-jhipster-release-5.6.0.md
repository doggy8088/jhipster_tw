---
layout: default
title: 發布 v5.6.0
---

JHipster release v5.6.0
==================

This minor release comes with 132 closed tickets and pull requests, here are the most important ones:

- Upgrade to Typescript 3 in [#8149](https://github.com/jhipster/generator-jhipster/issues/8149)
- Upgrade to Angular 7 in [#8161](https://github.com/jhipster/generator-jhipster/pull/8161)
- All dates managed with Hibernate are now using UTC in [#8501](https://github.com/jhipster/generator-jhipster/pull/8501)
- Many dependencies upgrades and clean-ups, including Spring Boot 2.0.6 in [#8591](https://github.com/jhipster/generator-jhipster/pull/8591) and Node 10 in [#8682](https://github.com/jhipster/generator-jhipster/issues/)
- Many improvements for Google App Engine in [#8616](https://github.com/jhipster/generator-jhipster/pull/8616)

關閉的工單與合併請求
------------
一如既往, __[你可以在此處檢視所有已關閉的工單與已接受合併請求](https://github.com/jhipster/generator-jhipster/issues?q=milestone%3A5.6.0+is%3Aclosed)__.

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
