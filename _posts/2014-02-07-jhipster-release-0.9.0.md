---
layout: default
title: 發布 0.9.0
---

JHipster release 0.9.0
==================

*JHipster為您提供集Yeoman + Maven + Spring + AngularJS於一體的應用產生器.*

更新日誌
----------

- 完全的Java類"熱過載"較以前有了很大提升, 感謝[@andy_clement](https://twitter.com/andy_clement)解決了我們的問題. 但是, 我們還有一個惱人的[缺陷](https://github.com/spring-projects/spring-loaded/issues/39)
- [@JeromeMirc](https://twitter.com/JeromeMirc)新增了第二個預設使用者, 而且極大的提升了使用者授權管理邏輯
- 改進了生成的WAR檔案, 尤其是在生產環境使用
- 更新Spring至4.0.1, 這個版本修復了許多問題. 如果你使用*org.springframework.scheduling.annotation.SchedulingConfiguration.setBeanFactory*遇到了問題, 現在應該可以解決了.
- 以上更新已全同步至文件

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
