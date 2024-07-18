---
layout: default
title: 發布 v4.13.1
---

JHipster release 4.13.1
==================

更新日誌
----------

This is an emergency patch release to fix the [broken 'prod' profile build](https://github.com/jhipster/generator-jhipster/issues/6910) using Angular.

Please note that:

- This bug also affects both Angular ([here is the ticket](https://github.com/angular/angular/issues/21173)) and Angular CLI ([here is the ticket](https://github.com/angular/angular-cli/issues/8997)). So JHipster users are lucky as we solved this quicker than both Angular and Angular CLI, and provide the only working Angular "prod" build at the moment :-)
- This bug comes from uglify-es, which is a transitive dependency pulled by uglifyjs-webpack-plugin. This is why our [Policy 4](https://www.jhipster.tech/policies/) is to fix dependencies, but we can't force our dependencies to do the same. Of course we did a [Pull Request to the uglifyjs-webpack-plugin project](https://github.com/webpack-contrib/uglifyjs-webpack-plugin/pull/199) to solve this on their side, but they haven't merged it yet.

Many thanks to [@pascalgrimaud](https://twitter.com/pascalgrimaud) who found the bug, and corrected it!

關閉的工單與合併請求
------------
一如既往, __[你可以在此處檢視所有已關閉的工單與已接受合併請求](https://github.com/jhipster/generator-jhipster/issues?q=milestone%3A4.13.1+is%3Aclosed)__.

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
