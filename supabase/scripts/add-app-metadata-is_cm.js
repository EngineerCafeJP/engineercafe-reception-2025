#!/usr/bin/env node

/**
 * Supabaseのapp_metadataにis_cm:trueを書き込むスクリプト
 *
 * 使用方法:
 * 1. 環境変数を設定:
 *    export SUPABASE_URL="your-supabase-url"
 *    export SUPABASE_SERVICE_ROLE_KEY="your-service-role-key"
 *
 * 2. スクリプトを実行:
 *    node update-user-app-metadata.js [user-email]
 *
 * 例:
 *    node update-user-app-metadata.js admin@example.com
 *
 *   SUPABASE_URL="your-supabase-url" SUPABASE_SERVICE_ROLE_KEY="your-service-role-key" node add-app-metadata-is_cm.js admin@example.com
 */

const { createClient } = require("@supabase/supabase-js");
const fs = require("fs");
const path = require("path");

// .envファイルの読み込み（存在する場合）
const envPath = path.join(__dirname, ".env");
if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, "utf8");
  envContent.split("\n").forEach((line) => {
    const [key, ...valueParts] = line.split("=");
    if (key && valueParts.length > 0) {
      const value = valueParts.join("=").trim();
      if (!process.env[key]) {
        process.env[key] = value;
      }
    }
  });
}

// 環境変数の取得
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceRoleKey) {
  console.error("❌ エラー: 環境変数が設定されていません");
  console.error("SUPABASE_URL と SUPABASE_SERVICE_ROLE_KEY を設定してください");
  process.exit(1);
}

// Supabaseクライアントの作成（Service Role Keyを使用）
const supabase = createClient(supabaseUrl, supabaseServiceRoleKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  },
});

/**
 * ユーザーのapp_metadataを更新する関数
 * @param {string} userEmail - 更新対象のユーザーのメールアドレス
 * @param {object} metadata - 追加するメタデータ
 */
async function updateUserAppMetadata(userEmail, metadata) {
  try {
    console.log(`🔍 ユーザー "${userEmail}" を検索中...`);

    // ユーザーを検索
    const { data: users, error: searchError } =
      await supabase.auth.admin.listUsers();

    if (searchError) {
      throw new Error(`ユーザー検索エラー: ${searchError.message}`);
    }

    const user = users.users.find((u) => u.email === userEmail);

    if (!user) {
      throw new Error(`ユーザー "${userEmail}" が見つかりません`);
    }

    console.log(`✅ ユーザー "${userEmail}" が見つかりました (ID: ${user.id})`);

    // 現在のapp_metadataを取得
    const currentMetadata = user.app_metadata || {};
    console.log(`📋 現在のapp_metadata:`, currentMetadata);

    // 新しいメタデータをマージ
    const newMetadata = {
      ...currentMetadata,
      ...metadata,
    };

    console.log(`🔄 新しいapp_metadata:`, newMetadata);

    // app_metadataを更新
    const { data, error } = await supabase.auth.admin.updateUserById(user.id, {
      app_metadata: newMetadata,
    });

    if (error) {
      throw new Error(`メタデータ更新エラー: ${error.message}`);
    }

    console.log(
      `✅ ユーザー "${userEmail}" のapp_metadataが正常に更新されました`
    );
    console.log(`📋 更新後のapp_metadata:`, data.user.app_metadata);

    return data.user;
  } catch (error) {
    console.error(`❌ エラー: ${error.message}`);
    throw error;
  }
}

/**
 * メイン処理
 */
async function main() {
  const args = process.argv.slice(2);

  if (args.length === 0) {
    console.log("使用方法:");
    console.log("  node update-user-app-metadata.js <user-email>");
    console.log(
      "  node update-user-app-metadata.js <user-email1> <user-email2> ..."
    );
    console.log("");
    console.log("例:");
    console.log("  node update-user-app-metadata.js admin@example.com");
    console.log(
      "  node update-user-app-metadata.js admin1@example.com admin2@example.com"
    );
    process.exit(1);
  }

  const userEmails = args;
  const metadata = { is_cm: true };

  console.log("🚀 Supabase app_metadata更新スクリプト開始");
  console.log(`📧 対象ユーザー: ${userEmails.join(", ")}`);
  console.log(`📋 追加メタデータ:`, metadata);
  console.log("");

  try {
    if (userEmails.length === 1) {
      await updateUserAppMetadata(userEmails[0], metadata);
    } else {
      console.log("複数ユーザーの更新は現在サポートされていません");
      process.exit(1);
    }

    console.log("\n🎉 スクリプトが正常に完了しました");
  } catch (error) {
    console.error("\n💥 スクリプトが失敗しました:", error.message);
    process.exit(1);
  }
}

// スクリプト実行
if (require.main === module) {
  main().catch(console.error);
}

module.exports = {
  updateUserAppMetadata,
};
