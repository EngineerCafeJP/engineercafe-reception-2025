# プロジェクト概要

## プロジェクト名

エンジニアカフェ受付システム (Engineer Cafe Reception System)

## 技術スタック

- **フロントエンド:** Next.js (React), TypeScript
- **バックエンド & データベース:** Supabase
- **UI:** Tailwind CSS, daisyUI
- **状態管理:** React Query
- **テスト:** Jest, Testing Library
- **リンティング & フォーマット:** ESLint, Prettier
- **国際化 (i18n):** next-intl

## 主な機能

このプロジェクトは、エンジニアカフェの受付業務を効率化・自動化するための多機能なウェブアプリケーションです。

### 1. ユーザー登録機能

新規ユーザーが名前、連絡先、所属、職種などの詳細情報を登録できます。多段階のフォームになっており、入力しやすいUIを提供します。

- **関連ディレクトリ:** `app/[locale]/(registration)/registration/`

### 2. NFCカード連携による受付

USB接続のNFCカードリーダーに対応しています。ユーザーのNFCカードを読み取り、登録ユーザーと紐付けることで、スムーズなチェックイン・本人確認を実現します。

- **関連ファイル・ディレクトリ:**
  - `app/[locale]/(reception)/nfc-registration/`
  - `app/hooks/use-nfc-detect-card.ts`
  - `app/utils/nfc.ts`
  - `app/components/NfcPortLibLoader.tsx`

### 3. 座席管理機能

カフェ内の座席をエリア（カテゴリ）ごとに管理し、利用状況（空席、使用中など）をリアルタイムで視覚的に表示します。スタッフは以下の操作を行えます。

- ユーザーを空いている座席に割り当てる。
- 利用中のユーザーの利用時間を延長する。
- ユーザーを別の座席に移動させる。
- ユーザーの退室処理を行う。
- **関連ファイル・ディレクトリ:**
  - `app/[locale]/(reception)/home/`
  - `app/[locale]/(reception)/hooks/use-seat-usage.ts`
  - `app/[locale]/(reception)/hooks/use-seats-with-category.ts`
  - `app/[locale]/(reception)/queries/seats-queries.ts`
  - `app/[locale]/(reception)/queries/seat-usages-queries.ts`

### 4. ユーザー検索機能

登録済みのユーザーをキーワードで検索し、情報を確認したり、編集したりすることができます。

- **関連ファイル・ディレクトリ:**
  - `app/[locale]/(reception)/user-search/`
  - `app/[locale]/(reception)/hooks/use-search-users.ts`
  - `app/[locale]/(reception)/queries/users-queries.ts`

### 5. レポート機能

日次、月次、年次での座席利用状況に関する統計レポートを生成します。利用者属性（福岡市内、市外、県外など）に基づいた詳細な分析が可能です。

- **関連ファイル・ディレクトリ:**
  - `app/[locale]/(reception)/reports/`
  - `app/[locale]/(reception)/hooks/use-seat-usage-reports-view.ts`
  - `app/[locale]/(reception)/queries/seat-usage-report-queries.ts`

### 6. 多言語対応

インターフェースは日本語と英語の両方に対応しており、動的に切り替えが可能です。

- **関連ファイル・ディレクトリ:**
  - `i18n/`
  - `messages/`
  - `middleware.ts`

## プロジェクト構造

- `app/[locale]/` ディレクトリ以下に、言語ごとのページが配置されています。
- `components/`, `hooks/`, `queries/`, `types/` など、関心事に応じてディレクトリが明確に分離されており、保守性の高い構造になっています。
- Huskyを利用したGitフックが設定されており、コミット前にリンティングやフォーマットが自動的に実行されます。
