---
layout: default
title: 建立一個控制器
permalink: /creating-a-spring-controller/
sitemap:
    priority: 0.7
    lastmod: 2019-02-01T00:00:00-00:00
---

# <i class="fa fa-bolt"></i> 建立一個Spring控制器

## 介紹

_注意：此子產生器比建立完整CRUD實體的[實體子產生器]({{ site.url }}/creating-an-entity/)簡單得多_

該子產生器生成一個Spring MVC REST Controller。它還能夠建立一些REST方法。

為了生成名為『Foo』的Spring MVC REST控制器，輸入：

`jhipster spring-controller Foo`

子產生器將詢問您要生成哪種方法：只需提供需要使用的方法名稱和HTTP請求方法，就會生成一個簡單的方法。

## Can we document this Spring MVC REST Controller with Swagger? （我們可以使用Swagger來自動生成這個Spring MVC REST Controller API文件嗎？）

沒錯! 已經實現了！在`dev`模式下，使用`Administration > API`選單即可訪問Swagger UI並開始使用生成的控制器。

## Can we add security to Spring MVC REST Controllers? （我們可以在Spring MVC REST控制器上增加安全屬性嗎？）

可以! 在您的類或方法上新增Spring Security的`@Secured`註解，然後使用提供的`AuthoritiesConstants`類即可限制對特定使用者許可權的訪問。

## Can we proxy it from our Microservice Gateway dev server? （我們可以代理到微服務架構的Gateway開發服務上嗎？）

可以! 將服務名新增到`webpack/webpack.dev.js`中的代理設定中
```javascript

module.exports = (options) => webpackMerge(commonConfig({ env: ENV }), {
    devtool: 'eval-source-map',
    devServer: {
        contentBase: './target/www',
        proxy: [{
            context: [
                '/<servicename>',
                /* jhipster-needle-add-entity-to-webpack - JHipster will add entity api paths here */
                ....
```
