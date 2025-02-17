---
layout: default
title: 發布 v0.14.0
---

JHipster release 0.14.0
==================

*JHipster為您提供集Yeoman + Maven + Spring + AngularJS於一體的應用產生器.*

更新日誌
----------

JHipster 0.14.0 has an incredibly huge number of new features, thanks to our very active community which has provided a lot of pull requests.

You can find the complete list of closed tickets and PR [here](https://github.com/jhipster/generator-jhipster/issues?milestone=3&page=1&state=closed)

Most importantly, we have:

- MongoDB support! If you don't like SQL databases or JPA, you can have a full NoSQL application.
- OAuth2 support, which allows us to have stateless webapps.
- Gulp.js support, as an optional replacement to Grunt.js. It basically does the same, but its configuration file is smaller and easier to learn. And of course it's supposed to be cooler.
- Increased support for Java 8: this support should now be complete, if you are interested in the new Java 8 features you should definitely have a look at what we provide. Unfortunately Java 8 is still not very well supported by Spring Loaded (we have some causes where lambdas cause the hot reloading to fail), so it is not yet our default Java version. Expect it to be our default version in the near future.
- Russian translation
- Many bug fixes and small improvements

The number of questions asked by the generator has thus increased, and we have a huge number of possible outputs depending on your choices. Hopefully all of them will work :-)

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
