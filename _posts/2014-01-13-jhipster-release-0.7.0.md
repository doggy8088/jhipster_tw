---
layout: default
title: 發布 0.7.0
---

JHipster release 0.7.0
==================

*JHipster為您提供集Yeoman + Maven + Spring + AngularJS於一體的應用產生器.*

更新日誌
----------

- JHipster現已支援Websocket, 可以支撐"實時Web應用", 感謝這個優秀的[Atmosphere framework](http://async-io.org/). 仔細調研Atmosphere和新的Spring Websocket支援之後, 我們發現Atmosphere更符合我們的需求. 當然, 如果你們不同意, 我們也可以在Yeoman產生器新增一個選項來支援Spring Websocket.
- 更新了一個可用的[Docker](https://www.docker.io/)設定, 我們在這裡[updated installation page](/installation/)更新了詳細的文件.
- 更新了所有Maven/NPM/Bower依賴, 讓你生成的應用處於技術前沿!

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
