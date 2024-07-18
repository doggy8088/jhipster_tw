---
layout: default
title: 發布 v4.8.0
---

JHipster release 4.8.0
==================

更新日誌
----------

- The exception handling mechanism has been totally refactored to follow [RFC 7807](https://tools.ietf.org/html/rfc7807), using [Zalando's problem-spring-web library](https://github.com/zalando/problem-spring-web). Default error pages are also available on this site, see ["Error - problem with a message"]({{ site.url }}/problem/problem-with-message/), ["Error - parameterized"]({{ site.url }}/problem/parameterized/) and ["Error: constraint violation"]({{ site.url }}/problem/constraint-violation/). Those error pages can be customized in each application's `ErrorConstants` class. See ticket [#6328](https://github.com/jhipster/generator-jhipster/pull/6328) for more detailed information.
- There is now a Spring Cache configuration to store Spring Security users. See ticket [#6105](https://github.com/jhipster/generator-jhipster/issues/6105) for some background information. This will improve the performance of all applications using an Hibernate L2 cache (as the user is loaded by its login, and not its ID, the Hibernate L2 cache doesn't work), but can lead to a few errors if you customized this part of the code. If you encounter a `LazyInitializationException`, this is because you get a `User` instance from  Spring Cache, and not from Hibernate, hence it is not an Hibernate managed object anymore (you can solve this by re-attaching the object, or by disabling the Spring Cache configuration and going back to the older configuration).
- New features and better documentation to separate the front-end and the back-end parts of a JHipster application. See ticket [#5754](https://github.com/jhipster/generator-jhipster/issues/5754) and the ["Separating the front-end and the API server" documentation]({{ site.url }}/separating-front-end-and-api/). And don't forget you can improve the documentation by doing a PR on [jhipster/jhipster.github.io](https://github.com/jhipster/jhipster.github.io)!
- Use the new Spotify `dockerfile-maven-plugin`, see ticket [#6194](https://github.com/jhipster/generator-jhipster/issues/6194). The main issue you will encounter is that the Maven plugin is `dockerfile` and not `docker` anymore - for example, you will now build your Docker image by running `./mvnw package -Pprod dockerfile:build`. The documentation, as well as our [oh-my-zsh plugin](https://github.com/jhipster/jhipster-oh-my-zsh-plugin), have been updated.

In total, 72 tickets and PR have been closed, so there are also many minor issues which have been fixed.

關閉的工單與合併請求
------------
一如既往, __[你可以在此處檢視所有已關閉的工單與已接受合併請求](https://github.com/jhipster/generator-jhipster/issues?q=milestone%3A4.8.0+is%3Aclosed)__.

更新指引
------------

**自動升級**

WARNING [this has been fixed recently](https://github.com/jhipster/generator-jhipster/pull/5966), so if you have trouble with this:

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
