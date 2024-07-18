---
layout: default
title: Docker中的時間漂移
sitemap:
priority: 0.1
lastmod: 2020-05-02T06:14:00-00:00
---

# Docker中的時間漂移

**送出者 [@SudharakaP](https://github.com/SudharakaP)**

長時間執行Docker（之間有睡眠週期）時應考慮的事情之一是，在Docker容器與OS時鐘之間可能會發生時間漂移。

這導致難以發現的錯誤，例如[https://github.com/jhipster/generator-jhipster/issues/11659](https://github.com/jhipster/generator-jhipster/issues/11659) 。

已報道[Macs](https://github.com/docker/for-mac/issues/2076)和[Windows](https://github.com/docker/for-win/issues/4526)的Docker時間漂移，
最簡單的解決方案是在長時間的睡眠週期後重新啟動Docker容器。