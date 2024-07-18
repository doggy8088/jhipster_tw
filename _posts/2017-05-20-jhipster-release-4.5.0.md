---
layout: default
title: 發布 v4.5.0
---

JHipster release 4.5.0
==================

Introducing the JHipster CLI
----------

This new release has a very important update, that will affect everyone: the JHipster CLI!

This means that instead of typing `yo jhipster`, you will just type `jhipster` on the command line.

- Everybody will gain 3 keystrokes, an important productivity enhancement :-)
- Most importantly, this allows us to provide autocompletion (only on Mac and Linux), which means you can use the tab key after entering `jhipster`. As this is the first release, we only provide basic autocompletion for the moment, but you can expect more in the future.

OpenShift support by Red Hat
----------

Please note that this is an **official contribution from Red Hat** to the project!

Thanks to the incredible work of [Srinivasa Vasu](https://twitter.com/srinivasavasu), we now have support for deploying JHipster applications to OpenShift. Find more information on [our OpenShift documentation page]({{ site.url }}/openshift/).

Bug fixes and improvements
----------

This release contains 63 closed tickets and Pull Requests:

- Several annoying bugs have been fixed, like [#5786](https://github.com/jhipster/generator-jhipster/issues/5786), which makes this a recommended update
- Lots of unit tests and polishing, giving us an incredible score of 96.2% code coverage on our sample project! Many thanks to [Christophe Bornet](https://twitter.com/cbornet_) on this part.
- Many library upgrades, as usual

關閉的工單與合併請求
------------
一如既往, __[你可以在此處檢視所有已關閉的工單與已接受合併請求](https://github.com/jhipster/generator-jhipster/issues?q=milestone%3A4.5.0+is%3Aclosed)__.

更新指引
------------

**自動升級**

在已存在的專案上使用[JHipster upgrade sub-generator]({{ site.url }}/upgrading-an-application/)自動升級:

```
yo jhipster:upgrade
```

Please note that with our new JHipster CLI release, the new command will be:

```
jhipster upgrade
```

**手動升級**

選擇手動升級, 需要先升級你的Jhipster版本:

```
yarn global upgrade generator-jhipster
```

如果你已經有了一個專案, 將會繼續使用當時專案生成的Jhipster版本.
如果需要升級你的專案, 你需要先刪除`node_modules`資料夾再執行:

```
jhipster
```

更新你的專案和所有的實體類

```
jhipster --with-entities
```

你也可以使用實體類子產生器挨個更新你的實體類, 例如你的實體類別名稱字是_Foo_

```
jhipster entity Foo
```

幫助和缺陷
--------------

如果您發現這個版本的任何問題, 請隨時聯絡我們:

- 在我們的[bug tracker](https://github.com/jhipster/generator-jhipster/issues?state=open)新增一個缺陷報告
- 在[Stack Overflow](http://stackoverflow.com/tags/jhipster/info)送出問題

如果您遇到的問題是緊急錯誤或安全問題，請：

- 在推特上聯系[@jhipster](https://twitter.com/jhipster)
