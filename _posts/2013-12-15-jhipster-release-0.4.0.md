---
layout: default
title: 發布 0.4.0
---

JHipster release 0.4.0
==================

*JHipster為您提供集Yeoman + Maven + Spring + AngularJS於一體的應用產生器.*

更新日誌
----------

- [Jerome Mirc](https://twitter.com/JeromeMirc)貢獻了HazelCast支援:
	- 分散式hibernate二級快取
	- HTTP會話集中化
- 全新的GZip filter (也是由[Jerome Mirc](https://twitter.com/JeromeMirc)提供!)
- 更新至Spring 4正式版
- 實體類別的子產生器現在處於BETA版本. 如果你想嘗試:
```
yo jhipster:entity foo
```
- 修復了一個在"prod"模式建立時會觸發的grunt-time缺陷


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
