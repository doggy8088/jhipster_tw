---
layout: default
title: JHipster 領域語言 (JDL) - 列舉
permalink: /jdl/enums
sitemap:
    priority: 0.5
    lastmod: 2019-10-27T12:00:00-00:00
---

# <i class="fa fa-star"></i> JHipster 領域語言 (JDL) - 列舉

## 概要

1. [語法](#語法)
1. [範例](#範例)
   1. [簡單例子](#簡單例子)
   1. [宣告值](#宣告值)
   1. [註解](#註解)

---

### 語法

列舉宣告如下：

```
enum [<enum name>] {
  <ENUM KEY> ([<enum value>])
}
```

  - 列舉項是必須定義的
    - 並且必須使用大寫鍵
  - 列舉項的值是可選的，並且必須用括號括起來

---

### 範例

### 簡單例子

```jdl
enum Country {
  BELGIUM,
  FRANCE,
  ITALY
}
```

And its use:

```jdl
enum Country {}

entity A {
  country Country
}
```

---

#### With values

從JHipster Core v6開始，列舉值可以具有顯式值：

```jdl
enum Country {
  BELGIUM (Belgium),
  FRANCE (France),
  ITALY (Italy)
}
```

---

#### 註解

就像關係，實體和欄位一樣，列舉也可以使用相同的規則進行註解。

稍後，JHipster會將註解作為Javadoc註解新增。 JDL擁有自己的註解型別：
  - // an ignored comment
  - /** not an ignored comment */

因此，以`//`開頭的任何內容都被視為JDL的內部註解，因此不會被視為Javadoc。
請注意，在解析時，以`＃`開頭的JDL Studio指令將被忽略。

```jdl
/** This comment will be taken into account */
enum Country {
  // But not this one!
  FRANCE
}
```
