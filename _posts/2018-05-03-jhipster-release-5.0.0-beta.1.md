---
layout: default
title: 發布 v5.0.0-beta.1
---

JHipster release v5.0.0-beta.1
==================

This is our second beta release for JHipster v5, and probably the last one before our final release. For most use cases, you should be able to work with this release with confidence.

It has [158 closed tickets and pull requests on the main project](https://github.com/jhipster/generator-jhipster/issues?q=milestone%3A5.0.0-beta.1+is%3Aclosed), so if you had any issue with our 5.0.0-beta.0 release, we hopefully fixed it!

_It is not available through the usual channels as this is a beta release, please read below for more information!_

更新日誌?
----------

- Lots of fixes on our new React support, which makes it today as stable as our Angular support! Thank you to everybody who tested it, please continue to send us issues!
- Upgrade to Font Awesome 5 for both Angular and React, see [#7516](https://github.com/jhipster/generator-jhipster/issues/7516).
- Refined REST support by removing the "feature" of creating entities using the `@PutMapping` annotation. See [#7425](https://github.com/jhipster/generator-jhipster/issues/7425).
- Use Prettier for CSS and SCSS files in [#7451](https://github.com/jhipster/generator-jhipster/issues/7451).
- AWS support as been corrected in [#7086](https://github.com/jhipster/generator-jhipster/issues/7086), so you can now use both AWS Container Service and AWS Beanstalk! We have removed the BETA tag on this sub-generator.
- Many improvements in our OAuth2 support, see [#7065](https://github.com/jhipster/generator-jhipster/issues/7065), [#7351](https://github.com/jhipster/generator-jhipster/pull/7351), [#7460](https://github.com/jhipster/generator-jhipster/pull/7460).
- We removed our reactive support in Spring Boot. This is going to be completely re-written in a separate branch, and will be released later. Reactive applications will be a new type of application (like we already have `monolith` or `microservice`), which will be used only when this technology makes sense.

Documentation
------------

We have started to merge the JHipster v5 documentation on the main website:

- It is not yet complete, please don」t hesitate to help if you find issues
- If you are using JHipster v4, don」t forget we have [the full versioned archives available here](https://www.jhipster.tech/documentation-archive/).

What」s missing
------------

- We」re mostly waiting for Spring Cloud to have a stable release compatible with Spring Boot 2.0.0. This is why this release depends on the Maven Spring milestone repository. If you are not using microservices (and so not using Spring Cloud), you」re not concerned by this.
- End-to-end tests with React using Protractor. You can follow the issue here: [#7469](https://github.com/jhipster/generator-jhipster/pull/7469)

安裝方法
------------

This is the first time we use a BETA tag on NPM, so please note this is new for everyone!

To install JHipster v5.0.0-beta.1 using Yarn, please type:

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

How you can help
------------

If you find any issue, please [open a ticket](https://github.com/jhipster/generator-jhipster/issues) and follow our [guidelines](https://github.com/jhipster/generator-jhipster/blob/master/CONTRIBUTING.md).

We are expecting to do a stable release in the next 2 weeks, but please remember that most people on the team are doing this on their free time. So if your company is benefiting from JHipster, you can also help by telling your boss to [sponsor the project]({{ site.url }}/sponsors/) - that money will be used to reward contributors, and help us to release even better versions, more quickly!

Do you want to know more?
------------

All those new features will be showcased at the upcoming [JHipster Conf](https://jhipster-conf.github.io/) where most of the core development team will present their work. Join us in Paris on June, 21st!

關閉的工單與合併請求
------------
一如既往, __[你可以在此處檢視所有已關閉的工單與已接受合併請求](https://github.com/jhipster/generator-jhipster/issues?q=milestone%3A5.0.0-beta.1+is%3Aclosed)__.

幫助和缺陷
--------------

如果您發現這個版本的任何問題, 請隨時聯絡我們:

- 在我們的[bug tracker](https://github.com/jhipster/generator-jhipster/issues?state=open)新增一個缺陷報告
- 在[Stack Overflow](http://stackoverflow.com/tags/jhipster/info)送出問題

如果您遇到的問題是緊急錯誤或安全問題，請：

- 在推特上聯系[@jhipster](https://twitter.com/jhipster)
