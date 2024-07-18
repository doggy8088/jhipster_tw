---
layout: default
title: 設定Jenkins 1
permalink: /setting-up-ci-jenkins1/
sitemap:
    priority: 0.7
    lastmod: 2016-11-03T12:40:00-00:00
---

# <i class="fa fa-wrench"></i> 設定Jenkins伺服器

要為JHipster設定Jenkins伺服器，請參考以下指南：

- [在Linux設定Jenkins 1]({{ site.url }}/setting-up-ci-linux/)
- [在Windows設定Jenkins 1]({{ site.url }}/setting-up-ci-windows/)

# <i class="fa fa-sliders"></i> Jenkins設定

要在Jenkins中設定JHipster專案，請使用以下設定：

## 對於Maven:

```
* Project name: `yourApplicationName`
* Source Code Management
    * Git Repository: `git@github.com:xxxx/yourApplicationName.git`
    * Branches to build: `*/main`
    * Additional Behaviours: `Wipe out repository & force clone`
* Build Triggers
    * Poll SCM / Schedule: `H/5 * * * *`
* Build<% if (buildTool == 'maven') { %>
    * Invoke Maven / Tasks: `-Pprod clean package`
    * Execute Shell / Command:
        ````
        mvn spring-boot:run &
        bootPid=$!
        sleep 30s
        gulp itest
        kill $bootPid
        ````
* Post-build Actions
    * Publish JUnit test result report / Test Report XMLs: `build/test-results/*.xml`
```

## 對於Gradle:
```
* Project name: `yourApplicationName`
* Source Code Management
    * Git Repository: `git@github.com:xxxx/yourApplicationName.git`
    * Branches to build: `*/main`
    * Additional Behaviours: `Wipe out repository & force clone`
* Build Triggers
    * Poll SCM / Schedule: `H/5 * * * *`
* Build
    * Invoke Gradle script / Use Gradle Wrapper / Tasks: `-Pprod clean test bootWar`
    * Execute Shell / Command:
        ````
        ./gradlew bootRun &
        bootPid=$!
        sleep 30s
        gulp itest
        kill $bootPid
        ````
* Post-build Actions
    * Publish JUnit test result report / Test Report XMLs: `build/test-results/*.xml`
```

