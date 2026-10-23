# コントリビューションガイド

このプロジェクトに興味を持っていただき、ありがとうございます！

このドキュメントは、本プロジェクトへの貢献を考えている方向けのガイドラインです。Pull Requestを送る前に、ぜひご一読ください。

## 目次

- [はじめに](#はじめに)
- [開発環境のセットアップ](#開発環境のセットアップ)
- [開発フロー](#開発フロー)
- [コーディング規約](#コーディング規約)
- [コミットメッセージの規約](#コミットメッセージの規約)
- [Pull Request の作成](#pull-request-の作成)
- [行動規範](#行動規範)

## はじめに

このプロジェクトは、エンジニアカフェの受付業務を効率化するためのシステムです。私たちは、コミュニティからのあらゆる貢献を歓迎します。バグ報告、機能改善の提案、ドキュメントの修正など、どのような形でも構いません。

## 開発環境のセットアップ

開発を始めるには、ローカルマシンに以下の環境が必要です。

- Node.js 24.22.1（`.node-version` / `.nvmrc` で固定）
- npm (Node.jsに同梱)
- Supabase CLI

### 1. プロジェクトのフォークとクローン

まず、このリポジトリを自身のGitHubアカウントにフォークし、ローカルにクローンします。

```bash
git clone https://github.com/<YOUR_USERNAME>/engineercafe-reception-2025.git
cd engineercafe-reception-2025
```

### 2. 依存関係のインストール

リポジトリルートで Node.js 24.22.1 に切り替えます。nodenv を使う場合は、以下を実行してください（インストール済みの場合は `nodenv install` は不要です）。

```bash
nodenv install 24.22.1
node --version # v24.22.1
```

nvm を使う場合は、代わりに `nvm install && nvm use` を実行してください。CI も `.node-version` を参照して同じバージョンを使用します。

`app` ディレクトリで、必要なパッケージをインストールします。

```bash
cd app
npm install
```

### 3. Supabase のセットアップ

このプロジェクトはバックエンドにSupabaseを利用しています。ローカルでの開発にはSupabase CLIを使い、ローカル環境を構築します。

1.  **Supabaseを起動します。**

    ```bash
    supabase start
    ```

2.  **データベースのマイグレーションを適用します。**
    初回起動時やスキーマの変更があった場合に実行してください。

    ```bash
    supabase db reset
    ```

3.  **環境変数を設定します。**
    `.env.example` ファイルをコピーして `.env` ファイルを作成します。

    ```bash
    cp .env.example .env
    ```

    次に、`supabase status` コマンドを実行して、ローカルSupabase環境の情報を取得します。

    ```bash
    supabase status
    ```

    出力結果から `API URL` と `anon key` をコピーし、`.env` ファイルに貼り付けます。

    ```.env
    NEXT_PUBLIC_SUPABASE_URL=
    NEXT_PUBLIC_SUPABASE_ANON_KEY=
    ```

### 4. 開発サーバーの起動

すべての設定が完了したら、開発サーバーを起動します。

```bash
npm run dev
```

ブラウザで `http://localhost:3000` にアクセスすると、アプリケーションが表示されます。

## 開発フロー

1.  **Issueの確認:**

    - まず、[Issueリスト](https://github.com/engineercafe/engineercafe-reception-2025/issues) を確認し、すでに対応したい内容のIssueがないか確認します。
    - なければ、新しいIssueを作成し、バグの内容や提案する機能について説明してください。

2.  **ブランチの作成:**

    - `main` ブランチから作業用のブランチを作成します。
    - ブランチ名は、`feat/機能名` や `fix/バグの内容` のように、変更内容が分かりやすい名前にしてください。

    ```bash
    git checkout -b feat/add-new-feature
    ```

3.  **開発:**

    - コードの変更を行います。

4.  **テストとリンティング:**

    - 変更後は、必ずテストとリンティングを実行して、問題がないことを確認してください。

    ```bash
    # テストの実行
    npm test

    # リンターの実行
    npm run lint

    # 型チェックと本番用ビルド
    npm run typecheck
    npm run build

    # フォーマッターの実行
    npx prettier --write .
    ```

## コーディング規約

- プロジェクト全体のコーディングスタイルは、`.prettierrc` と `eslint.config.mjs` に基づいています。
- 原則として、既存のコードのスタイルに合わせて実装してください。

### Supabase 関連パッケージの更新

`@supabase/supabase-js` と `@supabase/postgrest-js` は 2.106.2、`@supabase-cache-helpers/postgrest-react-query` は 1.13.9 に固定しています。SDK 内部と cache helpers が使う PostgREST の型を揃えるため、これらの更新はまとめて行い、cache helpers の `peerDependencies` を確認してください。

`npm run typecheck` は `next typegen` で Next.js の型を生成してから TypeScript を検査するため、クリーンなチェックアウトでも実行できます。

更新後は `npm ls @supabase/postgrest-js` で解決結果を確認し、`npm run typecheck`、`npm test`、`npm run test:compat`、`npm run lint`、`npm run build` を実行します。`test:compat` は Node.js 標準のテストランナーで実際の SDK と cache helpers を組み合わせ、HTTP 通信だけを差し替えて互換性を確認します。CI は `npm ci` で lockfile の依存関係を再現し、型チェック・テスト・ビルドを実行します。

## コミットメッセージの規約

当プロジェクトは [Conventional Commits](https://www.conventionalcommits.org/) の規約に準拠しています。
コミットメッセージは以下の形式で記述してください。

```
<type>(<scope>): <subject>
```

**主な `<type>`:**

- `feat`: 新機能の追加
- `fix`: バグ修正
- `docs`: ドキュメントの変更
- `style`: コードのスタイルに関する変更（フォーマットなど）
- `refactor`: リファクタリング
- `test`: テストの追加・修正
- `chore`: ビルドプロセスや補助ツールの変更など

**例:**

```
feat(auth): add password reset functionality
fix(ui): correct button alignment on the login page
```

## Pull Request の作成

- 変更が完了したら、自身のフォークリポジトリにプッシュし、`main` ブランチへのPull Requestを作成してください。
- Pull Requestのテンプレートに従い、変更内容や関連するIssue番号を記述してください。
- レビュー担当者が変更内容を理解しやすいように、スクリーンショットやGIFアニメーションを添付することを推奨します。

## 行動規範

すべてのコントリビューターは、プロジェクトの [行動規範](./CODE_OF_CONDUCT.md) に従う必要があります。敬意と思いやりを持ったコミュニケーションを心がけてください。

---

コントリビューションに関して不明な点があれば、気軽にIssueで質問してください。
皆さんのご協力をお待ちしています！
