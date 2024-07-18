---
layout: default
title: 發布 0.17.1
---

JHipster release 0.17.1
==================

*JHipster為您提供集Yeoman + Maven + Spring + AngularJS於一體的應用產生器.*

更新日誌
----------

JHipster 0.17.1 is a bug-fixing release:

- We are having a very annoying, very hard to reproduce bug (at least [@juliendubois](https://twitter.com/juliendubois) can't reproduce it!) when generating a new entity, see [#404](https://github.com/jhipster/generator-jhipster/issues/404) for more information. Thanks for commenting the bug or notifying [@juliendubois](https://twitter.com/juliendubois) if you have the bug, and if you do NOT have the bug -> we are trying to find out which strange combinaison of node/npm/OS/whatever causes this issue. This is, of course, our top priority at the moment.
- We are migrating to Spring Boot 1.1.3 (which corrects some minor Spring Boot issues, see [the Spring blog](http://spring.io/blog/2014/06/27/spring-boot-1-1-3-available-now) for more information).

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
