---
layout: default
title: 安裝JHipster
permalink: /installation/
redirect_from:
  - /installation.html
sitemap:
    priority: 0.7
    lastmod: 2018-08-30T08:20:00-00:00
---

# <i class="fa fa-cloud-download"></i> 安裝JHipster

## 安裝方法

我們提供4種使用JHipster的方法。如有疑問，請選擇我們的第二個方法: 使用NPM進行本地安裝:

*   [JHipster Online](https://start.jhipster.tech/)是一種無需安裝JHipster即可生成應用程式的簡單方法.
*   "使用NPM進行本地安裝"是使用JHipster的經典方法. 所有的一切都安裝在您的電腦上，安裝起來可能有些複雜，但這是大多數人通常的使用方式。如有疑問，請選擇此安裝方式。
*   "使用Yarn進行本地安裝"與經典的"使用NPM進行本地安裝"相同，但是使用了[Yarn](https://yarnpkg.com/)代替NPM。但請注意，在我們的社群中，Yarn不如NPM受歡迎，因此不建議新手使用。
*   "[Docker](https://www.docker.io/)"容器，為您提供已安裝了JHipster的輕量級容器.

## JHipster Online (適用於希望以簡單方式使用JHipster的使用者)

[JHipster Online](https://start.jhipster.tech/), 無需安裝JHipster即生成JHipster應用程式.

適用第一次嘗試JHipster的使用者，或者想瀏覽JHipster提供的功能的使用者.

儘管它更易於使用，但這並不是『完整的JHipster體驗』，並且在生成應用程式後，您仍需要操作後續很多步驟（『使用NPM進行本地安裝』），而且您仍然需要提供Java（執行應用程式）和NPM（管理前端程式碼）環境.

我們希望將來JHipster Online能提供更多功能.

## 使用NPM進行本地安裝 (推薦給普通使用者)

### 快速設定

1.  安裝Java 11. 推薦使用[AdoptOpenJDK builds](https://adoptopenjdk.net/), 開源免費.
2.  從[Node.js官網](http://nodejs.org/)獲取Node.js安裝(請使用LTS 64位版本, 非LTS版本不再支援)
3.  安裝JHipster: `npm install -g generator-jhipster`
4.  (可選) 如果你需要使用模組和藍圖(例如從[JHipster Marketplace]({{ site.url }}/modules/marketplace/#/list)獲取), 安裝[Yeoman](https://yeoman.io/): `npm install -g yo`

現在已經安裝了JHipster，下一步是[建立一個應用程式]({{ site.url }}/creating-an-app/)

### 可選安裝

1. 安裝Java建立工具.
    *   無論你選擇[Maven](http://maven.apache.org/)還是[Gradle](http://www.gradle.org/), 通常都不需要額外安裝任何東西, 因為JHipster會自動為您安裝[Maven Wrapper](https://github.com/takari/maven-wrapper)或[Gradle Wrapper](http://gradle.org/docs/current/userguide/gradle_wrapper.html).
    *   如果您不想使用這些套件裝器, 請訪問[Maven官方網站](http://maven.apache.org/)官方網站或[Gradle官方網站](http://www.gradle.org/)自行安裝.
2.  從[git-scm.com](http://git-scm.com/)安裝Git. 如果您剛接觸Git，我們建議您也可以使用[SourceTree](http://www.sourcetreeapp.com/)之類的工具.
    * JHipster將嘗試將您的專案送出到Git（如果已安裝).
    * [升級JHipster子產生器]({{ site.url }}/upgrading-an-application/)需要Git已安裝。

### 補充訊息

JHipster使用[Yeoman](http://yeoman.io/)實現程式碼自動生成。要查詢更多訊息，技巧和幫助，或在[送出錯誤](https://github.com/jhipster/generator-jhipster/issues?state=open)之前, 請檢視[Yeoman入門指南](http://yeoman.io/learning/index.html)。
專案的生成設定將儲存在自動生成的`.yo-rc.json`檔案中，因此強烈建議不要在HOME目錄中生成JHipster專案。如果這樣做，您將無法在其子目錄中生成另一個專案。要解決此問題，刪除`.yo-rc.json`檔案即可解決。

## 使用Yarn本地安裝（替代NPM）

### 快速設定

與使用NPM的過程類似，但有兩個區別：

1. 是從[Yarn官網](https://yarnpkg.com/en/docs/install)安裝Yarn 
2. 安裝JHipster: `yarn global add generator-jhipster`

### 故障排除

如果在全域使用Yarn時遇到問題，請確保PATH中包括了`$HOME/.config/yarn/global/node_modules/.bin`路徑.

在Mac或Linux: ```export PATH="$PATH:`yarn global bin`:$HOME/.config/yarn/global/node_modules/.bin"```

## Docker安裝（僅適用於高階使用者）

請注意：此Docker映象用於在容器內執行JHipster產生器。它和由JHipster將生成的[Docker和Docker Compose設定]({{ site.url }}/docker-compose/)完全不同，其目的主要是在容器中執行生成的應用。

### 描述

JHipster具有一個定製的[Dockerfile](https://github.com/jhipster/generator-jhipster/blob/main/Dockerfile)，該檔案提供了[Docker](https://www.docker.io/)映象。

自動建立的Docker映象可以在這裡找到：[https://hub.docker.com/r/jhipster/jhipster/](https://hub.docker.com/r/jhipster/jhipster/)

該映象將允許您在Docker中執行JHipster。

### 環境準備

這取決於您的作業系統。

1.  **Linux:** Linux支援開箱即用的Docker。您遵循[Docker](https://docs.docker.com/installation/#installation)網站上的教程即可。
2.  **Mac & Windows:** 安裝[Docker Toolbox](https://www.docker.com/docker-toolbox)即可安裝Docker。

由於生成的應用文件位於共享資料夾中，因此如果您停止Docker容器，它們將不會被刪除。但是，如果您不希望Docker在每次啟動容器時都重新下載所有Maven和NPM依賴項，您應該儲存容器狀態或者將宿主機的外部路徑掛載進容器。

<div class="alert alert-warning"><i>注意: </i>

根據您的作業系統，您的<code>DOCKER_HOST</code>將有所不同。在Linux上，它將是您的本地主機地址。對於Mac / Windows，必須使用以下指令獲取IP：<code>docker-machine ip default</code>

</div>

<div class="alert alert-info"><i>提示: </i>
<a href="https://docs.docker.com/docker-for-windows/">Docker Desktop for Windows</a>/<a href="https://docs.docker.com/docker-for-mac/">Docker Desktop for Mac</a> 是Docker Toolbox提供簡化使用的圖形界面，這將使安裝過程更加容易。
</div>

在Linux上，如果您的使用者不屬於docker組，則可能需要以root使用者身份執行docker指令。最好將您的使用者新增到docker組，以便您可以以非root使用者身份執行docker指令。請按照[http://askubuntu.com/a/477554](http://askubuntu.com/a/477554)上的步驟進行操作。

### 在Linux/Mac Windows上的使用方法（使用Docker Toolbox）

#### 拉取映象

拉取最新的Jhipster Docker映象：

`docker image pull jhipster/jhipster`

拉取開發版本的JHipster Docker映象：

`docker image pull jhipster/jhipster:master`

您可以在[這裡](https://hub.docker.com/r/jhipster/jhipster/tags/)看到所有的容器標籤

#### 執行映象

<div class="alert alert-warning"><i>提醒: </i>

如果在Mac或Windows上使用Docker Machine，則Docker守護程式對OS X或Windows檔案系統僅具有有限的訪問許可權。Docker Machine嘗試自動共享您的"/Users"（OS X）或"C\Users\[使用者名]"（Windows）目錄。因此，您必須在這些目錄下建立專案資料夾，避免因為卷掛載導致的任何問題。

</div>

在您的主目錄中建立一個『 jhipster』資料夾：

`mkdir ~/jhipster`

使用以下選項執行這個Docker映象:

*   將容器中的"/home/jhipster/app"資料夾路徑共享到宿主機本地的"〜/jhipster"路徑
*   轉發Docker公開的所有連接埠（Java應用程式為8080，BrowserSync為9000，BrowserSync UI為3001）

`docker container run --name jhipster -v ~/jhipster:/home/jhipster/app -v ~/.m2:/home/jhipster/.m2 -p 8080:8080 -p 9000:9000 -p 3001:3001 -d -t jhipster/jhipster`

<div class="alert alert-info"><i>提醒: </i>

提示：如果您以前已經啟動過容器，則無需執行上述指令，只需啟動/停止現有容器即可。

</div>

#### 檢查容器是否正在執行

要檢查您的容器是否正在執行，請使用指令： `docker container ps`:

    CONTAINER ID    IMAGE               COMMAND                 CREATED         STATUS          PORTS                                                       NAMES
    4ae16c0539a3    jhipster/jhipster   "tail -f /home/jhipst"  4 seconds ago   Up 3 seconds    0.0.0.0:9000-3001->9000-3001/tcp, 0.0.0.0:8080->8080/tcp    jhipster

#### 常用操作

*  停止容器，執行: `docker container stop jhipster`
*  並再次啟動，執行: `docker container start jhipster`

如果您需要更新Docker映象（重建或從Docker Hub拉取），最好刪除現有容器，然後重新執行該容器。為此，需要首先停止容器，將其刪除，然後再次執行：

1.  `docker container stop jhipster`
2.  `docker container rm jhipster`
3.  `docker image pull jhipster/jhipster`
4.  `docker container run --name jhipster -v ~/jhipster:/home/jhipster/app -v ~/.m2:/home/jhipster/.m2 -p 8080:8080 -p 9000:9000 -p 3001:3001 -d -t jhipster/jhipster`

### 進入容器

<div class="alert alert-warning"><i>提醒: </i>

在Windows上，您需要以管理員身份執行Docker Quick Terminal，以便能夠在`npm install`步驟中建立符號連結。
</div>

最簡單方法是登入正在執行的容器執行以下指令：

`docker container exec -it <container_name> bash`

請注意：如果在容器中複製貼上了以上指令執行，必須將容器名稱指定為`jhipster`：

`docker container exec -it jhipster bash`

您將以『 jhipster』使用者身份登入。

如果您想以"root"身份登入，但因為`sudo`指令在Ubuntu Xenial中是不可用，則需要執行：

`docker container exec -it --user root jhipster bash`

### 您的第一個專案

然後，您可以轉到容器中的/home/jhipster/app目錄，並開始在Docker內部建立應用程式：

`cd /home/jhipster/app`

`jhipster`

<div class="alert alert-info"><i>提醒: </i>

提示：如果您更喜歡使用Yarn，則可以使用<code>jhipster --yarn</code>來使用Yarn來代替NPM。

</div>

建立應用程式後，您可以執行gulp/bower/maven所有常規指令，例如：

`./mvnw`

**恭喜！您已經在Docker中啟動了JHipster應用！**

在您的機器上，您應該可以：

*   透過`http://DOCKER_HOST:8080`訪問正在執行的應用程式

*   在共享資料夾中獲取所有生成的檔案

<div class="alert alert-warning"><i>注意: </i>
    預設情況下，<code>jhipster/jhipster</code>映象中未安裝Docker。
    <br/>
    因此，您將無法：:
    <ul>
        <li>使用docker-compose檔案</li>
        <li>使用Docker建立Docker映象（Maven任務：<code>jib:dockerBuild</code>或Gradle任務：<code>jibDockerBuild</code>）</li>
    </ul>
    但是，您能夠使用<a href="https://github.com/GoogleContainerTools/jib">jib</a>的無守護程式模式，該模式可以建立docker映象並將其推送到倉庫，而無需訪問docker守護程式（Maven任務：<code>jib:build</code>或Gradle任務：<code>jibBuild</code>）。但是作為建立應用程式的先決條件，您將需要先設定Docker倉庫憑證訊息。
    有關更多詳細訊息，請參見<a href="https://github.com/GoogleContainerTools/jib/tree/master/jib-maven-plugin#configuration">Jib外掛設定文件</a>。
</div>
