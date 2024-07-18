---
layout: default
title: 發布 v4.6.0
---

JHipster release 4.6.0
==================

更新日誌
----------

**Angular 4 is now out of beta**

Our Angular 4 support is now ready for production:

- Our production build works fine, both on the client-side (AOT, tree shaking, etc.) and on the server-side (caching, gzipping, etc.). Our tests show huge improvements compared to our previous BETA releases (which were not suitable for production, that's why they were marked BETA). As a result, this new version is a recommended upgrade for anyone already using Angular 2 or Angular 4 with JHipster.
- Angular 4 is now our default option for JHipster. AngularJS 1 won't disappear soon, but we are not going to improve it in the future, and it will probably slowly die over the next months.
- Our goal is to support React in the future, and we will focus our development effort on this new option. At some point in the future, this means we should have both Angular and React as stable options. Help is highly welcome on that part, so if you are interested, don't hesitate to join the team on GitHub.

**Other important news**

- Upgrade to Gradle 4 (see [#5949](https://github.com/jhipster/generator-jhipster/pull/5949)), which has some excellent performance improvements according to our initial tests.
- Farsi language support (see [#5961](https://github.com/jhipster/generator-jhipster/pull/5961)), which means we do support right-to-left languages!

**Minor improvements**

In total, this release has 72 closed tickets and pull requests, out of which 11 were marked `invalid`. This is an improvement over the past releases, but please if you have a question or a bug, don't spam the development team and follow [our guidelines](https://github.com/jhipster/generator-jhipster/blob/master/CONTRIBUTING.md).

**Deprecation warning (for module developers)**

The JHipster Module sub generator is deprecated. We now recommend using commonJS or ES6 require/import to get `generator-base` in order to use our Public API. See [creating a module]({{ site.url }}/modules/creating-a-module/) page for more details.

關閉的工單與合併請求
------------
一如既往, __[你可以在此處檢視所有已關閉的工單與已接受合併請求](https://github.com/jhipster/generator-jhipster/issues?q=milestone%3A4.6.0+is%3Aclosed)__.

更新指引
------------

**自動升級**

WARNING [this has been fixed very recently](https://github.com/jhipster/generator-jhipster/pull/5966), so if you have trouble with this:

- You can still do a "manual upgrade" (see below)
- If you find anything helpful for us, please send us comments on ticket [#5883](https://github.com/jhipster/generator-jhipster/issues/5883)
- If you have time and want to help, don't hesitate to contribute on this part!

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
