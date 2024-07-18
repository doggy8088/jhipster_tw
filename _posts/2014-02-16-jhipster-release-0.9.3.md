---
layout: default
title: 發布 0.9.3
---

JHipster release 0.9.3
==================

*JHipster為您提供集Yeoman + Maven + Spring + AngularJS於一體的應用產生器.*

更新日誌
----------


修復了兩個JavaScript函式庫的問題:

* Angular-Translate 2.0.0, 在今天正式發行, 相容Bower但是有一個API變更, 詳情[#125](https://github.com/jhipster/generator-jhipster/issues/125)
* JQuery 2.1.0在前幾天更新了, 他們更改了目錄路徑. 看起來還不穩定, 我們將JQuery降級到2.0.3. 詳情[#124](https://github.com/jhipster/generator-jhipster/issues/124)

更新指引
------------

使用以下指令更新Jhipster:

```
npm update -g generator-jhipster
```

使用以下指令更新你的專案

```
yo jhipster
```

幫助和缺陷
--------------

如果您發現這個版本的任何問題, 請隨時聯絡我們:

- 在推特上聯系[@jhipster](https://twitter.com/jhipster)
- 在我們的[bug tracker](https://github.com/jhipster/generator-jhipster/issues?state=open)新增一個缺陷報告
- 在[Stack Overflow](http://stackoverflow.com/tags/jhipster/info)送出問題
