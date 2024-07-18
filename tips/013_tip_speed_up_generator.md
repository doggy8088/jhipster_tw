---
layout: default
title: 給generator-jhipster提速
sitemap:
priority: 0.5
lastmod: 2016-05-15T22:22:00-00:00
---

# 給generator-jhipster提速

__送出者 [@pascalgrimaud](https://github.com/pascalgrimaud)__

**警告！** 這些提示不適用於npm 3+，因為它使用了symlink。

當使用generator-jhipster時，根據您的連線速度，指令`npm install`可能要花費幾分鐘。

這個技巧可以在許多情況下使用：

- JHipster的示範，以改善您的體驗
- 對於開發團隊，可以使用`.yo-rc.json`更快地重新生成專案
- 持續整合

## 為node_modules建立一個新專案

建立一個目錄，其中將包含所有`node_modules`函式庫，然後進入該目錄：

```
mkdir jhipster-speedup
cd jhipster-speedup
```

建立目錄`node_modules`：

```
mkdir -p node_modules
```

專案結構為：

    jhipster-speedup
    ├── node_modules


**警告！** 僅當您是JHipster的開發人員時，才使用此下一個指令。 它將連結到generator-jhipster的fork專案：

```
npm link generator-jhipster
```

## 生成專案

建立一個目錄，其中將包含您的新JHipster專案，然後進入該目錄：

```
mkdir jhipster
cd jhipster
```

建立指向目錄`node_modules`的連結：

```
ln -s <your path>/jhipster-speedup/node_modules
```

生成一個新專案，並回答所有問題：

```
jhipster
```

第一次需要幾分鐘。

下次，它將使用現有的`node_modules`目錄，因此npm不會下載所有函式庫。

**警告！** 如果您使用特定的函式庫並修改package.json，則應將jnodester-speedup中的node_modules複製到資料夾專案中，而不要使用連結。
