# gspcp-stream API

## Overview

ユーザへのサーバプッシュ機構を実現するためのストリームサーバです。
ユーザ毎にストリームセッションを作成し、セッション状況確認のためのハートビートや申し込みのステータス情報などを送出します。

### ユーザ向け/X-CSRF-TOKEN
<a href="#link-POST-sessions-/sessions">POST /sessions</a> と <a href="#link-GET-sessions-/sessions/{(%23%2Fdefinitions%2Fsessions%2Fdefinitions%2Fid)}">GET /sessions/{sessions_id}</a>
のみ表画面が生成した CSRF TOKEN を ```X-CSRF-TOKEN``` ヘッダーに付与してリクエストを投げる必要があります。
これは表画面の利用者からのアクセスであることを確認するためです。

### 内部向け/Authorization

<a href="#link-GET-back_sessions-/back/sessions">GET /back/sessions</a> と <a href="#link-DELETE-back_sessions-/back/sessions/{(%23%2Fdefinitions%2Fsessions%2Fdefinitions%2Fid)}">DELETE /back/sessions/{sessions_id}</a>
 のみ認証用の ```Authorization``` ヘッダーが必要です。
これは裏画面からの利用を想定しており、操作権限の有するユーザのみにアクセスを許可するためです。
フォーマットは以下に示す通りです。

```
Authorization: Idaten {gspcp session id}:{user account}
```

### Errors

エラーは以下に示す共通のフォーマットで返却されます。

#### Error Attributes

| Name | Type | Description | Example |
| ------- | ------- | ------- | ------- |
| **detail_code** | *string* | ステータスコード<br/> **pattern:** `^[0-9]{5}$` | `"20000"` |
| **message:error** | *string* | エラー内容 | `"NG"`

#### Error Response

```
HTTP/1.1 404 Not Found
```

```json
{
  "errorMsg": "Invalid Session Id"
}
```

### Statuses

返却されるAPIレスポンスのステータスコードです。

#### Successful Responses

| Name | Description |
| ------- | ------- |
| 200 OK | 成功 |
| 201 Created | リソース作成 |

#### Error Responses

| Name | Description |
| ------- | ------- |
| 400 Bad Request | 不正なリクエスト |
| 401 Unauthorized | X-CSRF-TOKENヘッダーかAuthorizationヘッダーの値が間違っている |
| 403 Forbidden | 許可されないリクエスト |
| 404 Not Found | リソースが存在しない |
| 500 Internal Server Error | 予期せぬエラー |
| 502 Bad Gateway | サーバープロセスが死んだ |
| 503 Service Unavailable | サーバーが死んだ |
