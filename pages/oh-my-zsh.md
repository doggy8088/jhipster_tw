---
layout: default
title: 使用Oh-My-Zsh
permalink: /oh-my-zsh/
redirect_from:
  - /oh-my-zsh.html
sitemap:
    priority: 0.7
    lastmod: 2016-07-25T18:40:00-00:00
---

# <i class="fa fa-terminal"></i> 使用Oh-My-Zsh

如果您使用的是Linux或Mac OS X，[Oh-My-Zsh](http://ohmyz.sh/)是管理ZSH設定的好工具。

JHipster開發團隊中的大多數人都使用Oh-My-Zsh，如果您看到人們在其終端中使用快捷方式，那麼神奇魔術就來自這裡！

## Oh-My-Zsh JHipster外掛

JHipster Oh-My-Zsh外掛可從GitHub上的[https://github.com/jhipster/jhipster-oh-my-zsh-plugin](https://github.com/jhipster/jhipster-oh-my-zsh-plugin)獲得。

目前，它僅新增快捷方式（此處為[完整](https://github.com/jhipster/jhipster-oh-my-zsh-plugin/blob/main/jhipster.plugin.zsh)清單），但我們歡迎您提供更好的自動完成功能！

它還不是官方外掛清單的一部分，因此您需要手動安裝它：

1. 編輯`~/.zshrc`並將`jhipster`新增到外掛清單以啟用：

    `plugins=( ... jhipster )`

2. 在指令行中，轉到_oh-my-zsh_自定義外掛目錄，然後克隆倉庫：

    `cd ~/.oh-my-zsh/custom/plugins && git clone https://github.com/jhipster/jhipster-oh-my-zsh-plugin.git jhipster && cd && . ~/.zshrc`

## 推薦外掛

`git`, `docker`和`docker-compose`外掛通常對JHipster有用。

因此，您的`.zshrc`檔案中的外掛部分將是：

    plugins=(git docker docker-compose jhipster)

## 其他安裝方式

### Antigen

如果您使用的是[Antigen](https://github.com/zsh-users/antigen):

1. 將`antigen bundle jhipster/jhipster-oh-my-zsh-plugin`新增到列出其他外掛的`.zshrc`中。
2. 關閉並重新開啟您的Terminal/iTerm視窗以**重新整理上下文**並使用外掛。另外，您可以在shell中執行`antigen bundle jhipster/jhipster-oh-my-zsh-plugin`克隆antigen並載入*jhipster*。

### zgen

如果您使用的是[zgen](https://github.com/tarjoilija/zgen):

1. 將`zgen load jhipster/jhipster-oh-my-zsh-plugin`以及其他`zgen load`指令新增到您的`.zshrc`中。
2. `rm ${ZGEN_INIT}/init.zsh && zgen save`
