---
layout: default
title: 使用MS SQL Server
sitemap:
    priority: 0.1
    lastmod: 2016-12-01T00:00:00-00:00
---
# 如何在JHipster中使用MS SQL Server

__送出人 [@Zyst](https://github.com/Zyst)__

#### 自[pull request #4589](https://github.com/jhipster/generator-jhipster/pull/4589) 以後，MSSQL支援已新增到產生器中, 因此您不再需要任何特定的設定！

_目標：_ 在本教程結束時，您將在SQL Server上執行預設的JHipster應用程式，所有功能均已正常執行。

首先以`jhipster`正常執行JHipster，然後選擇使用基於token的身份驗證，SQL，MySQL作為開發資料庫。 MySQL為產品資料函式庫。 帶有ehcache，無Elasticsearch，無叢集HTTP，無Websockets，使用Maven和Grunt，不使用Sass。

然後，我們將MS SQL Server JDBC依賴項新增到專案`pom.xml`檔案中。

_pom.xml_

    [...]
    <!-- Microsoft JDBC -->
    <dependency>
        <groupId>com.microsoft.sqlserver</groupId>
        <artifactId>sqljdbc41</artifactId>
        <version>4.1</version>
    </dependency>
    <!-- Liquibase MS SQL Server extensions -->
    <dependency>
        <groupId>com.github.sabomichal</groupId>
        <artifactId>liquibase-mssql</artifactId>
        <version>1.4</version>
    </dependency>
    [...]

我正在使用Sql JDBC 4.1，並且已經將其安裝到我的個人倉庫中，但是如果您不這樣做，那麼在沒有進行進一步設定的情況下將無法正常工作，請檢視[this](https://stackoverflow.com/questions/30207842/add-external-library-jar-to-spring-boot-jar-internal-lib) stackoverflow問題以供進一步參考。

Liquibase MS SQL Server擴充套件允許您執行一些更靈活的操作，我們將在本教程的後面部分中使用它們。

##資料庫修改

進入`src\main\resources\config\application-dev.yml`並更改您的應用程式以使用新的資料來源，並更改您的Hibernate設定以使用SQL Server的方言，如下所示：

_application-dev.yml_

    spring:
        profiles:
            active: dev
        datasource:
            driver-class-name: com.microsoft.sqlserver.jdbc.SQLServerDataSource
            url: jdbc:sqlserver://localhost:1433;databaseName=test
            databaseName:
            serverName:
            username: myuser
            password: supersecretpassword
            cachePrepStmts: true
            prepStmtCacheSize: 250
            prepStmtCacheSqlLimit: 2048
            useServerPrepStmts: true

        jpa:
            database-platform: org.hibernate.dialect.SQLServerDialect
            database: SQL_SERVER
            openInView: false
            show_sql: true
            generate-ddl: false
            [...]

假設您的資料庫稱為`test`，請根據需要更改連線URL。

現在進入 `*\src\main\resources\config\liquibase\changelog\00000000000000_initial_schema.xml` 並在檔案頂部更改以下屬性：

_00000000000000_initial_schema.xml_

    <databaseChangeLog
        xmlns="http://www.liquibase.org/xml/ns/dbchangelog"
        xmlns:ext="http://www.liquibase.org/xml/ns/dbchangelog-ext"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="http://www.liquibase.org/xml/ns/dbchangelog http://www.liquibase.org/xml/ns/dbchangelog/dbchangelog-3.1.xsd
        http://www.liquibase.org/xml/ns/dbchangelog-ext http://www.liquibase.org/xml/ns/dbchangelog/dbchangelog-ext.xsd">

        <property name="now" value="now()" dbms="mysql,h2"/>
        <property name="now" value="current_timestamp" dbms="postgresql"/>
        <property name="now" value="GETDATE()" dbms="mssql"/>

        <changeSet id="00000000000000" author="jhipster" dbms="postgresql">
            <createSequence sequenceName="hibernate_sequence" startValue="1000" incrementBy="1"/>
        </changeSet>
        [...]

首先，請確保您已將xml databaseChangeLog屬性更改為包括ext。 現在在src\main\resources\config\liquibase\changelog\00000000000000_initial_schema.xml`中找到資料條目並進行更改：

_00000000000000_initial_schema.xml_

    <ext:loadData encoding="UTF-8"
              file="config/liquibase/users.csv"
              separator=";"
              tableName="JHI_USER" identityInsertEnabled="true">
        <column name="activated" type="boolean"/>
        <column name="created_date" type="timestamp"/>
    </ext:loadData>
    <dropDefaultValue tableName="JHI_USER" columnName="created_date" columnDataType="datetime"/>

    <ext:loadData encoding="UTF-8"
                  file="config/liquibase/authorities.csv"
                  separator=";"
                  tableName="JHI_AUTHORITY"
                  identityInsertEnabled="true" />

    <ext:loadData encoding="UTF-8"
                  file="config/liquibase/users_authorities.csv"
                  separator=";"
                  tableName="JHI_USER_AUTHORITY"
                  identityInsertEnabled="true" />

新增`identityInsertEnabled = "true"`與使用`IDENTITY_INSERT ON`和`IDENTITY_INSERT OFF`包裹插入內容相同，這將允許您直接插入專案自動生成的ID。 這就是為什麼我們要使用MS SQL Server Liquibase。

現在嘗試執行您的應用程式！ 一切都應該正常工作，並且您應該繼續將JHipster應用程式與SQL Server一起使用。