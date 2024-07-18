---
layout: default
title: 發布 0.3.0
---

JHipster release 0.3.0
==================

*JHipster為您提供集Yeoman + Maven + Spring + AngularJS於一體的應用產生器.*

更新日誌
----------

- JDK 7是最低要求 (如果你還在使用Java6, 你就不能自稱Java狂熱者了!)
- Spring的設定幾乎沒有XML的存在! 我們唯一保持XML設定檔案的元件是Spring Security. 我們需要等待Spring Security下次更新才替換這個檔案.
- 替換新的連線池函式庫: 我們現在使用[HikariCP](https://github.com/brettwooldridge/HikariCP)
- 由於很多使用者開始使用Spring4, 我們也與時俱進升級到了Spring 4.0.0.RC2


更新指引
------------

使用以下指令更新Jhipster:

```
npm update -g generator-jhipster
```

你現在可以棄用這些已經不使用的XML檔案:

- src/main/resources/META-INF/persistence.xml
- src/main/resources/META-INF/spring/applicationContext-database.xml
- src/test/resources/META-INF/spring/applicationContext-database.xml

使用以下指令更新你的專案

```
yo jhipster
```

幫助和缺陷
--------------

如果您發現這個版本的任何問題, 請隨時聯絡我們:

- 在推特上聯系[@jhipster](https://twitter.com/jhipster)
- 在我們的[bug tracker](https://github.com/jhipster/generator-jhipster/issues?state=open)新增一個缺陷報告
