---
layout: default
title: 發布 v2.0.0
---

JHipster release 2.0.0
==================

*JHipster gives you Spring Boot + AngularJS working together in one handy Yeoman generator.*

Documentation
----------

Looking for the (old) JHipster v2.x documentation? It's [Here]({{ post.url }}/documentation-archive)!

更新日誌
----------

```
Guybrush: I'm on a whole new adventure.
```

```
Bart: Growing a mustache?
```

```
Guybrush: No. Bigger than that.
```

```
Bart: A beard?!?
```

_-- Monkey Island 2: LeChuck's Revenge_

This is our first v2.0.0 release! This has been a lot of work, with a lot of contributors, and we want to thank everyone who has participated in this release.

__Why is this called "v2.0.0"?__

We are breaking a few things in this release. Existing users should not be lost, we use 95% of the same technologies, in the same way. But the project has grown up, we have improved our skills, we have had feedback from lots of people, from all over the world. So we decided to rethink some parts of the project, and hence break some of our existing code.

__What are the most important changes in this release?__

- The AngularJS code has been modularized, to make it clearer, and to allow people to use JHipster on bigger projects
- Liquibase is now able to create "diffs" between the JPA code and the database, which allow you to update your database schema much more easily

__How can I upgrade, and know exactly what's new?__

We have summarized all important changes on this document:

[What」s new in JHipster v2.0](https://docs.google.com/document/d/16oIpeEyb-qkPjM_bVQ4zX-dlibyH5_21fTrdQllGiwM/edit?usp=sharing)

Everyone has the right to comment the document, so we are going to improve it over time, in a community effort.

__Are there bugs, is it safe to upgrade?__

The code is still very new, and you might encounter issues if you use some of the less commonly-used options. However, we felt it was the right time to release this version as:

- This release is as stable as the v1.x maintenance releases, so it is quickly becoming a better option to use the v2 rather than the v1
- Thanks to NPM we can easily and quickly release new versions, with fixes and upgrades, so we stick with the "release early, release often" Open Source philosophy

__Is this new version more fun than the previous one?__

Oh yes, a lot more!

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
