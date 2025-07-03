# エンジニアカフェ受付システム (engineercafe-reception-2025)

エンジアカフェの新しい受付業務を担うリニューアルプロジェクトです。

- **リポジトリ:** [EngineerCafeJP/engineercafe-reception-2025](https://github.com/EngineerCafeJP/engineercafe-reception-2025)

## 概要

このプロジェクトは、エンジニアカフェの受付業務を効率化・自動化するための多機能なウェブアプリケーションです。ユーザー登録からNFCカードを利用したチェックイン、座席管理、利用状況のレポーティングまで、受付業務に必要な機能を包括的に提供します。

より詳細なプロジェクトの全体像については、[プロジェクト概要](./PROJECT_SUMMARY.md)をご覧ください。

### 主な機能

- **ユーザー登録機能:** 新規ユーザーが詳細情報を登録できます。
- **NFC カード連携による受付:** NFCカードを登録・利用し、スムーズなチェックインを実現します。
- **座席管理機能:** カフェ内の座席利用状況をリアルタイムで視覚的に管理します。
- **ユーザー検索機能:** 登録済みのユーザーをキーワードで検索・編集できます。
- **レポート機能:** 日次、月次、年次での座席利用状況に関する統計レポートを生成します。
- **多言語対応:** 日本語と英語のインターフェースを動的に切り替え可能です。

## コントリビューション

このプロジェクトへの貢献に興味をお持ちいただきありがとうございます。バグ報告、機能提案、ドキュメントの改善など、あらゆるコントリビューションを歓迎します。

開発に参加される方は、以下のドキュメントをご一読ください。

- **[コントリビューションガイド](./CONTRIBUTING.md):** 開発環境のセットアップ、開発フロー、コーディング規約、Pull Requestの作成方法など、開発に関する詳細なガイドラインです。
- **[Issue 作成ガイド](./ISSUE_GUIDE.md):** バグ報告や機能要望を行う際のガイドラインです。
- **[行動規範](./CODE_OF_CONDUCT.md):** すべての参加者が快適に活動できるよう、敬意と思いやりのあるコミュニケーションを心がけるための規範です。

## 技術スタック

- **フロントエンド:** Next.js (React), TypeScript
- **バックエンド & データベース:** Supabase
- **UI:** Tailwind CSS, daisyUI
- **状態管理:** React Query
- **テスト:** Jest, Testing Library
- **リンティング & フォーマット:** ESLint, Prettier
- **国際化 (i18n):** next-intl
- **インフラ:** Heroku

## 環境構築

### 1. プロジェクトのフォークとクローン

まず、このリポジトリを自身のGitHubアカウントにフォークし、ローカルにクローンします。

```bash
git clone https://github.com/<YOUR_USERNAME>/engineercafe-reception-2025.git
cd engineercafe-reception-2025/app
```

### 2. 依存関係のインストール

`app`ディレクトリに移動して、依存関係をインストールします。

```bash
cd app
npm install
```

### 3. 環境変数の設定

`app`ディレクトリ内で、`.env.example` をコピーして `.env` を作成し、Supabaseの接続情報などを設定してください。

```bash
cp .env.example .env
```

詳細な手順は[コントリビューションガイド](./CONTRIBUTING.md#3-supabase-のセットアップ)を参照してください。

### 4. 開発サーバーの起動

```bash
npm run dev
```

## Supabaseセットアップ

### CLI インストール

[公式ドキュメント](https://supabase.com/docs/guides/local-development/cli/getting-started)を参考に、Supabase CLIをインストールしてください。

### Supabaseローカル環境の起動

```bash
cd supabase/
npx supabase start
```

#### モックデータのインサート

```bash
supabase db query --file supabase/scripts/mock.sql
```

### Supabase Studioへのアクセス

http://127.0.0.1:54323

### テーブル定義を変更した場合

`app`ディレクトリで以下のコマンドを実行し、型定義ファイルを更新します。

```bash
cd app
npx supabase db reset
npx supabase gen types typescript --local > ./app/utils/supabase/database.types.ts
npm run format:fix
```

### Supabase DBマイグレーション

マイグレーションファイルの作成:

```bash
npx supabase migration new <migration_name>
```

マイグレーションの適用:

```bash
npx supabase migration up
```

## ディレクトリ構成

```
engineercafe-reception-2025
├── 📂 app                          # フロントエンドのソースコード
│   ├── 📂 app
│   │   ├── 📂 [locale]
│   │   │   ├── 📂 (reception)      # 受付に関するコード
│   │   │   ├── 📂 (registration)   # 会員登録に関するコード
│   │   │   ...
│   │   ├── 📂 components           # 共通のUIコンポーネント
│   │   ├── 📂 hooks                # 共通のReact Hook
│   │   ├── 📂 queries              # 共通のSupabaseクエリ
│   │   ...
│   ├── 📄 .env.example             # 環境変数サンプル
│   ├── 📄 package.json             # 依存関係
│   ...
├── 📂 documents                    # ドキュメント
├── 📂 supabase                     # Supabaseのマイグレーションファイル等
├── 📄 README.md                    # 本ファイル
...
```
