# engineercafe-reception-2025

エンジアカフェ受付リニューアルプロジェクト

[リポジトリ](https://github.com/EngineerCafeJP/engineercafe-reception-2025)

[Github Project](https://github.com/orgs/EngineerCafeJP/projects/2)

## 技術スタック

- フロントエンド
  - React/Next.js
  - TypeScript
  - daisyUI
- バックエンド
  - Supabase
- インフラ
  - Heroku

## 環境構築

### 1 リポジトリのクローン

```bash
 git clone https://github.com/EngineerCafeJP/engineercafe-reception-2025.git
```

### 2️ 依存関係のインストール

```bash
npm install
```

### 3️ 環境変数の設定

`.env.example` をコピーして `.env.local` を作成し、適切な値を設定してください。

```bash
cp .env.example .env.local
```

### 4️ ローカルサーバーの起動

```bash
npm run dev
```

## supabase セットアップ

### CLI インストール

https://supabase.com/docs/guides/local-development/cli/getting-started

### supabase local 起動

```bash
cd supabase/
npx supabase start
```

#### モックデータのインサート

```
supabase db query --file supabase/scripts/mock.sql
```

### supabase studio にアクセス

http://127.0.0.1:54323

### supabase Authentication の設定

supabase local 起動時に表示される
API URL と anon key を環境変数に設定する

```.env.local
NEXT_PUBLIC_SUPABASE_URL=http://127.0.0.1:54321
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhxxxxx...
```

### テーブル定義を変更した場合

```
cd app
npx supabase db reset
npx supabase gen types typescript --local > ./utils/supabase/database.types.ts
npm run format:fix
```

## ディレクトリの構成

```
engineercafe-reception-2025
├── 📂 app    # ソースコード
│   ├── 📂 (reception)  # 受付に関するコード
│   ├── 📂 (registration)    # 会員登録に関するコード
│   ├── 📂 components   # 共通のUIコンポーネント
│   ├── 📂 hooks        # React Hook
│   ├── 📂 lib          # API クライアント・DB接続
│   ├── 📂 supabase     # Supabase
│   ├── 📄 .env.example     # 環境変数サンプル
│   ├── 📄 package.json     # 依存関係
├── 📂 documents        # ドキュメント
├── 📄 README.md        # 本ファイル
```
