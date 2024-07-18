---
layout: default
title: 發布 v6.3.1
---

JHipster release v6.3.1
==================

Warning, this release fixes an **important security vulnerabilities**:

- Our previous release had an important security vulnerability, please read [the v6.3.0 release notes]({{ site.url }}/2019/09/13/jhipster-release-6.3.0.html) for more information. It was announced that this vulnerability was only for users using JWT authentication: the issue is in fact wider, and affects people using session-based authentication and UAA authentication. Only people using OAuth2 authentication (with services like Keycloak or Okta) are safe. This was already fixed in the previous release, so there is nothing specific for this in this release.
- We have a [new vulnerability that affects Gradle users](https://github.com/jhipster/generator-jhipster/security/advisories/GHSA-mc84-xr9p-938r). The generated configuration file contained one Maven repository configured with HTTP, and not HTTPS, which could lead to man-in-the-middle attacks when doing a build. You will find all information in the security advisory, but to make a long story short: you should use HTTPS both in your Maven and Gradle build files.

**What's new in this release**

This release closes [48 tickets and pull requests](https://github.com/jhipster/generator-jhipster/issues?q=milestone%3A6.3.1+is%3Aclosed). It's a patch release, so those are mostly library upgrades, bug fixes, as well as a number of smaller feature enhancements.

關閉的工單與合併請求
------------
一如既往， __[您可以在此處檢視所有已關閉的工單和合並請求](https://github.com/jhipster/generator-jhipster/issues?q=milestone%3A6.3.1+is%3Aclosed)__.

更新方法
------------

**自動升級**

在原有的專案上使用 [JHipster upgrade sub-generator]({{ site.url }}/upgrading-an-application/)自動更新：

首先，升級JHipster版本：

```
npm update -g generator-jhipster
```

然後執行upgrade子產生器：

```
jhipster upgrade
```

**手動升級**

同樣，需要先升級您的JHipster到最新版：

```
npm update -g generator-jhipster
```

對於已經存在的專案，它仍使用原來生成該專案時的JHipster版本。
要升級專案，必須首先刪除其`node_modules`資料夾，然後執行：

```
jhipster
```

您還可以透過執行以下指令來更新專案及其所有實體：

```
jhipster --with-entities
```

您還可以透過再次執行entity子產生器（jhipster entity）來逐一更新實體，例如，如果您的實體名為_Foo_，則執行：

```
jhipster entity Foo
```

幫助和缺陷
--------------

如果您發現這個版本的任何問題, 請隨時聯絡我們：

- 送出Bug請到 [bug tracker](https://github.com/jhipster/generator-jhipster/issues?state=open)
- 送出問題請到 [Stack Overflow](http://stackoverflow.com/tags/jhipster/info)

如果您遇到的問題是緊急錯誤或安全問題，請：

- 在推特上聯系[@jhipster](https://twitter.com/jhipster)
