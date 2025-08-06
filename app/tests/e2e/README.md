# E2Eテスト（Playwright）

このディレクトリには、Playwrightを使用したE2Eテストが含まれています。

## テストの実行

### 基本的なテスト実行

```bash
npm run test:e2e
```

### UIモードでテスト実行（推奨）

```bash
npm run test:e2e:ui
```

### ブラウザを表示してテスト実行

```bash
npm run test:e2e:headed
```

### デバッグモードでテスト実行

```bash
npm run test:e2e:debug
```

## テストファイル構成

- `login.spec.ts` - ログインページテスト

## テストの書き方

### 基本的なテスト構造

```typescript
import { test, expect } from "@playwright/test";

test.describe("テストスイート名", () => {
  test("テストケース名", async ({ page }) => {
    // テストの実装
    await page.goto("/");
    await expect(page.locator("h1")).toBeVisible();
  });
});
```

### よく使用するアサーション

- `toBeVisible()` - 要素が表示されていることを確認
- `toHaveText()` - 要素のテキストを確認
- `toHaveURL()` - URLを確認
- `toHaveValue()` - 入力フィールドの値を確認

### データ属性の使用

テストでは `data-testid` 属性を使用して要素を特定します：

```typescript
// HTML
<button data-testid="search-button">検索</button>

// テスト
await page.locator('[data-testid="search-button"]').click();
```

## 設定

設定は `playwright.config.ts` で管理されています：

- テストディレクトリ: `./tests/e2e`
- ベースURL: `http://localhost:3000`
- ブラウザ: Chromium, Firefox, WebKit
- 開発サーバー: `npm run dev` で自動起動

## トラブルシューティング

### ブラウザがインストールされていない場合

```bash
npm run test:e2e:install
```

### テストが失敗する場合

1. 開発サーバーが起動していることを確認
2. `data-testid` 属性が正しく設定されていることを確認
3. テストの期待値が実際のUIと一致していることを確認

### デバッグ方法

1. `npm run test:e2e:debug` でデバッグモード実行
2. `npm run test:e2e:ui` でUIモード実行
3. テストレポートを確認（`playwright-report/` ディレクトリ）
