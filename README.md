# gspcp-stream

IIJ GIOインフラストラクチャーP2 プライベートリソース 表画面用ストリームサーバ

## Overview

ユーザへのサーバプッシュ機構を実現するためのストリームサーバです。
ユーザ毎にストリームセッションを作成し、セッション状況確認のためのハートビートや申し込みのステータス情報などを送出します。

 - [外部(API)仕様](docs/schema/schema.md)
 - [内部仕様](../../wiki/内部仕様)

## development

 - node v7.2.0
   - nodebrew推奨

```bash
 $ npm install
 $ NODE_ENV=production npm run build
 $ DEBUG=node-koa2-babel-sse-study:* npm start
```

Using a browser, go to [http://localhost:3000/users/1](http://localhost:3000/users/1)

## Generate JSON Schema & Document

 - ruby v2.3.0
   - rbenv推奨
 - bundler v1.13.6

bundlerを未インストールの場合は以下のコマンドでインストール

```bash
$ gem install bundler -N
```

```bash
$ bundle install --path=.bundle --binstubs=.bundle/bin
$ bundle exec rake schema
```

## Mock

<a href="docs/schema/schema.md#link-GET-sessions-/sessions/{(%23%2Fdefinitions%2Fsessions%2Fdefinitions%2Fid)}">GET /sessions/{sessions_id}</a>
は仕様通り動作しません。


```bash
$ bundle exec committee-stub docs/schema/schema.json
```
