---
layout: default
title: 使用OAuth2啟用第三方登入
sitemap:
priority: 0.1
lastmod: 2018-03-18T18:20:00-00:00
---
# 使用OAuth2啟用第三方登入

使用OAuth2身份驗證型別時，您的應用會連線到OpenID Connect伺服器，例如Okta或Keycloak。 透過在管理控制台內新增外部身份提供商，可以啟用第三方登入。

## 使用Okta新增身份提供者

Okta支援Facebook，Microsoft，Google，LinkedIn和自定義SAML提供程式。

Log into the Okta console and navigate via the menu to "Users" -> "Social & Identity Providers".  Choose "Add Identity Provider" and add the provider of your choice.  Make sure to completely follow the [Okta Social Login documentation](https://developer.okta.com/authentication-guide/social-login/) which guides you in obtaining the client ID and secret for each provider.

## 使用Keycloak新增身份提供者

Keycloak支援GitHub，Twitter，Facebook，Openshift，Google，Gitlab，LinkedIn，Microsoft，BitBucket，StackOverflow和自定義SAML提供程式。

登入Keycloak管理控制台，然後從左側選單中選擇"Identity Providers"。 請按照[Keycloak社交登入文件](https://www.keycloak.org/docs/latest/server_admin/index.html#social-identity-providers) 中的說明進行操作，以設定提供程式並獲取用戶端ID和密碼 。