import { test, expect } from "@playwright/test";

test.describe("ログイン機能のE2Eテスト", () => {
  test.beforeEach(async ({ page }) => {
    // 各テスト前にログインページにアクセス
    await page.goto("/sign-in");
  });

  test("ログインページが正常に表示される", async ({ page }) => {
    // ページタイトルの確認
    await expect(page).toHaveTitle("EC Reception");

    // ログインフォームの要素が表示されることを確認
    await expect(page.getByText("管理者ログイン")).toBeVisible();
    await expect(page.getByText("メールアドレス")).toBeVisible();
    await expect(page.getByText("パスワード")).toBeVisible();
    await expect(page.getByTestId("email-input")).toBeVisible();
    await expect(page.getByTestId("password-input")).toBeVisible();
    await expect(page.getByTestId("login-button")).toBeVisible();
  });

  test("正常な認証情報でログインが成功する", async ({ page }) => {
    // 環境変数から認証情報を取得
    const testEmail = process.env.TEST_EMAIL;
    const testPassword = process.env.TEST_PASSWORD;

    // 環境変数が設定されていない場合はテストをスキップ
    if (!testEmail || !testPassword) {
      test.skip(
        true,
        "TEST_EMAIL または TEST_PASSWORD 環境変数が設定されていません",
      );
      return;
    }

    // 有効な認証情報を入力
    await page.getByTestId("email-input").fill(testEmail);
    await page.getByTestId("password-input").fill(testPassword);

    // ログインボタンをクリック
    await page.getByTestId("login-button").click();

    // ログイン成功後、ホームページにリダイレクトされることを確認
    await expect(page).toHaveURL(/.*\/home/);

    // ログインフォームが表示されなくなることを確認
    await expect(page.getByText("管理者ログイン")).not.toBeVisible();
  });

  test("無効な認証情報でログインが失敗する", async ({ page }) => {
    // 無効な認証情報を入力
    await page.getByTestId("email-input").fill("invalid@example.com");
    await page.getByTestId("password-input").fill("wrongpassword");

    // ログインボタンをクリック
    await page.getByTestId("login-button").click();

    // ログインページに留まることを確認
    await expect(page).toHaveURL(/.*\/sign-in/);

    // ログインフォームが引き続き表示されることを確認
    await expect(page.getByText("管理者ログイン")).toBeVisible();
  });

  test("空の認証情報でログインを試行する", async ({ page }) => {
    // 空の認証情報でログインボタンをクリック
    await page.getByTestId("login-button").click();

    // ログインページに留まることを確認
    await expect(page).toHaveURL(/.*\/sign-in/);

    // ログインフォームが引き続き表示されることを確認
    await expect(page.getByText("管理者ログイン")).toBeVisible();
  });

  test("メールアドレスのみ入力してログインを試行する", async ({ page }) => {
    // メールアドレスのみ入力
    await page.getByTestId("email-input").fill("test@example.com");

    // ログインボタンをクリック
    await page.getByTestId("login-button").click();

    // ログインページに留まることを確認
    await expect(page).toHaveURL(/.*\/sign-in/);

    // ログインフォームが引き続き表示されることを確認
    await expect(page.getByText("管理者ログイン")).toBeVisible();
  });

  test("パスワードのみ入力してログインを試行する", async ({ page }) => {
    // パスワードのみ入力
    await page.getByTestId("password-input").fill("passw0rd");

    // ログインボタンをクリック
    await page.getByTestId("login-button").click();

    // ログインページに留まることを確認
    await expect(page).toHaveURL(/.*\/sign-in/);

    // ログインフォームが引き続き表示されることを確認
    await expect(page.getByText("管理者ログイン")).toBeVisible();
  });

  test("無効なメールアドレス形式でログインを試行する", async ({ page }) => {
    // 無効なメールアドレス形式を入力
    await page.getByTestId("email-input").fill("invalid-email");
    await page.getByTestId("password-input").fill("passw0rd");

    // ログインボタンをクリック
    await page.getByTestId("login-button").click();

    // ログインページに留まることを確認
    await expect(page).toHaveURL(/.*\/sign-in/);

    // ログインフォームが引き続き表示されることを確認
    await expect(page.getByText("管理者ログイン")).toBeVisible();
  });

  test("入力フィールドのプレースホルダーが正しく表示される", async ({
    page,
  }) => {
    // メールアドレス入力フィールドのプレースホルダーを確認
    await expect(page.getByTestId("email-input")).toHaveAttribute(
      "placeholder",
      "email",
    );

    // パスワード入力フィールドのプレースホルダーを確認
    await expect(page.getByTestId("password-input")).toHaveAttribute(
      "placeholder",
      "password",
    );
  });

  test("入力フィールドのタイプが正しく設定される", async ({ page }) => {
    // メールアドレス入力フィールドのタイプを確認
    await expect(page.getByTestId("email-input")).toHaveAttribute(
      "type",
      "email",
    );

    // パスワード入力フィールドのタイプを確認
    await expect(page.getByTestId("password-input")).toHaveAttribute(
      "type",
      "password",
    );
  });

  test("フォーム送信後に入力値が保持される", async ({ page }) => {
    // 環境変数から認証情報を取得
    const testEmail = process.env.TEST_EMAIL;
    const testPassword = process.env.TEST_PASSWORD;

    // 環境変数が設定されていない場合はテストをスキップ
    if (!testEmail || !testPassword) {
      test.skip(
        true,
        "TEST_EMAIL または TEST_PASSWORD 環境変数が設定されていません",
      );
      return;
    }

    // 認証情報を入力
    await page.getByTestId("email-input").fill(testEmail);
    await page.getByTestId("password-input").fill(testPassword);

    // ログインボタンをクリック
    await page.getByTestId("login-button").click();

    // ログインページに留まる場合（エラー時）、入力値が保持されることを確認
    if (await page.getByText("管理者ログイン").isVisible()) {
      await expect(page.getByTestId("email-input")).toHaveValue(testEmail);
      await expect(page.getByTestId("password-input")).toHaveValue(
        testPassword,
      );
    }
  });

  test("Enterキーでフォームを送信できる", async ({ page }) => {
    // 環境変数から認証情報を取得
    const testEmail = process.env.TEST_EMAIL;
    const testPassword = process.env.TEST_PASSWORD;

    // 環境変数が設定されていない場合はテストをスキップ
    if (!testEmail || !testPassword) {
      test.skip(
        true,
        "TEST_EMAIL または TEST_PASSWORD 環境変数が設定されていません",
      );
      return;
    }

    // 認証情報を入力
    await page.getByTestId("email-input").fill(testEmail);
    await page.getByTestId("password-input").fill(testPassword);

    // Enterキーを押してフォームを送信
    await page.getByTestId("password-input").press("Enter");

    // ログイン成功後、ホームページにリダイレクトされることを確認
    await expect(page).toHaveURL(/.*\/home/);

    // ログインフォームが表示されなくなることを確認
    await expect(page.getByText("管理者ログイン")).not.toBeVisible();
  });
});
