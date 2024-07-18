---
layout: default
title: 建立實體
sitemap:
priority: 0.5
lastmod: 2021-01-07T08:40:00-00:00
---

# 建立實體

## 介紹

JHipster Quarkus實體建立允許生成

* 資料庫表
* Liquibase變更集
* JPA實體
* Quarkus Panache活動記錄或儲存庫
* Resteasy控制器，具有基本的CRUD操作
* 數據傳輸物件（DTO）
* 分頁
* 測試

並將用戶端元件生成委託給JHipster

### 例子

```
$ jhipster-quarkus entity Book
INFO! Using JHipster version installed locally in current project's node_modules
INFO! No custom sharedOptions found within blueprint: generator-jhipster-quarkus at /Users/daniel/workspace/jhipster/jhipster-eleven/node_modules/generator-jhipster-quarkus
INFO! No custom commands found within blueprint: generator-jhipster-quarkus at /Users/daniel/workspace/jhipster/jhipster-eleven/node_modules/generator-jhipster-quarkus
INFO! Executing jhipster:entity Book
     info Using blueprint generator-jhipster-quarkus for entity subgenerator

The entity Book is being created.


Generating field #1

? Do you want to add a field to your entity? Yes
? What is the name of your field? isbn
? What is the type of your field? String
? Do you want to add validation rules to your field? Yes
? Which validation rules do you want to add? Required

================= Book =================
Fields
isbn (String) required


Generating field #2

? Do you want to add a field to your entity? No

================= Book =================
Fields
isbn (String) required


Generating relationships to other entities

? Do you want to add a relationship to another entity? No

================= Book =================
Fields
isbn (String) required



? Do you want to use separate repository class for your data access? No, the Entity will be used as an Active Record
? Do you want to use separate service class for your business logic? No, the REST controller should use the active record/repository directly
? Do you want pagination on your entity? Yes, with pagination links

Everything is configured, generating the entity...
```

## JHipster UML 和 JDL Studio

JHipster Quarkus支援JDL匯入。
請參考以下內容中相應的JHipster UML和JDL Studio部分： *[建立實體](http://localhost:4000/creating-an-entity/)* 。