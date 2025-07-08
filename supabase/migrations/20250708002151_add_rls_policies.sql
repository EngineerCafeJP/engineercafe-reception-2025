-- old_usersテーブルのRLSを有効にする(コンソールonly)
alter table old_users enable row level security;

-- old_nfcsテーブルのRLSを有効にする(コンソールonly)
alter table old_nfcs enable row level security;

-- old_logsテーブルのRLSを有効にする(コンソールonly)
alter table old_logs enable row level security;
