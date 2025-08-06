import { test, expect } from "@playwright/test";

test.describe("ユーザー登録ページのE2Eテスト", () => {
  test("ユーザー登録の正常系", async ({ page }) => {
    await page.goto("/ja/registration");

    // 同意フォームのステップ
    await expect(
      page.getByRole("heading", { name: "エンジニアカフェへようこそ" }),
    ).toBeVisible();
    await expect(page.getByText("新規会員登録")).toBeVisible();

    // チェックボックスにチェック
    await page
      .getByRole("checkbox", { name: "上記の症状がないことを確認しました" })
      .check();
    await page
      .getByRole("checkbox", { name: "上記の個人情報の利用目的に同意します" })
      .check();

    // 次へボタンをクリック
    await page.getByRole("button", { name: "次へ" }).click();

    // 基本情報フォームのステップ
    await expect(page.getByText("基本情報")).toBeVisible();

    // 基本情報を入力
    await page.getByRole("textbox", { name: "氏名 必須" }).fill("田中太郎");
    await page
      .getByRole("textbox", { name: "氏名（ふりがな） 必須" })
      .fill("たなかたろう");
    // 滞在区分は既に「日本国籍」が選択されている
    await page.getByRole("textbox", { name: "郵便番号" }).fill("1000001");
    await page.getByLabel("都道府県必須").selectOption("東京都");
    await page.getByRole("textbox", { name: "市区町村 必須" }).fill("千代田区");
    await page.getByRole("textbox", { name: "丁目 必須" }).fill("1-1-1");

    // 次へボタンをクリック
    await page.getByRole("button", { name: "次へ" }).click();

    // 連絡先フォームのステップ
    await expect(page.getByText("連絡先")).toBeVisible();

    // 連絡先情報を入力
    await page
      .getByRole("textbox", { name: "電話番号 必須" })
      .fill("09012345678");
    await page
      .getByRole("textbox", { name: "メールアドレス 必須" })
      .fill("tanaka@example.com");
    await page.getByRole("radio", { name: "個人" }).check();
    await page.getByLabel("職業必須").selectOption("フリーランス");

    // 次へボタンをクリック
    await page.getByRole("button", { name: "次へ" }).click();

    // アンケートフォームのステップ
    await expect(page.getByText("アンケート")).toBeVisible();
    await expect(
      page.getByText("エンジニアカフェをどこで知りましたか？"),
    ).toBeVisible();

    // アンケートに回答
    await page.getByRole("radio", { name: "LinkedIn" }).check();

    // 次へボタンをクリック
    await page.getByRole("button", { name: "次へ" }).click();

    // 確認画面のステップ
    await expect(page.getByText("確認")).toBeVisible();
    await expect(page.getByText("登録内容")).toBeVisible();

    // 入力内容の確認
    await expect(page.getByText("田中太郎")).toBeVisible();
    await expect(page.getByText("たなかたろう")).toBeVisible();
    await expect(page.getByText("日本国籍")).toBeVisible();
    await expect(page.getByText("東京都千代田区1-1-1")).toBeVisible();
    await expect(page.getByText("09012345678")).toBeVisible();
    await expect(page.getByText("tanaka@example.com")).toBeVisible();
    await expect(page.getByText("個人")).toBeVisible();
    await expect(page.getByText("フリーランス")).toBeVisible();
    await expect(page.getByText("LinkedIn")).toBeVisible();

    // 登録するボタンをクリック
    await page.getByRole("button", { name: "登録する" }).click();

    // 登録完了画面の確認
    await expect(page.getByText("登録完了")).toBeVisible();
    await expect(page.getByText("ユーザー登録完了")).toBeVisible();
    await expect(
      page.getByRole("heading", { name: "ユーザーIDをメモして下さい" }),
    ).toBeVisible();
    await expect(
      page.getByText("ユーザーIDは、NFCの登録に必要です。"),
    ).toBeVisible();

    // ユーザーIDが表示されていることを確認
    const userIdElement = page.locator("text=/^[0-9]+$/").first();
    await expect(userIdElement).toBeVisible();
  });
});
