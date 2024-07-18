---
layout: default
title: 發布 v4.9.0
---

JHipster release 4.9.0
==================

更新日誌
----------

This new release has [66 closed tickets and merged pull requests](https://github.com/jhipster/generator-jhipster/issues?q=milestone%3A4.9.0+is%3Aclosed), here are the most important news:

- Traefik support was added last week, see [#6397](https://github.com/jhipster/generator-jhipster/issues/6397). It is still in BETA, but adds an interesting alternative in our microservice architecture. [Full documentation on using Traefik with JHipster is available here]({{ site.url }}/traefik/).
- Major improvement on JHipster UAA: [Access/Refresh Token Handling for UAA Authentication #5752](https://github.com/jhipster/generator-jhipster/issues/5752)
- Front-end tests will now use Chromium headless, which is a huge change: [Replace PhantomJS by chromiumHeadless and puppeteer #6377](https://github.com/jhipster/generator-jhipster/pull/6377)
- The Gradle Wrapper is now using the latest Gradle 4.2 release: see [#6392](https://github.com/jhipster/generator-jhipster/pull/6392)
- Karma tests now have source maps: this will make them a bit slower, but a lot easier to debug - see [#6400](https://github.com/jhipster/generator-jhipster/pull/6400)
- Issues with our AWS sub-generator should at least be fixed thanks to [#6408](https://github.com/jhipster/generator-jhipster/pull/6408)
- A new polyfill has been added to add IE 11 support, see [#6337](https://github.com/jhipster/generator-jhipster/issues/6337)
- Upgrades to Yarn, NodeJS, NPM have been made in [#6424](https://github.com/jhipster/generator-jhipster/pull/6424)

As a result of those latest changes and bug fixes, we have removed the BETA tag on JHipster UAA and on our Kafka support option.

**Warning** Big changes in the OAuth2 support will happen in the next release, see [#6361](https://github.com/jhipster/generator-jhipster/pull/6361):

- We will migrate from our current home-made OAuth2 support (based on Spring Security OAuth2) to use OpenID Connect
- As a result, JHipster will work with OpenID Connect providers like [Keycloak](http://www.keycloak.org/) or [Okta](https://www.okta.com)
- This will remove a lot of code, and provide better quality and features
- As the current OAuth2 code is used by less than 1% of projects, we feel that this change will not affect many people

關閉的工單與合併請求
------------
一如既往, __[你可以在此處檢視所有已關閉的工單與已接受合併請求](https://github.com/jhipster/generator-jhipster/issues?q=milestone%3A4.9.0+is%3Aclosed)__.

更新指引
------------

**自動升級**

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
