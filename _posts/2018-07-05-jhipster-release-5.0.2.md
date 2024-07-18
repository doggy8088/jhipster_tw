---
layout: default
title: 發布 v5.0.2
---

JHipster release v5.0.2
==================

This is the second patch release of JHipster 5.

It includes [81 closed tickets and pull requests](https://github.com/jhipster/generator-jhipster/issues?q=milestone%3A5.0.2+is%3Aclosed), here are the most important ones:

- Blueprint support has been greatly enhanced, and most importantly documented on the new ["Creating a blueprint" page]({{ site.url }}/modules/creating-a-blueprint/).
- Lazy-loading is now working in React thanks to [#7541](https://github.com/jhipster/generator-jhipster/pull/7541).
- Upgrades to the latest [JHipster dependencies](https://github.com/jhipster/jhipster) (including upgrades to several Java libraries in [jhipster/jhipster#80](https://github.com/jhipster/jhipster/pull/80)), to the latest [ng-jhipster](https://github.com/jhipster/generator-jhipster/pull/7920), and to Node and NPM in [#7922](https://github.com/jhipster/generator-jhipster/pull/7922).

If you are using JHipster in development mode (to [contribute to the project](https://github.com/jhipster/generator-jhipster/blob/master/CONTRIBUTING.md)) please note that `yarn link` is currently [broken](https://github.com/jhipster/generator-jhipster/issues/7919). This is an issue with Yarn 1.6.0 and 17.0 (at least!), and it is currently solved if you use the Yarn nightly builds - we hope the Yarn team will do a release soon!

關閉的工單與合併請求
------------
一如既往, __[你可以在此處檢視所有已關閉的工單與已接受合併請求](https://github.com/jhipster/generator-jhipster/issues?q=milestone%3A5.0.2+is%3Aclosed)__.

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
