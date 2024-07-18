---
layout: default
title: 遠端REPL
sitemap:
priority: 0.5
lastmod: 2016-09-22T22:22:00-00:00
---

# 遠端 REPL

__送出者 [@cbornet](https://github.com/cbornet)__

**由於在Spring Boot 2.0中將刪除Spring Boot遠端Shell，因此不建議使用此技巧**

從v3.8開始，JHipster擁有一個`shell` Maven/Gradle設定檔案，其中將包含[Spring Boot遠端shell](http://docs.spring.io/spring-boot/docs/current/reference/html/production-ready-remote-shell.html) 。
如果您的專案是使用JHipster <3.8生成的，則需要手動新增`spring-boot-starter-remote-shell`依賴項。

這帶來了一些有用的指令，這些指令可以幫助除錯實時應用程式，您也可以編寫自己的指令。

Spring Boot文件中未記錄的另一個不錯的功能是，您可以以[REPL](https://en.wikipedia.org/wiki/Read%E2%80%93eval%E2％80％93print_loop)的方式實時在應用程式上執行Groovy指令碼程式碼。
為此：

  * 啟動你的應用

  * 在終端中開啟ssh會話（此處用於使用者admin，密碼：admin）：

```
ssh -p2000 admin@localhost
```

  * 連線後，切換到Groovy REPL模式：

```
> repl groovy
```

  * 獲取BeanFactory：

```
> bf = context.attributes['spring.beanfactory']
```

  * 現在，您可以使用BeanFactory來獲取Spring bean並呼叫其方法：

```
> bf.getBean('userRepository').findAll().login
[system, anonymoususer, admin, user]
> bf.getBean('userService').getUserWithAuthoritiesByLogin('user').get().authorities.name
[ROLE_USER]
```
