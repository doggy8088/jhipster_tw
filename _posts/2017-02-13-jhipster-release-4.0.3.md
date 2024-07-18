---
layout: default
title: 發布 v4.0.3
---

JHipster release 4.0.3
==================

更新日誌
----------

This is the third patch release for JHipster 4.0.0, with 52 bug fixes and tickets closed.

One big improvement is that you are now able to use the [JHipster Registry]({{ site.url }}/jhipster-registry/) with a monolith application, in order to use a distributed Hazelcast cache. You can find more information about this on our ["Using a cache" documentation]({{ site.url }}/using-cache/).

We have also greatly improved our documentation, so you should find more easily help on common problems, like running `yarn start` to have your client-side development server running.

關閉的工單與合併請求
------------
一如既往, __[你可以在此處檢視所有已關閉的工單與已接受合併請求](https://github.com/jhipster/generator-jhipster/issues?q=milestone%3A4.0.3+is%3Aclosed)__.

更新指引
------------

**手動升級 (works for JHipster 4.x applications)**

選擇手動升級, 需要先升級你的Jhipster版本:

```
yarn global upgrade generator-jhipster
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

**自動升級 only works for JHipster 3.x applications**

在已存在的專案上使用[JHipster upgrade sub-generator]({{ site.url }}/upgrading-an-application/)自動升級:

```
yo jhipster:upgrade
```

幫助和缺陷
--------------

如果您發現這個版本的任何問題, 請隨時聯絡我們:

- 在我們的[bug tracker](https://github.com/jhipster/generator-jhipster/issues?state=open)新增一個缺陷報告
- 在[Stack Overflow](http://stackoverflow.com/tags/jhipster/info)送出問題

如果您遇到的問題是緊急錯誤或安全問題，請：

- 在推特上聯系[@jhipster](https://twitter.com/jhipster)
