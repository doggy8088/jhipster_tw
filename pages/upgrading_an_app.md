---
layout: default
title: 升級應用程式
permalink: /upgrading-an-application/
sitemap:
    priority: 0.7
    lastmod: 2014-06-02T00:00:00-00:00
gitgraph: http://jsfiddle.net/lordlothar99/tqp9gyu3
---

# <i class="fa fa-refresh"></i> 升級應用程式

## 摘要

1. [自動升級](#automatic_upgrade)
2. [手動升級](#manual_upgrade)

## <a name="automatic_upgrade"></a> 自動升級

當發布新版本的JHipster時，JHipster的升級子產生器將幫助您將現有應用程式升級到該新版本，並且不會清除您更改的程式碼。

這有助於：

- 在現有應用程式中更新到最新的JHipster功能
- 獲取重要的錯誤修復或安全更新
- 將已更改部分保留在程式碼庫中，並將其與新生成的程式碼合併

_升級之前，請仔細閱讀此頁面，以瞭解升級過程的工作方式_

### 要求

為了使此子產生器正常工作，您需要從[http://git-scm.com](http://git-scm.com/)安裝`git`。

### 執行升級子產生器

進入應用程式的根目錄：

`cd myapplication/`

要升級您的應用程式，請輸入：

`jhipster upgrade`

您可以透過以下選項：

* `--verbose` - 詳細記錄升級過程的每個步驟
* `--target-version 6.6.0` - 升級到JHipster目標版本而不是最新版本，如果專案落後多個版本，則很有用
* `--target-blueprint-versions kotlin@1.4.0,vuejs@1.3.0` - 升級到目標方案（Blueprint）版本，而不是每個方案的最新版本。 但是，方案的目標版本應與目標JHipster版本相容。
* `--force` - 即使沒有新的JHipster版本，也要執行升級子產生器
* `--skip-checks` - 在專案重新生成期間停用檢查
*`--skip-install`- 在升級過程中跳過安裝依賴項
* `--silent` - 隱藏生成過程的輸出

如果您需要多次進行升級，則可以考慮像這樣首先升級JHipster：
	
    git checkout jhipster_upgrade
	git checkout --patch master .yo-rc.json
	git checkout --patch master .jhipster
	git commit -a
	git push --set-upstream origin jhipster_upgrade
	git checkout master

透過執行上述操作，您可以在已有最新更改下，來升級jhipster_upgrade分支，以便JHipster可以在升級期間使用它。例如，當您更改模型時。

### 升級過程的圖形檢視

這是圖形化升級過程的方式（請閱讀以下各節以進行文字說明）：

![GitGraph]({{ site.url }}/images/upgrade_gitgraph.png)

（此圖片來自[JSFiddle](http://jsfiddle.net/lordlothar99/tqp9gyu3/)）

請注意，儘管`jhipster_upgrade`分支在上圖中無法正確顯示，但將在您的專案中建立為孤立分支。

### 升級過程的分步說明

以下是JHipster的升級子產生器處理步驟：

1. 檢查是否有新版本的JHipster（如果使用`--force`，則不適用）。
2. 檢查應用程式是否已經初始化為`git`倉庫，否則JHipster將為您初始化一個，並將當前程式碼庫送出到master分支。
3. 檢查以確保儲存庫中沒有未送出的本地更改。如果發現未送出的更改，則該過程將退出。
4. 檢查是否存在`jhipster_upgrade`分支。如果沒有，那麼將建立一個分支：在『首次升級時指定步驟』部分中提供了有關此步驟的詳細訊息。
5. 檢出`jhipster_upgrade`分支。
6. 將JHipster全域升級到最新的可用版本。
7. 清理當前專案目錄。
8. 使用`jhipster --force --with-entities`指令重新生成應用程式。
9. 將生成的程式碼送出到`jhipster_upgrade`分支。
10. 合併`jhipster_upgrade`分支回到啟動`jhipster upgrade`指令的原始分支。
11. 現在，您需要繼續解決合併衝突（如果有）。

恭喜，您的應用程式現已升級到最新版本的JHipster！

### 首次升級時指定步驟

在首次執行JHipster的`update`子產生器時，為了避免擦除所有更改，將執行一些附加步驟：

1. `jhipster_upgrade`分支是孤立的（沒有父級）。
2. 整個應用程式已生成（使用您當前的JHipster版本）。
3. 在`master`分支上進行區塊合併送出：在`master`分支上的程式碼庫上不進行任何更改；這只是在Git中記錄`master`的HEAD與當前JHipster版本最新的一種實用方法。

#### 建議

- 不要在`jhipster_upgrade`分支上送出任何內容。該分支專用於JHipster升級子產生器：每次執行子產生器時，都會建立一個新的送出。
- 如果您要從非常老的版本（例如，從5.0.0升級到最新版本），建議您在每個次要/補丁版本之間逐步進行更新，並執行測試以確保應用程式能夠按預期執行。
- JHipster社群提供了一些有用的方法，以這種方式設計應用程式，使更新過程更容易，並減少合併衝突的數量。 我們建議使用[JHipster Side-by-Side approach](https://www.youtube.com/watch?v=Gg5CYoBdpVo) 。

## <a name="manual_upgrade"></a> 手動升級

要進行手動升級，請首先使用以下方法升級您的JHipster版本：

```
npm install -g generator-jhipster
```

刪除專案的`node_modules`資料夾，然後執行：

```
jhipster
```

您還可以透過執行以下指令來更新您的專案及其所有實體

```
jhipster --with-entities
```

您還可以透過再次執行`entity`子產生器來逐一更新實體，例如，如果您的實體名為 _Foo_

```
jhipster entity Foo
```

### 有關重新命名檔案的提示

有時，檔案可能會在產生器中重新命名。 如果您想檢視Git重新命名檢測結果，則可以執行`git add`（全部新增用`git add .`），然後使用您最喜歡的Git用戶端檢視更改。

如果重新命名了許多檔案，則可能需要在Git設定中增加`diff.renameLimit`，以使Git重新命名檢測按預期工作。 例如`git config --replace-all diff.renameLimit 10000`。

預設情況下，Git重新命名檢測使用50％的相似性閾值。 要檢視較少的重新命名相似檔案，可以在Git指令中使用選項`--find-renames = <n>`。 例如`git diff --staged --find-renames = 30`。

### 看到自己的變化

如果您希望檢視生成專案後所做的更改，可以按照以下步驟操作。

使用`git clone`將您的專案克隆到新檔案夾中。

刪除克隆專案中的所有檔案和資料夾，`.git`、`.jhipster`和`.yo-rc.json`除外。

找出上一次用於生成專案的JHipster版本：檢視專案根資料夾中的`.yo-rc.json`，找出`jhipsterVersion`的值。

安裝上次生成專案時使用的JHipster版本：

```
npm install -g generator-jhipster@jhipsterVersionYouUsedLastTime
```

重新生成您的專案：

```
jhipster --force --with-entities --skip-install
```

使用`git diff`，您現在可以看到所有更改已還原。 如果您希望看到所有已新增的更改，則可以將所有更改送出到Git，然後還原上一次送出。

### 參見JHipster的更改

如果您希望檢視JHipster所做的更改，可以按照以下描述的步驟進行。

使用您上次用於生成專案的JHipster版本生成專案：
* 新建一個資料夾
* 將您的專案`.yo-rc.json`檔案和`.jhipster`資料夾複製到此新檔案夾中
* 找出您上次用於生成專案的JHipster版本：檢視`.yo-rc.json`，找出`jhipsterVersion`的值
* 安裝上次用於生成專案的JHipster版本：`npm install -g generator-jhipster @ jhipsterVersionYouUsedLastTime`
* 在建立的資料夾中執行：`jhipster --with-entities --skip-install`

使用最新的JHipster生成專案：
* 新建一個資料夾
* 將您的專案`.yo-rc.json`檔案和`.jhipster`資料夾複製到此新檔案夾中
* 安裝最新的JHipster版本：`npm install -g generator-jhipster`
* 在建立的資料夾中執行：`jhipster --with-entities --skip-install`

使用您喜歡的檔案和資料夾比較工具將這2個資料夾進行比較，以檢視JHipster所做的更改。