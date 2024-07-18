---
layout: default
title: JHipster領域語言 (JDL) - 實體和屬性
permalink: /jdl/entities-fields
sitemap:
    priority: 0.5
    lastmod: 2019-10-27T12:00:00-00:00
---

# <i class="fa fa-star"></i> JHipster領域語言 (JDL) - 實體和屬性

## 概要

1. [語法](#語法)
1. [範例](#範例)
   1. [簡單例子](#簡單例子)
   1. [自定義表名](#自定義表名)
   1. [屬性](#屬性)
   1. [屬性校驗](#屬性校驗)
   1. [宣告二進位](#宣告二進位)
   1. [正則表示式](#正則表示式)
   1. [註解](#註解)
1. [欄位型別和校驗](#欄位型別和校驗)

---

### 語法

實體宣告如下：
```
[<entity javadoc>]
[<entity annotation>*]
entity <entity name> [(<table name>)] {
  [<field javadoc>]
  [<field annotation>*]
  <field name> <field type> [<validation>*]
}
```

  - `<entity name>` 實體名稱，
  - `<field name>` 實體屬性名稱，
  - `<field type>` JHipster支援的屬性型別，
  - 以下為可選項：
    - `<entity javadoc>` 實體描述，
    - `<entity annotation>`  實體的選項（有關可用選項的完整清單，請參見[選項][]），
    - `<table name>` 資料庫表名稱（如果要指定與實體名稱自動轉換不同的名稱），
    - `<field javadoc>` 屬性描述，
    - `<field annotation>` 屬性的選項，
    - `<validation>` 屬性的校驗規則。

---

### 範例

### 簡單例子

```jdl
entity A
```

這等效於：

```jdl
entity A(a) {}
```

前者是一種較簡單的形式，沒有指定"主體"（欄位的大括號）和表名。

---

#### 自定義表名

也可以指定自定義表名稱：

```jdl
 entity A(my_super_entity)
```

---

#### 屬性

```jdl
entity A {
  name String required
  age Integer
}
```

---

#### 屬性校驗

```jdl
entity A {
  name String required
  age Integer min(42) max(42)
}
```

---

#### 宣告二進位

JHipster提供了一個不錯的選擇，因為可以在影象型別或任何二進位型別之間進行選擇。 JDL允許您執行相同的操作。
使用編輯器建立一個自定義類型（請參閱DataType），並根據以下約定為其命名：
  - `AnyBlob` 或 `Blob` 建立一個"任意"的二進位型別的欄位；
  - `ImageBlob` 建立一個影象的欄位。
  - `TextBlob` 為CLOB（長文字）建立一個欄位。

而且，您可以根據需要建立任意數量的資料型別。

---

#### 正則表示式

這是一個確定的驗證（僅適用於String型別），其語法為：

```jdl
entity A {
  name String pattern(/^[A-Z][a-z]+\d$/)
}
```

讓我們分解一下：
  - `pattern` 是用於宣告正則表示式驗證的關鍵字（使用常規括號）
  - `/.../` 該模式在兩個斜槓內宣告
  - `\` 反斜杆不需要進行轉義

---

#### 註解

可以在JDL中對實體和欄位進行註解，並且註解會生成文件（Javadoc或JSDoc，取決於後端）。

```jdl
/**
 * This is a comment
 * about a class
 * @author Someone
 */
entity A {
  /**
   * This comment will also be used!
   * @type...
   */
   name String
   age Integer // this is yet another comment
}
```

這些註解稍後將由JHipster新增為Javadoc註解。 JDL擁有自己的註解型別：
  - // an ignored comment
  - /** not an ignored comment */

因此，以`//`開頭的任何內容都被視為JDL的內部註解，因此不會被視為Javadoc。
請注意，在解析期間，以`＃`開頭的JDL Studio指令將被忽略。

註解的另一種形式是以下註解：
```
entity A {
  name String /** My super field */
  count Integer /** My other super field */
}
```

在這裡，A的名稱將用 `My super field`註解，B則用 `My other super field`註解。

是的，逗號不是強制性的，但最好不要使用逗號，以免在程式碼中出錯。
**如果您想混合使用逗號和以下註解，請當心！**
```
entity A {
  name String, /** My comment */
  count Integer
}
```
A的名字將沒有註解（because the count will）。

---

### 欄位型別和校驗

每個欄位型別都有其自己的校驗清單。 以下是JDL支援的型別：

<table class="table table-striped table-responsive">
  <tr>
    <th>JDL型別</th>
    <th>校驗規則</th>
  </tr>
  <tr>
    <td>String</td>
    <td><dfn>required, minlength, maxlength, pattern, unique</dfn></td>
  </tr>
  <tr>
    <td>Integer</td>
    <td><dfn>required, min, max, unique</dfn></td>
  </tr>
  <tr>
    <td>Long</td>
    <td><dfn>required, min, max, unique</dfn></td>
  </tr>
  <tr>
    <td>BigDecimal</td>
    <td><dfn>required, min, max, unique</dfn></td>
  </tr>
  <tr>
    <td>Float</td>
    <td><dfn>required, min, max, unique</dfn></td>
  </tr>
  <tr>
    <td>Double</td>
    <td><dfn>required, min, max, unique</dfn></td>
  </tr>
  <tr>
    <td>Enum</td>
    <td><dfn>required, unique</dfn></td>
  </tr>
  <tr>
    <td>Boolean</td>
    <td>required, unique</td>
  </tr>
  <tr>
    <td>LocalDate</td>
    <td><dfn>required, unique</dfn></td>
  </tr>
  <tr>
    <td>ZonedDateTime</td>
    <td><dfn>required, unique</dfn></td>
  </tr>
  <tr>
    <td>Instant</td>
    <td><dfn>required, unique</dfn></td>
  </tr>
  <tr>
    <td>Duration</td>
    <td><dfn>required, unique</dfn></td>
  </tr>
  <tr>
    <td>UUID</td>
    <td><dfn>required, unique</dfn></td>
  </tr>
  <tr>
    <td>Blob</td>
    <td><dfn>required, minbytes, maxbytes, unique</dfn></td>
  </tr>
  <tr>
    <td>AnyBlob</td>
    <td><dfn>required, minbytes, maxbytes, unique</dfn></td>
  </tr>
  <tr>
    <td>ImageBlob</td>
    <td><dfn>required, minbytes, maxbytes, unique</dfn></td>
  </tr>
  <tr>
    <td>TextBlob</td>
    <td><dfn>required, unique</dfn></td>
  </tr>
</table>

[選項]: 選項#可用選項 "選項"
