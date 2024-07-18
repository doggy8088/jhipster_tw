---
layout: default
title: JHipster 領域語言 (JDL) - 關聯關係
permalink: /jdl/relationships
sitemap:
    priority: 0.5
    lastmod: 2019-11-03T12:00:00-00:00
---

# <i class="fa fa-star"></i> JHipster 領域語言 (JDL) - 關聯關係

## 概要

1. [關聯型別](#關係型別)
1. [關係方法](#關係方法)
1. [多個關係體](#多個關係體)
1. [語法](#語法)
1. [範例](#範例)
   1. [簡單例子](#簡單例子)
   1. [關係屬性名](#關係屬性名)
   1. [與屬性（欄位）聯合](#與屬性（欄位）聯合)
   1. [方法使用](#方法使用)
   1. [非空設定](#非空設定)
   1. [自反關係](#自反關係)
   1. [註解](#註解)

---

### 關係型別

在`relationship`關鍵字之後是以下內容。

有四種關係型別：
  - `OneToOne`
  - `OneToMany`
  - `ManyToOne`
  - `ManyToMany`

要了解有關關係以及可能實現的更多訊息，可以前往[關聯關係](/managing_relationships).

關於複數名稱的說明：JHipster會處理它們，這樣您就不必在關係中處理了。

---

### 關係方法

在源實體和目標實體之後是關係方法，與`with`關鍵字一起使用。

支援的方法：
  - `jpaDerivedIdentifier`: `@MapsId` 用於關聯關係 (**僅適用於OneToOne**)

---

### 多個關係體

如果您厭倦了JDL檔案中具有相同型別的關係宣告，請不用擔心！ 有一個解決方案。

以這個JDL範例為例：
```jdl
relationship OneToOne {
  A to B
}
relationship OneToOne {
  B to C
}
relationship OneToOne {
  C to D
}
relationship OneToOne {
  D to A
}
```

該解決方案由具有每一種關係體內的關係的宣告，如下所示：
```jdl
relationship OneToOne {
  A to B,
  B to C,
  C to D,
  D to A
}
```

在以下情況下，此語法非常有用：
  - 你有許多相同型別的關係，
  - 你想知道這些關係是什麼，
  - 你不想浪費時間在JDL檔案中尋找它們

---

### 語法

關係宣告如下：
```
relationship (OneToMany | ManyToOne | OneToOne | ManyToMany) {
  <from entity>[{<relationship name>[(<display field>)]}] to <to entity>[{<relationship name>[(<display field>)]}]+
}
```

  - `(OneToMany | ManyToOne| OneToOne | ManyToMany)` 是你的關係型別
  - `<from entity>` 是關係的實體所有者的名稱：源實體，
  - `<to entity>` 是關係要到達的實體的名稱：目的實體，
  - `<relationship name>` 是具有另一端型別的屬性名稱，
  - `<display field>` 是應顯示在選擇框中的欄位名稱（預設值：`id`），
  - `required` 引入的關係屬性是否不能為空。
  - `with jpaDerivedIdentifier` 或 `@MapsId` 用於關聯關係 (僅適用於一對一（one-to-one）
  - 而且您可以擁有多個關係主體
    - 可以檢視 [多關係主體](#多關係主體) 部分以獲取更多訊息！

---

### 範例

### 簡單例子

```jdl
relationship OneToOne {
  A to B
}
```

請注意，此範例與以下範例相同：
```jdl
relationship OneToOne {
  A{b} to B
}
```

不指定引入屬性名是使用具有單向關係的簡短形式。

---

#### 關係屬性名

```jdl
relationship ManyToMany {
  A{b} to B{a}
}
```

這是一種雙向關係，這意味著兩個實體將在另一個實體的"實例"下生成實體。

---

#### 與屬性（欄位）聯合

用於指定實體中的哪一列用於join聯接（預設為`id`）。

```jdl
relationship OneToOne {
  A{b(name)} to B{a(name)}
}
```

它大致翻譯為SQL： `JOIN B b with a.name = b.name`

---

#### With 方法

```jdl
relationship OneToOne {
  A to B with jpaDerivedIdentifier
}
```

---

#### 非空的設定

用於使至少需要一個關係。

```jdl
relationship ManyToMany {
  A{b required} to B{a}
}

// or

relationship ManyToMany {
  A{b} to B{a required}
}

or

relationship ManyToMany {
  A{b(name) required} to B{a required}
}
```

---

#### 自反關係

自反關係是指源實體和目標實體相同的關係。

```jdl
relationship ManyToMany {
  A{parent} to A{child}
}
```

---

#### 關於自反性關係中非空設定的說明

如前所述 [此外](https://github.com/jhipster/generator-jhipster/issues/11495)，不支援與同一實體的非空設定。 問題是，一個child必須**總是**有一個父母，而parent又必須也有一個child，等等。
一個可能的解決方法是擁有顯式的根實體和子實體。

----

#### 註解

可以為關係新增註解：

```jdl
relationship OneToOne {
  /** This comment will be put before b in entity A*/
  A{b}
  to
  /** This comment will be put before a in entity B*/
  B{a}
}
```

此處應用了相同的註解規則。
這些註解稍後將由JHipster新增為Javadoc註解。 JDL擁有自己的註解型別：
  - // an ignored comment
  - /** not an ignored comment */

因此，以`//`開頭的任何內容都被視為JDL的內部註解，因此不會被視為Javadoc。
請注意，在解析期間，以`＃`開頭的JDL Studio指令將被忽略。
