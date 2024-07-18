---
layout: default
title: JHipster-UML
permalink: /jhipster-uml/
redirect_from:
  - /jhipster_uml.html
sitemap:
    priority: 0.5
    lastmod: 2017-11-27T12:00:00-00:00
---

# <i class="fa fa-magic"></i> JHipster-UML

請注意，該專案已過時，不再使用。

替代方案，我們建議您使用此項目的JDL匯出功能將XMI檔案匯出到可以使用的JDL檔案，並透過JDL Studio建立實體模型。

要了解有關JDL的更多訊息，請前往[JDL]({{ site.url }}/jdl/)。

***

JHipster-UML是一個JHipster子專案，可以用來代替[實體子產生器]({{ site.url }}/creating-an-entity/)。這個想法是，使用視覺工具來[管理關係]({{ site.url }}/managing-relationships/)比使用經典的Yeoman問答更容易。

JHipster-UML專案 [可在GitHub上獲得](https://github.com/jhipster/jhipster-uml/)，它是一個開源專案，類似JHipster（Apache 2.0許可證）。如果您喜歡這個專案，別忘了在GitHub上給我們加星！

這是此頁面上介紹的內容：

1. [介紹](#introduction)
2. [問題與錯誤](#issues)
3. [安裝](#install)
4. [如何使用JHipster-UML](#howtouse)  
    4.1. [UML檔案](#umlfile)  
    4.2. [使用JHipster-UML](#usejuml)  
    4.3. [生成了什麼](#whatsgenerated)  
    4.4. [JHipster筆記](#jhipsternotes)  
    4.5. [保留字](#reservedwords)  
5. [範例](#examples)  
    5.1. [Modelio](#modelioexample)  
    5.2. [UML Designer](#umldesignerexample)  
    5.3. [GenMyModel](#genmymodelexample)  
    5.4. [其他編輯器](#othereditors)  
    5.5. [列舉](#enumerationexamples)  
    5.6. [表名](#tablenames)  
    5.7. [必要的關係](#requiredrels)  
6. [測試](#testing-juml)
7. [貢獻：問題和提升](#contributing)  
    7.1. [解析器修改](#parsermodifications)
8. [附錄](#annexes)

***

# <a name="introduction"></a>介紹

JHipster-UML是常用的問答式實體產生器替代方法，因為它使您可以使用UML編輯器建立將由JHipster-UML解析的圖。

這是我們支援的編輯器清單：

  - [Modelio](https://www.modeliosoft.com/);
  - [UML Designer](http://www.umldesigner.org/);
  - [GenMyModel](https://www.genmymodel.com/) (not free, but online).

***

# <a name="issues"></a>問題與錯誤

JHipster-UML[在GitHub上可用](https://github.com/jhipster/jhipster-uml)，並[遵循與JHipster相同的貢獻準則](https://github.com/jhipster/generator-jhipster/blob/main/CONTRIBUTING.md)。

請使用我們的專案送出問題和Pull Requests：

- [JHipster-UML issue tracker](https://github.com/jhipster/jhipster-uml/issues)
- [JHipster-UML Pull Requests](https://github.com/jhipster/jhipster-uml/pulls)

送出任何內容時，您都必須儘可能精確：
  - **一個isuue必須只包含一個問題**  (一個需求或一個問題);
  - 歡迎Pull requests，但是送出日誌必須簡潔明瞭，具有」原子」可讀性。

請注意，使用JHipster-UML（或JHipster）可能會很麻煩（必須安裝一些工具才能不會出現任何問題，真正使用Node環境）。如果您在Windows上遇到問題，此[連結](https://gist.github.com/nullivex/7115612)可能會有所幫助。
    
在Windows上可能遇到的另一個問題是[這個](https://stackoverflow.com/questions/30344858/node-script-executable-not-working-on-mac-env-node-r-no-such-file-or-directo#answer-30349952)。該連結提供了解決此問題的解決方案。

最後，Windows使用者使用Git Bash報告的一個問題。JHipster產生器的問題（來自InquirerJS），無法正常工作（使用者在回答問題時陷入困境）。使用JHipster UML（或JHipster）時，可能要使用Powershell或其他Shell。

***

# <a name="install"></a>安裝
要安裝JHipster UML，使用以下指令：

 ```
   npm install -g jhipster-uml
   # or
   yarn global add jhipster-uml
 ```

但是，如果您不希望在全域安裝最新版本，因為它與您的產生器版本不對應（請參見下文），或者您希望僅在當前目錄安裝，請使用以下指令：

  ```
    npm install jhipster-uml --save-dev
    # or
    yarn add jhipster-uml --dev
  ```

如果您想要一個『前衛』的（幾乎完全可以安全使用）版本，則可以從[我們GitHub專案](https://github.com/jhipster/jhipster-uml)中克隆git repo：

  `git clone https://github.com/jhipster/jhipster-uml.git` 用於HTTPS

  `git clone git@github.com:jhipster/jhipster-uml.git` 用於SSH


JHipster UML是 _可以_ 與JHipster的產生器一起使用的工具。如果您使用的是v3.0.0之前的產生器，則必須使用JHipster UML v1.6.5（最新修補版本）。否則，使用v2.0.0+是產生器v3.0.0+的選擇。

***

# <a name="howtouse"></a>如何使用它
使用JHipster-UML，您需要在XMI中匯出一個類圖，JHipster-UML就會對其進行解析以建立您的實體。

## <a name="umlfile"></a>UML檔案

類圖應該對JHipster應用程式域的實體進行建模，因此存在一些限制，必須遵循這些方法。

### 實體
每個實體都由一個類表示，其欄位是該類別的屬性。屬性必須具有JHipster支援的型別，否則它將不起作用。要使JHipster支援『BigDecimal』，『LocalDate』…等型別，可以為其建立 _PrimitiveType_ 或 _DataType_。您可以在[此處](#annexes)檢視具有JHipster支援的所有型別的表格以及可用於每種型別的驗證方式。

![Book Entity]({{ site.url }}/images/jhipsteruml_book_datatype.png)

這是為JHipster正確建立的類別的範例。具有屬性 _publicationDate_ 和 _price_，它們的型別為 _BigDecimal_ 和 _LocalDate_，我們將其建立為 _DataType。_
請注意，您不需要將型別名稱大寫（**除了諸如BigDecimal**，JHipster-UML的組合名稱大寫名稱）之外。

### 關係
我們使用JHipster中的範例來展示如何使用編輯器。
請注意，我們**僅**支援[關係管理]({{ site.url }}/managing-relationships/)頁面中列出的關係。

#### 一對一
![One-to-One]({{ site.url }}/images/jhipsteruml_bi_oto.png)

在這裡，我們在Driver和Car之間存在雙向一對一關係，其中駕駛員為該關係的所有者。

如果您正在尋找單向關係：

![One-to-One2]({{ site.url }}/images/jhipsteruml_uni_oto.png)

請注意，為了實現單向關係，我們刪除了`citizen`標籤，以便`Passport`沒有包含它。

#### 一對多
![One-to-Many]({{ site.url }}/images/jhipsteruml_bi_otm.png)

在這種雙向關係中，所有者可以擁有許多汽車，而一輛汽車只能具有一個所有者。

JHipster尚不支援一對多關係的單向關係（有關此訊息，請參閱[此]({{ site.url }}/managing-relationships/#3頁面）。這是這種關聯的一個範例：

![One-to-Many2]({{ site.url }}/images/jhipsteruml_uni_otm.png)


#### 多對一

如先前所示，一對多關係的等效關係是多對一：

![One-to-Many2]({{ site.url }}/images/jhipsteruml_uni_mto.png)

現在，汽車知道了它們的所有者，但相反卻不可以。

#### 多對多
![Many-to-Many]({{ site.url }}/images/jhipsteruml_bi_mtm.png)

在這裡，我們在車（所有者）和駕駛員之間建立了多對多關係。

#### 宣告要用於在Angular中顯示關係的欄位
為此，必須在注入的欄位名稱之後的`(``)`之間新增欄位名稱。

在一對多關係中，您可以將其新增到關係的'Many'側：

- UML

![otherEntityField One-to-Many]({{ site.url }}/images/jhipsteruml_otherEntityFieldOM.jpeg)

- JDL

      relationship OneToMany {
        One{many} to Many{one(<otherEntityField>)}
      }

在多對多關係中，您可以將其新增到實體的所有者側：

- UML

![otherEntityField Many-to-Many]({{ site.url }}/images/jhipsteruml_otherEntityFieldMM.jpeg)

- JDL

      relationship ManyToMany {
        Owner{notOwner(<otherEntityField>)} to NotOwner{owner}
      }


#### 自反案例
![Reflexivity]({{ site.url }}/images/jhipsteruml_reflexivity.png)

如您所見，自反性有3種類型。JHipster-UML僅支援前兩個（一對一和一對多）。**不**支援多對多情況，因為：

  - 這可能導致模型過於複雜和錯誤；
  - JHipster不支援（這是一件好事）。


### 一個完整的例子
我們使用[此處](http://docs.oracle.com/cd/B28359_01/server.111/b28328/diagrams.htm#G5482)提供的Oracle HR範例中的圖表。

以下是此圖表的螢幕截圖（來自Modelio）：
![HR UML diagram]({{ site.url }}/images/jhipsteruml_overviewdiagram.png)

如您所見，我們對其進行了更改，以使其更加有趣。
JHipster可以在它們之間生成實體和關聯（一對一，一對多等），並且在此範例中，我們新增了每種關聯型別（甚至是自反和繼承）。JHipster尚不支援繼承（但JHipster支援自反，但會警告），但我們決定將其包括在範例中，以便具有堅實的基礎。

## <a name="usejuml"></a>使用JHipster-UML

設定好JHipster應用程式並在UML編輯器中建立類圖後，請按照以下步驟操作：

- 第1步-將類圖匯出為XMI檔案格式

- 第2步-在您的JHipster應用程式根資料夾中，執行指令

 `jhipster-uml <your_file.xmi>`

請注意，您不需要提供資料庫型別（sql，mongodb或cassandra），因為JHipster-UML會從 _.yo-rc.json_ 檔案中為您檢測到該類別型。

但是，如果您希望在JHipster應用程式外部執行JHipster-UML，則需要傳遞一個額外的引數：資料庫型別名稱。
這是要執行的指令：

 `jhipster-uml <your_file.xmi> [--db (sql | mongodb | cassandra)]`

也可以生成JHipster DTO，傳遞`--dto`引數即可啟用此功能。

 `jhipster-uml <your_file.xmi> [--db (sql | mongodb | cassandra)] [--dto]`

您可以使用`--paginate`為實體選擇分頁。

 `jhipster-uml <your_file.xmi> [--db (sql | mongodb | cassandra)] [--paginate]`

最後，您可以使用`--service`為您的實體選擇服務。

 `jhipster-uml <your_file.xmi> [--db (sql | mongodb | cassandra)] [--service]`

**請注意，使用`paginate`選項而不選擇任何實體來生成分頁，將取消您選擇使用此選項的選擇。**

最後，如果您需要幫助，也可以使用以下指令：

 `jhipster-uml --help`


* 步驟3-就是這樣！


**注意：如果要使用可用的類別和方法，則JHipster-UML的首選入口點是ParserFactory（這樣就不必開啟，讀取檔案，查詢根元素等）。**

## <a name="jumlfile"></a>JHipster-UML檔案

可以透過指令行和/或基於JSON的設定檔案`jumlfile`來設定JHipster-UML。
幫助中描述的選項可以在兩者中使用，但是指令行優先於`jumlfile`。

### 一個具體的例子

jumlfile內容：
```json
{
  "db": "sql",
  "force": "true"
}
```
使用:
```
jhipster-uml --no-force
```
您將具有以下的選項：
- db : sql
- force : false (without force)


## <a name="whatsgenerated"></a>發生了什麼

執行JHipster-UML後，將建立 _.jhipster_ 資料夾（如果以前不存在），並以JSON格式填充XMI檔案中存在的實體。

請注意，至少可能不會生成一個實體：使用者實體。建立新應用程式時，它實際上是由JHipster搭建的（JHipster-UML會顯示警告訊息）。

接下來，這非常簡單：執行您的應用程式即可！

## <a name="jhipsternotes"></a>JHipster筆記

JHipster是一個很棒的腳手架工具，具有許多約定，使用JHipster-UML生成實體時，其中一些值得一提：

  - 您無需在實體中使用`id`欄位，因為JHipster預設會生成一個ID欄位，並且JHipster-UML會在檢測到任何ID欄位時將其刪除；
  - 您不必在關係中使用複數形式，JHipster會在需要時新增。例如，如果實體A和實體B之間存在多對多關係，那麼您不必將關係的結尾命名為`as`或`bs`，因為JHipster會自動為您做到這一點。

## <a name="reservedwords"></a>保留字

JHipster維護（*在某些條件下*）禁止的單詞清單。
例如，如果您想為您的應用程式生成實體，並且此應用程式使用Cassandra，則不能在欄位名稱或表名稱中使用`BATCH`字樣。

從v2.0.0版本開始，JHipster UML會檢測到此類單詞，並在遇到這種情況時立即引發異常。但是，當保留字不能使用或不能使用時，JHipster UML不能以100％的準確度檢測。因此，當存在使用此類關鍵字的風險時，它會向用戶發出黃色訊息警告。

***

# <a name="examples"></a>範例

這裡將討論每個編輯器，以便您知道如何獲取一個優秀的XMI檔案。

**注意：JHipster-UML可以檢測到錯誤的XMI檔案，它將顯示找到的第一個錯誤並立即退出（故障快速行為）。**

在JHipster-UML中，每個編輯器均已透過Oracle範例進行了測試。如果您希望在"dummy project"中看到範例，需為每個編輯器下載這些檔案，然後測試JHipster和JHipster-UML：

  - 使用Modelio: [modelio.xmi](https://github.com/jhipster/jhipster-uml/blob/master/test/xmi/modelio.xmi);
  - 使用UML Designer: [umldesigner.uml](https://github.com/jhipster/jhipster-uml/blob/master/test/xmi/umldesigner.uml);
  - 使用GenMyModel: [genmymodel_evolve.xmi](https://github.com/jhipster/jhipster-uml/blob/master/test/xmi/genmymodel_evolve.xmi).


## <a name="modelioexample"></a>Modelio

**Mac使用者注意：Modelio在Mac（GUI）上表現異常，可能是由於Mac上的圖形和視窗管理器引起的，因為尚未在Linux Ubuntu上對其進行診斷。它可以工作，但是互動體驗可能並不愉快。**

**重要版本說明：**  
  - Modelio v3.3已透過測試並可以正常工作，但是v3.4中存在一個錯誤，阻止使用者匯出圖表。自v3.4.1起，此錯誤已修復。
  - Modelio v3.5.X在處理雙向多對多關係時引入了一個錯誤（JHipster UML解析XMI時的錯誤是`Cannot read property '0' of undefined`）。此問題似乎已在更高版本（v3.6.X）中修復。

可在[此處](https://www.modelio.org/)免費下載Modelio。如果要下載任何3.3+版本，請確保您具有Java 8環境（否則將無法正常執行）。

範例檔案在[這裡](https://github.com/jhipster/jhipster-uml/blob/master/test/xmi/modelio.xmi)。

啟動後，建立一個專案，您將看到以下檢視：

![Empty Modelio project]({{ site.url }}/images/jhipsteruml_modelio_1.png)

請注意左側面板上的'Class Model'。您只需要'Class', 'Attributes', 'Aggregation', 'Composition'和'Data Type'物件。
您已經猜到了為什麼需要第一個2。'Aggregation'物件用於定義聚合：B聚合到A意味著A具有0、1或更多（n）個B實例。A不建立（並且銷燬）B實例。
組合意味著如果A由B（0、1或n個實例）組成，那麼它將建立，管理和銷燬B實例。

您可以使用它們中的任何一個，無論如何，解析器只會將兩者視為關聯。

在兩種情況下，基數名和關聯名都很重要。

最後，'Data Types'物件使您可以建立自定義類型（M​​odelio不建議使用的型別），例如`BigDecimal`或`LocalDate`。

在此範例中，我們將說明如何連線兩個類：

![Modelio composition example]({{ site.url }}/images/jhipsteruml_modelio_2.png)

如您所見，員工有工作（但也根本沒有工作）。解析器將注意以下幾點：

  - 兩個類（員工和工作）；
  - 兩個欄位（電子郵件和標題），它們的型別，它們屬於哪個類（每個類都包含其欄位）。沒有考慮它們的可見性；
  - 將它們連結起來的關聯以及關聯的**方向**（很重要！）；
  - 基數（1和0..1）表示一個僱員可以擁有一份工作（0或1），並且該工作不能由兩名僱員共享（在此範例中，只有一名僱員）；
  - 有一個**注入的欄位**：在員工中的job。
    
這種關聯稱為一對一。回傳上幾節以檢視其他型別的關聯。

Modelio支援約束。雙擊一個欄位，轉到'Notes and constraints'頁籤，第一個圖示應為'Add a constraint'，然後選擇'Constraint'，雙擊約束，併為其命名（它應該是JHipster約束之一）。對於約束值，請在'Body'欄位中輸入。

最後，完成圖後，匯出即可。

![Export to XMI Modelio]({{ site.url }}/images/jhipsteruml_modelio_3.png)

Check the Model perspective, once you locate your project, get down one level and right click the last element (you lower-cased project's name), XMI, Export XMI. A window should pop up, select the output path, change the compatibility to OMG UML2.4.1, leave the extension to XMI and you're ready to go.
檢查模型透視圖，找到專案後，進入下一層並右鍵單擊最後一個元素（您的小寫專案名稱），XMI，匯出XMI。應該會彈出一個視窗，選擇輸出路徑，將相容性更改為OMG UML2.4.1，將副檔名保留為XMI，您就可以開始了。

### 註解

要註解一個類（或屬性），雙擊該元素，選擇`Notes and constraints`頁籤，然後新增`note`。

![Modelio, commenting]({{ site.url }}/images/jhipsteruml_modelio_commenting.png)

請注意，此編輯器無法註解關係。

## <a name="umldesignerexample"></a>UML Designer

UML Designer可以在[這裡](http://www.umldesigner.org/)下載。
它的工作方式與Eclipse相同。
要建立一個空專案，單擊File-> New-> Modeling Project。輸入名稱，然後驗證。
如果未建立file.uml，請右鍵單擊您的專案，然後單擊New -> Other -> UML Designer -> UML Model，然後輸入所需的任何名稱。

範例XMI檔案在[此處](https://github.com/jhipster/jhipster-uml/blob/master/test/xmi/umldesigner.uml)可用。

然後，您將看到類似這樣的檢視：

![UML Designer, dashboard]({{ site.url }}/images/jhipsteruml_umldesigner_1.png)

雙擊'Design'類別下的'Class diagram'。
現在，您可以在右側看到'Palette'。您只需要這些物件：'Class', 'PrimitiveType', 'DataType'（均在'Enumeration'下），'Composition'和'Aggregation'（均在'Association'下）。

使用UML Designer，您可以使用DataType或PrimitiveType（解析器識別兩者）來建立自定義類型。

這是使用此編輯器的範例：

![Employee and Job with UML Designer]({{ site.url }}/images/jhipsteruml_umldesigner_2.png)

要建立屬性，雙擊該類別，然後新增您的屬性。您可以透過右鍵單擊圖上的某個地方（在空白處）來匯入型別，然後匯入原始型別，然後選擇UML和Java。
這將省去手動建立型別（使用DataTypes或PrimitiveTypes）的 _繁瑣_ 工作。

不幸的訊息是，UML Designer還不支援約束。

UML Designer提供的好處之一是，您無需匯出到XMI，轉到工作區，您將看到儲存的專案已經採用了正確的格式，因此非常酷。

## 單向關係

該編輯器支援單向關係。為此，請在兩個類之間建立所需的關係，雙擊該關係並進行調整。

### 註解

可以對類別和屬性（而不是關係）進行註解：單擊一個元素，然後選擇`comment`以新增自己的註解。

![Uml Designer, commenting]({{ site.url }}/images/jhipsteruml_umldesigner_commenting.png)


## <a name="genmymodelexample"></a>GenMyModel

GenMyModel是一個基於瀏覽器訪問的UML編輯器，可以在[這裡](https://dashboard.genmymodel.com/)找到。您可以免費使用它，但有限制，我們希望該編輯器將使用戶能夠輕鬆使用JHipster-UML，而無需下載應用程式。

XMI檔案範例位於[此處](https://github.com/jhipster/jhipster-uml/blob/master/test/xmi/genmymodel_evolve.xmi)。

註冊後，轉到Projects ->  New Projects，給它一個名稱，在Model Type中選擇UML，在預設圖中選擇Diagram，然後單擊Create project。
然後將顯示此螢幕：

![GenMyModel dashbord]({{ site.url }}/images/jhipsteruml_genmymodel_empty_diagram.png)

在網格左側的面板上，顯示了所有可以繪製圖表的元素。我們只需要元素'Class', 'DataType', 'Attribute', 'Aggregation'和'Composition'。您可以使用'Aggregation'或'Composition'，解析器將僅看到兩個類之間的關聯及其基數。

這是一個範例，說明如何建立兩個實體，它們之間具有一對多的關係，並透過'DataType'宣告JHipster型別：

![GenMyModel diagram]({{ site.url }}/images/jhipsteruml_genmymodel_relation.png)

解析器將注意以下幾點：

  - 兩個類, 'Author'和'Book'.

  - 兩種資料型別, 'LocalDate'和'BigDecimal'.

  - 屬性，您可以使用預設屬性或宣告的DataTypes設定型別。

  - 'Author'和'Book'之間的聚合關係（方向很重要！）。

  - 兩個注入欄位，Book中的'author'和Author的'book'。

  - 基數（1和0..\*）表示一本書可以有一個作者，而一個作者可以有幾本書，這對應於作者和圖書之間的一對多關係。

不幸的是，您不能為屬性建立適合JHipster的自定義約束。

完成類圖後，可以將其匯出到XMI。為此，單擊Tool -> Export as UML (XMI)

### 單向關係

在GenMyModel中，建立單向關係非常簡單：從不需要的欄位中刪除該名稱，就可以了。

例如，考慮以下情況：

![GenMyModel, unidirectional]({{ site.url }}/images/jhipsteruml_genmymodel_unidirectional.png)

在這裡，`MyClass`將具有`myClass2`屬性，但`MyClass2`將沒有`myClass`欄位。

### 註解

註解可用於類，屬性和關係欄位。

單擊一個元素，然後在描述欄位中寫一條註解即可。

![GenMyModel, commenting]({{ site.url }}/images/jhipsteruml_genmymodel_commenting.png)


## <a name="#othereditors"></a> 其他編輯器

### Sparx EA

Guillaume Finance已新增了與該編輯器對接的支援。這是[倉庫](https://github.com/guillaumefinance/MDG-Sparx-EA-UML-JHipster)，您可以在[此處](http://www.umlchannel.com/en/enterprise-architect/item/204-mdg-viseo-ea-uml-to-jhipster-generator-jdl-uml-model-sparx-enterprise-architect)閱讀示範。

## <a name="enumerationexamples"></a>列舉

JHipster和JHipster UML都支援列舉。
您如何定義它們：
  - 對於Modelio，將`Enumeration`物件拖放到某處。最後，將`Enumeration Literal`物件新增到列舉中以將其新增；
  - For UML Designer, there is the `Enumeration` object that can be placed and used. However, the literal is not called `Enumeration Literal` but just `Literal`;
  - 對於UML Designer，存在可以放置和使用的`Enumeration`物件。但是，literal不被稱為`Enumeration Literal`，而只是`Literal`。
  - GenMyModel擁有所需的物件：主物件面板（在螢幕的左側）中的`Enum`和`Enum Literal`。
  
## <a name="tablenames"></a>表名

從v1.6.2開始，現在可以為實體指定表名。

為此，指定表名以及類似的類別名稱即可：

![tablenameimage](http://i.imgur.com/ECdb1bx.png)

該命名規則`<ENTITY_NAME>\s*(<TABLE_NAME>)`是通用的，與編輯器無關。

但是，如果您不想指定特別的表名，則只需編寫類別名稱。JHipster UML將負責將其轉換為適當的表名。例如，如果您的類別名稱是`MyClass`，則表名將是`my_class`。

請注意，自v1.6.2起，此功能可用於UML編輯器。

## <a name="requiredrels"></a>必要的關係

從v2.0.0開始，可以建立所需的關係。
要指定一個，確保需要建立的關係的結尾不是"0"（"1"或"*"即可解決問題）。
要檢視其中的一個範例，記住Oracle的完整HR範例，並注意JobHistory類具有3個必需的關係。

***

# <a name="testing-juml"></a>測試JHipster UML

這些測試位於test資料夾中，可以透過`npm test`執行。我們使用Mocha進行測試（使用chai和排除chai）。

If you want, an alternative command to run the tests, or run only the tests you want, is: `mocha`.
Please note that you need to be in the root directory for this command to work, and you also may need to install globally mocha with `npm install -g mocha` (or just use the file in the node_modules folder, which is available to you provided you do `npm install` in JHipster-UML's directory).
If, however, you don't want to install everything globally, just do:

如果需要，另一種執行測試或僅執行所需測試的指令是：`mocha`。
請注意，您需要在根目錄中才能執行此指令，並且還可能需要使用`npm install -g mocha`全域安裝mocha（或僅使用node_modules資料夾中的檔案，只要您提供該檔案即可）請在JHipster-UML的目錄中進行`npm install`）。
但是，如果您不想在全域範圍內安裝所有軟體，請執行以下操作：

  - `npm install`安裝mocha依賴
  - `./node_modules/mocha/bin/mocha`執行測試，請注意，您可能需要在某些特殊作業系統上使用`\`。

***

# <a name="contributing"></a>貢獻：問題和增強

由於我們的工具(_尚_)不完善，您可能會注意到一些不合規定之處。GitHub提供了一個非常不錯的問題跟蹤器，
因此每個人都可以發布問題。我們遵循與JHipster相同的準則，但也有一些補充：

  - 內部（由JHipster-UML團隊發現）的錯誤可能會發布在問題跟蹤器中，但與受支援的UML編輯器有關的錯誤除外。

  - 增強功能也是如此。

<b>注意：請在[此處](https://github.com/jhipster/jhipster-uml)的JHipster-UML的github頁面上發布PR和問題。不在JHipster首頁上。</b>

## <a name="parsermodifications"></a>解析器修改

1.0.0版本帶來了一個新的解析器系統，只要可以解析XMI，就可以輕鬆進行任何更改（建立，更新，刪除解析器）。

### 新增解析器

#### 解析器實現

如果您是Java開發人員，則可能對OOP原理非常熟悉（我們希望如此）。在開發JHipster-UML時，我們會像 _通常_ 在Java中那樣考慮其體系結構。

您需要擴充套件我們的抽象解析器([AbstractParser](https://github.com/jhipster/jhipster-uml/blob/master/lib/editors/abstract_parser.js))，或實現我們的介面([Parser](https://github.com/jhipster/jhipster-uml/blob/master/lib/editors/parser.js))即可新增解析器的具體實現。

您應該注意到，解析器介面的某些方法會引發 _UnimplementedOperationException_ 。這個想法來自Java，您可以在具體的解析器中實現此方法。

有些方法不會引發任何異常，而只會呼叫其他方法。如果您熟悉Java 8，我們只是複製了其出色的預設方法，並做了相同的操作（因此您無需手動實現它們）。

就像在Java中一樣，您可以覆蓋所需的任何方法，然後建立自己的方法。您不受限制（除非您想大改）。

AbstractParser類提供了一些欄位，預設建構式函式和一些方法，因此您以後不必建立或實現它們。

您 _應該_ 實現所有這些方法（或重寫[#parse](https://github.com/jhipster/jhipster-uml/blob/master/lib/editors/parser.js#L13)或[#findElements](https://github.com/jhipster/jhipster-uml/blob/master/lib/editors/parser.js#L25)方法）。

getters不是強制性的，但可以用作獲取一些重要欄位的方法，並提供一種在傳送這些欄位之前對其進行修改的方法。

#### 編輯器檢測

完成建立嶄新的新解析器後，應將其新增到可用編輯器的清單中：

- 參照[這裡](https://github.com/jhipster/jhipster-uml/blob/master/lib/editors/editors.js#L3)一樣先要求它；

- 像[這裡](https://github.com/jhipster/jhipster-uml/blob/master/lib/editors/editors.js#L9)一樣使它可用；

- 就像[這裡](https://github.com/jhipster/jhipster-uml/blob/master/lib/editors/editors.js#L16)一樣，將其新增到清單中。

但是，必須遵守一些準則：

- 您的解析器名稱必須為\<editor_parser\>;

- 編輯器的JS檔案不得大寫，並且不得包含任何空格（Modelio-> `modelio_parser.js`，UML Designer-> `umldesigner_parser.js`）；

- 編輯器的類別名稱必須大寫（Modelio-> `ModelioParser`，UML Designer-> `UMLDesignerParser`）。

關於EditorDetector，它可以檢測到建立XMI檔案的編輯器。為此，您必須首先找到XMI檔案中提到編輯器的位置，然後像[此處](https://github.com/jhipster/jhipster-uml/blob/master/lib/editors/editor_detector.js#L23)一樣新增回傳編輯器的程式碼。如果無法檢測到您的編輯器，請在[此處](https://github.com/jhipster/jhipster-uml/blob/master/lib/editors/editors.js#L23)新增它，並在此處指示其名稱，就像在[此處](https://github.com/jhipster/jhipster-uml/blob/master/lib/editors/editor_detector.js#L56)為UML Designer所做的一樣。

#### 測試

最後，在送出你的超級解析器之前，您需要做的下一件事就是對其進行測試。
因為我們相信測試，而且真心喜歡好的測試（使用BDD），所以我們的測試是透過Mocha和chai完成的。如果您還不知道全部內容，建議您訪問[ChaiJS](http://chaijs.com/)頁面，並檢視我們的測試檔案[之一](https://github.com/jhipster/jhipster-uml/blob/master/test/editors/modelio_parser_test.js)以瞭解它。

您可能想知道應該使用哪種測試形式。答案是：由您決定！無論是[應該的](http://chaijs.com/guide/styles/#should)還是[期望的](http://chaijs.com/guide/styles/#expect)（(à la RSpec），我們都不會在此處執行任何規則。但是，我們建議使用Expect，因為我們這樣做了，它應該使測試更容易理解。

我們只希望您測試"值得測試"的所有內容：

  - 介面的方法（_公共_ 方法不是介面類！）；

  - 您沒有義務測試其他方法（_私有_ 方法，因為它們在短期/長期內被認為是安全且不斷變化的），但是（據我們所知）由於未在JS中實現可見性，因此您可能想要測試它們（取決於您）。

名稱和檔案的一般準則：

- 測試檔案的名稱應遵循前面提到的相同規則。例如，如果您的解析器名稱為"Modelio"，則您的測試檔案應為`modelio_parser_test.js`。
- 用於測試的XMI檔案也是如此。如果解析器的名稱是UMLDesigner，則測試XMI檔案的名稱之一可以是`umldesigner_parser_problem_test.[...]`（檔案副檔名不是靜態的）。

### 修改解析器

更改解析器（然後送出更改）非常簡單：進行更改並進行測試（如果需要，請建立測試）。

如果需要透過測試（是否丟擲異常等等），可以製作一個XMI檔案。

如果您更改任何名稱，請不要忘記修改[編輯器檢測器](https://github.com/jhipster/jhipster-uml/blob/master/lib/editors/editor_detector.js)。

### 刪除解析器

刪除解析器是一件很容易的事情。
首先，將其從編輯器（`editors/editors.js`）中刪除，然後將其從EditorDetector（`editors/editor_detector.js`）中刪除。最後，刪除解析器檔案併為其建立測試。

如果您刪除任何解析器，請不要忘記修改[編輯器檢測器](https://github.com/jhipster/jhipster-uml/blob/master/lib/editors/editor_detector.js#L38)。

***

# <a name="annexes"></a>附錄

這是該專案支援的型別：

<table class="table table-striped table-responsive">
  <tr>
    <th>SQL</th>
    <th>MongoDB</th>
    <th>Cassandra</th>
    <th>Validations</th>
  </tr>
  <tr>
    <td>String</td>
    <td>String</td>
    <td>String</td>
    <td><dfn>required, minlength, maxlength, pattern</dfn></td>
  </tr>
  <tr>
    <td>Integer</td>
    <td>Integer</td>
    <td>Integer</td>
    <td><dfn>required, min, max</dfn></td>
  </tr>
  <tr>
    <td>Long</td>
    <td>Long</td>
    <td>Long</td>
    <td><dfn>required, min, max</dfn></td>
  </tr>
  <tr>
    <td>BigDecimal</td>
    <td>BigDecimal</td>
    <td>BigDecimal</td>
    <td><dfn>required, min, max</dfn></td>
  </tr>
  <tr>
    <td>Float</td>
    <td>Float</td>
    <td>Float</td>
    <td><dfn>required, min, max</dfn></td>
  </tr>
  <tr>
    <td>Double</td>
    <td>Double</td>
    <td>Double</td>
    <td><dfn>required, min, max</dfn></td>
  </tr>
  <tr>
    <td>Enum</td>
    <td>Enum</td>
    <td></td>
    <td><dfn>required</dfn></td>
  </tr>
  <tr>
    <td>Boolean</td>
    <td>Boolean</td>
    <td>Boolean</td>
    <td>required</td>
  </tr>
  <tr>
    <td>LocalDate</td>
    <td>LocalDate</td>
    <td></td>
    <td><dfn>required</dfn></td>
  </tr>
  <tr>
    <td></td>
    <td></td>
    <td>Date</td>
    <td><dfn>required</dfn></td>
  </tr>
  <tr>
    <td>ZonedDateTime</td>
    <td>ZonedDateTime</td>
    <td></td>
    <td><dfn>required</dfn></td>
  </tr>
  <tr>
    <td></td>
    <td></td>
    <td>UUID</td>
    <td><dfn>required</dfn></td>
  </tr>
  <tr>
    <td>Blob</td>
    <td>Blob</td>
    <td></td>
    <td><dfn>required, minbytes, maxbytes</dfn></td>
  </tr>
  <tr>
    <td>AnyBlob</td>
    <td>AnyBlob</td>
    <td></td>
    <td><dfn>required, minbytes, maxbytes</dfn></td>
  </tr>
  <tr>
    <td>ImageBlob</td>
    <td>ImageBlob</td>
    <td></td>
    <td><dfn>required, minbytes, maxbytes</dfn></td>
  </tr>
  <tr>
    <td>TextBlob</td>
    <td>TextBlob</td>
    <td></td>
    <td><dfn>required, minbytes, maxbytes</dfn></td>
  </tr>
</table>
