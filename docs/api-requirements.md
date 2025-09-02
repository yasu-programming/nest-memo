# メモアプリ API 要件定義

## 概要
NestJS学習用のシンプルなメモアプリケーションのREST API

## 機能要件

### 1. メモの作成 (Create)
- **エンドポイント**: `POST /memos`
- **リクエスト**:
  ```json
  {
    "title": "メモのタイトル",
    "content": "メモの内容"
  }
  ```
- **レスポンス**:
  ```json
  {
    "id": 1,
    "title": "メモのタイトル", 
    "content": "メモの内容",
    "createdAt": "2025-09-02T00:00:00.000Z",
    "updatedAt": "2025-09-02T00:00:00.000Z"
  }
  ```

### 2. メモ一覧の取得 (Read All)
- **エンドポイント**: `GET /memos`
- **レスポンス**:
  ```json
  [
    {
      "id": 1,
      "title": "メモのタイトル",
      "content": "メモの内容", 
      "createdAt": "2025-09-02T00:00:00.000Z",
      "updatedAt": "2025-09-02T00:00:00.000Z"
    }
  ]
  ```

### 3. 特定メモの取得 (Read One)
- **エンドポイント**: `GET /memos/:id`
- **レスポンス**:
  ```json
  {
    "id": 1,
    "title": "メモのタイトル",
    "content": "メモの内容",
    "createdAt": "2025-09-02T00:00:00.000Z", 
    "updatedAt": "2025-09-02T00:00:00.000Z"
  }
  ```

### 4. メモの更新 (Update)
- **エンドポイント**: `PUT /memos/:id`
- **リクエスト**:
  ```json
  {
    "title": "更新されたタイトル",
    "content": "更新された内容"
  }
  ```
- **レスポンス**:
  ```json
  {
    "id": 1,
    "title": "更新されたタイトル",
    "content": "更新された内容",
    "createdAt": "2025-09-02T00:00:00.000Z",
    "updatedAt": "2025-09-02T00:00:00.000Z"
  }
  ```

### 5. メモの削除 (Delete)
- **エンドポイント**: `DELETE /memos/:id`
- **レスポンス**: `204 No Content`

## データモデル

### Memo Entity
```typescript
{
  id: number;           // 主キー（自動生成）
  title: string;        // タイトル（必須、最大255文字）
  content: string;      // 内容（必須）
  createdAt: Date;      // 作成日時（自動生成）
  updatedAt: Date;      // 更新日時（自動更新）
}
```

## バリデーション

### 作成・更新時
- `title`: 必須、1-255文字
- `content`: 必須、1-10000文字

## エラーレスポンス

### 400 Bad Request
```json
{
  "statusCode": 400,
  "message": ["title should not be empty"],
  "error": "Bad Request"
}
```

### 404 Not Found
```json
{
  "statusCode": 404,
  "message": "Memo not found",
  "error": "Not Found"
}
```

## 技術スタック
- **フレームワーク**: NestJS
- **データベース**: SQLite（開発用）
- **ORM**: TypeORM
- **バリデーション**: class-validator
- **変換**: class-transformer

## 学習ポイント
1. NestJSの基本構造（Module, Controller, Service）
2. DTOとバリデーション
3. TypeORMを使用したデータベース操作
4. RESTful APIの設計
5. エラーハンドリング
6. 依存性注入（DI）