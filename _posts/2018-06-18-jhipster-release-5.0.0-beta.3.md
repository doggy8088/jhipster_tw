---
layout: default
title: 發布 v5.0.0-beta.3
---

JHipster release v5.0.0-beta.3
==================

This is a specific security release on top of our v5.0.0-beta.2 release from last week, as 2 important security issues have been fixed on Spring Boot 2.0.3.

Please note that Spring Boot 2.0.3 also breaks the way Ehcache works with JHipster: many thanks to [Henri Tremblay](https://github.com/henri-tremblay) from the Ehcache team who did an incredible job in fixing the issue during the week-end!

More information on this Spring Boot 2.0.3 upgrade (including the Ehcache issue) is available on [#7783](https://github.com/jhipster/generator-jhipster/issues/7783).

_This BETA version is not available through the usual channels as this is a beta release, please read below for more information!_

Do you want to know more?
------------

JHipster 5 will be showcased at the upcoming [JHipster Conf](https://jhipster-conf.github.io/) where most of the core development team will present their work. Join us in Paris on June, 21st!

安裝方法
------------

As this a beta version, we are using a `beta` tag on NPM.

To install JHipster v5.0.0-beta.3 using Yarn, please type:

    yarn global add generator-jhipster@beta

If you are using NPM:

    npm install -g generator-jhipster@beta

It is also available using the JHipster Docker image, as it is automatically built from our source code.

However, as this is a BETA release it will not be available using our other usual channels like:

- [JHipster Online](https://start.jhipster.tech)
- Homebrew
- Chocolatey
- [JHipster Devbox](https://github.com/jhipster/jhipster-devbox)

You also won」t be able to use the `jhipster upgrade` sub-generator, as it won」t 『see』 the BETA release, which is distributed through a specific beta channel on NPM.

關閉的工單與合併請求
------------
一如既往, __[你可以在此處檢視所有已關閉的工單與已接受合併請求](https://github.com/jhipster/generator-jhipster/issues?q=milestone%3A5.0.0-beta.3+is%3Aclosed)__.

幫助和缺陷
--------------

如果您發現這個版本的任何問題, 請隨時聯絡我們:

- 在我們的[bug tracker](https://github.com/jhipster/generator-jhipster/issues?state=open)新增一個缺陷報告
- 在[Stack Overflow](http://stackoverflow.com/tags/jhipster/info)送出問題

如果您遇到的問題是緊急錯誤或安全問題，請：

- 在推特上聯系[@jhipster](https://twitter.com/jhipster)
