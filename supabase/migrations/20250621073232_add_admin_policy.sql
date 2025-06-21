alter table admin_users enable row level security;

-- 全ユーザーがadmin_usersテーブルにアクセスできないようにする
CREATE POLICY "Public No access"
ON admin_users
FOR ALL
TO public
USING (false);

-- 管理者ユーザーのみがadmin_usersテーブルにアクセスを許可する
CREATE POLICY "Admin access for admin_users"
ON admin_users
FOR ALL
TO authenticated
USING (
  auth.uid() IN (SELECT id FROM admin_users)
);

-- usersテーブルのRLSを有効にする
alter table users enable row level security;

-- 利用者登録対応のため、未認証でもINSERTを行えるようにする
CREATE POLICY "Anyone can insert"
ON users
FOR INSERT
TO public  -- public = 全ユーザー（認証なしでも可）
WITH CHECK (true);

-- 管理者ユーザーのみSELECT, UPDATE, DELETEを行えるようにする
CREATE POLICY "Only admins can select"
ON users
FOR SELECT
TO authenticated
USING (
  auth.uid() IN (SELECT id FROM admin_users)
);

CREATE POLICY "Only admins can update"
ON users
FOR UPDATE
TO authenticated
USING (
  auth.uid() IN (SELECT id FROM admin_users)
);

CREATE POLICY "Only admins can delete"
ON users
FOR DELETE
TO authenticated
USING (
  auth.uid() IN (SELECT id FROM admin_users)
);