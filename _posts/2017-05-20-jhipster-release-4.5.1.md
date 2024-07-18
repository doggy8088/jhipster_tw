---
layout: default
title: 發布 v4.5.1
---

JHipster release 4.5.1
==================

更新日誌
----------

This is a bug-fix release for our recently-released v4.5.0 version, which had a very annoying [bug](https://github.com/jhipster/generator-jhipster/issues/5797).

Unfortunately, the only way for us to validate that everything is fine is to do a release, so if you have any issue when running `jhipster`, please:

- Check our [Twitter account @jhipster](https://twitter.com/jhipster) and notify us if necessary
- Use our [GitHub issue tracker](https://github.com/jhipster/generator-jhipster/issues) to track the problem

關閉的工單與合併請求
------------
一如既往, __[你可以在此處檢視所有已關閉的工單與已接受合併請求](https://github.com/jhipster/generator-jhipster/issues?q=milestone%3A4.5.1+is%3Aclosed)__.

更新指引
------------

**自動升級**

在已存在的專案上使用[JHipster upgrade sub-generator]({{ site.url }}/upgrading-an-application/)自動升級:

```
yo jhipster:upgrade
```

Please note that with our new JHipster CLI release, the new command will be:

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
