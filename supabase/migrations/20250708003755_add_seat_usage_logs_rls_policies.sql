-- seat_usage_logsテーブルのRLSを有効にする
alter table seat_usage_logs enable row level security;

-- 管理者ユーザーのみがseat_usage_logsテーブルにアクセスを許可する
CREATE POLICY "Admin access for seat_usage_logs"
ON seat_usage_logs
FOR ALL
TO authenticated
USING (
  auth.uid() IN (SELECT id FROM admin_users)
);
