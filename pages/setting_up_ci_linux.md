---
layout: default
title: 在Linux設定Jenkins 1
permalink: /setting-up-ci-linux/
redirect_from:
  - /setting_up_ci_linux.html
sitemap:
    priority: 0.7
    lastmod: 2015-01-09T12:40:00-00:00
---

# <i class="fa fa-stethoscope"></i> 在Linux設定Jenkins 1

以下說明適用於Red Hat/CentOS伺服器，但也可以適用於其他Linux發行版。

## 安裝Jenkins

請遵循[https://wiki.jenkins-ci.org/display/JENKINS/Installing+Jenkins+on+Red+Hat+distributions](https://wiki.jenkins-ci.org/display/JENKINS/Installing+Jenkins+on+Red+Hat+distributions)中的說明

~~~~
sudo wget -O /etc/yum.repos.d/jenkins.repo http://pkg.jenkins-ci.org/redhat/jenkins.repo
sudo rpm --import http://pkg.jenkins-ci.org/redhat/jenkins-ci.org.key
sudo yum install jenkins

sudo service jenkins start
~~~~

已建立一個`jenkins`使用者，其主目錄為`/var/lib/jenkins`

## 設定Jenkins

### 安裝JDK 8

透過Jenkins管理，新增JDK 8自動安裝程式。

### 安裝Maven

透過Jenkins管理，從Apache站點新增Maven自動安裝程式。

### 安裝NodeJS

您可以全域安裝NodeJS，但也可能希望為不同的專案安裝不同版本的NodeJS。

我們建議以下2種選擇，選擇您喜歡的一種。

#### Jenkins NodeJS外掛

安裝Jenkins NodeJS外掛。

透過Jenkins管理，新增NodeJS安裝：

- 來自nodejs.org的自動安裝程式，使用最新的LTS（長期支援）64位版本
- 要安裝的全域NPM軟體套件：bower gulp

#### 本地NodeJS安裝

使用以下指令碼在本地安裝NodeJS，然後更新Jenkins PATH以使用它。

~~~ bash
# specify which version we want
export NODE_VERSION=4.3.1

# download
cd /tmp
wget http://nodejs.org/dist/v$NODE_VERSION/node-v4.3.1.tar.gz
tar xvfz node-v$NODE_VERSION.tar.gz

# build it and install it only locally
cd node-v$NODE_VERSION
./configure --prefix=/var/lib/jenkins/node-v$NODE_VERSION && make && make install

# Check versions of node and  npm
export PATH=/var/lib/jenkins/node-v$NODE_VERSION/bin:$PATH
node --version
# v4.3.1
npm --version
# 3.7.5

# install tools
npm install -g bower gulp
bower --version
# 1.7.7
gulp --version
# 3.9.1
~~~

確保您更新了Jenkins PATH。