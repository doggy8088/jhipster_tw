---
layout: default
title: 發布 v6.7.0
---

JHipster release v6.7.0
==================

This is the 1st release in 2020, with [206 closed tickets and merged pull requests](https://github.com/jhipster/generator-jhipster/issues?q=milestone%3A6.7.0+is%3Aclosed).

Here are the most significant ones:

- Upgrade to Spring Boot 2.2.4.RELEASE - [#11155](https://github.com/jhipster/generator-jhipster/pull/11155) [#10955](https://github.com/jhipster/generator-jhipster/pull/10955) and [jhipster#546](https://github.com/jhipster/jhipster/pull/546)
- JHipster Regisry v6.1.1, using Spring Boot 2.2.4.RELEASE and Spring Cloud Hoxton - [jhipster-registry#408](https://github.com/jhipster/jhipster-registry/pull/408)
- Reactive with OAuth2 - [#11117](https://github.com/jhipster/generator-jhipster/pull/11117)
- Kubernetes Knative - [#10695](https://github.com/jhipster/generator-jhipster/issues/10695)
- UAA without Eureka - [#11033](https://github.com/jhipster/generator-jhipster/pull/11033)
- Many libraries upgrades

關閉的工單與合併請求
------------
一如既往， __[您可以在此處檢視所有已關閉的工單和合並請求](https://github.com/jhipster/generator-jhipster/issues?q=milestone%3A6.7.0+is%3Aclosed)__.

Backward Compatibility Issues
------------

- **v6.5.x and beyond** 

    - **MongoDB**: PersistentAuditEvent Documents not found after upgrading ([#11290](https://github.com/jhipster/generator-jhipster/issues/11290)). 
    
        - `jhipster upgrade` will remove `@Field("event_id")` annotation on `PersistentAuditEvent#id` domain class.
        
        - The goal is identifying Documents properly by    `_id` field instead, using Spring Data `@Id` annotation. But: when querying pre-upgrade stored documents, the query won't look for `event_id`, thus those won't be found.
        
        - Such specific case should not impact regular applications behaviour.
        
        - Domain backwards compatibility can be restored by adding `@Field(value = "event_id", targetType = FieldType.OBJECT_ID)` annotation to `PersistentAuditEvent#id` in combination with `@Id`.


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
