-- 既存のポリシーを削除
DROP POLICY IF EXISTS "Public No access" ON admin_users;
DROP POLICY IF EXISTS "Admin access for admin_users" ON admin_users;

-- SELECTのみ許可（認証済みユーザー限定）
CREATE POLICY "Allow select for authenticated users only"
  ON admin_users
  FOR SELECT
  USING (auth.uid() IS NOT NULL);
