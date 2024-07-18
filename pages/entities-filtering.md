---
layout: default
title: 篩選
permalink: /entities-filtering/
sitemap:
    priority: 0.7
    lastmod: 2017-08-22T00:00:00-00:00
---

# <i class="fa fa-filter"></i> 篩選實體

## 介紹

在為實體實現基本的CRUD功能之後，非常常見的請求是為實體的屬性建立各種過濾器，因此可以更有效地使用服務。
這些過濾器應作為請求引數傳送，因此任何前端-和任何瀏覽器-都可以使用它。
此外，這些過濾器應遵循合理而簡潔的模式，並且必須允許它們自由組合。

## 如何啟用

使用`jhipster entity`指令生成實體時，請選擇服務或服務實現以對此實體啟用過濾。

如果要啟用對現有實體的過濾，可以透過將`service`從`no`設定為`serviceClass`或`serviceImpl`並將`jpaMetamodelFiltering`設定為`true`，然後使用`jhipster entity <entity name>`>重新生成，來修改專案`.jhipster`目錄中的實體設定。

使用JDL時，請在您的JDL檔案中新增一行`filter <entity name>`，然後使用`jhipster import-jdl`指令重新匯入定義。

## 公共介面

對於每個實體，您可以在實體產生器中啟用過濾，然後，可以使用以下引數呼叫`/api/my-entity`GET端點：

* 對於每個*xyz*欄位
    * *xyz.equals=someValue*
        - 列出所有xyz等於'someValue'的實體
    * *xyz.in=someValue,otherValue*
        - 列出所有xyz等於'someValue'或'otherValue'的實體
    * *xyz.specified=true*
        - 列出所有xyz不為null的實體
    * *xyz.specified=false*
        - 列出所有xyz為null的實體
* 如果*xyz*型別為字串:
    * *xyz.contains=something*
        - 列出所有實體，其中xyz包含'something'
* 如果*xyz*是任何數字型別或日期型別
    * *xyz.greaterThan=someValue*
        - 列出所有實體，其中xyz大於'someValue'
    * *xyz.lessThan=someValue*
        - 列出所有實體，其中xyz小於'someValue'
    * *xyz.greaterOrEqualThan=someValue*
        - 列出所有實體，其中xyz大於或等於'someValue'
    * *xyz.lessOrEqualThan=someValue*
        - 列出所有實體，其中xyz小於或等於'someValue'

它們可以自由組合。

體驗此過濾器API的表達力的一種好方法是在JHipster應用程式的API文件頁面的swagger-ui中使用它。

![]({{ site.url }}/images/entities_filtering_swagger.png)

## 實現

啟用此功能後，將生成一個名為`EntityQueryService`和`EntityCriteria`的新服務。Spring會將請求引數轉換為`EntityCriteria`類別的欄位。

在`EntityQueryService`中，我們將條件物件轉換為靜態物件、型別安全的JPA查詢物件。為此，**需要**在建立中**啟用靜態元模型生成**。有關詳細訊息，請參見[JPA靜態元模型產生器文件](http://docs.jboss.org/hibernate/orm/current/topical/html_single/metamodelgen/MetamodelGenerator.html)。

為了證明所生成的條件是正確的，並且Spring設定正確，對`EntityResourceIntTest`進行了擴充套件，增加了許多測試用例，每個過濾器一個測試用例。

### Angular
使用Angular時，利用此有用功能的正確方法如下所示：
* Equals (`contains` 和 `notEquals`相同)
```javascript
this.bookService.query({'title.equals':someValue}).subscribe(...);
```
* greaterThan (同樣適用於`lessThan`、`greaterOrEqualThan`、`lessOrEqualThan`，資料型別`date` 和 `number` 適用)
```javascript
this.bookService.query({'id.greaterThan':value}).subscribe(...);
this.bookService.query({'birthday.lessOrEqualThan':value}).subscribe(...);
```
* In (同樣適用於`notIn`)
```javascript
this.bookService.query({'id.in':[value1, value2]}).subscribe(...);
```
* Specified
```javascript
this.bookService.query({'author.specified':true}).subscribe(...);
```

## 侷限性

當前，僅支援SQL資料庫（帶有JPA）以及單獨的服務或單獨的服務實現/介面組合。
