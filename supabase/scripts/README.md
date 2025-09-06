# Supabase管理スクリプト

このディレクトリには、Supabaseの管理作業を行うためのスクリプトが含まれています。

## セットアップ

1. 依存関係をインストール:
```bash
cd supabase/scripts
npm install
```

2. 環境変数を設定:
```bash
export SUPABASE_URL="your-supabase-url"
export SUPABASE_SERVICE_ROLE_KEY="your-service-role-key"
```

## スクリプト一覧

### update-user-app-metadata.js

ユーザーのapp_metadataを更新するスクリプトです。

#### 使用方法

**単一ユーザーの更新:**
```bash
node add-app-metadata-is_cm.js admin@example.com
```

#### 機能

- 指定されたメールアドレスのユーザーを検索
- 現在のapp_metadataを取得
- `is_cm: true`を追加
- 更新結果を表示
- 複数ユーザーの一括処理に対応
- エラーハンドリングとログ出力

#### 必要な権限

このスクリプトを実行するには、SupabaseのService Role Keyが必要です。
Service Role Keyは以下の権限を持っています：
- ユーザーの検索
- app_metadataの更新

#### 注意事項

- Service Role Keyは機密情報です。環境変数として設定し、コードに直接記述しないでください
- 本番環境で実行する前に、テスト環境で動作確認を行ってください
- 更新前のapp_metadataは保持され、新しいメタデータが追加されます

## 環境変数の設定方法

### 1. コマンドラインで直接指定（推奨）
```bash
SUPABASE_URL="https://your-project.supabase.co" SUPABASE_SERVICE_ROLE_KEY="your-service-role-key" node add-app-metadata-is_cm.js admin@example.com
```

複数行で読みやすく記述：
```bash
SUPABASE_URL="https://your-project.supabase.co" \
SUPABASE_SERVICE_ROLE_KEY="your-service-role-key" \
node update-user-app-metadata.js admin@example.com
```

## トラブルシューティング

### よくあるエラー

1. **環境変数が設定されていません**
   ```
   ❌ エラー: 環境変数が設定されていません
   ```
   → SUPABASE_URLとSUPABASE_SERVICE_ROLE_KEYを設定してください

2. **ユーザーが見つかりません**
   ```
   ❌ ユーザー "admin@example.com" が見つかりません
   ```
   → メールアドレスが正しいか確認してください

3. **権限エラー**
   ```
   ❌ メタデータ更新エラー: insufficient_scope
   ```
   → Service Role Keyが正しいか確認してください

### ログの確認

スクリプトは詳細なログを出力します：
- 🔍 ユーザー検索中
- ✅ ユーザーが見つかりました
- 📋 現在のapp_metadata
- 🔄 新しいapp_metadata
- ✅ 更新完了
- 📊 結果サマリー

## セキュリティ

- Service Role Keyは絶対にコードに直接記述しないでください
- 本番環境では、適切なアクセス制御を行ってください
- 定期的にService Role Keyをローテーションしてください
