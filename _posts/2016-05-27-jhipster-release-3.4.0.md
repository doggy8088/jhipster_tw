---
layout: default
title: 發布 v3.4.0
---

JHipster release 3.4.0
==================

更新日誌
----------

Great new features:

- A new sub-generator to handle JHipster upgrades! See the issue at [#3594](https://github.com/jhipster/generator-jhipster/issues/3594). It is already documented
[here]({{ site.url }}/upgrading-an-application/), and you can start using it with this release. Of course, it won't be fully usable until the next release, as if you are upgrading from v3.3.0 it's not installed yet! Many thanks to [François Lecomte](https://github.com/lordlothar99) who had the original idea and coded the implementation!
- Spring profiles used to generate an application are now the default profile used when an application is run, see [#3587](https://github.com/jhipster/generator-jhipster/issues/3587). The most important change is that you don't need to run your "prod" app with `--spring.profiles.active=prod` anymore.
- [SonarSource](http://www.sonarsource.com/) is now providing us with a free Sonar instance to have automatic code quality analysis on generated projects. More information is available on our new [code quality documentation page]({{ site.url }}/code-quality/)
- A great new Cassandra migration tool, that acts like Liquibase (for JPA) or Mongobee (for MongoDB). This is a huge step forward in our Cassandra implementation. See the issue at [#3593](https://github.com/jhipster/generator-jhipster/issues/3593). Many thanks to [Raphaël Brugier](https://twitter.com/rbrugier) from [Ippon USA](http://www.ipponusa.com/) who coded this!!
- MariaDB support [#3600](https://github.com/jhipster/generator-jhipster/issues/3600)

Important bug fixes:

- Compilation failure with social sign-in and MongoDB [#3633](https://github.com/jhipster/generator-jhipster/issues/3633)
- robots.txt secured in gateway applications [#3626](https://github.com/jhipster/generator-jhipster/issues/3626)
- Error when starting a microservice app, using app.yml, with Docker Compose [#3607](https://github.com/jhipster/generator-jhipster/issues/3607)

Closed tickets
------------
一如既往, __[you can check all closed tickets here](https://github.com/jhipster/generator-jhipster/issues?q=milestone%3A3.4.0+is%3Aclosed)__.

更新指引
------------

For an automatic upgrade, starting with JHipster v3.4.0, use the [JHipster upgrade sub-generator]({{ site.url }}/upgrading-an-application/) on an existing application:

```
yo jhipster:upgrade
```

選擇手動升級, 需要先升級你的Jhipster版本:

```
npm update -g generator-jhipster
```

如果你已經有了一個專案, 將會繼續使用當時專案生成的Jhipster版本.
如果需要升級你的專案, 你需要先刪除`node_modules`資料夾再執行:

```
yo jhipster
```

更新你的專案和所有的實體類

```
yo jhipster --with-entities
```

你也可以使用實體類子產生器挨個更新你的實體類, 例如你的實體類別名稱字是_Foo_

```
yo jhipster:entity Foo
```

幫助和缺陷
--------------

如果您發現這個版本的任何問題, 請隨時聯絡我們:

- 在我們的[bug tracker](https://github.com/jhipster/generator-jhipster/issues?state=open)新增一個缺陷報告
- 在[Stack Overflow](http://stackoverflow.com/tags/jhipster/info)送出問題

如果您遇到的問題是緊急錯誤或安全問題，請：

- 在推特上聯系[@jhipster](https://twitter.com/jhipster)
