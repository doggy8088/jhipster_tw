---
layout: default
title: 發布 v4.5.5
---

JHipster release 4.5.5
==================

更新日誌
----------

This is the fifth patch release for JHipster v4.5.0.

This release corrects a security issue in the JHipster Registry (see [jhipster/jhipster-registry #150](https://github.com/jhipster/jhipster-registry/issues/150)), and is a recommended upgrade for people using it.

Other noteworthy changes several updates in our Angular 4 code, as we move forward to release it out of beta - see [#5907](https://github.com/jhipster/generator-jhipster/pull/5907) [#5926](https://github.com/jhipster/generator-jhipster/pull/5926) [#5932](https://github.com/jhipster/generator-jhipster/pull/5932).

關閉的工單與合併請求
------------
一如既往, __[你可以在此處檢視所有已關閉的工單與已接受合併請求](https://github.com/jhipster/generator-jhipster/issues?q=milestone%3A4.5.5+is%3Aclosed)__.

更新指引
------------

**自動升級**

WARNING we have many reports that automatic upgrade do not work well, see [#5883](https://github.com/jhipster/generator-jhipster/issues/5883). This depends on your specific configuration, so if you have trouble with this:

- You can still do a "manual upgrade" (see below)
- If you find anything helpful for us, please send us comments on ticket [#5883](https://github.com/jhipster/generator-jhipster/issues/5883)
- If you have time and want to help, don't hesitate to contribute on this part!

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
