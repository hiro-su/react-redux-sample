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

## The table of contents

- <a href="#resource-back_sessions">内部向け/Sessions</a>
  - <a href="#link-GET-back_sessions-/v1/back/sessions">GET /v1/back/sessions</a>
  - <a href="#link-DELETE-back_sessions-/v1/back/sessions/{(%23%2Fdefinitions%2Fsessions%2Fdefinitions%2Fid)}">DELETE /v1/back/sessions/{sessions_id}</a>
- <a href="#resource-sessions">ユーザ向け/Sessions</a>
  - <a href="#link-POST-sessions-/v1/sessions">POST /v1/sessions</a>
  - <a href="#link-GET-sessions-/v1/sessions/{(%23%2Fdefinitions%2Fsessions%2Fdefinitions%2Fid)}">GET /v1/sessions/{sessions_id}</a>

## <a name="resource-back_sessions">内部向け/Sessions</a>

Stability: `prototype`

セッションを管理します

### Attributes

| Name | Type | Description | Example |
| ------- | ------- | ------- | ------- |
| **[session:id](#resource-sessions)** | *uuid* | EventSource オブジェクトの last event ID の値に設定する、イベント ID です。 | `"813bb7b8-f626-4219-ac72-4628571f7c6a"` |
| **[session:sa_account](#resource-sessions)** | *string* | サービスオンラインのアカウント名<br/> **pattern:** `^SA[0-9]{7}$` | `"SA0000000"` |

### <a name="link-GET-back_sessions-/v1/back/sessions">内部向け/Sessions List</a>

接続中のセッション一覧を表示する

```
GET /v1/back/sessions
```


#### Curl Example

```bash
$ curl -n http://localhost:3040/v1/back/sessions \
  -H "Authorization: Idaten {gspadmin session id}:{user account}"
```


#### Response Example

```
HTTP/1.1 200 OK
```

```json
[
  {
    "session": {
      "id": "813bb7b8-f626-4219-ac72-4628571f7c6a",
      "sa_account": "SA0000000"
    }
  }
]
```

### <a name="link-DELETE-back_sessions-/v1/back/sessions/{(%23%2Fdefinitions%2Fsessions%2Fdefinitions%2Fid)}">内部向け/Sessions Delete</a>

接続中のセッションを切断する

```
DELETE /v1/back/sessions/{sessions_id}
```


#### Curl Example

```bash
$ curl -n -X DELETE http://localhost:3040/v1/back/sessions/$SESSIONS_ID \
  -H "Content-Type: application/json" \
  -H "Authorization: Idaten {gspadmin session id}:{user account}"
```


#### Response Example

```
HTTP/1.1 200 OK
```

```json
{
  "session": {
    "id": "813bb7b8-f626-4219-ac72-4628571f7c6a",
    "sa_account": "SA0000000"
  }
}
```


## <a name="resource-sessions">ユーザ向け/Sessions</a>

Stability: `prototype`

セッションを管理します

### Attributes

| Name | Type | Description | Example |
| ------- | ------- | ------- | ------- |
| **session:id** | *uuid* | EventSource オブジェクトの last event ID の値に設定する、イベント ID です。 | `"813bb7b8-f626-4219-ac72-4628571f7c6a"` |
| **session:sa_account** | *string* | サービスオンラインのアカウント名<br/> **pattern:** `^SA[0-9]{7}$` | `"SA0000000"` |

### <a name="link-POST-sessions-/v1/sessions">ユーザ向け/Sessions Create</a>

セッションを作成する

```
POST /v1/sessions
```

#### Required Parameters

| Name | Type | Description | Example |
| ------- | ------- | ------- | ------- |
| **gspcp_session** | *string* | gspcpが生成したセッションID | `"2d2027ea322c5f8e87ac110d859f69a5"` |
| **sa_account** | *string* | サービスオンラインのアカウント名<br/> **pattern:** `^SA[0-9]{7}$` | `"SA0000000"` |



#### Curl Example

```bash
$ curl -n -X POST http://localhost:3040/v1/sessions \
  -d '{
  "sa_account": "SA0000000",
  "gspcp_session": "2d2027ea322c5f8e87ac110d859f69a5"
}' \
  -H "Content-Type: application/json" \
  -H "X-CSRF-TOKEN: aZ1lwyA/LKokwup81tBV11P7BTbUBTISmzkd8GA=="
```


#### Response Example

```
HTTP/1.1 201 Created
```

```json
{
  "session": {
    "id": "813bb7b8-f626-4219-ac72-4628571f7c6a",
    "sa_account": "SA0000000"
  }
}
```

### <a name="link-GET-sessions-/v1/sessions/{(%23%2Fdefinitions%2Fsessions%2Fdefinitions%2Fid)}">ユーザ向け/Sessions Connection</a>

ストリーム接続を開始する

```
GET /v1/sessions/{sessions_id}
```


#### Curl Example

```bash
$ curl -n http://localhost:3040/v1/sessions/$SESSIONS_ID \
  -H "X-CSRF-TOKEN: aZ1lwyA/LKokwup81tBV11P7BTbUBTISmzkd8GA=="
```


#### Response Example

```
 HTTP/1.1 200 OK
 Content-Type: text/event-stream; charset=utf-8
 Cache-Control: no-cache
 Connection: keep-alive
 Transfer-Encoding: chunked
 Date: Mon, 19 Dec 2016 05:37:47 GMT 
```

```json
 event: heartBeat
 id: 813bb7b8-f626-4219-ac72-4628571f7c6a/1
 retry: 10000
 data: 2d2027ea322c5f8e87ac110d859f69a5 
```


