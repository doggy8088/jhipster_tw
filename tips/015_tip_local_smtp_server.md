---
layout: default
title: 本地SMTP伺服器
sitemap:
priority: 0.5
lastmod: 2016-05-21T22:22:00-00:00
---

# Local SMTP Server

__送出者 [@pascalgrimaud](https://github.com/pascalgrimaud)__

**警告！** 本技巧取決於JHipster不直接支援的另一個專案。

該專案 [djfarrelly/maildev](https://github.com/djfarrelly/MailDev) 是一種易於使用的Web介面，用於在開發過程中測試專案生成的電子郵件的簡單方法。

要使用Docker在本地啟動SMTP伺服器，請執行以下操作：

```
docker container run -d -p 1080:80 -p 25:25 djfarrelly/maildev
```
