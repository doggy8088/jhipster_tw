JHipster官方網站 ([jhipster.tech/cn](https://www.jhipster.tech/cn))
=======

這是JHipster的官方中文網站，為JHipster團隊和JHipster中國社群的合作而服務。

請注意：更改樣式時，請更新css/scss下的.scss檔案，並執行npm run sass生成CSS。請勿直接更新CSS。

本地執行
* [Fork](https://github.com/jhipster/jhipster.github.io/fork)倉庫並且克隆到本地檔案系統
* [安裝Jekyll](https://help.github.com/articles/setting-up-your-github-pages-site-locally-with-jekyll/)
* 第一次執行，執行: `npm install && bundle install`
* 如果您想避免安裝到系統目錄，請改為安裝到供應商目錄：`bundle install --path vendor/bundle`
* 在MacOS上，如果您安裝nokogiri時遇到問題，請嘗試：`bundle config build.nokogiri --use-system-libraries=true --with-xml2-include="$(xcrun --show-sdk-path)"/usr/include/libxml2`
* 在克隆的儲存庫資料夾中執行`bundle exec jekyll serve 或 npm start`。
* 瀏覽器開啟`http://localhost:4000`訪問該網站。

或者使用Docker與Docker-Compose (Windows系統推薦)

* [Fork](https://github.com/jhipster/jhipster.github.io/fork) 倉庫並且克隆到本地檔案系統
* 執行`docker-compose up`
* 開啟`http://0.0.0.0:4000` 可以訪問站點
