---
layout: default
title: 設定電子郵件-使用Gmail等
sitemap:
priority: 0.5
lastmod: 2015-12-23T22:40:00-00:00
---
# 設定電子郵件-使用Gmail等

__送出者 [@RawSanj](https://github.com/RawSanj)__

_目標：_ 透過使用下面的郵件設定，您將設定預設的JHipster應用程式，以從Gmail，Outlook或Yahoo傳送電子郵件。

首先執行`jhipster`建立一個新的應用程式，或使用一個現有的JHipster生成的應用程式。

## 為您的應用程式選擇以下任何電子郵件服務：

### 1. 郵件設定-Gmail

進入`src\main\resources\config\application-dev.yml`並將您的應用程式更改為使用以下Gmail設定：

_application-dev.yml_

    spring:
        profiles:
            active: dev
        mail:
            host: smtp.gmail.com
            port: 587
            username: gmailuserid@gmail.com  #Replace this field with your Gmail username.
            password: ************           #Replace this field with your Gmail password/App password.
            protocol: smtp
            tls: true
            properties.mail.smtp:
                auth: true
                starttls.enable: true
                ssl.trust: smtp.gmail.com
            [...]

如果您將上述設定與Gmail密碼一起使用，則可能需要[允許使用不太安全的應用程式](https://support.google.com/accounts/answer/6010255?hl=zh_CN) 。
設定較為簡單，但安全性較低。 同樣，透過允許安全性較低的應用程式，您將無法使用雙因素使用Gmail進行身份驗證。


因此，我們強烈建議您使用應用密碼而不是Gmail密碼。 請參考以下Gmail設定文件，以獲取有關如何進行設定的更多訊息。

[https://support.google.com/accounts/answer/185833](https://support.google.com/accounts/answer/185833)

這樣，您將可以使用兩因素身份驗證，並且可以關閉『允許不太安全的應用程式』選項。

### 2. 郵件設定-Outlook.com

進入`src\main\resources\config\application-dev.yml`並將您的應用程式更改為使用以下Outlook設定：

_application-dev.yml_

    spring:
        profiles:
            active: dev
        mail:
            host: smtp-mail.outlook.com
            port: 587
            username: outlookuserid@outlook.com  #Replace this field with your Outlook username.
            password: ************               #Replace this field with your Outlook password.
            protocol: smtp
            tls: true
            properties.mail.smtp:
                auth: true
                starttls.enable: true
                ssl.trust: smtp-mail.outlook.com
            [...]
__注意__ : 如果您要從Corporate Outlook帳戶傳送電子郵件，則將`host`設定為公司的Microsoft Exchange Server，例如 `emea.mycompany.com`。 還要將`username`設定為公司提供的系統的標準ID（域/使用者名），並將`password`設定為您的系統密碼。

___提示___ : 查詢`Microsoft Exchange Server`：開啟Outlook>單擊工具>單擊帳戶設定...>雙擊Microsoft Exchange（在『電子郵件』頁籤下），然後複製Microsoft Exchange Server地址。


### 3. 郵件設定-Yahoo

進入`src \ main \ resources \ config \ application-dev.yml`並更改您的應用程式以使用以下Yahoo設定：

_application-dev.yml_

    spring:
        profiles:
            active: dev
        mail:
            host: smtp.mail.yahoo.com
            port: 587
            username: yahoouserid@yahoo.com  #Replace this field with your Yahoo username.
            password: ************           #Replace this field with your Yahoo password.
            protocol: smtp
            tls: true
            properties.mail.smtp:
                auth: true
                starttls.enable: true
                ssl.trust: smtp.mail.yahoo.com
            [...]

    jhipster:       
        mail:
            from: yahoouserid@gmail.com  #Replace this field with your Gmail username.
            [...]
__注意__ : 對於Yahoo Mail，**spring.mail**中的username屬性必須與**jhipster.mail**中的from屬性對應。


### 4. 郵件設定-Zoho

進入`src \ main \ resources \ config \ application-dev.yml`並更改您的應用程式以使用以下Zoho設定：

_application-dev.yml_

    spring:
        profiles:
            active: dev
        mail:
            host: smtp.zoho.com
            port: 587
            username: zohouserid@zoho.com   #Replace this field with your Zoho username.
            password: ************          #Replace this field with your Zoho password.
            protocol: smtp
            tls: true
            properties.mail.smtp:
                auth: true
                starttls.enable: true
                ssl.trust: smtp.zoho.com
            [...]


### 4. 郵件設定-AWS SES

進入`src \ main \ resources \ config \ application-dev.yml`並將您的應用程式更改為使用以下AWS SES設定：

_application-dev.yml_

    spring:
        profiles:
            active: dev
        mail:
            host: email-smtp.us-east-1.amazonaws.com
            port: 465
            username: ********************
            password: ********************************************
            protocol: smtps
            debug: true
            properties.mail.smtp:
                starttls.enable: true
                starttls.required: true
                ssl.enable: true
            properties.mail.smtps:
                auth: true


*類似地，您可以設定任何其他電子郵件服務。 只需檢查您的電子郵件服務的SMTP郵件伺服器和伺服器端口，並相應地更改以上欄位即可*
___現在執行您的應用程式！ 轉到註冊頁面，送出帶有有效電子郵件地址的表格，您應該從上面設定的電子郵件地址收到啟用電子郵件。___

__注意__ : 您可以嘗試使用[這些範例](https://github.com/RawSanj/java-mail-clients)使用憑據傳送測試電子郵件。
