---
layout: default
title: 發布 v5.0.0
---

JHipster release v5.0.0
==================

This is our first stable release of JHipster 5!

Here is a summary of the release notes from our 4 beta releases of JHipster 5.0.0, updated with our latest changes.

## Front-end

- React support [#6044](https://github.com/jhipster/generator-jhipster/issues/6044) (out of experimental status)
    - Same features as our Angular support (including updates mentioned below regarding dialogs and entity folder structure)
    - Uses Redux for state management
    - Uses React Router v4 for routing
    - Written in Typescript
    - Webpack 4 is used for builds and is very similar to our Angular Webpack setup
    - Jest + Mocha + Chai unit tests with good coverage
- Improved Angular support
    - Upgrade to Angular 6 thanks to [William Marques](https://github.com/wmarques) in [#7582](https://github.com/jhipster/generator-jhipster/pull/7582)
    - This includes a migration to Webpack 4, which gives a nice performance boost (it varies depending on your situation, but you can expect a noticeable positive impact) [#7186](https://github.com/jhipster/generator-jhipster/pull/7186)
    - Lazy loading support for the admin modules [#7235](https://github.com/jhipster/generator-jhipster/pull/7235)
    - Reworked entity create/edit screens, they are normal pages now instead of popup dialogs [#7368](https://github.com/jhipster/generator-jhipster/pull/7368)
    - Improved AOT setup
    - The folder structure of entities have been improved, especially for microservices as now they are grouped by services. There is a `--skip-ui-grouping` flag to retain the old behaviour [#7079](https://github.com/jhipster/generator-jhipster/pull/7079)
- Support of Webpack 4 for both Angular and React, which allows much faster builds for both.
- Support of [Jest](https://facebook.github.io/jest/) instead of Puppeteer (and previously PhantomJS) for both Angular and React will provide much faster installation and testing (including parallel tests!). It will also solve all CI issues (typically with Jenkins) when running front-end tests, as it doesn't require to have native libraries installed. See [#7636](https://github.com/jhipster/generator-jhipster/pull/7636) and [#7663](https://github.com/jhipster/generator-jhipster/pull/7663) from [William Marques](https://github.com/wmarques).
- Prettier support [#6906](https://github.com/jhipster/generator-jhipster/pull/6906)
    - Both Angular and React now uses Prettier to format code.
    - This also adds [Husky](https://github.com/typicode/husky) and list-staged to enable pre-commit hooks
    - Please use the `skip-commit-hook` flag to disable the pre-commit hooks when generating the application
    - Prettier is also configured for CSS and SCSS files in [#7451](https://github.com/jhipster/generator-jhipster/issues/7451).
- Upgrade to Font Awesome 5 for both Angular and React, see [#7516](https://github.com/jhipster/generator-jhipster/issues/7516).
- Removed AngularJS support
    - As we now focus on Angular 5+, we have removed our support for the older AngularJS 1.x
    - As a side effect support for Bower and Gulp also have been removed

## Back-end

- Spring Boot 2.0.0 support [#7061](https://github.com/jhipster/generator-jhipster/pull/7061)
    - All Spring libraries have been upgraded, including Spring Data, Spring Security and Spring Cloud
    - The Spring Boot configuration has also been upgraded
- Refined REST support by removing the "feature" of creating entities using the `@PutMapping` annotation. See [#7425](https://github.com/jhipster/generator-jhipster/issues/7425).
- Much improved OAuth2 support thanks to the great work of [Fabien Arrault](https://github.com/farrault) which was integrated by [Matt Raible](https://github.com/mraible). Most of this work can be seen in [#7666](https://github.com/jhipster/generator-jhipster/pull/7666).
- Migration from swagger-codegen to openapi-generator (which is a community-driven fork of swagger-codegen) has been done by [Christophe Bornet](https://github.com/cbornet), who is both a member of the JHipster core team and the openapi-generator team. More information on [#7728](https://github.com/jhipster/generator-jhipster/pull/7728).
- Memcached support, as an alternative Spring Cache implementation. This will be much easier to use than Ehcache/Hazelcast/Infinispan on main cloud providers like Heroku, GCP and AWS.
- "Social Login" using Google/Twitter/Facebook has been removed as Spring Social is not actively maintained anymore. Currently you can use Keycloack to achieve the same result, and in the near future you should be able to use our new OAuth2 support.

As we also improved our database schema, our initial Liquibase changelog has been modified. To upgrade an existing schema (ie. JHipster 4.x), you can use the following changelog:

```
    <changeSet id="00000000000002" author="jhipster">
        <modifyDataType columnName="email"
                        newDataType="varchar(254)"
                        tableName="jhi_user"/>
    </changeSet>
    <changeSet id="00000000000003" author="jhipster" >
        <dropIndex  indexName="idx_user_login"
                    tableName="jhi_user"/>
    </changeSet>
    <changeSet id="00000000000004" author="jhipster" >
        <dropIndex  indexName="idx_user_email"
                    tableName="jhi_user"/>
    </changeSet>
    <changeSet id="00000000000005" author="jhipster" >
        <addNotNullConstraint   columnName="password_hash"
                                columnDataType="varchar(60)"
                                tableName="jhi_user"/>
    </changeSet>
```

## Sub-generators and tooling

- JDL v2 with application generation support [#7339](https://github.com/jhipster/generator-jhipster/pull/7339)
    - As a result, the language evolved dramatically, and you can now build full applications using the JDL, and not just entities. This is a huge news if you want to share and reuse your JHipster configuration.
- New JHipster blueprints
    - The blueprints system allows to easily extends and/or replace JHipster templates. This is how the new [JHipster Kotlin](https://github.com/jhipster/jhipster-kotlin) works. This isn」t well-documented yet, but JHipster Kotlin already gives a nice working example.
- New Sub-generator to deploy to AWS containers [#7035](https://github.com/jhipster/generator-jhipster/pull/7035)
- Initial [Istio](https://istio.io/) support [#7337](https://github.com/jhipster/generator-jhipster/issues/7337) has been added in [#7695](https://github.com/jhipster/generator-jhipster/pull/7695) by [Ray Tsang](https://github.com/saturnism) from Google, and [#7697](https://github.com/jhipster/generator-jhipster/pull/7697) by [Srinivasa Vasu](https://github.com/srinivasa-vasu). With the help of [Pierre Besson](https://github.com/PierreBesson).
- Google App Engine support for monoliths by [Ray Tsang](https://github.com/saturnism) from Google, see [#7765](https://github.com/jhipster/generator-jhipster/pull/7765).

關閉的工單與合併請求
------------
一如既往, __[你可以在此處檢視所有已關閉的工單與已接受合併請求](https://github.com/jhipster/generator-jhipster/issues?q=milestone%3A5.0.0+is%3Aclosed)__.

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
