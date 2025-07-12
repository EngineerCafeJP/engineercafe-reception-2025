-- 利用者登録に関わるテーブルに対して、全ユーザーがアクセスできるようにする

-- belong_translations
alter table belong_translations enable row level security;

-- 全ユーザーがbelong_translationsテーブルにアクセスできるようにする
CREATE POLICY "Allow select for public users"
ON belong_translations
FOR SELECT
TO public
USING (true);

-- belongs
alter table belongs enable row level security;

-- 全ユーザーがbelongsテーブルにアクセスできるようにする
CREATE POLICY "Allow select for public users"
ON belongs
FOR SELECT
TO public
USING (true);

-- found_translations
alter table found_translations enable row level security;

-- 全ユーザーがfound_translationsテーブルにアクセスできるようにする
CREATE POLICY "Allow select for public users"
ON found_translations
FOR SELECT
TO public
USING (true);

-- founds
alter table founds enable row level security;

-- 全ユーザーがfoundsテーブルにアクセスできるようにする
CREATE POLICY "Allow select for public users"
ON founds
FOR SELECT
TO public
USING (true);

-- job_translations
alter table job_translations enable row level security;

-- 全ユーザーがjob_translationsテーブルにアクセスできるようにする
CREATE POLICY "Allow select for public users"
ON job_translations
FOR SELECT
TO public
USING (true);

-- jobs
alter table jobs enable row level security;

-- 全ユーザーがjobsテーブルにアクセスできるようにする
CREATE POLICY "Allow select for public users"
ON jobs
FOR SELECT
TO public
USING (true);

-- prefecture_translations
alter table prefecture_translations enable row level security;

-- 全ユーザーがold_nfcsテーブルにアクセスできるようにする
CREATE POLICY "Allow select for public users"
ON prefecture_translations
FOR SELECT
TO public
USING (true);

-- prefectures
alter table prefectures enable row level security;

-- 全ユーザーがprefecturesテーブルにアクセスできるようにする
CREATE POLICY "Allow select for public users"
ON prefectures
FOR SELECT
TO public
USING (true);

-- stay_categories
alter table stay_categories enable row level security;

-- 全ユーザーがstay_categoriesテーブルにアクセスできるようにする
CREATE POLICY "Allow select for public users"
ON stay_categories
FOR SELECT
TO public
USING (true);

-- stay_category_translations
alter table stay_category_translations enable row level security;

-- 全ユーザーがstay_category_translationsテーブルにアクセスできるようにする
CREATE POLICY "Allow select for public users"
ON stay_category_translations
FOR SELECT
TO public
USING (true);

-- nfcs
alter table nfcs enable row level security;

-- 管理者ユーザーのみがnfcsテーブルにアクセスできるようにする
CREATE POLICY "Admin access for nfcs"
ON nfcs
FOR ALL
TO authenticated
USING (
  auth.uid() IN (SELECT id FROM admin_users)
);

-- seat_categories
alter table seat_categories enable row level security;

-- 管理者ユーザーのみがseat_categoriesテーブルにアクセスできるようにする
CREATE POLICY "Admin access for seat_categories"
ON seat_categories
FOR ALL
TO authenticated
USING (
  auth.uid() IN (SELECT id FROM admin_users)
);

-- seats
alter table seats enable row level security;

-- 管理者ユーザーのみがseatsテーブルにアクセスできるようにする
CREATE POLICY "Admin access for seats"
ON seats
FOR ALL
TO authenticated
USING (
  auth.uid() IN (SELECT id FROM admin_users)
);