---
layout: default
title: 設定新語言
permalink: /installing-new-languages/
redirect_from:
  - /installing_new_languages.html
sitemap:
    priority: 0.7
    lastmod: 2014-12-10T00:00:00-00:00
---

# <i class="fa fa-flag"></i> 國際化

## 介紹

在生成新專案的過程中，系統將詢問您是否要啟用國際化支援。

如果啟用它，則需要選擇應用程式的預設語言。之後，您可以選擇要安裝的其他語言。如果您不想從一開始就支援任何其他語言，也可以隨時在以後需要時透過執行語言子產生器來新增新的語言。

如果您確定永遠不會將此應用程式翻譯成另一種語言，則不應啟用國際化。

## 支援的語言

這些是當前支援的語言

*   Albanian
*   Arabic (Libya)
*   Armenian
*   Belarusian
*   Bengali
*   Bulgarian
*   Catalan
*   Chinese (Simplified)
*   Chinese (Traditional)
*   Czech
*   Danish
*   Dutch
*   English
*   Estonian
*   Farsi
*   Finnish
*   French
*   Galician
*   German
*   Greek
*   Hindi
*   Hungarian
*   Indonesian
*   Italian
*   Japanese
*   Korean
*   Marathi
*   Myanmar
*   Polish
*   Portuguese (Brazilian)
*   Portuguese
*   Romanian
*   Russian
*   Slovak
*   Serbian
*   Sinhala
*   Spanish
*   Swedish
*   Turkish
*   Tamil
*   Telugu
*   Thai
*   Turkish
*   Ukrainian
*   Uzbek (Cyrillic)
*   Uzbek (Latin)
*   Vietnamese

JHipster中缺少您的語言嗎？透過送出PR來幫助我們改善專案！

## 專案生成後如何新增語言？

為此，您可以使用以下指令執行語言子產生器：

`jhipster languages`

![]({{ site.url }}/images/install_new_languages.png)

請注意，如果您想以現在新增的語言翻譯實體，則需要重新生成實體。

## 如何新增不支援的新語言？

所有語言都儲存在資料夾`src/main/webapp/i18n`（用戶端）和`src/main/resources/i18n`（伺服器端）中

以下是安裝一種稱為 `new_lang`的新語言的步驟：

1.  將`src/main/webapp/i18/en`資料夾複製到`src/main/webapp/i18/new_lang` （這是所有前端翻譯檔案的儲存位置）
2.  翻譯檔案夾`src/main/webapp/i18/new_lang`下的所有檔案
3.  將語言程式碼`new_lang`新增到`src/main/webapp/app/shared/language/find-language-from-key-pipe.ts`中定義的`languages`變數中。
```js
        private languages: { [key: string]: { name: string; rtl?: boolean } } = {
            en: { name: 'English' },
            new_lang: { name: 'New Language' }
            // jhipster-needle-i18n-language-key-pipe - JHipster will add/remove languages in this object
        };
```
4.  在`src/main/resources/i18n`資料夾中，將`messages_en.properties`檔案複製到`messages_new_lang.properties`（這是伺服器端翻譯儲存位置）
5.  翻譯`messages_new_lang.properties`檔案中的所有keys
6.  將新的語言捆綁新增到`webpack/webpack.common.js`中
```js
        new MergeJsonWebpackPlugin({
            output: {
                groupBy: [
                    { pattern: "./src/main/webapp/i18n/en/*.json", fileName: "./i18n/en.json" },
                    { pattern: "./src/main/webapp/i18n/new_lang/*.json", fileName: "./i18n/new_lang.json" }
                    // jhipster-needle-i18n-language-webpack - JHipster will add/remove languages in this array
                ]
            }
        })
```

新的語言`new_lang`現在在語言選單中可用，並且在前端Angular應用程式和後端Spring應用程式中均可用。

### 送出新語言給generator-jhipster

如果您想為生成器提供一種新的語言，請按照上面的步驟1、2、4和5進行操作。將新語言的條目新增到`generators/generator-constants.js`中的`LANGUAGES`常數中，並將該語言新增到`generator-jhipster`專案中的`test/templates/all-languages/.yo-rc.json`中。送出包括所有這些變更的PR。
如果您想為生成器提供一種新的語言，請執行以下步驟。

- 在將語言新增到`LANGUAGES`常數中 [`generators/gnerator-constants.js`](https://github.com/jhipster/generator-jhipster/blob/main/generators/generator-constants.js)
```js
        { name: 'New Language', dispName: 'New Language', value: 'nl' }
```

- 複製檔案[`generators/languages/templates/src/main/resources/i18n/messages_en.properties.ejs`](https://github.com/jhipster/generator-jhipster/blob/main/generators/languages/templates/src/main/resources/i18n/messages_en.properties.ejs) 到`generators/languages/templates/src/main/resources/i18n/messages_nl.properties.ejs`並將所有值轉換為新語言。

- 複製資料夾[`generators/languages/templates/src/main/webapp/i18n/en`](https://github.com/jhipster/generator-jhipster/tree/main/generators/languages/templates/src/main/webapp/i18n/en) 到 `generators/languages/templates/src/main/webapp/i18n/nl`並翻譯其中的所有檔案。

- 複製檔案[`generators/entity-i18n/templates/i18n/entity_en.json.ejs`](https://github.com/jhipster/generator-jhipster/blob/main/generators/entity-i18n/templates/i18n/entity_en.json.ejs) 到 `generators/entity-i18n/templates/i18n/entity_nl.json.ejs` 並翻譯其中的所有值。

- 複製檔案[`generators/languages/templates/src/test/resources/i18n/messages_en.properties.ejs`](https://github.com/jhipster/generator-jhipster/blob/main/generators/server/templates/src/test/resources/i18n/messages_en.properties.ejs) 到 `generators/languages/templates/src/test/resources/i18n/messages_nl.properties.ejs`並翻譯其中的所有值。

- 將語言值`nl`新增到[`test/templates/all-languages/.yo-rc.json`](https://github.com/jhipster/generator-jhipster/blob/main/test/templates/all-languages/.yo-rc.json) 中的`language`陣列中。

送出所有這些更改的PR。

## 如何刪除現有語言？

以下是刪除稱為`old_lang`的語言的步驟：

1.  從`src/main/webapp/i18/old_lang`刪除整個語言資料夾
2.  刪除 `src/main/webapp/app/core/language/language.constants.ts`中的LANGUAGES常數條目。
3.  刪除`src/main/webapp/app/shared/language/find-language-from-key.pipe.ts`中的`languages`常數條目。
4.  刪除`webpack/webpack.prod.js`刪除中的localesToKeep常數條目
5.  刪除`webpack/webpack.common.js`中`MergeJsonWebpackPlugin`的模式。
6.  刪除`src/main/resources/i18n/messages_old_lang.properties`檔案
7.  刪除`src/test/resources/i18n/messages_old_lang.properties`檔案

