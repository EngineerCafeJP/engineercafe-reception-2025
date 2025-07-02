-- usersテーブルにis_non_japaneseカラムを追加
ALTER TABLE public.users
ADD COLUMN non_japanese BOOLEAN DEFAULT FALSE;
