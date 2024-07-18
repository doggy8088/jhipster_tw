---
layout: default
title: 使用Apache保護Kibana（基本身份驗證）
sitemap:
priority: 0.5
lastmod: 2018-01-31T14:10:00-00:00
---

# 使用Apache保護Kibana（基本身份驗證）

送出者 [@raiden0610](https://github.com/raiden0610)

## mod_proxy啟用

    a2enmod proxy
    a2enmod proxy_http
    a2enmod headers

    service apache2 restart

## 虛擬主機設定
根據您的發行版，找到您的virtualhost 443或80設定所在的位置。

例如在Ubuntu 16.04中：設定位於 **/etc/apache2/sites-availables** 目錄的 **000-default-le-ssl.conf** 檔案中。

如果您不想要SSL，請使用以下檔案 **000-default.conf**

編輯檔案，然後在virtualhost 443或80部分中將其貼上：

    # Proxying kibana listenning on the port 5601 
    ProxyPreserveHost On
    ProxyRequests On
    ProxyPass / http://localhost:5601/
    ProxyPassReverse / http://localhost:5601/
    
    # Protecting with basic authentication
    <Location />
            AuthType Basic
            AuthName "Restricted Content"
            AuthUserFile /etc/apache2/.htpasswd
            Require valid-user
       </Location>

重新載入apache config：

    service apache2 reload
    
## 生成使用者名/密碼

    htpasswd /etc/apache2/.htpasswd your_user
    
## 啟用SSL
按照教程操作（您可以選擇ditros）：[讓我們加密-Certbot]（https://certbot.eff.org/）

Certbot會自動為您處理Apache中的SSL設定

<div class="alert alert-warning"><i> 警告：</i>
<b>不要忘記關閉防火牆中的5601連接埠！</b> 因為如果您不這樣做，即使沒有連接埠5601上的基本身份驗證，kibana仍然可以訪問
</div>

瞧，您現在可以在https://mydomain.com或http://mydomain.com上以安全的方式訪問kibana。