---
layout: default
title: 發布 v5.0.0-beta.2
---

JHipster release v5.0.0-beta.2
==================

This is our third beta release for JHipster v5. We have no specific issue left, and if everything works well it will graduate as our first v5 stable release in the next few days.

It has [204 closed tickets and pull requests on the main project](https://github.com/jhipster/generator-jhipster/issues?q=milestone%3A5.0.0-beta.2+is%3Aclosed), so if you had any issue with our 5.0.0-beta.1 release, we hopefully fixed it!

_It is not available through the usual channels as this is a beta release, please read below for more information!_

更新日誌?
----------

- React support is now complete, and at the same level of quality as our Angular support.
- Support of Webpack 4 for both Angular and React, which allows much faster builds for both.
- Support of [Jest](https://facebook.github.io/jest/) instead of Puppeteer (and previously PhantomJS) for both Angular and React will provide much faster installation and testing (including parallel tests!). It will also solve all CI issues (typically with Jenkins) when running front-end tests, as it doesn't require to have native libraries installed. See [#7636](https://github.com/jhipster/generator-jhipster/pull/7636) and [#7663](https://github.com/jhipster/generator-jhipster/pull/7663) from [William Marques](https://github.com/wmarques).
- Much improved OAuth2 support thanks to the great work of [Fabien Arrault](https://github.com/farrault) which was integrated by [Matt Raible](https://github.com/mraible). Most of this work can be seen in [#7666](https://github.com/jhipster/generator-jhipster/pull/7666).
- Upgrade to Angular 6 thanks to [William Marques](https://github.com/wmarques) in [#7582](https://github.com/jhipster/generator-jhipster/pull/7582)
- Typed Redux store in React thanks to [Bertwin](https://github.com/bertwin) in [#7578](https://github.com/jhipster/generator-jhipster/pull/7578)
- Migration to JHipster Core v3 by [Mathieu Abou-Aichi](https://github.com/MathieuAA). JHipster Core is our main internal library, and it includes our brand new JDL v3 with a new parser based on [Chevrotain](https://github.com/SAP/chevrotain). For the moment, we don't document those new features on purpose, as for this beta release we want to make sure we have 100% compatibility with our previous release - but be prepared for lots of exiting things here, including the ability to generate whole microservices architectures with the JDL, and not just entities! More information on this release [on the JHipster Core release notes](https://github.com/jhipster/jhipster-core/releases/tag/v3.0.0).
- Memcached support is ready, as an alternative Spring Cache implementation. This will be much easier to use than Ehcache/Hazelcast/Infinispan on main cloud providers like Heroku, GCP and AWS. More information on [#7652](https://github.com/jhipster/generator-jhipster/pull/7652) and [#7690](https://github.com/jhipster/generator-jhipster/issues/7690).
- Initial [Istio](https://istio.io/) support [#7337](https://github.com/jhipster/generator-jhipster/issues/7337) has been added in [#7695](https://github.com/jhipster/generator-jhipster/pull/7695) by [Ray Tsang](https://github.com/saturnism) from Google, and [#7697](https://github.com/jhipster/generator-jhipster/pull/7697) by [Srinivasa Vasu](https://github.com/srinivasa-vasu). With the help of [Pierre Besson](https://github.com/PierreBesson).
- Migration from swagger-codegen to openapi-generator (which is a community-driven fork of swagger-codegen) has been done by [Christophe Bornet](https://github.com/cbornet), who is both a member of the JHipster core team and the openapi-generator team. More information on [#7728](https://github.com/jhipster/generator-jhipster/pull/7728).



Do you want to know more?
------------

All those new features will be showcased at the upcoming [JHipster Conf](https://jhipster-conf.github.io/) where most of the core development team will present their work. Join us in Paris on June, 21st!

安裝方法
------------

This is the first time we use a BETA tag on NPM, so please note this is new for everyone!

To install JHipster v5.0.0-beta.2 using Yarn, please type:

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
一如既往, __[你可以在此處檢視所有已關閉的工單與已接受合併請求](https://github.com/jhipster/generator-jhipster/issues?q=milestone%3A5.0.0-beta.2+is%3Aclosed)__.

幫助和缺陷
--------------

如果您發現這個版本的任何問題, 請隨時聯絡我們:

- 在我們的[bug tracker](https://github.com/jhipster/generator-jhipster/issues?state=open)新增一個缺陷報告
- 在[Stack Overflow](http://stackoverflow.com/tags/jhipster/info)送出問題

如果您遇到的問題是緊急錯誤或安全問題，請：

- 在推特上聯系[@jhipster](https://twitter.com/jhipster)
